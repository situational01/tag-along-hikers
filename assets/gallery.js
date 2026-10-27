/* Gallery data and media utilities, independent of the site's main script.js */
(() => {
  "use strict";
  // Public gallery is read-only. A secure admin dashboard and server-side
  // photo storage can be connected later without exposing edit controls here.
  const getAlbums = () => window.TAGALONG_GALLERY_DEFAULTS || [];
  const imageURL = async (photo) => photo.url || "";
  const coverURL = async (album) => {
    const photo =
      album.photos.find((p) => p.id === album.coverPhotoId) || album.photos[0];
    return album.cover && !album.coverPhotoId
      ? album.cover
      : photo
        ? imageURL(photo)
        : "";
  };
  const cards = document.getElementById("gallery-albums");
  if (!cards) return;
  const detail = document.getElementById("gallery-detail");
  const search = document.getElementById("gallery-search");
  const escape = (t) =>
    String(t || "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  let selected = null,
    activePhotos = [],
    activeIndex = 0,
    renderSerial = 0,
    cardURLs = [],
    photoURLs = [],
    viewerOpener = null;
  function revoke(list) {
    list.forEach((url) => {
      if (url.startsWith("blob:")) URL.revokeObjectURL(url);
    });
    list.length = 0;
  }
  async function renderCards() {
    const stamp = ++renderSerial;
    revoke(cardURLs);
    const items = getAlbums().filter((a) =>
      (a.name + " " + a.location)
        .toLowerCase()
        .includes(search.value.toLowerCase().trim()),
    );
    cards.replaceChildren();
    if (!items.length) {
      cards.innerHTML = '<p class="notice">No matching albums yet.</p>';
      return;
    }
    for (const album of items) {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "hike-album-card";
      card.dataset.id = album.id;
      const url = await coverURL(album).catch(() => "");
      if (stamp !== renderSerial) {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url);
        return;
      }
      if (url.startsWith("blob:")) cardURLs.push(url);
      card.innerHTML = `<div class="hike-album-cover">${url ? `<img alt="" loading="lazy">` : '<div class="hike-empty-cover">PHOTOS COMING SOON</div>'}</div><div class="hike-album-info"><span class="eyebrow">${escape(album.location)}</span><h3>${escape(album.name)}</h3><div class="hike-album-bottom"><span>${album.photos.length} ${album.photos.length === 1 ? "photo" : "photos"}</span><span>View album</span></div></div>`;
      if (url) card.querySelector("img").src = url;
      card.onclick = () => openAlbum(album.id);
      cards.append(card);
    }
  }
  async function openAlbum(id) {
    selected = id;
    const album = getAlbums().find((a) => a.id === id);
    if (!album) {
      showAlbums();
      return;
    }
    cards.hidden = true;
    search.hidden = true;
    document.querySelector(".gallery-topline").hidden = true;
    detail.hidden = false;
    document.getElementById("gallery-title").textContent = album.name;
    document.getElementById("gallery-description").textContent =
      album.description || "";
    document.getElementById("gallery-meta").textContent = [
      album.location,
      album.date,
    ]
      .filter(Boolean)
      .join(" · ");
    document.getElementById("gallery-count").textContent =
      `${album.photos.length} photos`;
    const grid = document.getElementById("gallery-photos");
    grid.replaceChildren();
    revoke(photoURLs);
    activePhotos = [];
    if (!album.photos.length) {
      grid.innerHTML =
        '<div class="gallery-empty">No photos have been added to this hike yet.</div>';
      history.replaceState(null, "", "#" + encodeURIComponent(id));
      return;
    }
    for (let i = 0; i < album.photos.length; i++) {
      const p = album.photos[i];
      const url = await imageURL(p).catch(() => "");
      if (selected !== id) {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url);
        return;
      }
      if (url.startsWith("blob:")) photoURLs.push(url);
      activePhotos.push({ ...p, displayURL: url });
      const b = document.createElement("button");
      b.className = "hike-photo";
      b.type = "button";
      b.setAttribute(
        "aria-label",
        `View photo ${i + 1}: ${p.caption || album.name}`,
      );
      const img = document.createElement("img");
      img.src = url;
      img.alt = p.caption || album.name;
      img.loading = "lazy";
      b.append(img);
      const cap = document.createElement("span");
      cap.textContent = p.caption || "View photo";
      b.append(cap);
      b.onclick = () => openViewer(i, b);
      grid.append(b);
    }
    history.replaceState(null, "", "#" + encodeURIComponent(id));
    window.scrollTo({
      top: Math.max(0, detail.getBoundingClientRect().top + scrollY - 110),
      behavior: "smooth",
    });
  }
  function showAlbums() {
    selected = null;
    detail.hidden = true;
    cards.hidden = false;
    search.hidden = false;
    document.querySelector(".gallery-topline").hidden = false;
    history.replaceState(null, "", location.pathname + location.search);
    renderCards();
  }
  const viewer = document.getElementById("gallery-viewer");
  function displayPhoto() {
    const p = activePhotos[activeIndex];
    document.getElementById("gallery-large").src = p.displayURL;
    document.getElementById("gallery-large").alt = p.caption || "";
    document.getElementById("gallery-caption").textContent =
      `${activeIndex + 1} / ${activePhotos.length} · ${p.caption || ""}`;
  }
  function openViewer(i, from) {
    if (!activePhotos.length) return;
    viewerOpener = from;
    activeIndex = i;
    displayPhoto();
    viewer.hidden = false;
    document.body.style.overflow = "hidden";
    document.getElementById("gallery-close").focus();
  }
  function closeViewer() {
    viewer.hidden = true;
    document.body.style.overflow = "";
    viewerOpener?.focus();
  }
  document.getElementById("gallery-close").onclick = closeViewer;
  document.getElementById("gallery-prev").onclick = () => {
    activeIndex = (activeIndex + activePhotos.length - 1) % activePhotos.length;
    displayPhoto();
  };
  document.getElementById("gallery-next").onclick = () => {
    activeIndex = (activeIndex + 1) % activePhotos.length;
    displayPhoto();
  };
  viewer.addEventListener("click", (e) => {
    if (e.target === viewer) closeViewer();
  });
  document.addEventListener("keydown", (e) => {
    if (viewer.hidden) return;
    if (e.key === "Escape") closeViewer();
    if (e.key === "ArrowLeft") document.getElementById("gallery-prev").click();
    if (e.key === "ArrowRight") document.getElementById("gallery-next").click();
  });
  let touchX = null;
  viewer.addEventListener(
    "touchstart",
    (e) => (touchX = e.touches[0]?.clientX),
    { passive: true },
  );
  viewer.addEventListener(
    "touchend",
    (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 55)
        document
          .getElementById(dx > 0 ? "gallery-prev" : "gallery-next")
          .click();
      touchX = null;
    },
    { passive: true },
  );
  document.getElementById("gallery-back").onclick = showAlbums;
  search.addEventListener("input", renderCards);
  window.addEventListener("tagalong-gallery-changed", () =>
    selected ? openAlbum(selected) : renderCards(),
  );
  window.addEventListener("pagehide", () => {
    revoke(cardURLs);
    revoke(photoURLs);
  });
  const requested = decodeURIComponent(location.hash.slice(1));
  if (requested && getAlbums().some((a) => a.id === requested))
    openAlbum(requested);
  else renderCards();
})();

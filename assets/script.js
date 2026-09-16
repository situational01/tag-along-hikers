const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const savedTheme = localStorage.getItem("tagalong-theme");
if (savedTheme === "light") document.documentElement.dataset.theme = "light";

const themeBtn = $(".theme-btn");
function updateThemeText() {
  if (themeBtn)
    themeBtn.textContent =
      document.documentElement.dataset.theme === "light"
        ? "Dark Mode"
        : "Light Mode";
}
updateThemeText();
themeBtn?.addEventListener("click", () => {
  const light = document.documentElement.dataset.theme === "light";
  if (light) delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = "light";
  localStorage.setItem("tagalong-theme", light ? "dark" : "light");
  updateThemeText();
});

const menuBtn = $(".menu-btn"),
  nav = $(".nav-links");
menuBtn?.addEventListener("click", () => nav.classList.toggle("open"));
$$(".nav-links a").forEach((a) =>
  a.addEventListener("click", () => nav.classList.remove("open")),
);

const year = $("#year");
if (year) year.textContent = new Date().getFullYear();

const hikeData = [
  {
    id: "ngong-hills",
    name: "Ngong Hills",
    location: "Ngong, Kajiado County",
    date: "Saturday, 26 September 2026",
    distance: "10 km",
    elevation: "650 m gain",
    difficulty: "Moderate",
    duration: "4–5 hours",
    meeting: "Ngong Town",
    price: "KSh 1,000",
    category: ["moderate", "mountains", "scenic"],
    image: "images/upcoming_hikes/ngong_hills.jpg",
    description:
      "A classic ridgeline day with open views and a steady climb. Suitable for hikers with a reasonable level of walking experience.",
    bring: [
      "2 litres of water",
      "Comfortable hiking shoes",
      "Light rain jacket",
      "Snacks or packed lunch",
      "Sun protection",
    ],
    included: ["Trail coordination", "Group guide", "Basic route briefing"],
    safety:
      "The route can become slippery in wet weather. Stay with the group, follow the guide and carry enough water.",
    route: [
      [-1.406, 36.663],
      [-1.4, 36.675],
      [-1.391, 36.684],
      [-1.383, 36.694],
    ],
  },
  {
    id: "karura",
    name: "Karura Forest",
    location: "Nairobi",
    date: "Sunday, 27 September 2026",
    distance: "7 km",
    elevation: "120 m gain",
    difficulty: "Easy",
    duration: "2–3 hours",
    meeting: "Karura Forest Gate",
    price: "KSh 700",
    category: ["easy", "forests", "scenic"],
    image: "images/upcoming_hikes/karura_forest.jpg",
    description:
      "A relaxed forest adventure with shaded trails and plenty of room to enjoy a slower pace.",
    bring: [
      "1.5 litres of water",
      "Walking shoes",
      "Light jacket",
      "Snacks",
      "Sun protection",
    ],
    included: ["Trail coordination", "Group guide", "Route briefing"],
    safety:
      "Stay on designated trails and remain aware of cyclists and other trail users.",
    route: [
      [-1.25, 36.829],
      [-1.246, 36.837],
      [-1.237, 36.842],
      [-1.23, 36.835],
    ],
  },
  {
    id: "longonot",
    name: "Mt. Longonot",
    location: "Naivasha, Nakuru County",
    date: "Saturday, 3 October 2026",
    distance: "9 km",
    elevation: "630 m gain",
    difficulty: "Difficult",
    duration: "4–6 hours",
    meeting: "Mt. Longonot Gate",
    price: "KSh 1,500",
    category: ["difficult", "mountains", "scenic"],
    image: "images/upcoming_hikes/mt_longonot.jpg",
    description:
      "A demanding climb with a crater-rim section and wide Rift Valley views. Best for hikers comfortable with sustained uphill walking.",
    bring: [
      "2–3 litres of water",
      "Proper hiking shoes",
      "Rain protection",
      "Food and snacks",
      "Sun protection",
    ],
    included: ["Trail coordination", "Group guide", "Safety briefing"],
    safety:
      "This is a strenuous route. Pace yourself, communicate with the guide and turn back if conditions or your wellbeing make continuing unsafe.",
    route: [
      [-0.994, 36.469],
      [-0.987, 36.475],
      [-0.978, 36.482],
      [-0.97, 36.49],
    ],
  },
  {
    id: "waterfall",
    name: "Paradise Lost",
    location: "Kiambu County",
    date: "Sunday, 11 October 2026",
    distance: "6 km",
    elevation: "180 m gain",
    difficulty: "Moderate",
    duration: "3–4 hours",
    meeting: "KencomCBD",
    price: "KSh 900",
    category: ["moderate", "waterfalls", "scenic"],
    image: "images/upcoming_hikes/paradise_lost.jpg",
    description:
      "A scenic route through green terrain ending at a waterfall. Expect uneven ground and some wet sections.",
    bring: [
      "2 litres of water",
      "Shoes with good grip",
      "Light jacket",
      "Snacks",
      "Change of socks",
    ],
    included: ["Trail coordination", "Group guide", "Route briefing"],
    safety:
      "Rocks around water can be slippery. Follow marked access routes and do not climb on unstable edges.",
    route: [
      [-1.06, 36.72],
      [-1.056, 36.728],
      [-1.05, 36.735],
      [-1.043, 36.741],
    ],
  },
];

function renderFeatured() {
  const wrap = $("#featured-hikes");
  if (!wrap) return;
  wrap.innerHTML = hikeData
    .slice(0, 3)
    .map((h) => hikeCard(h))
    .join("");
}
function hikeCard(h) {
  return `<article class="card hike-card">
    <div class="hike-img"><img src="${h.image}" alt="${h.name} hiking trail" loading="lazy"></div>
    <div class="hike-body">
      <span class="badge">${h.difficulty}</span>
      <h3>${h.name}</h3>
      <p>${h.location}</p>
      <div class="hike-meta"><span>${h.distance}</span><span>${h.duration}</span><span class="price">${h.price}</span></div>
      <div class="actions">
        <button class="btn view-hike" data-id="${h.id}">View Details</button>
        <a class="btn" href="booking.html?hike=${encodeURIComponent(h.id)}">Book / Register</a>
      </div>
    </div>
  </article>`;
}
function setupHikeButtons() {
  $$(".view-hike").forEach((b) =>
    b.addEventListener("click", () => openHike(b.dataset.id)),
  );
}
function openHike(id) {
  const h = hikeData.find((x) => x.id === id);
  if (!h) return;
  const modal = $("#hike-modal");
  if (!modal) return;
  $("#modal-content").innerHTML = `<div class="detail-grid">
    <div><div class="detail-photo"><img src="${h.image}" alt="${h.name}"></div></div>
    <div class="detail-side">
      <span class="badge">${h.difficulty}</span>
      <h2>${h.name}</h2><p>${h.description}</p>
      <div class="detail-facts">
        <div class="fact"><small>Location</small><strong>${h.location}</strong></div>
        <div class="fact"><small>Date</small><strong>${h.date}</strong></div>
        <div class="fact"><small>Distance</small><strong>${h.distance}</strong></div>
        <div class="fact"><small>Elevation</small><strong>${h.elevation}</strong></div>
        <div class="fact"><small>Duration</small><strong>${h.duration}</strong></div>
        <div class="fact"><small>Meeting point</small><strong>${h.meeting}</strong></div>
      </div>
      <p style="margin-top:20px"><strong>${h.price}</strong></p>
      <div class="actions"><a class="btn fill" href="booking.html?hike=${encodeURIComponent(h.id)}">Book / Register</a><a class="btn" href="hike.html?id=${encodeURIComponent(h.id)}">Full Details</a></div>
    </div>
  </div>`;
  modal.classList.add("show");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  $("#hike-modal")?.classList.remove("show");
  document.body.style.overflow = "";
}
$("#close-modal")?.addEventListener("click", closeModal);
$("#hike-modal")?.addEventListener("click", (e) => {
  if (e.target.id === "hike-modal") closeModal();
});

function setupHikesPage() {
  const grid = $("#all-hikes");
  if (!grid) return;
  const search = $("#hike-search"),
    diff = $("#difficulty-filter"),
    type = $("#type-filter");
  function render() {
    const q = (search.value || "").toLowerCase();
    const d = diff.value,
      t = type.value;
    const list = hikeData.filter((h) => {
      const matchesQ =
        !q || `${h.name} ${h.location}`.toLowerCase().includes(q);
      const matchesD = !d || h.difficulty.toLowerCase() === d;
      const matchesT = !t || h.category.includes(t);
      return matchesQ && matchesD && matchesT;
    });
    grid.innerHTML = list.length
      ? list.map((h) => hikeCard(h)).join("")
      : `<div class="empty">No hikes match those filters.</div>`;
    setupHikeButtons();
  }
  [search, diff, type].forEach((x) => x?.addEventListener("input", render));
  render();
  $$(".category-btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      $$(".category-btn").forEach((x) => x.classList.remove("active"));
      btn.classList.add("active");
      type.value = btn.dataset.type === "all" ? "" : btn.dataset.type;
      render();
    }),
  );
}

function setupDetailPage() {
  const mount = $("#hike-detail");
  if (!mount) return;
  const id = new URLSearchParams(location.search).get("id") || "ngong-hills";
  const h = hikeData.find((x) => x.id === id) || hikeData[0];
  mount.innerHTML = `<div class="detail-grid">
    <div>
      <div class="detail-photo"><img src="${h.image}" alt="${h.name}"></div>
      <div class="elevation"><div class="eyebrow">Elevation profile</div>
        <svg viewBox="0 0 600 180" preserveAspectRatio="none" aria-label="Illustrative elevation profile">
          <line class="axis" x1="0" y1="150" x2="600" y2="150"></line>
          <polyline points="0,145 80,128 150,136 220,80 285,104 350,55 420,82 490,35 600,70"></polyline>
        </svg>
        <small style="color:var(--muted)">Illustrative route profile. Confirm current trail conditions before departure.</small>
      </div>
    </div>
    <div class="detail-side">
      <span class="badge">${h.difficulty}</span><h2>${h.name}</h2><p>${h.description}</p>
      <div class="detail-facts">
        <div class="fact"><small>Date</small><strong>${h.date}</strong></div><div class="fact"><small>Price</small><strong>${h.price}</strong></div>
        <div class="fact"><small>Location</small><strong>${h.location}</strong></div><div class="fact"><small>Distance</small><strong>${h.distance}</strong></div>
        <div class="fact"><small>Elevation</small><strong>${h.elevation}</strong></div><div class="fact"><small>Duration</small><strong>${h.duration}</strong></div>
        <div class="fact"><small>Meeting point</small><strong>${h.meeting}</strong></div><div class="fact"><small>Difficulty</small><strong>${h.difficulty}</strong></div>
      </div>
      <div class="actions"><a class="btn fill" href="booking.html?hike=${encodeURIComponent(h.id)}">Book / Register</a><a class="btn" href="hikes.html">Back to Hikes</a></div>
    </div>
  </div>
  <div class="detail-sections">
    <div class="card list-card"><div class="eyebrow">What to bring</div><h3>Pack for the trail</h3><ul>${h.bring.map((x) => `<li>${x}</li>`).join("")}</ul></div>
    <div class="card list-card"><div class="eyebrow">What's included</div><h3>Included in registration</h3><ul>${h.included.map((x) => `<li>${x}</li>`).join("")}</ul></div>
    <div class="card list-card"><div class="eyebrow">Safety</div><h3>Before you set out</h3><p class="notice">${h.safety}</p></div>
    <div class="card list-card"><div class="eyebrow">Meeting point</div><h3>${h.meeting}</h3><p>Arrive early for registration and the route briefing. The exact meeting instructions should be confirmed before the hike.</p></div>
  </div>`;
  const map = L.map("detail-map").setView(h.route[0], 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);
  L.polyline(h.route, { color: "#c59a3b", weight: 4 }).addTo(map);
  L.marker(h.route[0]).addTo(map).bindPopup("Meeting point");
  L.marker(h.route[h.route.length - 1])
    .addTo(map)
    .bindPopup("Trail point");
  map.fitBounds(h.route, { padding: [25, 25] });
}

function setupBooking() {
  const form = $("#booking-form");
  if (!form) return;
  const select = $("#hike-select"),
    params = new URLSearchParams(location.search),
    chosen = params.get("hike");
  select.innerHTML = hikeData
    .map((h) => `<option value="${h.id}">${h.name} — ${h.date}</option>`)
    .join("");
  if (chosen && hikeData.some((h) => h.id === chosen)) select.value = chosen;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const h = hikeData.find((x) => x.id === data.get("hike"));
    const ref = "TH-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    $("#confirmation").innerHTML =
      `<strong>Registration received</strong><p>Your registration reference is <strong>${ref}</strong>.</p><p>${h.name} on ${h.date}. This is a registration request; payment should be confirmed separately using the organiser's official payment instructions.</p>`;
    $("#confirmation").classList.add("show");
    form.reset();
    select.value = h.id;
    localStorage.setItem(
      "lastTagalongRegistration",
      JSON.stringify({
        ref,
        hike: h.id,
        name: data.get("name"),
        date: new Date().toISOString(),
      }),
    );
  });
}

async function loadWeather() {
  const wrap = $("#weather-cards");
  if (!wrap) return;
  try {
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=-1.2921&longitude=36.8219&current=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Africa%2FNairobi&forecast_days=4";
    const res = await fetch(url);
    const d = await res.json();
    const desc = (c) =>
      ({
        0: "Clear",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Cloudy",
        45: "Foggy",
        48: "Foggy",
        51: "Light drizzle",
        53: "Drizzle",
        55: "Drizzle",
        61: "Light rain",
        63: "Rain",
        65: "Heavy rain",
        80: "Showers",
        81: "Showers",
        82: "Heavy showers",
        95: "Thunderstorm",
      })[c] || "Variable";
    wrap.innerHTML = d.daily.time
      .map(
        (day, i) =>
          `<div class="weather-card"><div class="weather-day">${new Date(day).toLocaleDateString("en-KE", { weekday: "short", day: "numeric", month: "short" })}</div><div class="weather-temp">${Math.round(d.daily.temperature_2m_max[i])}°</div><div class="weather-desc">${desc(d.current?.weather_code || 2)} · Rain chance ${d.daily.precipitation_probability_max[i] ?? 0}%</div></div>`,
      )
      .join("");
  } catch (e) {
    wrap.innerHTML = `<div class="empty">Weather data is temporarily unavailable. Check the forecast again before your hike.</div>`;
  }
}

renderFeatured();
setupHikeButtons();
setupHikesPage();
setupDetailPage();
setupBooking();
loadWeather();

$$("[data-scroll]").forEach((b) =>
  b.addEventListener("click", () =>
    $(b.dataset.scroll)?.scrollIntoView({ behavior: "smooth" }),
  ),
);

const contactMapEl = $("#contact-map");
if (contactMapEl && typeof L !== "undefined") {
  const map = L.map("contact-map").setView([-1.2921, 36.8219], 11);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);
  L.marker([-1.2921, 36.8219])
    .addTo(map)
    .bindPopup("Nairobi reference point")
    .openPopup();
}
const detailTitle = $("#detail-title");
if (detailTitle) {
  const id = new URLSearchParams(location.search).get("id") || "ngong-hills";
  const h = hikeData.find((x) => x.id === id) || hikeData[0];
  detailTitle.textContent = h.name;
}

function initHikerScene() {
  const canvas = document.getElementById("hiker-canvas");
  if (!canvas || typeof THREE === "undefined") return;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x25332f, 18, 70);
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 120);
  camera.position.set(7, 5.2, 15);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  scene.add(new THREE.HemisphereLight(0xf7e5bf, 0x16201d, 2.1));
  const sun = new THREE.DirectionalLight(0xffdca1, 4.0);
  sun.position.set(-8, 14, 10);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0x9eb1a5, 1.15);
  fill.position.set(8, 6, -8);
  scene.add(fill);

  const mat = (color, rough = 0.9) =>
    new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0 });
  const earth = mat(0x433b2d, 1),
    earth2 = mat(0x5a4b37, 1),
    grass = mat(0x29372e, 1),
    rock = mat(0x51534a, 1),
    darkRock = mat(0x30342f, 1);

  // Large sloping mountain terrain.
  const terrainGeo = new THREE.PlaneGeometry(80, 90, 48, 48);
  const pos = terrainGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i),
      y = pos.getY(i);
    const z =
      0.2 * y + Math.sin(x * 0.24) * 0.45 + Math.sin(y * 0.18 + x * 0.1) * 0.55;
    pos.setZ(i, z);
  }
  terrainGeo.computeVertexNormals();
  const terrain = new THREE.Mesh(terrainGeo, earth);
  terrain.rotation.x = -Math.PI / 2;
  terrain.position.set(0, -1.35, -18);
  terrain.receiveShadow = true;
  scene.add(terrain);

  // Layered mountain ridges behind the trail.
  const ridgeMat = mat(0x1c2925, 1),
    ridgeMat2 = mat(0x26332e, 1);
  for (let i = 0; i < 9; i++) {
    const g = new THREE.ConeGeometry(7 + (i % 3) * 2, 13 + (i % 4) * 3, 7);
    const m = new THREE.Mesh(g, i % 2 ? ridgeMat : ridgeMat2);
    m.position.set(-29 + i * 7.4, 2.2, -48 - (i % 3) * 3);
    m.rotation.y = i * 0.37;
    m.scale.z = 1.3;
    scene.add(m);
  }

  // Winding trail made from connected ribbon segments.
  const trailMat = mat(0x756047, 1);
  const trailGroup = new THREE.Group();
  scene.add(trailGroup);
  const points = [];
  for (let i = 0; i < 34; i++) {
    const z = 10 - i * 1.65;
    const x = Math.sin(i * 0.48) * 2.2 + Math.sin(i * 0.13) * 1.4;
    const y = 0.55 + i * 0.18;
    points.push(new THREE.Vector3(x, y, z));
  }
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i],
      b = points[i + 1],
      mid = a.clone().add(b).multiplyScalar(0.5);
    const len = a.distanceTo(b);
    const seg = new THREE.Mesh(
      new THREE.PlaneGeometry(3.1, len, 1, 1),
      trailMat,
    );
    seg.position.copy(mid);
    seg.lookAt(b);
    seg.rotateX(Math.PI / 2);
    seg.receiveShadow = true;
    trailGroup.add(seg);
  }
  // Trail edge stones and vegetation.
  for (let i = 0; i < 75; i++) {
    const k = (i * 7) % 30,
      side = i % 2 ? 1 : -1,
      p = points[k];
    const obj = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.16 + (i % 4) * 0.08, 0),
      i % 5 === 0 ? rock : darkRock,
    );
    obj.position.set(
      p.x + side * (1.75 + (i % 3) * 0.35),
      p.y - 0.18,
      p.z + 0.1 * Math.sin(i),
    );
    obj.scale.y = 0.55;
    obj.rotation.set(i * 0.4, i * 0.7, i * 0.2);
    obj.castShadow = true;
    scene.add(obj);
    if (i < 42) {
      const bush = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.32 + (i % 3) * 0.09, 1),
        grass,
      );
      bush.position.set(
        p.x + side * (2.8 + (i % 2) * 0.45),
        p.y - 0.05,
        p.z - 0.3,
      );
      bush.scale.y = 0.7;
      bush.castShadow = true;
      scene.add(bush);
    }
  }

  // Stylized but more human-proportioned 3D hiker.
  const hiker = new THREE.Group();
  scene.add(hiker);
  hiker.position.copy(points[2]);
  hiker.rotation.y = Math.PI + 0.08;
  const skin = mat(0x8d5b3b, 0.75),
    shirt = mat(0x161817, 0.82),
    pants = mat(0x4c4a42, 0.92),
    pack = mat(0x202522, 0.9),
    gold = mat(0xc79d45, 0.65),
    shoe = mat(0x151616, 0.88);
  const box = (w, h, d, m) => {
    const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
    o.castShadow = true;
    return o;
  };
  const torso = box(0.9, 1.25, 0.52, shirt);
  torso.position.y = 2.15;
  hiker.add(torso);
  const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.18, 0.22, 16),
    skin,
  );
  neck.position.y = 2.88;
  neck.castShadow = true;
  hiker.add(neck);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.34, 24, 18), skin);
  head.position.y = 3.25;
  head.scale.set(0.98, 1.08, 0.95);
  head.castShadow = true;
  hiker.add(head);
  const hat = new THREE.Mesh(
    new THREE.SphereGeometry(0.37, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2),
    shirt,
  );
  hat.position.y = 3.47;
  hat.scale.set(1, 0.48, 1);
  hat.castShadow = true;
  hiker.add(hat);
  const brim = box(0.54, 0.06, 0.35, shirt);
  brim.position.set(0, 3.36, -0.27);
  hiker.add(brim);
  const backpack = box(0.78, 1.18, 0.34, pack);
  backpack.position.set(0, 2.15, 0.43);
  hiker.add(backpack);
  const strap1 = box(0.06, 1.0, 0.035, gold);
  strap1.position.set(-0.22, 2.18, 0.68);
  hiker.add(strap1);
  const strap2 = box(0.06, 1.0, 0.035, gold);
  strap2.position.set(0.22, 2.18, 0.68);
  hiker.add(strap2);

  function limb(parent, x, y, upper, lower) {
    const group = new THREE.Group();
    group.position.set(x, y, 0);
    parent.add(group);
    const a = box(0.27, 0.72, 0.29, upper);
    a.position.y = -0.36;
    group.add(a);
    const b = box(0.24, 0.68, 0.25, lower);
    b.position.y = -1.02;
    group.add(b);
    return group;
  }
  const leftLeg = limb(hiker, -0.23, 1.58, pants, pants),
    rightLeg = limb(hiker, 0.23, 1.58, pants, pants);
  const footL = box(0.32, 0.17, 0.62, shoe);
  footL.position.set(0, -1.42, -0.11);
  leftLeg.add(footL);
  const footR = box(0.32, 0.17, 0.62, shoe);
  footR.position.set(0, -1.42, -0.11);
  rightLeg.add(footR);
  const leftArm = limb(hiker, -0.54, 2.63, shirt, skin),
    rightArm = limb(hiker, 0.54, 2.63, shirt, skin);

  const poleMat = mat(0x242522, 0.55);
  function makePole(side) {
    const g = new THREE.Group();
    const shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 2.5, 8),
      poleMat,
    );
    shaft.position.y = -1.15;
    shaft.rotation.z = side * 0.1;
    shaft.castShadow = true;
    g.add(shaft);
    const grip = box(0.13, 0.1, 0.12, gold);
    grip.position.y = 0.12;
    g.add(grip);
    return g;
  }
  const poleL = makePole(-1),
    poleR = makePole(1);
  poleL.position.set(-0.82, 2.15, -0.05);
  poleR.position.set(0.82, 2.15, -0.05);
  hiker.add(poleL, poleR);

  // A subtle trail marker.
  const marker = new THREE.Group();
  const post = box(0.08, 1.3, 0.08, shoe);
  post.position.y = 0.65;
  marker.add(post);
  const sign = box(0.72, 0.3, 0.07, gold);
  sign.position.set(0.2, 1.18, 0);
  marker.add(sign);
  marker.position.copy(points[10]);
  marker.position.x += 2.25;
  marker.rotation.y = -0.25;
  marker.castShadow = true;
  scene.add(marker);

  let t = 0,
    last = performance.now();
  function resize() {
    const r = canvas.getBoundingClientRect(),
      w = Math.max(1, r.width),
      h = Math.max(1, r.height);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);
  resize();

  function animate(now) {
    requestAnimationFrame(animate);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    t += dt * 3.2;
    const stride = Math.sin(t);
    leftLeg.rotation.x = stride * 0.48;
    rightLeg.rotation.x = -stride * 0.48;
    leftArm.rotation.x = -stride * 0.28;
    rightArm.rotation.x = stride * 0.28;
    poleL.rotation.x = -stride * 0.14;
    poleR.rotation.x = stride * 0.14;
    hiker.position.y = points[2].y + Math.abs(Math.sin(t * 2)) * 0.035;
    hiker.position.x = points[2].x + Math.sin(t * 0.32) * 0.12;
    hiker.rotation.y = Math.PI + 0.08 + Math.sin(t * 0.2) * 0.03;
    camera.position.x = 7.2 + Math.sin(t * 0.08) * 0.35;
    camera.position.y = 5.4 + Math.sin(t * 0.11) * 0.12;
    camera.lookAt(0, 2.0, -5);
    renderer.render(scene, camera);
  }
  requestAnimationFrame(animate);
}

initHikerScene();

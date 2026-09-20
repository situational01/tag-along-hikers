const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

/* ---------- SITE CONFIG: edit contact + social details here ---------- */
const SITE = {
  whatsapp: "254700000000", // international format, no + or spaces
  whatsappMessage: "Hi Tagalong Hikers! I'd like to know more about your hikes.",
  social: {
    facebook: "https://www.facebook.com/tagalonghikers",
    instagram: "https://www.instagram.com/tagalonghikers",
    tiktok: "https://www.tiktok.com/@tagalonghikers",
  },
};

const savedTheme = localStorage.getItem("tagalong-theme");
if (savedTheme === "light") document.documentElement.dataset.theme = "light";

/* ---------- Header controls: theme toggle + mobile menu ---------- */
const themeBtn = $(".theme-btn");
if (themeBtn) {
  themeBtn.innerHTML =
    '<span class="ico ico-sun" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg></span>' +
    '<span class="ico ico-moon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg></span>';
}
function updateThemeText() {
  if (!themeBtn) return;
  const light = document.documentElement.dataset.theme === "light";
  const label = light ? "Switch to dark mode" : "Switch to light mode";
  themeBtn.setAttribute("aria-label", label);
  themeBtn.title = label;
}
updateThemeText();
themeBtn?.addEventListener("click", () => {
  const light = document.documentElement.dataset.theme === "light";
  if (light) delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = "light";
  localStorage.setItem("tagalong-theme", light ? "dark" : "light");
  updateThemeText();
});

window.addEventListener("storage", (e) => {
  if (e.key !== "tagalong-theme") return;
  if (e.newValue === "light") document.documentElement.dataset.theme = "light";
  else delete document.documentElement.dataset.theme;
  updateThemeText();
});

const menuBtn = $(".menu-btn"),
  nav = $(".nav-links");
if (menuBtn && nav) {
  if (!nav.id) nav.id = "site-nav";
  menuBtn.innerHTML = '<span class="bars" aria-hidden="true"><i></i><i></i><i></i></span>';
  menuBtn.setAttribute("aria-controls", nav.id);
  const setMenu = (open) => {
    nav.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  setMenu(false);
  menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  $$(".nav-links a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".site-header")) setMenu(false);
  });
  window.matchMedia("(min-width: 901px)").addEventListener("change", () => setMenu(false));
}

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

/* ---------- Weather: Open-Meteo first, MET Norway as backup, saved copy as last resort ---------- */
const WEATHER_CACHE_KEY = "tagalong-weather";
const WMO_TEXT = {
  0: "Clear", 1: "Mainly clear", 2: "Partly cloudy", 3: "Cloudy", 45: "Foggy", 48: "Foggy",
  51: "Light drizzle", 53: "Drizzle", 55: "Drizzle", 56: "Freezing drizzle", 57: "Freezing drizzle",
  61: "Light rain", 63: "Rain", 65: "Heavy rain", 66: "Freezing rain", 67: "Freezing rain",
  80: "Showers", 81: "Showers", 82: "Heavy showers", 95: "Thunderstorm", 96: "Thunderstorm", 99: "Thunderstorm",
};
const nairobiToday = () => new Date(Date.now() + 3 * 3600 * 1000).toISOString().slice(0, 10); // UTC+3 all year

async function fetchJSON(url, ms = 9000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error("HTTP " + res.status);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

async function weatherFromOpenMeteo() {
  const d = await fetchJSON(
    "https://api.open-meteo.com/v1/forecast?latitude=-1.2921&longitude=36.8219&daily=weather_code,temperature_2m_max,precipitation_probability_max&timezone=Africa%2FNairobi&forecast_days=4",
  );
  if (!d?.daily?.time?.length) throw new Error(d?.reason || "Unexpected response");
  return d.daily.time.map((date, i) => ({
    date,
    temp: Math.round(d.daily.temperature_2m_max[i]),
    desc: WMO_TEXT[d.daily.weather_code?.[i]] || "Variable",
    rain: `Rain chance ${d.daily.precipitation_probability_max?.[i] ?? 0}%`,
  }));
}

function metSymbolText(code = "") {
  const c = code.replace(/_(day|night|polartwilight)$/, "");
  if (c.includes("thunder")) return "Thunderstorm";
  if (c.includes("heavyrain")) return "Heavy rain";
  if (c.includes("lightrain")) return "Light rain";
  if (c.includes("showers")) return "Showers";
  if (c.includes("rain")) return "Rain";
  if (c.includes("drizzle")) return "Drizzle";
  return { clearsky: "Clear", fair: "Mainly clear", partlycloudy: "Partly cloudy", cloudy: "Cloudy", fog: "Foggy" }[c] || "Variable";
}

async function weatherFromMet() {
  const d = await fetchJSON("https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=-1.2921&lon=36.8219");
  const series = d?.properties?.timeseries;
  if (!series?.length) throw new Error("Unexpected response");
  const days = new Map();
  series.forEach((pt) => {
    const local = new Date(new Date(pt.time).getTime() + 3 * 3600 * 1000);
    const key = local.toISOString().slice(0, 10);
    const day = days.get(key) || { date: key, temps: [], mm: 0, symbol: "", dist: 99 };
    const t = pt.data?.instant?.details?.air_temperature;
    if (typeof t === "number") day.temps.push(t);
    const n1 = pt.data?.next_1_hours,
      n6 = pt.data?.next_6_hours;
    const block = n1 || n6; // hourly steps early on, 6-hourly later: count each period once
    day.mm += block?.details?.precipitation_amount || 0;
    const dist = Math.abs(local.getUTCHours() - 12);
    if (block?.summary?.symbol_code && dist < day.dist) {
      day.symbol = block.summary.symbol_code;
      day.dist = dist;
    }
    days.set(key, day);
  });
  const out = [...days.values()]
    .filter((x) => x.temps.length && x.date >= nairobiToday())
    .slice(0, 4)
    .map((x) => ({
      date: x.date,
      temp: Math.round(Math.max(...x.temps)),
      desc: metSymbolText(x.symbol),
      rain: x.mm >= 0.1 ? `Rain ${x.mm.toFixed(1)} mm` : "Dry",
    }));
  if (!out.length) throw new Error("No usable days");
  return out;
}

function renderWeather(wrap, days, note) {
  wrap.innerHTML =
    days
      .map(
        (x) =>
          `<div class="weather-card"><div class="weather-day">${new Date(x.date + "T12:00:00").toLocaleDateString("en-KE", { weekday: "short", day: "numeric", month: "short" })}</div><div class="weather-temp">${x.temp}°</div><div class="weather-desc">${x.desc} · ${x.rain}</div></div>`,
      )
      .join("") + (note ? `<p class="weather-note">${note}</p>` : "");
}

async function loadWeather() {
  const wrap = $("#weather-cards");
  if (!wrap) return;
  wrap.innerHTML = '<div class="empty">Loading forecast…</div>';

  const providers = [
    ["Open-Meteo", weatherFromOpenMeteo, 2],
    ["MET Norway", weatherFromMet, 1],
  ];
  for (const [name, fn, tries] of providers) {
    for (let i = 0; i < tries; i++) {
      try {
        const days = await fn();
        try {
          localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify({ ts: Date.now(), name, days }));
        } catch {}
        renderWeather(wrap, days, `Forecast for Nairobi · data from ${name}`);
        return;
      } catch (e) {
        console.warn(`[weather] ${name} failed (attempt ${i + 1}):`, e);
      }
    }
  }

  try {
    const saved = JSON.parse(localStorage.getItem(WEATHER_CACHE_KEY) || "null");
    const upcoming = saved?.days?.filter((x) => x.date >= nairobiToday()) || [];
    if (upcoming.length && Date.now() - saved.ts < 24 * 3600 * 1000) {
      const hrs = Math.max(1, Math.round((Date.now() - saved.ts) / 3600000));
      renderWeather(wrap, upcoming, `Live forecast is unavailable, so this is your last saved forecast (${hrs}h old). Check again before your hike.`);
      return;
    }
  } catch {}

  wrap.innerHTML = `<div class="empty weather-error"><p>Weather data is temporarily unavailable. Check the forecast again before your hike.</p>
    <div class="actions"><button type="button" class="btn fill" data-retry>Try again</button><a class="btn" href="https://meteo.go.ke/" target="_blank" rel="noopener">Kenya Met Department</a></div></div>`;
  wrap.querySelector("[data-retry]")?.addEventListener("click", loadWeather);
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

/* ===================================================================
   KENYA HIKING MAP  (contact page, #contact-map)
   - Tiles follow the light / dark theme; "Terrain" switches to contours
   - Pins are coloured by difficulty; Tagalong hikes are ringed in gold
   - Our own hikes are read from hikeData above, so they always match
   =================================================================== */
const NAIROBI = [-1.2921, 36.8219];
const KENYA_BOUNDS = [[-4.8, 33.9], [5.1, 42.0]];
const OUR_HIKE_IDS = ["ngong-hills", "karura", "longonot", "waterfall"];

/* Coordinates and facts are approximate: check before publishing. */
const OTHER_SPOTS = [
  { id: "mt-kenya", name: "Mt. Kenya", region: "Central Kenya", lat: -0.1521, lng: 37.3084, level: "difficult",
    elev: "4,985 m (Point Lenana)", time: "3–5 days", season: "Jan–Mar, Aug–Sep",
    note: "Kenya's highest mountain and a UNESCO World Heritage Site. Point Lenana is the trekking summit; allow time to acclimatise." },
  { id: "mt-elgon", name: "Mt. Elgon", region: "Western Kenya", lat: 1.1333, lng: 34.55, level: "moderate",
    elev: "4,187 m (Koitobos)", time: "2–3 days", season: "Dec–Mar, Jun–Sep",
    note: "A huge extinct volcano on the Uganda border with caves, hot springs and gentler slopes than Mt. Kenya." },
  { id: "aberdares", name: "Aberdare Ranges", region: "Nyandarua / Nyeri", lat: -0.4, lng: 36.7, level: "difficult",
    elev: "3,999 m (Ol Donyo Lesatima)", time: "1–2 days", season: "Jan–Mar, Jul–Oct",
    note: "Moorland, waterfalls and bamboo forest. It is cold and often wet, so pack warm layers." },
  { id: "suswa", name: "Mt. Suswa", region: "Narok / Kajiado", lat: -1.1833, lng: 36.35, level: "moderate",
    elev: "2,356 m", time: "5–7 hours", season: "Jun–Oct, Jan–Feb",
    note: "A double-crater volcano with a ring trail and lava caves. Go with a guide." },
  { id: "hells-gate", name: "Hell's Gate", region: "Naivasha", lat: -0.9, lng: 36.3167, level: "easy",
    elev: "≈1,900 m", time: "3–5 hours", season: "Jun–Oct, Jan–Feb",
    note: "Walk through red-walled gorges past hot springs, with zebra, giraffe and buffalo nearby." },
  { id: "menengai", name: "Menengai Crater", region: "Nakuru", lat: -0.2, lng: 36.0667, level: "easy",
    elev: "2,278 m (rim)", time: "3–4 hours", season: "Jun–Oct, Dec–Feb",
    note: "A rim walk around one of the largest volcanic calderas in the world, with views across Nakuru." },
  { id: "ol-donyo-sabuk", name: "Ol Donyo Sabuk", region: "Machakos / Kiambu", lat: -1.13, lng: 37.24, level: "easy",
    elev: "2,146 m", time: "3–4 hours", season: "Jun–Oct, Jan–Feb",
    note: "A forested mountain near Thika with cool, quiet trails and a summit view toward Mt. Kenya." },
  { id: "chyulu", name: "Chyulu Hills", region: "Makueni / Kajiado", lat: -2.6667, lng: 37.85, level: "moderate",
    elev: "≈2,188 m", time: "1 day", season: "Jun–Oct, Jan–Feb",
    note: "Green volcanic hills with lava tubes and views of Kilimanjaro on clear mornings." },
  { id: "cherangani", name: "Cherangani Hills", region: "Elgeyo-Marakwet / West Pokot", lat: 1.25, lng: 35.4167, level: "moderate",
    elev: "3,581 m (Kamelogon)", time: "1–3 days", season: "Dec–Mar",
    note: "Highland forest and moorland in the west. Paths are remote, so hire a local guide." },
  { id: "kakamega", name: "Kakamega Forest", region: "Western Kenya", lat: 0.2833, lng: 34.85, level: "easy",
    elev: "≈1,600 m", time: "2–4 hours", season: "Dec–Feb, Jun–Sep",
    note: "Kenya's last patch of tropical rainforest, home to monkeys and hundreds of bird species. Early mornings are best." },
  { id: "shimba", name: "Shimba Hills", region: "Kwale (Coast)", lat: -4.2167, lng: 39.4167, level: "easy",
    elev: "≈450 m", time: "2–3 hours", season: "Jan–Mar, Jun–Oct",
    note: "A coastal forest reserve with sable antelope and waterfalls, a cooler escape from the heat of Mombasa." },
];

function kmFromNairobi(lat, lng) {
  const R = 6371, rad = Math.PI / 180;
  const dLat = (lat - NAIROBI[0]) * rad, dLng = (lng - NAIROBI[1]) * rad;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(NAIROBI[0] * rad) * Math.cos(lat * rad) * Math.sin(dLng / 2) ** 2;
  return Math.max(10, Math.round((2 * R * Math.asin(Math.sqrt(a))) / 10) * 10);
}
const capWord = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function initKenyaMap(el) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const spots = [
    ...OUR_HIKE_IDS.map((id) => hikeData.find((h) => h.id === id))
      .filter(Boolean)
      .map((h) => ({
        id: h.id, name: h.name, region: h.location, lat: h.route[0][0], lng: h.route[0][1],
        level: h.difficulty.toLowerCase(), note: h.description, ours: true,
        facts: [["Distance", h.distance], ["Elevation gain", h.elevation], ["Next hike", h.date], ["Price", h.price]],
      })),
    ...OTHER_SPOTS.map((s) => ({
      ...s, ours: false,
      facts: [["Elevation", s.elev], ["Typical time", s.time], ["Best months", s.season]],
    })),
  ].map((s) => ({ ...s, km: kmFromNairobi(s.lat, s.lng) }));

  el.classList.add("kenya-map");
  const wrap = el.closest(".kenya-wrap") || el.parentElement;
  const list = $("#spot-list"), filters = $("#map-filters");

  const map = L.map(el, {
    zoomControl: false, minZoom: 5, maxZoom: 15, zoomSnap: 0.25,
    maxBounds: [[-7, 31], [7.5, 44.5]], maxBoundsViscosity: 0.85,
    dragging: !L.Browser.mobile,
  }).fitBounds(KENYA_BOUNDS, { padding: [10, 10] });
  L.control.zoom({ position: "topleft" }).addTo(map);

  /* wheel zoom only after the map is clicked, so page scrolling never gets stuck */
  map.scrollWheelZoom.disable();
  map.on("click focus", () => map.scrollWheelZoom.enable());
  map.on("mouseout", () => map.scrollWheelZoom.disable());

  /* ---- tiles: theme-aware, plus a terrain option ---- */
  const carto = (style) =>
    L.tileLayer(`https://{s}.basemaps.cartocdn.com/${style}/{z}/{x}/{y}{r}.png`, {
      subdomains: "abcd", maxZoom: 19, attribution: "© OpenStreetMap contributors © CARTO",
    });
  const layers = {
    dark: carto("dark_all"),
    light: carto("rastertiles/voyager"),
    topo: L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
      maxZoom: 17, attribution: "Map data © OpenStreetMap contributors, SRTM | Style © OpenTopoMap (CC-BY-SA)",
    }),
  };
  let base = null, mode = "map";
  function applyBase() {
    const light = document.documentElement.dataset.theme === "light";
    const next = mode === "terrain" ? layers.topo : light ? layers.light : layers.dark;
    if (base === next) return;
    next.addTo(map);
    if (base) map.removeLayer(base);
    base = next;
    el.classList.toggle("is-terrain", mode === "terrain");
  }
  applyBase();
  new MutationObserver(applyBase).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  /* ---- controls: Map / Terrain toggle and legend ---- */
  const toggle = L.control({ position: "topright" });
  toggle.onAdd = () => {
    const d = L.DomUtil.create("div", "map-panel map-toggle");
    d.innerHTML = '<button type="button" data-mode="map" class="active">Map</button><button type="button" data-mode="terrain">Terrain</button>';
    L.DomEvent.disableClickPropagation(d);
    d.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      mode = b.dataset.mode;
      d.querySelectorAll("button").forEach((x) => x.classList.toggle("active", x === b));
      applyBase();
    });
    return d;
  };
  toggle.addTo(map);

  const legend = L.control({ position: "bottomleft" });
  legend.onAdd = () => {
    const d = L.DomUtil.create("div", "map-panel map-legend");
    d.innerHTML =
      '<span><i class="dot lv-easy"></i>Easy</span><span><i class="dot lv-moderate"></i>Moderate</span>' +
      '<span><i class="dot lv-difficult"></i>Difficult</span><span><i class="dot ring"></i>Tagalong hike</span>';
    L.DomEvent.disableClickPropagation(d);
    return d;
  };
  legend.addTo(map);

  /* Nairobi: our base */
  L.circleMarker(NAIROBI, { radius: 6, color: "#f1d995", weight: 2, fillColor: "#e6c068", fillOpacity: 1, interactive: false })
    .bindTooltip("Nairobi · our base", { permanent: true, direction: "right", offset: [8, 0], className: "city-label" })
    .addTo(map);

  /* ---- pins and popups ---- */
  const pinIcon = (s, i) =>
    L.divIcon({
      className: "pin-wrap",
      html: `<span class="pin lv-${s.level}${s.ours ? " pin-ours" : ""}" style="--i:${i}">${s.ours ? '<i class="pin-pulse"></i>' : ""}
        <svg viewBox="0 0 38 46" aria-hidden="true"><path class="pin-body" d="M19 45S3 29 3 18a16 16 0 0 1 32 0c0 11-16 27-16 27z"/><path class="pin-peak" d="M10.5 23 17 12l4.2 6.4L24 15l4.5 8z"/></svg></span>`,
      iconSize: [38, 46], iconAnchor: [19, 44], popupAnchor: [0, -38],
    });

  function popupHtml(s) {
    const facts = s.facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");
    const actions = s.ours
      ? `<a class="btn fill" href="booking.html?hike=${encodeURIComponent(s.id)}">Book / Register</a><a class="btn" href="hike.html?id=${encodeURIComponent(s.id)}">Full details</a>`
      : `<a class="btn fill" target="_blank" rel="noopener" href="https://wa.me/254700000000?text=${encodeURIComponent("Hi Tagalong Hikers, I would like to hike " + s.name + ". Can you help?")}">Ask about this trail</a>`;
    return `<div class="kp"><div class="kp-tags"><span class="badge lv-${s.level}">${capWord(s.level)}</span>${s.ours ? '<span class="badge badge-ours">Tagalong hike</span>' : ""}</div>
      <h3>${s.name}</h3><p class="kp-region">${s.region} · ≈${s.km} km from Nairobi</p><p>${s.note}</p>
      <dl class="kp-facts">${facts}</dl><div class="kp-actions">${actions}</div></div>`;
  }

  const layer = L.layerGroup().addTo(map);
  let filter = "all", active = null;
  const matches = (s) => filter === "all" || (filter === "ours" ? s.ours : s.level === filter);

  function select(s) {
    active = s;
    list?.querySelectorAll(".spot").forEach((b) => b.classList.toggle("active", b.dataset.id === s.id));
    const btn = list?.querySelector(`.spot[data-id="${s.id}"]`);
    if (btn) list.scrollTo({ top: btn.offsetTop - (list.clientHeight - btn.offsetHeight) / 2, behavior: reduce ? "auto" : "smooth" });
    el.querySelectorAll(".pin").forEach((p) => p.classList.remove("active"));
    s.marker?.getElement()?.querySelector(".pin")?.classList.add("active");
  }

  function render(fit) {
    layer.clearLayers();
    map.closePopup();
    const visible = spots.filter(matches);
    visible.forEach((s, i) => {
      s.marker = L.marker([s.lat, s.lng], { icon: pinIcon(s, i), title: s.name, riseOnHover: true })
        .bindPopup(popupHtml(s), { maxWidth: 310, className: "kenya-popup", autoPanPadding: [30, 30] })
        .on("popupopen", () => select(s));
      s.marker.addTo(layer);
    });
    if (list) {
      list.innerHTML = visible.map((s, i) =>
        `<li style="--i:${i}"><button type="button" class="spot" data-id="${s.id}"><span class="spot-dot lv-${s.level}"></span>
          <span class="spot-body"><strong>${s.ours ? '<i class="star" aria-label="Tagalong hike">★</i> ' : ""}${s.name}</strong><small>${s.region} · ≈${s.km} km</small></span>
          <span class="spot-lv lv-${s.level}">${capWord(s.level)}</span></button></li>`).join("");
    }
    if (fit) {
      const opts = { padding: [40, 40], maxZoom: 8, animate: !reduce, duration: 0.9 };
      if (filter === "all" || !visible.length) map.flyToBounds(KENYA_BOUNDS, { ...opts, padding: [10, 10] });
      else map.flyToBounds(L.latLngBounds(visible.map((s) => [s.lat, s.lng])), opts);
    }
  }

  if (filters) {
    const defs = [["all", "All places"], ["ours", "Our hikes"], ["easy", "Easy"], ["moderate", "Moderate"], ["difficult", "Difficult"]];
    filters.innerHTML = defs.map(([k, label]) =>
      `<button type="button" class="category-btn${k === "all" ? " active" : ""}" data-f="${k}">${label} <span>${spots.filter((s) => k === "all" || (k === "ours" ? s.ours : s.level === k)).length}</span></button>`).join("");
    filters.addEventListener("click", (e) => {
      const b = e.target.closest("[data-f]");
      if (!b) return;
      filter = b.dataset.f;
      filters.querySelectorAll(".category-btn").forEach((x) => x.classList.toggle("active", x === b));
      render(true);
    });
  }

  list?.addEventListener("click", (e) => {
    const b = e.target.closest(".spot");
    const s = b && spots.find((x) => x.id === b.dataset.id);
    if (!s) return;
    select(s);
    if (window.innerWidth < 900) wrap.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    map.flyTo([s.lat, s.lng], Math.max(map.getZoom(), 8), { duration: 1.1, animate: !reduce });
    let opened = false;
    const open = () => { if (!opened) { opened = true; s.marker?.openPopup(); } };
    map.once("moveend", open);
    setTimeout(open, 1500);
  });

  render(false);

  /* keep tiles correct when the layout changes; drop the pins in when the map scrolls into view */
  if (typeof ResizeObserver !== "undefined") new ResizeObserver(() => map.invalidateSize()).observe(el);
  if (typeof IntersectionObserver !== "undefined") {
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting) { wrap.classList.add("live"); map.invalidateSize(); io.disconnect(); }
    }, { threshold: 0.25 });
    io.observe(wrap);
  } else wrap.classList.add("live");
}

/* Builds the map section's layout (filters + place list) around the existing
   #contact-map, so contact.html needs no extra markup. If the page already
   has #map-filters and #spot-list, it leaves everything alone. */
function ensureKenyaMarkup(mapEl) {
  if ($("#spot-list") && $("#map-filters")) return;
  const wrap = mapEl.closest(".map-wrap") || mapEl.parentElement;
  const container = wrap.parentElement;
  container.closest("section")?.classList.add("kenya-section");
  wrap.querySelector(".map-note")?.remove();
  wrap.classList.add("kenya-wrap");

  const parts = [];
  if (!container.querySelector(".section-head")) {
    const head = document.createElement("div");
    head.className = "section-head";
    head.innerHTML =
      '<div><div class="eyebrow">Where to hike</div><h2>Kenya\'s best hiking regions</h2></div>' +
      "<p>From city forests to the slopes of Mt. Kenya. Filter by difficulty, pick a place from the list or click a pin. Gold-ringed pins are hikes we run.</p>";
    parts.push(head);
  }
  const filters = document.createElement("div");
  filters.id = "map-filters";
  filters.className = "categories";
  filters.setAttribute("role", "group");
  filters.setAttribute("aria-label", "Filter hiking places");
  const layout = document.createElement("div");
  layout.className = "kenya-layout";
  const list = document.createElement("ul");
  list.id = "spot-list";
  list.className = "spot-list";
  list.setAttribute("aria-label", "Places to hike in Kenya");
  const hint = document.createElement("p");
  hint.className = "map-hint";
  hint.textContent =
    "Click the map, then scroll to zoom. Pins mark approximate trail areas; seasons and times are guides, so confirm conditions before you go.";

  wrap.before(...parts, filters, layout);
  layout.append(wrap, list);
  layout.after(hint);
}

const contactMapEl = $("#contact-map");
if (contactMapEl && typeof L !== "undefined") {
  ensureKenyaMarkup(contactMapEl);
  initKenyaMap(contactMapEl);
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

  const swayers = [];

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
      bush.userData.base = bush.scale.clone();
      bush.userData.ph = i;
      swayers.push(bush);
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

  /* ---- Atmosphere: sun glow, drifting mist, fireflies ---- */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const glowTex = (inner, outer) => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d");
    const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, inner);
    grad.addColorStop(1, outer);
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  };

  const sunGlow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowTex("rgba(255,214,140,.95)", "rgba(255,214,140,0)"),
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      fog: false,
    }),
  );
  sunGlow.scale.set(46, 46, 1);
  sunGlow.position.set(-14, 10, -58);
  scene.add(sunGlow);

  const mistTex = glowTex("rgba(214,224,214,.55)", "rgba(214,224,214,0)");
  const mists = [];
  for (let i = 0; i < 7; i++) {
    const m = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: mistTex,
        transparent: true,
        opacity: 0.16 + (i % 3) * 0.04,
        depthWrite: false,
        fog: false,
      }),
    );
    m.scale.set(28 + (i % 3) * 8, 9 + (i % 2) * 4, 1);
    m.position.set(-40 + i * 12, 2 + (i % 4) * 2.2, -18 - (i % 4) * 7);
    m.userData.speed = 0.25 + (i % 3) * 0.12;
    scene.add(m);
    mists.push(m);
  }

  const FLY = 240;
  const flyGeo = new THREE.BufferGeometry();
  const flyPos = new Float32Array(FLY * 3);
  const flySeed = new Float32Array(FLY);
  for (let i = 0; i < FLY; i++) {
    flyPos[i * 3] = (Math.random() - 0.5) * 30;
    flyPos[i * 3 + 1] = Math.random() * 11;
    flyPos[i * 3 + 2] = 12 - Math.random() * 44;
    flySeed[i] = Math.random() * Math.PI * 2;
  }
  flyGeo.setAttribute("position", new THREE.BufferAttribute(flyPos, 3));
  const flies = new THREE.Points(
    flyGeo,
    new THREE.PointsMaterial({
      map: glowTex("rgba(255,232,170,1)", "rgba(255,232,170,0)"),
      size: 0.32,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      fog: false,
    }),
  );
  flies.frustumCulled = false;
  scene.add(flies);

  /* ---- Pointer parallax, scroll dolly, pause when off-screen ---- */
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener(
    "pointermove",
    (e) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    },
    { passive: true },
  );
  let visible = true;
  new IntersectionObserver(([en]) => {
    visible = en.isIntersecting;
  }).observe(canvas);
  const startTime = performance.now();

  let t = 0,
    last = performance.now();
  function resize() {
    const w = Math.max(1, canvas.clientWidth),
      h = Math.max(1, canvas.clientHeight);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = camera.aspect < 0.8 ? 52 : camera.aspect < 1.2 ? 44 : 38;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);
  if (typeof ResizeObserver !== "undefined") new ResizeObserver(resize).observe(canvas);
  resize();

  function animate(now) {
    if (!reduceMotion) requestAnimationFrame(animate);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (!reduceMotion && (!visible || document.hidden)) return;

    t += reduceMotion ? 0 : dt * 3.2;
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

    for (const b of swayers) {
      const p = b.userData.ph;
      b.scale.y = b.userData.base.y * (1 + Math.sin(t * 0.5 + p) * 0.05);
      b.rotation.z = Math.sin(t * 0.35 + p * 1.7) * 0.05;
    }

    if (!reduceMotion) {
      for (let i = 0; i < FLY; i++) {
        const s = flySeed[i];
        flyPos[i * 3 + 1] += dt * (0.25 + (s % 1) * 0.35);
        flyPos[i * 3] += Math.sin(t * 0.6 + s * 3) * dt * 0.5;
        flyPos[i * 3 + 2] += Math.cos(t * 0.5 + s * 2) * dt * 0.35;
        if (flyPos[i * 3 + 1] > 11) flyPos[i * 3 + 1] = 0;
      }
      flyGeo.attributes.position.needsUpdate = true;
      flies.material.opacity = 0.7 + Math.sin(t * 0.9) * 0.15;
      for (const m of mists) {
        m.position.x += dt * m.userData.speed;
        if (m.position.x > 46) m.position.x = -46;
      }
      sunGlow.material.opacity = 0.48 + Math.sin(t * 0.15) * 0.06;

      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      const sc = Math.min(1, window.scrollY / Math.max(1, canvas.clientHeight));
      const intro = Math.min(1, (now - startTime) / 2800);
      const ease = 1 - Math.pow(1 - intro, 3);
      camera.position.x = 7.2 + Math.sin(t * 0.08) * 0.35 + pointer.x * 1.8 - sc * 2.5;
      camera.position.y = 5.4 + Math.sin(t * 0.11) * 0.12 - pointer.y * 0.9 + sc * 1.5 + (1 - ease) * 2;
      camera.position.z = 15 - sc * 3 + (1 - ease) * 5;
      camera.lookAt(pointer.x * 0.6, 2.0, -5);
    } else {
      camera.position.set(7.2, 5.4, 15);
      camera.lookAt(0, 2.0, -5);
    }

    renderer.render(scene, camera);
    if (!canvas.classList.contains("ready")) canvas.classList.add("ready");
  }
  requestAnimationFrame(animate);
}

initHikerScene();

/* ===================================================================
   MOTION LAYER
   Scroll reveals, 3D card tilt, counters, parallax, magnetic buttons.
   Skipped entirely when the visitor prefers reduced motion.
   =================================================================== */
(function motionLayer() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  document.documentElement.classList.add("js-motion");

  /* --- Scroll progress, header state, hero parallax --- */
  const bar = document.createElement("div");
  bar.className = "scroll-progress";
  bar.setAttribute("aria-hidden", "true");
  document.body.appendChild(bar);
  const header = $(".site-header"),
    hero = $(".hero"),
    heroScene = $(".hero-scene"),
    heroContent = $(".hero-content");
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      header?.classList.toggle("scrolled", y > 24);
      if (hero && window.innerWidth <= 900) {
        /* small screens: the photo shows in full, so no parallax crop or fade */
        if (heroScene) heroScene.style.transform = "";
        if (heroContent) {
          heroContent.style.transform = "";
          heroContent.style.opacity = "";
        }
      } else if (hero) {
        const h = hero.offsetHeight;
        if (y < h * 1.1) {
          if (heroScene) {
            const shift = Math.min(y * 0.12, h * 0.02);
            heroScene.style.transform = `translate3d(0,${shift}px,0) scale(1.04)`;
          }
          if (heroContent) {
            heroContent.style.transform = `translate3d(0,${y * 0.22}px,0)`;
            heroContent.style.opacity = String(Math.max(0, 1 - y / (h * 0.75)));
          }
        }
      }
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* --- Hero copy tilts gently toward the pointer --- */
  if (finePointer && hero) {
    const block = $(".hero-copy-block", hero);
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      block?.style.setProperty("--hry", (px * 3).toFixed(2) + "deg");
      block?.style.setProperty("--hrx", (-py * 2).toFixed(2) + "deg");
    });
    hero.addEventListener("pointerleave", () => {
      block?.style.setProperty("--hry", "0deg");
      block?.style.setProperty("--hrx", "0deg");
    });
  }

  /* --- Headline: words rotate up out of a mask --- */
  function splitWords(el) {
    el.setAttribute("aria-label", el.textContent.trim().replace(/\s+/g, " "));
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) return frag.appendChild(document.createTextNode(" "));
            const w = document.createElement("span");
            w.className = "word";
            w.setAttribute("aria-hidden", "true");
            const inner = document.createElement("span");
            inner.className = "word-inner";
            inner.textContent = part;
            inner.style.setProperty("--i", i++);
            w.appendChild(inner);
            frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(el);
  }
  $$(".hero h1, .page-hero h1").forEach(splitWords);

  /* --- Scroll reveals --- */
  const RULES = [
    [".stat", "flip"],
    [".feature", "left"],
    [".gallery-item", "zoom"],
    [".card, .weather-card, .guide-card", "3d"],
    [
      ".section-head, .page-hero .container > *:not(h1), .cta .container > *, .split > *, .form-layout > *, .detail-photo, .detail-side, .elevation, .map-wrap, .detail-sections, footer .footer-grid > *",
      "up",
    ],
  ];
  const TILT = ".card, .gallery-item, .weather-card";
  const seen = new WeakSet();

  const revealIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        revealIO.unobserve(el);
        el.classList.add("in-view");
        const delay = parseFloat(el.style.getPropertyValue("--d")) || 0;
        setTimeout(() => {
          el.removeAttribute("data-reveal");
          el.style.removeProperty("--d");
        }, delay + 1300);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
  );

  const counterIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        counterIO.unobserve(en.target);
        runCounter(en.target);
      });
    },
    { threshold: 0.6 },
  );
  function registerCounter(el) {
    if (el._c) return;
    const m = el.textContent.trim().match(/^(\D*)([\d,]+)(.*)$/);
    if (!m) return;
    const target = parseInt(m[2].replace(/,/g, ""), 10);
    if (!isFinite(target)) return;
    el._c = { pre: m[1], target, suf: m[3], comma: m[2].includes(",") };
    el.setAttribute("aria-label", el.textContent.trim());
    el.textContent = m[1] + "0" + m[3];
    counterIO.observe(el);
  }
  function runCounter(el) {
    const { pre, target, suf, comma } = el._c;
    const dur = 1700,
      t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      const n = Math.round(target * e);
      el.textContent = pre + (comma ? n.toLocaleString("en-US") : n) + suf;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function eligibleForTilt(el) {
    return (
      finePointer &&
      !el.closest(".modal") &&
      !el.querySelector("input, select, textarea, form")
    );
  }

  const counts = new WeakMap();
  function register(el, kind) {
    if (seen.has(el) || el.closest(".hero, .modal")) return;
    seen.add(el);
    if (eligibleForTilt(el) && el.matches(TILT)) {
      el.classList.add("tilt");
      const glare = document.createElement("span");
      glare.className = "tilt-glare";
      glare.setAttribute("aria-hidden", "true");
      el.appendChild(glare);
    }
    if (el.querySelector("[data-reveal]") || el.parentElement?.closest("[data-reveal]")) return;
    if (kind === "up" && el.querySelector(".feature")) return;
    const parent = el.parentElement;
    const idx = counts.get(parent) || 0;
    counts.set(parent, idx + 1);
    el.style.setProperty("--d", Math.min(idx, 7) * 85 + "ms");
    el.setAttribute("data-reveal", kind);
    el.querySelectorAll("polyline").forEach((pl) => pl.setAttribute("pathLength", "1"));
    revealIO.observe(el);
  }
  function scan(node) {
    if (node.nodeType !== 1) return;
    RULES.forEach(([sel, kind]) => {
      if (node.matches(sel)) register(node, kind);
      node.querySelectorAll(sel).forEach((el) => register(el, kind));
    });
    node.querySelectorAll?.(".stat strong").forEach(registerCounter);
    if (node.matches(".stat strong")) registerCounter(node);
  }
  scan(document.body);
  new MutationObserver((muts) =>
    muts.forEach((m) => m.addedNodes.forEach(scan)),
  ).observe(document.body, { childList: true, subtree: true });

  /* --- 3D tilt with moving glare (event delegation, so re-rendered cards work) --- */
  if (finePointer) {
    let active = null;
    const release = (el) => {
      el.classList.remove("tilting");
      ["--rx", "--ry", "--tx", "--ty"].forEach((v) => el.style.removeProperty(v));
    };
    document.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      const el = e.target.closest?.(".tilt");
      if (active && active !== el) release(active);
      active = el || null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width,
        py = (e.clientY - r.top) / r.height;
      el.style.setProperty("--ry", ((px - 0.5) * 12).toFixed(2) + "deg");
      el.style.setProperty("--rx", ((0.5 - py) * 10).toFixed(2) + "deg");
      el.style.setProperty("--tx", ((0.5 - px) * 14).toFixed(1) + "px");
      el.style.setProperty("--ty", ((0.5 - py) * 10).toFixed(1) + "px");
      el.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
      el.style.setProperty("--my", (py * 100).toFixed(1) + "%");
      el.classList.add("tilting");
    });
    document.documentElement.addEventListener("mouseleave", () => {
      if (active) release(active);
      active = null;
    });

    /* --- Magnetic buttons --- */
    document.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      const b = e.target.closest?.(".btn");
      if (!b) return;
      const r = b.getBoundingClientRect();
      b.style.setProperty("--bx", ((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1) + "px");
      b.style.setProperty("--by", ((e.clientY - r.top - r.height / 2) * 0.28).toFixed(1) + "px");
    });
    document.addEventListener(
      "pointerout",
      (e) => {
        const b = e.target.closest?.(".btn");
        if (b && !b.contains(e.relatedTarget)) {
          b.style.removeProperty("--bx");
          b.style.removeProperty("--by");
        }
      },
      true,
    );
  }

  /* --- Fade between pages --- */
  document.addEventListener("click", (e) => {
    const a = e.target.closest?.("a[href]");
    if (!a || e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if ((a.target && a.target !== "_self") || a.hasAttribute("download")) return;
    const url = new URL(a.href, location.href);
    if (!/^(https?|file):$/.test(url.protocol) || url.origin !== location.origin) return;
    if (url.pathname === location.pathname && (url.hash || url.search === location.search)) return;
    e.preventDefault();
    document.body.classList.add("page-leave");
    setTimeout(() => (location.href = a.href), 260);
  });
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) document.body.classList.remove("page-leave");
  });
})();

/* ===================================================================
   FLOATING ACTIONS (WhatsApp + back to top) and FOOTER SOCIAL ICONS
   Injected on every page, so no HTML changes are needed.
   =================================================================== */
const STROKE = 'fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"';
const ICONS = {
  whatsapp:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
  arrowUp: `<svg viewBox="0 0 24 24" ${STROKE} aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" ${STROKE} aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" ${STROKE} aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6" fill="currentColor"/></svg>`,
  tiktok: `<svg viewBox="0 0 24 24" ${STROKE} aria-hidden="true"><path d="M14 3v11a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.3 2.3 2 4 4.5 4.2"/></svg>`,
};

function initFloatingActions() {
  if ($(".fab-stack")) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const stack = document.createElement("div");
  stack.className = "fab-stack";
  stack.innerHTML = `
    <button type="button" class="to-top" aria-label="Back to top" title="Back to top">
      <svg class="ring" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="21"/></svg>${ICONS.arrowUp}
    </button>
    <a class="wa-fab" href="https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMessage)}" target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp">
      ${ICONS.whatsapp}<span class="wa-label">Chat with us</span>
    </a>`;
  document.body.appendChild(stack);

  const toTop = $(".to-top", stack),
    ring = $(".ring circle", stack),
    C = 2 * Math.PI * 21;
  ring.style.strokeDasharray = C;

  let ticking = false;
  const update = () => {
    ticking = false;
    const y = window.scrollY,
      max = document.documentElement.scrollHeight - window.innerHeight;
    toTop.classList.toggle("show", y > Math.min(600, window.innerHeight * 0.8));
    ring.style.strokeDashoffset = C * (1 - (max > 0 ? Math.min(1, y / max) : 0));
  };
  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  window.addEventListener("resize", update);
  update();

  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }));
}

function initFooterSocials() {
  const brand = $("footer .footer-grid > div:first-child");
  if (!brand || $(".socials", brand)) return;
  const items = [["facebook", "Facebook"], ["instagram", "Instagram"], ["tiktok", "TikTok"]].filter(([k]) => SITE.social[k]);
  if (!items.length) return;
  const box = document.createElement("div");
  box.className = "socials";
  box.innerHTML = `<div class="footer-title">Follow us</div>
    <ul class="social-list">${items
      .map(([k, name]) => `<li><a class="social-link social-${k}" href="${SITE.social[k]}" target="_blank" rel="noopener noreferrer" aria-label="Tagalong Hikers on ${name}" title="${name}">${ICONS[k]}</a></li>`)
      .join("")}</ul>`;
  brand.appendChild(box);
}

initFloatingActions();
initFooterSocials();

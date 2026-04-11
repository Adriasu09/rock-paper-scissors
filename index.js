const storageKey = "azargame-user-data";

function getStoredUserData() {
  try {
    const rawData = localStorage.getItem(storageKey);
    return rawData ? JSON.parse(rawData) : {};
  } catch {
    return {};
  }
}

function saveUserData(userData) {
  localStorage.setItem(storageKey, JSON.stringify(userData));
}

function formatDate(dateValue) {
  if (!dateValue) {
    return "Sin seleccionar";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function updateTextContent(elementId, value, fallback) {
  const element = document.getElementById(elementId);

  if (element) {
    element.textContent = value || fallback;
  }
}

function calculateTemperature(countryValue, dateValue) {
  const country = (countryValue || "").trim().toLowerCase();
  const countryBase = {
    españa: 22,
    espana: 22,
    spain: 22,
    portugal: 21,
    france: 18,
    francia: 18,
    italy: 20,
    italia: 20,
    mexico: 26,
    colombia: 24,
    argentina: 17,
    chile: 16,
    peru: 21,
    brasil: 27,
    brazil: 27,
    uk: 14,
    england: 14,
    "reino unido": 14,
    germany: 15,
    alemania: 15,
    usa: 19,
    eeuu: 19,
    canada: 8,
    japon: 17,
    japón: 17,
  };

  const baseTemperature = countryBase[country] ?? 20;

  if (!dateValue) {
    return `${baseTemperature}ºC`;
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return `${baseTemperature}ºC`;
  }

  const southernCountries = ["argentina", "chile", "peru", "brasil", "brazil", "australia"];
  const isSouthernHemisphere = southernCountries.includes(country);
  const month = date.getMonth();
  const day = date.getDate();
  const northOffsets = [0, 1, 3, 5, 7, 9, 10, 10, 7, 4, 2, 0];
  const southOffsets = [9, 10, 10, 7, 4, 2, 0, 1, 3, 5, 7, 9];
  const seasonalOffset = (isSouthernHemisphere ? southOffsets : northOffsets)[month];
  const dailyVariation = (day % 5) - 2;
  const finalTemperature = Math.round(baseTemperature + seasonalOffset / 3 + dailyVariation);

  return `${finalTemperature}ºC`;
}

function paintUserData(userData = {}) {
  const temperature = calculateTemperature(userData.country, userData.date);

  updateTextContent("display-name", userData.name, "Invitada");
  updateTextContent("display-country", userData.country, "Pendiente");
  updateTextContent("display-date", formatDate(userData.date), "Sin seleccionar");
  updateTextContent("display-time", userData.time, "Sin seleccionar");
  updateTextContent("display-temperature", temperature, "22ºC");

  updateTextContent("preview-name", userData.name, "Pendiente");
  updateTextContent("preview-country", userData.country, "Pendiente");
  updateTextContent("preview-date", formatDate(userData.date), "Pendiente");
  updateTextContent("preview-time", userData.time, "Pendiente");
  updateTextContent("preview-temperature", temperature, "22ºC");
}

function setupRegisterForm() {
  const form = document.getElementById("register-form");

  if (!form) {
    return;
  }

  const storedUserData = getStoredUserData();

  if (storedUserData.name) {
    form.elements.name.value = storedUserData.name || "";
    form.elements.country.value = storedUserData.country || "";
    form.elements.date.value = storedUserData.date || "";
    form.elements.time.value = storedUserData.time || "";
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const userData = {
      name: formData.get("name")?.toString().trim() || "",
      country: formData.get("country")?.toString().trim() || "",
      date: formData.get("date")?.toString() || "",
      time: formData.get("time")?.toString() || "",
    };

    saveUserData(userData);
    paintUserData(userData);
    sessionStorage.setItem("azargame-home-view", "games");
    window.location.href = "./nav.html";
  });
}

function setupTabs() {
  const tabs = Array.from(document.querySelectorAll(".nav-tab[data-target]"));
  const panels = Array.from(document.querySelectorAll(".content-panel"));

  if (!tabs.length) {
    return;
  }

  const openPanel = (targetId = "games-panel", shouldScroll = false) => {
    const safeTargetId = document.getElementById(targetId) ? targetId : "games-panel";

    tabs.forEach((tab) => tab.classList.remove("is-active"));
    panels.forEach((panel) => panel.classList.remove("is-active"));

    const activeTab = tabs.find((tab) => tab.dataset.target === safeTargetId);
    const activePanel = document.getElementById(safeTargetId);

    activeTab?.classList.add("is-active");
    activePanel?.classList.add("is-active");
    sessionStorage.setItem("azargame-home-view", safeTargetId);

    if (shouldScroll) {
      activePanel?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      openPanel(tab.dataset.target || "games-panel", true);
    });
  });

  const rememberedView = sessionStorage.getItem("azargame-home-view") || "games-panel";
  openPanel(rememberedView, false);
}

document.addEventListener("DOMContentLoaded", () => {
  paintUserData(getStoredUserData());
  setupRegisterForm();
  setupTabs();
});

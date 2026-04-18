const USER_DATA_KEY = "azarGameUserData";

function getStoredUserData() {
  try {
    const rawValue = window.localStorage.getItem(USER_DATA_KEY);
    return rawValue ? JSON.parse(rawValue) : null;
  } catch {
    return null;
  }
}

function saveUserData(userData) {
  window.localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
}

function setupTabs() {
  const tabButtons = document.querySelectorAll(".nav-tab[data-target]");
  const panels = document.querySelectorAll(".content-panel");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.target;

      tabButtons.forEach((tabButton) => {
        tabButton.classList.toggle("is-active", tabButton === button);
      });

      panels.forEach((panel) => {
        panel.classList.toggle("is-active", panel.id === targetId);
      });
    });
  });
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

function paintUserData(userData = {}) {
  updateTextContent("display-name", userData.name, "Invitada");
  updateTextContent("display-date", formatDate(userData.date), "Sin seleccionar");
  updateTextContent("display-time", userData.time, "Sin seleccionar");

  updateTextContent("preview-name", userData.name, "Pendiente");
  updateTextContent("preview-date", formatDate(userData.date), "Pendiente");
  updateTextContent("preview-time", userData.time, "Pendiente");
}

function setupRegisterForm() {
  const form = document.getElementById("register-form");

  if (!form) {
    return;
  }

  const storedUserData = getStoredUserData();

  if (storedUserData) {
    form.elements.name.value = storedUserData.name || "";
    form.elements.date.value = storedUserData.date || "";
    form.elements.time.value = storedUserData.time || "";
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const userData = {
      name: formData.get("name")?.toString().trim() || "",
      date: formData.get("date")?.toString() || "",
      time: formData.get("time")?.toString() || "",
    };

    saveUserData(userData);
    paintUserData(userData);
    window.location.href = "./index.html";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const storedUserData = getStoredUserData() || {};

  paintUserData(storedUserData);
  setupRegisterForm();
  setupTabs();
});

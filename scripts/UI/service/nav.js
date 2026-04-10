const storageKey = "carnival-user-data";

export function getStoredUserData() {
  try {
    const rawData = localStorage.getItem(storageKey);
    return rawData ? JSON.parse(rawData) : null;
  } catch {
    return null;
  }
}

export function saveUserData(userData) {
  localStorage.setItem(storageKey, JSON.stringify(userData));
}

export function setupTabs() {
  const tabs = document.querySelectorAll(".nav-tab");
  const panels = document.querySelectorAll(".content-panel");

  if (!tabs.length || !panels.length) {
    return;
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.dataset.target;

      tabs.forEach((item) => item.classList.remove("is-active"));
      panels.forEach((panel) => panel.classList.remove("is-active"));

      tab.classList.add("is-active");
      document.getElementById(targetId)?.classList.add("is-active");
    });
  });
}

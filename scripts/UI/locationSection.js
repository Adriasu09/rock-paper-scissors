import { getCountryFlagUrl } from "../service/geolocationService.js";

export function renderLocation(locationData) {
  if (!locationData) {
    return `
    <article class="location-card">
      <div class="location-card__header">
        <img src="./assets/icon/map-pin.svg" alt="ubicación" class="location-card__icon" />
        <h3 class="location-card__title">Tu Ubicación</h3>
      </div>
      <div class="location-card__body">
        <p class="location-card__detail">Cargando ubicación...</p>
      </div>
      <div class="location-card__status">
        <span class="location-card__dot"></span>
        <span>Obteniendo ubicación</span>
      </div>
    </article>
    `;
  }

  if (locationData.error) {
    return `
    <article class="location-card">
      <div class="location-card__header">
        <img src="./assets/icon/map-pin.svg" alt="ubicación" class="location-card__icon" />
        <h3 class="location-card__title">Tu Ubicación</h3>
      </div>
      <div class="location-card__body">
        <p class="location-card__detail">${locationData.error}</p>
      </div>
      <div class="location-card__status">
        <span class="location-card__dot location-card__dot--inactive"></span>
        <span>Geolocalización inactiva</span>
      </div>
    </article>
    `;
  }

  const flagUrl = getCountryFlagUrl(locationData.countryCode);

  return `
  <article class="location-card">
    <div class="location-card__header">
      <img src="./assets/icon/map-pin.svg" alt="ubicación" class="location-card__icon" />
      <h3 class="location-card__title">Tu Ubicación</h3>
    </div>
    <div class="location-card__body">
      <img src="${flagUrl}" alt="${locationData.countryCode}" class="location-card__flag" />
      <p class="location-card__country">${locationData.country}</p>
      <p class="location-card__detail">${locationData.city}, ${locationData.country}</p>
    </div>
    <div class="location-card__status">
      <span class="location-card__dot location-card__dot--active"></span>
      <span>Geolocalización activa</span>
    </div>
  </article>
  `;
}

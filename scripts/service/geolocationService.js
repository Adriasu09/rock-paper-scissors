import { fetchData } from "../helpers/fetchData.js";
import { NOMINATIM_BASE_URL, FLAG_BASE_URL } from "../constants/urls.js";

const GEOCODE_OPTIONS = {
  enableHighAccuracy: false,
  timeout: 10000,
  maximumAge: Infinity,
};

const ERROR_MESSAGES = {
  1: "Permiso de ubicación denegado",
  2: "Ubicación no disponible",
  3: "Tiempo de espera agotado",
};

function getPosition() {
  if (!navigator.geolocation) {
    return Promise.reject(
      new Error("Geolocalización no soportada en este navegador"),
    );
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      resolve,
      async (error) => {
        // Chrome a veces dispara un error cacheado de "permiso denegado"
        // incluso cuando el permiso ya está concedido. Verificamos con
        // la Permissions API el estado real antes de rechazar.
        if (error.code === 1 && navigator.permissions) {
          const { state } = await navigator.permissions.query({
            name: "geolocation",
          });
          if (state === "granted") {
            navigator.geolocation.getCurrentPosition(
              resolve,
              (retryError) => {
                reject(
                  new Error(
                    ERROR_MESSAGES[retryError.code] || "Error desconocido",
                  ),
                );
              },
              { ...GEOCODE_OPTIONS, maximumAge: 0 },
            );
            return;
          }
        }

        reject(new Error(ERROR_MESSAGES[error.code] || "Error desconocido"));
      },
      GEOCODE_OPTIONS,
    );
  });
}

export async function reverseGeocode(lat, lng) {
  const url = `${NOMINATIM_BASE_URL}?lat=${lat}&lon=${lng}&format=json&accept-language=es`;
  const data = await fetchData(url);

  const { address } = data;
  const city =
    address.city || address.town || address.village || address.state || "";
  const country = address.country || "";
  const countryCode = (address.country_code || "").toUpperCase();

  return { city, country, countryCode };
}

export function getCountryFlagUrl(countryCode) {
  return `${FLAG_BASE_URL}/${countryCode.toLowerCase()}.png`;
}

export async function getUserLocation() {
  const position = await getPosition();
  const { latitude, longitude } = position.coords;

  const { city, country, countryCode } = await reverseGeocode(
    latitude,
    longitude,
  );

  return {
    latitude,
    longitude,
    city,
    country,
    countryCode,
  };
}

import { fetchData } from "./apiClient.js";
import { NOMINATIM_BASE_URL, FLAG_BASE_URL } from "../constants/urls.js";
import {
  GEOCODE_OPTIONS,
  GEOLOCATION_ERROR_MESSAGES,
  UNSUPPORTED_GEOLOCATION_MESSAGE,
  UNKNOWN_GEOLOCATION_ERROR,
} from "../constants/geolocation.js";

function getPosition() {
  if (!navigator.geolocation) {
    return Promise.reject(new Error(UNSUPPORTED_GEOLOCATION_MESSAGE));
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      resolve,
      async (error) => {
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
                    GEOLOCATION_ERROR_MESSAGES[retryError.code] ??
                      UNKNOWN_GEOLOCATION_ERROR,
                  ),
                );
              },
              { ...GEOCODE_OPTIONS, maximumAge: 0 },
            );
            return;
          }
        }

        reject(
          new Error(
            GEOLOCATION_ERROR_MESSAGES[error.code] ?? UNKNOWN_GEOLOCATION_ERROR,
          ),
        );
      },
      GEOCODE_OPTIONS,
    );
  });
}

export async function reverseGeocode(lat, lng) {
  const data = await fetchData(NOMINATIM_BASE_URL, {
    lat,
    lon: lng,
    format: "json",
    "accept-language": "es",
  });

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

import { defineHandler } from "nitro";
import { getQuery, HTTPError } from "nitro/h3";
import { useRuntimeConfig } from "nitro/runtime-config";

export default defineHandler(async (event) => {
  const query = getQuery(event);
  const lat = Number(query.lat);
  const lon = Number(query.lon);

  if (
    !Number.isFinite(lat) ||
    !Number.isFinite(lon) ||
    lat < -90 ||
    lat > 90 ||
    lon < -180 ||
    lon > 180
  ) {
    throw new HTTPError({ status: 400, message: "Invalid coordinates" });
  }

  const { openWeatherApiKey } = useRuntimeConfig();

  if (!openWeatherApiKey) {
    throw new HTTPError({
      status: 500,
      message: "Weather service is not configured",
    });
  }

  const url = new URL(
    "https://api.openweathermap.org/data/4.0/onecall/current",
  );
  url.search = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    units: "imperial",
    appid: openWeatherApiKey,
  }).toString();

  const response = await fetch(url);

  if (!response.ok) {
    throw new HTTPError({
      status: 502,
      message: "Weather provider request failed",
    });
  }

  return await response.json();
});


export async function getWeather({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) {
  const params = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
  });

  const response = await fetch(`/api/weather?${params}`);

  if (!response.ok) {
    throw new Error("Não foi possível buscar o clima");
  }

  return await response.json();
}
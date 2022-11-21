import { chargerLocations } from "../constants/mockedData";

export function isNullOrUndefined(elem) {
  return elem === null || elem === undefined;
}

export function filterUnAvailableChargingUnits(chargingSlots) {
  return chargerLocations.filter((x) => x.availableSlot > 0);
}

export function distanceCalculator(location1, location2) {
  const { lat: lat1, lng: lon1 } = location1;
  const { lat: lat2, lng: lon2 } = location2;

  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres
  return d;
}

export function priceCalculator(distance) {
  if (distance < 400) return 0.9;
  if (distance < 1000) return 0.75;
  if (distance < 3000) return 0.55;
  return 0.5;
}

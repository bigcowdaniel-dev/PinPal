const { useState, useEffect, useRef, useCallback } = React;

// Built-in city geocoding database (expandable)
const CITY_DB = {
  "new york": { lat: 40.7128, lng: -74.006 },
  "los angeles": { lat: 34.0522, lng: -118.2437 },
  "chicago": { lat: 41.8781, lng: -87.6298 },
  "houston": { lat: 29.7604, lng: -95.3698 },
  "phoenix": { lat: 33.4484, lng: -112.074 },
  "philadelphia": { lat: 39.9526, lng: -75.1652 },
  "san antonio": { lat: 29.4241, lng: -98.4936 },
  "san diego": { lat: 32.7157, lng: -117.1611 },
  "dallas": { lat: 32.7767, lng: -96.797 },
  "san jose": { lat: 37.3382, lng: -121.8863 },
  "austin": { lat: 30.2672, lng: -97.7431 },
  "jacksonville": { lat: 30.3322, lng: -81.6557 },
  "san francisco": { lat: 37.7749, lng: -122.4194 },
  "columbus": { lat: 39.9612, lng: -82.9988 },
  "charlotte": { lat: 35.2271, lng: -80.8431 },
  "indianapolis": { lat: 39.7684, lng: -86.1581 },
  "seattle": { lat: 47.6062, lng: -122.3321 },
  "denver": { lat: 39.7392, lng: -104.9903 },
  "washington": { lat: 38.9072, lng: -77.0369 },
  "washington dc": { lat: 38.9072, lng: -77.0369 },
  "dc": { lat: 38.9072, lng: -77.0369 },
  "nashville": { lat: 36.1627, lng: -86.7816 },
  "boston": { lat: 42.3601, lng: -71.0589 },
  "portland": { lat: 45.5152, lng: -122.6784 },
  "las vegas": { lat: 36.1699, lng: -115.1398 },
  "memphis": { lat: 35.1495, lng: -90.049 },
  "louisville": { lat: 38.2527, lng: -85.7585 },
  "baltimore": { lat: 39.2904, lng: -76.6122 },
  "milwaukee": { lat: 43.0389, lng: -87.9065 },
  "albuquerque": { lat: 35.0844, lng: -106.6504 },
  "tucson": { lat: 32.2226, lng: -110.9747 },
  "fresno": { lat: 36.7378, lng: -119.7871 },
  "sacramento": { lat: 38.5816, lng: -121.4944 },
  "atlanta": { lat: 33.749, lng: -84.388 },
  "miami": { lat: 25.7617, lng: -80.1918 },
  "minneapolis": { lat: 44.9778, lng: -93.265 },
  "raleigh": { lat: 35.7796, lng: -78.6382 },
  "tampa": { lat: 27.9506, lng: -82.4572 },
  "pittsburgh": { lat: 40.4406, lng: -79.9959 },
  "cleveland": { lat: 41.4993, lng: -81.6944 },
  "detroit": { lat: 42.3314, lng: -83.0458 },
  "new orleans": { lat: 29.9511, lng: -90.0715 },
  "toronto": { lat: 43.6532, lng: -79.3832 },
  "vancouver": { lat: 49.2827, lng: -123.1207 },
  "montreal": { lat: 45.5017, lng: -73.5673 },
  "calgary": { lat: 51.0447, lng: -114.0719 },
  "ottawa": { lat: 45.4215, lng: -75.6972 },
  "halifax": { lat: 44.6488, lng: -63.5752 },
  "victoria": { lat: 48.4284, lng: -123.3656 },
  "winnipeg": { lat: 49.8951, lng: -97.1384 },
  "edmonton": { lat: 53.5461, lng: -113.4938 },
  "quebec city": { lat: 46.8139, lng: -71.208 },
  "st johns": { lat: 47.5615, lng: -52.7126 },
  "st. johns": { lat: 47.5615, lng: -52.7126 },
  "fredericton": { lat: 45.9636, lng: -66.6431 },
  "charlottetown": { lat: 46.2382, lng: -63.1311 },
  "regina": { lat: 50.4452, lng: -104.6189 },
  "saskatoon": { lat: 52.1332, lng: -106.67 },
  "london": { lat: 51.5074, lng: -0.1278 },
  "paris": { lat: 48.8566, lng: 2.3522 },
  "berlin": { lat: 52.52, lng: 13.405 },
  "munich": { lat: 48.1351, lng: 11.582 },
  "amsterdam": { lat: 52.3676, lng: 4.9041 },
  "rome": { lat: 41.9028, lng: 12.4964 },
  "milan": { lat: 45.4642, lng: 9.19 },
  "madrid": { lat: 40.4168, lng: -3.7038 },
  "barcelona": { lat: 41.3874, lng: 2.1686 },
  "lisbon": { lat: 38.7223, lng: -9.1393 },
  "dublin": { lat: 53.3498, lng: -6.2603 },
  "edinburgh": { lat: 55.9533, lng: -3.1883 },
  "vienna": { lat: 48.2082, lng: 16.3738 },
  "zurich": { lat: 47.3769, lng: 8.5417 },
  "geneva": { lat: 46.2044, lng: 6.1432 },
  "brussels": { lat: 50.8503, lng: 4.3517 },
  "stockholm": { lat: 59.3293, lng: 18.0686 },
  "copenhagen": { lat: 55.6761, lng: 12.5683 },
  "oslo": { lat: 59.9139, lng: 10.7522 },
  "helsinki": { lat: 60.1699, lng: 24.9384 },
  "warsaw": { lat: 52.2297, lng: 21.0122 },
  "prague": { lat: 50.0755, lng: 14.4378 },
  "budapest": { lat: 47.4979, lng: 19.0402 },
  "athens": { lat: 37.9838, lng: 23.7275 },
  "istanbul": { lat: 41.0082, lng: 28.9784 },
  "tokyo": { lat: 35.6762, lng: 139.6503 },
  "osaka": { lat: 34.6937, lng: 135.5023 },
  "seoul": { lat: 37.5665, lng: 126.978 },
  "beijing": { lat: 39.9042, lng: 116.4074 },
  "shanghai": { lat: 31.2304, lng: 121.4737 },
  "hong kong": { lat: 22.3193, lng: 114.1694 },
  "singapore": { lat: 1.3521, lng: 103.8198 },
  "bangkok": { lat: 13.7563, lng: 100.5018 },
  "mumbai": { lat: 19.076, lng: 72.8777 },
  "delhi": { lat: 28.7041, lng: 77.1025 },
  "new delhi": { lat: 28.6139, lng: 77.209 },
  "bangalore": { lat: 12.9716, lng: 77.5946 },
  "sydney": { lat: -33.8688, lng: 151.2093 },
  "melbourne": { lat: -37.8136, lng: 144.9631 },
  "auckland": { lat: -36.8485, lng: 174.7633 },
  "dubai": { lat: 25.2048, lng: 55.2708 },
  "tel aviv": { lat: 32.0853, lng: 34.7818 },
  "cairo": { lat: 30.0444, lng: 31.2357 },
  "lagos": { lat: 6.5244, lng: 3.3792 },
  "nairobi": { lat: -1.2921, lng: 36.8219 },
  "cape town": { lat: -33.9249, lng: 18.4241 },
  "johannesburg": { lat: -26.2041, lng: 28.0473 },
  "são paulo": { lat: -23.5505, lng: -46.6333 },
  "sao paulo": { lat: -23.5505, lng: -46.6333 },
  "rio de janeiro": { lat: -22.9068, lng: -43.1729 },
  "buenos aires": { lat: -34.6037, lng: -58.3816 },
  "mexico city": { lat: 19.4326, lng: -99.1332 },
  "bogota": { lat: 4.711, lng: -74.0721 },
  "lima": { lat: -12.0464, lng: -77.0428 },
  "santiago": { lat: -33.4489, lng: -70.6693 },
  "salt lake city": { lat: 40.7608, lng: -111.891 },
  "st louis": { lat: 38.627, lng: -90.1994 },
  "kansas city": { lat: 39.0997, lng: -94.5786 },
  "orlando": { lat: 28.5383, lng: -81.3792 },
  "richmond": { lat: 37.5407, lng: -77.436 },
  "honolulu": { lat: 21.3069, lng: -157.8583 },
  "anchorage": { lat: 61.2181, lng: -149.9003 },
  "taipei": { lat: 25.033, lng: 121.5654 },
  "kuala lumpur": { lat: 3.139, lng: 101.6869 },
  "jakarta": { lat: -6.2088, lng: 106.8456 },
  "manila": { lat: 14.5995, lng: 120.9842 },
  "hanoi": { lat: 21.0278, lng: 105.8342 },
  "saigon": { lat: 10.8231, lng: 106.6297 },
  "ho chi minh city": { lat: 10.8231, lng: 106.6297 },
};

function normalizeCityKey(cityName) {
  return String(cityName || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/greater\s+/g, "")
    .replace(/\s+area$/g, "")
    .replace(/[()]/g, " ")
    .replace(/\b(remote|metro|region)\b/g, " ")
    .replace(/\s*[,/-]\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toSentenceCasePlace(cityName) {
  const cleaned = String(cityName || "").trim().replace(/\s+/g, " ");
  if (!cleaned) return "";
  return cleaned
    .split(" ")
    .map((part) =>
      part
        .split("-")
        .map((segment) =>
          segment
            .split("'")
            .map((piece) => (piece ? piece.charAt(0).toUpperCase() + piece.slice(1).toLowerCase() : piece))
            .join("'")
        )
        .join("-")
    )
    .join(" ");
}

function getKnownCityLabel(cityName) {
  const key = normalizeCityKey(cityName);
  if (CITY_DB[key]) return toSentenceCasePlace(key);
  const parts = key.split(" ").filter(Boolean);
  const candidate = parts.slice(0, 2).join(" ");
  if (CITY_DB[candidate]) return toSentenceCasePlace(candidate);
  if (parts[0] && CITY_DB[parts[0]]) return toSentenceCasePlace(parts[0]);
  for (const name of Object.keys(CITY_DB)) {
    if (key.includes(name) || name.includes(key)) return toSentenceCasePlace(name);
  }
  return toSentenceCasePlace(cityName);
}

function geocodeCity(cityName) {
  if (!cityName) return null;
  const key = normalizeCityKey(cityName);
  if (CITY_DB[key]) return CITY_DB[key];
  const parts = key.split(" ").filter(Boolean);
  const candidate = parts.slice(0, 2).join(" ");
  if (CITY_DB[candidate]) return CITY_DB[candidate];
  if (parts[0] && CITY_DB[parts[0]]) return CITY_DB[parts[0]];
  for (const [name, coords] of Object.entries(CITY_DB)) {
    if (key.includes(name) || name.includes(key)) return coords;
  }
  return null;
}

async function resolveTripDestination(cityName) {
  const destination = String(cityName || "").trim();
  if (!destination) return null;
  const knownCoords = geocodeCity(destination);
  if (knownCoords) {
    return {
      lat: knownCoords.lat,
      lng: knownCoords.lng,
      destination: getKnownCityLabel(destination),
    };
  }

  const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(destination)}`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Geocode failed: ${response.status}`);
  }
  const results = await response.json();
  const match = Array.isArray(results) ? results[0] : null;
  if (!match) return null;

  const primaryName = String(match.display_name || destination).split(",")[0].trim();
  return {
    lat: Number(match.lat),
    lng: Number(match.lon),
    destination: toSentenceCasePlace(primaryName || destination),
  };
}

function getRobinsonProjection(width, height) {
  const key = `${width}x${height}`;
  if (!ROBINSON_CACHE.has(key)) {
    ROBINSON_CACHE.set(
      key,
      d3.geoRobinson().fitExtent([[0, 0], [width, height]], { type: "Sphere" }).precision(0.1)
    );
  }
  return ROBINSON_CACHE.get(key);
}

function projectGeoPoint(lng, lat, width, height, zoom, center) {
  const projection = getRobinsonProjection(width, height);
  const point = projection([lng, lat]);
  const centerPoint = projection([center.lng, center.lat]);
  if (!point || !centerPoint) return null;
  return {
    x: width / 2 + (point[0] - centerPoint[0]) * zoom,
    y: height / 2 + (point[1] - centerPoint[1]) * zoom,
  };
}

function unprojectPoint(x, y, width, height, zoom, center) {
  const projection = getRobinsonProjection(width, height);
  const centerPoint = projection([center.lng, center.lat]);
  if (!centerPoint) return null;
  const geo = projection.invert([
    centerPoint[0] + (x - width / 2) / zoom,
    centerPoint[1] + (y - height / 2) / zoom,
  ]);
  return geo ? { lng: geo[0], lat: geo[1] } : null;
}

function getCenterForAnchor(anchor, x, y, width, height, zoom) {
  const projection = getRobinsonProjection(width, height);
  const anchorPoint = projection([anchor.lng, anchor.lat]);
  if (!anchorPoint) return null;
  const center = projection.invert([
    anchorPoint[0] - (x - width / 2) / zoom,
    anchorPoint[1] - (y - height / 2) / zoom,
  ]);
  return center ? { lng: center[0], lat: center[1] } : null;
}

function clampViewportCenter(center, zoom, width, height, insets = {}) {
  const projection = getRobinsonProjection(width, height);
  const centerPoint = projection([center.lng, center.lat]);
  if (!centerPoint) return center;
  const leftInset = insets.left || 0;
  const rightInset = insets.right || 0;
  const topInset = insets.top || 0;
  const bottomInset = insets.bottom || 0;
  const halfVisibleWidth = width / (2 * zoom);
  const halfVisibleHeight = height / (2 * zoom);
  const clampedX =
    halfVisibleWidth >= width
      ? width / 2
      : Math.max(
          Math.max(0, (width / 2 - leftInset) / zoom),
          Math.min(width - Math.max(0, (width / 2 - rightInset) / zoom), centerPoint[0])
        );
  const clampedY =
    halfVisibleHeight >= height
      ? height / 2
      : Math.max(
          Math.max(0, (height / 2 - topInset) / zoom),
          Math.min(height - Math.max(0, (height / 2 - bottomInset) / zoom), centerPoint[1])
        );
  const geo = projection.invert([clampedX, clampedY]);
  return geo ? { lng: geo[0], lat: geo[1] } : center;
}

function applyElasticViewportCenter(center, zoom, width, height, elasticity = 0.28, insets = {}) {
  const projection = getRobinsonProjection(width, height);
  const centerPoint = projection([center.lng, center.lat]);
  if (!centerPoint) return center;
  const leftInset = insets.left || 0;
  const rightInset = insets.right || 0;
  const topInset = insets.top || 0;
  const bottomInset = insets.bottom || 0;
  const halfVisibleWidth = width / (2 * zoom);
  const halfVisibleHeight = height / (2 * zoom);
  const minX = halfVisibleWidth >= width ? width / 2 : Math.max(0, (width / 2 - leftInset) / zoom);
  const maxX = halfVisibleWidth >= width ? width / 2 : width - Math.max(0, (width / 2 - rightInset) / zoom);
  const minY = halfVisibleHeight >= height ? height / 2 : Math.max(0, (height / 2 - topInset) / zoom);
  const maxY = halfVisibleHeight >= height ? height / 2 : height - Math.max(0, (height / 2 - bottomInset) / zoom);
  const softX =
    centerPoint[0] < minX
      ? minX + (centerPoint[0] - minX) * elasticity
      : centerPoint[0] > maxX
      ? maxX + (centerPoint[0] - maxX) * elasticity
      : centerPoint[0];
  const softY =
    centerPoint[1] < minY
      ? minY + (centerPoint[1] - minY) * elasticity
      : centerPoint[1] > maxY
      ? maxY + (centerPoint[1] - maxY) * elasticity
      : centerPoint[1];
  const geo = projection.invert([softX, softY]);
  return geo ? { lng: geo[0], lat: geo[1] } : center;
}

function getNextZoom(currentZoom, deltaY, minZoom, maxZoom) {
  const clampedDelta = Math.max(-120, Math.min(120, deltaY));
  const factor = Math.exp((-clampedDelta / 120) * 0.18);
  return Math.max(minZoom, Math.min(maxZoom, currentZoom * factor));
}

function getElasticZoom(currentZoom, deltaY, minZoom, maxZoom, elasticity = 0.28, overshoot = 0.9) {
  const clampedDelta = Math.max(-120, Math.min(120, deltaY));
  const factor = Math.exp((-clampedDelta / 120) * 0.18);
  const rawZoom = currentZoom * factor;
  if (rawZoom < minZoom) {
    return Math.max(minZoom - overshoot, minZoom - (minZoom - rawZoom) * elasticity);
  }
  if (rawZoom > maxZoom) {
    return Math.min(maxZoom + overshoot, maxZoom + (rawZoom - maxZoom) * elasticity);
  }
  return rawZoom;
}

function isFileDrag(event) {
  const types = event.dataTransfer?.types;
  return Array.isArray(types) ? types.includes("Files") : !!types && Array.from(types).includes("Files");
}

// CSV parser (lightweight, handles quoted fields)
function parseCSV(text) {
  const results = [];
  const fields = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      fields.push(current);
      current = "";
    } else if ((ch === "\n" || ch === "\r") && !inQuotes) {
      if (current || fields.length) {
        fields.push(current);
        const row = [...fields];
        fields.length = 0;
        current = "";
        if (row.some((c) => c.trim())) results.push(row);
      }
      if (ch === "\r" && text[i + 1] === "\n") i++;
    } else {
      current += ch;
    }
  }
  if (current || fields.length) {
    fields.push(current);
    if (fields.some((c) => c.trim())) results.push(fields);
  }
  return results;
}

function parseLinkedInCSV(text) {
  const contacts = [];
  const rows = parseCSV(text);
  if (rows.length === 0) return contacts;
  const header = rows[0].map((h) => h.trim().toLowerCase());
  const fnIdx = header.findIndex((h) => h.includes("first") && h.includes("name"));
  const lnIdx = header.findIndex((h) => h.includes("last") && h.includes("name"));
  const compIdx = header.findIndex((h) => h === "company" || h.includes("company"));
  const posIdx = header.findIndex((h) => h === "position" || h.includes("position") || h.includes("title"));
  const urlIdx = header.findIndex((h) => h.includes("url") || h.includes("profile"));
  // LinkedIn CSVs sometimes don't have city — check for it
  const cityIdx = header.findIndex((h) => h.includes("city") || h.includes("location"));

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const firstName = (fnIdx >= 0 ? row[fnIdx] : "").trim();
    const lastName = (lnIdx >= 0 ? row[lnIdx] : "").trim();
    const name = `${firstName} ${lastName}`.trim();
    if (!name) continue;
    const company = compIdx >= 0 ? (row[compIdx] || "").trim() : "";
    const position = posIdx >= 0 ? (row[posIdx] || "").trim() : "";
    const url = urlIdx >= 0 ? (row[urlIdx] || "").trim() : "";
    let city = cityIdx >= 0 ? (row[cityIdx] || "").trim() : "";
    // LinkedIn location is often "City, Country" or "Greater City Area"
    if (city) {
      city = city.replace(/greater\s+/i, "").replace(/\s+area$/i, "").split(",")[0].trim();
    }
    contacts.push({ name, city, company, position, url, source: "linkedin" });
  }
  return contacts;
}

const SOURCE_COLORS = {
  google: "#4285F4",
  linkedin: "#0A66C2",
  manual: "#E8541A",
};

const SOURCE_LABELS = {
  google: "Google",
  linkedin: "LinkedIn",
  manual: "Manual",
};

const STORAGE_KEY = "pinpal.contacts.v2";
const LEGACY_DEFAULT_CONTACT_KEYS = new Set([
  "sarah chen|san francisco",
  "marcus johnson|san francisco",
  "priya patel|san francisco",
  "alex rivera|new york",
  "jordan kim|new york",
  "emma zhang|new york",
  "liam o'brien|london",
  "sophie martin|london",
  "kai tanaka|tokyo",
  "yuki mori|tokyo",
  "ava williams|toronto",
  "noah silva|toronto",
  "isabella rossi|milan",
  "ethan park|seoul",
  "mia dubois|paris",
  "pierre lefebvre|paris",
  "oliver schmidt|berlin",
  "anna weber|berlin",
  "lucas costa|são paulo",
  "lucas costa|sã£o paulo",
  "zara ahmed|dubai",
  "ben cooper|sydney",
  "anika sharma|bangalore",
  "david lee|singapore",
  "carmen lópez|barcelona",
  "carmen lã³pez|barcelona",
  "ryan o'connor|dublin",
  "hannah berg|stockholm",
  "chris nakamura|austin",
  "rachel green|chicago",
  "tom andersen|copenhagen",
  "wei liu|shanghai",
  "fatima al-hassan|amsterdam",
  "james okafor|lagos",
  "sofia petrov|moscow",
  "carlos mendez|mexico city",
  "mei tanaka|osaka",
]);
const DEFAULT_MAP_CENTER = { lat: 20, lng: 15 };
const DEFAULT_PREVIEW_CENTER = { lat: 35, lng: -30 };
const DEFAULT_MAP_ZOOM = 1.3;
const DEFAULT_PREVIEW_ZOOM = 2.2;
const ROBINSON_CACHE = new Map();

function normalizeTags(tags) {
  if (Array.isArray(tags)) return tags.map((tag) => String(tag).trim()).filter(Boolean);
  if (typeof tags === "string") {
    return tags.split(",").map((tag) => tag.trim()).filter(Boolean);
  }
  return [];
}

function normalizeContact(contact) {
  return {
    ...contact,
    source: contact.source || "manual",
    company: contact.company || "",
    position: contact.position || "",
    note: contact.note || "",
    url: contact.url || "",
    city: contact.city || "",
    tags: normalizeTags(contact.tags),
  };
}

function getDefaultContacts() {
  return Array.isArray(window.DEFAULT_CONTACTS) ? window.DEFAULT_CONTACTS : [];
}

function getContactKey(contact) {
  return `${String(contact.name || "").toLowerCase()}|${String(contact.city || "").toLowerCase()}`;
}

function geocodeContact(contact) {
  const normalized = normalizeContact(contact);
  if (typeof normalized.lat === "number" && typeof normalized.lng === "number") {
    return normalized;
  }
  const coords = geocodeCity(normalized.city);
  return coords ? { ...normalized, lat: coords.lat, lng: coords.lng } : { ...normalized, lat: null, lng: null };
}

function haversineKm(lat1, lng1, lat2, lng2) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getDistanceBand(distanceKm) {
  if (distanceKm <= 25) return "Same city";
  if (distanceKm <= 100) return "Nearby";
  if (distanceKm <= 300) return "Regional";
  return "Flight away";
}

function getProjectedTripRadius(lat, lng, radiusKm, width, height, zoom, center) {
  if (!radiusKm || radiusKm <= 0) return { rx: 0, ry: 0 };
  const centerPoint = projectGeoPoint(lng, lat, width, height, zoom, center);
  if (!centerPoint) return { rx: 0, ry: 0 };
  const latRadians = (lat * Math.PI) / 180;
  const deltaLat = radiusKm / 110.574;
  const cosLat = Math.max(0.15, Math.cos(latRadians));
  const deltaLng = radiusKm / (111.320 * cosLat);
  const eastPoint = projectGeoPoint(lng + deltaLng, lat, width, height, zoom, center);
  const northPoint = projectGeoPoint(lng, Math.min(85, lat + deltaLat), width, height, zoom, center);
  return {
    rx: eastPoint ? Math.abs(eastPoint.x - centerPoint.x) : 0,
    ry: northPoint ? Math.abs(northPoint.y - centerPoint.y) : 0,
  };
}

function getAvatarSrc(contact, size = 96) {
  try {
    if (window.PinPalAvatar && typeof window.PinPalAvatar.getDataUri === "function") {
      return window.PinPalAvatar.getDataUri(contact, size);
    }
  } catch {}
  return null;
}

function topoGeometryToPaths(geometry, project) {
  if (!geometry) return [];
  const rings =
    geometry.type === "Polygon"
      ? geometry.coordinates
      : geometry.type === "MultiPolygon"
      ? geometry.coordinates.flat(1)
      : geometry.type === "LineString"
      ? [geometry.coordinates]
      : geometry.type === "MultiLineString"
      ? geometry.coordinates
      : [];

  return rings
    .map((ring) => {
      let prevLng = null;
      let path = "";
      ring.forEach(([lng, lat], index) => {
        const { x, y } = project(lng, lat);
        const point = `${x.toFixed(2)},${y.toFixed(2)}`;
        const crossesAntiMeridian =
          index > 0 && prevLng !== null && Math.abs(lng - prevLng) > 180;
        path += path === "" || crossesAntiMeridian ? `M${point}` : ` L${point}`;
        prevLng = lng;
      });
      if (geometry.type === "Polygon" || geometry.type === "MultiPolygon") {
        path += " Z";
      }
      return path;
    })
    .filter(Boolean);
}


const WorldMap = React.memo(function WorldMap({ w, h, zoom, centerLat, centerLng }) {
  const [geoPaths, setGeoPaths] = useState([]);
  const [borderPaths, setBorderPaths] = useState([]);

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json")
      .then(r => r.json())
      .then(world => {
        const land = topojson.feature(world, world.objects.land);
        setGeoPaths(land.features || [land]);
      });

    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then(r => r.json())
      .then(world => {
        const borders = topojson.mesh(world, world.objects.countries, (a, b) => a !== b);
        setBorderPaths([borders]);
      });
  }, []);

  function project(lng, lat) {
    return projectGeoPoint(lng, lat, w, h, zoom, { lat: centerLat, lng: centerLng });
  }

  return (
    <g>
      {geoPaths.map((feature, i) => (
        <path
          key={i}
          d={topoGeometryToPaths(feature.geometry, project).join(" ")}
          fill="#C8CFBA"
          stroke="#B8C0AA"
          strokeWidth="0.35"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      ))}
      {borderPaths.map((feature, i) => (
        <path
          key={`border-${i}`}
          d={topoGeometryToPaths(feature, project).join(" ")}
          fill="none"
          stroke="#AEB69E"
          strokeWidth="0.55"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity="0.95"
        />
      ))}
    </g>
  );
}, (prev, next) =>
  prev.w === next.w && prev.h === next.h &&
  prev.zoom === next.zoom &&
  prev.centerLat === next.centerLat && prev.centerLng === next.centerLng
);

// ─── Main App ───
function PinPal() {
  const [contacts, setContacts] = useState([]);
  const [view, setView] = useState("landing"); // landing | map
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ google: true, linkedin: true, manual: true });
  const [showManualForm, setShowManualForm] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [toast, setToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mapRef = useRef(null);
  const svgMapRef = useRef(null);
  const svgPreviewRef = useRef(null);
  const fileInputRef = useRef(null);
  const importInputRef = useRef(null);
  const [mapCenter, setMapCenter] = useState({ lat: 20, lng: 15 });
  const [mapZoom, setMapZoom] = useState(1.3);
  const [hoveredCity, setHoveredCity] = useState(null);
  const [manualForm, setManualForm] = useState({ name: "", city: "", company: "", position: "", note: "", tags: "" });
  const [csvDragOver, setCsvDragOver] = useState(false);
  const [pendingLinkedIn, setPendingLinkedIn] = useState(null); // contacts needing city assignment
  const [showLinkedInGuide, setShowLinkedInGuide] = useState(false);
  const [guideStep, setGuideStep] = useState(0);
  const [previewZoom, setPreviewZoom] = useState(DEFAULT_PREVIEW_ZOOM);
  const [previewCenter, setPreviewCenter] = useState(DEFAULT_PREVIEW_CENTER);
  const [showTripPlanner, setShowTripPlanner] = useState(false);
  const [sidebarMode, setSidebarMode] = useState(null);
  const [tripDraft, setTripDraft] = useState({ destination: "", radiusKm: 100, notes: "" });
  const [tripPlan, setTripPlan] = useState(null);
  const [selectedContactProfile, setSelectedContactProfile] = useState(null);
  const mapViewportRef = useRef({ zoom: DEFAULT_MAP_ZOOM, center: DEFAULT_MAP_CENTER });
  const previewViewportRef = useRef({ zoom: DEFAULT_PREVIEW_ZOOM, center: DEFAULT_PREVIEW_CENTER });
  const suppressMapClickRef = useRef(false);
  const suppressPreviewClickRef = useRef(false);
  const mapZoomSnapTimeoutRef = useRef(null);
  const previewZoomSnapTimeoutRef = useRef(null);

  useEffect(() => {
    const demo = getDefaultContacts();
    /* Legacy inline demo list kept only for reference during refactor:
      { name: "Sarah Chen", city: "San Francisco", company: "Stripe", position: "Product Manager", source: "linkedin" },
      { name: "Marcus Johnson", city: "San Francisco", company: "Airbnb", position: "Design Lead", source: "google" },
      { name: "Priya Patel", city: "San Francisco", company: "Notion", position: "Engineer", source: "linkedin" },
      { name: "Alex Rivera", city: "New York", company: "Goldman Sachs", position: "VP", source: "google" },
      { name: "Jordan Kim", city: "New York", company: "Google", position: "PM", source: "linkedin" },
      { name: "Emma Zhang", city: "New York", company: "NYT", position: "Editor", source: "manual" },
      { name: "Liam O'Brien", city: "London", company: "DeepMind", position: "Researcher", source: "linkedin" },
      { name: "Sophie Martin", city: "London", company: "Revolut", position: "CPO", source: "google" },
      { name: "Kai Tanaka", city: "Tokyo", company: "Sony", position: "Director", source: "linkedin" },
      { name: "Yuki Mori", city: "Tokyo", company: "Nintendo", position: "Game Designer", source: "manual" },
      { name: "Ava Williams", city: "Toronto", company: "Shopify", position: "Staff Eng", source: "google" },
      { name: "Noah Silva", city: "Toronto", company: "RBC", position: "Analyst", source: "linkedin" },
      { name: "Isabella Rossi", city: "Milan", company: "Prada", position: "Brand Strategy", source: "manual" },
      { name: "Ethan Park", city: "Seoul", company: "Samsung", position: "VP Engineering", source: "linkedin" },
      { name: "Mia Dubois", city: "Paris", company: "LVMH", position: "Innovation Lead", source: "google" },
      { name: "Pierre Lefebvre", city: "Paris", company: "BNP Paribas", position: "Director", source: "linkedin" },
      { name: "Oliver Schmidt", city: "Berlin", company: "SoundCloud", position: "CTO", source: "linkedin" },
      { name: "Anna Weber", city: "Berlin", company: "Zalando", position: "Head of Design", source: "google" },
      { name: "Lucas Costa", city: "São Paulo", company: "Nubank", position: "Eng Manager", source: "linkedin" },
      { name: "Zara Ahmed", city: "Dubai", company: "Careem", position: "Growth Lead", source: "manual" },
      { name: "Ben Cooper", city: "Sydney", company: "Canva", position: "Designer", source: "google" },
      { name: "Anika Sharma", city: "Bangalore", company: "Flipkart", position: "Tech Lead", source: "linkedin" },
      { name: "David Lee", city: "Singapore", company: "Grab", position: "Head of Product", source: "google" },
      { name: "Carmen López", city: "Barcelona", company: "Glovo", position: "Operations", source: "manual" },
      { name: "Ryan O'Connor", city: "Dublin", company: "Intercom", position: "Engineering", source: "linkedin" },
      { name: "Hannah Berg", city: "Stockholm", company: "Spotify", position: "Data Science", source: "google" },
      { name: "Chris Nakamura", city: "Austin", company: "Tesla", position: "Manufacturing", source: "linkedin" },
      { name: "Rachel Green", city: "Chicago", company: "Groupon", position: "Marketing", source: "google" },
      { name: "Tom Andersen", city: "Copenhagen", company: "Maersk", position: "Logistics", source: "linkedin" },
      { name: "Wei Liu", city: "Shanghai", company: "Alibaba", position: "Product Director", source: "linkedin" },
      { name: "Fatima Al-Hassan", city: "Amsterdam", company: "Booking.com", position: "Engineer", source: "google" },
      { name: "James Okafor", city: "Lagos", company: "Paystack", position: "CEO", source: "manual" },
      { name: "Sofia Petrov", city: "Moscow", company: "Yandex", position: "PM", source: "linkedin" },
      { name: "Carlos Mendez", city: "Mexico City", company: "Rappi", position: "Growth", source: "manual" },
      { name: "Mei Tanaka", city: "Osaka", company: "Panasonic", position: "Engineer", source: "linkedin" },
    ]; */
    const defaultContacts = demo.map(geocodeContact).filter((c) => c.lat);
    const mergedContacts = new Map(defaultContacts.map((contact) => [getContactKey(contact), contact]));
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length) {
          parsed
            .map(geocodeContact)
            .filter((c) => c.lat)
            .forEach((contact) => {
              const key = getContactKey(contact);
              if (!mergedContacts.has(key) && !LEGACY_DEFAULT_CONTACT_KEYS.has(key)) {
                mergedContacts.set(key, contact);
              }
            });
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
    setContacts(Array.from(mergedContacts.values()));
    setView("map");
  }, []);

  useEffect(() => {
    if (!contacts.length) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    mapViewportRef.current = { zoom: mapZoom, center: mapCenter };
  }, [mapZoom, mapCenter]);

  useEffect(() => {
    previewViewportRef.current = { zoom: previewZoom, center: previewCenter };
  }, [previewZoom, previewCenter]);

  useEffect(() => {
    return () => {
      if (mapZoomSnapTimeoutRef.current) clearTimeout(mapZoomSnapTimeoutRef.current);
      if (previewZoomSnapTimeoutRef.current) clearTimeout(previewZoomSnapTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const el = svgMapRef.current;
    if (!el) return;
    const handler = (e) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const svgX = ((e.clientX - rect.left) * W) / rect.width;
      const svgY = ((e.clientY - rect.top) * H) / rect.height;
      const { zoom, center } = mapViewportRef.current;
      const nextZoom = getElasticZoom(zoom, e.deltaY, 1, 20);
      if (nextZoom === zoom) return;
      const anchor = unprojectPoint(svgX, svgY, W, H, zoom, center);
      if (!anchor) return;
      const anchoredCenter = getCenterForAnchor(anchor, svgX, svgY, W, H, nextZoom);
      if (!anchoredCenter) return;
      const nextCenter = clampViewportCenter(anchoredCenter, nextZoom, W, H, getFullMapInsets());
      setMapZoom(nextZoom);
      setMapCenter(nextCenter);
      if (mapZoomSnapTimeoutRef.current) clearTimeout(mapZoomSnapTimeoutRef.current);
      mapZoomSnapTimeoutRef.current = setTimeout(() => {
        const { zoom: settledZoom, center: settledCenter } = mapViewportRef.current;
        const snappedZoom = Math.max(1, Math.min(20, settledZoom));
        if (Math.abs(snappedZoom - settledZoom) < 0.001) return;
        setMapZoom(snappedZoom);
        setMapCenter(clampViewportCenter(settledCenter, snappedZoom, W, H, getFullMapInsets()));
      }, 110);
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [view, showTripPlanner, sidebarOpen]);

  // Non-passive wheel handler for preview map (React onWheel is passive)
  useEffect(() => {
    const el = svgPreviewRef.current;
    if (!el) return;
    const handler = (e) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const svgX = ((e.clientX - rect.left) * PREVIEW_W) / rect.width;
      const svgY = ((e.clientY - rect.top) * PREVIEW_H) / rect.height;
      const { zoom, center } = previewViewportRef.current;
      const nextZoom = getElasticZoom(zoom, e.deltaY, 1, 16, 0.28, 0.7);
      if (nextZoom === zoom) return;
      const anchor = unprojectPoint(svgX, svgY, PREVIEW_W, PREVIEW_H, zoom, center);
      if (!anchor) return;
      const anchoredCenter = getCenterForAnchor(anchor, svgX, svgY, PREVIEW_W, PREVIEW_H, nextZoom);
      if (!anchoredCenter) return;
      const nextCenter = clampViewportCenter(anchoredCenter, nextZoom, PREVIEW_W, PREVIEW_H);
      setPreviewZoom(nextZoom);
      setPreviewCenter(nextCenter);
      if (previewZoomSnapTimeoutRef.current) clearTimeout(previewZoomSnapTimeoutRef.current);
      previewZoomSnapTimeoutRef.current = setTimeout(() => {
        const { zoom: settledZoom, center: settledCenter } = previewViewportRef.current;
        const snappedZoom = Math.max(1, Math.min(16, settledZoom));
        if (Math.abs(snappedZoom - settledZoom) < 0.001) return;
        setPreviewZoom(snappedZoom);
        setPreviewCenter(clampViewportCenter(settledCenter, snappedZoom, PREVIEW_W, PREVIEW_H));
      }, 110);
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [view]);

  useEffect(() => {
    if (view !== "map") return;
    const nextCenter = clampViewportCenter(mapCenter, mapZoom, W, H, getFullMapInsets());
    if (Math.abs(nextCenter.lat - mapCenter.lat) > 0.0001 || Math.abs(nextCenter.lng - mapCenter.lng) > 0.0001) {
      setMapCenter(nextCenter);
    }
  }, [view, mapZoom, sidebarOpen, showTripPlanner]);

  useEffect(() => {
    if (view !== "map") return;
    if (!selectedCity && !tripPlan) {
      setSidebarMode("summary");
      setSidebarOpen(true);
    }
  }, [view]);

  const showToast = useCallback((msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Filtered + geocoded contacts
  const geoContacts = contacts.filter((c) => c.lat && c.lng && filters[c.source]);

  // Group by city
  const cityGroups = {};
  geoContacts.forEach((c) => {
    const key = `${c.lat.toFixed(2)},${c.lng.toFixed(2)}`;
    if (!cityGroups[key]) cityGroups[key] = { key, city: c.city, lat: c.lat, lng: c.lng, contacts: [] };
    cityGroups[key].contacts.push(c);
  });

  // Search
  const searchResults = searchQuery.trim()
    ? (() => {
        const query = searchQuery.trim().toLowerCase();
        const cityMatches = Object.values(cityGroups)
          .filter((g) => {
            const cityText = [g.city, ...g.contacts.flatMap((c) => [c.company, c.position, ...(c.tags || [])])]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();
            return cityText.includes(query);
          })
          .map((g) => ({
            type: "city",
            key: g.key,
            title: g.city,
            subtitle: `${g.contacts.length} contact${g.contacts.length > 1 ? "s" : ""}`,
            cityGroup: g,
          }));

        const contactMatches = geoContacts
          .filter((c) =>
            [c.name, c.city, c.company, c.position, c.note, ...(c.tags || [])]
              .filter(Boolean)
              .join(" ")
              .toLowerCase()
              .includes(query)
          )
          .slice(0, 8)
          .map((c, index) => ({
            type: "contact",
            key: `${c.name}-${c.city}-${index}`,
            title: c.name,
            subtitle: [c.city, c.company, c.position].filter(Boolean).join(" � "),
            cityGroup: Object.values(cityGroups).find((g) => g.city === c.city && g.contacts.some((gc) => gc.name === c.name)) || null,
          }));

        const destinationMatches = Object.entries(CITY_DB)
          .filter(([name]) => name.includes(query))
          .filter(([name]) => !cityMatches.some((match) => normalizeCityKey(match.title) === name))
          .slice(0, 6)
          .map(([name, coords]) => ({
            type: "destination",
            key: `destination-${name}`,
            title: toSentenceCasePlace(name),
            subtitle: "Known city � no contacts yet",
            cityGroup: null,
            coords,
          }));

        return [...cityMatches, ...contactMatches, ...destinationMatches].slice(0, 12);
      })()
    : [];

  const activeTripPlan = tripPlan
    ? {
        ...tripPlan,
        radiusKm: Number(tripDraft.radiusKm) || tripPlan.radiusKm || 100,
      }
    : null;

  const tripMatches = activeTripPlan
    ? geoContacts
        .map((contact) => ({
          ...contact,
          distanceKm: haversineKm(activeTripPlan.lat, activeTripPlan.lng, contact.lat, contact.lng),
        }))
        .filter((contact) => contact.distanceKm <= activeTripPlan.radiusKm)
        .sort((a, b) => a.distanceKm - b.distanceKm)
    : [];

  const tripSummary = activeTripPlan
    ? tripMatches.reduce((acc, contact) => {
        const band = getDistanceBand(contact.distanceKm);
        acc[band] = (acc[band] || 0) + 1;
        return acc;
      }, {})
    : {};

  const topHubs = Object.values(cityGroups)
    .slice()
    .sort((a, b) => b.contacts.length - a.contacts.length || a.city.localeCompare(b.city))
    .slice(0, 8);

  function addContacts(newContacts) {
    const geocoded = newContacts.map(geocodeContact);
    setContacts((prev) => {
      const existing = new Set(prev.map(getContactKey));
      const unique = geocoded.filter((c) => !existing.has(getContactKey(c)));
      return [...prev, ...unique];
    });
    const mapped = geocoded.filter((c) => c.lat);
    const unmapped = geocoded.filter((c) => !c.lat);
    if (mapped.length) showToast(`Added ${mapped.length} contact${mapped.length > 1 ? "s" : ""} to the map`);
    if (unmapped.length) showToast(`${unmapped.length} contact${unmapped.length > 1 ? "s" : ""} couldn't be geocoded`, "warn");
    if (mapped.length) setView("map");
  }

  function handleLinkedInUpload(text) {
    const parsed = parseLinkedInCSV(text);
    if (!parsed.length) {
      showToast("No contacts found in CSV", "error");
      return;
    }
    const withCity = parsed.filter((c) => c.city);
    const withoutCity = parsed.filter((c) => !c.city);
    if (withCity.length) addContacts(withCity);
    if (withoutCity.length) {
      showToast(`${withoutCity.length} contacts have no city — skipped`, "warn");
    }
    if (!withCity.length && !withoutCity.length) {
      showToast("No contacts found", "error");
    }
  }

  function handleFileUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => handleLinkedInUpload(ev.target.result);
    reader.readAsText(file);
  }

  function handleImport(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (Array.isArray(data)) {
          setContacts(data);
          setView("map");
          showToast(`Imported ${data.length} contacts`);
        } else {
          showToast("Invalid file format", "error");
        }
      } catch {
        showToast("Could not parse file", "error");
      }
    };
    reader.readAsText(file);
  }

  function handleExport() {
    const blob = new Blob([JSON.stringify(contacts, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pinpal-contacts.json";
    a.click();
    URL.revokeObjectURL(url);
    showToast("Contacts exported!");
  }

  function handleManualAdd() {
    if (!manualForm.name.trim() || !manualForm.city.trim()) {
      showToast("Name and city are required", "error");
      return;
    }
    addContacts([{ ...manualForm, source: "manual" }]);
    setManualForm({ name: "", city: "", company: "", position: "", note: "", tags: "" });
    setShowManualForm(false);
  }

  async function handleTripPlanCreate() {
    const destination = tripDraft.destination.trim();
    if (!destination) {
      showToast("Add a destination to build a trip plan", "error");
      return;
    }
    let resolved;
    try {
      resolved = await resolveTripDestination(destination);
    } catch {
      showToast("Couldn't look up that destination right now", "error");
      return;
    }
    if (!resolved) {
      showToast("Couldn't find that destination yet", "warn");
      return;
    }
    const nextPlan = {
      ...tripDraft,
      destination: resolved.destination,
      radiusKm: Number(tripDraft.radiusKm) || 100,
      lat: resolved.lat,
      lng: resolved.lng,
    };
    setTripPlan(nextPlan);
    setShowTripPlanner(true);
    setSidebarMode("trip");
    setSidebarOpen(true);
    setSelectedCity(null);
    const centeredPlan = getCenterForAnchor(nextPlan, (W - SIDEBAR_WIDTH + TRIP_PANEL_LEFT_INSET) / 2, H / 2, W, H, 5.2);
    setMapCenter(clampViewportCenter(centeredPlan || { lat: resolved.lat, lng: resolved.lng }, 5.2, W, H, {
      left: TRIP_PANEL_LEFT_INSET,
      right: SIDEBAR_WIDTH,
      top: 0,
      bottom: 0,
    }));
    setMapZoom(5.2);
  }

  function clearTripPlan() {
    setTripPlan(null);
    setTripDraft({ destination: "", radiusKm: 100, notes: "" });
    setSidebarMode("summary");
    setSidebarOpen(true);
    setSelectedCity(null);
  }

  function flyToCity(cityGroup) {
    setSelectedCity(cityGroup);
    setSidebarMode("city");
    const centeredCity = getCenterForAnchor(cityGroup, (W - SIDEBAR_WIDTH) / 2, H / 2, W, H, 6);
    setMapCenter(clampViewportCenter(centeredCity || { lat: cityGroup.lat, lng: cityGroup.lng }, 6, W, H, {
      left: showTripPlanner ? TRIP_PANEL_LEFT_INSET : 0,
      right: SIDEBAR_WIDTH,
      top: 0,
      bottom: 0,
    }));
    setMapZoom(6);
    setSidebarOpen(true);
  }

  function openContactProfile(contact) {
    setSelectedContactProfile(contact);
  }

  function toggleCitySelection(cityGroup) {
    const isSameCity = selectedCity && selectedCity.key === cityGroup.key && sidebarOpen;
    if (isSameCity) {
      setSelectedCity(null);
      setSidebarMode("summary");
      setSidebarOpen(true);
      return;
    }
    setSelectedCity(cityGroup);
    setSidebarMode("city");
    setSidebarOpen(true);
  }

  function handleDrop(e) {
    e.preventDefault();
    setCsvDragOver(false);
    if (!isFileDrag(e)) return;
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (file.name.endsWith(".json")) {
          try {
            const data = JSON.parse(ev.target.result);
            if (Array.isArray(data)) {
              setContacts(data);
              setView("map");
              showToast(`Imported ${data.length} contacts`);
            }
          } catch {
            showToast("Could not parse file", "error");
          }
        } else {
          handleLinkedInUpload(ev.target.result);
        }
      };
      reader.readAsText(file);
    }
  }

  function handleRootDragOver(e) {
    if (!isFileDrag(e)) return;
    e.preventDefault();
    if (!csvDragOver) setCsvDragOver(true);
  }

  function handleRootDragLeave(e) {
    if (!isFileDrag(e)) return;
    const nextTarget = e.relatedTarget;
    if (nextTarget && e.currentTarget.contains(nextTarget)) return;
    setCsvDragOver(false);
  }

  // Demo data
  function loadDemoData() {
    /* Legacy inline demo list kept only for reference:
      { name: "Sarah Chen", city: "San Francisco", company: "Stripe", position: "Product Manager", source: "linkedin" },
      { name: "Marcus Johnson", city: "San Francisco", company: "Airbnb", position: "Design Lead", source: "google" },
      { name: "Priya Patel", city: "San Francisco", company: "Notion", position: "Engineer", source: "linkedin" },
      { name: "Alex Rivera", city: "New York", company: "Goldman Sachs", position: "VP", source: "google" },
      { name: "Jordan Kim", city: "New York", company: "Google", position: "PM", source: "linkedin" },
      { name: "Emma Zhang", city: "New York", company: "NYT", position: "Editor", source: "manual" },
      { name: "Liam O'Brien", city: "London", company: "DeepMind", position: "Researcher", source: "linkedin" },
      { name: "Sophie Martin", city: "London", company: "Revolut", position: "CPO", source: "google" },
      { name: "Kai Tanaka", city: "Tokyo", company: "Sony", position: "Director", source: "linkedin" },
      { name: "Ava Williams", city: "Toronto", company: "Shopify", position: "Staff Eng", source: "google" },
      { name: "Noah Silva", city: "Toronto", company: "RBC", position: "Analyst", source: "linkedin" },
      { name: "Isabella Rossi", city: "Milan", company: "Prada", position: "Brand Strategy", source: "manual" },
      { name: "Ethan Park", city: "Seoul", company: "Samsung", position: "VP Engineering", source: "linkedin" },
      { name: "Mia Dubois", city: "Paris", company: "LVMH", position: "Innovation Lead", source: "google" },
      { name: "Oliver Schmidt", city: "Berlin", company: "SoundCloud", position: "CTO", source: "linkedin" },
      { name: "Lucas Costa", city: "São Paulo", company: "Nubank", position: "Eng Manager", source: "linkedin" },
      { name: "Zara Ahmed", city: "Dubai", company: "Careem", position: "Growth Lead", source: "manual" },
      { name: "Ben Cooper", city: "Sydney", company: "Canva", position: "Designer", source: "google" },
      { name: "Anika Sharma", city: "Bangalore", company: "Flipkart", position: "Tech Lead", source: "linkedin" },
      { name: "David Lee", city: "Singapore", company: "Grab", position: "Head of Product", source: "google" },
      { name: "Carmen López", city: "Barcelona", company: "Glovo", position: "Operations", source: "manual" },
      { name: "Ryan O'Connor", city: "Dublin", company: "Intercom", position: "Engineering", source: "linkedin" },
      { name: "Hannah Berg", city: "Stockholm", company: "Spotify", position: "Data Science", source: "google" },
      { name: "Chris Nakamura", city: "Austin", company: "Tesla", position: "Manufacturing", source: "linkedin" },
      { name: "Rachel Green", city: "Chicago", company: "Groupon", position: "Marketing", source: "google" },
      { name: "Tom Andersen", city: "Copenhagen", company: "Maersk", position: "Logistics", source: "linkedin" },
      { name: "Yuki Mori", city: "Osaka", company: "Nintendo", position: "Game Design", source: "manual" },
    ]; */
    addContacts(getDefaultContacts());
  }

  // ─── Mercator projection helpers ───
  function latToY(lat, height) {
    const point = projectGeoPoint(0, lat, 1200, height, mapZoom, mapCenter);
    return point ? point.y : height / 2;
  }

  function lngToX(lng, width) {
    const point = projectGeoPoint(lng, 0, width, 700, mapZoom, mapCenter);
    return point ? point.x : width / 2;
  }

  function latLngToXY(lat, lng, width, height) {
    return projectGeoPoint(lng, lat, width, height, mapZoom, mapCenter) || { x: width / 2, y: height / 2 };
  }

  function projectPoint(lat, lng, w, h, zoom, center) {
    return projectGeoPoint(lng, lat, w, h, zoom, center) || { x: w / 2, y: h / 2 };
  }

  // ─── Render ───

  // Preview map data: show fake dots if no contacts, real dots if loaded
  const PREVIEW_W = 900;
  const PREVIEW_H = 500;
  const fakeDots = [
    { city: "New York", lat: 40.7128, lng: -74.006, count: 12, color: "#E8541A" },
    { city: "Los Angeles", lat: 34.0522, lng: -118.2437, count: 7, color: "#E8541A" },
    { city: "London", lat: 51.5074, lng: -0.1278, count: 5, color: "#E8541A" },
    { city: "Toronto", lat: 43.6532, lng: -79.3832, count: 3, color: "#E8541A" },
    { city: "Paris", lat: 48.8566, lng: 2.3522, count: 2, color: "#E8541A" },
    { city: "Tokyo", lat: 35.6762, lng: 139.6503, count: 4, color: "#E8541A" },
    { city: "São Paulo", lat: -23.5505, lng: -46.6333, count: 2, color: "#E8541A" },
    { city: "Sydney", lat: -33.8688, lng: 151.2093, count: 1, color: "#E8541A" },
  ];
  const hasRealContacts = geoContacts.length > 0;
  const previewDots = hasRealContacts
    ? Object.values(cityGroups).map((g) => ({ city: g.city, lat: g.lat, lng: g.lng, count: g.contacts.length, color: "#E8541A" }))
    : fakeDots;

  if (view === "landing") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#F7F5F0",
          color: "#1A1A18",
          fontFamily: "'DM Sans', sans-serif",
          position: "relative",
        }}
      >
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Fraunces:ital,wght@0,700;1,600&display=swap" rel="stylesheet" />

        {csvDragOver && (
          <div style={{
            position: "fixed", inset: 0, background: "rgba(232,84,26,0.08)", zIndex: 100,
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "3px dashed #E8541A", backdropFilter: "blur(4px)",
          }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#E8541A" }}>Drop CSV or JSON file here</div>
          </div>
        )}

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 40px", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 48 }}>
            <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="#E8541A"/>
              <circle cx="12" cy="12" r="5" fill="white"/>
              <path d="M12 24 L7 32 L12 29 L17 32 Z" fill="#E8541A"/>
            </svg>
            <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 700, fontSize: 22, letterSpacing: "-0.5px", color: "#1A1A18" }}>
              Pin<span style={{ color: "#E8541A" }}>Pal</span>
            </span>
          </div>

          <div style={{ display: "flex", gap: 40, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 340px", minWidth: 300, maxWidth: 460 }}>
              <h1 style={{
                fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, lineHeight: 1.05,
                letterSpacing: "-1.5px", marginBottom: 16,
                fontFamily: "'Fraunces', Georgia, serif",
                color: "#1A1A18",
              }}>
                Travelling somewhere?<br />See who you know.
              </h1>

              <p style={{ fontSize: 16, color: "#666", lineHeight: 1.6, maxWidth: 420, marginBottom: 36 }}>
                Import your contacts. See them on a map. Click a city, find your people. Everything stays in your browser.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button
                  onClick={() => showToast("Google OAuth requires a deployed app with client ID. Try demo data or CSV upload!", "warn")}
                  style={{
                    padding: "14px 20px", borderRadius: 12, border: "1px solid #E0DDD7",
                    background: "white", color: "#1A1A18",
                    fontSize: 15, fontWeight: 500, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 12,
                  }}
                >
                  <span style={{ width: 30, height: 30, borderRadius: 7, background: "white", border: "1px solid #E0DDD7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </span>
                  <div style={{ textAlign: "left", flex: 1 }}>
                    <div>Connect Google Contacts</div>
                    <div style={{ fontSize: 11, color: "#AAA" }}>Requires OAuth setup</div>
                  </div>
                </button>

                <button
                  onClick={() => setShowLinkedInGuide((v) => !v)}
                  style={{
                    padding: "14px 20px", borderRadius: 12, border: "1px solid",
                    borderColor: showLinkedInGuide ? "#0A66C2" : "#E0DDD7",
                    background: showLinkedInGuide ? "rgba(10,102,194,0.06)" : "white",
                    color: "#1A1A18", fontSize: 15, fontWeight: 500, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 12,
                  }}
                >
                  <span style={{ width: 30, height: 30, borderRadius: 7, background: "#0A66C2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg" fill="white">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </span>
                  <div style={{ textAlign: "left", flex: 1 }}>
                    <div>Upload LinkedIn CSV</div>
                    <div style={{ fontSize: 11, color: "#AAA" }}>How do I get this?</div>
                  </div>
                  <span style={{ fontSize: 16, color: "#AAA" }}>{showLinkedInGuide ? "?" : "?"}</span>
                </button>

                {showLinkedInGuide && (
                  <div style={{
                    background: "rgba(10,102,194,0.04)", border: "1px solid rgba(10,102,194,0.15)",
                    borderRadius: 12, padding: "16px", display: "grid", gap: 10,
                  }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#1A1A18" }}>Get your LinkedIn connections CSV</div>
                    <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>1. Open LinkedIn Settings & Privacy.</div>
                    <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>2. Go to Data privacy ? Download your data.</div>
                    <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>3. Request the Connections archive, then upload the CSV here.</div>
                    <button onClick={() => fileInputRef.current?.click()} style={{ marginTop: 4, padding: "8px 14px", borderRadius: 8, border: "none", background: "linear-gradient(135deg, #0A66C2, #0077B5)", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", width: "fit-content" }}>
                      Upload Connections.csv
                    </button>
                  </div>
                )}
                <input ref={fileInputRef} type="file" accept=".csv" style={{ display: "none" }} onChange={handleFileUpload} />

                <button
                  onClick={() => setShowManualForm(true)}
                  style={{
                    padding: "14px 20px", borderRadius: 12, border: "1px solid #E0DDD7", background: "white", color: "#1A1A18",
                    fontSize: 15, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 12,
                  }}
                >
                  <span style={{ width: 30, height: 30, borderRadius: 7, background: "#E8541A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0, fontWeight: 700, color: "white" }}>+</span>
                  <div style={{ textAlign: "left" }}>
                    <div>Add Manually</div>
                    <div style={{ fontSize: 11, color: "#AAA" }}>Name, city, done</div>
                  </div>
                </button>
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 24 }}>
                <button onClick={loadDemoData} style={{ padding: "8px 18px", borderRadius: 99, border: "1px solid #E8541A", background: "rgba(232,84,26,0.08)", color: "#E8541A", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Load demo data ?</button>
                <button onClick={() => importInputRef.current?.click()} style={{ padding: "8px 18px", borderRadius: 99, border: "1px solid #E0DDD7", background: "transparent", color: "#888", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>Import saved session</button>
                <input ref={importInputRef} type="file" accept=".json" style={{ display: "none" }} onChange={handleImport} />
              </div>

              <div style={{ marginTop: 28, padding: "12px 16px", borderRadius: 10, background: "#EDE9E0", border: "1px solid #E0DDD7" }}>
                <div style={{ fontSize: 12, color: "#888", lineHeight: 1.6 }}>
                  <span style={{ color: "#E8541A", fontWeight: 600 }}>Privacy-first.</span> All data stays in your browser. No accounts, no cookies, no servers. Export JSON to save.
                </div>
              </div>

              {hasRealContacts && (
                <button onClick={() => setView("map")}
                  style={{
                    marginTop: 20, width: "100%", padding: "14px", borderRadius: 10, border: "none",
                    background: "#E8541A", color: "white", fontSize: 16, fontWeight: 700, cursor: "pointer",
                  }}
                >
                  Open full map ? {geoContacts.length} contacts in {Object.keys(cityGroups).length} cities
                </button>
              )}
            </div>
            {/* Right column: preview map */}
            <div style={{ flex: "1 1 480px", minWidth: 320 }}>
              <div
                ref={svgPreviewRef}
                style={{
                  position: "relative", borderRadius: 16, overflow: "hidden",
                  border: "1px solid #E0DDD7", background: "#E8EAE0",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}>
                {/* Label */}
                {!hasRealContacts && (
                  <div style={{
                    position: "absolute", top: 14, left: 14, zIndex: 5,
                    padding: "5px 12px", borderRadius: 6,
                    background: "rgba(247,245,240,0.9)",
                    border: "1px solid #E0DDD7",
                    fontSize: 11, color: "#AAA", fontWeight: 500,
                  }}>
                    Preview - upload contacts to populate
                  </div>
                )}
                {hasRealContacts && (
                  <div style={{
                    position: "absolute", top: 14, left: 14, zIndex: 5,
                    padding: "5px 12px", borderRadius: 6,
                    background: "rgba(247,245,240,0.9)",
                    border: "1px solid #E8541A",
                    fontSize: 11, color: "#E8541A", fontWeight: 600,
                  }}>
                    {geoContacts.length} contacts � {Object.keys(cityGroups).length} cities
                  </div>
                )}

                {/* Zoom controls */}
                <div style={{ position: "absolute", bottom: 14, right: 14, zIndex: 5, display: "flex", flexDirection: "column", gap: 3 }}>
                  <button onClick={() => setPreviewZoom((z) => Math.min(16, z + 0.5))}
                    style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid #E0DDD7", background: "rgba(247,245,240,0.9)", color: "#1A1A18", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                  <button onClick={() => setPreviewZoom((z) => Math.max(1, z - 0.5))}
                    style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid #E0DDD7", background: "rgba(247,245,240,0.9)", color: "#1A1A18", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>-</button>
                  <button onClick={() => { setPreviewCenter({ lat: 35, lng: -30 }); setPreviewZoom(2.2); }}
                    style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid #E0DDD7", background: "rgba(247,245,240,0.9)", color: "#1A1A18", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>�</button>
                </div>

                <svg
                  viewBox={`0 0 ${PREVIEW_W} ${PREVIEW_H}`}
                  preserveAspectRatio="xMidYMid meet"
                  style={{ width: "100%", height: "auto", display: "block", cursor: "grab" }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    const startX = e.clientX;
                    const startY = e.clientY;
                    const startCenter = { ...previewCenter };
                    const svg = e.currentTarget;
                    const rect = svg.getBoundingClientRect();
                    const startGeo = unprojectPoint(
                      ((startX - rect.left) * PREVIEW_W) / rect.width,
                      ((startY - rect.top) * PREVIEW_H) / rect.height,
                      PREVIEW_W,
                      PREVIEW_H,
                      previewZoom,
                      startCenter
                    );
                    svg.style.cursor = "grabbing";
                    let didDrag = false;
                    let rafId = null;
                    const calcCenter = (ex, ey) => {
                      if (!startGeo) return startCenter;
                      const currentGeo = unprojectPoint(
                        ((ex - rect.left) * PREVIEW_W) / rect.width,
                        ((ey - rect.top) * PREVIEW_H) / rect.height,
                        PREVIEW_W,
                        PREVIEW_H,
                        previewZoom,
                        startCenter
                      );
                      if (!currentGeo) return startCenter;
                      return clampViewportCenter(
                        {
                          lat: startCenter.lat + (startGeo.lat - currentGeo.lat),
                          lng: startCenter.lng + (startGeo.lng - currentGeo.lng),
                        },
                        previewZoom,
                        PREVIEW_W,
                        PREVIEW_H
                      );
                    };
                    const onMove = (ev) => {
                      const dx = ev.clientX - startX;
                      const dy = ev.clientY - startY;
                      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) didDrag = true;
                      if (rafId) cancelAnimationFrame(rafId);
                      rafId = requestAnimationFrame(() => {
                        setPreviewCenter(calcCenter(ev.clientX, ev.clientY));
                      });
                    };
                    const onUp = (ev) => {
                      svg.style.cursor = "grab";
                      if (rafId) cancelAnimationFrame(rafId);
                      window.removeEventListener("mousemove", onMove);
                      window.removeEventListener("mouseup", onUp);
                      if (!didDrag) { setView("map"); return; }
                      setPreviewCenter(calcCenter(ev.clientX, ev.clientY));
                    };
                    window.addEventListener("mousemove", onMove);
                    window.addEventListener("mouseup", onUp);
                  }}
                >
                  <defs>
                  </defs>
                  <rect x={-PREVIEW_W} y={-PREVIEW_H} width={PREVIEW_W * 3} height={PREVIEW_H * 3} fill="#D6DAC8" />
                  <WorldMap w={PREVIEW_W} h={PREVIEW_H} zoom={previewZoom} centerLat={previewCenter.lat} centerLng={previewCenter.lng} />

                  {/* Grid */}
                  {Array.from({ length: 13 }, (_, i) => {
                    const lat = -60 + i * 10;
                    const { y } = projectPoint(lat, 0, PREVIEW_W, PREVIEW_H, previewZoom, previewCenter);
                    return <line key={`plat${i}`} x1={0} y1={y} x2={PREVIEW_W} y2={y} stroke="#BFC5AF" strokeWidth="0.5" opacity="0.6" />;
                  })}
                  {Array.from({ length: 19 }, (_, i) => {
                    const lng = -180 + i * 20;
                    const { x } = projectPoint(0, lng, PREVIEW_W, PREVIEW_H, previewZoom, previewCenter);
                    return <line key={`plng${i}`} x1={x} y1={0} x2={x} y2={PREVIEW_H} stroke="#BFC5AF" strokeWidth="0.5" opacity="0.6" />;
                  })}

                  {/* Dots */}
                  {previewDots.map((dot, i) => {
                    const { x, y } = projectPoint(dot.lat, dot.lng, PREVIEW_W, PREVIEW_H, previewZoom, previewCenter);
                    if (x < -40 || x > PREVIEW_W + 40 || y < -40 || y > PREVIEW_H + 40) return null;
                    const r = Math.min(20, 8 + dot.count * 2);
                    const isFake = !hasRealContacts;
                    return (
                      <g key={i}
                        transform={`translate(${x} ${y})`}
                        onClick={() => {
                          if (hasRealContacts) {
                            const cityGroup = Object.values(cityGroups).find((g) => g.city === dot.city);
                            setView("map");
                            if (cityGroup) toggleCitySelection(cityGroup);
                            setMapCenter({ lat: dot.lat, lng: dot.lng });
                            setMapZoom(6);
                          }
                        }}
                        style={{ cursor: hasRealContacts ? "pointer" : "default" }}
                      >
                        {/* Pulse for real contacts */}
                        {!isFake && (
                          <circle cx={0} cy={0} r={r + 6} fill="none" stroke="#E8541A" strokeWidth="1" opacity="0">
                            <animate attributeName="r" from={r + 2} to={r + 16} dur="2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite" />
                          </circle>
                        )}
                        {/* Main dot */}
                        <circle cx={0} cy={0} r={r}
                          fill={isFake ? "#C8CFBA" : "#E8541A"}
                          opacity={isFake ? 0.7 : 0.9}
                          stroke={isFake ? "#B0B8A0" : "#C84010"}
                          strokeWidth={isFake ? 1 : 1.5}
                        />
                        {/* Count */}
                        <text x={0} y={1} textAnchor="middle" dominantBaseline="central"
                          fill={isFake ? "#888" : "white"}
                          fontSize={dot.count > 9 ? 9 : 10} fontWeight="700"
                          fontFamily="'DM Sans', sans-serif"
                        >
                          {dot.count}
                        </text>
                        {/* Label */}
                        {(previewZoom > 2.5 || !isFake) && (
                          <g style={{ opacity: isFake ? 0.5 : 1, transition: "opacity 0.6s" }}>
                            <text x={0} y={-r - 8} textAnchor="middle" dominantBaseline="central"
                              fill={isFake ? "#888" : "#1A1A18"} fontSize="10" fontWeight="600"
                              fontFamily="'DM Sans', sans-serif"
                            >
                              {dot.city}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}

                  {/* "Your contacts here" prompt when no real data */}
                  {!hasRealContacts && (
                    <g>
                      <text x={PREVIEW_W / 2} y={PREVIEW_H - 30} textAnchor="middle"
                        fill="#AAA" fontSize="13" fontFamily="'DM Sans', sans-serif" fontWeight="500"
                      >
                        Your contacts will appear here
                      </text>
                    </g>
                  )}
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Manual entry modal */}
        {showManualForm && (
          <div style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50,
          }} onClick={() => setShowManualForm(false)}>
            <div style={{
              background: "white", borderRadius: 16, padding: 32, width: "90%", maxWidth: 420,
              border: "1px solid #E0DDD7",
            }} onClick={(e) => e.stopPropagation()}>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: "#1A1A18" }}>Add contact</h3>
              {[
                { key: "name", label: "Name", required: true },
                { key: "city", label: "City", required: true },
                { key: "company", label: "Company" },
                { key: "position", label: "Position" },
                { key: "note", label: "Note" },
              ].map(({ key, label, required }) => (
                <div key={key} style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 13, color: "#888", display: "block", marginBottom: 4 }}>
                    {label}{required && " *"}
                  </label>
                  <input
                    value={manualForm[key]}
                    onChange={(e) => setManualForm({ ...manualForm, [key]: e.target.value })}
                    style={{
                      width: "100%", padding: "10px 12px", borderRadius: 8,
                      border: "1px solid #E0DDD7", background: "#F7F5F0", color: "#1A1A18",
                      fontSize: 15, outline: "none", boxSizing: "border-box",
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#E8541A"}
                    onBlur={(e) => e.target.style.borderColor = "#E0DDD7"}
                    onKeyDown={(e) => e.key === "Enter" && handleManualAdd()}
                  />
                </div>
              ))}
              <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
                <button onClick={handleManualAdd}
                  style={{ flex: 1, padding: "12px", borderRadius: 8, border: "none", background: "#E8541A", color: "white", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                  Add to map
                </button>
                <button onClick={() => setShowManualForm(false)}
                  style={{ padding: "12px 20px", borderRadius: 8, border: "1px solid #E0DDD7", background: "transparent", color: "#888", fontSize: 15, cursor: "pointer" }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div style={{
            position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
            padding: "12px 24px", borderRadius: 12, zIndex: 200,
            background: toast.type === "error" ? "#7f1d1d" : toast.type === "warn" ? "#78350f" : "#1A1A18",
            color: "white", fontSize: 14, fontWeight: 500,
            animation: "slideUp 0.3s ease",
          }}>
            {toast.msg}
          </div>
        )}

        <style>{`
          @keyframes slideUp {
            from { opacity: 0; transform: translateX(-50%) translateY(12px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
          }
          @keyframes fadeSlideIn {
            from { opacity: 0; transform: translateX(12px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}</style>
      </div>
    );
  }

  const W = 1200;
  const H = 700;
  const SIDEBAR_WIDTH = 340;
  const TRIP_PANEL_LEFT_INSET = 356;
  function getFullMapInsets(options = {}) {
    return {
      left: options.includeTrip !== false && showTripPlanner ? TRIP_PANEL_LEFT_INSET : 0,
      right: options.includeSidebar !== false && sidebarOpen ? SIDEBAR_WIDTH : 0,
      top: 0,
      bottom: 0,
    };
  }

  return (
    <div
      style={{
        height: "100vh",
        background: "#D6DAC8",
        color: "#1A1A18",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
      onDragOver={handleRootDragOver}
      onDragLeave={handleRootDragLeave}
      onDrop={handleDrop}
    >
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Fraunces:wght@700&display=swap" rel="stylesheet" />

      {csvDragOver && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(232,84,26,0.08)", zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "center",
          border: "3px dashed #E8541A",
        }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#E8541A" }}>Drop CSV or JSON file here</div>
        </div>
      )}

      {/* Top bar */}
      <div style={{
        padding: "12px 20px", display: "flex", alignItems: "center", gap: 16,
        background: "#F7F5F0",
        borderBottom: "1px solid #E0DDD7", zIndex: 10, flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => setView("landing")}>
          <svg width="18" height="24" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#E8541A"/>
            <circle cx="12" cy="12" r="5" fill="white"/>
            <path d="M12 24 L7 32 L12 29 L17 32 Z" fill="#E8541A"/>
          </svg>
          <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 700, fontSize: 18, color: "#1A1A18", letterSpacing: "-0.5px" }}>
            Pin<span style={{ color: "#E8541A" }}>Pal</span>
          </span>
        </div>

        {/* Search */}
        <div style={{ flex: 1, maxWidth: 360, position: "relative" }}>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search city, person, company, or tag..."
            style={{
              width: "100%", padding: "8px 12px 8px 36px", borderRadius: 8,
              border: "1px solid #E0DDD7", background: "white",
              color: "#1A1A18", fontSize: 14, outline: "none", boxSizing: "border-box",
            }}
            onFocus={(e) => e.target.style.borderColor = "#E8541A"}
            onBlur={(e) => { setTimeout(() => setSearchQuery(""), 200); e.target.style.borderColor = "#E0DDD7"; }}
          />
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#AAA" }}>?</span>
          {searchResults.length > 0 && (
            <div style={{
              position: "absolute", top: "100%", left: 0, right: 0, marginTop: 4,
              background: "white", borderRadius: 8, border: "1px solid #E0DDD7",
              maxHeight: 200, overflow: "auto", zIndex: 30,
            }}>
              {searchResults.map((g, i) => (
                <div
                  key={g.key || i}
                  onClick={() => {
                    if (g.cityGroup) {
                      flyToCity(g.cityGroup);
                    } else if (g.coords) {
                      setSelectedCity(null);
                      setSidebarOpen(false);
                      setMapCenter({ lat: g.coords.lat, lng: g.coords.lng });
                      setMapZoom(5.5);
                      setTripDraft((draft) => ({ ...draft, destination: g.title }));
                    }
                    setSearchQuery("");
                  }}
                  style={{
                    padding: "10px 14px", cursor: "pointer", display: "flex", justifyContent: "space-between",
                    borderBottom: i < searchResults.length - 1 ? "1px solid #F0EDE8" : "none",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(232,84,26,0.06)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <span style={{ fontSize: 14, color: "#1A1A18" }}>{g.title}</span>
                  <span style={{ fontSize: 12, color: "#AAA" }}>{g.subtitle}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 6 }}>
          {Object.entries(SOURCE_LABELS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilters({ ...filters, [key]: !filters[key] })}
              style={{
                padding: "6px 12px", borderRadius: 6, border: "1px solid",
                borderColor: filters[key] ? SOURCE_COLORS[key] : "#E0DDD7",
                background: filters[key] ? `${SOURCE_COLORS[key]}18` : "transparent",
                color: filters[key] ? SOURCE_COLORS[key] : "#AAA",
                fontSize: 12, fontWeight: 600, cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={() => setShowManualForm(true)} style={pillBtnStyle}>+ Add</button>
          <button onClick={() => fileInputRef.current?.click()} style={pillBtnStyle}>CSV</button>
          <button onClick={handleExport} style={pillBtnStyle}>Export</button>
          <button onClick={() => importInputRef.current?.click()} style={pillBtnStyle}>Import</button>
        </div>
        <input ref={fileInputRef} type="file" accept=".csv" style={{ display: "none" }} onChange={handleFileUpload} />
        <input ref={importInputRef} type="file" accept=".json" style={{ display: "none" }} onChange={handleImport} />
      </div>

      {/* Map + Sidebar */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden", position: "relative" }}>
        {/* SVG Map */}
        <div ref={svgMapRef} style={{ flex: 1, position: "relative", overflow: "hidden", background: "#D6DAC8" }}>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="xMidYMid meet"
            style={{ width: "100%", height: "100%", display: "block" }}
            onMouseDown={(e) => {
              const startX = e.clientX;
              const startY = e.clientY;
              const startCenter = { ...mapCenter };
              const rect = e.currentTarget.getBoundingClientRect();
              const startGeo = unprojectPoint(
                ((startX - rect.left) * W) / rect.width,
                ((startY - rect.top) * H) / rect.height,
                W,
                H,
                mapZoom,
                startCenter
              );
              let rafId = null;
              const calcCenter = (ex, ey, elastic = false) => {
                if (!startGeo) return startCenter;
                const currentGeo = unprojectPoint(
                  ((ex - rect.left) * W) / rect.width,
                  ((ey - rect.top) * H) / rect.height,
                  W,
                  H,
                  mapZoom,
                  startCenter
                );
                if (!currentGeo) return startCenter;
                const nextCenter = {
                  lat: startCenter.lat + (startGeo.lat - currentGeo.lat),
                  lng: startCenter.lng + (startGeo.lng - currentGeo.lng),
                };
                return elastic
                  ? applyElasticViewportCenter(nextCenter, mapZoom, W, H, 0.28, getFullMapInsets())
                  : clampViewportCenter(nextCenter, mapZoom, W, H, getFullMapInsets());
              };
              const onMove = (ev) => {
                if (rafId) cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(() => {
                  setMapCenter(calcCenter(ev.clientX, ev.clientY, true));
                });
              };
              const onUp = (ev) => {
                if (rafId) cancelAnimationFrame(rafId);
                window.removeEventListener("mousemove", onMove);
                window.removeEventListener("mouseup", onUp);
                setMapCenter(calcCenter(ev.clientX, ev.clientY, false));
              };
              window.addEventListener("mousemove", onMove);
              window.addEventListener("mouseup", onUp);
            }}
          >
            <defs>
              <radialGradient id="tripRadiusFill" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#E8541A" stopOpacity="0.18" />
                <stop offset="58%" stopColor="#E8541A" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#E8541A" stopOpacity="0.02" />
              </radialGradient>
            </defs>
            <rect x={-W} y={-H} width={W * 3} height={H * 3} fill="#D6DAC8" />

            {/* Continents */}
            <WorldMap w={W} h={H} zoom={mapZoom} centerLat={mapCenter.lat} centerLng={mapCenter.lng} />

            {/* Grid lines */}
            {Array.from({ length: 13 }, (_, i) => {
              const lat = -60 + i * 10;
              const { x: x1, y } = latLngToXY(lat, -180, W, H);
              const { x: x2 } = latLngToXY(lat, 180, W, H);
              return <line key={`lat${i}`} x1={0} y1={y} x2={W} y2={y} stroke="#BFC5AF" strokeWidth="0.5" opacity="0.7" />;
            })}
            {Array.from({ length: 19 }, (_, i) => {
              const lng = -180 + i * 20;
              const { x, y: y1 } = latLngToXY(80, lng, W, H);
              const { y: y2 } = latLngToXY(-60, lng, W, H);
              return <line key={`lng${i}`} x1={x} y1={0} x2={x} y2={H} stroke="#BFC5AF" strokeWidth="0.5" opacity="0.7" />;
            })}

            {activeTripPlan && (() => {
              const tripPoint = projectPoint(activeTripPlan.lat, activeTripPlan.lng, W, H, mapZoom, mapCenter);
              const { rx, ry } = getProjectedTripRadius(activeTripPlan.lat, activeTripPlan.lng, activeTripPlan.radiusKm, W, H, mapZoom, mapCenter);
              if (tripPoint.x < -160 || tripPoint.x > W + 160 || tripPoint.y < -160 || tripPoint.y > H + 160) return null;
              const haloRx = Math.max(rx, 18);
              const haloRy = Math.max(ry, 18);
              return (
                <g pointerEvents="none">
                  <ellipse
                    cx={tripPoint.x}
                    cy={tripPoint.y}
                    rx={haloRx}
                    ry={haloRy}
                    fill="url(#tripRadiusFill)"
                    stroke="#E8541A"
                    strokeWidth="1.5"
                    opacity="0.75"
                  />
                  <ellipse
                    cx={tripPoint.x}
                    cy={tripPoint.y}
                    rx={haloRx + 10}
                    ry={haloRy + 10}
                    fill="none"
                    stroke="#E8541A"
                    strokeWidth="1"
                    opacity="0.24"
                  />
                  <circle cx={tripPoint.x} cy={tripPoint.y} r={10} fill="#E8541A" stroke="white" strokeWidth="3" />
                  <circle cx={tripPoint.x} cy={tripPoint.y} r={18} fill="none" stroke="#E8541A" strokeWidth="1.5" opacity="0.45">
                    <animate attributeName="r" values="14;22;14" dur="2.1s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.42;0.12;0.42" dur="2.1s" repeatCount="indefinite" />
                  </circle>
                  <path d={`M ${tripPoint.x} ${tripPoint.y - 17} L ${tripPoint.x + 6} ${tripPoint.y - 5} L ${tripPoint.x - 6} ${tripPoint.y - 5} Z`} fill="#E8541A" opacity="0.92" />
                </g>
              );
            })()}

            {/* City markers */}
            {Object.values(cityGroups).map((group, i) => {
              const { x, y } = latLngToXY(group.lat, group.lng, W, H);
              if (x < -50 || x > W + 50 || y < -50 || y > H + 50) return null;
              const count = group.contacts.length;
              const r = Math.min(24, 10 + count * 3);
              const isSelected = selectedCity && selectedCity.city === group.city;
              const isHovered = hoveredCity === group.city;

              return (
                <g
                  key={i}
                  transform={`translate(${x} ${y})`}
                  onClick={() => toggleCitySelection(group)}
                  onMouseEnter={() => setHoveredCity(group.city)}
                  onMouseLeave={() => setHoveredCity(null)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Pulse ring */}
                  <circle cx={0} cy={0} r={r + 8} fill="none" stroke="#E8541A" strokeWidth="1" opacity={isSelected ? 0.5 : 0}>
                    {isSelected && <animate attributeName="r" from={r + 4} to={r + 20} dur="1.5s" repeatCount="indefinite" />}
                    {isSelected && <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />}
                  </circle>

                  {/* Dot */}
                  <circle
                    cx={0} cy={0} r={r}
                    fill={isSelected ? "#C84010" : "#E8541A"}
                    opacity={isSelected ? 1 : 0.85}
                    stroke="white"
                    strokeWidth={isSelected ? 2.5 : 1.5}
                  />

                  {/* Count */}
                  <text x={0} y={1} textAnchor="middle" dominantBaseline="central"
                    fill="white" fontSize={count > 9 ? 10 : 11} fontWeight="700"
                    fontFamily="'DM Sans', sans-serif"
                  >
                    {count}
                  </text>

                  {/* Label */}
                  {(isHovered || isSelected || mapZoom > 3) && (
                    <g>
                      <rect x={-group.city.length * 3.5 - 6} y={-r - 22} width={group.city.length * 7 + 12} height={18} rx={4}
                        fill="white" stroke="#E0DDD7" strokeWidth="0.5" opacity="0.95" />
                      <text x={0} y={-r - 11} textAnchor="middle" dominantBaseline="central"
                        fill="#1A1A18" fontSize="11" fontWeight="600"
                        fontFamily="'DM Sans', sans-serif"
                      >
                        {group.city}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Empty state */}
            {Object.keys(cityGroups).length === 0 && (
              <text x={W / 2} y={H / 2} textAnchor="middle" fill="#AAA" fontSize="18" fontFamily="'DM Sans', sans-serif">
                Import contacts to see them on the map
              </text>
            )}
          </svg>

          {/* Zoom controls */}
          <div style={{ position: "absolute", bottom: 20, right: 20, display: "flex", flexDirection: "column", gap: 4 }}>
            <button onClick={() => setMapZoom((z) => Math.min(20, z + 0.5))} style={zoomBtnStyle}>+</button>
            <button onClick={() => setMapZoom((z) => Math.max(1, z - 0.5))} style={zoomBtnStyle}>-</button>
            <button onClick={() => { setMapCenter({ lat: 20, lng: 15 }); setMapZoom(1.3); }} style={{ ...zoomBtnStyle, fontSize: 12 }}>�</button>
          </div>

          {!showTripPlanner && (
            <button
              onClick={() => {
                setShowTripPlanner(true);
                if (tripPlan) {
                  setSidebarMode("trip");
                  setSidebarOpen(true);
                } else {
                  setSidebarMode(null);
                  setSidebarOpen(false);
                }
                setSelectedCity(null);
              }}
              style={{
                ...pillBtnStyle,
                position: "absolute",
                top: 18,
                left: 18,
                zIndex: 16,
                background: sidebarMode === "trip" && sidebarOpen ? "rgba(232,84,26,0.08)" : "rgba(247,245,240,0.96)",
                borderColor: sidebarMode === "trip" && sidebarOpen ? "#E8541A" : "#E0DDD7",
                color: sidebarMode === "trip" && sidebarOpen ? "#E8541A" : "#1A1A18",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                backdropFilter: "blur(10px)",
              }}
            >
              {tripPlan ? "Trip Planner" : "Plan a Trip"}
            </button>
          )}

          {/* Stats bar */}
          <div style={{
            position: "absolute", bottom: 20, left: 20,
            padding: "8px 16px", borderRadius: 8, background: "rgba(247,245,240,0.9)",
            border: "1px solid #E0DDD7",
            fontSize: 13, color: "#888", display: "flex", gap: 16,
          }}>
            <span><strong style={{ color: "#E8541A" }}>{geoContacts.length}</strong> contacts</span>
            <span><strong style={{ color: "#E8541A" }}>{Object.keys(cityGroups).length}</strong> cities</span>
          </div>

          {showTripPlanner && (
            <div style={{
              position: "absolute", top: 18, left: 18, width: 320, maxHeight: "calc(100% - 36px)",
              overflow: "auto", background: "rgba(247,245,240,0.96)", border: "1px solid #E0DDD7",
              borderRadius: 14, boxShadow: "0 10px 30px rgba(0,0,0,0.08)", zIndex: 15, backdropFilter: "blur(10px)",
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            >
              <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid #E0DDD7", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#1A1A18" }}>Trip planner</div>
                  <div style={{ fontSize: 12, color: "#888" }}>Find people near your destination</div>
                </div>
                <button
                  onClick={() => setShowTripPlanner(false)}
                  style={{ width: 30, height: 30, borderRadius: 8, border: "1px solid #E0DDD7", background: "white", color: "#888", cursor: "pointer" }}
                >
                  �
                </button>
              </div>

              <div style={{ padding: 16, display: "grid", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, color: "#888", display: "block", marginBottom: 4 }}>Destination</label>
                  <input
                    value={tripDraft.destination}
                    onChange={(e) => setTripDraft({ ...tripDraft, destination: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleTripPlanCreate();
                      }
                    }}
                    placeholder="Barcelona, Halifax, Tokyo..."
                    style={plannerInputStyle}
                  />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <label style={{ fontSize: 12, color: "#888" }}>Radius</label>
                    <span style={{ fontSize: 12, color: "#E8541A", fontWeight: 600 }}>{tripDraft.radiusKm} km</span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="500"
                    step="25"
                    value={tripDraft.radiusKm}
                    onInput={(e) => setTripDraft({ ...tripDraft, radiusKm: Number(e.target.value) })}
                    onChange={(e) => setTripDraft({ ...tripDraft, radiusKm: Number(e.target.value) })}
                    onMouseDown={(e) => e.stopPropagation()}
                    onPointerDown={(e) => e.stopPropagation()}
                    style={{ width: "100%", cursor: "ew-resize" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "#888", display: "block", marginBottom: 4 }}>Why this trip?</label>
                  <input
                    value={tripDraft.notes}
                    onChange={(e) => setTripDraft({ ...tripDraft, notes: e.target.value })}
                    placeholder="Conference, customer visit, vacation..."
                    style={plannerInputStyle}
                  />
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={handleTripPlanCreate} style={{ ...pillBtnStyle, flex: 1, background: "#E8541A", color: "white", borderColor: "#E8541A" }}>
                    Find nearby contacts
                  </button>
                  {tripPlan && (
                    <button onClick={clearTripPlan} style={{ ...pillBtnStyle, color: "#888" }}>
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {tripPlan && (
                <div style={{ padding: "0 16px 16px" }}>
                  <div style={{ padding: "12px 14px", borderRadius: 10, background: "white", border: "1px solid #E0DDD7", marginBottom: 12 }}>
                    <div style={{ fontWeight: 700, color: "#1A1A18", marginBottom: 4 }}>{tripPlan.destination}</div>
                    <div style={{ fontSize: 12, color: "#888" }}>
                      {`${tripMatches.length} nearby contact${tripMatches.length === 1 ? "" : "s"}`}
                    </div>
                    {tripPlan.notes && (
                      <div style={{ marginTop: 6, fontSize: 12, color: "#666" }}>{tripPlan.notes}</div>
                    )}
                  </div>

                  {Object.keys(tripSummary).length > 0 && (
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                      {Object.entries(tripSummary).map(([band, count]) => (
                        <span key={band} style={{ padding: "4px 8px", borderRadius: 999, fontSize: 11, fontWeight: 600, background: "#F0EDE8", color: "#666" }}>
                          {band}: {count}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        {sidebarOpen && (
          <div style={{
            position: "absolute", top: 0, right: 0, bottom: 0,
            width: 340, background: "white", borderLeft: "1px solid #E0DDD7",
            overflow: "auto", zIndex: 20, boxShadow: "0 0 24px rgba(0,0,0,0.08)",
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          >
            {sidebarMode === "trip" && tripPlan ? (
              <>
                <div style={{
                  padding: "20px 20px 16px", borderBottom: "1px solid #E0DDD7",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: "#1A1A18" }}>{activeTripPlan.destination}</h2>
                    <span style={{ fontSize: 13, color: "#AAA" }}>
                      {`${tripMatches.length} nearby contact${tripMatches.length === 1 ? "" : "s"}`}
                    </span>
                  </div>
                  <button
                    onClick={() => { setSelectedCity(null); setSidebarMode("summary"); setSidebarOpen(true); }}
                    style={{
                      width: 32, height: 32, borderRadius: 8, border: "1px solid #E0DDD7",
                      background: "transparent", color: "#AAA", fontSize: 18,
                      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    �
                  </button>
                </div>
                <div style={{ padding: "16px 12px" }}>
                      {Object.keys(tripSummary).length > 0 && (
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", paddingBottom: 8 }}>
                          {Object.entries(tripSummary).map(([band, count]) => (
                            <span key={band} style={{ padding: "3px 8px", borderRadius: 999, fontSize: 11, fontWeight: 600, background: "#F0EDE8", color: "#666" }}>
                              {band}: {count}
                            </span>
                          ))}
                        </div>
                      )}
                      <div style={{ paddingTop: 4 }}>
                        {tripMatches.length > 0 ? tripMatches.slice(0, 12).map((contact, index) => (
                          <div key={`${contact.name}-${index}`} style={{ padding: "14px 12px", borderRadius: 10, marginBottom: 4 }} onMouseEnter={(e) => e.currentTarget.style.background = "#F7F5F0"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                              <button onClick={() => openContactProfile(contact)} style={{ width: 58, height: 58, padding: 0, borderRadius: 99, background: `${SOURCE_COLORS[contact.source]}18`, border: `1.5px solid ${SOURCE_COLORS[contact.source]}50`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: SOURCE_COLORS[contact.source], flexShrink: 0, overflow: "hidden", cursor: "pointer" }}>
                                {getAvatarSrc(contact, 128) ? (
                                  <img src={getAvatarSrc(contact, 128)} alt="" style={{ width: "100%", height: "100%", display: "block", borderRadius: 99 }} />
                                ) : (
                                  contact.name.charAt(0)
                                )}
                              </button>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <button onClick={() => openContactProfile(contact)} style={{ padding: 0, border: "none", background: "transparent", fontWeight: 600, fontSize: 14, color: "#1A1A18", cursor: "pointer", textAlign: "left" }}>{contact.name}</button>
                                <div style={{ fontSize: 12, color: "#AAA" }}>{[contact.city, contact.company].filter(Boolean).join(" � ")}</div>
                                <div style={{ fontSize: 12, color: "#E8541A", marginTop: 4 }}>{Math.round(contact.distanceKm)} km � {getDistanceBand(contact.distanceKm)}</div>
                              </div>
                              <span style={{ padding: "2px 8px", borderRadius: 4, fontSize: 10, fontWeight: 600, background: `${SOURCE_COLORS[contact.source]}15`, color: SOURCE_COLORS[contact.source], flexShrink: 0 }}>
                                {SOURCE_LABELS[contact.source]}
                              </span>
                            </div>
                            {(contact.position || (contact.tags || []).length) && (
                              <div style={{ fontSize: 12, color: "#666", marginLeft: 68 }}>
                                {[contact.position, ...(contact.tags || []).map((tag) => `#${tag}`)].filter(Boolean).join(" � ")}
                              </div>
                            )}
                          </div>
                        )) : (
                          <div style={{ padding: "14px 12px", borderRadius: 10, background: "#F7F5F0", border: "1px solid #E0DDD7", fontSize: 13, color: "#888" }}>
                            No contacts within {activeTripPlan.radiusKm} km yet. Try a bigger radius or another destination.
                          </div>
                        )}
                      </div>
                </div>
              </>
            ) : sidebarMode === "city" && selectedCity ? (
            <>
            <div style={{
              padding: "20px 20px 16px", borderBottom: "1px solid #E0DDD7",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: "#1A1A18" }}>{selectedCity.city}</h2>
                <span style={{ fontSize: 13, color: "#AAA" }}>
                  {selectedCity.contacts.length} contact{selectedCity.contacts.length > 1 ? "s" : ""}
                </span>
              </div>
              <button
                onClick={() => { setSelectedCity(null); setSidebarMode("summary"); setSidebarOpen(true); }}
                style={{
                  width: 32, height: 32, borderRadius: 8, border: "1px solid #E0DDD7",
                  background: "transparent", color: "#AAA", fontSize: 18,
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                �
              </button>
            </div>

            <div style={{ padding: "8px 12px" }}>
              {selectedCity.contacts.map((c, i) => (
                <div
                  key={i}
                  style={{
                    padding: "14px 12px", borderRadius: 10,
                    marginBottom: 4, transition: "background 0.15s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#F7F5F0"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    {/* Avatar */}
                    <button onClick={() => openContactProfile(c)} style={{
                      width: 58, height: 58, padding: 0, borderRadius: 99,
                      background: `${SOURCE_COLORS[c.source]}18`,
                      border: `1.5px solid ${SOURCE_COLORS[c.source]}50`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 16, fontWeight: 700, color: SOURCE_COLORS[c.source],
                      flexShrink: 0, overflow: "hidden", cursor: "pointer",
                    }}>
                      {getAvatarSrc(c, 128) ? (
                        <img src={getAvatarSrc(c, 128)} alt="" style={{ width: "100%", height: "100%", display: "block", borderRadius: 99 }} />
                      ) : (
                        c.name.charAt(0)
                      )}
                    </button>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <button onClick={() => openContactProfile(c)} style={{ padding: 0, border: "none", background: "transparent", fontWeight: 600, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: "#1A1A18", cursor: "pointer", textAlign: "left", maxWidth: "100%" }}>{c.name}</button>
                      {(c.position || c.company) && (
                        <div style={{ fontSize: 12, color: "#AAA", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {[c.position, c.company].filter(Boolean).join(" � ")}
                        </div>
                      )}
                    </div>
                    {/* Source badge */}
                    <span style={{
                      padding: "2px 8px", borderRadius: 4, fontSize: 10, fontWeight: 600,
                      background: `${SOURCE_COLORS[c.source]}15`, color: SOURCE_COLORS[c.source],
                      flexShrink: 0,
                    }}>
                      {SOURCE_LABELS[c.source]}
                    </span>
                  </div>
                  {c.note && (
                    <div style={{ fontSize: 12, color: "#AAA", marginLeft: 68, fontStyle: "italic" }}>
                      "{c.note}"
                    </div>
                  )}
                  {(c.tags || []).length > 0 && (
                    <div style={{ marginLeft: 68, marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {c.tags.map((tag) => (
                        <span key={tag} style={{ padding: "2px 8px", borderRadius: 999, fontSize: 11, fontWeight: 600, background: "#F0EDE8", color: "#666" }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            </>
            ) : (
              <>
                <div style={{
                  padding: "20px 20px 16px", borderBottom: "1px solid #E0DDD7",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: "#1A1A18" }}>Top hubs</h2>
                    <span style={{ fontSize: 13, color: "#AAA" }}>
                      {geoContacts.length} contacts across {Object.keys(cityGroups).length} cities
                    </span>
                  </div>
                  <button
                    onClick={() => { setSidebarOpen(false); setSidebarMode(null); }}
                    style={{
                      width: 32, height: 32, borderRadius: 8, border: "1px solid #E0DDD7",
                      background: "transparent", color: "#AAA", fontSize: 18,
                      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    �
                  </button>
                </div>
                <div style={{ padding: "16px 12px" }}>
                  <div style={{ display: "grid", gap: 8 }}>
                    {topHubs.length > 0 ? topHubs.map((hub) => (
                      <button
                        key={hub.key}
                        onClick={() => flyToCity(hub)}
                        style={{
                          padding: "14px 12px",
                          borderRadius: 10,
                          border: "1px solid #E0DDD7",
                          background: "#F7F5F0",
                          cursor: "pointer",
                          textAlign: "left",
                          color: "#1A1A18",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 700 }}>{hub.city}</div>
                            <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>
                              {hub.contacts.length} contact{hub.contacts.length === 1 ? "" : "s"}
                            </div>
                          </div>
                          <div style={{
                            minWidth: 32,
                            height: 32,
                            padding: "0 10px",
                            borderRadius: 999,
                            background: "#E8541A",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 13,
                            fontWeight: 700,
                          }}>
                            {hub.contacts.length}
                          </div>
                        </div>
                        <div style={{ fontSize: 12, color: "#666", marginTop: 8 }}>
                          {hub.contacts.slice(0, 3).map((contact) => contact.name).join(" � ")}
                        </div>
                      </button>
                    )) : (
                      <div style={{ padding: "14px 12px", borderRadius: 10, background: "#F7F5F0", border: "1px solid #E0DDD7", fontSize: 13, color: "#888" }}>
                        Import contacts to see your strongest cities here.
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Manual form modal */}
      {selectedContactProfile && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.28)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 70,
          backdropFilter: "blur(4px)",
        }} onClick={() => setSelectedContactProfile(null)}>
          <div style={{
            width: "min(92vw, 460px)",
            background: "white",
            borderRadius: 20,
            border: "1px solid #E0DDD7",
            boxShadow: "0 24px 64px rgba(0,0,0,0.14)",
            overflow: "hidden",
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: "22px 22px 18px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, borderBottom: "1px solid #E0DDD7" }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center", minWidth: 0 }}>
                <div style={{ width: 88, height: 88, borderRadius: 999, overflow: "hidden", flexShrink: 0, background: `${SOURCE_COLORS[selectedContactProfile.source]}18`, border: `1.5px solid ${SOURCE_COLORS[selectedContactProfile.source]}50`, display: "flex", alignItems: "center", justifyContent: "center", color: SOURCE_COLORS[selectedContactProfile.source], fontSize: 28, fontWeight: 700 }}>
                  {getAvatarSrc(selectedContactProfile, 192) ? (
                    <img src={getAvatarSrc(selectedContactProfile, 192)} alt="" style={{ width: "100%", height: "100%", display: "block" }} />
                  ) : (
                    selectedContactProfile.name.charAt(0)
                  )}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: "#1A1A18", lineHeight: 1.1 }}>{selectedContactProfile.name}</div>
                  <div style={{ fontSize: 14, color: "#666", marginTop: 6 }}>{[selectedContactProfile.position, selectedContactProfile.company].filter(Boolean).join(" � ") || selectedContactProfile.city}</div>
                  {selectedContactProfile.city && <div style={{ fontSize: 13, color: "#AAA", marginTop: 4 }}>{selectedContactProfile.city}</div>}
                </div>
              </div>
              <button
                onClick={() => setSelectedContactProfile(null)}
                style={{ width: 34, height: 34, borderRadius: 10, border: "1px solid #E0DDD7", background: "transparent", color: "#AAA", fontSize: 18, cursor: "pointer", flexShrink: 0 }}
              >
                �
              </button>
            </div>
            <div style={{ padding: 22, display: "grid", gap: 14 }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{ padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700, background: `${SOURCE_COLORS[selectedContactProfile.source]}15`, color: SOURCE_COLORS[selectedContactProfile.source] }}>
                  {SOURCE_LABELS[selectedContactProfile.source]}
                </span>
                {(selectedContactProfile.tags || []).map((tag) => (
                  <span key={tag} style={{ padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700, background: "#F0EDE8", color: "#666" }}>
                    #{tag}
                  </span>
                ))}
              </div>
              {selectedContactProfile.note && (
                <div style={{ padding: "14px 16px", borderRadius: 14, background: "#F7F5F0", border: "1px solid #E0DDD7", fontSize: 14, color: "#555", lineHeight: 1.5 }}>
                  {selectedContactProfile.note}
                </div>
              )}
              <div style={{ display: "grid", gap: 10 }}>
                {selectedContactProfile.company && <div style={{ fontSize: 14, color: "#1A1A18" }}><strong>Company:</strong> {selectedContactProfile.company}</div>}
                {selectedContactProfile.position && <div style={{ fontSize: 14, color: "#1A1A18" }}><strong>Role:</strong> {selectedContactProfile.position}</div>}
                {selectedContactProfile.city && <div style={{ fontSize: 14, color: "#1A1A18" }}><strong>City:</strong> {selectedContactProfile.city}</div>}
              </div>
              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                {selectedContactProfile.url && (
                  <a
                    href={selectedContactProfile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #E0DDD7", background: "white", color: "#1A1A18", fontSize: 14, fontWeight: 600, textDecoration: "none" }}
                  >
                    Open link
                  </a>
                )}
                <button
                  onClick={() => setSelectedContactProfile(null)}
                  style={{ padding: "10px 14px", borderRadius: 10, border: "none", background: "#E8541A", color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manual form modal */}
      {showManualForm && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50,
        }} onClick={() => setShowManualForm(false)}>
          <div style={{
            background: "white", borderRadius: 16, padding: 32, width: "90%", maxWidth: 420,
            border: "1px solid #E0DDD7",
          }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: "#1A1A18" }}>Add contact</h3>
            {[
              { key: "name", label: "Name", required: true },
              { key: "city", label: "City", required: true },
              { key: "company", label: "Company" },
              { key: "position", label: "Position" },
              { key: "note", label: "Note" },
              { key: "tags", label: "Tags" },
            ].map(({ key, label, required }) => (
              <div key={key} style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 13, color: "#888", display: "block", marginBottom: 4 }}>
                  {label}{required && " *"}
                </label>
                <input
                  value={manualForm[key]}
                  onChange={(e) => setManualForm({ ...manualForm, [key]: e.target.value })}
                  style={{
                    width: "100%", padding: "10px 12px", borderRadius: 8,
                    border: "1px solid #E0DDD7", background: "#F7F5F0", color: "#1A1A18",
                    fontSize: 15, outline: "none", boxSizing: "border-box",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#E8541A"}
                  onBlur={(e) => e.target.style.borderColor = "#E0DDD7"}
                  onKeyDown={(e) => e.key === "Enter" && handleManualAdd()}
                />
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
              <button
                onClick={handleManualAdd}
                style={{
                  flex: 1, padding: "12px", borderRadius: 8, border: "none",
                  background: "#E8541A", color: "white",
                  fontSize: 15, fontWeight: 600, cursor: "pointer",
                }}
              >
                Add to map
              </button>
              <button
                onClick={() => setShowManualForm(false)}
                style={{
                  padding: "12px 20px", borderRadius: 8, border: "1px solid #E0DDD7",
                  background: "transparent", color: "#888", fontSize: 15, cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
            </div>
        </div>
      )}
      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
          padding: "12px 24px", borderRadius: 12, zIndex: 200,
          background: toast.type === "error" ? "#7f1d1d" : toast.type === "warn" ? "#78350f" : "#1A1A18",
          color: "white", fontSize: 14, fontWeight: 500,
          animation: "slideUp 0.3s ease",
        }}>
          {toast.msg}
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(12px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}

const pillBtnStyle = {
  padding: "6px 14px",
  borderRadius: 6,
  border: "1px solid #E0DDD7",
  background: "white",
  color: "#666",
  fontSize: 12,
  fontWeight: 500,
  cursor: "pointer",
  whiteSpace: "nowrap",
};

const zoomBtnStyle = {
  width: 36,
  height: 36,
  borderRadius: 8,
  border: "1px solid #E0DDD7",
  background: "rgba(247,245,240,0.9)",
  color: "#1A1A18",
  fontSize: 18,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}; // end zoomBtnStyle

const plannerInputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #E0DDD7",
  background: "white",
  color: "#1A1A18",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
};

ReactDOM.createRoot(document.getElementById("root")).render(<PinPal />);











const { useState, useEffect, useRef, useCallback, useMemo } = React;

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
  "wolfville": { lat: 45.0918, lng: -64.3672 },
  "antigonish": { lat: 45.6188, lng: -61.9986 },
  "truro": { lat: 45.3656, lng: -63.2654 },
  "sydney nova scotia": { lat: 46.1368, lng: -60.1942 },
  "sydney ns": { lat: 46.1368, lng: -60.1942 },
  "sydney, ns": { lat: 46.1368, lng: -60.1942 },
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
  "frankfurt": { lat: 50.1109, lng: 8.6821 },
  "dusseldorf": { lat: 51.2277, lng: 6.7735 },
  "aberdeen": { lat: 57.1497, lng: -2.0943 },
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
  "shenzhen": { lat: 22.5431, lng: 114.0579 },
  "guangzhou": { lat: 23.1291, lng: 113.2644 },
  "bangkok": { lat: 13.7563, lng: 100.5018 },
  "mumbai": { lat: 19.076, lng: 72.8777 },
  "delhi": { lat: 28.7041, lng: 77.1025 },
  "new delhi": { lat: 28.6139, lng: 77.209 },
  "bangalore": { lat: 12.9716, lng: 77.5946 },
  "sydney": { lat: -33.8688, lng: 151.2093 },
  "melbourne": { lat: -37.8136, lng: 144.9631 },
  "brisbane": { lat: -27.4698, lng: 153.0251 },
  "perth": { lat: -31.9505, lng: 115.8605 },
  "auckland": { lat: -36.8485, lng: 174.7633 },
  "wellington": { lat: -41.2866, lng: 174.7756 },
  "dubai": { lat: 25.2048, lng: 55.2708 },
  "abu dhabi": { lat: 24.4539, lng: 54.3773 },
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
  const headerRowIndex = rows.findIndex((row) => {
    const lowered = row.map((cell) => String(cell || "").trim().toLowerCase());
    return (
      lowered.some((cell) => cell === "first name" || (cell.includes("first") && cell.includes("name"))) &&
      lowered.some((cell) => cell === "last name" || (cell.includes("last") && cell.includes("name")))
    );
  });
  if (headerRowIndex < 0) return contacts;

  const header = rows[headerRowIndex].map((h) => h.trim().toLowerCase());
  const fnIdx = header.findIndex((h) => h.includes("first") && h.includes("name"));
  const lnIdx = header.findIndex((h) => h.includes("last") && h.includes("name"));
  const compIdx = header.findIndex((h) => h === "company" || h.includes("company"));
  const posIdx = header.findIndex((h) => h === "position" || h.includes("position") || h.includes("title"));
  const urlIdx = header.findIndex((h) => h.includes("url") || h.includes("profile"));
  const connectedOnIdx = header.findIndex((h) => h.includes("connected") && h.includes("on"));
  // LinkedIn CSVs sometimes don't have city — check for it
  const cityIdx = header.findIndex((h) => h.includes("city") || h.includes("location"));

  for (let i = headerRowIndex + 1; i < rows.length; i++) {
    const row = rows[i];
    const firstName = (fnIdx >= 0 ? row[fnIdx] : "").trim();
    const lastName = (lnIdx >= 0 ? row[lnIdx] : "").trim();
    const name = `${firstName} ${lastName}`.trim();
    if (!name) continue;
    const company = compIdx >= 0 ? (row[compIdx] || "").trim() : "";
    const position = posIdx >= 0 ? (row[posIdx] || "").trim() : "";
    const url = urlIdx >= 0 ? (row[urlIdx] || "").trim() : "";
    const connectedOn = connectedOnIdx >= 0 ? (row[connectedOnIdx] || "").trim() : "";
    let city = cityIdx >= 0 ? (row[cityIdx] || "").trim() : "";
    // LinkedIn location is often "City, Country" or "Greater City Area"
    if (city) {
      city = city.replace(/greater\s+/i, "").replace(/\s+area$/i, "").split(",")[0].trim();
    }
    contacts.push({ name, city, company, position, url, connectedOn, source: "linkedin" });
  }
  return contacts;
}

function detectCsvSource(text) {
  const rows = parseCSV(text);
  if (!rows.length) return null;
  for (const row of rows) {
    const header = row.map((cell) => normalizeLooseText(cell));
    if (header.some((cell) => cell.includes("connected") && cell.includes("on"))) return "linkedin";
    if (header.some((cell) => cell.includes("group membership")) || header.some((cell) => cell.includes("e-mail 1 - value"))) return "google";
    if (header.some((cell) => cell.includes("business city")) || header.some((cell) => cell.includes("home city")) || header.some((cell) => cell.includes("other city"))) return "outlook";
  }
  return null;
}

function collectResolvedCityCandidates(values) {
  const seen = new Set();
  return values
    .map((value) => resolveKnownCity(value))
    .filter(Boolean)
    .map((resolved) => resolved.city)
    .filter((city) => {
      const key = normalizeCityKey(city);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function parseOutlookCSV(text) {
  const contacts = [];
  const rows = parseCSV(text);
  if (rows.length === 0) return contacts;
  const headerRowIndex = rows.findIndex((row) => row.some((cell) => normalizeLooseText(cell).includes("business city")) || row.some((cell) => normalizeLooseText(cell) === "e-mail address"));
  if (headerRowIndex < 0) return contacts;
  const header = rows[headerRowIndex].map((h) => normalizeLooseText(h));
  const firstNameIdx = header.findIndex((h) => h === "first name");
  const lastNameIdx = header.findIndex((h) => h === "last name");
  const nameIdx = header.findIndex((h) => h === "name" || h === "full name" || h === "display name");
  const companyIdx = header.findIndex((h) => h === "company" || h.includes("company"));
  const titleIdx = header.findIndex((h) => h === "job title" || h.includes("title"));
  const emailIdx = header.findIndex((h) => h === "e-mail address" || h === "email address" || h === "email");
  const noteIdx = header.findIndex((h) => h === "notes" || h.includes("notes"));
  const cityIndexes = header
    .map((value, index) => ({ value, index }))
    .filter(({ value }) => value === "business city" || value === "home city" || value === "other city")
    .map(({ index }) => index);

  for (let i = headerRowIndex + 1; i < rows.length; i++) {
    const row = rows[i];
    const explicitName = nameIdx >= 0 ? String(row[nameIdx] || "").trim() : "";
    const firstName = firstNameIdx >= 0 ? String(row[firstNameIdx] || "").trim() : "";
    const lastName = lastNameIdx >= 0 ? String(row[lastNameIdx] || "").trim() : "";
    const name = explicitName || `${firstName} ${lastName}`.trim();
    if (!name) continue;

    const cityCandidates = collectResolvedCityCandidates(cityIndexes.map((index) => row[index]));
    const city = cityCandidates[0] || "";

    contacts.push({
      name,
      city,
      company: companyIdx >= 0 ? String(row[companyIdx] || "").trim() : "",
      position: titleIdx >= 0 ? String(row[titleIdx] || "").trim() : "",
      email: emailIdx >= 0 ? String(row[emailIdx] || "").trim() : "",
      note: noteIdx >= 0 ? String(row[noteIdx] || "").trim() : "",
      guessCandidates: cityCandidates.slice(city ? 1 : 0, 3),
      source: "outlook",
    });
  }

  return contacts;
}

function parseGoogleContactsCSV(text) {
  const contacts = [];
  const rows = parseCSV(text);
  if (rows.length === 0) return contacts;
  const headerRowIndex = rows.findIndex((row) => row.some((cell) => normalizeLooseText(cell) === "group membership") || row.some((cell) => normalizeLooseText(cell) === "e-mail 1 - value"));
  if (headerRowIndex < 0) return contacts;
  const header = rows[headerRowIndex].map((h) => normalizeLooseText(h));
  const nameIdx = header.findIndex((h) => h === "name");
  const givenNameIdx = header.findIndex((h) => h === "given name");
  const familyNameIdx = header.findIndex((h) => h === "family name");
  const emailIdx = header.findIndex((h) => h === "e-mail 1 - value" || h === "email 1 - value");
  const companyIdx = header.findIndex((h) => h === "organization 1 - name");
  const titleIdx = header.findIndex((h) => h === "organization 1 - title");
  const notesIdx = header.findIndex((h) => h === "notes");
  const groupsIdx = header.findIndex((h) => h === "group membership");
  const cityIndexes = header
    .map((value, index) => ({ value, index }))
    .filter(({ value }) => value.includes("address") && value.endsWith("- city"))
    .map(({ index }) => index);

  for (let i = headerRowIndex + 1; i < rows.length; i++) {
    const row = rows[i];
    const explicitName = nameIdx >= 0 ? String(row[nameIdx] || "").trim() : "";
    const givenName = givenNameIdx >= 0 ? String(row[givenNameIdx] || "").trim() : "";
    const familyName = familyNameIdx >= 0 ? String(row[familyNameIdx] || "").trim() : "";
    const name = explicitName || `${givenName} ${familyName}`.trim();
    if (!name) continue;

    const cityCandidates = collectResolvedCityCandidates(cityIndexes.map((index) => row[index]));
    const city = cityCandidates[0] || "";
    const groups = groupsIdx >= 0
      ? String(row[groupsIdx] || "")
          .split(" ::: ")
          .map((group) => group.trim())
          .filter((group) => group && group !== "* myContacts")
      : [];

    contacts.push({
      name,
      city,
      company: companyIdx >= 0 ? String(row[companyIdx] || "").trim() : "",
      position: titleIdx >= 0 ? String(row[titleIdx] || "").trim() : "",
      email: emailIdx >= 0 ? String(row[emailIdx] || "").trim() : "",
      note: notesIdx >= 0 ? String(row[notesIdx] || "").trim() : "",
      tags: groups,
      guessCandidates: cityCandidates.slice(city ? 1 : 0, 3),
      source: "google",
    });
  }

  return contacts;
}

function createLinkedInImportSession(parsedContacts, existingContacts) {
  return createImportSession("linkedin", parsedContacts, existingContacts);
}

function createImportSession(source, parsedContacts, existingContacts) {
  const { unique, duplicateCount, invalidCount } = dedupeImportedContacts(parsedContacts, existingContacts, source);
  const explicitEvidenceContacts = unique
    .map((contact) => {
      const explicitCity = resolveKnownCity(contact.city);
      return explicitCity ? { ...contact, ...explicitCity } : null;
    })
    .filter(Boolean);
  const firstPassEvidenceTable = buildCompanyEvidence([...existingContacts, ...explicitEvidenceContacts]);
  const firstPassResults = unique.map((contact) => guessImportedContactCity(contact, firstPassEvidenceTable));
  const seededEvidenceContacts = firstPassResults
    .filter((result) => result.status === "guessed" && result.contact.city && typeof result.contact.lat === "number" && typeof result.contact.lng === "number")
    .map((result) => result.contact);
  const evidenceTable = buildCompanyEvidence([...existingContacts, ...explicitEvidenceContacts, ...seededEvidenceContacts]);
  const sessionId = `${source}-${Date.now()}`;
  const items = unique.map((contact, index) => {
    const guessed = guessImportedContactCity(contact, evidenceTable);
    return {
      id: `${sessionId}-${index}`,
      status: guessed.status,
      contact: guessed.contact,
      selected: false,
      reviewed: guessed.status !== "guessed",
    };
  });

  return {
    id: sessionId,
    source,
    items,
    duplicateCount,
    invalidCount,
  };
}

const SOURCE_COLORS = {
  google: "#4285F4",
  linkedin: "#0A66C2",
  outlook: "#0078D4",
  manual: "#E8541A",
};

const SOURCE_LABELS = {
  google: "Google",
  linkedin: "LinkedIn",
  outlook: "Outlook",
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
const LINKEDIN_GENERIC_COMPANIES = new Set([
  "",
  "self employed",
  "self-employed",
  "consultant",
  "independent consultant",
  "independent",
  "freelance",
  "freelancer",
  "stealth",
  "stealth startup",
  "confidential",
  "government of canada",
  "deloitte",
  "kpmg",
  "ey",
  "rbc",
  "cibc capital markets",
]);
const LINKEDIN_EXACT_COMPANY_CITY_HINTS = new Map([
  ["dalhousie university", { city: "Halifax", confidence: "high", reason: "Global seed map strongly associates this organization with Halifax" }],
  ["saint marys university", { city: "Halifax", confidence: "high", reason: "Global seed map strongly associates this organization with Halifax" }],
  ["net zero atlantic", { city: "Halifax", confidence: "high", reason: "Global seed map strongly associates this organization with Halifax" }],
  ["halifax water", { city: "Halifax", confidence: "high", reason: "Global seed map strongly associates this organization with Halifax" }],
  ["nova scotia power", { city: "Halifax", confidence: "high", reason: "Global seed map strongly associates this organization with Halifax" }],
  ["invest nova scotia", { city: "Halifax", confidence: "high", reason: "Global seed map strongly associates this organization with Halifax" }],
  ["build nova scotia", { city: "Halifax", confidence: "high", reason: "Global seed map strongly associates this organization with Halifax" }],
  ["everwind", { city: "Halifax", confidence: "medium", reason: "Global seed map defaults this company to Halifax" }],
  ["everwind fuels", { city: "Halifax", confidence: "medium", reason: "Global seed map defaults this company to Halifax" }],
  ["strum consulting", { city: "Halifax", confidence: "medium", reason: "Global seed map defaults this company to Halifax" }],
  ["mcinnes cooper", { city: "Halifax", confidence: "medium", reason: "Global seed map defaults this company to Halifax" }],
  ["membertou development", { city: "Sydney Nova Scotia", confidence: "high", reason: "Global seed map strongly associates this organization with Sydney, Nova Scotia" }],
  ["membertou development corporation", { city: "Sydney Nova Scotia", confidence: "high", reason: "Global seed map strongly associates this organization with Sydney, Nova Scotia" }],
  ["natural resources canada nrcan", { city: "Ottawa", confidence: "high", reason: "Global seed map strongly associates this institution with Ottawa" }],
  ["natural resources canada ressources naturelles canada", { city: "Ottawa", confidence: "high", reason: "Global seed map strongly associates this institution with Ottawa" }],
  ["global affairs canada affaires mondiales canada", { city: "Ottawa", confidence: "high", reason: "Global seed map strongly associates this institution with Ottawa" }],
  ["export development canada", { city: "Ottawa", confidence: "high", reason: "Global seed map strongly associates this institution with Ottawa" }],
  ["government of nova scotia", { city: "Halifax", confidence: "high", reason: "Global seed map strongly associates this institution with Halifax" }],
  ["province of nova scotia", { city: "Halifax", confidence: "high", reason: "Global seed map strongly associates this institution with Halifax" }],
  ["seaspan corporation", { city: "Vancouver", confidence: "high", reason: "Global seed map strongly associates this company with Vancouver" }],
  ["vancouver coastal health", { city: "Vancouver", confidence: "high", reason: "Global seed map strongly associates this institution with Vancouver" }],
  ["provincial health services authority", { city: "Vancouver", confidence: "high", reason: "Global seed map strongly associates this institution with Vancouver" }],
  ["simon fraser university", { city: "Vancouver", confidence: "high", reason: "Global seed map strongly associates this institution with Vancouver" }],
  ["the university of british columbia", { city: "Vancouver", confidence: "high", reason: "Global seed map strongly associates this institution with Vancouver" }],
  ["ubc", { city: "Vancouver", confidence: "high", reason: "Global seed map strongly associates this institution with Vancouver" }],
  ["atlas", { city: "Vancouver", confidence: "medium", reason: "Global seed map defaults this company to Vancouver" }],
  ["atlas corp", { city: "Vancouver", confidence: "medium", reason: "Global seed map defaults this company to Vancouver" }],
  ["lululemon", { city: "Vancouver", confidence: "high", reason: "Global seed map strongly associates this company with Vancouver" }],
  ["university of victoria", { city: "Victoria", confidence: "high", reason: "Global seed map strongly associates this institution with Victoria" }],
  ["imperial oil", { city: "Calgary", confidence: "medium", reason: "Global seed map defaults this company to Calgary" }],
  ["compass energy consulting", { city: "Calgary", confidence: "medium", reason: "Global seed map defaults this company to Calgary" }],
  ["rbc capital markets", { city: "Toronto", confidence: "medium", reason: "Global seed map defaults this company to Toronto" }],
  ["rbc", { city: "Toronto", confidence: "medium", reason: "Global seed map defaults this company to Toronto" }],
  ["cibc capital markets", { city: "Toronto", confidence: "medium", reason: "Global seed map defaults this company to Toronto" }],
  ["cibc", { city: "Toronto", confidence: "medium", reason: "Global seed map defaults this company to Toronto" }],
  ["bmo capital markets", { city: "Toronto", confidence: "medium", reason: "Global seed map defaults this company to Toronto" }],
  ["bmo", { city: "Toronto", confidence: "medium", reason: "Global seed map defaults this company to Toronto" }],
  ["scotiabank", { city: "Toronto", confidence: "medium", reason: "Global seed map defaults this company to Toronto" }],
  ["td", { city: "Toronto", confidence: "medium", reason: "Global seed map defaults this company to Toronto" }],
  ["td securities", { city: "Toronto", confidence: "medium", reason: "Global seed map defaults this company to Toronto" }],
  ["cpp investments", { city: "Toronto", confidence: "medium", reason: "Global seed map defaults this company to Toronto" }],
  ["brookfield asset management", { city: "Toronto", confidence: "medium", reason: "Global seed map defaults this company to Toronto" }],
  ["brookfield", { city: "Toronto", confidence: "medium", reason: "Global seed map defaults this company to Toronto" }],
  ["omers", { city: "Toronto", confidence: "medium", reason: "Global seed map defaults this institution to Toronto" }],
  ["teachers", { city: "Toronto", confidence: "medium", reason: "Global seed map defaults this institution to Toronto" }],
  ["tmx group", { city: "Toronto", confidence: "medium", reason: "Global seed map defaults this institution to Toronto" }],
  ["national bank financial", { city: "Montreal", confidence: "medium", reason: "Global seed map defaults this company to Montreal" }],
  ["goldman sachs", { city: "New York", confidence: "medium", reason: "Global seed map defaults this company to New York" }],
  ["morgan stanley", { city: "New York", confidence: "medium", reason: "Global seed map defaults this company to New York" }],
  ["j p morgan", { city: "New York", confidence: "medium", reason: "Global seed map defaults this company to New York" }],
  ["jpmorganchase", { city: "New York", confidence: "medium", reason: "Global seed map defaults this company to New York" }],
  ["citi", { city: "New York", confidence: "medium", reason: "Global seed map defaults this company to New York" }],
  ["bank of america", { city: "New York", confidence: "medium", reason: "Global seed map defaults this company to New York" }],
  ["blackrock", { city: "New York", confidence: "medium", reason: "Global seed map defaults this company to New York" }],
  ["blackstone", { city: "New York", confidence: "medium", reason: "Global seed map defaults this company to New York" }],
  ["apollo global management", { city: "New York", confidence: "medium", reason: "Global seed map defaults this company to New York" }],
  ["kkr", { city: "New York", confidence: "medium", reason: "Global seed map defaults this company to New York" }],
  ["evercore", { city: "New York", confidence: "medium", reason: "Global seed map defaults this company to New York" }],
  ["lazard", { city: "New York", confidence: "medium", reason: "Global seed map defaults this company to New York" }],
  ["jefferies", { city: "New York", confidence: "medium", reason: "Global seed map defaults this company to New York" }],
  ["hsbc", { city: "London", confidence: "medium", reason: "Global seed map defaults this company to London" }],
  ["barclays", { city: "London", confidence: "medium", reason: "Global seed map defaults this company to London" }],
  ["lloyds banking group", { city: "London", confidence: "medium", reason: "Global seed map defaults this company to London" }],
  ["standard chartered", { city: "London", confidence: "medium", reason: "Global seed map defaults this company to London" }],
  ["bp", { city: "London", confidence: "medium", reason: "Global seed map defaults this company to London" }],
  ["wood mackenzie", { city: "London", confidence: "medium", reason: "Global seed map defaults this company to London" }],
  ["res", { city: "London", confidence: "medium", reason: "Global seed map defaults this company to London" }],
  ["shell", { city: "London", confidence: "medium", reason: "Global seed map defaults this company to London" }],
  ["octopus energy", { city: "London", confidence: "medium", reason: "Global seed map defaults this company to London" }],
  ["national grid", { city: "London", confidence: "medium", reason: "Global seed map defaults this company to London" }],
  ["london stock exchange group", { city: "London", confidence: "medium", reason: "Global seed map defaults this institution to London" }],
  ["deutsche bank", { city: "Frankfurt", confidence: "medium", reason: "Global seed map defaults this company to Frankfurt" }],
  ["commerzbank", { city: "Frankfurt", confidence: "medium", reason: "Global seed map defaults this company to Frankfurt" }],
  ["siemens", { city: "Munich", confidence: "medium", reason: "Global seed map defaults this company to Munich" }],
  ["siemens energy", { city: "Munich", confidence: "medium", reason: "Global seed map defaults this company to Munich" }],
  ["allianz", { city: "Munich", confidence: "medium", reason: "Global seed map defaults this company to Munich" }],
  ["uniper", { city: "Dusseldorf", confidence: "medium", reason: "Global seed map defaults this company to Dusseldorf" }],
  ["bnp paribas", { city: "Paris", confidence: "medium", reason: "Global seed map defaults this company to Paris" }],
  ["societe generale", { city: "Paris", confidence: "medium", reason: "Global seed map defaults this company to Paris" }],
  ["axa", { city: "Paris", confidence: "medium", reason: "Global seed map defaults this company to Paris" }],
  ["totalenergies", { city: "Paris", confidence: "medium", reason: "Global seed map defaults this company to Paris" }],
  ["ing", { city: "Amsterdam", confidence: "medium", reason: "Global seed map defaults this company to Amsterdam" }],
  ["abn amro", { city: "Amsterdam", confidence: "medium", reason: "Global seed map defaults this company to Amsterdam" }],
  ["adyen", { city: "Amsterdam", confidence: "medium", reason: "Global seed map defaults this company to Amsterdam" }],
  ["ubs", { city: "Zurich", confidence: "medium", reason: "Global seed map defaults this company to Zurich" }],
  ["credit suisse", { city: "Zurich", confidence: "medium", reason: "Global seed map defaults this company to Zurich" }],
  ["equinor", { city: "Oslo", confidence: "medium", reason: "Global seed map defaults this company to Oslo" }],
  ["aker solutions", { city: "Oslo", confidence: "medium", reason: "Global seed map defaults this company to Oslo" }],
  ["maersk", { city: "Copenhagen", confidence: "medium", reason: "Global seed map defaults this company to Copenhagen" }],
  ["dbs bank", { city: "Singapore", confidence: "medium", reason: "Global seed map defaults this company to Singapore" }],
  ["ocbc bank", { city: "Singapore", confidence: "medium", reason: "Global seed map defaults this company to Singapore" }],
  ["uob", { city: "Singapore", confidence: "medium", reason: "Global seed map defaults this company to Singapore" }],
  ["gic", { city: "Singapore", confidence: "medium", reason: "Global seed map defaults this institution to Singapore" }],
  ["temasek", { city: "Singapore", confidence: "medium", reason: "Global seed map defaults this institution to Singapore" }],
  ["grab", { city: "Singapore", confidence: "medium", reason: "Global seed map defaults this company to Singapore" }],
  ["mizuho", { city: "Tokyo", confidence: "medium", reason: "Global seed map defaults this company to Tokyo" }],
  ["mizuho bank", { city: "Tokyo", confidence: "medium", reason: "Global seed map defaults this company to Tokyo" }],
  ["mitsubishi ufj", { city: "Tokyo", confidence: "medium", reason: "Global seed map defaults this company to Tokyo" }],
  ["mufg", { city: "Tokyo", confidence: "medium", reason: "Global seed map defaults this company to Tokyo" }],
  ["nomura", { city: "Tokyo", confidence: "medium", reason: "Global seed map defaults this company to Tokyo" }],
  ["softbank", { city: "Tokyo", confidence: "medium", reason: "Global seed map defaults this company to Tokyo" }],
  ["jera", { city: "Tokyo", confidence: "medium", reason: "Global seed map defaults this company to Tokyo" }],
  ["hong kong exchanges and clearing", { city: "Hong Kong", confidence: "medium", reason: "Global seed map defaults this institution to Hong Kong" }],
  ["hkex", { city: "Hong Kong", confidence: "medium", reason: "Global seed map defaults this institution to Hong Kong" }],
  ["cathay pacific", { city: "Hong Kong", confidence: "medium", reason: "Global seed map defaults this company to Hong Kong" }],
  ["clp", { city: "Hong Kong", confidence: "medium", reason: "Global seed map defaults this company to Hong Kong" }],
  ["beijing oriental yuhong waterproof technology", { city: "Beijing", confidence: "medium", reason: "Global seed map defaults this company to Beijing" }],
  ["wood", { city: "Aberdeen", confidence: "medium", reason: "Global seed map defaults this company to Aberdeen" }],
  ["shelf drilling", { city: "Dubai", confidence: "medium", reason: "Global seed map defaults this company to Dubai" }],
  ["king spalding", { city: "Atlanta", confidence: "medium", reason: "Global seed map defaults this company to Atlanta" }],
  ["microsoft", { city: "Seattle", confidence: "medium", reason: "Global seed map defaults this company to Seattle" }],
  ["amazon", { city: "Seattle", confidence: "medium", reason: "Global seed map defaults this company to Seattle" }],
  ["canadian renewable energy association canrea", { city: "Ottawa", confidence: "medium", reason: "Global seed map defaults this association to Ottawa" }],
  ["canadian hydrogen association cha", { city: "Ottawa", confidence: "medium", reason: "Global seed map defaults this association to Ottawa" }],
  ["stormfisher hydrogen", { city: "Toronto", confidence: "medium", reason: "Global seed map defaults this company to Toronto" }],
  ["aegir insights", { city: "Copenhagen", confidence: "medium", reason: "Global seed map defaults this company to Copenhagen" }],
  ["dimensional energy", { city: "Houston", confidence: "medium", reason: "Global seed map defaults this company to Houston" }],
  ["wsp in canada", { city: "Montreal", confidence: "medium", reason: "Global seed map defaults this company to Montreal" }],
  ["ilf consulting engineers in germany", { city: "Munich", confidence: "medium", reason: "Global seed map defaults this company to Munich" }],
  ["ilf consulting engineers", { city: "Munich", confidence: "medium", reason: "Global seed map defaults this company to Munich" }],
]);
const LINKEDIN_COMPANY_CITY_HINTS = [
  { pattern: /\bdalhousie\b/, city: "Halifax", confidence: "high", reason: "Organization strongly implies Halifax" },
  { pattern: /\bsaint mary'?s university\b|\bst\.?\s*mary'?s university\b/, city: "Halifax", confidence: "high", reason: "Organization strongly implies Halifax" },
  { pattern: /\bnet zero atlantic\b/, city: "Halifax", confidence: "high", reason: "Organization strongly implies Halifax" },
  { pattern: /\bhalifax water\b|\bport halifax\b|\bhalifax climate\b|\bhalifax immigration partnership\b|\bhalifax regional municipality\b/, city: "Halifax", confidence: "high", reason: "Organization strongly implies Halifax" },
  { pattern: /\bnova scotia power\b|\binvest nova scotia\b|\bnova scotia pension\b|\bbuild nova scotia\b|\bsymphony nova scotia\b|\beastward energy\b/, city: "Halifax", confidence: "high", reason: "Organization strongly implies Halifax" },
  { pattern: /\bgovernment of nova scotia\b|\bprovince of nova scotia\b|\bnova scotia department\b|\bnova scotia community college\b|\bnscc\b/, city: "Halifax", confidence: "medium", reason: "Provincial organization likely centers in Halifax" },
  { pattern: /\beverwind\b|\bstrum consulting\b|\bmcinnes cooper\b|\bvolta\b|\bacadia center\b/, city: "Halifax", confidence: "medium", reason: "Company is commonly associated with Halifax" },
  { pattern: /\bmembertou\b|\bcape breton\b/, city: "Sydney Nova Scotia", confidence: "high", reason: "Organization strongly implies Sydney, Nova Scotia" },
  { pattern: /\bacadia university\b/, city: "Wolfville", confidence: "high", reason: "Organization strongly implies Wolfville" },
  { pattern: /\bst\.?\s*francis xavier\b|\bstfx\b/, city: "Antigonish", confidence: "high", reason: "Organization strongly implies Antigonish" },
  { pattern: /\bgoldman sachs\b|\bmorgan stanley\b|\bj\.?\s*p\.?\s*morgan\b|\bjpmorganchase\b|\bciti\b|\bbank of america\b|\balphasense\b/, city: "New York", confidence: "medium", reason: "Global finance firm defaults to New York in the fallback heuristic" },
  { pattern: /\brbc\b|\brbc capital markets\b|\bcibc\b|\bcibc capital markets\b|\bbmo\b|\bbmo capital markets\b|\bscotiabank\b|\btd\b|\btd securities\b|\bcpp investments\b/, city: "Toronto", confidence: "medium", reason: "Canadian finance firm defaults to Toronto in the fallback heuristic" },
  { pattern: /\bnational bank financial\b/, city: "Montreal", confidence: "medium", reason: "Firm is commonly associated with Montreal in the fallback heuristic" },
  { pattern: /\bnatural resources canada\b|\bnrcan\b|\bglobal affairs canada\b|\bexport development canada\b|\bhouse of commons of canada\b|\bgovernment of canada\b/, city: "Ottawa", confidence: "medium", reason: "Federal institution defaults to Ottawa in the fallback heuristic" },
  { pattern: /\bcanrea\b|\bcanadian renewable energy association\b|\bcanadian hydrogen association\b/, city: "Ottawa", confidence: "medium", reason: "Canadian association defaults to Ottawa in the fallback heuristic" },
  { pattern: /\bvancouver coastal health\b|\bprovincial health services authority\b|\bsimon fraser university\b|\bthe university of british columbia\b|\bubc\b|\bseaspan\b|\batlas corp\b|\blululemon\b/, city: "Vancouver", confidence: "medium", reason: "Organization is commonly associated with Vancouver" },
  { pattern: /\buniversity of victoria\b/, city: "Victoria", confidence: "high", reason: "Organization strongly implies Victoria" },
  { pattern: /\bimperial oil\b/, city: "Calgary", confidence: "medium", reason: "Company commonly defaults to Calgary in the fallback heuristic" },
  { pattern: /\bwood\b|\bwood mackenzie\b/, city: "Aberdeen", confidence: "medium", reason: "Energy firm commonly defaults to Aberdeen in the fallback heuristic" },
  { pattern: /\bshelf drilling\b/, city: "Dubai", confidence: "medium", reason: "Company commonly defaults to Dubai in the fallback heuristic" },
  { pattern: /\bking and spalding\b|\bking\s*&\s*spalding\b/, city: "Atlanta", confidence: "medium", reason: "Firm commonly defaults to Atlanta in the fallback heuristic" },
  { pattern: /\bmicrosoft\b|\bamazon\b/, city: "Seattle", confidence: "medium", reason: "Company commonly defaults to Seattle in the fallback heuristic" },
  { pattern: /\baegir insights\b|\bmaersk\b/, city: "Copenhagen", confidence: "medium", reason: "Nordic firm commonly defaults to Copenhagen in the fallback heuristic" },
];
const LINKEDIN_CITY_TEXT_HINTS = [
  { pattern: /\bhalifax\b/, city: "Halifax", confidence: "high", reason: "Company or title explicitly mentions Halifax" },
  { pattern: /\bwolfville\b/, city: "Wolfville", confidence: "high", reason: "Company or title explicitly mentions Wolfville" },
  { pattern: /\bantigonish\b/, city: "Antigonish", confidence: "high", reason: "Company or title explicitly mentions Antigonish" },
  { pattern: /\btruro\b/, city: "Truro", confidence: "high", reason: "Company or title explicitly mentions Truro" },
  { pattern: /\bsydney\s*,?\s*ns\b|\bsydney\s+nova scotia\b/, city: "Sydney Nova Scotia", confidence: "high", reason: "Company or title explicitly mentions Sydney, Nova Scotia" },
  { pattern: /\bcape breton\b|\bmembertou\b/, city: "Sydney Nova Scotia", confidence: "high", reason: "Company or title explicitly mentions Cape Breton / Membertou" },
  { pattern: /\bsydney\b/, city: "Sydney", confidence: "high", reason: "Company or title explicitly mentions Sydney" },
  { pattern: /\bvancouver\b/, city: "Vancouver", confidence: "high", reason: "Company or title explicitly mentions Vancouver" },
  { pattern: /\btoronto\b/, city: "Toronto", confidence: "high", reason: "Company or title explicitly mentions Toronto" },
  { pattern: /\bmontreal\b/, city: "Montreal", confidence: "high", reason: "Company or title explicitly mentions Montreal" },
  { pattern: /\bcalgary\b/, city: "Calgary", confidence: "high", reason: "Company or title explicitly mentions Calgary" },
  { pattern: /\bottawa\b/, city: "Ottawa", confidence: "high", reason: "Company or title explicitly mentions Ottawa" },
  { pattern: /\bnew york\b|\bnyc\b/, city: "New York", confidence: "high", reason: "Company or title explicitly mentions New York" },
  { pattern: /\blondon\b/, city: "London", confidence: "high", reason: "Company or title explicitly mentions London" },
  { pattern: /\bdublin\b/, city: "Dublin", confidence: "high", reason: "Company or title explicitly mentions Dublin" },
  { pattern: /\bamsterdam\b/, city: "Amsterdam", confidence: "high", reason: "Company or title explicitly mentions Amsterdam" },
  { pattern: /\bparis\b/, city: "Paris", confidence: "high", reason: "Company or title explicitly mentions Paris" },
  { pattern: /\bberlin\b/, city: "Berlin", confidence: "high", reason: "Company or title explicitly mentions Berlin" },
  { pattern: /\bmunich\b|\bmuenchen\b/, city: "Munich", confidence: "high", reason: "Company or title explicitly mentions Munich" },
  { pattern: /\bfrankfurt\b/, city: "Frankfurt", confidence: "high", reason: "Company or title explicitly mentions Frankfurt" },
  { pattern: /\bzurich\b/, city: "Zurich", confidence: "high", reason: "Company or title explicitly mentions Zurich" },
  { pattern: /\bgeneva\b/, city: "Geneva", confidence: "high", reason: "Company or title explicitly mentions Geneva" },
  { pattern: /\bbrussels\b/, city: "Brussels", confidence: "high", reason: "Company or title explicitly mentions Brussels" },
  { pattern: /\bmadrid\b/, city: "Madrid", confidence: "high", reason: "Company or title explicitly mentions Madrid" },
  { pattern: /\bbarcelona\b/, city: "Barcelona", confidence: "high", reason: "Company or title explicitly mentions Barcelona" },
  { pattern: /\bmilan\b/, city: "Milan", confidence: "high", reason: "Company or title explicitly mentions Milan" },
  { pattern: /\bcopenhagen\b/, city: "Copenhagen", confidence: "high", reason: "Company or title explicitly mentions Copenhagen" },
  { pattern: /\bstockholm\b/, city: "Stockholm", confidence: "high", reason: "Company or title explicitly mentions Stockholm" },
  { pattern: /\boslo\b/, city: "Oslo", confidence: "high", reason: "Company or title explicitly mentions Oslo" },
  { pattern: /\bdubai\b/, city: "Dubai", confidence: "high", reason: "Company or title explicitly mentions Dubai" },
  { pattern: /\babu dhabi\b/, city: "Abu Dhabi", confidence: "high", reason: "Company or title explicitly mentions Abu Dhabi" },
  { pattern: /\bsingapore\b/, city: "Singapore", confidence: "high", reason: "Company or title explicitly mentions Singapore" },
  { pattern: /\bhong kong\b/, city: "Hong Kong", confidence: "high", reason: "Company or title explicitly mentions Hong Kong" },
  { pattern: /\bbeijing\b/, city: "Beijing", confidence: "high", reason: "Company or title explicitly mentions Beijing" },
  { pattern: /\bshanghai\b/, city: "Shanghai", confidence: "high", reason: "Company or title explicitly mentions Shanghai" },
  { pattern: /\bshenzhen\b/, city: "Shenzhen", confidence: "high", reason: "Company or title explicitly mentions Shenzhen" },
  { pattern: /\bguangzhou\b/, city: "Guangzhou", confidence: "high", reason: "Company or title explicitly mentions Guangzhou" },
  { pattern: /\btokyo\b/, city: "Tokyo", confidence: "high", reason: "Company or title explicitly mentions Tokyo" },
  { pattern: /\bosaka\b/, city: "Osaka", confidence: "high", reason: "Company or title explicitly mentions Osaka" },
  { pattern: /\bseoul\b/, city: "Seoul", confidence: "high", reason: "Company or title explicitly mentions Seoul" },
  { pattern: /\bmelbourne\b/, city: "Melbourne", confidence: "high", reason: "Company or title explicitly mentions Melbourne" },
  { pattern: /\bbrisbane\b/, city: "Brisbane", confidence: "high", reason: "Company or title explicitly mentions Brisbane" },
  { pattern: /\bperth\b/, city: "Perth", confidence: "high", reason: "Company or title explicitly mentions Perth" },
  { pattern: /\bauckland\b/, city: "Auckland", confidence: "high", reason: "Company or title explicitly mentions Auckland" },
  { pattern: /\bwellington\b/, city: "Wellington", confidence: "high", reason: "Company or title explicitly mentions Wellington" },
  { pattern: /\bbay street\b/, city: "Toronto", confidence: "medium", reason: "Company or title implies Toronto finance context" },
  { pattern: /\bwall street\b|\blower manhattan\b/, city: "New York", confidence: "medium", reason: "Company or title implies New York finance context" },
];

function normalizeLooseText(value) {
  return String(value || "").toLowerCase().trim().replace(/\s+/g, " ");
}

function getSearchFieldScore(query, value, options = {}) {
  const normalizedQuery = normalizeLooseText(query);
  const normalizedValue = normalizeLooseText(value);
  if (!normalizedQuery || !normalizedValue || !normalizedValue.includes(normalizedQuery)) return -1;
  let score = options.base || 0;
  if (normalizedValue === normalizedQuery) score += options.exactBonus ?? 160;
  else if (normalizedValue.startsWith(normalizedQuery)) score += options.prefixBonus ?? 100;
  else if (normalizedValue.split(" ").some((word) => word.startsWith(normalizedQuery))) score += options.wordBonus ?? 65;
  else score += options.partialBonus ?? 35;
  score -= Math.min(normalizedValue.length, 120) * 0.05;
  return score;
}

function useDebouncedValue(value, delay = 140) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeoutId);
  }, [value, delay]);
  return debouncedValue;
}

const DebouncedTextInput = React.memo(function DebouncedTextInput({
  value,
  onCommit,
  onDraftChange,
  delay = 140,
  ...inputProps
}) {
  const [draft, setDraft] = useState(value || "");
  const debouncedDraft = useDebouncedValue(draft, delay);

  useEffect(() => {
    setDraft(value || "");
  }, [value]);

  useEffect(() => {
    if (debouncedDraft !== value) {
      onCommit(debouncedDraft);
    }
  }, [debouncedDraft, value, onCommit]);

  return (
    <input
      {...inputProps}
      value={draft}
      onChange={(event) => {
        const nextValue = event.target.value;
        setDraft(nextValue);
        if (onDraftChange) onDraftChange(nextValue, event);
      }}
    />
  );
});

function normalizeCompanyKey(companyName) {
  const compact = normalizeLooseText(companyName)
    .replace(/['’]/g, "")
    .replace(/[.,()|/&+-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!compact) return "";
  return compact
    .replace(/\b(inc|corp|corporation|llc|ltd|limited|co)\b\.?/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeTags(tags) {
  if (Array.isArray(tags)) return tags.map((tag) => String(tag).trim()).filter(Boolean);
  if (typeof tags === "string") {
    return tags.split(",").map((tag) => tag.trim()).filter(Boolean);
  }
  return [];
}

function normalizeContact(contact) {
  const resolvedCitySource =
    contact.citySource || (contact.source === "manual" && String(contact.city || "").trim() ? "manual" : undefined);
  return {
    ...contact,
    source: contact.source || "manual",
    company: contact.company || "",
    position: contact.position || "",
    note: contact.note || "",
    email: contact.email || "",
    url: contact.url || "",
    city: contact.city || "",
    connectedOn: contact.connectedOn || "",
    needsLocation: Boolean(contact.needsLocation),
    pinned: Boolean(contact.pinned),
    locationReviewDeferred: Boolean(contact.locationReviewDeferred),
    citySource: resolvedCitySource,
    guessConfidence: contact.guessConfidence || null,
    guessReason: contact.guessReason || "",
    guessCandidates: Array.isArray(contact.guessCandidates)
      ? contact.guessCandidates.map((candidate) => String(candidate).trim()).filter(Boolean)
      : [],
    tags: normalizeTags(contact.tags),
  };
}

function getDefaultContacts() {
  return Array.isArray(window.DEFAULT_CONTACTS) ? window.DEFAULT_CONTACTS : [];
}

function getDefaultContactKeySet() {
  return new Set(getDefaultContacts().map((contact) => getPersistentContactKey(contact)));
}

function isDefaultDemoContact(contact, demoKeySet = getDefaultContactKeySet()) {
  return demoKeySet.has(getPersistentContactKey(contact));
}

function stripDefaultDemoContacts(contacts, demoKeySet = getDefaultContactKeySet()) {
  return contacts.filter((contact) => !isDefaultDemoContact(contact, demoKeySet));
}

function PinGlyph({ filled = false, color = "#E8541A", size = 14 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M15.5 3.5c-.3 0-.6.12-.82.34l-1.08 1.08-5.44 1.63c-.3.09-.56.25-.78.47l-.18.18c-.46.46-.46 1.2 0 1.66l2.33 2.33-4.82 5.87c-.3.37-.27.9.07 1.23l1.11 1.11c.34.34.87.37 1.24.07l5.86-4.82 2.33 2.33c.46.46 1.2.46 1.66 0l.18-.18c.22-.22.38-.49.47-.78l1.63-5.44 1.08-1.08c.45-.45.45-1.18 0-1.63l-3.24-3.24c-.22-.22-.52-.34-.83-.34z"
        fill={filled ? color : "none"}
        stroke={color}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getContactKey(contact) {
  return `${String(contact.name || "").toLowerCase()}|${String(contact.city || "").toLowerCase()}`;
}

function getLinkedInContactKey(contact) {
  const normalized = normalizeContact(contact);
  const urlKey = normalizeLooseText(normalized.url);
  if (urlKey) return `linkedin-url|${urlKey}`;
  return [
    normalizeLooseText(normalized.name),
    normalizeCompanyKey(normalized.company),
    normalizeLooseText(normalized.position),
    normalizeLooseText(normalized.connectedOn),
  ].join("|");
}

function getImportedContactKey(contact) {
  const normalized = normalizeContact(contact);
  if (normalized.source === "linkedin") return getLinkedInContactKey(normalized);
  const emailKey = normalizeLooseText(normalized.email);
  if (emailKey) return `${normalized.source}-email|${emailKey}`;
  const urlKey = normalizeLooseText(normalized.url);
  if (urlKey) return `${normalized.source}-url|${urlKey}`;
  return [
    normalized.source,
    normalizeLooseText(normalized.name),
    normalizeCompanyKey(normalized.company),
    normalizeLooseText(normalized.position),
    normalizeLooseText(normalized.connectedOn),
    normalizeCityKey(normalized.city),
  ].join("|");
}

function getPersistentContactKey(contact) {
  const normalized = normalizeContact(contact);
  if (normalized.source === "linkedin" || normalized.source === "google" || normalized.source === "outlook") {
    return getImportedContactKey(normalized);
  }
  return getContactKey(normalized);
}

function geocodeContact(contact) {
  const normalized = normalizeContact(contact);
  if (typeof normalized.lat === "number" && typeof normalized.lng === "number") {
    return normalized;
  }
  const coords = geocodeCity(normalized.city);
  return coords ? { ...normalized, lat: coords.lat, lng: coords.lng } : { ...normalized, lat: null, lng: null };
}

function resolveKnownCity(cityName) {
  const coords = geocodeCity(cityName);
  if (!coords) return null;
  return {
    city: getKnownCityLabel(cityName),
    lat: coords.lat,
    lng: coords.lng,
  };
}

function buildContactSearchQueries(contact) {
  const parts = [contact.name, contact.company, contact.position].filter(Boolean);
  const quoted = parts.map((part) => `"${String(part).trim()}"`).join(" ");
  const googleQuery = quoted || `"${String(contact.name || "").trim()}"`;
  const linkedInQuery = [contact.name && `"${String(contact.name).trim()}"`, contact.company && `"${String(contact.company).trim()}"`, "site:linkedin.com/in"]
    .filter(Boolean)
    .join(" ");
  return {
    google: `https://www.google.com/search?q=${encodeURIComponent(googleQuery)}`,
    linkedin: `https://www.google.com/search?q=${encodeURIComponent(linkedInQuery)}`,
  };
}

function buildCompanySearchQueries(group) {
  const companyLabel = String(group?.label || "").trim();
  const googleQuery = `${companyLabel} office city location`.trim();
  const linkedInQuery = `${companyLabel} site:linkedin.com`.trim();
  return {
    google: `https://www.google.com/search?q=${encodeURIComponent(googleQuery)}`,
    linkedin: `https://www.google.com/search?q=${encodeURIComponent(linkedInQuery)}`,
  };
}

function openSearchUrl(url) {
  if (!url) return;
  window.open(url, "_blank", "noopener,noreferrer");
}

function buildCompanyEvidence(contacts) {
  const evidence = new Map();
  contacts
    .map(geocodeContact)
    .filter((contact) => contact.city && typeof contact.lat === "number" && typeof contact.lng === "number")
    .forEach((contact) => {
      const companyKey = normalizeCompanyKey(contact.company);
      if (!companyKey || LINKEDIN_GENERIC_COMPANIES.has(companyKey)) return;

      const cityKey = normalizeCityKey(contact.city);
      if (!cityKey) return;

      if (!evidence.has(companyKey)) {
        evidence.set(companyKey, {
          companyKey,
          totalCount: 0,
          cityCounts: new Map(),
        });
      }

      const bucket = evidence.get(companyKey);
      bucket.totalCount += 1;
      const existingCity = bucket.cityCounts.get(cityKey) || { city: getKnownCityLabel(contact.city), count: 0 };
      existingCity.count += 1;
      existingCity.city = getKnownCityLabel(contact.city);
      bucket.cityCounts.set(cityKey, existingCity);
    });

  evidence.forEach((entry) => {
    const sortedCities = Array.from(entry.cityCounts.entries())
      .map(([cityKey, cityEntry]) => ({ cityKey, city: cityEntry.city, count: cityEntry.count }))
      .sort((a, b) => b.count - a.count || a.city.localeCompare(b.city));
    entry.cities = sortedCities;
    entry.dominantCity = sortedCities[0] || null;
    entry.secondCity = sortedCities[1] || null;
    entry.dominantShare = entry.dominantCity ? entry.dominantCity.count / entry.totalCount : 0;
  });

  return evidence;
}

function classifyCompanyConfidence(companyKey, companyEvidence) {
  if (!companyKey) {
    return {
      confidence: "low",
      city: "",
      candidates: [],
      reason: "No company evidence available for this contact",
    };
  }

  if (LINKEDIN_GENERIC_COMPANIES.has(companyKey)) {
    return {
      confidence: "low",
      city: "",
      candidates: [],
      reason: "Company is too generic or multi-office to guess reliably",
    };
  }

  if (!companyEvidence || !companyEvidence.dominantCity) {
    return {
      confidence: "low",
      city: "",
      candidates: [],
      reason: "No reusable company evidence yet",
    };
  }

  const dominant = companyEvidence.dominantCity;
  const candidates = companyEvidence.cities.slice(0, 3).map((entry) => entry.city);
  const sharePercent = Math.round(companyEvidence.dominantShare * 100);

  if (companyEvidence.dominantShare >= 0.8 && companyEvidence.totalCount >= 2) {
    return {
      confidence: "high",
      city: dominant.city,
      candidates,
      reason: `Company strongly matched ${dominant.city} (${dominant.count} of ${companyEvidence.totalCount} known contacts)`,
    };
  }

  if ((companyEvidence.dominantShare >= 0.55 && companyEvidence.dominantShare < 0.8) || companyEvidence.totalCount === 1) {
    const reason =
      companyEvidence.totalCount === 1
        ? `Only one known local example points to ${dominant.city}`
        : `Company usually maps to ${dominant.city} (${dominant.count} of ${companyEvidence.totalCount} known contacts, ${sharePercent}%)`;
    return {
      confidence: "medium",
      city: dominant.city,
      candidates,
      reason,
    };
  }

  return {
    confidence: "low",
    city: "",
    candidates,
    reason: "Company appears in multiple cities with no clear winner",
  };
}

function inferCityFromLocalHeuristics(contact) {
  const normalized = normalizeContact(contact);
  const combinedText = normalizeLooseText([normalized.company, normalized.position].filter(Boolean).join(" "));
  const companyKey = normalizeCompanyKey(normalized.company);

  for (const hint of LINKEDIN_CITY_TEXT_HINTS) {
    if (!hint.pattern.test(combinedText)) continue;
    const resolved = resolveKnownCity(hint.city);
    if (!resolved) continue;
    return {
      city: resolved.city,
      confidence: hint.confidence,
      reason: hint.reason,
      candidates: [resolved.city],
    };
  }

  const exactHint = LINKEDIN_EXACT_COMPANY_CITY_HINTS.get(companyKey);
  if (exactHint) {
    const resolved = resolveKnownCity(exactHint.city);
    if (resolved) {
      return {
        city: resolved.city,
        confidence: exactHint.confidence,
        reason: exactHint.reason,
        candidates: [resolved.city],
      };
    }
  }

  for (const hint of LINKEDIN_COMPANY_CITY_HINTS) {
    if (!hint.pattern.test(companyKey)) continue;
    const resolved = resolveKnownCity(hint.city);
    if (!resolved) continue;
    return {
      city: resolved.city,
      confidence: hint.confidence,
      reason: hint.reason,
      candidates: [resolved.city],
    };
  }

  return null;
}

function guessImportedContactCity(contact, evidenceTable) {
  const normalized = normalizeContact(contact);
  const explicitCity = resolveKnownCity(normalized.city);
  const contactCandidates = Array.isArray(normalized.guessCandidates) ? normalized.guessCandidates : [];
  if (explicitCity) {
    return {
      status: "explicit",
      contact: {
        ...normalized,
        ...explicitCity,
        needsLocation: false,
        citySource: "csv",
        guessConfidence: null,
        guessReason: "",
        guessCandidates: Array.from(new Set([explicitCity.city, ...contactCandidates])).slice(0, 3),
      },
    };
  }

  const companyKey = normalizeCompanyKey(normalized.company);
  const classification = classifyCompanyConfidence(companyKey, evidenceTable.get(companyKey));
  const heuristicGuess = inferCityFromLocalHeuristics(normalized);
  const effectiveClassification =
    classification.confidence === "low" && heuristicGuess
      ? heuristicGuess
      : classification;

  if ((effectiveClassification.confidence === "high" || effectiveClassification.confidence === "medium") && effectiveClassification.city) {
    const guessedCity = resolveKnownCity(effectiveClassification.city);
    if (guessedCity) {
      const combinedCandidates = Array.from(
        new Set([guessedCity.city, ...(effectiveClassification.candidates || []), ...contactCandidates])
      ).slice(0, 3);
      return {
        status: "guessed",
        contact: {
          ...normalized,
          ...guessedCity,
          needsLocation: false,
          citySource: "inferred_company",
          guessConfidence: effectiveClassification.confidence,
          guessReason: effectiveClassification.reason,
          guessCandidates: combinedCandidates,
        },
      };
    }
  }

  return {
    status: "unresolved",
    contact: {
      ...normalized,
      city: "",
      lat: null,
      lng: null,
      needsLocation: true,
      citySource: undefined,
      guessConfidence: "low",
      guessReason: effectiveClassification.reason,
      guessCandidates: Array.from(new Set([...(effectiveClassification.candidates || []), ...contactCandidates])).slice(0, 3),
    },
  };
}

function dedupeImportedContacts(importedContacts, existingContacts, source) {
  const existingKeys = new Set(
    existingContacts
      .filter((contact) => normalizeContact(contact).source === source)
      .map((contact) => getImportedContactKey({ ...contact, source }))
  );
  const seenKeys = new Set();
  const unique = [];
  let duplicateCount = 0;
  let invalidCount = 0;

  importedContacts.forEach((contact) => {
    const normalized = normalizeContact({ ...contact, source });
    if (!normalizeLooseText(normalized.name)) {
      invalidCount += 1;
      return;
    }
    const key = getImportedContactKey(normalized);
    if (existingKeys.has(key) || seenKeys.has(key)) {
      duplicateCount += 1;
      return;
    }
    seenKeys.add(key);
    unique.push(normalized);
  });

  return { unique, duplicateCount, invalidCount };
}

function summarizeLinkedInImportSession(session) {
  if (!session) return null;
  const summary = {
    totalImported: session.items.length,
    explicitCount: 0,
    guessedHighCount: 0,
    guessedMediumCount: 0,
    unresolvedCount: 0,
    duplicateCount: session.duplicateCount || 0,
    invalidCount: session.invalidCount || 0,
  };

  session.items.forEach((item) => {
    const contact = normalizeContact(item.contact);
    if (contact.needsLocation || !contact.city) {
      summary.unresolvedCount += 1;
      return;
    }
    if (contact.citySource === "csv" || contact.citySource === "manual") {
      summary.explicitCount += 1;
      return;
    }
    if (contact.citySource === "inferred_company" && contact.guessConfidence === "high") {
      summary.guessedHighCount += 1;
      return;
    }
    if (contact.citySource === "inferred_company" && contact.guessConfidence === "medium") {
      summary.guessedMediumCount += 1;
      return;
    }
    summary.explicitCount += 1;
  });

  return summary;
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
  if (!isDefaultDemoContact(contact)) return null;
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
  const [searchActiveIndex, setSearchActiveIndex] = useState(-1);
  const [filters, setFilters] = useState({ google: true, linkedin: true, outlook: true, manual: true });
  const [showManualForm, setShowManualForm] = useState(false);
  const [toast, setToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mapRef = useRef(null);
  const svgMapRef = useRef(null);
  const svgPreviewRef = useRef(null);
  const fileInputRef = useRef(null);
  const googleCsvInputRef = useRef(null);
  const outlookCsvInputRef = useRef(null);
  const importInputRef = useRef(null);
  const [mapCenter, setMapCenter] = useState({ lat: 20, lng: 15 });
  const [mapZoom, setMapZoom] = useState(1.3);
  const [hoveredCity, setHoveredCity] = useState(null);
  const [manualForm, setManualForm] = useState({ name: "", city: "", company: "", position: "", note: "", tags: "" });
  const [csvDragOver, setCsvDragOver] = useState(false);
  const [showGoogleGuide, setShowGoogleGuide] = useState(false);
  const [showOutlookGuide, setShowOutlookGuide] = useState(false);
  const [showLinkedInGuide, setShowLinkedInGuide] = useState(false);
  const [importSession, setImportSession] = useState(null);
  const [importManualCityDrafts, setImportManualCityDrafts] = useState({});
  const [importGroupDrafts, setImportGroupDrafts] = useState({});
  const [previewZoom, setPreviewZoom] = useState(DEFAULT_PREVIEW_ZOOM);
  const [previewCenter, setPreviewCenter] = useState(DEFAULT_PREVIEW_CENTER);
  const [showTripPlanner, setShowTripPlanner] = useState(false);
  const [sidebarMode, setSidebarMode] = useState(null);
  const [tripDraft, setTripDraft] = useState({ destination: "", radiusKm: 100, notes: "" });
  const [tripPlan, setTripPlan] = useState(null);
  const [selectedContactProfile, setSelectedContactProfile] = useState(null);
  const [profileCityDraft, setProfileCityDraft] = useState("");
  const [citySearchQuery, setCitySearchQuery] = useState("");
  const [showUnresolvedEditor, setShowUnresolvedEditor] = useState(false);
  const [unresolvedCityDrafts, setUnresolvedCityDrafts] = useState({});
  const [unresolvedSearchQuery, setUnresolvedSearchQuery] = useState("");
  const [unresolvedCompanyCityDraft, setUnresolvedCompanyCityDraft] = useState("");
  const [selectedUnresolvedCompanyKey, setSelectedUnresolvedCompanyKey] = useState(null);
  const [isUnresolvedEditorExpanded, setIsUnresolvedEditorExpanded] = useState(false);
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
    const defaultKeySet = new Set(defaultContacts.map((contact) => getPersistentContactKey(contact)));
    const mergedContacts = new Map();
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length) {
          parsed
            .map(geocodeContact)
            .forEach((contact) => {
              const key = getPersistentContactKey(contact);
              if (!defaultKeySet.has(key) && !LEGACY_DEFAULT_CONTACT_KEYS.has(key) && !mergedContacts.has(key)) {
                mergedContacts.set(key, contact);
              }
            });
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
    setContacts(Array.from(mergedContacts.values()));
    setView(mergedContacts.size > 0 ? "map" : "landing");
  }, []);

  useEffect(() => {
    if (!contacts.length) {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }
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

  useEffect(() => {
    setProfileCityDraft(selectedContactProfile?.city || "");
  }, [selectedContactProfile]);

  const showToast = useCallback((msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const defaultContactKeySet = useMemo(() => getDefaultContactKeySet(), []);
  const hasDemoContactsLoaded = contacts.some((contact) => isDefaultDemoContact(contact, defaultContactKeySet));
  const hasNonDemoContactsLoaded = contacts.some((contact) => !isDefaultDemoContact(contact, defaultContactKeySet));
  const unresolvedCommittedContacts = useMemo(
    () =>
      contacts
        .map(normalizeContact)
        .filter((contact) => !isDefaultDemoContact(contact, defaultContactKeySet))
        .filter((contact) => contact.needsLocation || !contact.city || typeof contact.lat !== "number" || typeof contact.lng !== "number"),
    [contacts, defaultContactKeySet]
  );
  const normalizedUnresolvedSearch = normalizeLooseText(unresolvedSearchQuery);
  const unresolvedDerived = useMemo(() => {
    if (!showUnresolvedEditor) {
      return {
        visibleUnresolvedContacts: [],
        unresolvedFilteredContacts: [],
        unresolvedCompanyGroups: [],
      };
    }
    const visibleUnresolvedContacts = unresolvedCommittedContacts;
    const unresolvedCompanyCounts = visibleUnresolvedContacts.reduce((acc, contact) => {
      const companyKey = normalizeCompanyKey(contact.company) || "__no_company__";
      acc[companyKey] = (acc[companyKey] || 0) + 1;
      return acc;
    }, {});
    const unresolvedFilteredContacts = visibleUnresolvedContacts
      .filter((contact) => {
        if (!normalizedUnresolvedSearch) return true;
        const searchableText = [
          contact.name,
          contact.company,
          contact.position,
          contact.note,
          contact.guessReason,
          ...(contact.tags || []),
        ]
          .filter(Boolean)
          .join(" ");
        return normalizeLooseText(searchableText).includes(normalizedUnresolvedSearch);
      })
      .sort((a, b) => {
        const companyCountDiff =
          (unresolvedCompanyCounts[normalizeCompanyKey(b.company) || "__no_company__"] || 0) -
          (unresolvedCompanyCounts[normalizeCompanyKey(a.company) || "__no_company__"] || 0);
        if (companyCountDiff) return companyCountDiff;
        const companyCompare = (a.company || "No company").localeCompare(b.company || "No company");
        if (companyCompare) return companyCompare;
        return a.name.localeCompare(b.name);
      });
    const unresolvedCompanyGroups = Object.values(
      unresolvedFilteredContacts.reduce((acc, contact) => {
        const companyKey = normalizeCompanyKey(contact.company) || "__no_company__";
        if (!acc[companyKey]) {
          acc[companyKey] = {
            key: companyKey,
            label: contact.company || "No company listed",
            contacts: [],
          };
        }
        acc[companyKey].contacts.push(contact);
        return acc;
      }, {})
    ).sort((a, b) => b.contacts.length - a.contacts.length || a.label.localeCompare(b.label));
    return {
      visibleUnresolvedContacts,
      unresolvedFilteredContacts,
      unresolvedCompanyGroups,
    };
  }, [
    showUnresolvedEditor,
    unresolvedCommittedContacts,
    normalizedUnresolvedSearch,
  ]);
  const {
    visibleUnresolvedContacts,
    unresolvedFilteredContacts,
    unresolvedCompanyGroups,
  } = unresolvedDerived;
  const selectedUnresolvedCompany =
    unresolvedCompanyGroups.find((group) => group.key === selectedUnresolvedCompanyKey) || unresolvedCompanyGroups[0] || null;
  const visibleBaseContacts = importSession ? stripDefaultDemoContacts(contacts, defaultContactKeySet) : contacts;
  const importPreviewContacts = importSession ? importSession.items.map((item) => normalizeContact(item.contact)) : [];
  const allContacts = [...visibleBaseContacts, ...importPreviewContacts];
  const importSummary = summarizeLinkedInImportSession(importSession);

  useEffect(() => {
    if (!showUnresolvedEditor) return;
    if (!unresolvedCompanyGroups.length) {
      if (selectedUnresolvedCompanyKey !== null) setSelectedUnresolvedCompanyKey(null);
      return;
    }
    const hasSelectedCompany = unresolvedCompanyGroups.some((group) => group.key === selectedUnresolvedCompanyKey);
    if (!hasSelectedCompany) {
      setSelectedUnresolvedCompanyKey(unresolvedCompanyGroups[0].key);
    }
  }, [showUnresolvedEditor, unresolvedCompanyGroups, selectedUnresolvedCompanyKey]);

  useEffect(() => {
    if (!showUnresolvedEditor && selectedUnresolvedCompanyKey !== null) {
      setSelectedUnresolvedCompanyKey(null);
    }
  }, [showUnresolvedEditor, selectedUnresolvedCompanyKey]);

  useEffect(() => {
    setUnresolvedCompanyCityDraft("");
  }, [selectedUnresolvedCompanyKey]);

  useEffect(() => {
    if (!showTripPlanner && !showUnresolvedEditor) return;
    function handleOverlayEscape(event) {
      if (event.key !== "Escape") return;
      if (showUnresolvedEditor) {
        setShowUnresolvedEditor(false);
        return;
      }
      if (showTripPlanner) {
        setShowTripPlanner(false);
      }
    }
    window.addEventListener("keydown", handleOverlayEscape);
    return () => window.removeEventListener("keydown", handleOverlayEscape);
  }, [showTripPlanner, showUnresolvedEditor]);

  // Filtered + geocoded contacts
  const geoContacts = allContacts.filter((c) => c.lat && c.lng && filters[c.source]);

  const { cityGroups, cityGroupList, cityGroupByKey } = useMemo(() => {
    const grouped = {};
    geoContacts.forEach((contact) => {
      const key = `${contact.lat.toFixed(2)},${contact.lng.toFixed(2)}`;
      if (!grouped[key]) {
        grouped[key] = { key, city: contact.city, lat: contact.lat, lng: contact.lng, contacts: [] };
      }
      grouped[key].contacts.push(contact);
    });
    const list = Object.values(grouped);
    list.forEach((group) => {
      group.contacts.sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)) || a.name.localeCompare(b.name));
    });
    const byKey = Object.fromEntries(list.map((group) => [group.key, group]));
    return { cityGroups: grouped, cityGroupList: list, cityGroupByKey: byKey };
  }, [geoContacts]);

  const activeSelectedCity = selectedCity ? cityGroupByKey[selectedCity.key] || selectedCity : null;
  const normalizedCitySearch = normalizeLooseText(citySearchQuery);
  const visibleCityContacts = useMemo(() => {
    if (!activeSelectedCity) return [];
    if (!normalizedCitySearch) return activeSelectedCity.contacts;
    return activeSelectedCity.contacts.filter((contact) => {
      const searchableText = [contact.name, contact.company, contact.position].filter(Boolean).join(" ");
      return normalizeLooseText(searchableText).includes(normalizedCitySearch);
    });
  }, [activeSelectedCity, normalizedCitySearch]);

  useEffect(() => {
    setCitySearchQuery("");
  }, [activeSelectedCity?.key]);

  const searchableCityGroups = useMemo(
    () =>
      cityGroupList.map((group) => ({
        group,
        aggregateText: normalizeLooseText(
          group.contacts.flatMap((contact) => [contact.company, contact.position, ...(contact.tags || [])]).filter(Boolean).join(" ")
        ),
      })),
    [cityGroupList]
  );

  const searchableGeoContacts = useMemo(
    () =>
      geoContacts.map((contact) => ({
        contact,
        cityKey: `${contact.lat.toFixed(2)},${contact.lng.toFixed(2)}`,
        normalizedName: normalizeLooseText(contact.name),
        normalizedCompany: normalizeLooseText(contact.company),
        normalizedCity: normalizeLooseText(contact.city),
        normalizedPosition: normalizeLooseText(contact.position),
        normalizedTags: normalizeLooseText((contact.tags || []).join(" ")),
        normalizedNote: normalizeLooseText(contact.note),
      })),
    [geoContacts]
  );

  const searchableUnresolvedContacts = useMemo(
    () =>
      unresolvedCommittedContacts.map((contact) => ({
        contact,
        normalizedName: normalizeLooseText(contact.name),
        normalizedCompany: normalizeLooseText(contact.company),
        normalizedPosition: normalizeLooseText(contact.position),
        normalizedGuessReason: normalizeLooseText(contact.guessReason),
        normalizedTags: normalizeLooseText((contact.tags || []).join(" ")),
        normalizedNote: normalizeLooseText(contact.note),
      })),
    [unresolvedCommittedContacts]
  );

  // Search
  const searchResults = searchQuery.trim()
    ? (() => {
        const query = normalizeLooseText(searchQuery);
        const cityMatches = searchableCityGroups
          .map(({ group: g, aggregateText }) => {
            const score = Math.max(
              getSearchFieldScore(query, g.city, { base: 240 }),
              getSearchFieldScore(query, aggregateText, { base: 120 })
            );
            if (score < 0) return null;
            return {
              type: "city",
              key: g.key,
              title: g.city,
              subtitle: `${g.contacts.length} contact${g.contacts.length > 1 ? "s" : ""}`,
              cityGroup: g,
              score: score + Math.min(g.contacts.length, 50),
            };
          })
          .filter(Boolean);

        const contactMatches = searchableGeoContacts
          .map(({ contact: c, cityKey, normalizedName, normalizedCompany, normalizedCity, normalizedPosition, normalizedTags, normalizedNote }) => {
            const score = Math.max(
              getSearchFieldScore(query, normalizedName, { base: 320 }),
              getSearchFieldScore(query, normalizedCompany, { base: 220 }),
              getSearchFieldScore(query, normalizedCity, { base: 180 }),
              getSearchFieldScore(query, normalizedPosition, { base: 170 }),
              getSearchFieldScore(query, normalizedTags, { base: 150 }),
              getSearchFieldScore(query, normalizedNote, { base: 110 })
            );
            if (score < 0) return null;
            return {
              type: "contact",
              key: `contact-${getPersistentContactKey(c)}`,
              title: c.name,
              subtitle: [c.city, c.company, c.position].filter(Boolean).join(" - "),
              cityGroup: cityGroupByKey[cityKey] || null,
              contact: c,
              score: score + (c.pinned ? 12 : 0),
            };
          })
          .filter(Boolean);

        const unresolvedMatches = searchableUnresolvedContacts
          .map(({ contact: c, normalizedName, normalizedCompany, normalizedPosition, normalizedGuessReason, normalizedTags, normalizedNote }) => {
            const score = Math.max(
              getSearchFieldScore(query, normalizedName, { base: 300 }),
              getSearchFieldScore(query, normalizedCompany, { base: 210 }),
              getSearchFieldScore(query, normalizedPosition, { base: 170 }),
              getSearchFieldScore(query, normalizedGuessReason, { base: 140 }),
              getSearchFieldScore(query, normalizedTags, { base: 150 }),
              getSearchFieldScore(query, normalizedNote, { base: 110 })
            );
            if (score < 0) return null;
            return {
              type: "unresolved_contact",
              key: `unresolved-${getPersistentContactKey(c)}`,
              title: c.name,
              subtitle: ["Needs city", c.company, c.position].filter(Boolean).join(" - "),
              contact: c,
              score,
            };
          })
          .filter(Boolean);

        const destinationMatches = Object.entries(CITY_DB)
          .filter(([name]) => !cityMatches.some((match) => normalizeCityKey(match.title) === name))
          .map(([name, coords]) => {
            const title = toSentenceCasePlace(name);
            const score = getSearchFieldScore(query, title, { base: 130 });
            if (score < 0) return null;
            return {
              type: "destination",
              key: `destination-${name}`,
              title,
              subtitle: "Known city - no contacts yet",
              cityGroup: null,
              coords,
              score,
            };
          })
          .filter(Boolean);

        return [...cityMatches, ...contactMatches, ...unresolvedMatches, ...destinationMatches]
          .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
          .slice(0, 12);
      })()
    : [];

  useEffect(() => {
    setSearchActiveIndex((prev) => {
      if (!searchResults.length) return -1;
      if (prev < 0) return 0;
      return Math.min(prev, searchResults.length - 1);
    });
  }, [searchResults]);

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

  const topHubs = cityGroupList
    .slice()
    .sort((a, b) => b.contacts.length - a.contacts.length || a.city.localeCompare(b.city))
    .slice(0, 8);

  function mutateImportItems(predicate, updater) {
    setImportSession((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        items: prev.items.map((item) => {
          if (!predicate(item)) return item;
          const nextItem = updater(item);
          return {
            ...nextItem,
            contact: normalizeContact(nextItem.contact),
          };
        }),
      };
    });
  }

  function toManualImportItem(item, cityName, reason = "City set during review") {
    const manualContact = toManualPlacedContact(item.contact, cityName, reason);
    if (!manualContact) return null;
    return {
      ...item,
      status: "explicit",
      reviewed: true,
      selected: false,
      contact: manualContact,
    };
  }

  function toManualPlacedContact(contact, cityName, reason = "City updated manually") {
    const resolvedCity = resolveKnownCity(cityName);
    if (!resolvedCity) return null;
    const normalized = normalizeContact(contact);
    return {
      ...normalized,
      ...resolvedCity,
      needsLocation: false,
      locationReviewDeferred: false,
      citySource: "manual",
      guessConfidence: null,
      guessReason: reason,
      guessCandidates: Array.from(new Set([resolvedCity.city, ...normalized.guessCandidates])).slice(0, 3),
    };
  }

  function toUnresolvedImportItem(item, reason = "Marked unresolved during review") {
    return {
      ...item,
      status: "unresolved",
      reviewed: true,
      selected: false,
      contact: {
        ...normalizeContact(item.contact),
        city: "",
        lat: null,
        lng: null,
        needsLocation: true,
        locationReviewDeferred: false,
        citySource: undefined,
        guessConfidence: "low",
        guessReason: reason,
      },
    };
  }

  function addContacts(newContacts) {
    const geocoded = newContacts.map(geocodeContact);
    setContacts((prev) => {
      const existing = new Set(prev.map(getPersistentContactKey));
      const unique = geocoded.filter((c) => !existing.has(getPersistentContactKey(c)));
      return [...prev, ...unique];
    });
    const mapped = geocoded.filter((c) => c.lat);
    const unmapped = geocoded.filter((c) => !c.lat);
    if (mapped.length) showToast(`Added ${mapped.length} contact${mapped.length > 1 ? "s" : ""} to the map`);
    if (unmapped.length) showToast(`${unmapped.length} contact${unmapped.length > 1 ? "s" : ""} couldn't be geocoded`, "warn");
    if (mapped.length) setView("map");
  }

  function toggleImportSelection(itemId) {
    mutateImportItems(
      (item) => item.id === itemId,
      (item) => ({ ...item, selected: !item.selected })
    );
  }

  function acceptAllGuessesForCity(cityName) {
    mutateImportItems(
      (item) => item.status === "guessed" && normalizeCityKey(item.contact.city) === normalizeCityKey(cityName),
      (item) => ({ ...item, reviewed: true, selected: false })
    );
  }

  function moveSelectedGuessesToCity(cityName) {
    const targetCity = String(importGroupDrafts[cityName] || "").trim();
    const resolvedCity = resolveKnownCity(targetCity);
    if (!resolvedCity) {
      showToast("Pick a known city to move those contacts", "warn");
      return;
    }

    let movedCount = 0;
    mutateImportItems(
      (item) => item.status === "guessed" && normalizeCityKey(item.contact.city) === normalizeCityKey(cityName) && item.selected,
      (item) => {
        movedCount += 1;
        return toManualImportItem(item, resolvedCity.city, `Moved from ${item.contact.city} to ${resolvedCity.city} during review`);
      }
    );

    if (!movedCount) {
      showToast("Select one or more contacts first", "warn");
      return;
    }

    setImportGroupDrafts((prev) => ({ ...prev, [cityName]: "" }));
    showToast(`Moved ${movedCount} contact${movedCount === 1 ? "" : "s"} to ${resolvedCity.city}`);
  }

  function markSelectedGuessesUnresolved(cityName) {
    let changedCount = 0;
    mutateImportItems(
      (item) => item.status === "guessed" && normalizeCityKey(item.contact.city) === normalizeCityKey(cityName) && item.selected,
      (item) => {
        changedCount += 1;
        return toUnresolvedImportItem(item, `Removed guessed city ${item.contact.city} during review`);
      }
    );

    if (!changedCount) {
      showToast("Select one or more contacts first", "warn");
      return;
    }

    showToast(`Marked ${changedCount} contact${changedCount === 1 ? "" : "s"} unresolved`, "warn");
  }

  function applyManualCityForItem(itemId) {
    const draftCity = String(importManualCityDrafts[itemId] || "").trim();
    const resolvedCity = resolveKnownCity(draftCity);
    if (!resolvedCity) {
      showToast("That city isn't in PinPal's local city set yet", "warn");
      return;
    }

    mutateImportItems(
      (item) => item.id === itemId,
      (item) => toManualImportItem(item, resolvedCity.city)
    );
    setImportManualCityDrafts((prev) => ({ ...prev, [itemId]: "" }));
    showToast(`Set city to ${resolvedCity.city}`);
  }

  function applyCandidateCityForItem(itemId, candidateCity) {
    const resolvedCity = resolveKnownCity(candidateCity);
    if (!resolvedCity) {
      showToast("That candidate city couldn't be resolved locally", "warn");
      return;
    }

    mutateImportItems(
      (item) => item.id === itemId,
      (item) => toManualImportItem(item, resolvedCity.city, `Picked ${resolvedCity.city} from suggested cities`)
    );
    showToast(`Set city to ${resolvedCity.city}`);
  }

  function getImportSourceLabel(source) {
    return SOURCE_LABELS[source] || "CSV";
  }

  function openImportSession(source, parsedContacts) {
    if (!parsedContacts.length) {
      showToast("No contacts found in CSV", "error");
      return;
    }

    const session = createImportSession(source, parsedContacts, contacts);
    if (!session.items.length) {
      if (session.duplicateCount || session.invalidCount) {
        showToast(
          `No new ${getImportSourceLabel(source)} contacts to review${session.duplicateCount ? ` (${session.duplicateCount} duplicates skipped)` : ""}`,
          "warn"
        );
      } else {
        showToast("No contacts found in CSV", "error");
      }
      return;
    }

    setImportSession(session);
    setImportManualCityDrafts({});
    setImportGroupDrafts({});
    const sessionSummary = summarizeLinkedInImportSession(session);
    const mappedCount = sessionSummary.explicitCount + sessionSummary.guessedHighCount + sessionSummary.guessedMediumCount;
    if (mappedCount > 0) setView("map");
    showToast(
      sessionSummary.totalImported
        ? `Prepared ${sessionSummary.totalImported} ${getImportSourceLabel(source)} contacts for review`
        : `Skipped ${session.duplicateCount} duplicate ${getImportSourceLabel(source)} contacts`
    );
  }

  function openLinkedInImportSession(parsedContacts) {
    openImportSession("linkedin", parsedContacts);
  }

  function legacyHandleLinkedInUpload(text) {
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

  function parseCsvBySource(text, source) {
    if (source === "linkedin") return parseLinkedInCSV(text);
    if (source === "outlook") return parseOutlookCSV(text);
    if (source === "google") return parseGoogleContactsCSV(text);
    return [];
  }

  function handleCsvTextImport(text, preferredSource = null) {
    const source = preferredSource || detectCsvSource(text);
    if (!source) {
      showToast("Could not detect CSV type. Try LinkedIn, Outlook, or Google Contacts export CSV.", "error");
      return;
    }
    openImportSession(source, parseCsvBySource(text, source));
  }

  function handleFileUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => handleCsvTextImport(ev.target.result);
    reader.readAsText(file);
    e.target.value = "";
  }

  function handleGoogleCsvUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => handleCsvTextImport(ev.target.result, "google");
    reader.readAsText(file);
    e.target.value = "";
  }

  function handleOutlookCsvUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => handleCsvTextImport(ev.target.result, "outlook");
    reader.readAsText(file);
    e.target.value = "";
  }

  function legacyHandleImport(e) {
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

  function toggleLandingGuide(guideKey) {
    const nextGoogle = guideKey === "google" ? !showGoogleGuide : false;
    const nextOutlook = guideKey === "outlook" ? !showOutlookGuide : false;
    const nextLinkedIn = guideKey === "linkedin" ? !showLinkedInGuide : false;
    setShowGoogleGuide(nextGoogle);
    setShowOutlookGuide(nextOutlook);
    setShowLinkedInGuide(nextLinkedIn);
  }

  function clearAllContacts() {
    setContacts([]);
    setImportSession(null);
    setImportManualCityDrafts({});
    setImportGroupDrafts({});
    setUnresolvedCompanyCityDraft("");
    setUnresolvedSearchQuery("");
    setUnresolvedCityDrafts({});
    setShowUnresolvedEditor(false);
    setSelectedUnresolvedCompanyKey(null);
    setIsUnresolvedEditorExpanded(false);
    setSelectedCity(null);
    setSelectedContactProfile(null);
    setTripPlan(null);
    setTripDraft({ destination: "", radiusKm: 100, notes: "" });
    setShowTripPlanner(false);
    setSidebarMode(null);
    setSidebarOpen(false);
    setSearchQuery("");
    setMapCenter(DEFAULT_MAP_CENTER);
    setMapZoom(DEFAULT_MAP_ZOOM);
    setPreviewCenter(DEFAULT_PREVIEW_CENTER);
    setPreviewZoom(DEFAULT_PREVIEW_ZOOM);
    setView("map");
    window.localStorage.removeItem(STORAGE_KEY);
    showToast("Cleared all contacts", "warn");
  }

  function legacyHandleManualAdd() {
    if (!manualForm.name.trim() || !manualForm.city.trim()) {
      showToast("Name and city are required", "error");
      return;
    }
    addContacts([{ ...manualForm, source: "manual" }]);
    setManualForm({ name: "", city: "", company: "", position: "", note: "", tags: "" });
    setShowManualForm(false);
  }

  function handleLinkedInUpload(text) {
    openLinkedInImportSession(parseLinkedInCSV(text));
  }

  function handleImport(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (Array.isArray(data)) {
          setContacts(data.map(geocodeContact));
          setView("map");
          setImportSession(null);
          setImportManualCityDrafts({});
          setImportGroupDrafts({});
          setUnresolvedSearchQuery("");
          setUnresolvedCityDrafts({});
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

  function handleManualAdd() {
    if (!manualForm.name.trim() || !manualForm.city.trim()) {
      showToast("Name and city are required", "error");
      return;
    }
    addContacts([{ ...manualForm, source: "manual", citySource: "manual", needsLocation: false }]);
    setManualForm({ name: "", city: "", company: "", position: "", note: "", tags: "" });
    setShowManualForm(false);
  }

  function commitImportSession() {
    if (!importSession) return;
    const sessionContacts = importSession.items.map((item) => geocodeContact(item.contact));
    setContacts((prev) => {
      const baseContacts = stripDefaultDemoContacts(prev, defaultContactKeySet);
      const existingKeys = new Set(baseContacts.map((contact) => getPersistentContactKey(contact)));
      const merged = [...baseContacts];
      sessionContacts.forEach((contact) => {
        const key = getPersistentContactKey(contact);
        if (existingKeys.has(key)) return;
        merged.push(contact);
        existingKeys.add(key);
      });
      return merged;
    });
    setImportSession(null);
    setImportManualCityDrafts({});
    setImportGroupDrafts({});
    setView("map");
    showToast(`Imported ${sessionContacts.length} ${getImportSourceLabel(importSession.source)} contact${sessionContacts.length === 1 ? "" : "s"}`);
  }

  function dismissImportSession() {
    const source = importSession?.source;
    setImportSession(null);
    setImportManualCityDrafts({});
    setImportGroupDrafts({});
    showToast(`Discarded ${getImportSourceLabel(source)} import review`, "warn");
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
    setShowUnresolvedEditor(false);
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

  function selectSearchResult(result) {
    if (!result) return;
    if (result.type === "city" && result.cityGroup) {
      flyToCity(result.cityGroup);
    } else if ((result.type === "contact" || result.type === "unresolved_contact") && result.contact) {
      openContactProfile(result.contact);
    } else if (result.coords) {
      setSelectedCity(null);
      setSidebarOpen(false);
      setMapCenter({ lat: result.coords.lat, lng: result.coords.lng });
      setMapZoom(5.5);
      setTripDraft((draft) => ({ ...draft, destination: result.title }));
    }
    setSearchQuery("");
    setSearchActiveIndex(-1);
  }

  function openContactProfile(contact) {
    setSelectedContactProfile(contact);
  }

  function togglePinnedContactByKey(contactKey) {
    let updatedContact = null;
    setContacts((prev) =>
      prev.map((contact) => {
        if (getPersistentContactKey(contact) !== contactKey) return contact;
        updatedContact = normalizeContact({ ...contact, pinned: !normalizeContact(contact).pinned });
        return updatedContact;
      })
    );
    if (!updatedContact) return null;
    if (selectedContactProfile && getPersistentContactKey(selectedContactProfile) === contactKey) {
      setSelectedContactProfile(updatedContact);
    }
    showToast(updatedContact.pinned ? `Pinned ${updatedContact.name} to the top of ${updatedContact.city}` : `Removed ${updatedContact.name} from the top of ${updatedContact.city}`);
    return updatedContact;
  }

  function updateContactsByKeys(contactKeys, updater) {
    const keySet = new Set(contactKeys);
    const updatedContacts = [];
    setContacts((prev) =>
      prev.map((contact) => {
        const key = getPersistentContactKey(contact);
        if (!keySet.has(key)) return contact;
        const nextContact = updater(normalizeContact(contact));
        if (!nextContact) return contact;
        const normalizedNext = normalizeContact(nextContact);
        updatedContacts.push(normalizedNext);
        return normalizedNext;
      })
    );
    return updatedContacts;
  }

  function applyManualCityToContactByKey(contactKey, cityName, reason = "City updated manually") {
    let updatedContact = null;
    setContacts((prev) =>
      prev.map((contact) => {
        if (getPersistentContactKey(contact) !== contactKey) return contact;
        const manualContact = toManualPlacedContact(contact, cityName, reason);
        if (!manualContact) return contact;
        updatedContact = manualContact;
        return manualContact;
      })
    );
    return updatedContact;
  }

  function applyManualCityToSelectedContact(cityName) {
    if (!selectedContactProfile) return;
    const targetKey = getPersistentContactKey(selectedContactProfile);
    const manualContact = applyManualCityToContactByKey(targetKey, cityName, "City updated from profile");
    if (!manualContact) {
      showToast("That city isn't in PinPal's local city set yet", "warn");
      return;
    }

    setSelectedContactProfile(manualContact);
    setProfileCityDraft(manualContact.city);
    if (sidebarMode === "city") {
      setSelectedCity(null);
      setSidebarMode("summary");
      setSidebarOpen(true);
    }
    showToast(`Set city to ${manualContact.city}`);
  }

  function applyManualCityToUnresolvedContact(contactKey) {
    const draftCity = String(unresolvedCityDrafts[contactKey] || "").trim();
    const manualContact = applyManualCityToContactByKey(contactKey, draftCity, "City updated from unresolved editor");
    if (!manualContact) {
      showToast("That city isn't in PinPal's local city set yet", "warn");
      return;
    }
    setUnresolvedCityDrafts((prev) => ({ ...prev, [contactKey]: "" }));
    if (selectedContactProfile && getPersistentContactKey(selectedContactProfile) === contactKey) {
      setSelectedContactProfile(manualContact);
      setProfileCityDraft(manualContact.city);
    }
    showToast(`Set city to ${manualContact.city}`);
  }

  function applyManualCityToMultipleContacts(contactKeys, cityName, reason) {
    const resolvedCity = resolveKnownCity(cityName);
    if (!resolvedCity) {
      showToast("That city isn't in PinPal's local city set yet", "warn");
      return [];
    }
    const updated = updateContactsByKeys(contactKeys, (contact) => toManualPlacedContact(contact, resolvedCity.city, reason));
    if (!updated.length) {
      showToast("No unresolved contacts were updated", "warn");
      return [];
    }
    setUnresolvedCityDrafts((prev) => {
      const next = { ...prev };
      contactKeys.forEach((key) => delete next[key]);
      return next;
    });
    if (selectedContactProfile && contactKeys.includes(getPersistentContactKey(selectedContactProfile))) {
      const updatedProfile = updated.find((contact) => getPersistentContactKey(contact) === getPersistentContactKey(selectedContactProfile));
      if (updatedProfile) {
        setSelectedContactProfile(updatedProfile);
        setProfileCityDraft(updatedProfile.city);
      }
    }
    showToast(`Set city to ${resolvedCity.city} for ${updated.length} contact${updated.length === 1 ? "" : "s"}`);
    return updated;
  }

  function applySelectedCompanyUnresolvedCity() {
    if (!selectedUnresolvedCompany) {
      showToast("Select a company first", "warn");
      return;
    }
    const cityName = String(unresolvedCompanyCityDraft || "").trim();
    const companyKeys = selectedUnresolvedCompany.contacts.map((contact) => getPersistentContactKey(contact));
    applyManualCityToMultipleContacts(
      companyKeys,
      cityName,
      `City updated for unresolved company ${selectedUnresolvedCompany.label}`
    );
    setUnresolvedCompanyCityDraft("");
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
              setContacts(data.map(geocodeContact));
              setView("map");
              setImportSession(null);
              setImportManualCityDrafts({});
              setImportGroupDrafts({});
              showToast(`Imported ${data.length} contacts`);
            }
          } catch {
            showToast("Could not parse file", "error");
          }
        } else {
          handleCsvTextImport(ev.target.result);
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
    setContacts(getDefaultContacts().map(geocodeContact));
    setImportSession(null);
    setImportManualCityDrafts({});
    setImportGroupDrafts({});
    setUnresolvedCompanyCityDraft("");
    setUnresolvedSearchQuery("");
    setUnresolvedCityDrafts({});
    setShowUnresolvedEditor(false);
    setSelectedUnresolvedCompanyKey(null);
    setIsUnresolvedEditorExpanded(false);
    setView("map");
    showToast("Sample data loaded", "warn");
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
  const samplePreviewGroups = {};
  getDefaultContacts()
    .map(geocodeContact)
    .filter((contact) => contact.lat && contact.lng)
    .forEach((contact) => {
      const key = `${contact.lat.toFixed(2)},${contact.lng.toFixed(2)}`;
      if (!samplePreviewGroups[key]) {
        samplePreviewGroups[key] = { city: contact.city, lat: contact.lat, lng: contact.lng, count: 0, color: "#E8541A" };
      }
      samplePreviewGroups[key].count += 1;
    });
  const samplePreviewDots = Object.values(samplePreviewGroups);
  const hasMappedContacts = geoContacts.length > 0;
  const hasImportedData = contacts.length > 0 || Boolean(importSession?.items.length);
  const previewDots = hasMappedContacts
    ? Object.values(cityGroups).map((g) => ({ city: g.city, lat: g.lat, lng: g.lng, count: g.contacts.length, color: "#E8541A" }))
    : samplePreviewDots;
  const guessedImportGroups = importSession
    ? Object.values(
        importSession.items.reduce((acc, item) => {
          if (item.status !== "guessed" || !item.contact.city) return acc;
          const key = item.contact.city;
          if (!acc[key]) acc[key] = { city: item.contact.city, items: [] };
          acc[key].items.push(item);
          return acc;
        }, {})
      ).sort((a, b) => b.items.length - a.items.length || a.city.localeCompare(b.city))
    : [];
  const unresolvedImportItems = importSession ? importSession.items.filter((item) => item.status === "unresolved") : [];

  function renderImportReviewModal() {
    if (!importSession || !importSummary) return null;
    const importSourceLabel = getImportSourceLabel(importSession.source);

    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(22, 22, 19, 0.48)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
          zIndex: 280,
          backdropFilter: "blur(6px)",
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "min(1180px, 96vw)",
            maxHeight: "92vh",
            overflow: "auto",
            background: "#F7F5F0",
            borderRadius: 22,
            border: "1px solid #E0DDD7",
            boxShadow: "0 30px 80px rgba(0,0,0,0.18)",
          }}
        >
          <div style={{ padding: "22px 24px 18px", borderBottom: "1px solid #E0DDD7", display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#1A1A18" }}>{importSourceLabel} import review</div>
              <div style={{ fontSize: 13, color: "#666", marginTop: 6 }}>
                High and medium confidence guesses are previewed on the map now. Unresolved contacts stay off-map until you fix them.
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
                {[
                  { label: "Imported", value: importSummary.totalImported, color: "#1A1A18" },
                  { label: "Explicit", value: importSummary.explicitCount, color: "#1A1A18" },
                  { label: "High", value: importSummary.guessedHighCount, color: "#E8541A" },
                  { label: "Medium", value: importSummary.guessedMediumCount, color: "#C87400" },
                  { label: "Unresolved", value: importSummary.unresolvedCount, color: "#8B5E3C" },
                  { label: "Duplicates", value: importSummary.duplicateCount, color: "#888" },
                  { label: "Invalid", value: importSummary.invalidCount, color: "#888" },
                ].map((entry) => (
                  <span
                    key={entry.label}
                    style={{
                      padding: "6px 10px",
                      borderRadius: 999,
                      background: "white",
                      border: "1px solid #E0DDD7",
                      fontSize: 12,
                      fontWeight: 700,
                      color: entry.color,
                    }}
                  >
                    {entry.label}: {entry.value}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, flexWrap: "wrap" }}>
              <button onClick={dismissImportSession} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #E0DDD7", background: "white", color: "#666", fontSize: 14, cursor: "pointer" }}>
                Discard
              </button>
              <button onClick={commitImportSession} style={{ padding: "10px 16px", borderRadius: 10, border: "none", background: "#E8541A", color: "white", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                Import {importSummary.totalImported} contacts
              </button>
            </div>
          </div>

          <div style={{ padding: 24, display: "grid", gap: 18 }}>
            {guessedImportGroups.length > 0 && (
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#1A1A18", marginBottom: 10 }}>Guessed by city</div>
                <div style={{ display: "grid", gap: 14 }}>
                  {guessedImportGroups.map((group) => (
                    <div key={group.city} style={{ background: "white", border: "1px solid #E0DDD7", borderRadius: 16, overflow: "hidden" }}>
                      <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid #F0EDE8", display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                        <div>
                          <div style={{ fontSize: 18, fontWeight: 700, color: "#1A1A18" }}>{group.city}</div>
                          <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
                            {group.items.length} guessed contact{group.items.length === 1 ? "" : "s"}
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                          <input
                            value={importGroupDrafts[group.city] || ""}
                            onChange={(e) => setImportGroupDrafts((prev) => ({ ...prev, [group.city]: e.target.value }))}
                            placeholder="Move selected to city..."
                            style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #E0DDD7", background: "#F7F5F0", minWidth: 180 }}
                          />
                          <button onClick={() => acceptAllGuessesForCity(group.city)} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #E0DDD7", background: "white", color: "#1A1A18", cursor: "pointer" }}>
                            Accept all
                          </button>
                          <button onClick={() => moveSelectedGuessesToCity(group.city)} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #E0DDD7", background: "#F7F5F0", color: "#1A1A18", cursor: "pointer" }}>
                            Move selected
                          </button>
                          <button onClick={() => markSelectedGuessesUnresolved(group.city)} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #E0DDD7", background: "white", color: "#8B5E3C", cursor: "pointer" }}>
                            Mark unresolved
                          </button>
                        </div>
                      </div>
                      <div style={{ padding: 12, display: "grid", gap: 8 }}>
                        {group.items.map((item) => (
                          <div key={item.id} style={{ padding: 12, borderRadius: 12, background: item.reviewed ? "#FCFBF8" : "#F8F1E8", border: "1px solid #EEE7DE" }}>
                            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                              <input type="checkbox" checked={!!item.selected} onChange={() => toggleImportSelection(item.id)} style={{ marginTop: 4 }} />
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                                  <span style={{ fontSize: 14, fontWeight: 700, color: "#1A1A18" }}>{item.contact.name}</span>
                                  <span style={{ padding: "3px 8px", borderRadius: 999, fontSize: 11, fontWeight: 700, background: item.contact.guessConfidence === "high" ? "rgba(232,84,26,0.12)" : "rgba(200,116,0,0.12)", color: item.contact.guessConfidence === "high" ? "#E8541A" : "#9A6400" }}>
                                    {item.contact.guessConfidence === "high" ? "High confidence" : "Medium confidence"}
                                  </span>
                                  {item.reviewed && (
                                    <span style={{ padding: "3px 8px", borderRadius: 999, fontSize: 11, fontWeight: 700, background: "#EEF3E8", color: "#5D6F49" }}>
                                      Reviewed
                                    </span>
                                  )}
                                </div>
                                <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
                                  {[item.contact.company, item.contact.position].filter(Boolean).join(" - ") || "No company or title"}
                                </div>
                                <div style={{ fontSize: 12, color: "#888", marginTop: 6 }}>{item.contact.guessReason}</div>
                                {item.contact.guessCandidates.filter((candidate) => normalizeCityKey(candidate) !== normalizeCityKey(item.contact.city)).length > 0 && (
                                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
                                    {item.contact.guessCandidates
                                      .filter((candidate) => normalizeCityKey(candidate) !== normalizeCityKey(item.contact.city))
                                      .map((candidate) => (
                                        <button
                                          key={candidate}
                                          onClick={() => applyCandidateCityForItem(item.id, candidate)}
                                          style={{ padding: "5px 10px", borderRadius: 999, border: "1px solid #E0DDD7", background: "white", color: "#666", fontSize: 12, cursor: "pointer" }}
                                        >
                                          {candidate}
                                        </button>
                                      ))}
                                  </div>
                                )}
                                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
                                  <input
                                    value={importManualCityDrafts[item.id] || ""}
                                    onChange={(e) => setImportManualCityDrafts((prev) => ({ ...prev, [item.id]: e.target.value }))}
                                    placeholder="Set city manually"
                                    style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #E0DDD7", background: "white", minWidth: 180 }}
                                  />
                                  <button onClick={() => applyManualCityForItem(item.id)} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #E0DDD7", background: "#F7F5F0", cursor: "pointer" }}>
                                    Set city
                                  </button>
                                  <button
                                    onClick={() =>
                                      mutateImportItems(
                                        (currentItem) => currentItem.id === item.id,
                                        (currentItem) => toUnresolvedImportItem(currentItem, `Removed guessed city ${currentItem.contact.city} during review`)
                                      )
                                    }
                                    style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #E0DDD7", background: "white", color: "#8B5E3C", cursor: "pointer" }}
                                  >
                                    Mark unresolved
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#1A1A18", marginBottom: 10 }}>Unresolved queue</div>
              {unresolvedImportItems.length > 0 ? (
                <div style={{ display: "grid", gap: 10 }}>
                  {unresolvedImportItems.map((item) => (
                    <div key={item.id} style={{ padding: 14, borderRadius: 14, background: "white", border: "1px solid #E0DDD7" }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#1A1A18" }}>{item.contact.name}</div>
                      <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
                        {[item.contact.company, item.contact.position].filter(Boolean).join(" - ") || "No company or title"}
                      </div>
                      <div style={{ fontSize: 12, color: "#888", marginTop: 8 }}>{item.contact.guessReason || "No city guess available yet"}</div>
                      {item.contact.guessCandidates.length > 0 && (
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
                          {item.contact.guessCandidates.map((candidate) => (
                            <button
                              key={candidate}
                              onClick={() => applyCandidateCityForItem(item.id, candidate)}
                              style={{ padding: "5px 10px", borderRadius: 999, border: "1px solid #E0DDD7", background: "#F7F5F0", color: "#666", fontSize: 12, cursor: "pointer" }}
                            >
                              {candidate}
                            </button>
                          ))}
                        </div>
                      )}
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
                        <input
                          value={importManualCityDrafts[item.id] || ""}
                          onChange={(e) => setImportManualCityDrafts((prev) => ({ ...prev, [item.id]: e.target.value }))}
                          placeholder="Type a city manually"
                          style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #E0DDD7", background: "#F7F5F0", minWidth: 200 }}
                        />
                        <button onClick={() => applyManualCityForItem(item.id)} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #E0DDD7", background: "white", cursor: "pointer" }}>
                          Set city
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ padding: "14px 16px", borderRadius: 14, background: "white", border: "1px solid #E0DDD7", fontSize: 13, color: "#666" }}>
                  No unresolved contacts in this import batch.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === "landing") {
    return (
      <div
        style={{
          minHeight: "100vh",
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
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

              {hasMappedContacts && (
                <button onClick={() => setView("map")}
                  style={{
                    marginBottom: 16, width: "100%", padding: "14px", borderRadius: 10, border: "none",
                    background: "#E8541A", color: "white", fontSize: 16, fontWeight: 700, cursor: "pointer",
                  }}
                >
                  Open full map: {geoContacts.length} contacts in {Object.keys(cityGroups).length} cities
                </button>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button
                  onClick={() => toggleLandingGuide("google")}
                  style={{
                    padding: "14px 20px", borderRadius: 12, border: "1px solid",
                    borderColor: showGoogleGuide ? "#4285F4" : "#E0DDD7",
                    background: showGoogleGuide ? "rgba(66,133,244,0.06)" : "white",
                    color: "#1A1A18",
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
                    <div>Upload Google Contacts CSV</div>
                    <div style={{ fontSize: 11, color: "#AAA" }}>How do I get this?</div>
                  </div>
                  <span style={{ fontSize: 16, color: "#AAA" }}>{showGoogleGuide ? "^" : "v"}</span>
                </button>
                {showGoogleGuide && (
                  <div style={{
                    background: "rgba(66,133,244,0.04)", border: "1px solid rgba(66,133,244,0.15)",
                    borderRadius: 12, padding: "14px 16px", display: "grid", gap: 10,
                  }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#1A1A18" }}>Get your Google Contacts CSV</div>
                    <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>1. Open Google Contacts.</div>
                    <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>2. Click the export icon in the upper-right toolbar.</div>
                    <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>3. Choose <strong>Google CSV</strong> in the export modal.</div>
                    <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>4. Export the file, then upload it here.</div>
                    <button onClick={() => googleCsvInputRef.current?.click()} style={{ marginTop: 2, padding: "8px 14px", borderRadius: 8, border: "none", background: "linear-gradient(135deg, #4285F4, #1A73E8)", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", width: "fit-content" }}>
                      Upload Google CSV
                    </button>
                  </div>
                )}
                <input ref={googleCsvInputRef} type="file" accept=".csv" style={{ display: "none" }} onChange={handleGoogleCsvUpload} />

                <button
                  onClick={() => toggleLandingGuide("outlook")}
                  style={{
                    padding: "14px 20px", borderRadius: 12, border: "1px solid",
                    borderColor: showOutlookGuide ? "#0078D4" : "#E0DDD7",
                    background: showOutlookGuide ? "rgba(0,120,212,0.06)" : "white",
                    color: "#1A1A18",
                    fontSize: 15, fontWeight: 500, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 12,
                  }}
                >
                  <span style={{ width: 30, height: 30, borderRadius: 7, background: "white", border: "1px solid #D6E6F5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 5.5h9.2c.44 0 .8.36.8.8v11.4c0 .44-.36.8-.8.8H4.8c-.44 0-.8-.36-.8-.8V6.3c0-.44.36-.8.8-.8z" fill="#0A5FB4"/>
                      <path d="M13 7.2h7c.55 0 1 .45 1 1v8.6c0 .55-.45 1-1 1h-7z" fill="#0078D4"/>
                      <path d="M13 8.3l4 3 4-3" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M13 16.8l3.1-2.6M21 16.8l-3.1-2.6" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                      <rect x="5.4" y="7.2" width="6" height="9.6" rx="1.1" fill="#185ABD"/>
                      <path d="M8.35 9.3c1.65 0 2.8 1.25 2.8 2.98 0 1.77-1.15 3.02-2.86 3.02H6.7V9.3zm-.14 1.37H8.1c.8 0 1.37.62 1.37 1.61 0 .96-.56 1.65-1.34 1.65h-.12z" fill="white"/>
                    </svg>
                  </span>
                  <div style={{ textAlign: "left", flex: 1 }}>
                    <div>Upload Outlook CSV</div>
                    <div style={{ fontSize: 11, color: "#AAA" }}>How do I get this?</div>
                  </div>
                  <span style={{ fontSize: 16, color: "#AAA" }}>{showOutlookGuide ? "^" : "v"}</span>
                </button>
                {showOutlookGuide && (
                  <div style={{
                    background: "rgba(0,120,212,0.04)", border: "1px solid rgba(0,120,212,0.15)",
                    borderRadius: 12, padding: "14px 16px", display: "grid", gap: 10,
                  }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#1A1A18" }}>Get your Outlook contacts CSV</div>
                    <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>1. Open Outlook People / Contacts.</div>
                    <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>2. Click <strong>Manage contacts</strong> in the top-right toolbar.</div>
                    <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>3. Choose <strong>Export contacts</strong>.</div>
                    <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>4. Confirm the export, then upload the CSV here.</div>
                    <button onClick={() => outlookCsvInputRef.current?.click()} style={{ marginTop: 2, padding: "8px 14px", borderRadius: 8, border: "none", background: "linear-gradient(135deg, #0078D4, #0A5FB4)", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", width: "fit-content" }}>
                      Upload Outlook CSV
                    </button>
                  </div>
                )}
                <input ref={outlookCsvInputRef} type="file" accept=".csv" style={{ display: "none" }} onChange={handleOutlookCsvUpload} />

                <button
                  onClick={() => toggleLandingGuide("linkedin")}
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
                  <span style={{ fontSize: 16, color: "#AAA" }}>{showLinkedInGuide ? "^" : "v"}</span>
                </button>

                {showLinkedInGuide && (
                  <div style={{
                    background: "rgba(10,102,194,0.04)", border: "1px solid rgba(10,102,194,0.15)",
                    borderRadius: 12, padding: "16px", display: "grid", gap: 10,
                  }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#1A1A18" }}>Get your LinkedIn connections CSV</div>
                    <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>1. Open LinkedIn Settings & Privacy.</div>
                    <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>2. Go to Data privacy > Download your data.</div>
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
                <button onClick={loadDemoData} style={{ padding: "8px 18px", borderRadius: 99, border: "1px solid #E8541A", background: "rgba(232,84,26,0.08)", color: "#E8541A", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Load sample contacts</button>
                <button onClick={() => importInputRef.current?.click()} style={{ padding: "8px 18px", borderRadius: 99, border: "1px solid #E0DDD7", background: "transparent", color: "#888", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>Import saved session</button>
                <input ref={importInputRef} type="file" accept=".json" style={{ display: "none" }} onChange={handleImport} />
              </div>

              <div style={{ marginTop: 28, padding: "12px 16px", borderRadius: 10, background: "#EDE9E0", border: "1px solid #E0DDD7" }}>
                <div style={{ fontSize: 12, color: "#888", lineHeight: 1.6 }}>
                  <span style={{ color: "#E8541A", fontWeight: 600 }}>Privacy-first.</span> All data stays in your browser. No accounts, no cookies, no servers. Export JSON to save.
                </div>
              </div>

              {hasDemoContactsLoaded && !hasNonDemoContactsLoaded && !importSession && (
                <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 10, background: "#FFF7ED", border: "1px solid #F4C99A", fontSize: 12, color: "#9A6400", lineHeight: 1.5 }}>
                  Sample data loaded. These contacts are fictional demo records, not imported contacts.
                </div>
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
                {!hasImportedData && (
                  <div style={{
                    position: "absolute", top: 14, left: 14, zIndex: 5,
                    padding: "5px 12px", borderRadius: 6,
                    background: "rgba(247,245,240,0.9)",
                    border: "1px solid #E0DDD7",
                    fontSize: 11, color: "#666", fontWeight: 600,
                  }}>
                    Sample contacts preview
                  </div>
                )}
                {hasImportedData && (
                  <div style={{
                    position: "absolute", top: 14, left: 14, zIndex: 5,
                    padding: "5px 12px", borderRadius: 6,
                    background: "rgba(247,245,240,0.9)",
                    border: hasMappedContacts ? "1px solid #E8541A" : "1px solid #E0DDD7",
                    fontSize: 11, color: hasMappedContacts ? "#E8541A" : "#666", fontWeight: 600,
                  }}>
                    {hasMappedContacts
                      ? `${geoContacts.length} contacts - ${Object.keys(cityGroups).length} cities`
                      : `${importSession?.items.length || contacts.length} contacts loaded`}
                  </div>
                )}

                {/* Zoom controls */}
                <div style={{ position: "absolute", bottom: 14, right: 14, zIndex: 5, display: "flex", flexDirection: "column", gap: 3 }}>
                  <button onClick={() => setPreviewZoom((z) => Math.min(16, z + 0.5))}
                    style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid #E0DDD7", background: "rgba(247,245,240,0.9)", color: "#1A1A18", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                  <button onClick={() => setPreviewZoom((z) => Math.max(1, z - 0.5))}
                    style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid #E0DDD7", background: "rgba(247,245,240,0.9)", color: "#1A1A18", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>-</button>
                  <button onClick={() => { setPreviewCenter({ lat: 35, lng: -30 }); setPreviewZoom(2.2); }}
                    style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid #E0DDD7", background: "rgba(247,245,240,0.9)", color: "#1A1A18", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>Reset</button>
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
                    return (
                      <g key={i}
                        transform={`translate(${x} ${y})`}
                        onClick={() => {
                          if (hasMappedContacts) {
                            const cityGroup = Object.values(cityGroups).find((g) => g.city === dot.city);
                            setView("map");
                            if (cityGroup) toggleCitySelection(cityGroup);
                            setMapCenter({ lat: dot.lat, lng: dot.lng });
                            setMapZoom(6);
                          }
                        }}
                        style={{ cursor: hasMappedContacts ? "pointer" : "default" }}
                      >
                        <circle cx={0} cy={0} r={r + 6} fill="none" stroke="#E8541A" strokeWidth="1" opacity="0">
                          <animate attributeName="r" from={r + 2} to={r + 16} dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite" />
                        </circle>
                        {/* Main dot */}
                        <circle cx={0} cy={0} r={r}
                          fill="#E8541A"
                          opacity={0.9}
                          stroke="#C84010"
                          strokeWidth={1.5}
                        />
                        {/* Count */}
                        <text x={0} y={1} textAnchor="middle" dominantBaseline="central"
                          fill="white"
                          fontSize={dot.count > 9 ? 9 : 10} fontWeight="700"
                          fontFamily="'DM Sans', sans-serif"
                        >
                          {dot.count}
                        </text>
                        {/* Label */}
                        {(previewZoom > 2.5 || !hasMappedContacts) && (
                          <g style={{ opacity: 1, transition: "opacity 0.6s" }}>
                            <text x={0} y={-r - 8} textAnchor="middle" dominantBaseline="central"
                              fill="#1A1A18" fontSize="10" fontWeight="600"
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
                  {!hasImportedData && (
                    <g>
                      <text x={PREVIEW_W / 2} y={PREVIEW_H - 30} textAnchor="middle"
                        fill="#888" fontSize="13" fontFamily="'DM Sans', sans-serif" fontWeight="500"
                      >
                        Showing sample contacts until you load real ones
                      </text>
                    </g>
                  )}
                </svg>
              </div>
            </div>
          </div>
        </div>

        {renderImportReviewModal()}

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
  const SIDEBAR_WIDTH = 420;
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
          <DebouncedTextInput
            value={searchQuery}
            onCommit={setSearchQuery}
            onDraftChange={() => setSearchActiveIndex(0)}
            placeholder="Search city, person, company, or tag..."
            style={{
              width: "100%", padding: "8px 12px 8px 36px", borderRadius: 8,
              border: "1px solid #E0DDD7", background: "white",
              color: "#1A1A18", fontSize: 14, outline: "none", boxSizing: "border-box",
            }}
            onFocus={(e) => e.target.style.borderColor = "#E8541A"}
            onBlur={(e) => { setTimeout(() => { setSearchQuery(""); setSearchActiveIndex(-1); }, 200); e.target.style.borderColor = "#E0DDD7"; }}
            onKeyDown={(e) => {
              if (!searchResults.length) {
                if (e.key === "Escape") {
                  setSearchQuery("");
                  setSearchActiveIndex(-1);
                }
                return;
              }
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setSearchActiveIndex((prev) => (prev < 0 ? 0 : Math.min(prev + 1, searchResults.length - 1)));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSearchActiveIndex((prev) => (prev <= 0 ? 0 : prev - 1));
              } else if (e.key === "Enter") {
                e.preventDefault();
                selectSearchResult(searchResults[Math.max(searchActiveIndex, 0)] || searchResults[0]);
              } else if (e.key === "Escape") {
                e.preventDefault();
                setSearchQuery("");
                setSearchActiveIndex(-1);
              }
            }}
          />
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#AAA" }}>S</span>
          {searchResults.length > 0 && (
            <div style={{
              position: "absolute", top: "100%", left: 0, right: 0, marginTop: 4,
              background: "white", borderRadius: 8, border: "1px solid #E0DDD7",
              maxHeight: 200, overflow: "auto", zIndex: 30,
            }}>
              {searchResults.map((g, i) => (
                <div
                  key={g.key || i}
                  onClick={() => selectSearchResult(g)}
                  style={{
                    padding: "10px 14px", cursor: "pointer", display: "flex", justifyContent: "space-between",
                    borderBottom: i < searchResults.length - 1 ? "1px solid #F0EDE8" : "none",
                    background: i === searchActiveIndex ? "rgba(232,84,26,0.08)" : "transparent",
                    gap: 12,
                  }}
                  onMouseEnter={() => setSearchActiveIndex(i)}
                >
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 14, color: "#1A1A18", fontWeight: g.type === "contact" || g.type === "unresolved_contact" ? 600 : 500 }}>
                      {g.title}
                    </div>
                    <div style={{ fontSize: 12, color: "#AAA", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{g.subtitle}</div>
                  </div>
                  <span style={{ fontSize: 11, color: g.type === "unresolved_contact" ? "#E8541A" : "#AAA", fontWeight: g.type === "unresolved_contact" ? 700 : 500, flexShrink: 0 }}>
                    {g.type === "city" ? "City" : g.type === "destination" ? "Destination" : g.type === "unresolved_contact" ? "Unresolved" : "Contact"}
                  </span>
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
          <button onClick={loadDemoData} style={{ ...pillBtnStyle, color: "#E8541A" }}>Sample contacts</button>
          <button onClick={clearAllContacts} style={{ ...pillBtnStyle, color: "#8B5E3C" }}>Clear</button>
        </div>
        <input ref={fileInputRef} type="file" accept=".csv" style={{ display: "none" }} onChange={handleFileUpload} />
        <input ref={importInputRef} type="file" accept=".json" style={{ display: "none" }} onChange={handleImport} />
      </div>

      {hasDemoContactsLoaded && !hasNonDemoContactsLoaded && !importSession && (
        <div style={{ padding: "8px 20px", background: "#FFF7ED", borderBottom: "1px solid #F4C99A", fontSize: 12, color: "#9A6400" }}>
          Sample data loaded. These contacts are fictional demo records and will be removed when you import real data.
        </div>
      )}

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
            <button onClick={() => { setMapCenter({ lat: 20, lng: 15 }); setMapZoom(1.3); }} style={{ ...zoomBtnStyle, fontSize: 12 }}>Reset</button>
          </div>

          {!showTripPlanner && (
            <button
              onClick={() => {
                setShowUnresolvedEditor(false);
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

          {/* Stats + unresolved editor dock */}
          <div style={{
            position: "absolute", bottom: 20, left: 20, zIndex: 16,
            display: "grid", gap: 10, alignItems: "flex-start",
          }}>
            {showUnresolvedEditor && unresolvedCommittedContacts.length > 0 && (
              <div style={{
                width: isUnresolvedEditorExpanded ? "min(960px, calc(100vw - 32px))" : 560,
                maxWidth: isUnresolvedEditorExpanded ? "calc(100vw - 32px)" : "min(560px, calc(100vw - 32px))",
                height: isUnresolvedEditorExpanded ? "min(820px, calc(100vh - 56px))" : "min(640px, calc(100vh - 120px))",
                minWidth: "min(560px, calc(100vw - 32px))",
                minHeight: 420,
                background: "rgba(247,245,240,0.97)",
                border: "1px solid #E0DDD7",
                borderRadius: 16,
                boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
                backdropFilter: "blur(12px)",
                overflow: "hidden",
                display: "grid",
                gridTemplateRows: "auto auto 1fr",
                resize: "both",
              }}
              onMouseDown={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              onWheelCapture={(e) => e.stopPropagation()}
              >
                <div style={{ padding: "14px 16px 12px", borderBottom: "1px solid #E0DDD7", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#1A1A18" }}>Unresolved contacts</div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
                      {visibleUnresolvedContacts.length} unresolved contact{visibleUnresolvedContacts.length === 1 ? "" : "s"}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    <button
                      onClick={() => setIsUnresolvedEditorExpanded((prev) => !prev)}
                      style={{ width: 30, height: 30, borderRadius: 8, border: "1px solid #E0DDD7", background: "white", color: "#888", fontSize: 14, cursor: "pointer" }}
                      title={isUnresolvedEditorExpanded ? "Restore size" : "Expand"}
                    >
                      {isUnresolvedEditorExpanded ? "-" : "+"}
                    </button>
                    <button
                      onClick={() => setShowUnresolvedEditor(false)}
                      style={{ width: 30, height: 30, borderRadius: 8, border: "1px solid #E0DDD7", background: "white", color: "#888", fontSize: 16, cursor: "pointer" }}
                    >
                      X
                    </button>
                  </div>
                </div>
                <div style={{ padding: "12px 16px", borderBottom: "1px solid #EAE4DB", display: "grid", gap: 10 }}>
                  <DebouncedTextInput
                    value={unresolvedSearchQuery}
                    onCommit={setUnresolvedSearchQuery}
                    placeholder="Search unresolved by name, company, title, or note"
                    style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", borderRadius: 10, border: "1px solid #E0DDD7", background: "white", color: "#1A1A18", fontSize: 13 }}
                  />
                  
                </div>
                <div
                  style={{ padding: "12px 16px", borderBottom: "1px solid #EAE4DB", background: "#FBFAF7" }}
                >
                  
                  <div style={{ fontSize: 12, color: "#888" }}>
                    {unresolvedCompanyGroups.length} compan{unresolvedCompanyGroups.length === 1 ? "y" : "ies"} • {unresolvedFilteredContacts.length} visible contact{unresolvedFilteredContacts.length === 1 ? "" : "s"}
                  </div>
                </div>
                <div
                  style={{ overflow: "auto", padding: 12, display: "grid", gap: 12 }}
                  onWheel={(e) => e.stopPropagation()}
                  onWheelCapture={(e) => e.stopPropagation()}
                >
                  {unresolvedCompanyGroups.length > 0 ? (
                    <div style={{ display: "grid", gridTemplateColumns: "220px minmax(0, 1fr)", gap: 12, minHeight: 0, height: "100%" }}>
                      <div
                        style={{ borderRadius: 14, background: "white", border: "1px solid #E0DDD7", overflow: "auto" }}
                        onWheel={(e) => e.stopPropagation()}
                        onWheelCapture={(e) => e.stopPropagation()}
                      >
                        {unresolvedCompanyGroups.map((group, index) => {
                          const isSelectedGroup = selectedUnresolvedCompany && selectedUnresolvedCompany.key === group.key;
                          return (
                            <button
                              key={group.key}
                              onClick={() => setSelectedUnresolvedCompanyKey(group.key)}
                              style={{
                                width: "100%",
                                padding: "12px 14px",
                                border: "none",
                                borderBottom: index < unresolvedCompanyGroups.length - 1 ? "1px solid #F0EDE8" : "none",
                                background: isSelectedGroup ? "rgba(232,84,26,0.08)" : "white",
                                cursor: "pointer",
                                textAlign: "left",
                                color: "#1A1A18",
                              }}
                            >
                              <div style={{ fontSize: 14, fontWeight: 700 }}>{group.label}</div>
                              <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
                                {group.contacts.length} unresolved contact{group.contacts.length === 1 ? "" : "s"}
                              </div>
                              <div style={{ fontSize: 12, color: "#666", marginTop: 6, lineHeight: 1.45 }}>
                                {group.contacts.slice(0, 3).map((contact) => contact.name).join(" • ")}
                                {group.contacts.length > 3 ? ` +${group.contacts.length - 3} more` : ""}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      <div
                        style={{ borderRadius: 14, background: "white", border: "1px solid #E0DDD7", overflow: "auto", minWidth: 0 }}
                        onWheel={(e) => e.stopPropagation()}
                        onWheelCapture={(e) => e.stopPropagation()}
                      >
                        {selectedUnresolvedCompany ? (
                          <>
                            <div style={{ padding: "12px 14px", borderBottom: "1px solid #F0EDE8", display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
                              <div style={{ minWidth: 0 }}>
                                <div style={{ fontSize: 15, fontWeight: 700, color: "#1A1A18" }}>{selectedUnresolvedCompany.label}</div>
                                <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
                                  {selectedUnresolvedCompany.contacts.length} unresolved contact{selectedUnresolvedCompany.contacts.length === 1 ? "" : "s"}
                                </div>
                                <div style={{ fontSize: 12, color: "#666", marginTop: 6, lineHeight: 1.45 }}>
                                  {selectedUnresolvedCompany.contacts.slice(0, 3).map((contact) => contact.name).join(" • ")}
                                  {selectedUnresolvedCompany.contacts.length > 3 ? ` +${selectedUnresolvedCompany.contacts.length - 3} more` : ""}
                                </div>
                              </div>
                              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                <button
                                  onClick={() => openSearchUrl(buildCompanySearchQueries(selectedUnresolvedCompany).google)}
                                  style={{ padding: "8px 10px", borderRadius: 999, border: "1px solid #E0DDD7", background: "white", color: "#1A1A18", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                                >
                                  Google
                                </button>
                                <button
                                  onClick={() => openSearchUrl(buildCompanySearchQueries(selectedUnresolvedCompany).linkedin)}
                                  style={{ padding: "8px 10px", borderRadius: 999, border: "1px solid #E0DDD7", background: "white", color: "#1A1A18", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                                >
                                  LinkedIn
                                </button>
                              </div>
                            </div>
                            <div style={{ padding: "12px 14px", borderBottom: "1px solid #F0EDE8", background: "#FBFAF7" }}>
                              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                <input
                                  value={unresolvedCompanyCityDraft}
                                  onChange={(e) => setUnresolvedCompanyCityDraft(e.target.value)}
                                  placeholder={`Set city for ${selectedUnresolvedCompany.contacts.length} contact${selectedUnresolvedCompany.contacts.length === 1 ? "" : "s"} at ${selectedUnresolvedCompany.label}`}
                                  style={{ flex: "1 1 260px", padding: "9px 11px", borderRadius: 10, border: "1px solid #E0DDD7", background: "white", color: "#1A1A18", fontSize: 13 }}
                                />
                                <button
                                  onClick={applySelectedCompanyUnresolvedCity}
                                  style={{ padding: "9px 12px", borderRadius: 10, border: "1px solid #E0DDD7", background: "white", color: "#1A1A18", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                                >
                                  Set company
                                </button>
                              </div>
                            </div>
                            <div style={{ display: "grid", gap: 8, padding: 10 }}>
                              {selectedUnresolvedCompany.contacts.map((contact) => {
                                const contactKey = getPersistentContactKey(contact);
                                return (
                                  <div key={contactKey} style={{ padding: 12, borderRadius: 12, background: "#FCFBF8", border: "1px solid #EEE7DE" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-start" }}>
                                      <div style={{ minWidth: 0 }}>
                                        <div style={{ fontSize: 14, fontWeight: 700, color: "#1A1A18" }}>{contact.name}</div>
                                        <div style={{ fontSize: 12, color: "#666", marginTop: 4, lineHeight: 1.45 }}>
                                          {[contact.company, contact.position].filter(Boolean).join(" - ") || "No company or title"}
                                        </div>
                                      </div>
                                      {contact.source && (
                                        <span style={{ padding: "3px 8px", borderRadius: 999, fontSize: 10, fontWeight: 700, background: `${SOURCE_COLORS[contact.source]}15`, color: SOURCE_COLORS[contact.source], flexShrink: 0 }}>
                                          {SOURCE_LABELS[contact.source]}
                                        </span>
                                      )}
                                    </div>
                                    {!!contact.guessReason && (
                                      <div style={{ fontSize: 11, color: "#888", marginTop: 8, lineHeight: 1.45 }}>
                                        {contact.guessReason}
                                      </div>
                                    )}
                                    {contact.guessCandidates.length > 0 && (
                                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                                        {contact.guessCandidates.map((candidate) => (
                                          <button
                                            key={candidate}
                                            onClick={() => {
                                              const manualContact = applyManualCityToContactByKey(contactKey, candidate, "City picked from unresolved suggestions");
                                              if (!manualContact) {
                                                showToast("That candidate city couldn't be resolved locally", "warn");
                                                return;
                                              }
                                              if (selectedContactProfile && getPersistentContactKey(selectedContactProfile) === contactKey) {
                                                setSelectedContactProfile(manualContact);
                                                setProfileCityDraft(manualContact.city);
                                              }
                                              setUnresolvedCityDrafts((prev) => ({ ...prev, [contactKey]: "" }));
                                              showToast(`Set city to ${manualContact.city}`);
                                            }}
                                            style={{ padding: "4px 9px", borderRadius: 999, border: "1px solid #E0DDD7", background: "#F7F5F0", color: "#666", fontSize: 11, cursor: "pointer" }}
                                          >
                                            {candidate}
                                          </button>
                                        ))}
                                      </div>
                                    )}
                                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
                                      <input
                                        value={unresolvedCityDrafts[contactKey] || ""}
                                        onChange={(e) => setUnresolvedCityDrafts((prev) => ({ ...prev, [contactKey]: e.target.value }))}
                                        placeholder="Type a city"
                                        style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #E0DDD7", background: "#F7F5F0", minWidth: 180, flex: "1 1 180px" }}
                                      />
                                      <button
                                        onClick={() => applyManualCityToUnresolvedContact(contactKey)}
                                        style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #E0DDD7", background: "white", color: "#1A1A18", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                                      >
                                        Set city
                                      </button>
                                      <button
                                        onClick={() => openSearchUrl(buildContactSearchQueries(contact).google)}
                                        style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #E0DDD7", background: "white", color: "#1A1A18", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                                      >
                                        Google
                                      </button>
                                      <button
                                        onClick={() => openSearchUrl(buildContactSearchQueries(contact).linkedin)}
                                        style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #E0DDD7", background: "white", color: "#1A1A18", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                                      >
                                        LinkedIn
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        ) : (
                          <div style={{ padding: "14px 12px", fontSize: 13, color: "#666" }}>
                            Select a company to review its unresolved contacts.
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div style={{ padding: "14px 12px", borderRadius: 10, background: "white", border: "1px solid #E0DDD7", fontSize: 13, color: "#666" }}>
                      No unresolved contacts match this search.
                    </div>
                  )}
                </div>
              </div>
            )}
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{
                padding: "8px 16px", borderRadius: 8, background: "rgba(247,245,240,0.9)",
                border: "1px solid #E0DDD7",
                fontSize: 13, color: "#888", display: "flex", gap: 16,
                backdropFilter: "blur(8px)",
              }}>
                <span><strong style={{ color: "#E8541A" }}>{geoContacts.length}</strong> contacts</span>
                <span><strong style={{ color: "#E8541A" }}>{Object.keys(cityGroups).length}</strong> cities</span>
              </div>
              {unresolvedCommittedContacts.length > 0 && (
                <button
                  onClick={() => {
                    setShowTripPlanner(false);
                    setShowUnresolvedEditor((prev) => !prev);
                  }}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 8,
                    border: "1px solid #E0DDD7",
                    background: showUnresolvedEditor ? "rgba(232,84,26,0.08)" : "rgba(247,245,240,0.9)",
                    color: showUnresolvedEditor ? "#E8541A" : "#1A1A18",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <strong style={{ color: "#E8541A" }}>{unresolvedCommittedContacts.length}</strong>
                  unresolved
                </button>
              )}
            </div>
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
                  X
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
            width: 392, background: "white", borderLeft: "1px solid #E0DDD7",
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
                    X
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
                                <div style={{ fontSize: 12, color: "#AAA" }}>{[contact.city, contact.company].filter(Boolean).join(" - ")}</div>
                                <div style={{ fontSize: 12, color: "#E8541A", marginTop: 4 }}>{Math.round(contact.distanceKm)} km - {getDistanceBand(contact.distanceKm)}</div>
                              </div>
                              <span style={{ padding: "2px 8px", borderRadius: 4, fontSize: 10, fontWeight: 600, background: `${SOURCE_COLORS[contact.source]}15`, color: SOURCE_COLORS[contact.source], flexShrink: 0 }}>
                                {SOURCE_LABELS[contact.source]}
                              </span>
                            </div>
                            {(contact.position || (contact.tags || []).length) && (
                              <div style={{ fontSize: 12, color: "#666", marginLeft: 68 }}>
                                {[contact.position, ...(contact.tags || []).map((tag) => `#${tag}`)].filter(Boolean).join(" - ")}
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
            ) : sidebarMode === "city" && activeSelectedCity ? (
            <>
            <div style={{
              padding: "20px 20px 16px", borderBottom: "1px solid #E0DDD7",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: "#1A1A18" }}>{activeSelectedCity.city}</h2>
                <span style={{ fontSize: 13, color: "#AAA" }}>
                  {visibleCityContacts.length} contact{visibleCityContacts.length !== 1 ? "s" : ""}
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
                X
              </button>
            </div>

            <div style={{ padding: "12px 12px 0" }}>
              <DebouncedTextInput
                value={citySearchQuery}
                onCommit={setCitySearchQuery}
                placeholder={`Search ${activeSelectedCity.city} by name, company, or role`}
                style={{ width: "100%", boxSizing: "border-box", padding: "11px 12px", borderRadius: 10, border: "1px solid #E0DDD7", background: "white", color: "#1A1A18", fontSize: 13 }}
              />
            </div>
            <div style={{ padding: "8px 12px 14px" }}>
              {visibleCityContacts.length > 0 ? visibleCityContacts.map((c, i) => (
                <div
                  key={i}
                  style={{
                    padding: "12px 10px",
                    borderRadius: 10,
                    marginBottom: 2,
                    transition: "background 0.15s, border-color 0.15s",
                    cursor: "default",
                    border: "1px solid transparent",
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    togglePinnedContactByKey(getPersistentContactKey(c));
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#F7F5F0"; e.currentTarget.style.borderColor = "#EAE4DB"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "transparent"; }}
                  title="Right-click to pin to the top of this city"
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <button onClick={() => openContactProfile(c)} style={{
                      width: 46, height: 46, padding: 0, borderRadius: 99,
                      background: `${SOURCE_COLORS[c.source]}18`,
                      border: `1.5px solid ${SOURCE_COLORS[c.source]}50`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 15, fontWeight: 700, color: SOURCE_COLORS[c.source],
                      flexShrink: 0, overflow: "hidden", cursor: "pointer",
                    }}>
                      {getAvatarSrc(c, 128) ? (
                        <img src={getAvatarSrc(c, 128)} alt="" style={{ width: "100%", height: "100%", display: "block", borderRadius: 99 }} />
                      ) : (
                        c.name.charAt(0)
                      )}
                    </button>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <button onClick={() => openContactProfile(c)} style={{ padding: 0, border: "none", background: "transparent", fontWeight: 700, fontSize: 17, lineHeight: 1.15, color: "#1A1A18", cursor: "pointer", textAlign: "left", flex: 1, minWidth: 0 }}>{c.name}</button>
                        {c.pinned && (
                          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#E8541A", flexShrink: 0 }} title="Pinned to top of city">
                            <PinGlyph filled color="#E8541A" size={14} />
                          </span>
                        )}
                        <span style={{
                          padding: "3px 8px", borderRadius: 999, fontSize: 10, fontWeight: 700,
                          background: `${SOURCE_COLORS[c.source]}15`, color: SOURCE_COLORS[c.source],
                          flexShrink: 0,
                        }}>
                          {SOURCE_LABELS[c.source]}
                        </span>
                      </div>
                      {c.company && (
                        <div style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#444",
                          lineHeight: 1.35,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          marginBottom: c.position ? 2 : 0,
                        }}>
                          {c.company}
                        </div>
                      )}
                      {c.position && (
                        <div style={{
                          fontSize: 13,
                          color: "#666",
                          lineHeight: 1.4,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}>
                          {c.position}
                        </div>
                      )}
                      {c.citySource === "inferred_company" && c.guessConfidence && (
                        <div style={{ fontSize: 11, color: c.guessConfidence === "high" ? "#E8541A" : "#9A6400", fontWeight: 600, marginTop: 6 }}>
                          {c.guessConfidence === "high" ? "Guessed location" : "Medium-confidence guess"}
                        </div>
                      )}
                    </div>
                  </div>
                  {c.note && (
                    <div style={{ fontSize: 12, color: "#777", marginLeft: 56, marginTop: 8, fontStyle: "italic", lineHeight: 1.5 }}>
                      "{c.note}"
                    </div>
                  )}
                  {(c.tags || []).length > 0 && (
                    <div style={{ marginLeft: 56, marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {c.tags.map((tag) => (
                        <span key={tag} style={{ padding: "3px 8px", borderRadius: 999, fontSize: 11, fontWeight: 600, background: "#F0EDE8", color: "#666" }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )) : (
                <div style={{ padding: "14px 12px", borderRadius: 10, background: "#F7F5F0", border: "1px solid #E0DDD7", fontSize: 13, color: "#888" }}>
                  No contacts in {activeSelectedCity.city} match this search.
                </div>
              )}
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
                    X
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
                          {hub.contacts.slice(0, 3).map((contact) => contact.name).join(" - ")}
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

      {renderImportReviewModal()}

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
                  <div style={{ fontSize: 14, color: "#666", marginTop: 6 }}>{[selectedContactProfile.position, selectedContactProfile.company].filter(Boolean).join(" - ") || selectedContactProfile.city}</div>
                  {selectedContactProfile.city && <div style={{ fontSize: 13, color: "#AAA", marginTop: 4 }}>{selectedContactProfile.city}</div>}
                </div>
              </div>
              <button
                onClick={() => setSelectedContactProfile(null)}
                style={{ width: 34, height: 34, borderRadius: 10, border: "1px solid #E0DDD7", background: "transparent", color: "#AAA", fontSize: 18, cursor: "pointer", flexShrink: 0 }}
              >
                X
              </button>
            </div>
            <div style={{ padding: 22, display: "grid", gap: 14 }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {selectedContactProfile.city && (
                  <button
                    onClick={() => togglePinnedContactByKey(getPersistentContactKey(selectedContactProfile))}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 999,
                      border: `1px solid ${selectedContactProfile.pinned ? "#E8541A" : "#E0DDD7"}`,
                      background: selectedContactProfile.pinned ? "rgba(232,84,26,0.10)" : "white",
                      color: selectedContactProfile.pinned ? "#E8541A" : "#666",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    title={selectedContactProfile.pinned ? "Unpin from top of city" : "Pin to top of city"}
                  >
                    <PinGlyph filled={selectedContactProfile.pinned} color={selectedContactProfile.pinned ? "#E8541A" : "#888"} size={14} />
                  </button>
                )}
                <span style={{ padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700, background: `${SOURCE_COLORS[selectedContactProfile.source]}15`, color: SOURCE_COLORS[selectedContactProfile.source] }}>
                  {SOURCE_LABELS[selectedContactProfile.source]}
                </span>
                {selectedContactProfile.citySource === "inferred_company" && (
                  <span style={{ padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700, background: selectedContactProfile.guessConfidence === "high" ? "rgba(232,84,26,0.12)" : "rgba(200,116,0,0.12)", color: selectedContactProfile.guessConfidence === "high" ? "#E8541A" : "#9A6400" }}>
                    {selectedContactProfile.guessConfidence === "high" ? "Guessed: high confidence" : "Guessed: medium confidence"}
                  </span>
                )}
                {selectedContactProfile.citySource === "manual" && selectedContactProfile.source === "linkedin" && (
                  <span style={{ padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700, background: "#EEF3E8", color: "#5D6F49" }}>
                    Manually placed
                  </span>
                )}
                {(selectedContactProfile.tags || []).map((tag) => (
                  <span key={tag} style={{ padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700, background: "#F0EDE8", color: "#666" }}>
                    #{tag}
                  </span>
                ))}
              </div>
              {selectedContactProfile.guessReason && (
                <div style={{ padding: "12px 14px", borderRadius: 12, background: "#FBF7F1", border: "1px solid #E9E1D6", fontSize: 13, color: "#6D5B48", lineHeight: 1.5 }}>
                  {selectedContactProfile.guessReason}
                </div>
              )}
              <div style={{ padding: "14px 16px", borderRadius: 14, background: "#F7F5F0", border: "1px solid #E0DDD7", display: "grid", gap: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1A1A18" }}>Update location</div>
                {selectedContactProfile.guessCandidates.filter((candidate) => normalizeCityKey(candidate) !== normalizeCityKey(selectedContactProfile.city)).length > 0 && (
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {selectedContactProfile.guessCandidates
                      .filter((candidate) => normalizeCityKey(candidate) !== normalizeCityKey(selectedContactProfile.city))
                      .map((candidate) => (
                        <button
                          key={candidate}
                          onClick={() => applyManualCityToSelectedContact(candidate)}
                          style={{ padding: "5px 10px", borderRadius: 999, border: "1px solid #E0DDD7", background: "white", color: "#666", fontSize: 12, cursor: "pointer" }}
                        >
                          {candidate}
                        </button>
                      ))}
                  </div>
                )}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <input
                    value={profileCityDraft}
                    onChange={(e) => setProfileCityDraft(e.target.value)}
                    placeholder="Type a city manually"
                    style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #E0DDD7", background: "white", minWidth: 220, flex: "1 1 220px" }}
                  />
                  <button
                    onClick={() => applyManualCityToSelectedContact(profileCityDraft)}
                    style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #E0DDD7", background: "white", color: "#1A1A18", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
                  >
                    Set city
                  </button>
                </div>
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
                <button
                  onClick={() => openSearchUrl(buildContactSearchQueries(selectedContactProfile).google)}
                  style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #E0DDD7", background: "white", color: "#1A1A18", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
                >
                  Google
                </button>
                <button
                  onClick={() => openSearchUrl(buildContactSearchQueries(selectedContactProfile).linkedin)}
                  style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #E0DDD7", background: "white", color: "#1A1A18", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
                >
                  LinkedIn
                </button>
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











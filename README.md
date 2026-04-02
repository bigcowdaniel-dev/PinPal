# PinPal

PinPal is a browser-based contact map for people who think geographically.

Instead of leaving your network trapped in a spreadsheet, PinPal lets you import contacts, place them on a world map, and answer a simple question fast:

**If I am going to a city, who do I already know there?**

Live site: [https://bigcowdaniel-dev.github.io/PinPal/](https://bigcowdaniel-dev.github.io/PinPal/)

## What It Does

PinPal turns a contact list into a visual relationship map.

You can:

- import LinkedIn CSV exports
- add contacts manually
- group contacts by city
- zoom and pan across a world map
- search by city, person, company, or tag
- click into city hubs to see who is there
- plan a trip and find contacts within a radius of a destination
- export and re-import your session as JSON

The app is designed to feel quick, lightweight, and useful without requiring an account or backend.

## Why I Built It

A lot of networking tools are built like CRMs: dense tables, workflow-heavy, and optimized for record keeping.

PinPal comes from a different instinct:

- relationships are spatial
- travel changes who is relevant
- context matters more than raw contact count
- personal tools should feel visual, direct, and low-friction

This project is part product prototype, part frontend experiment, and part interface for a very human workflow:

**"I am heading somewhere. Who should I reach out to?"**

## Highlights

### 1. Spatial Network View

The main interface is a navigable world map with city-level clustering. Instead of scrolling through names, you can see where your network is concentrated.

### 2. Trip Planner

You can enter a destination and radius, then immediately surface contacts near that trip. This shifts the product from passive visualization to active planning.

### 3. Browser-Local Workflow

There is no user account system and no backend database. Imported contacts are stored in the browser, which keeps the app simple and fast for personal use.

### 4. Flexible Import Paths

PinPal currently supports:

- LinkedIn CSV import
- manual contact entry
- JSON export/import for saving a session

### 5. Designed as a Demoable Product

The repo includes:

- a live GitHub Pages deployment
- a polished landing flow
- fictional demo contacts
- generated avatar assets for visual personality

This makes it easy to show the idea, not just the code.

## Tech Stack

PinPal is intentionally lightweight.

- React 18 via browser scripts
- Babel Standalone for in-browser JSX
- D3 geo + geo-projection
- TopoJSON world data
- plain HTML/CSS/JSX
- GitHub Pages for hosting

There is no build pipeline yet. The app currently runs as a static front-end project.

## Running It Locally

Because the app loads JSX in the browser, you should run it through a local web server rather than opening `index.html` directly as a `file://` URL.

Simple option if you already use VS Code:

1. Open the folder.
2. Start a local server such as Live Server.
3. Visit something like `http://127.0.0.1:5500/`.

## Project Structure

- [`index.html`](./index.html): app shell and script loading
- [`pinpal.jsx`](./pinpal.jsx): main application logic and UI
- [`default-contacts.js`](./default-contacts.js): fictional demo data
- [`avatars.js`](./avatars.js): local avatar generation
- [`avatars/`](./avatars): SVG portrait assets and supporting visuals

## Privacy Notes

PinPal is privacy-conscious, but not zero-dependency.

- imported contacts are stored in browser local storage on the device being used
- there is no project backend storing user contact data
- the app currently uses third-party CDNs for libraries and world map assets
- trip destination lookup can call OpenStreetMap Nominatim when a city is not already known locally

If this were turned into a production product, I would likely:

- bundle dependencies locally
- reduce third-party calls
- make privacy guarantees more explicit in-product
- add clearer controls for clearing local data

## Current Limitations

- no authenticated Google Contacts sync yet
- no editing flow for existing contacts
- no deduplication review UI
- no backend sync across devices
- mobile experience can still be improved

## What This Repo Shows Off

This project reflects how I like to build:

- product-first thinking
- strong prototype velocity
- visual interfaces over admin-heavy CRUD
- practical feature selection
- willingness to make something opinionated instead of generic

It is less about shipping a giant enterprise system and more about proving a sharp interaction model quickly.

## Roadmap Ideas

Some natural next steps:

- edit and delete contacts
- duplicate detection and merge suggestions
- richer tags and relationship strength
- improved mobile interaction
- first-class shareable demo mode
- optional backend sync
- better onboarding for import flows

## Demo Data

The default contacts in this repo are fictional demo entries used to make the product understandable on first load.

## Contact

If you found this through GitHub and want to talk product, frontend work, prototyping, or design-minded tools, feel free to reach out through my GitHub profile:

[https://github.com/bigcowdaniel-dev](https://github.com/bigcowdaniel-dev)

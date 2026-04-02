(function () {
  function hashString(input) {
    let hash = 2166136261;
    const text = String(input || "");
    for (let i = 0; i < text.length; i += 1) {
      hash ^= text.charCodeAt(i);
      hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    return Math.abs(hash >>> 0);
  }

  function pick(list, seed, offset) {
    return list[(seed + offset) % list.length];
  }

  function inferRegion(city) {
    const text = String(city || "").toLowerCase();
    if (/(new york|palm beach|west palm beach|miami|washington|boston|new orleans|las vegas)/.test(text)) return "atlantic";
    if (/(london|dublin)/.test(text)) return "british";
    if (/(paris|milan|rome|madrid|barcelona|geneva|zurich|vienna|monaco|basel|amsterdam)/.test(text)) return "continental";
    if (/(moscow|warsaw|prague|budapest|istanbul)/.test(text)) return "eastern";
    if (/(dubai|abu dhabi|doha|riyadh|amman|beirut|tel aviv|jerusalem|cairo|marrakech|casablanca)/.test(text)) return "mena";
    if (/(hong kong|shanghai|beijing|seoul|tokyo|osaka|singapore|bangkok|jakarta|kuala lumpur|manila)/.test(text)) return "asia";
    if (/(mexico city|buenos aires|rio de janeiro|sao paulo|lima|santiago)/.test(text)) return "latam";
    if (/(los angeles|san francisco|austin|seattle|vancouver|toronto|montreal)/.test(text)) return "pacific";
    return "global";
  }

  function inferFamily(contact) {
    const text = [contact.name, contact.company, contact.position, contact.city].filter(Boolean).join(" ").toLowerCase();
    if (/(widow|heiress|hostess|socialite|auntie|girlfriend|daughter)/.test(text)) return "society";
    if (/(oligarch)/.test(text)) return "oligarch";
    if (/(prince|duke|royal|sultan|sovereign|heir|nephew|cousin|son)/.test(text)) return "heir";
    if (/(lawyer|counsel|liaison|advisor|consultant|operator|fixer|whisperer|connector|survivalist|buddy)/.test(text)) return "fixer";
    if (/(collector|patron|producer|promoter|host|trustee|philanthropist|benefactor)/.test(text)) return "patron";
    if (/(banker|treasurer|oracle|chairman|baron|king|predator|principal|president|publisher)/.test(text)) return "finance";
    if (/(founder|visionary|tech|crypto|compute|architect|unicorn|wizard)/.test(text)) return "tech";
    if (/(senator|policy|parliament|committee|embassy|capitol|forum|delegate)/.test(text)) return "political";
    return "executive";
  }

  const REGION_THEME = {
    atlantic: { bg: ["#f3ece4", "#ece4da"], panel: ["#dfd8e7", "#e7ddd1"], ring: "#9cc1e5" },
    british: { bg: ["#f1ece4", "#ebe4db"], panel: ["#d8d5e2", "#e2d7ce"], ring: "#9eb7d6" },
    continental: { bg: ["#f4ede7", "#eee6dd"], panel: ["#e5d5dc", "#ddd8e5"], ring: "#b9b7df" },
    eastern: { bg: ["#e8e7ec", "#e1dce5"], panel: ["#d3d7e5", "#d8ced8"], ring: "#9cb2d7" },
    mena: { bg: ["#f3ebde", "#ebe2d2"], panel: ["#e6d8bf", "#ddd1bd"], ring: "#d3b47e" },
    asia: { bg: ["#efebe4", "#e8e4dc"], panel: ["#d8dde1", "#ddd4cc"], ring: "#a8c1d2" },
    latam: { bg: ["#f4e7dc", "#efdfd4"], panel: ["#e6d2c8", "#d8d7e0"], ring: "#e2a987" },
    pacific: { bg: ["#ecebe5", "#e5e1da"], panel: ["#d5dde3", "#ddd3cf"], ring: "#9fc0d9" },
    global: { bg: ["#eee8e0", "#e8e1d9"], panel: ["#ddd5cf", "#d6dde0"], ring: "#bac0c9" }
  };

  const FAMILY_STYLE = {
    society: {
      skin: ["#f2d6c1", "#e7bea3", "#d8ae8e"],
      hair: ["#272128", "#6f4731", "#d8dbe0"],
      outfit: ["#22273a", "#5d2236", "#3e3352"],
      accent: ["#a86473", "#c18b63"],
      template: ["societySweep", "societyBob", "societyBun"],
      accessories: ["pearls", "earrings", "brooch", "none"]
    },
    oligarch: {
      skin: ["#e8c4ad", "#daad8c", "#ca956d"],
      hair: ["#252428", "#5d6064", "#87888d"],
      outfit: ["#18212b", "#2b3644", "#402b34"],
      accent: ["#9b404a", "#7b4d56"],
      template: ["oligarchCrop", "oligarchSilver"],
      accessories: ["tie", "none"]
    },
    heir: {
      skin: ["#e3be9d", "#d4a885", "#c78f6e"],
      hair: ["#221d20", "#473127", "#5d4638"],
      outfit: ["#ffffff", "#f3efe5", "#e8dcc6"],
      accent: ["#b08a56", "#8d6f42"],
      template: ["heirSoft", "heirMena"],
      accessories: ["none"]
    },
    fixer: {
      skin: ["#ebc7af", "#ddb293", "#ca9b77"],
      hair: ["#1e1d20", "#635149", "#8d8a83"],
      outfit: ["#243346", "#4b2f39", "#3d495b"],
      accent: ["#c36d4d", "#4f88a8"],
      template: ["fixerPart", "fixerGlasses"],
      accessories: ["glasses", "none"]
    },
    patron: {
      skin: ["#efd0b8", "#dfb799", "#cb9f7d"],
      hair: ["#2b2528", "#6f4732", "#bbb19f"],
      outfit: ["#1f2c23", "#6a2734", "#273653"],
      accent: ["#ba8951", "#a44d58"],
      template: ["patronRound", "patronSoft"],
      accessories: ["scarf", "brooch", "none"]
    },
    finance: {
      skin: ["#e8c4ad", "#d7a987", "#c68e6e"],
      hair: ["#29272a", "#6b665f", "#8b877f"],
      outfit: ["#1d2431", "#2d3747", "#43303d"],
      accent: ["#a44754", "#7c8ea4"],
      template: ["financePart", "financeCrest"],
      accessories: ["tie", "glasses"]
    },
    tech: {
      skin: ["#ecc7ad", "#ddb08e", "#c89672"],
      hair: ["#2a2526", "#5f5148", "#9c9280"],
      outfit: ["#223a42", "#2f3348", "#334438"],
      accent: ["#4fa0c8", "#c96d54"],
      template: ["techMessy", "techHoodie"],
      accessories: ["hood", "none"]
    },
    political: {
      skin: ["#ebc7af", "#dab090", "#c89474"],
      hair: ["#2a2728", "#67615a", "#b1a89a"],
      outfit: ["#1f3045", "#4a2d37", "#37434c"],
      accent: ["#b24e59", "#9d7f57"],
      template: ["politicalStern", "politicalPart"],
      accessories: ["flagpin", "tie", "none"]
    },
    executive: {
      skin: ["#ebc8b0", "#dcb090", "#c79373"],
      hair: ["#2c2627", "#675f59", "#b9b1a5"],
      outfit: ["#22303f", "#354558", "#43303d"],
      accent: ["#cb7a57", "#7d8ea5"],
      template: ["executiveNeutral", "executiveWave"],
      accessories: ["none", "glasses"]
    }
  };

  function frame(theme) {
    return '<rect width="256" height="256" rx="32" fill="' + theme.bg + '"/>' +
      '<circle cx="128" cy="128" r="108" fill="' + theme.panel + '"/>' +
      '<circle cx="128" cy="128" r="105" fill="none" stroke="' + theme.ring + '" stroke-width="6"/>';
  }

  function noseMouth(x, noseY, mouthY, accent, mood) {
    const mouth = mood === "flat"
      ? '<path d="M' + (x - 13) + ' ' + mouthY + 'c10 1 19 1 28 0" stroke="' + accent + '" stroke-width="3.6" fill="none" stroke-linecap="round"/>'
      : mood === "smile"
      ? '<path d="M' + (x - 14) + ' ' + mouthY + 'c10 8 22 8 32 0" stroke="' + accent + '" stroke-width="4" fill="none" stroke-linecap="round"/>'
      : mood === "crooked"
      ? '<path d="M' + (x - 14) + ' ' + mouthY + 'c8 5 19 6 30 0" stroke="' + accent + '" stroke-width="4" fill="none" stroke-linecap="round"/>'
      : '<path d="M' + (x - 14) + ' ' + mouthY + 'c10 6 23 7 34 -1" stroke="' + accent + '" stroke-width="4" fill="none" stroke-linecap="round"/>';
    return '<path d="M' + (x - 5) + ' ' + noseY + 'c3 4 7 4 10 0" stroke="#ae7a6c" stroke-width="3" fill="none" stroke-linecap="round"/>' + mouth;
  }

  function eyesBrows(x, eyeY, browY, browColor, style) {
    const eyes = style === "narrow"
      ? '<ellipse cx="' + (x - 10) + '" cy="' + eyeY + '" rx="3.1" ry="4" fill="#2c2422"/><ellipse cx="' + (x + 14) + '" cy="' + eyeY + '" rx="3.1" ry="4" fill="#2c2422"/>'
      : style === "measured"
      ? '<ellipse cx="' + (x - 10) + '" cy="' + eyeY + '" rx="3.2" ry="4.1" fill="#2c2422"/><ellipse cx="' + (x + 14) + '" cy="' + eyeY + '" rx="3.2" ry="4.1" fill="#2c2422"/>'
      : '<ellipse cx="' + (x - 10) + '" cy="' + eyeY + '" rx="3.6" ry="4.5" fill="#2c2422"/><ellipse cx="' + (x + 14) + '" cy="' + eyeY + '" rx="3.6" ry="4.5" fill="#2c2422"/>';
    const brows = style === "heavy"
      ? '<path d="M' + (x - 20) + ' ' + (browY - 3) + 'c8-4 15-4 22 0" stroke="' + browColor + '" stroke-width="4.1" fill="none" stroke-linecap="round"/><path d="M' + (x + 4) + ' ' + (browY - 3) + 'c8-4 15-4 22 0" stroke="' + browColor + '" stroke-width="4.1" fill="none" stroke-linecap="round"/>'
      : style === "sharp"
      ? '<path d="M' + (x - 20) + ' ' + (browY - 2) + 'c8-6 15-6 22-1" stroke="' + browColor + '" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M' + (x + 4) + ' ' + (browY - 3) + 'c8-5 15-5 22 1" stroke="' + browColor + '" stroke-width="3.5" fill="none" stroke-linecap="round"/>'
      : style === "arched"
      ? '<path d="M' + (x - 20) + ' ' + (browY + 1) + 'c7-7 15-8 22-2" stroke="' + browColor + '" stroke-width="3.1" fill="none" stroke-linecap="round"/><path d="M' + (x + 4) + ' ' + (browY + 1) + 'c7-6 15-7 22-1" stroke="' + browColor + '" stroke-width="3.1" fill="none" stroke-linecap="round"/>'
      : style === "measured"
      ? '<path d="M' + (x - 20) + ' ' + browY + 'c8-2 15-2 22 0" stroke="' + browColor + '" stroke-width="2.7" fill="none" stroke-linecap="round"/><path d="M' + (x + 4) + ' ' + browY + 'c8-2 15-2 22 0" stroke="' + browColor + '" stroke-width="2.7" fill="none" stroke-linecap="round"/>'
      : '<path d="M' + (x - 20) + ' ' + (browY - 1) + 'c8-3 15-3 22 0" stroke="' + browColor + '" stroke-width="3.1" fill="none" stroke-linecap="round"/><path d="M' + (x + 4) + ' ' + (browY - 1) + 'c8-3 15-3 22 0" stroke="' + browColor + '" stroke-width="3.1" fill="none" stroke-linecap="round"/>';
    return eyes + brows;
  }

  function accessories(kind, accent) {
    if (kind === "pearls") return '<circle cx="112" cy="179" r="2.8" fill="#efe8dd"/><circle cx="120" cy="182" r="2.8" fill="#efe8dd"/><circle cx="128" cy="183" r="2.8" fill="#efe8dd"/><circle cx="136" cy="182" r="2.8" fill="#efe8dd"/><circle cx="144" cy="179" r="2.8" fill="#efe8dd"/>';
    if (kind === "earrings") return '<circle cx="92" cy="145" r="2.4" fill="' + accent + '"/><circle cx="164" cy="145" r="2.4" fill="' + accent + '"/>';
    if (kind === "brooch") return '<circle cx="154" cy="188" r="4" fill="' + accent + '"/><circle cx="154" cy="188" r="1.6" fill="#f3ead8"/>';
    if (kind === "glasses") return '<circle cx="111" cy="128" r="8" stroke="#5d5148" stroke-width="2.2" fill="none"/><circle cx="145" cy="128" r="8" stroke="#5d5148" stroke-width="2.2" fill="none"/><path d="M119 128h18" stroke="#5d5148" stroke-width="2.2" fill="none"/>';
    if (kind === "flagpin") return '<path d="M151 191l8-4v10l-8-4z" fill="' + accent + '"/><path d="M149 186v12" stroke="#d8d0c4" stroke-width="1.8"/>';
    return '';
  }

  function outfit(suit, accent, mode) {
    if (mode === "tie") {
      return '<path d="M98 176h60l10 17h-80z" fill="#f6f4ef"/><path d="M99 182c8 7 18 10 29 10 12 0 22-3 29-10v38H99z" fill="' + suit + '"/><path d="M125 176h6v18h-6z" fill="' + accent + '"/><path d="M123 194h10l5 22h-20z" fill="' + accent + '"/>';
    }
    if (mode === "hood") {
      return '<path d="M96 176h64l8 18h-80z" fill="#dfe5e7"/><path d="M99 182c8 7 18 10 29 10 12 0 22-3 29-10v38H99z" fill="' + suit + '"/>';
    }
    if (mode === "thobe") {
      return '<path d="M92 172h72l-6 50H98z" fill="#ffffff"/><path d="M116 172h24v49h-24z" fill="#f1f1f1"/><path d="M111 178l17 11 17-11" stroke="#d8d0c4" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
    }
    return '<path d="M100 177h56l9 17h-74z" fill="#f5f1ea"/><path d="M98 182c8 7 18 10 30 10 12 0 22-3 30-10v38H98z" fill="' + suit + '"/>';
  }

  function ageLines(enabled) {
    return enabled ? '<path d="M97 136c6 2 11 2 15 0" stroke="#b58e77" stroke-width="1.5" opacity="0.45" fill="none"/><path d="M144 136c4 2 9 2 15 0" stroke="#b58e77" stroke-width="1.5" opacity="0.45" fill="none"/>' : '';
  }

  function societySweep(ctx) {
    return '<path d="M86 100c8-38 33-60 63-60 24 0 45 14 55 38-17-4-31-4-42 0-19-8-44-4-76 22z" fill="' + ctx.hair + '"/>' +
      '<path d="M94 97c15-19 34-29 57-29 18 0 33 7 45 19-17-2-31 1-41 10-16-6-36-6-61 0z" fill="' + ctx.hair + '"/>' +
      '<path d="M92 82c0-27 17-43 38-43 23 0 39 17 44 44v45c0 33-19 53-46 53-26 0-44-20-44-53z" fill="' + ctx.skin + '"/>' +
      eyesBrows(128, 125, 115, ctx.brow, 'soft') + noseMouth(128, 139, 153, ctx.accent, 'smirk') + accessories(ctx.accessory, ctx.accent) + outfit(ctx.suit, ctx.accent, 'dress') + ageLines(ctx.older);
  }

  function societyBob(ctx) {
    return '<path d="M89 96c10-30 33-48 61-48 24 0 44 14 52 39-19-3-35 1-47 10-19-5-39-4-66-1z" fill="' + ctx.hair + '"/>' +
      '<path d="M88 98c-1 17 2 36 9 56-10-10-16-25-16-44 0-4 0-8 1-12z" fill="' + ctx.hair + '"/>' +
      '<path d="M168 98c1 17-2 36-9 56 10-10 16-25 16-44 0-4 0-8-1-12z" fill="' + ctx.hair + '"/>' +
      '<path d="M93 84c0-24 16-38 35-38 22 0 37 15 42 39v42c0 32-18 52-42 52-24 0-41-20-41-52z" fill="' + ctx.skin + '"/>' +
      eyesBrows(128, 125, 115, ctx.brow, 'soft') + noseMouth(128, 139, 152, ctx.accent, 'smile') + accessories(ctx.accessory, ctx.accent) + outfit(ctx.suit, ctx.accent, 'dress') + ageLines(ctx.older);
  }

  function societyBun(ctx) {
    return '<circle cx="140" cy="58" r="15" fill="' + ctx.hair + '"/>' +
      '<path d="M94 98c12-24 33-37 57-37 19 0 35 8 46 21-16-2-30 0-42 5-18-5-37-3-61 11z" fill="' + ctx.hair + '"/>' +
      '<path d="M94 84c0-23 15-37 34-37 22 0 37 15 42 40v41c0 32-17 52-42 52-24 0-42-20-42-52z" fill="' + ctx.skin + '"/>' +
      eyesBrows(128, 126, 116, ctx.brow, 'soft') + noseMouth(128, 139, 153, ctx.accent, 'smirk') + accessories(ctx.accessory, ctx.accent) + outfit(ctx.suit, ctx.accent, 'dress') + ageLines(ctx.older);
  }

  function oligarchCrop(ctx) {
    return '<path d="M89 87c11-22 31-34 55-34 26 0 47 15 55 39-19-2-37 1-51 8-18-3-37-2-59 6z" fill="' + ctx.hair + '"/>' +
      '<path d="M92 83c0-23 18-38 40-38 25 0 42 17 46 42v42c0 31-20 49-46 49-25 0-40-18-40-49z" fill="' + ctx.skin + '"/>' +
      eyesBrows(128, 127, 115, ctx.brow, 'heavy') + noseMouth(128, 140, 153, ctx.accent, 'flat') + accessories(ctx.accessory, ctx.accent) + outfit(ctx.suit, ctx.accent, 'tie') + ageLines(true);
  }

  function oligarchSilver(ctx) {
    return '<path d="M88 86c10-21 30-33 54-33 24 0 45 14 55 38-18-1-35 2-49 9-18-2-38-1-60 7z" fill="' + ctx.hair + '"/>' +
      '<path d="M90 82c0-22 18-36 39-36 24 0 41 16 45 40v43c0 30-19 48-45 48-24 0-39-18-39-48z" fill="' + ctx.skin + '"/>' +
      eyesBrows(128, 127, 115, ctx.brow, 'heavy') + noseMouth(128, 141, 154, ctx.accent, 'flat') + accessories('none', ctx.accent) + outfit(ctx.suit, ctx.accent, 'tie') + ageLines(true);
  }

  function heirSoft(ctx) {
    return '<path d="M88 96c13-29 35-45 61-45 22 0 41 12 51 34-18-3-33 0-46 7-18-4-39-2-66 4z" fill="' + ctx.hair + '"/>' +
      '<path d="M94 82c0-23 15-37 34-37 22 0 37 15 42 39v42c0 32-18 51-42 51-24 0-42-19-42-51z" fill="' + ctx.skin + '"/>' +
      eyesBrows(128, 126, 116, ctx.brow, 'soft') + noseMouth(128, 139, 152, ctx.accent, 'smile') + accessories('none', ctx.accent) + outfit(ctx.suit, ctx.accent, 'dress');
  }

  function heirMena(ctx) {
    return '<path d="M92 92c14-20 34-31 57-31 18 0 34 7 45 20-17-2-31 0-43 5-17-3-36-2-59 6z" fill="' + ctx.hair + '"/>' +
      '<path d="M94 84c0-23 15-37 34-37 22 0 37 15 42 40v41c0 32-17 52-42 52-24 0-42-20-42-52z" fill="' + ctx.skin + '"/>' +
      '<path d="M84 82c24-26 64-26 88 0" stroke="#ffffff" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M94 74c17-13 35-16 53-11 8 3 17 8 24 16" stroke="#f3ecdf" stroke-width="16" fill="none" stroke-linecap="round"/>' +
      eyesBrows(128, 126, 116, ctx.brow, 'narrow') + noseMouth(128, 139, 152, ctx.accent, 'flat') + outfit(ctx.suit, ctx.accent, 'thobe');
  }

  function fixerPart(ctx) {
    return '<path d="M88 95c12-25 33-39 58-39 20 0 37 10 48 29-18-2-33 2-46 10-17-4-38-3-60 0z" fill="' + ctx.hair + '"/>' +
      '<path d="M92 82c0-23 16-37 35-37 22 0 38 16 43 40v43c0 31-18 50-43 50-24 0-41-19-41-50z" fill="' + ctx.skin + '"/>' +
      eyesBrows(128, 127, 115, ctx.brow, 'sharp') + noseMouth(128, 140, 153, ctx.accent, 'crooked') + accessories(ctx.accessory, ctx.accent) + outfit(ctx.suit, ctx.accent, 'dress');
  }

  function fixerGlasses(ctx) {
    return '<path d="M90 93c10-22 31-35 56-35 21 0 39 11 49 30-18-2-34 1-47 8-17-4-36-3-58 -3z" fill="' + ctx.hair + '"/>' +
      '<path d="M94 84c0-22 15-35 34-35 22 0 37 15 42 39v41c0 31-18 49-42 49-23 0-41-18-41-49z" fill="' + ctx.skin + '"/>' +
      eyesBrows(128, 127, 115, ctx.brow, 'sharp') + noseMouth(128, 140, 153, ctx.accent, 'flat') + accessories('glasses', ctx.accent) + outfit(ctx.suit, ctx.accent, 'dress');
  }

  function patronRound(ctx) {
    return '<path d="M88 92c11-24 33-38 59-38 21 0 40 11 50 32-17-3-32 0-45 7-18-4-39-3-64 -1z" fill="' + ctx.hair + '"/>' +
      '<path d="M92 82c0-23 16-37 36-37 23 0 39 16 44 41v40c0 32-19 51-44 51-24 0-41-19-41-51z" fill="' + ctx.skin + '"/>' +
      eyesBrows(128, 126, 116, ctx.brow, 'soft') + noseMouth(128, 139, 152, ctx.accent, 'smile') + accessories(ctx.accessory, ctx.accent) + outfit(ctx.suit, ctx.accent, 'dress');
  }

  function patronSoft(ctx) {
    return '<path d="M90 94c12-28 34-43 60-43 22 0 40 12 50 33-18-3-33 0-46 7-18-5-40-4-64 3z" fill="' + ctx.hair + '"/>' +
      '<path d="M94 82c0-22 15-36 34-36 22 0 37 15 42 40v41c0 31-18 50-42 50-24 0-42-19-42-50z" fill="' + ctx.skin + '"/>' +
      eyesBrows(128, 126, 116, ctx.brow, 'soft') + noseMouth(128, 139, 152, ctx.accent, 'smirk') + accessories(ctx.accessory, ctx.accent) + outfit(ctx.suit, ctx.accent, 'dress');
  }

  function financePart(ctx) {
    return '<path d="M90 90c12-22 33-35 58-35 22 0 40 12 50 31-18-2-34 1-48 8-18-3-38-3-60 -4z" fill="' + ctx.hair + '"/>' +
      '<path d="M92 82c0-23 16-37 36-37 24 0 40 16 44 41v42c0 31-19 49-44 49-24 0-41-18-41-49z" fill="' + ctx.skin + '"/>' +
      eyesBrows(128, 126, 115, ctx.brow, 'soft') + noseMouth(128, 139, 152, ctx.accent, 'flat') + accessories(ctx.accessory, ctx.accent) + outfit(ctx.suit, ctx.accent, 'tie');
  }

  function financeCrest(ctx) {
    return '<path d="M88 88c14-24 35-37 60-37 22 0 40 12 51 32-18-1-34 3-47 10-19-2-40-2-64 -5z" fill="' + ctx.hair + '"/>' +
      '<path d="M92 81c0-23 16-37 36-37 24 0 41 16 45 42v41c0 31-19 50-45 50-24 0-41-19-41-50z" fill="' + ctx.skin + '"/>' +
      eyesBrows(128, 126, 115, ctx.brow, 'heavy') + noseMouth(128, 139, 152, ctx.accent, 'flat') + accessories(ctx.accessory, ctx.accent) + outfit(ctx.suit, ctx.accent, 'tie');
  }

  function techMessy(ctx) {
    return '<path d="M88 89c15-24 38-37 64-37 22 0 41 12 51 32-18-2-34 1-48 8-18-4-39-3-67 -3z" fill="' + ctx.hair + '"/>' +
      '<path d="M95 82c0-22 15-35 34-35 22 0 37 15 42 39v40c0 31-18 49-42 49-23 0-41-18-41-49z" fill="' + ctx.skin + '"/>' +
      eyesBrows(128, 126, 116, ctx.brow, 'soft') + noseMouth(128, 139, 152, ctx.accent, 'smile') + accessories(ctx.accessory, ctx.accent) + outfit(ctx.suit, ctx.accent, 'hood');
  }

  function techHoodie(ctx) {
    return '<path d="M90 92c12-22 33-34 57-34 22 0 40 11 50 29-18-1-33 2-46 8-18-3-38-2-61 -3z" fill="' + ctx.hair + '"/>' +
      '<path d="M95 84c0-21 15-34 33-34 21 0 36 15 41 38v40c0 30-18 48-41 48-23 0-40-18-40-48z" fill="' + ctx.skin + '"/>' +
      eyesBrows(128, 126, 116, ctx.brow, 'soft') + noseMouth(128, 139, 152, ctx.accent, 'crooked') + accessories('none', ctx.accent) + outfit(ctx.suit, ctx.accent, 'hood');
  }

  function politicalStern(ctx) {
    return '<path d="M89 90c13-22 34-35 58-35 22 0 40 12 50 32-18-2-34 1-47 9-18-3-39-2-61 -6z" fill="' + ctx.hair + '"/>' +
      '<path d="M92 82c0-23 16-37 36-37 23 0 39 16 44 41v42c0 31-19 49-44 49-24 0-41-18-41-49z" fill="' + ctx.skin + '"/>' +
      eyesBrows(128, 126, 114, ctx.brow, 'heavy') + noseMouth(128, 139, 152, ctx.accent, 'flat') + accessories(ctx.accessory, ctx.accent) + outfit(ctx.suit, ctx.accent, 'tie');
  }

  function politicalPart(ctx) {
    return '<path d="M90 91c12-22 33-35 58-35 21 0 39 12 49 31-18-2-34 1-47 9-18-3-39-2-60 -5z" fill="' + ctx.hair + '"/>' +
      '<path d="M94 83c0-22 15-36 34-36 22 0 37 15 42 40v41c0 31-18 49-42 49-24 0-42-18-42-49z" fill="' + ctx.skin + '"/>' +
      eyesBrows(128, 126, 114, ctx.brow, 'heavy') + noseMouth(128, 139, 152, ctx.accent, 'flat') + accessories(ctx.accessory, ctx.accent) + outfit(ctx.suit, ctx.accent, 'tie');
  }

  function executiveNeutral(ctx) {
    return '<path d="M90 92c12-24 34-38 59-38 22 0 40 12 50 32-18-2-33 1-46 8-18-4-39-3-63 -2z" fill="' + ctx.hair + '"/>' +
      '<path d="M93 83c0-22 15-36 35-36 22 0 38 15 43 40v41c0 31-18 50-43 50-24 0-42-19-42-50z" fill="' + ctx.skin + '"/>' +
      eyesBrows(128, 126, 116, ctx.brow, 'soft') + noseMouth(128, 139, 152, ctx.accent, 'flat') + accessories(ctx.accessory, ctx.accent) + outfit(ctx.suit, ctx.accent, 'dress');
  }

  function executiveWave(ctx) {
    return '<path d="M89 94c14-27 36-42 61-42 22 0 40 12 50 33-18-2-34 1-47 8-18-4-39-4-64 1z" fill="' + ctx.hair + '"/>' +
      '<path d="M94 84c0-21 15-35 34-35 22 0 37 15 42 39v41c0 31-18 49-42 49-24 0-42-18-42-49z" fill="' + ctx.skin + '"/>' +
      eyesBrows(128, 126, 116, ctx.brow, 'soft') + noseMouth(128, 139, 152, ctx.accent, 'smile') + accessories(ctx.accessory, ctx.accent) + outfit(ctx.suit, ctx.accent, 'dress');
  }


  function fleetStreetBaron(ctx) {
    return '<path d="M92 98c8-31 30-48 59-48 26 0 47 15 56 42-12-5-23-7-33-5-5-17-18-28-35-28-18 0-34 12-47 39z" fill="' + ctx.hair + '"/>' +
      '<path d="M96 87c0-22 15-35 34-35 23 0 39 15 43 40v40c0 31-18 50-43 50-24 0-34-17-34-50z" fill="' + ctx.skin + '"/>' +
      '<path d="M102 101c12-15 26-22 43-22 15 0 27 5 37 16-12-2-21 0-29 6-16-3-33-3-51 0z" fill="' + ctx.hair + '"/>' +
      eyesBrows(128, 126, 115, ctx.brow, 'measured') + '<circle cx="111" cy="129" r="8.4" stroke="#604e43" stroke-width="2.4" fill="none"/><circle cx="145" cy="129" r="8.4" stroke="#604e43" stroke-width="2.4" fill="none"/><path d="M119 129h18" stroke="#604e43" stroke-width="2.4" fill="none"/>' + noseMouth(128, 141, 156, ctx.accent, 'flat') + '<path d="M113 148c5-4 10-6 15-6 6 0 11 2 16 6-5 1-10 2-16 2-5 0-10-1-15-2z" fill="#8e6b5b"/>' + outfit(ctx.suit, ctx.accent, 'tie') + '<path d="M106 171h44" stroke="#efe8dd" stroke-width="6" stroke-linecap="round"/>' + ageLines(true);
  }

  function parisSalonWidow(ctx) {
    return '<path d="M88 92c8-28 31-43 60-43 25 0 46 14 55 39-11-3-20-4-29-2-10-13-24-20-43-20-18 0-33 8-43 26z" fill="#221b24"/>' +
      '<path d="M84 96c-2 16 1 33 10 50-11-8-18-22-18-42 0-3 0-5 1-8z" fill="#221b24"/>' +
      '<path d="M172 96c2 16-1 33-10 50 11-8 18-22 18-42 0-3 0-5-1-8z" fill="#221b24"/>' +
      '<path d="M95 84c0-23 16-37 35-37 22 0 38 15 43 39v43c0 32-19 51-43 51-24 0-42-19-42-51z" fill="' + ctx.skin + '"/>' +
      '<path d="M98 103c12-12 28-18 47-18 15 0 29 4 40 13-14-1-26 1-36 7-17-4-34-4-51-2z" fill="#221b24"/>' +
      eyesBrows(128, 125, 114, '#4e3b42', 'arched') + '<path d="M109 141c4 2 8 3 12 3 4 0 8-1 11-3" stroke="#d2a192" stroke-width="1.8" fill="none" stroke-linecap="round"/>' + '<path d="M123 139c4 4 8 4 12 0" stroke="#b77a70" stroke-width="2.4" fill="none" stroke-linecap="round"/>' + '<path d="M114 154c8 5 18 6 29 0" stroke="#9d5065" stroke-width="4.2" fill="none" stroke-linecap="round"/>' + accessories('pearls', ctx.accent) + accessories('earrings', '#d4b07b') + outfit('#5a2036', ctx.accent, 'dress') + '<circle cx="96" cy="145" r="5.5" fill="#efc1b7" opacity="0.6"/><circle cx="160" cy="145" r="5.5" fill="#efc1b7" opacity="0.6"/>' + ageLines(true);
  }

  function russianOligarchSpecial(ctx) {
    return '<path d="M90 90c12-23 35-36 61-36 24 0 45 13 55 38-12-2-23-1-34 4-8-14-22-22-40-22-18 0-32 6-42 16z" fill="#7c8088"/>' +
      '<path d="M92 84c0-23 17-36 38-36 25 0 43 16 47 41v43c0 31-20 49-47 49-24 0-38-18-38-49z" fill="' + ctx.skin + '"/>' +
      '<path d="M97 96c11-10 23-15 37-15 17 0 31 7 43 21-12-4-24-4-36-1-15-4-29-6-44-5z" fill="#7c8088"/>' +
      eyesBrows(128, 126, 113, '#564a47', 'heavy') + '<path d="M123 141c4 4 8 4 12 0" stroke="#a67b6b" stroke-width="2.4" fill="none" stroke-linecap="round"/>' + '<path d="M114 154c9 2 18 2 28 0" stroke="#7d5e57" stroke-width="4" fill="none" stroke-linecap="round"/>' + '<path d="M111 148c6 4 11 6 17 6 6 0 12-2 18-6" stroke="#8f7368" stroke-width="2" fill="none" stroke-linecap="round"/>' + outfit('#1d2431', '#6d7686', 'tie') + ageLines(true);
  }

  function jumeirahHeirSpecial(ctx) {
    return '<path d="M95 84c0-23 15-37 34-37 22 0 38 15 43 40v42c0 32-18 51-43 51-24 0-42-19-42-51z" fill="' + ctx.skin + '"/>' +
      '<path d="M82 86c25-24 66-24 92 0" stroke="#ffffff" stroke-width="14" fill="none" stroke-linecap="round"/>' +
      '<path d="M90 74c22-16 50-17 75 0" stroke="#f5eee2" stroke-width="22" fill="none" stroke-linecap="round"/>' +
      '<path d="M94 83c11-10 24-15 39-15 14 0 26 4 36 13" stroke="#2d2723" stroke-width="7" fill="none" stroke-linecap="round"/>' +
      '<path d="M94 83c11-10 24-15 39-15 14 0 26 4 36 13" stroke="#2d2723" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
      eyesBrows(128, 126, 115, '#5d4736', 'sharp') + '<path d="M123 141c4 4 8 4 12 0" stroke="#b07b60" stroke-width="2.2" fill="none" stroke-linecap="round"/>' + '<path d="M116 151c7 3 15 3 24 0" stroke="#7b5f4b" stroke-width="3.6" fill="none" stroke-linecap="round"/>' + '<path d="M114 155c4 8 10 12 14 12 5 0 10-4 15-12" stroke="#7b5f4b" stroke-width="2.8" fill="none" stroke-linecap="round"/>' + outfit('#ffffff', ctx.accent, 'thobe');
  }

  function pickTemplateName(contact, familyKey, regionKey, seed) {
    const text = String(contact.name || '').toLowerCase();
    if (/fleet street baron/.test(text)) return 'fleetStreetBaron';
    if (/paris salon widow/.test(text)) return 'parisSalonWidow';
    if (/russian oligarch$/.test(text)) return 'russianOligarchSpecial';
    if (/jumeirah family office son/.test(text)) return 'jumeirahHeirSpecial';
    if (familyKey === 'heir' && regionKey === 'mena') return 'heirMena';
    return pick((FAMILY_STYLE[familyKey] || FAMILY_STYLE.executive).template, seed, 1);
  }
  const TEMPLATE_MAP = {
    societySweep,
    societyBob,
    societyBun,
    oligarchCrop,
    oligarchSilver,
    heirSoft,
    heirMena,
    fixerPart,
    fixerGlasses,
    patronRound,
    patronSoft,
    financePart,
    financeCrest,
    techMessy,
    techHoodie,
    politicalStern,
    politicalPart,
    executiveNeutral,
    executiveWave,
    fleetStreetBaron,
    parisSalonWidow,
    russianOligarchSpecial,
    jumeirahHeirSpecial,
  };

  function buildSvg(contact) {
    const seed = hashString([contact.name, contact.city, contact.company, contact.position].join('|'));
    const familyKey = inferFamily(contact);
    const regionKey = inferRegion(contact.city);
    const family = FAMILY_STYLE[familyKey] || FAMILY_STYLE.executive;
    const region = REGION_THEME[regionKey] || REGION_THEME.global;
    const templateName = pickTemplateName(contact, familyKey, regionKey, seed);
    const template = TEMPLATE_MAP[templateName] || executiveNeutral;
    const ctx = {
      skin: pick(family.skin, seed, 3),
      hair: pick(family.hair, seed, 5),
      suit: pick(family.outfit, seed, 7),
      accent: pick(family.accent, seed, 9),
      accessory: pick(family.accessories, seed, 11),
      older: /(widow|auntie|oligarch)/i.test(contact.name || ''),
      brow: pick(['#725951', '#5f4943', '#84695b'], seed, 13),
    };

    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="24 18 208 208" role="img" aria-label="' + String(contact.name || 'Avatar').replace(/&/g, '&amp;').replace(/"/g, '&quot;') + '">' +
      frame({ bg: pick(region.bg, seed, 15), panel: pick(region.panel, seed, 17), ring: region.ring }) +
      template(ctx) +
      '</svg>';
  }

  function svgToDataUri(svg) {
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  function getDataUri(contact) {
    return svgToDataUri(buildSvg(contact || {}));
  }

  window.PinPalAvatar = { getDataUri };
})();





import { useState } from "react";

const REVIEWERS = [
  { id: 1, name: "Marcus Webb", handle: "@marcuseats", bio: "Former line cook turned obsessive diner. I chase the perfect bowl of ramen and anything with truffles. Twelve years of eating professionally across four continents.", avatar: "MW", color: "#C8472C", specialty: "Fine Dining & Asian Cuisine" },
  { id: 2, name: "Sasha Okafor", handle: "@sasha_bites", bio: "Food writer, cookbook hoarder, and champion of the underdog neighbourhood joint. If it's got soul and honest ingredients, I'm in. I believe atmosphere is half the meal.", avatar: "SO", color: "#2C6FC8", specialty: "Street Food & Hidden Gems" },
];

const INITIAL_RESTAURANTS = [
  { id: 1, name: "Abundance", cuisine: "Northern Chinese", location: "Cleveland Heights", priceRange: "$$", visited: true, photos: ["🥟","🫙","🌶️"], coverEmoji: "🥟", tags: ["Dumplings","Modern Chinese","BYOB"], reviews: { 1: { done: true, description: "Liu Fang's dumplings are the real deal — four varieties served in chili oil, each one a different lesson in restraint and heat. The renovated diner car is now a proper dining room with intention. Start tame and work your way to the Sichuan pork sausage, as instructed. One of the most interesting origin stories behind any restaurant in Cleveland.", taste: 8, value: 9, atmosphere: 8 }, 2: { done: true, description: "Abundance earns every bit of its reputation. The Northern Chinese cooking is precise and personal — you can taste the family history in every fold. The renovated space is warm and unpretentious. The jhol-adjacent dumpling sampler ($18) in chili oil is compulsory ordering. A genuine gem in Cleveland Heights.", taste: 8, value: 9, atmosphere: 7 } }, summary: "Abundance is the kind of restaurant that reminds you why food matters. Liu Fang's dumplings are exceptional, and the renovated diner car now serves as a fitting stage for cooking with real cultural depth. Don't skip the dumpling sampler — eat them in order." },
  { id: 2, name: "Acqua di Dea", cuisine: "Italian Seafood", location: "Downtown Cleveland", priceRange: "$$$", visited: true, photos: ["🦀","🍷","🌊"], coverEmoji: "🦞", tags: ["Seafood","Date Night","Wine Bar"], reviews: { 1: { done: true, description: "The setting alone is worth the trip — low lighting, century-old brick, and Terminal Tower glowing through the half-rounded windows. Lola Jacaj has created something genuinely atmospheric on West Sixth. The Ravioli di Granchio is serious pasta: jumbo lump crab, lemon zest, saffron cream. Sommelier-curated pairings elevate every course.", taste: 6, value: 7, atmosphere: 9 }, 2: { done: true, description: "Italian seafood in Downtown Cleveland done with real conviction. The room is intimate and romantic without trying too hard. Owner Lola Jacaj clearly knows her wine — let her guide you. The crab ravioli is exceptional. Prices are steep but the experience justifies it for a special occasion.", taste: 5, value: 7, atmosphere: 9 } }, summary: "Acqua di Dea captures downtown Cleveland at its most romantic. The Italian seafood menu is driven by technique and the kind of personal hospitality that can't be manufactured. Best enjoyed slowly, with good wine and good company." },
  { id: 3, name: "Amba", cuisine: "Indian-Inspired Small Plates", location: "Ohio City", priceRange: "$$", visited: true, photos: ["🫓","🌿","🍳"], coverEmoji: "🌙", tags: ["Small Plates","Cocktails","Vegetarian-Friendly"], reviews: { 1: { done: true, description: "Douglas Katz has built something genuinely exciting here. The clay bread alone — blistered, soft, ready to drag through everything — is worth the visit. The Indian-leaning mezze format rewards adventurous ordering: chickpea fritters, fried eggs, spinach dip. Everything is designed to layer and share. The amber-lit room creates the right mood.", taste: 7, value: 8, atmosphere: 9 }, 2: { done: true, description: "Amba is the most transportive dining room in Cleveland. Bold spices, clever contrasts, and a cocktail lounge that keeps pace with the food. The clay bread is non-negotiable. Build your table around three or four small plates and watch the meal become greater than the sum of its parts.", taste: 7, value: 8, atmosphere: 9 } }, summary: "Amba earns its place at the top of Cleveland's small plates scene through sheer commitment to flavor and atmosphere. Douglas Katz has created a moody, flavor-forward room that rewards sharing. The clay bread will haunt you." },
  { id: 4, name: "Bad Medicine", cuisine: "American / Vinyl Bar", location: "West Park, Cleveland", priceRange: "$$", visited: false, photos: [], coverEmoji: "🎵", tags: ["Vinyl Bar","Cocktails","Date Night"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 5, name: "Beet Jar", cuisine: "Vegan", location: "Hingetown / Shaker Heights", priceRange: "$", visited: false, photos: [], coverEmoji: "🥗", tags: ["Vegan","Sandwiches","Healthy"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 6, name: "Batuqui", cuisine: "Brazilian Steakhouse", location: "Larchmere / Chagrin Falls", priceRange: "$$$", visited: false, photos: [], coverEmoji: "🥩", tags: ["Steakhouse","Brazilian","Special Occasion"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 7, name: "Cafe Everest", cuisine: "Nepalese / Indian", location: "Bellaire-Puritas, Cleveland", priceRange: "$", visited: false, photos: [], coverEmoji: "⛰️", tags: ["Dumplings","Nepalese","Casual"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 8, name: "Cent's Pizza & Goods", cuisine: "Wood-Fired Pizza", location: "Ohio City", priceRange: "$$", visited: false, photos: [], coverEmoji: "🍕", tags: ["Pizza","Wood-Fired","Vibes"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 9, name: "Cloak & Dagger", cuisine: "Vegan / Cocktail Lounge", location: "Tremont", priceRange: "$$", visited: false, photos: [], coverEmoji: "📚", tags: ["Vegan","Craft Cocktails","Literary"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 10, name: "Cordelia", cuisine: "Modern American", location: "Downtown Cleveland", priceRange: "$$", visited: false, photos: [], coverEmoji: "🍔", tags: ["Modern American","Brunch","Midwestern"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 11, name: "Chez Francois", cuisine: "French", location: "Vermilion", priceRange: "$$$$", visited: false, photos: [], coverEmoji: "🥂", tags: ["Fine Dining","French","Riverfront"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 12, name: "CleaveLand Grocers & Grill", cuisine: "Pakistani / American", location: "Midtown / Strongsville", priceRange: "$$", visited: false, photos: [], coverEmoji: "🫔", tags: ["Smash Burgers","Halal","Pakistani"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 13, name: "Coppia", cuisine: "Fine Dining Italian", location: "Willoughby", priceRange: "$$$$", visited: false, photos: [], coverEmoji: "🐚", tags: ["Fine Dining","Italian","Quiet Luxury"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 14, name: "Edwins Leadership & Restaurant Institute", cuisine: "French", location: "Cleveland Heights", priceRange: "$$$", visited: false, photos: [], coverEmoji: "🎓", tags: ["Fine Dining","French","Social Impact"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 15, name: "Fahrenheit", cuisine: "Asian-Fusion / Steakhouse", location: "Downtown Cleveland", priceRange: "$$$", visited: false, photos: [], coverEmoji: "🔥", tags: ["Sushi","Steakhouse","Skyline Views"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 16, name: "Flour", cuisine: "Italian", location: "Brecksville / Moreland Hills", priceRange: "$$$", visited: false, photos: [], coverEmoji: "🌾", tags: ["Italian","Wood-Fired","Pasta"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 17, name: "Ginko", cuisine: "Sushi", location: "Tremont", priceRange: "$$$", visited: false, photos: [], coverEmoji: "🍣", tags: ["Sushi","Omakase","Date Night"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 18, name: "Good Company", cuisine: "American Diner", location: "Cleveland / Akron", priceRange: "$$", visited: false, photos: [], coverEmoji: "🧁", tags: ["Diner","Milkshakes","Comfort Food"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 19, name: "Heart of Gold", cuisine: "American", location: "Ohio City", priceRange: "$$", visited: false, photos: [], coverEmoji: "💛", tags: ["Smash Burger","Cocktails","Casual"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 20, name: "Il Rione", cuisine: "Neapolitan Pizza", location: "Gordon Square, Cleveland", priceRange: "$$", visited: false, photos: [], coverEmoji: "🍕", tags: ["Neapolitan Pizza","Rock n Roll","Date Night"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 21, name: "JoJo's Bar", cuisine: "Italian American Steakhouse", location: "Chagrin Falls", priceRange: "$$$", visited: false, photos: [], coverEmoji: "🕯️", tags: ["Steakhouse","Fresh Pasta","Celebrations"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 22, name: "Julia's 1902", cuisine: "Fine Dining / Global", location: "Willoughby", priceRange: "$$$", visited: false, photos: [], coverEmoji: "🏛️", tags: ["Fine Dining","Historic Building","Date Night"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 23, name: "Juneberry Table", cuisine: "Seasonal Brunch", location: "Ohio City", priceRange: "$$", visited: false, photos: [], coverEmoji: "🫐", tags: ["Brunch","Local Sourcing","Weekend"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 24, name: "Larder Delicatessen & Bakery", cuisine: "Modern Jewish Deli", location: "Hingetown", priceRange: "$$", visited: false, photos: [], coverEmoji: "🥪", tags: ["Deli","Koji","James Beard"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 25, name: "The Last Page", cuisine: "Global Small Plates", location: "Pinecrest, Orange", priceRange: "$$$", visited: false, photos: [], coverEmoji: "📖", tags: ["Small Plates","Craft Cocktails","Global"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 26, name: "LJ Shanghai", cuisine: "Shanghainese", location: "AsiaTown, Cleveland", priceRange: "$", visited: false, photos: [], coverEmoji: "🥟", tags: ["Soup Dumplings","Noodles","Cash Only"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 27, name: "Locos Street Tacos & Burrito", cuisine: "Mexican", location: "West Cleveland", priceRange: "$", visited: false, photos: [], coverEmoji: "🌮", tags: ["Birria","Street Tacos","Drive-Thru"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 28, name: "Mallorca", cuisine: "Spanish / Portuguese", location: "Downtown Cleveland", priceRange: "$$$", visited: false, photos: [], coverEmoji: "🦐", tags: ["Spanish","Paella","James Beard"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 29, name: "Marble Room Steaks & Raw Bar", cuisine: "American Steakhouse", location: "Downtown Cleveland", priceRange: "$$$$", visited: false, photos: [], coverEmoji: "🏦", tags: ["Steakhouse","Art Deco","Historic"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 30, name: "Martha on the Fly", cuisine: "Breakfast / Brunch", location: "Tremont", priceRange: "$", visited: false, photos: [], coverEmoji: "🍳", tags: ["Breakfast","Takeout","Sandwiches"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 31, name: "Mason's Creamery", cuisine: "Ice Cream / Ramen", location: "Ohio City", priceRange: "$", visited: false, photos: [], coverEmoji: "🍦", tags: ["Ice Cream","Ramen","Seasonal"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 32, name: "Never Say Dive", cuisine: "Chef-Driven Bar Food", location: "Old Brooklyn", priceRange: "$$", visited: false, photos: [], coverEmoji: "🍺", tags: ["Bar Food","Cocktails","Neighborhood"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 33, name: "Noble Beast Brewing Co.", cuisine: "Brewery / American", location: "Downtown Cleveland", priceRange: "$$", visited: false, photos: [], coverEmoji: "🍻", tags: ["Craft Beer","Brewery","Farm-Fresh"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 34, name: "Ohio Pie Co.", cuisine: "Creative Pizza", location: "Brunswick / Parma / Rocky River", priceRange: "$$", visited: false, photos: [], coverEmoji: "🎨", tags: ["Creative Pizza","Ohio-Style","Weekly Specials"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 35, name: "Pier W", cuisine: "Seafood", location: "Lakewood", priceRange: "$$$$", visited: false, photos: [], coverEmoji: "🌊", tags: ["Seafood","Lake Erie Views","Sunday Brunch"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 36, name: "The Pompadour", cuisine: "American Small Plates", location: "Fairport Harbor", priceRange: "$$$", visited: false, photos: [], coverEmoji: "🌅", tags: ["Small Plates","Coastal","Shareable"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 37, name: "Pho Lee's Vietnamese Restaurant", cuisine: "Vietnamese", location: "AsiaTown, Cleveland", priceRange: "$$", visited: false, photos: [], coverEmoji: "🍜", tags: ["Pho","Vietnamese","24-Hour Broth"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 38, name: "Poppy", cuisine: "Modern American", location: "Larchmere", priceRange: "$$$", visited: false, photos: [], coverEmoji: "🌺", tags: ["Garden Patio","American","Seasonal"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 39, name: "Rood", cuisine: "Global / American", location: "Lakewood", priceRange: "$$", visited: false, photos: [], coverEmoji: "🎂", tags: ["Global Flavors","Dessert","Walleye"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 40, name: "Sapphire Creek Winery & Gardens", cuisine: "American / Wine Bar", location: "Chagrin Falls", priceRange: "$$$", visited: false, photos: [], coverEmoji: "🍷", tags: ["Winery","Steaks","Date Night"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 41, name: "Slyman's Restaurant & Deli", cuisine: "Classic Deli", location: "Downtown Cleveland", priceRange: "$", visited: false, photos: [], coverEmoji: "🥩", tags: ["Corned Beef","Institution","Lunch Only"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 42, name: "STEAK", cuisine: "Modern Steakhouse", location: "Tremont", priceRange: "$$$", visited: false, photos: [], coverEmoji: "🥩", tags: ["Steakhouse","Trendy","Waffle Fries"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 43, name: "Strip Steakhouse", cuisine: "Classic Steakhouse", location: "Avon", priceRange: "$$$", visited: false, photos: [], coverEmoji: "🐮", tags: ["Steakhouse","Historic Barn","Dry-Aged"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 44, name: "Thyme Table", cuisine: "Modern American", location: "Bay Village", priceRange: "$$$", visited: false, photos: [], coverEmoji: "🌿", tags: ["Seasonal","Wine","Patio"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 45, name: "Tita Flora's", cuisine: "Filipino", location: "Independence", priceRange: "$$", visited: false, photos: [], coverEmoji: "🍛", tags: ["Filipino","Sizzling Plates","Family Style"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 46, name: "Tripi Italian Specialties", cuisine: "Italian Deli", location: "Ohio City", priceRange: "$", visited: false, photos: [], coverEmoji: "🍝", tags: ["Italian Deli","Sandwiches","Old School"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 47, name: "Tutto Carne", cuisine: "Italian Steakhouse", location: "Little Italy", priceRange: "$$$$", visited: false, photos: [], coverEmoji: "🥩", tags: ["Steakhouse","Little Italy","Nose-to-Tail"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 48, name: "Vero", cuisine: "Neapolitan Pizza", location: "Cleveland Heights", priceRange: "$$", visited: false, photos: [], coverEmoji: "🍕", tags: ["Neapolitan Pizza","Imported Wine","Gelato"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 49, name: "Zhug", cuisine: "Middle Eastern", location: "Cleveland Heights", priceRange: "$$", visited: false, photos: [], coverEmoji: "🌿", tags: ["Middle Eastern","Mezze","No Reservations"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
  { id: 50, name: "Zoma Ethiopian Restaurant", cuisine: "Ethiopian", location: "Cleveland Heights", priceRange: "$$", visited: false, photos: [], coverEmoji: "🍚", tags: ["Ethiopian","Communal","Injera"], reviews: { 1: { done: false }, 2: { done: false } }, summary: "" },
];

function avg(a, b) { return ((a + b) / 2).toFixed(1); }
function overallAvg(r) {
  const vals = ["taste","value","atmosphere"].map(c => parseFloat(avg(r.reviews[1][c], r.reviews[2][c])));
  return (vals.reduce((s,v) => s+v, 0) / 3).toFixed(1);
}
function scoreBadge(score) {
  const s = parseFloat(score);
  if (s >= 8.5) return { label: "Outstanding", color: "#2a9d2a" };
  if (s >= 7)   return { label: "Excellent",   color: "#4a9d4a" };
  if (s >= 5.5) return { label: "Good",        color: "#9d7a2a" };
  return             { label: "Fair",        color: "#9d4a2a" };
}

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500;700&display=swap');`;

const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { width: 100%; }
  body { width: 100%; background: #f5f0e8; color: #1a1410; overflow-x: hidden; -webkit-text-size-adjust: 100%; }
  #root { width: 100%; }
  .app-shell { width: 100%; min-height: 100vh; background: #f5f0e8; }

  /* NAV */
  .nav { background: #1a1410; height: 64px; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; position: sticky; top: 0; z-index: 100; box-shadow: 0 2px 20px rgba(0,0,0,0.3); width: 100%; }
  .nav-links { display: flex; gap: 24px; }
  .nav-link { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; color: #c8b89a; letter-spacing: 0.05em; text-transform: uppercase; cursor: pointer; border-bottom: 2px solid transparent; padding: 4px 0; transition: color 0.15s; }
  .nav-link:hover, .nav-link.active { color: #C8472C; border-bottom-color: #C8472C; }

  /* HERO */
  .hero { background: linear-gradient(135deg, #1a1410 0%, #2d1f17 50%, #1a1410 100%); padding: 80px 24px 60px; width: 100%; position: relative; overflow: hidden; }
  .hero-content { position: relative; z-index: 1; max-width: 700px; }

  /* STATS BAR */
  .stats-bar { background: #C8472C; padding: 20px 24px; display: flex; gap: 0; width: 100%; }
  .stat-item { flex: 1; text-align: center; }

  /* PAGE */
  .page { width: 100%; padding: 40px 24px; }

  /* CARDS */
  .card { background: #fff; box-shadow: 0 2px 12px rgba(0,0,0,0.06); overflow: hidden; }
  .card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; cursor: pointer; }
  .card-hover:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.12); }

  /* GRIDS */
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }

  /* CHECKLIST */
  .checklist-row { display: flex; align-items: center; gap: 12px; padding: 16px 12px; border-bottom: 1px solid #ede8e0; cursor: pointer; transition: background 0.15s; }
  .checklist-row:hover { background: #ede8e0; }

  /* STATUS BAR */
  .status-bar { background: #fff; box-shadow: 0 2px 12px rgba(0,0,0,0.05); display: flex; flex-wrap: wrap; margin-bottom: 32px; }
  .status-item { display: flex; align-items: center; gap: 8px; padding: 14px 20px; flex: 1; min-width: 140px; border-right: 1px solid #ede8e0; }
  .status-item:last-child { border-right: none; }

  /* SCORE ROW */
  .score-row { display: flex; align-items: flex-start; gap: 20px; padding: 24px; }
  .score-label { width: 160px; flex-shrink: 0; }

  /* RANKINGS */
  .ranking-row { background: #fff; padding: 20px; display: flex; align-items: center; gap: 16px; margin-bottom: 12px; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
  .ranking-row:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
  .mini-scores { display: flex; gap: 16px; }

  /* SORT TABS */
  .sort-tabs { display: flex; border: 1px solid #ede8e0; overflow: hidden; margin-bottom: 32px; }
  .sort-tab { flex: 1; background: #fff; color: #6a5a4a; border: none; padding: 14px 8px; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; transition: all 0.15s; }
  .sort-tab.active { background: #1a1410; color: #f5f0e8; }

  /* FILTER TABS */
  .filter-tabs { display: flex; border-bottom: 2px solid #ede8e0; margin-bottom: 24px; }
  .filter-tab { background: none; border: none; border-bottom: 2px solid transparent; margin-bottom: -2px; padding: 10px 20px; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 14px; color: #6a5a4a; cursor: pointer; }
  .filter-tab.active { color: #C8472C; border-bottom-color: #C8472C; }

  /* FADE */
  .fade-in { animation: fadeIn 0.4s ease forwards; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }

  /* SECTION TITLE */
  .section-title { font-family: 'DM Mono', monospace; font-size: 10px; color: #C8472C; letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 4px; }
  .section-divider { height: 1px; background: #ede8e0; margin-bottom: 20px; }

  /* SCROLLBAR */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #ede8e0; }
  ::-webkit-scrollbar-thumb { background: #c8b89a; border-radius: 3px; }

  /* TABLET */
  @media (max-width: 860px) {
    .grid-3 { grid-template-columns: 1fr 1fr; }
    .mini-scores { display: none; }
    .score-label { width: 120px; }
    .sort-tab { font-size: 12px; padding: 12px 4px; }
  }

  /* MOBILE */
  @media (max-width: 560px) {
    .nav { padding: 0 16px; }
    .nav-links { gap: 14px; }
    .nav-link { font-size: 11px; }
    .hero { padding: 48px 16px 40px; }
    .page { padding: 24px 16px; }
    .stats-bar { padding: 16px; gap: 0; }
    .grid-3 { grid-template-columns: 1fr; }
    .grid-2 { grid-template-columns: 1fr; }
    .score-row { flex-direction: column; gap: 12px; }
    .score-label { width: 100%; }
    .sort-tabs { flex-wrap: wrap; }
    .sort-tab { min-width: 50%; font-size: 12px; padding: 10px 4px; }
    .ranking-row { flex-wrap: wrap; gap: 10px; }
    .checklist-row { gap: 8px; }
    .status-item { min-width: 48%; }
    .hero-buttons { flex-direction: column; gap: 10px; }
    .hero-buttons button { width: 100%; }
    .top-pick-row { flex-direction: column !important; gap: 16px !important; }
    .restaurant-header-row { flex-direction: column !important; gap: 16px !important; }
    .reviewer-card-header { flex-wrap: wrap; }
  }
`;

function ScoreBar({ score }) {
  const pct = (score / 10) * 100;
  const badge = scoreBadge(score);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ flex: 1, height: 6, background: "#e8e0d4", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: badge.color, borderRadius: 3, transition: "width 0.6s ease" }} />
      </div>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 700, color: badge.color, minWidth: 28 }}>{score}</span>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div>
      <div className="section-title">✦ {children}</div>
      <div className="section-divider" />
    </div>
  );
}

function Tag({ label }) {
  return <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#9a8a7a", background: "#f5f0e8", padding: "3px 8px", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>{label}</span>;
}

// ─── NAV ─────────────────────────────────────────────────────────────────────

function Nav({ page, setPage }) {
  return (
    <nav className="nav">
      <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flexShrink: 0 }} onClick={() => setPage("home")}>
        <span style={{ fontSize: 20 }}>🍽️</span>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 900, color: "#f5f0e8", lineHeight: 1 }}>The Table</div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: "#C8472C", letterSpacing: "0.2em" }}>CLE REVIEWS</div>
        </div>
      </div>
      <div className="nav-links">
        {[["home","Home"],["checklist","Restaurants"],["rankings","Rankings"],["reviewers","Reviewers"]].map(([key, label]) => (
          <span key={key} className={`nav-link${page === key ? " active" : ""}`} onClick={() => setPage(key)}>{label}</span>
        ))}
      </div>
    </nav>
  );
}

// ─── HOME ────────────────────────────────────────────────────────────────────

function HomePage({ restaurants, setPage, setSelectedId }) {
  const reviewed = restaurants.filter(r => r.reviews[1].done && r.reviews[2].done);
  const topPick = reviewed.length ? [...reviewed].sort((a,b) => parseFloat(overallAvg(b)) - parseFloat(overallAvg(a)))[0] : null;
  const recent = reviewed.slice(0, 3);

  return (
    <div className="fade-in">
      {/* Hero */}
      <div className="hero">
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(200,71,44,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(44,111,200,0.08) 0%, transparent 50%)" }} />
        <div className="hero-content">
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#C8472C", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16 }}>✦ Cleveland & Northeast Ohio ✦</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px, 8vw, 80px)", fontWeight: 900, color: "#f5f0e8", lineHeight: 1.05, marginBottom: 20 }}>
            Two voices.<br /><em style={{ color: "#C8472C" }}>One table.</em>
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#a09080", lineHeight: 1.7, marginBottom: 32, maxWidth: 480 }}>
            Working through Cleveland Magazine's 50 Best — scored on Taste, Value, and Atmosphere. No ads, no comps.
          </p>
          <div className="hero-buttons" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={() => setPage("checklist")} style={{ background: "#C8472C", color: "#fff", border: "none", padding: "13px 28px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer", letterSpacing: "0.05em" }}>Browse the List →</button>
            <button onClick={() => setPage("rankings")} style={{ background: "transparent", color: "#f5f0e8", border: "1px solid rgba(245,240,232,0.3)", padding: "13px 28px", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 14, cursor: "pointer", letterSpacing: "0.05em" }}>See Rankings</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-bar">
        {[["50","On the List"],[reviewed.length.toString(),"Fully Reviewed"],[(50-reviewed.length).toString(),"Still to Visit"]].map(([val, label]) => (
          <div key={label} className="stat-item">
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, color: "#fff" }}>{val}</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.7)", letterSpacing: "0.2em", textTransform: "uppercase" }}>{label}</div>
          </div>
        ))}
      </div>

      <div className="page">
        {/* Top Pick */}
        {topPick && (
          <div style={{ marginBottom: 48 }}>
            <SectionTitle>Current Top Pick</SectionTitle>
            <div className="card card-hover top-pick-row" onClick={() => { setSelectedId(topPick.id); setPage("restaurant"); }}
              style={{ display: "flex", gap: 32, alignItems: "center", padding: 32, background: "#1a1410", color: "#f5f0e8" }}>
              <div style={{ fontSize: 64, lineHeight: 1, flexShrink: 0 }}>{topPick.coverEmoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#C8472C", letterSpacing: "0.2em", marginBottom: 6 }}>{topPick.cuisine} · {topPick.location}</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 900, marginBottom: 10, wordBreak: "break-word" }}>{topPick.name}</h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#a09080", lineHeight: 1.6 }}>{topPick.summary}</p>
              </div>
              <div style={{ textAlign: "center", flexShrink: 0 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 52, fontWeight: 900, color: "#C8472C", lineHeight: 1 }}>{overallAvg(topPick)}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#a09080", letterSpacing: "0.2em" }}>OVERALL</div>
              </div>
            </div>
          </div>
        )}

        {/* Recent */}
        {recent.length > 0 && (
          <div>
            <SectionTitle>Recent Reviews</SectionTitle>
            <div className="grid-3">
              {recent.map(r => (
                <div key={r.id} className="card card-hover" onClick={() => { setSelectedId(r.id); setPage("restaurant"); }}>
                  <div style={{ background: "#1a1410", padding: 28, textAlign: "center", fontSize: 48 }}>{r.coverEmoji}</div>
                  <div style={{ padding: 20 }}>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#9a8a7a", letterSpacing: "0.1em", marginBottom: 6 }}>{r.cuisine}</div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, marginBottom: 6, wordBreak: "break-word" }}>{r.name}</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#6a5a4a", marginBottom: 14 }}>{r.location} · {r.priceRange}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: "1px solid #ede8e0" }}>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{r.tags.slice(0,2).map(t => <Tag key={t} label={t} />)}</div>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: "#C8472C" }}>{overallAvg(r)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {reviewed.length === 0 && (
          <div className="card" style={{ padding: 60, textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🗺️</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, marginBottom: 10 }}>The journey begins</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#6a5a4a", fontSize: 15 }}>50 restaurants. Two critics. Zero excuses.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── CHECKLIST ───────────────────────────────────────────────────────────────

function ChecklistPage({ restaurants, setPage, setSelectedId }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = restaurants.filter(r => {
    const matchFilter = filter === "all" || (filter === "reviewed" && r.reviews[1].done && r.reviews[2].done) || (filter === "pending" && (!r.reviews[1].done || !r.reviews[2].done));
    const matchSearch = !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.cuisine.toLowerCase().includes(search.toLowerCase()) || r.location.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="fade-in page">
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#C8472C", letterSpacing: "0.3em", marginBottom: 8 }}>✦ THE MASTER LIST</div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, marginBottom: 6 }}>Restaurant Checklist</h1>
      <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#6a5a4a", marginBottom: 24, fontSize: 15 }}>Cleveland Magazine's 50 Best — working through every one.</p>

      <input type="text" placeholder="Search by name, cuisine or location…" value={search} onChange={e => setSearch(e.target.value)}
        style={{ width: "100%", padding: "10px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, border: "1px solid #ded8d0", background: "#fff", outline: "none", color: "#1a1410", marginBottom: 20, display: "block" }} />

      <div className="filter-tabs">
        {[["all","All 50"],["reviewed","Reviewed"],["pending","Pending"]].map(([key, label]) => (
          <button key={key} className={`filter-tab${filter === key ? " active" : ""}`} onClick={() => setFilter(key)}>{label}</button>
        ))}
        <div style={{ marginLeft: "auto", fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#9a8a7a", display: "flex", alignItems: "center", paddingRight: 8 }}>{filtered.length} shown</div>
      </div>

      <div>
        {filtered.map((r, i) => {
          const fullyDone = r.reviews[1].done && r.reviews[2].done;
          const score = fullyDone ? overallAvg(r) : null;
          return (
            <div key={r.id} className="checklist-row" onClick={() => { setSelectedId(r.id); setPage("restaurant"); }}
              style={{ background: i % 2 === 0 ? "#fff" : "transparent" }}>
              <div style={{ width: 24, height: 24, border: `2px solid ${fullyDone ? "#2a9d2a" : "#c8b89a"}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: fullyDone ? "#2a9d2a" : "transparent" }}>
                {fullyDone && <span style={{ color: "#fff", fontSize: 12 }}>✓</span>}
              </div>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#9a8a7a", minWidth: 24, flexShrink: 0 }}>{String(r.id).padStart(2,"0")}</span>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{r.coverEmoji}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 2 }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: fullyDone ? "#1a1410" : "#6a5a4a", wordBreak: "break-word" }}>{r.name}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#C8472C", background: "#fdf0ed", padding: "2px 6px" }}>{r.priceRange}</span>
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9a8a7a" }}>{r.cuisine} · {r.location}</div>
              </div>
              <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                {[{l:"V",done:r.visited,c:"#6a5a8a"},{l:"M",done:r.reviews[1].done,c:REVIEWERS[0].color},{l:"S",done:r.reviews[2].done,c:REVIEWERS[1].color}].map(s => (
                  <div key={s.l} title={s.l} style={{ width: 20, height: 20, borderRadius: "50%", background: s.done ? s.c : "#e8e0d4", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Mono', monospace", fontSize: 8, color: s.done ? "#fff" : "#9a8a7a", fontWeight: 700 }}>{s.l}</div>
                ))}
              </div>
              <div style={{ minWidth: 44, textAlign: "right", flexShrink: 0 }}>
                {score ? <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: "#C8472C" }}>{score}</span>
                  : <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#c8b89a" }}>TBD</span>}
              </div>
              <span style={{ color: "#c8b89a", flexShrink: 0 }}>›</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── RESTAURANT PAGE ──────────────────────────────────────────────────────────

function RestaurantPage({ restaurant, setPage }) {
  if (!restaurant) return null;
  const r = restaurant;
  const r1 = r.reviews[1], r2 = r.reviews[2];
  const bothDone = r1.done && r2.done;
  const cats = [
    { key: "taste",      label: "Taste",      icon: "🍴", desc: "How does the food actually taste?" },
    { key: "value",      label: "Value",      icon: "⭐", desc: "Are you getting your money's worth?" },
    { key: "atmosphere", label: "Atmosphere", icon: "🕯️", desc: "Does the room match the food?" },
  ];

  return (
    <div className="fade-in">
      {/* Header */}
      <div style={{ background: "#1a1410", padding: "48px 24px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 80% 50%, ${REVIEWERS[0].color}15, transparent 60%)` }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <button onClick={() => setPage("checklist")} style={{ background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "#a09080", padding: "6px 14px", fontFamily: "'DM Mono', monospace", fontSize: 10, cursor: "pointer", marginBottom: 24, letterSpacing: "0.1em" }}>← Back to List</button>
          <div className="restaurant-header-row" style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
            <div style={{ fontSize: 64, lineHeight: 1, flexShrink: 0 }}>{r.coverEmoji}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#C8472C", letterSpacing: "0.25em", marginBottom: 8 }}>#{String(r.id).padStart(2,"0")} · {r.cuisine} · {r.location} · {r.priceRange}</div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 5vw, 52px)", fontWeight: 900, color: "#f5f0e8", marginBottom: 12, wordBreak: "break-word" }}>{r.name}</h1>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {r.tags.map(t => <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#c8b89a", border: "1px solid rgba(200,184,154,0.4)", padding: "3px 8px", letterSpacing: "0.1em" }}>{t}</span>)}
              </div>
            </div>
            {bothDone && (
              <div style={{ textAlign: "center", background: "#C8472C", padding: "16px 24px", flexShrink: 0 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 900, color: "#fff", lineHeight: 1 }}>{overallAvg(r)}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.7)", letterSpacing: "0.2em", marginTop: 4 }}>OVERALL</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="page">
        {/* Status */}
        <div className="status-bar">
          {[{ label: "Visited", done: r.visited },{ label: `${REVIEWERS[0].name} Reviewed`, done: r1.done, color: REVIEWERS[0].color },{ label: `${REVIEWERS[1].name} Reviewed`, done: r2.done, color: REVIEWERS[1].color },{ label: "Fully Complete", done: bothDone }].map(s => (
            <div key={s.label} className="status-item">
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: s.done ? (s.color || "#2a9d2a") : "#e8e0d4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", flexShrink: 0 }}>{s.done ? "✓" : ""}</div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: s.done ? 600 : 400, color: s.done ? "#1a1410" : "#9a8a7a" }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Photos */}
        {r.photos.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <SectionTitle>Photos</SectionTitle>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {r.photos.map((p,i) => <div key={i} style={{ flex: "1 1 80px", minWidth: 80, background: "#1a1410", height: 140, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>{p}</div>)}
              <div style={{ flex: "1 1 80px", minWidth: 80, background: "#ede8e0", height: 140, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 4, border: "2px dashed #c8b89a" }}>
                <span style={{ fontSize: 20, color: "#c8b89a" }}>+</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: "#c8b89a", letterSpacing: "0.1em" }}>ADD PHOTO</span>
              </div>
            </div>
          </div>
        )}

        {bothDone ? (
          <>
            {/* Descriptions */}
            <div style={{ marginBottom: 40 }}>
              <SectionTitle>Reviewer Impressions</SectionTitle>
              <div className="grid-2">
                {REVIEWERS.map(rev => {
                  const rv = r.reviews[rev.id];
                  return (
                    <div key={rev.id} className="card" style={{ padding: 24 }}>
                      <div className="reviewer-card-header" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid #ede8e0" }}>
                        <div style={{ width: 38, height: 38, borderRadius: "50%", background: rev.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{rev.avatar}</div>
                        <div>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: "#1a1410" }}>{rev.name}</div>
                          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: rev.color, letterSpacing: "0.1em" }}>{rev.handle}</div>
                        </div>
                      </div>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.7, color: "#3a2a1a", fontStyle: "italic", wordBreak: "break-word" }}>"{rv.description}"</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scores */}
            <div style={{ marginBottom: 40 }}>
              <SectionTitle>Category Scores</SectionTitle>
              {cats.map((cat, ci) => (
                <div key={cat.key} style={{ background: ci % 2 === 0 ? "#fff" : "#faf7f2", marginBottom: 2 }}>
                  <div className="score-row">
                    <div className="score-label">
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        <span style={{ fontSize: 18 }}>{cat.icon}</span>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700 }}>{cat.label}</span>
                      </div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9a8a7a" }}>{cat.desc}</div>
                    </div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                      {REVIEWERS.map(rev => (
                        <div key={rev.id} style={{ borderLeft: `3px solid ${rev.color}`, paddingLeft: 12 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                            <div style={{ width: 28, height: 28, borderRadius: "50%", background: rev.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 700, color: "#fff" }}>{rev.avatar}</div>
                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600 }}>{rev.name}</span>
                          </div>
                          <ScoreBar score={r.reviews[rev.id][cat.key]} />
                        </div>
                      ))}
                    </div>
                    <div style={{ textAlign: "center", background: "#1a1410", padding: "14px 20px", flexShrink: 0, minWidth: 70 }}>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, color: "#f5f0e8", lineHeight: 1 }}>{avg(r1[cat.key], r2[cat.key])}</div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: "#C8472C", letterSpacing: "0.1em", marginTop: 4 }}>AVG</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Verdict */}
            {r.summary && (
              <div>
                <SectionTitle>Our Verdict</SectionTitle>
                <div style={{ background: "#1a1410", padding: "32px 28px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 10, left: 20, fontFamily: "'Playfair Display', serif", fontSize: 100, color: "rgba(200,71,44,0.1)", lineHeight: 1, userSelect: "none" }}>"</div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(15px, 2.5vw, 19px)", lineHeight: 1.7, color: "#f5f0e8", fontStyle: "italic", position: "relative", wordBreak: "break-word" }}>{r.summary}</p>
                  <div style={{ marginTop: 16, fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#C8472C", letterSpacing: "0.2em" }}>— Marcus Webb & Sasha Okafor</div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="card" style={{ padding: 48, textAlign: "center" }}>
            <div style={{ fontSize: 44, marginBottom: 14 }}>📝</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, marginBottom: 10 }}>Review Pending</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#6a5a4a", fontSize: 14 }}>
              {!r.visited ? "This restaurant hasn't been visited yet." : "One or both reviewers haven't submitted their scores yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── RANKINGS ────────────────────────────────────────────────────────────────

function RankingsPage({ restaurants, setPage, setSelectedId }) {
  const [sortBy, setSortBy] = useState("overall");
  const reviewed = restaurants.filter(r => r.reviews[1].done && r.reviews[2].done);
  const sortOptions = [["overall","Overall","🏆"],["value","Best Value","⭐"],["atmosphere","Best Atmosphere","🕯️"],["taste","Best Taste","🍴"]];
  const sorted = [...reviewed].sort((a, b) => {
    const getScore = r => sortBy === "overall" ? parseFloat(overallAvg(r)) : parseFloat(avg(r.reviews[1][sortBy], r.reviews[2][sortBy]));
    return getScore(b) - getScore(a);
  });

  return (
    <div className="fade-in page">
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#C8472C", letterSpacing: "0.3em", marginBottom: 8 }}>✦ THE LEADERBOARD</div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, marginBottom: 28 }}>Rankings</h1>
      <div className="sort-tabs">
        {sortOptions.map(([key, label, icon]) => (
          <button key={key} className={`sort-tab${sortBy === key ? " active" : ""}`} onClick={() => setSortBy(key)}>
            <span>{icon}</span><span>{label}</span>
          </button>
        ))}
      </div>
      {reviewed.length === 0 ? (
        <div className="card" style={{ padding: 60, textAlign: "center" }}>
          <div style={{ fontSize: 44, marginBottom: 12 }}>🍽️</div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#9a8a7a", fontSize: 15 }}>No reviews yet — get eating!</p>
        </div>
      ) : (
        sorted.map((r, i) => {
          const displayScore = sortBy === "overall" ? overallAvg(r) : avg(r.reviews[1][sortBy], r.reviews[2][sortBy]);
          const badge = scoreBadge(displayScore);
          return (
            <div key={r.id} className="ranking-row" onClick={() => { setSelectedId(r.id); setPage("restaurant"); }}
              style={{ border: i === 0 ? "1px solid rgba(200,71,44,0.3)" : "1px solid #f0ece4", boxShadow: i === 0 ? "0 4px 20px rgba(200,71,44,0.12)" : "0 1px 6px rgba(0,0,0,0.04)" }}>
              <div style={{ width: 40, height: 40, background: i === 0 ? "#C8472C" : "#f5f0e8", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 900, color: i === 0 ? "#fff" : "#9a8a7a", flexShrink: 0 }}>{i+1}</div>
              <span style={{ fontSize: 32, flexShrink: 0 }}>{r.coverEmoji}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 700, marginBottom: 3, wordBreak: "break-word" }}>{r.name}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9a8a7a" }}>{r.cuisine} · {r.location} · {r.priceRange}</div>
              </div>
              <div className="mini-scores">
                {["taste","value","atmosphere"].map(c => (
                  <div key={c} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: c === sortBy ? "#C8472C" : "#1a1410" }}>{avg(r.reviews[1][c], r.reviews[2][c])}</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: "#9a8a7a", letterSpacing: "0.1em", textTransform: "uppercase" }}>{c}</div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "center", paddingLeft: 16, borderLeft: "1px solid #ede8e0", flexShrink: 0, minWidth: 72 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 900, color: badge.color, lineHeight: 1 }}>{displayScore}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: badge.color, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 3 }}>{badge.label}</div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

// ─── REVIEWERS ────────────────────────────────────────────────────────────────

function ReviewersPage({ restaurants }) {
  const reviewed = restaurants.filter(r => r.reviews[1].done && r.reviews[2].done);
  return (
    <div className="fade-in page">
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#C8472C", letterSpacing: "0.3em", marginBottom: 8 }}>✦ MEET THE CRITICS</div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, marginBottom: 32 }}>The Reviewers</h1>
      <div className="grid-2" style={{ marginBottom: 48 }}>
        {REVIEWERS.map(rev => (
          <div key={rev.id} className="card">
            <div style={{ background: rev.color, padding: "32px 28px", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "3px solid rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: "#fff", flexShrink: 0 }}>{rev.avatar}</div>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 4 }}>{rev.name}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.75)", letterSpacing: "0.1em" }}>{rev.handle}</div>
              </div>
            </div>
            <div style={{ padding: 28 }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.7, color: "#3a2a1a", marginBottom: 20 }}>{rev.bio}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: "1px solid #ede8e0" }}>
                <div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#9a8a7a", letterSpacing: "0.2em", marginBottom: 3 }}>SPECIALTY</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: rev.color }}>{rev.specialty}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#9a8a7a", letterSpacing: "0.2em", marginBottom: 3 }}>COMPLETED</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 900, color: "#1a1410" }}>{reviewed.length} / 50</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {reviewed.length > 0 && (
        <div>
          <SectionTitle>Score Comparison</SectionTitle>
          <div className="card" style={{ padding: 24, overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
              <thead>
                <tr>{["Restaurant","Category", REVIEWERS[0].name, REVIEWERS[1].name,"Avg"].map(h => (
                  <th key={h} style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#9a8a7a", letterSpacing: "0.2em", textTransform: "uppercase", textAlign: "left", padding: "8px 10px", borderBottom: "2px solid #ede8e0" }}>{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {reviewed.flatMap(r => ["taste","value","atmosphere"].map((cat, ci) => (
                  <tr key={`${r.id}-${cat}`} style={{ background: ci % 2 === 0 ? "#faf7f2" : "#fff" }}>
                    <td style={{ padding: "9px 10px", fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 700, color: "#1a1410", borderBottom: "1px solid #ede8e0" }}>{ci === 0 ? r.name : ""}</td>
                    <td style={{ padding: "9px 10px", fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#9a8a7a", textTransform: "capitalize", borderBottom: "1px solid #ede8e0" }}>{cat}</td>
                    {[1,2].map(rid => <td key={rid} style={{ padding: "9px 10px", fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 700, color: REVIEWERS[rid-1].color, borderBottom: "1px solid #ede8e0" }}>{r.reviews[rid][cat]}</td>)}
                    <td style={{ padding: "9px 10px", fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 700, color: "#1a1410", borderBottom: "1px solid #ede8e0" }}>{avg(r.reviews[1][cat], r.reviews[2][cat])}</td>
                  </tr>
                )))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedId, setSelectedId] = useState(null);
  const [restaurants] = useState(INITIAL_RESTAURANTS);
  const selected = restaurants.find(r => r.id === selectedId) || null;

  return (
    <>
      <style>{FONTS + GLOBAL_CSS}</style>
      <div className="app-shell">
        <Nav page={page} setPage={setPage} />
        {page === "home"       && <HomePage       restaurants={restaurants} setPage={setPage} setSelectedId={setSelectedId} />}
        {page === "checklist"  && <ChecklistPage  restaurants={restaurants} setPage={setPage} setSelectedId={setSelectedId} />}
        {page === "restaurant" && <RestaurantPage restaurant={selected} setPage={setPage} />}
        {page === "rankings"   && <RankingsPage   restaurants={restaurants} setPage={setPage} setSelectedId={setSelectedId} />}
        {page === "reviewers"  && <ReviewersPage  restaurants={restaurants} />}
        <footer style={{ background: "#1a1410", padding: "32px 24px", marginTop: 64, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, width: "100%" }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 900, color: "#f5f0e8", marginBottom: 3 }}>The Table</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#6a5a4a", letterSpacing: "0.2em" }}>Cleveland & Northeast Ohio Restaurant Reviews</div>
          </div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#4a3a2a", letterSpacing: "0.1em" }}>© 2026 Marcus Webb & Sasha Okafor · All opinions our own</div>
        </footer>
      </div>
    </>
  );
}
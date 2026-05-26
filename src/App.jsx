import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const REVIEWERS = [
  {
    id: 1,
    name: "Marcus Webb",
    handle: "@marcuseats",
    bio: "Former line cook turned obsessive diner. I chase the perfect bowl of ramen and anything with truffles. Twelve years of eating professionally across four continents.",
    avatar: "MW",
    color: "#C8472C",
    specialty: "Fine Dining & Asian Cuisine",
    totalReviews: 3,
    avgScore: 7.8,
  },
  {
    id: 2,
    name: "Sasha Okafor",
    handle: "@sasha_bites",
    bio: "Food writer, cookbook hoarder, and champion of the underdog neighbourhood joint. If it's got soul and honest ingredients, I'm in. I believe atmosphere is half the meal.",
    avatar: "SO",
    color: "#2C6FC8",
    specialty: "Street Food & Hidden Gems",
    totalReviews: 3,
    avgScore: 7.4,
  },
];

const INITIAL_RESTAURANTS = [
  {
    id: 1,
    name: "Abundance",
    cuisine: "Northern Chinese",
    location: "Cleveland Heights",
    priceRange: "$$",
    visited: true,
    photos: ["🥟", "🫙", "🌶️"],
    coverEmoji: "🥟",
    tags: ["Dumplings", "Modern Chinese", "BYOB"],
    reviews: {
      1: {
        done: true,
        description:
          "Liu Fang's dumplings are the real deal — four varieties served in chili oil, each one a different lesson in restraint and heat. The renovated diner car is now a proper dining room with intention. Start tame and work your way to the Sichuan pork sausage, as instructed. One of the most interesting origin stories behind any restaurant in Cleveland.",
        taste: 8,
        value: 9,
        atmosphere: 8,
      },
      2: {
        done: true,
        description:
          "Abundance earns every bit of its reputation. The Northern Chinese cooking is precise and personal — you can taste the family history in every fold. The renovated space is warm and unpretentious. The jhol-adjacent dumpling sampler ($18) in chili oil is compulsory ordering. A genuine gem in Cleveland Heights.",
        taste: 8,
        value: 9,
        atmosphere: 7,
      },
    },
    summary:
      "Abundance is the kind of restaurant that reminds you why food matters. Liu Fang's dumplings are exceptional, and the renovated diner car now serves as a fitting stage for cooking with real cultural depth. Don't skip the dumpling sampler — eat them in order.",
  },
  {
    id: 2,
    name: "Acqua di Dea",
    cuisine: "Italian Seafood",
    location: "Downtown Cleveland",
    priceRange: "$$$",
    visited: true,
    photos: ["🦀", "🍷", "🌊"],
    coverEmoji: "🦞",
    tags: ["Seafood", "Date Night", "Wine Bar"],
    reviews: {
      1: {
        done: true,
        description:
          "The setting alone is worth the trip — low lighting, century-old brick, and Terminal Tower glowing through the half-rounded windows. Lola Jacaj has created something genuinely atmospheric on West Sixth. The Ravioli di Granchio is serious pasta: jumbo lump crab, lemon zest, saffron cream. Sommelier-curated pairings elevate every course.",
        taste: 6,
        value: 7,
        atmosphere: 9,
      },
      2: {
        done: true,
        description:
          "Italian seafood in Downtown Cleveland done with real conviction. The room is intimate and romantic without trying too hard. Owner Lola Jacaj clearly knows her wine — let her guide you. The crab ravioli is exceptional. Prices are steep but the experience justifies it for a special occasion.",
        taste: 5,
        value: 7,
        atmosphere: 9,
      },
    },
    summary:
      "Acqua di Dea captures downtown Cleveland at its most romantic. The Italian seafood menu is driven by technique and the kind of personal hospitality that can't be manufactured. Best enjoyed slowly, with good wine and good company.",
  },
  {
    id: 3,
    name: "Amba",
    cuisine: "Indian-Inspired Small Plates",
    location: "Ohio City",
    priceRange: "$$",
    visited: true,
    photos: ["🫓", "🌿", "🍳"],
    coverEmoji: "🌙",
    tags: ["Small Plates", "Cocktails", "Vegetarian-Friendly"],
    reviews: {
      1: {
        done: true,
        description:
          "Douglas Katz has built something genuinely exciting here. The clay bread alone — blistered, soft, ready to drag through everything — is worth the visit. The Indian-leaning mezze format rewards adventurous ordering: chickpea fritters, fried eggs, spinach dip. Everything is designed to layer and share. The amber-lit room creates the right mood.",
        taste: 7,
        value: 8,
        atmosphere: 9,
      },
      2: {
        done: true,
        description:
          "Amba is the most transportive dining room in Cleveland. Bold spices, clever contrasts, and a cocktail lounge that keeps pace with the food. The clay bread is non-negotiable. Build your table around three or four small plates and watch the meal become greater than the sum of its parts.",
        taste: 7,
        value: 8,
        atmosphere: 9,
      },
    },
    summary:
      "Amba earns its place at the top of Cleveland's small plates scene through sheer commitment to flavor and atmosphere. Douglas Katz has created a moody, flavor-forward room that rewards sharing. The clay bread will haunt you.",
  },
  {
    id: 4,
    name: "Bad Medicine",
    cuisine: "American / Vinyl Bar",
    location: "West Park, Cleveland",
    priceRange: "$$",
    visited: false,
    photos: [],
    coverEmoji: "🎵",
    tags: ["Vinyl Bar", "Cocktails", "Date Night"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 5,
    name: "Beet Jar",
    cuisine: "Vegan",
    location: "Hingetown / Shaker Heights",
    priceRange: "$",
    visited: false,
    photos: [],
    coverEmoji: "🥗",
    tags: ["Vegan", "Sandwiches", "Healthy"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 6,
    name: "Batuqui",
    cuisine: "Brazilian Steakhouse",
    location: "Larchmere / Chagrin Falls",
    priceRange: "$$$",
    visited: false,
    photos: [],
    coverEmoji: "🥩",
    tags: ["Steakhouse", "Brazilian", "Special Occasion"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 7,
    name: "Cafe Everest",
    cuisine: "Nepalese / Indian",
    location: "Bellaire-Puritas, Cleveland",
    priceRange: "$",
    visited: false,
    photos: [],
    coverEmoji: "⛰️",
    tags: ["Dumplings", "Nepalese", "Casual"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 8,
    name: "Cent's Pizza & Goods",
    cuisine: "Wood-Fired Pizza",
    location: "Ohio City",
    priceRange: "$$",
    visited: false,
    photos: [],
    coverEmoji: "🍕",
    tags: ["Pizza", "Wood-Fired", "Vibes"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 9,
    name: "Cloak & Dagger",
    cuisine: "Vegan / Cocktail Lounge",
    location: "Tremont",
    priceRange: "$$",
    visited: false,
    photos: [],
    coverEmoji: "📚",
    tags: ["Vegan", "Craft Cocktails", "Literary"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 10,
    name: "Cordelia",
    cuisine: "Modern American",
    location: "Downtown Cleveland",
    priceRange: "$$",
    visited: false,
    photos: [],
    coverEmoji: "🍔",
    tags: ["Modern American", "Brunch", "Midwestern"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 11,
    name: "Chez Francois",
    cuisine: "French",
    location: "Vermilion",
    priceRange: "$$$$",
    visited: false,
    photos: [],
    coverEmoji: "🥂",
    tags: ["Fine Dining", "French", "Riverfront"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 12,
    name: "CleaveLand Grocers & Grill",
    cuisine: "Pakistani / American",
    location: "Midtown / Strongsville",
    priceRange: "$$",
    visited: false,
    photos: [],
    coverEmoji: "🫔",
    tags: ["Smash Burgers", "Halal", "Pakistani"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 13,
    name: "Coppia",
    cuisine: "Fine Dining Italian",
    location: "Willoughby",
    priceRange: "$$$$",
    visited: false,
    photos: [],
    coverEmoji: "🐚",
    tags: ["Fine Dining", "Italian", "Quiet Luxury"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 14,
    name: "Edwins Leadership & Restaurant Institute",
    cuisine: "French",
    location: "Cleveland Heights",
    priceRange: "$$$",
    visited: false,
    photos: [],
    coverEmoji: "🎓",
    tags: ["Fine Dining", "French", "Social Impact"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 15,
    name: "Fahrenheit",
    cuisine: "Asian-Fusion / Steakhouse",
    location: "Downtown Cleveland",
    priceRange: "$$$",
    visited: false,
    photos: [],
    coverEmoji: "🔥",
    tags: ["Sushi", "Steakhouse", "Skyline Views"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 16,
    name: "Flour",
    cuisine: "Italian",
    location: "Brecksville / Moreland Hills",
    priceRange: "$$$",
    visited: false,
    photos: [],
    coverEmoji: "🌾",
    tags: ["Italian", "Wood-Fired", "Pasta"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 17,
    name: "Ginko",
    cuisine: "Sushi",
    location: "Tremont",
    priceRange: "$$$",
    visited: false,
    photos: [],
    coverEmoji: "🍣",
    tags: ["Sushi", "Omakase", "Date Night"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 18,
    name: "Good Company",
    cuisine: "American Diner",
    location: "Cleveland / Akron",
    priceRange: "$$",
    visited: false,
    photos: [],
    coverEmoji: "🧁",
    tags: ["Diner", "Milkshakes", "Comfort Food"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 19,
    name: "Heart of Gold",
    cuisine: "American",
    location: "Ohio City",
    priceRange: "$$",
    visited: false,
    photos: [],
    coverEmoji: "💛",
    tags: ["Smash Burger", "Cocktails", "Casual"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 20,
    name: "Il Rione",
    cuisine: "Neapolitan Pizza",
    location: "Gordon Square, Cleveland",
    priceRange: "$$",
    visited: false,
    photos: [],
    coverEmoji: "🍕",
    tags: ["Neapolitan Pizza", "Rock 'n' Roll", "Date Night"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 21,
    name: "JoJo's Bar",
    cuisine: "Italian American Steakhouse",
    location: "Chagrin Falls",
    priceRange: "$$$",
    visited: false,
    photos: [],
    coverEmoji: "🕯️",
    tags: ["Steakhouse", "Fresh Pasta", "Celebrations"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 22,
    name: "Julia's 1902",
    cuisine: "Fine Dining / Global",
    location: "Willoughby",
    priceRange: "$$$",
    visited: false,
    photos: [],
    coverEmoji: "🏛️",
    tags: ["Fine Dining", "Historic Building", "Date Night"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 23,
    name: "Juneberry Table",
    cuisine: "Seasonal Brunch",
    location: "Ohio City",
    priceRange: "$$",
    visited: false,
    photos: [],
    coverEmoji: "🫐",
    tags: ["Brunch", "Local Sourcing", "Weekend"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 24,
    name: "Larder Delicatessen & Bakery",
    cuisine: "Modern Jewish Deli",
    location: "Hingetown",
    priceRange: "$$",
    visited: false,
    photos: [],
    coverEmoji: "🥪",
    tags: ["Deli", "Koji", "James Beard"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 25,
    name: "The Last Page",
    cuisine: "Global Small Plates",
    location: "Pinecrest, Orange",
    priceRange: "$$$",
    visited: false,
    photos: [],
    coverEmoji: "📖",
    tags: ["Small Plates", "Craft Cocktails", "Global"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 26,
    name: "LJ Shanghai",
    cuisine: "Shanghainese",
    location: "AsiaTown, Cleveland",
    priceRange: "$",
    visited: false,
    photos: [],
    coverEmoji: "🥟",
    tags: ["Soup Dumplings", "Noodles", "Cash Only"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 27,
    name: "Locos Street Tacos & Burrito",
    cuisine: "Mexican",
    location: "West Cleveland",
    priceRange: "$",
    visited: false,
    photos: [],
    coverEmoji: "🌮",
    tags: ["Birria", "Street Tacos", "Drive-Thru"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 28,
    name: "Mallorca",
    cuisine: "Spanish / Portuguese",
    location: "Downtown Cleveland",
    priceRange: "$$$",
    visited: false,
    photos: [],
    coverEmoji: "🦐",
    tags: ["Spanish", "Paella", "James Beard"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 29,
    name: "Marble Room Steaks & Raw Bar",
    cuisine: "American Steakhouse",
    location: "Downtown Cleveland",
    priceRange: "$$$$",
    visited: false,
    photos: [],
    coverEmoji: "🏦",
    tags: ["Steakhouse", "Art Deco", "Historic"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 30,
    name: "Martha on the Fly",
    cuisine: "Breakfast / Brunch",
    location: "Tremont",
    priceRange: "$",
    visited: false,
    photos: [],
    coverEmoji: "🍳",
    tags: ["Breakfast", "Takeout", "Sandwiches"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 31,
    name: "Mason's Creamery",
    cuisine: "Ice Cream / Ramen",
    location: "Ohio City",
    priceRange: "$",
    visited: false,
    photos: [],
    coverEmoji: "🍦",
    tags: ["Ice Cream", "Ramen", "Seasonal"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 32,
    name: "Never Say Dive",
    cuisine: "Chef-Driven Bar Food",
    location: "Old Brooklyn",
    priceRange: "$$",
    visited: false,
    photos: [],
    coverEmoji: "🍺",
    tags: ["Bar Food", "Cocktails", "Neighborhood"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 33,
    name: "Noble Beast Brewing Co.",
    cuisine: "Brewery / American",
    location: "Downtown Cleveland",
    priceRange: "$$",
    visited: false,
    photos: [],
    coverEmoji: "🍻",
    tags: ["Craft Beer", "Brewery", "Farm-Fresh"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 34,
    name: "Ohio Pie Co.",
    cuisine: "Creative Pizza",
    location: "Brunswick / Parma / Rocky River",
    priceRange: "$$",
    visited: false,
    photos: [],
    coverEmoji: "🎨",
    tags: ["Creative Pizza", "Ohio-Style", "Weekly Specials"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 35,
    name: "Pier W",
    cuisine: "Seafood",
    location: "Lakewood",
    priceRange: "$$$$",
    visited: false,
    photos: [],
    coverEmoji: "🌊",
    tags: ["Seafood", "Lake Erie Views", "Sunday Brunch"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 36,
    name: "The Pompadour",
    cuisine: "American Small Plates",
    location: "Fairport Harbor",
    priceRange: "$$$",
    visited: false,
    photos: [],
    coverEmoji: "🌅",
    tags: ["Small Plates", "Coastal", "Shareable"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 37,
    name: "Pho Lee's Vietnamese Restaurant",
    cuisine: "Vietnamese",
    location: "AsiaTown, Cleveland",
    priceRange: "$$",
    visited: false,
    photos: [],
    coverEmoji: "🍜",
    tags: ["Pho", "Vietnamese", "24-Hour Broth"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 38,
    name: "Poppy",
    cuisine: "Modern American",
    location: "Larchmere",
    priceRange: "$$$",
    visited: false,
    photos: [],
    coverEmoji: "🌺",
    tags: ["Garden Patio", "American", "Seasonal"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 39,
    name: "Rood",
    cuisine: "Global / American",
    location: "Lakewood",
    priceRange: "$$",
    visited: false,
    photos: [],
    coverEmoji: "🎂",
    tags: ["Global Flavors", "Dessert", "Walleye"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 40,
    name: "Sapphire Creek Winery & Gardens",
    cuisine: "American / Wine Bar",
    location: "Chagrin Falls",
    priceRange: "$$$",
    visited: false,
    photos: [],
    coverEmoji: "🍷",
    tags: ["Winery", "Steaks", "Date Night"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 41,
    name: "Slyman's Restaurant & Deli",
    cuisine: "Classic Deli",
    location: "Downtown Cleveland",
    priceRange: "$",
    visited: false,
    photos: [],
    coverEmoji: "🥩",
    tags: ["Corned Beef", "Institution", "Lunch Only"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 42,
    name: "STEAK",
    cuisine: "Modern Steakhouse",
    location: "Tremont",
    priceRange: "$$$",
    visited: false,
    photos: [],
    coverEmoji: "🥩",
    tags: ["Steakhouse", "Trendy", "Waffle Fries"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 43,
    name: "Strip Steakhouse",
    cuisine: "Classic Steakhouse",
    location: "Avon",
    priceRange: "$$$",
    visited: false,
    photos: [],
    coverEmoji: "🐮",
    tags: ["Steakhouse", "Historic Barn", "Dry-Aged"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 44,
    name: "Thyme Table",
    cuisine: "Modern American",
    location: "Bay Village",
    priceRange: "$$$",
    visited: false,
    photos: [],
    coverEmoji: "🌿",
    tags: ["Seasonal", "Wine", "Patio"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 45,
    name: "Tita Flora's",
    cuisine: "Filipino",
    location: "Independence",
    priceRange: "$$",
    visited: false,
    photos: [],
    coverEmoji: "🍛",
    tags: ["Filipino", "Sizzling Plates", "Family Style"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 46,
    name: "Tripi Italian Specialties",
    cuisine: "Italian Deli",
    location: "Ohio City",
    priceRange: "$",
    visited: false,
    photos: [],
    coverEmoji: "🍝",
    tags: ["Italian Deli", "Sandwiches", "Old School"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 47,
    name: "Tutto Carne",
    cuisine: "Italian Steakhouse",
    location: "Little Italy",
    priceRange: "$$$$",
    visited: false,
    photos: [],
    coverEmoji: "🥩",
    tags: ["Steakhouse", "Little Italy", "Nose-to-Tail"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 48,
    name: "Vero",
    cuisine: "Neapolitan Pizza",
    location: "Cleveland Heights",
    priceRange: "$$",
    visited: false,
    photos: [],
    coverEmoji: "🍕",
    tags: ["Neapolitan Pizza", "Imported Wine", "Gelato"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 49,
    name: "Zhug",
    cuisine: "Middle Eastern",
    location: "Cleveland Heights",
    priceRange: "$$",
    visited: false,
    photos: [],
    coverEmoji: "🌿",
    tags: ["Middle Eastern", "Mezze", "No Reservations"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
  {
    id: 50,
    name: "Zoma Ethiopian Restaurant",
    cuisine: "Ethiopian",
    location: "Cleveland Heights",
    priceRange: "$$",
    visited: false,
    photos: [],
    coverEmoji: "🍚",
    tags: ["Ethiopian", "Communal", "Injera"],
    reviews: { 1: { done: false }, 2: { done: false } },
    summary: "",
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function avg(a, b) {
  return ((a + b) / 2).toFixed(1);
}

function overallAvg(r) {
  const cats = ["taste", "value", "atmosphere"];
  const vals = cats.map((c) =>
    parseFloat(avg(r.reviews[1][c], r.reviews[2][c]))
  );
  return (vals.reduce((s, v) => s + v, 0) / 3).toFixed(1);
}

function scoreBadge(score) {
  const s = parseFloat(score);
  if (s >= 8.5) return { label: "Outstanding", color: "#2a9d2a" };
  if (s >= 7) return { label: "Excellent", color: "#4a9d4a" };
  if (s >= 5.5) return { label: "Good", color: "#9d7a2a" };
  return { label: "Fair", color: "#9d4a2a" };
}

function ScoreBar({ score, max = 10 }) {
  const pct = (score / max) * 100;
  const badge = scoreBadge(score);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          flex: 1,
          height: 6,
          background: "#e8e0d4",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: badge.color,
            borderRadius: 3,
            transition: "width 0.6s ease",
          }}
        />
      </div>
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 13,
          fontWeight: 700,
          color: badge.color,
          minWidth: 30,
        }}
      >
        {score}
      </span>
    </div>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────

const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500;700&display=swap');
`;

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { width: 100%; min-height: 100vh; }
  body { background: #f5f0e8; color: #1a1410; overflow-x: hidden; }
  .fade-in { animation: fadeIn 0.5s ease forwards; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
  .card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; cursor: pointer; }
  .card-hover:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.12) !important; }
  .nav-link { transition: color 0.15s ease; cursor: pointer; padding: 4px 0; border-bottom: 2px solid transparent; }
  .nav-link:hover { color: #C8472C; }
  .nav-link.active { color: #C8472C; border-bottom-color: #C8472C; }
  .checklist-item { transition: background 0.15s ease; }
  .checklist-item:hover { background: #ede8e0 !important; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #ede8e0; }
  ::-webkit-scrollbar-thumb { background: #c8b89a; border-radius: 3px; }

  .page-wrap { width: 100%; padding: 48px 5%; }
  .page-wrap-wide { width: 100%; padding: 60px 5%; }
  .hero-inner { width: 100%; padding: 0 5%; }

  .stats-bar { display: flex; gap: 48px; justify-content: center; flex-wrap: wrap; }

  .review-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  .reviewer-profile-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 60px; }
  .score-row { display: flex; align-items: flex-start; gap: 24px; }
  .score-row-label { width: 200px; flex-shrink: 0; }
  .checklist-status-bar { display: flex; flex-wrap: wrap; }
  .checklist-status-item { display: flex; align-items: center; gap: 10px; padding: 10px 24px; flex: 1; min-width: 160px; border-right: 1px solid #ede8e0; }
  .checklist-status-item:last-child { border-right: none; }
  .top-pick-inner { display: flex; gap: 40px; align-items: center; }
  .restaurant-header-inner { display: flex; gap: 32px; align-items: flex-start; }
  .rankings-mini-scores { display: flex; gap: 16px; }
  .sort-tabs { display: flex; gap: 0; margin-bottom: 40px; border: 1px solid #ede8e0; overflow: hidden; }
  .recent-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-bottom: 48px; }
  .nav-links { display: flex; gap: 32px; }
  .photo-row { display: flex; gap: 16px; }
  .footer-inner { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }

  @media (max-width: 900px) {
    .page-wrap { padding: 32px 4%; }
    .page-wrap-wide { padding: 32px 4%; }
    .hero-inner { padding: 0 4%; }
    .review-grid { grid-template-columns: 1fr; }
    .reviewer-profile-grid { grid-template-columns: 1fr; gap: 24px; }
    .score-row { flex-wrap: wrap; gap: 16px; }
    .score-row-label { width: 100%; }
    .top-pick-inner { flex-wrap: wrap; gap: 20px; }
    .restaurant-header-inner { flex-wrap: wrap; gap: 20px; }
    .rankings-mini-scores { display: none; }
    .sort-tabs { flex-wrap: wrap; }
    .recent-grid { grid-template-columns: repeat(2, 1fr); }
    .photo-row { flex-wrap: wrap; }
  }

  @media (max-width: 600px) {
    .page-wrap { padding: 24px 4%; }
    .page-wrap-wide { padding: 24px 4%; }
    .hero-inner { padding: 0 4%; }
    .stats-bar { gap: 24px; }
    .recent-grid { grid-template-columns: 1fr; }
    .nav-links { gap: 16px; }
    .sort-tabs button { font-size: 12px !important; padding: 10px 8px !important; }
    .checklist-status-item { min-width: 45%; border-right: none; border-bottom: 1px solid #ede8e0; }
    .rankings-row { flex-wrap: wrap; gap: 12px; }
    .footer-inner { flex-direction: column; align-items: flex-start; }
    .photo-row { gap: 8px; }
  }
`;

// ─── NAV ─────────────────────────────────────────────────────────────────────

function Nav({ page, setPage }) {
  const links = [
    { key: "home", label: "Home" },
    { key: "checklist", label: "Restaurants" },
    { key: "rankings", label: "Rankings" },
    { key: "reviewers", label: "Reviewers" },
  ];
  return (
    <nav
      style={{
        background: "#1a1410",
        padding: "0 5%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 64,
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 2px 20px rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
        onClick={() => setPage("home")}
      >
        <span style={{ fontSize: 22 }}>🍽️</span>
        <div>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 18,
              fontWeight: 900,
              color: "#f5f0e8",
              letterSpacing: "0.02em",
              lineHeight: 1,
            }}
          >
            The Table
          </div>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 9,
              color: "#C8472C",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Cleveland Restaurant Reviews
          </div>
        </div>
      </div>
      <div className="nav-links">
        {links.map((l) => (
          <span
            key={l.key}
            className={`nav-link${page === l.key ? " active" : ""}`}
            onClick={() => setPage(l.key)}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              fontWeight: 500,
              color: page === l.key ? "#C8472C" : "#c8b89a",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {l.label}
          </span>
        ))}
      </div>
    </nav>
  );
}

// ─── HOME ────────────────────────────────────────────────────────────────────

function HomePage({ restaurants, setPage, setSelectedId }) {
  const reviewed = restaurants.filter(
    (r) => r.reviews[1].done && r.reviews[2].done
  );
  const recent = reviewed.slice(0, 3);
  const topPick = reviewed.length
    ? [...reviewed].sort((a, b) => parseFloat(overallAvg(b)) - parseFloat(overallAvg(a)))[0]
    : null;

  return (
    <div className="fade-in">
      <div
        style={{
          background: "linear-gradient(135deg, #1a1410 0%, #2d1f17 50%, #1a1410 100%)",
        padding: "100px 5% 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(200,71,44,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(44,111,200,0.08) 0%, transparent 50%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.02) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.02) 40px)",
          }}
        />
        <div style={{ width: "100%", position: "relative" }}>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              color: "#C8472C",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            ✦ Cleveland & Northeast Ohio ✦
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(48px, 8vw, 88px)",
              fontWeight: 900,
              color: "#f5f0e8",
              lineHeight: 1.0,
              marginBottom: 24,
            }}
          >
            Two voices.
            <br />
            <em style={{ color: "#C8472C" }}>One table.</em>
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 18,
              color: "#a09080",
              maxWidth: 540,
              lineHeight: 1.7,
              marginBottom: 40,
            }}
          >
            Working through Cleveland Magazine's 50 Best Restaurants in Cleveland
            and Northeast Ohio — scored on Price, Value, and Atmosphere. No ads, no comps.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button
              onClick={() => setPage("checklist")}
              style={{
                background: "#C8472C",
                color: "#fff",
                border: "none",
                padding: "14px 32px",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: 15,
                cursor: "pointer",
                letterSpacing: "0.05em",
              }}
            >
              Browse the List →
            </button>
            <button
              onClick={() => setPage("rankings")}
              style={{
                background: "transparent",
                color: "#f5f0e8",
                border: "1px solid rgba(245,240,232,0.3)",
                padding: "14px 32px",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: 15,
                cursor: "pointer",
                letterSpacing: "0.05em",
              }}
            >
              See Rankings
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          background: "#C8472C",
          padding: "20px 5%",
          display: "flex",
          gap: 48,
          justifyContent: "center",
        }}
      >
        {[
          { val: restaurants.length, label: "On the List" },
          { val: reviewed.length, label: "Fully Reviewed" },
          { val: restaurants.length - reviewed.length, label: "Still to Visit" },
        ].map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 32,
                fontWeight: 900,
                color: "#fff",
              }}
            >
              {s.val}
            </div>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                color: "rgba(255,255,255,0.7)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div style={{ width: "100%", padding: "60px 5%" }}>
        {topPick && (
          <div style={{ marginBottom: 64 }}>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                color: "#C8472C",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              ✦ Current Top Pick
            </div>
            <div
              className="card-hover top-pick-inner"
              onClick={() => { setSelectedId(topPick.id); setPage("restaurant"); }}
              style={{
                background: "#1a1410",
                color: "#f5f0e8",
                padding: 40,
              }}
            >
              <div style={{ fontSize: 72, lineHeight: 1, flexShrink: 0 }}>
                {topPick.coverEmoji}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 10,
                    color: "#C8472C",
                    letterSpacing: "0.2em",
                    marginBottom: 6,
                  }}
                >
                  {topPick.cuisine} · {topPick.location}
                </div>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 36,
                    fontWeight: 900,
                    marginBottom: 12,
                  }}
                >
                  {topPick.name}
                </h2>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 15,
                    color: "#a09080",
                    lineHeight: 1.6,
                    maxWidth: 480,
                  }}
                >
                  {topPick.summary}
                </p>
              </div>
              <div style={{ textAlign: "center", flexShrink: 0 }}>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 56,
                    fontWeight: 900,
                    color: "#C8472C",
                    lineHeight: 1,
                  }}
                >
                  {overallAvg(topPick)}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 10,
                    color: "#a09080",
                    letterSpacing: "0.2em",
                  }}
                >
                  OVERALL
                </div>
              </div>
            </div>
          </div>
        )}

        {recent.length > 0 && (
          <>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                color: "#C8472C",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: 24,
              }}
            >
              ✦ Recent Reviews
            </div>
            <div className="recent-grid">
              {recent.map((r) => (
                <div
                  key={r.id}
                  className="card-hover"
                  onClick={() => { setSelectedId(r.id); setPage("restaurant"); }}
                  style={{
                    background: "#fff",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      background: "#1a1410",
                      padding: 32,
                      textAlign: "center",
                      fontSize: 56,
                    }}
                  >
                    {r.coverEmoji}
                  </div>
                  <div style={{ padding: 24 }}>
                    <div
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 10,
                        color: "#9a8a7a",
                        letterSpacing: "0.15em",
                        marginBottom: 6,
                      }}
                    >
                      {r.cuisine}
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 22,
                        fontWeight: 700,
                        marginBottom: 8,
                      }}
                    >
                      {r.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 13,
                        color: "#6a5a4a",
                        marginBottom: 16,
                      }}
                    >
                      {r.location} · {r.priceRange}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: 16,
                        borderTop: "1px solid #ede8e0",
                      }}
                    >
                      <div style={{ display: "flex", gap: 8 }}>
                        {r.tags.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            style={{
                              fontFamily: "'DM Mono', monospace",
                              fontSize: 9,
                              color: "#9a8a7a",
                              background: "#f5f0e8",
                              padding: "3px 8px",
                              letterSpacing: "0.1em",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <span
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: 22,
                          fontWeight: 900,
                          color: "#C8472C",
                        }}
                      >
                        {overallAvg(r)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {reviewed.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 40px",
              background: "#fff",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>🗺️</div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 28,
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              The journey begins
            </h3>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "#6a5a4a",
                fontSize: 15,
                maxWidth: 400,
                margin: "0 auto",
              }}
            >
              50 restaurants. Two critics. Zero excuses. Start checking off the list.
            </p>
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
  const filters = [
    { key: "all", label: "All 50" },
    { key: "reviewed", label: "Reviewed" },
    { key: "pending", label: "Pending" },
  ];
  const filtered = restaurants.filter((r) => {
    const matchFilter =
      filter === "all" ||
      (filter === "reviewed" && r.reviews[1].done && r.reviews[2].done) ||
      (filter === "pending" && (!r.reviews[1].done || !r.reviews[2].done));
    const matchSearch =
      !search ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(search.toLowerCase()) ||
      r.location.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="fade-in page-wrap-wide">
      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          color: "#C8472C",
          letterSpacing: "0.3em",
          marginBottom: 12,
        }}
      >
        ✦ THE MASTER LIST
      </div>
      <h1
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 48,
          fontWeight: 900,
          marginBottom: 8,
        }}
      >
        Restaurant Checklist
      </h1>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          color: "#6a5a4a",
          marginBottom: 28,
          fontSize: 16,
        }}
      >
        Cleveland Magazine's 50 Best Restaurants — working through every one.
      </p>

      <div style={{ display: "flex", gap: 12, marginBottom: 24, alignItems: "center" }}>
        <input
          type="text"
          placeholder="Search by name, cuisine or neighbourhood…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "10px 16px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            border: "1px solid #ded8d0",
            background: "#fff",
            outline: "none",
            color: "#1a1410",
          }}
        />
      </div>

      <div style={{ display: "flex", gap: 0, marginBottom: 32, borderBottom: "2px solid #ede8e0" }}>
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            style={{
              background: "none",
              border: "none",
              borderBottom: filter === f.key ? "2px solid #C8472C" : "2px solid transparent",
              marginBottom: -2,
              padding: "10px 24px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              color: filter === f.key ? "#C8472C" : "#6a5a4a",
              cursor: "pointer",
              letterSpacing: "0.05em",
            }}
          >
            {f.label}
          </button>
        ))}
        <div
          style={{
            marginLeft: "auto",
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            color: "#9a8a7a",
            display: "flex",
            alignItems: "center",
            padding: "0 8px",
          }}
        >
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {filtered.map((r, i) => {
          const r1done = r.reviews[1].done;
          const r2done = r.reviews[2].done;
          const fullyDone = r1done && r2done;
          const score = fullyDone ? overallAvg(r) : null;

          return (
            <div
              key={r.id}
              className="checklist-item"
              onClick={() => { setSelectedId(r.id); setPage("restaurant"); }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "18px 14px",
                borderBottom: "1px solid #ede8e0",
                background: i % 2 === 0 ? "#fff" : "transparent",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 26,
                  height: 26,
                  border: `2px solid ${fullyDone ? "#2a9d2a" : "#c8b89a"}`,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  background: fullyDone ? "#2a9d2a" : "transparent",
                }}
              >
                {fullyDone && <span style={{ color: "#fff", fontSize: 13 }}>✓</span>}
              </div>

              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  color: "#9a8a7a",
                  minWidth: 28,
                  textAlign: "right",
                  flexShrink: 0,
                }}
              >
                {String(r.id).padStart(2, "0")}
              </div>

              <span style={{ fontSize: 26, flexShrink: 0 }}>{r.coverEmoji}</span>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3, flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 18,
                      fontWeight: 700,
                      color: fullyDone ? "#1a1410" : "#6a5a4a",
                    }}
                  >
                    {r.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 10,
                      color: "#C8472C",
                      background: "#fdf0ed",
                      padding: "2px 7px",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {r.priceRange}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    color: "#9a8a7a",
                  }}
                >
                  {r.cuisine} · {r.location}
                </div>
              </div>

              <div style={{ display: "flex", gap: 5, alignItems: "center", flexShrink: 0 }}>
                {[
                  { label: "Visited", done: r.visited, initial: "V", color: "#6a5a8a" },
                  { label: REVIEWERS[0].name, done: r1done, initial: "M", color: REVIEWERS[0].color },
                  { label: REVIEWERS[1].name, done: r2done, initial: "S", color: REVIEWERS[1].color },
                ].map((s) => (
                  <div
                    key={s.label}
                    title={s.label}
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: s.done ? s.color : "#e8e0d4",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 9,
                      color: s.done ? "#fff" : "#9a8a7a",
                      fontWeight: 700,
                    }}
                  >
                    {s.initial}
                  </div>
                ))}
              </div>

              <div style={{ minWidth: 52, textAlign: "right", flexShrink: 0 }}>
                {score ? (
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 24,
                      fontWeight: 900,
                      color: "#C8472C",
                    }}
                  >
                    {score}
                  </span>
                ) : (
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 10,
                      color: "#c8b89a",
                      letterSpacing: "0.1em",
                    }}
                  >
                    TBD
                  </span>
                )}
              </div>

              <span style={{ color: "#c8b89a", fontSize: 16 }}>›</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── RESTAURANT PAGE ──────────────────────────────────────────────────────────

function ReviewerCard({ reviewer, review, category }) {
  if (!review || !review.done) return null;
  return (
    <div style={{ borderLeft: `3px solid ${reviewer.color}`, paddingLeft: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div
          style={{
            width: 32, height: 32, borderRadius: "50%",
            background: reviewer.color,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 700, color: "#fff",
          }}
        >
          {reviewer.avatar}
        </div>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13, fontWeight: 600, color: "#1a1410",
          }}
        >
          {reviewer.name}
        </span>
      </div>
      <ScoreBar score={review[category]} />
    </div>
  );
}

function RestaurantPage({ restaurant, setPage }) {
  if (!restaurant) return null;
  const r = restaurant;
  const r1 = r.reviews[1];
  const r2 = r.reviews[2];
  const bothDone = r1.done && r2.done;

  const cats = [
    { key: "taste", label: "Taste", icon: "🍴", desc: "How does the food actually taste?" },
    { key: "value", label: "Value", icon: "⭐", desc: "Are you getting your money's worth?" },
    { key: "atmosphere", label: "Atmosphere", icon: "🕯️", desc: "Does the room match the food?" },
  ];

  return (
    <div className="fade-in">
      <div
        style={{
          background: "#1a1410",
          padding: "60px 5% 48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(circle at 80% 50%, ${REVIEWERS[0].color}15, transparent 60%)`,
          }}
        />
        <div style={{ width: "100%", position: "relative" }}>
          <button
            onClick={() => setPage("checklist")}
            style={{
              background: "none",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#a09080",
              padding: "6px 16px",
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              cursor: "pointer",
              marginBottom: 32,
              letterSpacing: "0.1em",
            }}
          >
            ← Back to List
          </button>
          <div className="restaurant-header-inner">
            <div style={{ fontSize: 80, lineHeight: 1, flexShrink: 0 }}>{r.coverEmoji}</div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  color: "#C8472C",
                  letterSpacing: "0.3em",
                  marginBottom: 10,
                }}
              >
                #{String(r.id).padStart(2, "0")} · {r.cuisine} · {r.location} · {r.priceRange}
              </div>
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(32px, 5vw, 56px)",
                  fontWeight: 900,
                  color: "#f5f0e8",
                  marginBottom: 16,
                }}
              >
                {r.name}
              </h1>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {r.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 9,
                      color: "#c8b89a",
                      border: "1px solid rgba(200,184,154,0.4)",
                      padding: "4px 10px",
                      letterSpacing: "0.15em",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            {bothDone && (
              <div
                style={{
                  textAlign: "center",
                  background: "#C8472C",
                  padding: "20px 28px",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 52,
                    fontWeight: 900,
                    color: "#fff",
                    lineHeight: 1,
                  }}
                >
                  {overallAvg(r)}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 9,
                    color: "rgba(255,255,255,0.7)",
                    letterSpacing: "0.2em",
                    marginTop: 4,
                  }}
                >
                  OVERALL AVG
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ width: "100%", padding: "48px 5%" }}>
        <div
          className="checklist-status-bar"
          style={{
            background: "#fff",
            padding: 24,
            marginBottom: 40,
            boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
          }}
        >
          {[
            { label: "Visited", done: r.visited },
            { label: `${REVIEWERS[0].name} Reviewed`, done: r1.done, color: REVIEWERS[0].color },
            { label: `${REVIEWERS[1].name} Reviewed`, done: r2.done, color: REVIEWERS[1].color },
            { label: "Fully Complete", done: bothDone },
          ].map((s, i) => (
            <div
              key={s.label}
              className="checklist-status-item"
            >
              <div
                style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: s.done ? (s.color || "#2a9d2a") : "#e8e0d4",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, color: "#fff", flexShrink: 0,
                }}
              >
                {s.done ? "✓" : ""}
              </div>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: s.done ? 600 : 400,
                  color: s.done ? "#1a1410" : "#9a8a7a",
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {r.photos.length > 0 && (
          <div style={{ marginBottom: 48 }}>
            <SectionTitle>Photos</SectionTitle>
            <div style={{ display: "flex", gap: 16 }}>
              {r.photos.map((p, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1, background: "#1a1410",
                    height: 160, display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontSize: 56,
                  }}
                >
                  {p}
                </div>
              ))}
              <div
                style={{
                  flex: 1, background: "#ede8e0",
                  height: 160, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  flexDirection: "column", gap: 6,
                  border: "2px dashed #c8b89a",
                }}
              >
                <span style={{ fontSize: 24, color: "#c8b89a" }}>+</span>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 9, color: "#c8b89a", letterSpacing: "0.1em",
                  }}
                >
                  ADD PHOTO
                </span>
              </div>
            </div>
          </div>
        )}

        {bothDone ? (
          <>
            <div style={{ marginBottom: 48 }}>
              <SectionTitle>Reviewer Impressions</SectionTitle>
              <div className="review-grid">
                {REVIEWERS.map((rev) => {
                  const rv = r.reviews[rev.id];
                  return (
                    <div
                      key={rev.id}
                      style={{
                        background: "#fff", padding: 28,
                        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex", alignItems: "center", gap: 12,
                          marginBottom: 16, paddingBottom: 16,
                          borderBottom: "1px solid #ede8e0",
                        }}
                      >
                        <div
                          style={{
                            width: 40, height: 40, borderRadius: "50%",
                            background: rev.color,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 14, fontWeight: 700, color: "#fff",
                          }}
                        >
                          {rev.avatar}
                        </div>
                        <div>
                          <div
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontWeight: 700, fontSize: 15, color: "#1a1410",
                            }}
                          >
                            {rev.name}
                          </div>
                          <div
                            style={{
                              fontFamily: "'DM Mono', monospace",
                              fontSize: 10, color: rev.color, letterSpacing: "0.1em",
                            }}
                          >
                            {rev.handle}
                          </div>
                        </div>
                      </div>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 15, lineHeight: 1.7, color: "#3a2a1a",
                          fontStyle: "italic",
                        }}
                      >
                        "{rv.description}"
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ marginBottom: 48 }}>
              <SectionTitle>Category Scores</SectionTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {cats.map((cat, ci) => (
                  <div
                    key={cat.key}
                    style={{
                      background: ci % 2 === 0 ? "#fff" : "#faf7f2",
                      padding: 28, boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div className="score-row" style={{ display: "flex" }}>
                      <div style={{ width: 180, flexShrink: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <span style={{ fontSize: 20 }}>{cat.icon}</span>
                          <span
                            style={{
                              fontFamily: "'Playfair Display', serif",
                              fontSize: 18, fontWeight: 700,
                            }}
                          >
                            {cat.label}
                          </span>
                        </div>
                        <div
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 12, color: "#9a8a7a",
                          }}
                        >
                          {cat.desc}
                        </div>
                      </div>
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                        {REVIEWERS.map((rev) => (
                          <ReviewerCard
                            key={rev.id}
                            reviewer={rev}
                            review={r.reviews[rev.id]}
                            category={cat.key}
                          />
                        ))}
                      </div>
                      <div
                        style={{
                          textAlign: "center", background: "#1a1410",
                          padding: "16px 24px", flexShrink: 0, minWidth: 80,
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 32, fontWeight: 900, color: "#f5f0e8", lineHeight: 1,
                          }}
                        >
                          {avg(r1[cat.key], r2[cat.key])}
                        </div>
                        <div
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 8, color: "#C8472C", letterSpacing: "0.15em", marginTop: 4,
                          }}
                        >
                          AVG
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {r.summary && (
              <div>
                <SectionTitle>Our Verdict</SectionTitle>
                <div
                  style={{
                    background: "#1a1410", padding: 40,
                    position: "relative", overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute", top: 20, left: 32,
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 120, color: "rgba(200,71,44,0.12)",
                      lineHeight: 1, userSelect: "none",
                    }}
                  >
                    "
                  </div>
                  <p
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 20, lineHeight: 1.7, color: "#f5f0e8",
                      fontStyle: "italic", position: "relative", maxWidth: 700,
                    }}
                  >
                    {r.summary}
                  </p>
                  <div
                    style={{
                      marginTop: 20,
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 10, color: "#C8472C", letterSpacing: "0.2em",
                    }}
                  >
                    — Marcus Webb & Sasha Okafor
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div
            style={{
              background: "#fff", padding: 60, textAlign: "center",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 28, fontWeight: 700, marginBottom: 12,
              }}
            >
              Review Pending
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#6a5a4a", fontSize: 15 }}>
              {!r.visited
                ? "This restaurant is on the list but hasn't been visited yet."
                : "One or both reviewers haven't submitted their scores yet."}
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
  const reviewed = restaurants.filter((r) => r.reviews[1].done && r.reviews[2].done);

  const sortOptions = [
    { key: "overall", label: "Overall", icon: "🏆" },
    { key: "value", label: "Best Value", icon: "⭐" },
    { key: "atmosphere", label: "Best Atmosphere", icon: "🕯️" },
    { key: "taste", label: "Best Taste", icon: "🍴" },
  ];

  const sorted = [...reviewed].sort((a, b) => {
    if (sortBy === "overall") return parseFloat(overallAvg(b)) - parseFloat(overallAvg(a));
    return (
      parseFloat(avg(b.reviews[1][sortBy], b.reviews[2][sortBy])) -
      parseFloat(avg(a.reviews[1][sortBy], a.reviews[2][sortBy]))
    );
  });

  return (
    <div className="fade-in page-wrap-wide">
      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 10, color: "#C8472C", letterSpacing: "0.3em", marginBottom: 12,
        }}
      >
        ✦ THE LEADERBOARD
      </div>
      <h1
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 48, fontWeight: 900, marginBottom: 32,
        }}
      >
        Rankings
      </h1>

      <div
        style={{
          className="sort-tabs" style={{ marginBottom: 40,
          border: "1px solid #ede8e0", overflow: "hidden",
        }}
      >
        {sortOptions.map((s) => (
          <button
            key={s.key}
            onClick={() => setSortBy(s.key)}
            style={{
              flex: 1,
              background: sortBy === s.key ? "#1a1410" : "#fff",
              color: sortBy === s.key ? "#f5f0e8" : "#6a5a4a",
              border: "none", padding: "14px 20px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600, fontSize: 14, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 6, transition: "all 0.15s ease",
            }}
          >
            <span>{s.icon}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {reviewed.length === 0 ? (
        <div style={{ textAlign: "center", padding: 60, color: "#9a8a7a" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🍽️</div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15 }}>
            No reviews completed yet — get eating!
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {sorted.map((r, i) => {
            const displayScore =
              sortBy === "overall"
                ? overallAvg(r)
                : avg(r.reviews[1][sortBy], r.reviews[2][sortBy]);
            const badge = scoreBadge(displayScore);

            return (
              <div
                key={r.id}
                className="card-hover rankings-row"
                onClick={() => { setSelectedId(r.id); setPage("restaurant"); }}
                style={{
                  background: "#fff", padding: 24,
                  display: "flex", alignItems: "center", gap: 24,
                  boxShadow: i === 0
                    ? "0 4px 24px rgba(200,71,44,0.15)"
                    : "0 2px 10px rgba(0,0,0,0.05)",
                  border: i === 0 ? "1px solid rgba(200,71,44,0.3)" : "1px solid transparent",
                }}
              >
                <div
                  style={{
                    width: 44, height: 44,
                    background: i === 0 ? "#C8472C" : "#f5f0e8",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 20, fontWeight: 900,
                    color: i === 0 ? "#fff" : "#9a8a7a", flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <span style={{ fontSize: 36, flexShrink: 0 }}>{r.coverEmoji}</span>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 22, fontWeight: 700, marginBottom: 4,
                    }}
                  >
                    {r.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13, color: "#9a8a7a",
                    }}
                  >
                    {r.cuisine} · {r.location} · {r.priceRange}
                  </div>
                </div>
                <div className="rankings-mini-scores">
                  {["taste", "value", "atmosphere"].map((c) => (
                    <div key={c} style={{ textAlign: "center" }}>
                      <div
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: 18, fontWeight: 700,
                          color: c === sortBy ? "#C8472C" : "#1a1410",
                        }}
                      >
                        {avg(r.reviews[1][c], r.reviews[2][c])}
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: 8, color: "#9a8a7a",
                          letterSpacing: "0.1em", textTransform: "uppercase",
                        }}
                      >
                        {c}
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    textAlign: "center", minWidth: 80,
                    paddingLeft: 20, borderLeft: "1px solid #ede8e0",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 36, fontWeight: 900, color: badge.color, lineHeight: 1,
                    }}
                  >
                    {displayScore}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 8, color: badge.color,
                      letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4,
                    }}
                  >
                    {badge.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── REVIEWERS PAGE ───────────────────────────────────────────────────────────

function ReviewersPage({ restaurants }) {
  const reviewed = restaurants.filter((r) => r.reviews[1].done && r.reviews[2].done);

  return (
    <div className="fade-in page-wrap-wide">
      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 10, color: "#C8472C", letterSpacing: "0.3em", marginBottom: 12,
        }}
      >
        ✦ MEET THE CRITICS
      </div>
      <h1
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 48, fontWeight: 900, marginBottom: 48,
        }}
      >
        The Reviewers
      </h1>

      <div className="reviewer-profile-grid">
        {REVIEWERS.map((rev) => (
          <div
            key={rev.id}
            style={{
              background: "#fff", overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
            }}
          >
            <div
              style={{
                background: rev.color,
                padding: "40px 32px",
                display: "flex", alignItems: "center", gap: 20,
              }}
            >
              <div
                style={{
                  width: 72, height: 72, borderRadius: "50%",
                  background: "rgba(255,255,255,0.2)",
                  border: "3px solid rgba(255,255,255,0.5)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 24, fontWeight: 900, color: "#fff", flexShrink: 0,
                }}
              >
                {rev.avatar}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 28, fontWeight: 900, color: "#fff",
                    lineHeight: 1.1, marginBottom: 4,
                  }}
                >
                  {rev.name}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11, color: "rgba(255,255,255,0.75)", letterSpacing: "0.1em",
                  }}
                >
                  {rev.handle}
                </div>
              </div>
            </div>
            <div style={{ padding: 32 }}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15, lineHeight: 1.7, color: "#3a2a1a", marginBottom: 24,
                }}
              >
                {rev.bio}
              </p>
              <div
                style={{
                  padding: "12px 0", borderTop: "1px solid #ede8e0",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 9, color: "#9a8a7a", letterSpacing: "0.2em", marginBottom: 4,
                    }}
                  >
                    SPECIALTY
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 14, fontWeight: 600, color: rev.color,
                    }}
                  >
                    {rev.specialty}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 9, color: "#9a8a7a", letterSpacing: "0.2em", marginBottom: 4,
                    }}
                  >
                    REVIEWS COMPLETED
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 28, fontWeight: 900, color: "#1a1410",
                    }}
                  >
                    {reviewed.length} / 50
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {reviewed.length > 0 && (
        <div>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10, color: "#C8472C", letterSpacing: "0.3em", marginBottom: 20,
            }}
          >
            ✦ SCORE COMPARISON
          </div>
          <div style={{ background: "#fff", padding: 32, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Restaurant", "Category", REVIEWERS[0].name, REVIEWERS[1].name, "Avg"].map((h) => (
                    <th
                      key={h}
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 9, color: "#9a8a7a",
                        letterSpacing: "0.2em", textTransform: "uppercase",
                        textAlign: "left", padding: "8px 12px",
                        borderBottom: "2px solid #ede8e0",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reviewed.flatMap((r) =>
                  ["taste", "value", "atmosphere"].map((cat, ci) => (
                    <tr
                      key={`${r.id}-${cat}`}
                      style={{ background: ci % 2 === 0 ? "#faf7f2" : "#fff" }}
                    >
                      <td
                        style={{
                          padding: "10px 12px",
                          fontFamily: "'Playfair Display', serif",
                          fontSize: 15, fontWeight: 700, color: "#1a1410",
                          borderBottom: "1px solid #ede8e0",
                        }}
                      >
                        {ci === 0 ? r.name : ""}
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          fontFamily: "'DM Mono', monospace",
                          fontSize: 11, color: "#9a8a7a",
                          textTransform: "capitalize",
                          borderBottom: "1px solid #ede8e0",
                        }}
                      >
                        {cat}
                      </td>
                      {[1, 2].map((rid) => (
                        <td
                          key={rid}
                          style={{
                            padding: "10px 12px",
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 14, fontWeight: 700,
                            color: REVIEWERS[rid - 1].color,
                            borderBottom: "1px solid #ede8e0",
                          }}
                        >
                          {r.reviews[rid][cat]}
                        </td>
                      ))}
                      <td
                        style={{
                          padding: "10px 12px",
                          fontFamily: "'DM Mono', monospace",
                          fontSize: 14, fontWeight: 700, color: "#1a1410",
                          borderBottom: "1px solid #ede8e0",
                        }}
                      >
                        {avg(r.reviews[1][cat], r.reviews[2][cat])}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SECTION TITLE ────────────────────────────────────────────────────────────

function SectionTitle({ children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 10, color: "#C8472C",
          letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 4,
        }}
      >
        ✦ {children}
      </div>
      <div style={{ height: 1, background: "#ede8e0" }} />
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedId, setSelectedId] = useState(null);
  const [restaurants] = useState(INITIAL_RESTAURANTS);

  const selectedRestaurant = restaurants.find((r) => r.id === selectedId) || null;

  return (
    <>
      <style>{FONTS + css}</style>
      <div style={{ minHeight: "100vh", background: "#f5f0e8" }}>
        <Nav page={page} setPage={setPage} />
        {page === "home" && (
          <HomePage restaurants={restaurants} setPage={setPage} setSelectedId={setSelectedId} />
        )}
        {page === "checklist" && (
          <ChecklistPage restaurants={restaurants} setPage={setPage} setSelectedId={setSelectedId} />
        )}
        {page === "restaurant" && (
          <RestaurantPage restaurant={selectedRestaurant} setPage={setPage} />
        )}
        {page === "rankings" && (
          <RankingsPage restaurants={restaurants} setPage={setPage} setSelectedId={setSelectedId} />
        )}
        {page === "reviewers" && <ReviewersPage restaurants={restaurants} />}

        <footer
          className="footer-inner"
          style={{
            background: "#1a1410",
            padding: "40px 5%",
            marginTop: 80,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 20, fontWeight: 900, color: "#f5f0e8", marginBottom: 4,
              }}
            >
              The Table
            </div>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10, color: "#6a5a4a", letterSpacing: "0.2em",
              }}
            >
              Cleveland & Northeast Ohio Restaurant Reviews
            </div>
          </div>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10, color: "#4a3a2a", letterSpacing: "0.1em",
            }}
          >
            © 2026 Marcus Webb & Sasha Okafor · All opinions are our own
          </div>
        </footer>
      </div>
    </>
  );
}
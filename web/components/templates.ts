// The showcase email templates (built by scripts/build-email-templates.py, previews in public/templates/).
// The businesses are made up, to show what finished campaigns look like.
export type Template = { slug: string; name: string; brand: string; use: string; w: number; h: number };

export const templates: Template[] = [
  { slug: "stem-bouquet", name: "Seasonal offer", brand: "Wild Stem Florist", use: "A discount with a code and a delivery window.", w: 1200, h: 1434 },
  { slug: "launch", name: "Product launch", brand: "Solenne", use: "A new collection with photography and a product grid.", w: 1200, h: 3890 },
  { slug: "north-service", name: "Service week", brand: "Northbound Cycles", use: "What is included, and a button to book.", w: 1200, h: 1494 },
  { slug: "kiln-class", name: "Class invitation", brand: "Kiln Street Bakery", use: "When, where and what to bring.", w: 1200, h: 1410 },
  { slug: "welcome", name: "Welcome offer", brand: "Solenne", use: "Greet new subscribers with a discount code.", w: 1200, h: 2684 },
  { slug: "stem-wreath", name: "Back in stock", brand: "Wild Stem Florist", use: "Three sizes, shown side by side.", w: 1200, h: 1340 },
  { slug: "kiln-friday", name: "Subscription", brand: "Kiln Street Bakery", use: "Invite people to a weekly delivery.", w: 1200, h: 1256 },
  { slug: "sale", name: "Sale", brand: "Solenne", use: "An offer with before and after prices.", w: 1200, h: 3054 },
  { slug: "north-stock", name: "Restock alert", brand: "Northbound Cycles", use: "Tell customers an item has arrived.", w: 1200, h: 1440 },
  { slug: "journal", name: "Newsletter", brand: "Solenne", use: "A guide or story, step by step.", w: 1200, h: 3458 },
];

export const brands = ["Kiln Street Bakery", "Wild Stem Florist", "Northbound Cycles", "Solenne"];
export const bySlug = (slug: string) => templates.find((t) => t.slug === slug)!;

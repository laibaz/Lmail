// The showcase email templates (built by scripts/build-email-templates.py, previews in public/templates/).
// The brands are made up, to show what finished campaigns look like.
export type Template = { slug: string; name: string; brand: string; use: string; w: number; h: number };

export const templates: Template[] = [
  { slug: "launch", name: "Product launch", brand: "Solenne", use: "A new collection with photography and a product grid.", w: 1200, h: 3890 },
  { slug: "northside-race", name: "Event reminder", brand: "Northside", use: "Everything a member needs before race day.", w: 1200, h: 1998 },
  { slug: "welcome", name: "Welcome offer", brand: "Solenne", use: "Greet new subscribers with a discount code.", w: 1200, h: 2684 },
  { slug: "northside-welcome", name: "Member welcome", brand: "Northside", use: "Explain how the club works in three points.", w: 1200, h: 1850 },
  { slug: "sale", name: "Sale", brand: "Solenne", use: "An offer with before and after prices.", w: 1200, h: 3054 },
  { slug: "northside-plan", name: "Weekly plan", brand: "Northside", use: "A personal schedule for the week ahead.", w: 1200, h: 1670 },
  { slug: "journal", name: "Newsletter", brand: "Solenne", use: "A guide or story, step by step.", w: 1200, h: 3458 },
];

export const brands = ["Solenne", "Northside"];
export const bySlug = (slug: string) => templates.find((t) => t.slug === slug)!;

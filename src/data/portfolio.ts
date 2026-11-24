import type { Photo } from '@/lib/img';

export interface Collection {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  photos: Photo[];
}

const make = (title: string, ids: string[]): Photo[] =>
  ids.map((id, i) => ({ id, alt: `${title} — view ${i + 1} of ${ids.length}` }));

/** Architectural visualisations (3D renders). Image files live in public/images as <slug>-NN-{640,1280}.webp. */
export const collections: Collection[] = [
  {
    slug: 'atrium-hotel',
    title: 'The Atrium Hotel',
    category: 'Hospitality',
    tagline: 'Glass, water and a sculptural stair.',
    description: 'A multi-storey hotel organised around a light-filled glass atrium. Guests arrive past palms and a stepped glass entrance into a double-height lobby, a marine-themed gallery wall, a sculptural staircase, a bar and soft lounge seating, with a pool terrace and a landscaped street frontage.',
    photos: make('The Atrium Hotel', Array.from({ length: 26 }, (_, i) => `atrium-hotel-${String(i + 1).padStart(2, '0')}`)),
  },
  {
    slug: 'urban-blocks',
    title: 'Urban Blocks',
    category: 'Mixed-use',
    tagline: 'Dense, walkable street frontage.',
    description: 'Studies for compact city sites: a five-storey mixed-use block with shopfronts below, balconies above and a rooftop sports deck, alongside brick-and-glass infill buildings that sit comfortably in an established street.',
    photos: make('Urban Blocks', Array.from({ length: 15 }, (_, i) => `urban-blocks-${String(i + 1).padStart(2, '0')}`)),
  },
  {
    slug: 'courtyard-apartments',
    title: 'Courtyard Apartments',
    category: 'Residential',
    tagline: 'Apartments that share a garden and a car court.',
    description: 'Low-rise apartment blocks arranged around shared courtyards and covered parking. Deep balconies, screened garages and generous planting keep everyday life open, ventilated and well connected to the street.',
    photos: make('Courtyard Apartments', Array.from({ length: 10 }, (_, i) => `courtyard-apartments-${String(i + 1).padStart(2, '0')}`)),
  },
  {
    slug: 'hillside-villa',
    title: 'Hillside Villa',
    category: 'Residential',
    tagline: 'A family home that reads the slope.',
    description: 'A two-storey family villa of stone, render and timber under hipped roofs, with glazed balconies, a double garage and landscaped terraces. Shown from the street, from above and in close-up detail.',
    photos: make('Hillside Villa', Array.from({ length: 10 }, (_, i) => `hillside-villa-${String(i + 1).padStart(2, '0')}`)),
  },
  {
    slug: 'family-residence',
    title: 'Contemporary Family Residence',
    category: 'Residential',
    tagline: 'Clean volumes, soft garden edges.',
    description: 'A modern two-storey home of crisp white and grey volumes, large openings and a calm garden setting. These views walk around the house, showing how the massing changes from every side.',
    photos: make('Contemporary Family Residence', Array.from({ length: 7 }, (_, i) => `family-residence-${String(i + 1).padStart(2, '0')}`)),
  },
  {
    slug: 'courtyard-villa',
    title: 'Courtyard Villa',
    category: 'Residential',
    tagline: 'Low, wide and wrapped around a garden.',
    description: 'A flat-roofed villa that spreads across its plot, with a sheltered courtyard, timber-framed windows and planted borders. Views from every corner, plus a roof plan, show how the plan opens to the landscape.',
    photos: make('Courtyard Villa', Array.from({ length: 8 }, (_, i) => `courtyard-villa-${String(i + 1).padStart(2, '0')}`)),
  },
  {
    slug: 'country-homes',
    title: 'Country Homes & Cottages',
    category: 'Residential',
    tagline: 'Stone, pitched roofs and generous verandas.',
    description: 'A family of single-storey homes and cottages in stone, timber and corrugated roofing, plus a two-storey lattice-balcony house. Covered porches, simple plans and wildflower beds suit rural and peri-urban plots.',
    photos: make('Country Homes & Cottages', Array.from({ length: 19 }, (_, i) => `country-homes-${String(i + 1).padStart(2, '0')}`)),
  },
  {
    slug: 'garden-pavilions',
    title: 'Garden Pavilions',
    category: 'Residential',
    tagline: 'Rooms for the outdoors.',
    description: 'Light timber pavilions and covered terraces for entertaining and quiet afternoons: open frames, glazed roofs, cane seating and gardens that pull the outside in.',
    photos: make('Garden Pavilions', Array.from({ length: 7 }, (_, i) => `garden-pavilions-${String(i + 1).padStart(2, '0')}`)),
  },
  {
    slug: 'chapel',
    title: 'Chapel & Gathering Hall',
    category: 'Institutional',
    tagline: 'A simple, honest place to gather.',
    description: 'A modest stone chapel with a cross-marked entrance and a bright interior, seen as a hall with rows of seating, a raised platform and tall windows that fill the room with daylight.',
    photos: make('Chapel & Gathering Hall', Array.from({ length: 7 }, (_, i) => `chapel-${String(i + 1).padStart(2, '0')}`)),
  },
  {
    slug: 'living-spaces',
    title: 'Living Spaces',
    category: 'Interiors',
    tagline: 'Warm, layered, lived-in rooms.',
    description: 'Interior studies of living and dining areas: patterned rugs, deep green sofas, polished timber floors, glazed doors to the garden and considered lighting.',
    photos: make('Living Spaces', Array.from({ length: 13 }, (_, i) => `living-spaces-${String(i + 1).padStart(2, '0')}`)),
  },
  {
    slug: 'kitchens-bedrooms-baths',
    title: 'Kitchens, Bedrooms & Baths',
    category: 'Interiors',
    tagline: 'The rooms behind the facade.',
    description: 'Kitchens, bedrooms, bathrooms, stairs and balconies, shown in the same detail as the exteriors so a client can imagine a day inside the plan.',
    photos: make('Kitchens, Bedrooms & Baths', Array.from({ length: 17 }, (_, i) => `kitchens-bedrooms-baths-${String(i + 1).padStart(2, '0')}`)),
  },
];

export const portfolio = {
  name: 'ARKYLS Visual Portfolio',
  title: 'Spaces, drawn in full.',
  intro:
    'Eleven design studies, one idea: architecture should be easy to imagine before it is built. Walk through a glass-atrium hotel, urban blocks, hillside villas, stone cottages and the quiet rooms inside them.',
  note: 'All images are architectural visualisations, not photographs of completed buildings.',
} as const;

export const totalViews = collections.reduce((n, c) => n + c.photos.length, 0);

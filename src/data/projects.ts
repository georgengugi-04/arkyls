import type { Photo } from '@/lib/img';

export interface Project {
  slug: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Sustainable' | 'Hospitality' | 'Retail';
  year: number;
  summary: string;
  cover: Photo;
}

export const projects: Project[] = [
  { slug: 'modern-villa', title: 'Modern Villa', category: 'Residential', year: 2024, summary: 'A luxurious villa with minimalist design and panoramic views.', cover: { id: '1', alt: '3D render of a modern single-storey villa with landscaped garden' } },
  { slug: 'urban-office', title: 'Urban Office', category: 'Commercial', year: 2024, summary: 'A state-of-the-art workspace designed for collaboration.', cover: { id: '7', alt: 'Interior render of a bright workspace with large windows' } },
  { slug: 'eco-friendly-home', title: 'Eco-Friendly Home', category: 'Sustainable', year: 2023, summary: 'Sustainable design with eco-friendly materials and efficient systems.', cover: { id: '77', alt: 'Interior render of a timber-lined living space with a staircase' } },
  { slug: 'high-rise-building', title: 'High-Rise Building', category: 'Commercial', year: 2023, summary: 'A modern high-rise focused on energy efficiency and design.', cover: { id: '4', alt: 'Render of a multi-storey residential block with green and red accents' } },
  { slug: 'luxury-hotel', title: 'Luxury Hotel', category: 'Hospitality', year: 2023, summary: 'World-class amenities with breathtaking architectural views.', cover: { id: '222', alt: 'Render of a white hillside building with terraces and lawn' } },
  { slug: 'shopping-mall', title: 'Shopping Mall', category: 'Retail', year: 2022, summary: 'A modern retail environment designed to enhance experience.', cover: { id: '65', alt: 'Render of a five-storey building with rooftop terrace' } },
];

export const featured = projects.slice(0, 6);

export const kiserian = {
  title: 'Kiserian Residence',
  summary: 'A contemporary residential design that balances modern aesthetics with functional living spaces.',
  lead: 'This contemporary residence showcases our commitment to innovative architecture — blending clean lines with warm, livable spaces that feel both modern and deeply human.',
  cover: { id: 'b1', alt: 'Aerial render of the Kiserian residence with courtyard and sports court' } satisfies Photo,
  meta: [
    { key: 'Client', value: 'Elvis Ngene' },
    { key: 'Architect', value: 'Lenny Kariuki' },
    { key: 'Location', value: 'Ruiru, Nairobi' },
    { key: 'Year', value: '2024' },
    { key: 'Budget', value: '$55,000' },
    { key: 'Type', value: 'Residential' },
  ],
  features: [
    'Quality Advanced Lighting System',
    'Contemporary Modern Architecture',
    'Open Air Spaces & Ventilation',
    'Abundant Natural Light',
    'Landscaped Open Backyard',
  ],
  gallery: [
    { id: 'b2', alt: 'Front elevation of the five-storey block, dark cladding with red accents' },
    { id: 'b3', alt: 'Entrance elevation with landscaped forecourt' },
    { id: 'b5', alt: 'Covered parking and driveway beneath the building' },
    { id: 'b6', alt: 'Wide elevation of the apartment block at golden hour' },
    { id: 'b7', alt: 'Side elevation with balconies and green trim' },
    { id: 'b8', alt: 'Courtyard view between two building wings' },
  ] satisfies Photo[],
};

/** Additional renders from the studio archive, shown in the lightbox gallery. */
export const archive: Photo[] = [
  { id: 'a1', alt: 'A-frame house render with timber deck and glass facade' },
  { id: 'a2', alt: 'A-frame house, front elevation with balcony' },
  { id: 'a3', alt: 'A-frame house, side view on grassy plot' },
  { id: 'a4', alt: 'Dark-clad A-frame volume with planted terrace' },
  { id: 'c1', alt: 'Courtyard of a two-wing building with rooftop solar' },
  { id: 'c2', alt: 'Ground-floor garages with a terraced upper level' },
  { id: 'c3', alt: 'Stairwell corner of a residential block' },
  { id: 'c4', alt: 'Long frontage with planted verge' },
  { id: '101', alt: 'Two-storey commercial frontage with stone cladding' },
  { id: '202', alt: 'Two-storey building with glazed entrance core' },
  { id: '33', alt: 'Street-side view of a long terraced building' },
  { id: 'a7', alt: 'Roof terrace with lounge seating and planters' },
];

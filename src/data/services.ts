export type ServiceIcon = 'home' | 'building' | 'leaf' | 'map' | 'sofa' | 'tree';

export interface Service {
  slug: string;
  icon: ServiceIcon;
  title: string;
  short: string;
  long: string;
  items: string[];
}

export const services: Service[] = [
  { slug: 'residential', icon: 'home', title: 'Residential Design', short: 'Custom homes that reflect your lifestyle — from intimate retreats to grand family estates.', long: 'Custom home designs that reflect your unique lifestyle and preferences, from intimate retreats to grand family estates.', items: ['Custom Home Design', 'Renovation & Remodeling', 'Interior Design', 'Landscape Architecture'] },
  { slug: 'commercial', icon: 'building', title: 'Commercial Design', short: 'Innovative offices, retail, and hospitality spaces that boost productivity and brand identity.', long: 'Innovative and functional commercial spaces — from offices and retail to hospitality venues — designed to enhance brand and productivity.', items: ['Office Design', 'Retail Space Design', 'Hospitality Design', 'Mixed-Use Development'] },
  { slug: 'sustainable', icon: 'leaf', title: 'Sustainable Design', short: 'Eco-conscious designs with green building practices that minimize environmental impact.', long: 'Green building practices that minimize environmental impact while promoting energy efficiency and long-term value.', items: ['Green Building Design', 'Energy Efficiency Analysis', 'Sustainable Materials', 'LEED Certification'] },
  { slug: 'urban-planning', icon: 'map', title: 'Urban Planning', short: 'Sustainable community plans for responsible growth and vibrant urban environments.', long: 'Sustainable community plans that enhance quality of life, promote responsible growth, and create vibrant urban environments.', items: ['Master Planning', 'Community Development', 'Urban Design', 'Zoning & Land Use'] },
  { slug: 'interior', title: 'Interior Design', icon: 'sofa', short: 'Interiors that reflect your personality while maximizing space and comfort.', long: 'Functional and aesthetically pleasing interiors — designed to reflect your personality while maximizing space and comfort.', items: ['Space Planning', 'Furniture Selection', 'Material & Color Palette', 'Lighting Design'] },
  { slug: 'landscape', icon: 'tree', title: 'Landscape Architecture', short: 'Natural elements integrated with the built environment.', long: 'Integrating natural elements with the built environment to create harmonious, beautiful outdoor spaces that enhance every property.', items: ['Site Analysis', 'Landscape Design', 'Planting Design', 'Irrigation Systems'] },
];

export const process = [
  { title: 'Discovery', text: 'Understanding your vision, goals, site, and budget through in-depth consultation.' },
  { title: 'Concept', text: 'Developing initial design concepts, sketches, and 3D models for your review.' },
  { title: 'Design', text: 'Refining the approved concept into detailed architectural drawings and specifications.' },
  { title: 'Build', text: 'Overseeing construction to ensure every detail matches the design vision.' },
];

export const promises = [
  'End-to-end project management',
  'On-time delivery focus',
  'Client satisfaction first',
  'Sustainable by default',
];

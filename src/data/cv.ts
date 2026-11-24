/**
 * Public CV for the founder. Deliberately leaves out ID number, date of birth,
 * marital status, postal address, personal email and referees' phone numbers.
 */
export const cv = {
  name: 'Lenny Kariuki',
  role: 'Founder & Principal Architect, ARKYLS',
  summary:
    'Creative, self-driven and always willing to learn, with a deep admiration for nature, art and buildings. Lenny works across architectural design, site supervision and visual art, and wants to advance good design, sustainable living and aesthetics in the construction field.',
  links: [
    { label: 'Behance: Arkyls Kenya' },
    { label: 'arkyls.wuaze.com', href: 'https://arkyls.wuaze.com' },
  ] as { label: string; href?: string }[],
} as const;

export interface Role { period: string; title: string; org: string; points: string[] }

export const experience: Role[] = [
  {
    period: 'Feb 2024 – Present',
    title: 'Founder',
    org: 'ARKYLS, Nairobi',
    points: ['Started ARKYLS as a brand and limited company offering design consultations, building renovations and architectural design drawings.', 'Also creates canvas paintings, pencil art and wall paintings.'],
  },
  {
    period: 'Jul – Aug 2026',
    title: 'Design & renovation commission',
    org: 'Befya Hospitals Ltd, Malindi',
    points: ['Commissioned to design and renovate the hospital, supervising works and liaising with the team to deliver the brief.'],
  },
  {
    period: 'May – Nov 2026',
    title: 'Design commission',
    org: 'Chartin Ltd and JOYWK Ltd, Malindi',
    points: [
      'Designed the Ocean Pearl hotel, a commercial block and several small-scale projects and designs in Malindi township.',
      'Prepared all levels of drawings and approvals, and produced renders.',
      'Carried out trial-pit sampling, excavation and setting out, site reports and site supervision.',
    ],
  },
  {
    period: 'Oct 2025 – May 2026',
    title: 'Site work, Affordable Housing Programme',
    org: 'State Department, Ministry of Housing',
    points: ['Worked on the construction of affordable hostels for Subukia TVC, Nakuru.', 'Liaised with clerks of works and TEJ Architects, the consultancy firm, on supervision and site reports.'],
  },
  {
    period: 'Apr – Oct 2024',
    title: 'Design consultations and drawings',
    org: 'Epsom Limited, Ruiru, Kiambu',
    points: ['Worked with the team on design consultations and drawings for a high-rise building.'],
  },
  {
    period: 'Sep 2023 – Feb 2024',
    title: 'Farming',
    org: 'Njoro, Nakuru',
    points: ['Tree farming, crop and animal production.'],
  },
  {
    period: 'Aug 2023',
    title: 'Financial loans',
    org: 'Platinum Credit Company',
    points: ['Worked on financial loan matters.'],
  },
  {
    period: 'Jul – Aug 2023',
    title: 'Trainee, interior design and painting',
    org: 'Classic Molding Limited',
    points: ['Trained in interior design and painting.'],
  },
  {
    period: 'Feb – Apr 2022',
    title: 'Attachment, Inspection and Accreditation team',
    org: 'National Construction Authority (NCA), Supplies Branch, Nairobi',
    points: ['Gained skills in site construction methodology, site survey and inspection.'],
  },
];

export const education = [
  { period: '2018 – 2023', title: 'Diploma in Technology (Architecture), Upper Division Credit', org: 'Technical University of Kenya' },
  { period: '2015 – 2018', title: 'Secondary school, mean grade B', org: 'Njoro Boys High School' },
  { period: '2004 – 2014', title: 'Primary school, mean grade B+', org: 'Oaklands Junior School' },
];

export const skills = {
  Architecture: ['Archicad (Graphisoft)', 'Rendering software', 'Sketching', 'Technical drawing'],
  Art: ['Canvas painting', 'Pencil art', 'Wall painting', 'Art and craft'],
  Languages: ['English', 'Swahili'],
  Interests: ['Art and design', 'Travel', 'Athletics'],
} as const;

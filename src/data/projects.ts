export interface Project {
  id: number;
  title: string;
  category: 'Architecture' | 'Furniture';
  year: string;
  coverImage: string;
  images: string[];
  description: string;
  tools: string[]; // Used here to list Materials
  client: string;
  location?: string;
  dimensions?: string;
}

export interface Material {
  name: string;
  category: string;
  description: string;
  image: string;
  color: string;
}

export interface Hotspot {
  id: number;
  x: string;
  y: string;
  title: string;
  product: string;
  description: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Villa Plaster & Light',
    category: 'Architecture',
    year: '2025',
    location: 'Almere, Netherlands',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=compress&cs=tinysrgb&w=1200',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=compress&cs=tinysrgb&w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'A brutalist plaster residence built in Almere, Netherlands. The structure is carved out to choreograph the moving path of daylight, creating deep shadow-plays and moments of intense spatial clarity throughout the seasons.',
    tools: ['Chalk Plaster', 'Douglas Fir', 'Polished Concrete', 'Triple Glazing'],
    client: 'Private Residence',
  },
  {
    id: 2,
    title: 'The Veluwe Pavilion',
    category: 'Architecture',
    year: '2024',
    location: 'Veluwe, Netherlands',
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=compress&cs=tinysrgb&w=1200',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'A structural steel and low-iron glass woodland sanctuary nestled in the forests of Gelderland. Designed to completely merge indoor and outdoor spaces, with sliding glass walls that disappear entirely into timber wall-pockets.',
    tools: ['Structural Steel', 'Larch Wood Cladding', 'Low-E Glazing', 'Basalt Stone'],
    client: 'Van Der Berg Family',
  },
  {
    id: 3,
    title: 'Brutalist Monolith',
    category: 'Architecture',
    year: '2023',
    location: 'Rotterdam, Netherlands',
    coverImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=compress&cs=tinysrgb&w=1200',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'A cast-in-place concrete house in Rotterdam that celebrates material honesty and simple geometrical volumes. The raw texture of the board-marked concrete defines both exterior facades and interior partitions.',
    tools: ['Board-Marked Concrete', 'Raw Black Steel', 'Volcanic Stone', 'Brushed Oak'],
    client: 'Rotterdam City Dev',
  },
  {
    id: 4,
    title: 'Dune Cabin',
    category: 'Architecture',
    year: '2024',
    location: 'Texel, Netherlands',
    coverImage: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=compress&cs=tinysrgb&w=1200',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'An eco-friendly holiday cabin on the island of Texel, sculpted into the sandy slopes. Its dynamic pitch roof and untreated larch timber cladding will age into a beautiful silver-grey hue, blending into the dunes.',
    tools: ['Timber Framing', 'Untreated Larch Cladding', 'Clay Plaster', 'Solar Mesh'],
    client: 'Texel EcoTrust',
  },
  {
    id: 5,
    title: 'HUIS Lounge Chair',
    category: 'Furniture',
    year: '2025',
    dimensions: '78 x 82 x 70 cm',
    coverImage: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=compress&cs=tinysrgb&w=1200',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'A low-profile, ergonomic lounge chair highlighting traditional wood joinery. Built from solid smoked European oak and upholstered in custom-woven raw linen, it offers a deep tactile sit and enduring geometry.',
    tools: ['Smoked Oak', 'Woven Flax Linen', 'Brass Dowels'],
    client: 'Bespoke Collection',
  },
  {
    id: 6,
    title: 'Travertine Plinth Table',
    category: 'Furniture',
    year: '2024',
    dimensions: '120 x 120 x 28 cm',
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=compress&cs=tinysrgb&w=1200',
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'Carved from unfilled Italian travertine marble, this low coffee table system features clean mitred edges and hollow volumes, expressing stone as massive yet floatable monolith blocks.',
    tools: ['Travertine Marble', 'Matte Silicate Sealer'],
    client: 'Gallery H',
  },
  {
    id: 7,
    title: 'Smoked Oak Credenza',
    category: 'Furniture',
    year: '2024',
    dimensions: '220 x 48 x 65 cm',
    coverImage: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=compress&cs=tinysrgb&w=1200',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'A floating wall-mounted sideboard designed with sliding slatted oak panels. Hidden touch-latches, internal LED illumination, and raw brass sliding tracks combine industrial precision with organic warmth.',
    tools: ['Smoked Oak', 'Raw Brass Tracks', 'LED Diffusers'],
    client: 'Private Collector',
  },
  {
    id: 8,
    title: 'The Monolith Dining Table',
    category: 'Furniture',
    year: '2023',
    dimensions: '300 x 100 x 75 cm',
    coverImage: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=compress&cs=tinysrgb&w=1200',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'A 3-meter dining table featuring a hand-applied microcement table top and massive solid oak legs. Built to endure, the cement surface is polished with organic beeswax for a highly tactile, matte finish.',
    tools: ['Microcement Finish', 'Solid Ash Wood', 'Beeswax Finish'],
    client: 'Amsterdam Residence',
  },
];

export const materials: Material[] = [
  {
    name: 'Travertine Marble',
    category: 'Stone',
    description: 'Unfilled, honed Italian travertine that adds a warm, pitted texture and organic weight.',
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=compress&cs=tinysrgb&w=400',
    color: '#E5C39E',
  },
  {
    name: 'European Smoked Oak',
    category: 'Wood',
    description: 'Deep, dark wood with a beautiful prominent grain, smoked to highlight its natural tanins.',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=compress&cs=tinysrgb&w=400',
    color: '#3A3026',
  },
  {
    name: 'Chalk Plaster',
    category: 'Finish',
    description: 'A natural gypsum and lime plaster finish that breathes and reflects light softly.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=compress&cs=tinysrgb&w=400',
    color: '#F6F4F0',
  },
  {
    name: 'Raw Brass',
    category: 'Metal',
    description: 'Untreated brass hardware that will naturally oxidize over time, telling a story of contact and age.',
    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=compress&cs=tinysrgb&w=400',
    color: '#C5A059',
  },
  {
    name: 'Hand-woven Linen',
    category: 'Fabric',
    description: 'Coarse Belgian linen in organic flax tones, offering a tactile, breathable surface for upholstery.',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=compress&cs=tinysrgb&w=400',
    color: '#D9D3C4',
  },
];

export const hotspots: Hotspot[] = [
  {
    id: 1,
    x: '32%',
    y: '58%',
    title: 'The Lounge Chair',
    product: 'HUIS Lounge Chair',
    description: 'Solid smoked oak legs and natural flax linen cushions, detailed with exposed mortise joints.',
  },
  {
    id: 2,
    x: '55%',
    y: '78%',
    title: 'The Plinth Table',
    product: 'Travertine Plinth',
    description: 'Crafted from a single block of Italian travertine stone, raw and unfilled to show natural ages.',
  },
  {
    id: 3,
    x: '75%',
    y: '48%',
    title: 'The Storage Panel',
    product: 'Oak Credenza',
    description: 'Wall-mounted unit with fine timber slats that slide to reveal organic lighting elements.',
  },
];

export const categories = ['All', 'Architecture', 'Furniture'];

export const socialLinks = [
  { name: 'Instagram', icon: 'Instagram', url: 'https://instagram.com', color: '#1C1C1C' },
  { name: 'Pinterest', icon: 'Pinterest', url: 'https://pinterest.com', color: '#1C1C1C' },
  { name: 'LinkedIn', icon: 'Linkedin', url: 'https://linkedin.com', color: '#1C1C1C' },
];

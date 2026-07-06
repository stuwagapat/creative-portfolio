export interface Project {
  id: number;
  title: string;
  category: 'Motion Design' | 'Graphic Design' | 'Illustration' | 'Branding' | 'UI Design' | 'Web Design';
  year: string;
  coverImage: string;
  images: string[];
  description: string;
  tools: string[];
  client: string;
  links?: {
    behance?: string;
    live?: string;
    dribbble?: string;
  };
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Neon Dreams',
    category: 'Motion Design',
    year: '2024',
    coverImage: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1916824/pexels-photo-1916824.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2519160/pexels-photo-2519160.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'A mesmerizing exploration of light and motion, capturing the essence of urban nightlife through dynamic animations and vibrant color palettes. This project pushes the boundaries of visual storytelling.',
    tools: ['After Effects', 'Cinema 4D', 'Premiere Pro'],
    client: 'Nightlife Studios',
    links: {
      behance: 'https://behance.net',
    },
  },
  {
    id: 2,
    title: 'Botanica Brand Identity',
    category: 'Branding',
    year: '2024',
    coverImage: 'https://images.pexels.com/photos/1632770/pexels-photo-1632770.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1632770/pexels-photo-1632770.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'Complete brand identity system for an organic wellness company, featuring a nature-inspired color palette, custom typography, and a comprehensive design system that spans digital and print.',
    tools: ['Illustrator', 'Photoshop', 'Figma'],
    client: 'Botanica Wellness',
    links: {
      dribbble: 'https://dribbble.com',
    },
  },
  {
    id: 3,
    title: 'CryptoFlow Dashboard',
    category: 'UI Design',
    year: '2023',
    coverImage: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/videos/3643565/pexels-photo-3643565.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'A comprehensive cryptocurrency trading dashboard with real-time data visualization, portfolio management, and intuitive navigation designed for both beginners and advanced traders.',
    tools: ['Figma', 'Principle', 'After Effects'],
    client: 'CryptoFlow Inc',
    links: {
      live: 'https://dribbble.com',
    },
  },
  {
    id: 4,
    title: 'Abstract Dimensions',
    category: 'Illustration',
    year: '2023',
    coverImage: 'https://images.pexels.com/photos/1910251/pexels-photo-1910251.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1910251/pexels-photo-1910251.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/11113179/pexels-photo-11113179.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'A collection of dimensional illustrations exploring the intersection of geometry and emotion, created for a large-scale public art installation that spans 200 meters of gallery space.',
    tools: ['Procreate', 'Photoshop', 'Blender'],
    client: 'Modern Art Gallery',
    links: {
      behance: 'https://behance.net',
    },
  },
  {
    id: 5,
    title: 'Pulse Music Festival',
    category: 'Graphic Design',
    year: '2024',
    coverImage: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'Full visual identity and campaign for an electronic music festival, including posters, social media assets, environmental graphics, and motion content that captured the energy of the event.',
    tools: ['Photoshop', 'Illustrator', 'After Effects'],
    client: 'Pulse Events',
    links: {
      dribbble: 'https://dribbble.com',
    },
  },
  {
    id: 6,
    title: 'Luxe E-commerce',
    category: 'Web Design',
    year: '2023',
    coverImage: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/4226896/pexels-photo-4226896.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'A premium e-commerce experience for a luxury fashion brand, featuring immersive product presentations, personalized recommendations, and a seamless checkout flow.',
    tools: ['Figma', 'Framer', 'Webflow'],
    client: 'LUXE Fashion',
    links: {
      live: 'https://webflow.com',
    },
  },
  {
    id: 7,
    title: 'Kinetic Typography',
    category: 'Motion Design',
    year: '2024',
    coverImage: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'Experimental typography animation exploring the relationship between movement and meaning, featuring 26 unique letter animations that flow seamlessly into one another.',
    tools: ['After Effects', 'Cavalry', 'Processing'],
    client: 'Type Foundry',
    links: {
      behance: 'https://behance.net',
    },
  },
  {
    id: 8,
    title: 'Eco App Design',
    category: 'UI Design',
    year: '2024',
    coverImage: 'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1072178/pexels-photo-1072178.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'A sustainability tracking app that gamifies eco-friendly habits, featuring vibrant illustrations, achievement systems, and social features to motivate users towards a greener lifestyle.',
    tools: ['Figma', 'Rive', 'Principle'],
    client: 'GreenTech Solutions',
    links: {
      dribbble: 'https://dribbble.com',
    },
  },
];

export const skills = [
  { name: 'After Effects', color: '#9999FF' },
  { name: 'Illustrator', color: '#FF9A00' },
  { name: 'Photoshop', color: '#31A8FF' },
  { name: 'Cinema 4D', color: '#0B5577' },
  { name: 'Blender', color: '#EA7600' },
  { name: 'Figma', color: '#F24E1E' },
  { name: 'Rive', color: '#FF3366' },
  { name: 'Spline', color: '#8B5CF6' },
  { name: 'Webflow', color: '#4353FF' },
  { name: 'Framer', color: '#05F' },
];

export const categories = ['All', 'Motion', 'Graphic', 'Illustration', 'Branding', 'Web', 'UI'];

export const socialLinks = [
  { name: 'Email', icon: 'Mail', url: 'mailto:hello@alexdesign.com', color: '#FF6B6B' },
  { name: 'Behance', icon: 'MonitorPlay', url: 'https://behance.net', color: '#1769FF' },
  { name: 'Instagram', icon: 'Instagram', url: 'https://instagram.com', color: '#E4405F' },
  { name: 'LinkedIn', icon: 'Linkedin', url: 'https://linkedin.com', color: '#0A66C2' },
  { name: 'Dribbble', icon: 'Dribbble', url: 'https://dribbble.com', color: '#EA4C89' },
];

export const funFacts = [
  { emoji: '☕', label: 'Coffee addict', description: '5 cups daily' },
  { emoji: '🚴', label: 'Cycling lover', description: '100km/week' },
  { emoji: '🎵', label: 'Music explorer', description: 'All genres' },
  { emoji: '🌍', label: 'Loves traveling', description: '30+ countries' },
  { emoji: '🎨', label: 'DIY creator', description: 'Always crafting' },
];

export const stickers = [
  { id: 1, shape: 'star', color: '#FFE66D', size: 60, rotation: 15, x: '10%', y: '20%' },
  { id: 2, shape: 'circle', color: '#FF6B6B', size: 80, rotation: -10, x: '80%', y: '30%' },
  { id: 3, shape: 'triangle', color: '#4ECDC4', size: 50, rotation: 25, x: '15%', y: '70%' },
  { id: 4, shape: 'square', color: '#9B5DE5', size: 40, rotation: -5, x: '75%', y: '80%' },
  { id: 5, shape: 'cross', color: '#00F5D4', size: 55, rotation: 10, x: '50%', y: '50%' },
];

export const floatingIcons = [
  '✦', '◆', '●', '▲', '■', '★', '☆', '♦', '○', '△', '□', '◇',
];

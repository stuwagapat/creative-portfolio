export const colorPalettes = [
  {
    name: 'Sunset',
    colors: {
      coral: '#FF6B6B',
      electric: '#4ECDC4',
      sunny: '#FFE66D',
      rose: '#FF8ED4',
      mint: '#00F5D4',
      lavender: '#9B5DE5',
    },
  },
  {
    name: 'Ocean',
    colors: {
      coral: '#0077B6',
      electric: '#00B4D8',
      sunny: '#90E0EF',
      rose: '#CAF0F8',
      mint: '#03045E',
      lavender: '#023E8A',
    },
  },
  {
    name: 'Forest',
    colors: {
      coral: '#2D6A4F',
      electric: '#40916C',
      sunny: '#95D5B2',
      rose: '#B7E4C7',
      mint: '#1B4332',
      lavender: '#081C15',
    },
  },
  {
    name: 'Candy',
    colors: {
      coral: '#FF6B9D',
      electric: '#C44FE2',
      sunny: '#FFC8DD',
      rose: '#FF85A1',
      mint: '#A0E7E5',
      lavender: '#B4A7D6',
    },
  },
  {
    name: 'Neon',
    colors: {
      coral: '#FF006E',
      electric: '#00F5D4',
      sunny: '#FEE440',
      rose: '#FF007F',
      mint: '#00FFC8',
      lavender: '#8338EC',
    },
  },
  {
    name: 'Earthy',
    colors: {
      coral: '#BC6C25',
      electric: '#606C38',
      sunny: '#DDA15E',
      rose: '#FEFAE0',
      mint: '#283618',
      lavender: '#7F4F24',
    },
  },
];

export const getRandomPalette = (exclude?: string) => {
  const available = colorPalettes.filter(p => p.name !== exclude);
  return available[Math.floor(Math.random() * available.length)];
};

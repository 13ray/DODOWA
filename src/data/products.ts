export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'protection' | 'taping';
  protectionType?: 'knee' | 'waist';
  sport?: string[];
  tapingType?: string;
  colors: string[];
  useCase: string[];
  image: string;
  tag?: string;
  description: string;
  features: string[];
  rating: number;
  reviewCount: number;
  howToUse?: string;
  sizeInfo?: string;
}

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Panda 3D Knitted Knee Support',
    price: 35.00,
    category: 'protection',
    protectionType: 'knee',
    sport: ['basketball', 'running', 'football'],
    colors: ['black', 'white', 'gray'],
    useCase: ['protection', 'support'],
    image: '/pandaknee.jpg',
    tag: 'Best Seller',
    description: 'Engineered for elite performance, the Panda 3D Knitted Knee Support provides targeted compression and stability without sacrificing mobility. The advanced 3D knitting technology ensures a perfect anatomical fit.',
    features: [
      '3D Knitted Technology for anatomical fit',
      'Targeted compression for joint stability',
      'Breathable, moisture-wicking fabric',
      'Non-slip silicone grip strips',
      'Lightweight and durable construction'
    ],
    rating: 4.8,
    reviewCount: 126,
    howToUse: 'Slide the support over your foot and position it over your knee. Ensure the patella gel pad is centered over your kneecap. Adjust for a snug but comfortable fit.',
    sizeInfo: 'Available in S, M, L, XL. Measure the circumference of your thigh 10cm above the kneecap.'
  },
  {
    id: 'p2',
    name: 'Professional Color Knee Support',
    price: 42.00,
    category: 'protection',
    protectionType: 'knee',
    sport: ['basketball', 'frisbee'],
    colors: ['neon-green', 'pink', 'black'],
    useCase: ['performance', 'protection'],
    image: '/kneegreen.jpg',
    tag: 'New',
    description: 'Vibrant performance meets professional protection. Our Color Series knee supports offer the same high-level stability with a bold aesthetic for athletes who want to stand out.',
    features: [
      'High-visibility neon colors',
      'Reinforced lateral stabilizers',
      'Open patella design for pressure relief',
      'Adjustable strap system'
    ],
    rating: 4.9,
    reviewCount: 84
  },
  {
    id: 'p3',
    name: 'Professional Waist Support',
    price: 48.00,
    category: 'protection',
    protectionType: 'waist',
    sport: ['training'],
    colors: ['black', 'gray'],
    useCase: ['support', 'protection'],
    image: '/waist.jpg',
    tag: 'Sport Ready',
    description: 'Maximum core stability for heavy lifting and intense training. Our Professional Waist Support features dual-layer compression and reinforced stays to protect your lower back.',
    features: [
      'Dual-layer compression system',
      'Breathable mesh panels',
      'Reinforced lumbar stays',
      'Heavy-duty velcro closure'
    ],
    rating: 4.7,
    reviewCount: 210
  },
  {
    id: 'p4',
    name: 'White Protective Sports Tape',
    price: 8.50,
    category: 'taping',
    tapingType: 'white',
    sport: ['basketball', 'football'],
    colors: ['white'],
    useCase: ['protection', 'support'],
    image: '/tape1.jpg',
    description: 'Classic zinc oxide sports tape for rigid joint immobilization. High tensile strength and excellent adhesion for reliable support during competition.',
    features: [
      '100% cotton substrate',
      'Zinc oxide adhesive',
      'Serrated edges for easy hand tearing',
      'Latex-free'
    ],
    rating: 4.6,
    reviewCount: 342
  },
  {
    id: 'p5',
    name: 'Ankle Recovery Kinesiology Tape',
    price: 12.00,
    category: 'taping',
    tapingType: 'kinesiology',
    sport: ['running', 'frisbee'],
    colors: ['neon-green', 'pink', 'beige'],
    useCase: ['recovery', 'support'],
    image: '/tape2.jpg',
    tag: 'Recovery',
    description: 'Designed to mimic the elasticity of human skin, our Kinesiology Tape facilitates natural healing by increasing blood flow around the muscle.',
    features: [
      '170% elasticity for full range of motion',
      'Water-resistant and breathable',
      'Hypoallergenic acrylic adhesive',
      'Lasts up to 5 days'
    ],
    rating: 4.8,
    reviewCount: 156
  },
  {
    id: 'p6',
    name: 'Self-Adhesive Sports Bandage',
    price: 9.00,
    category: 'taping',
    tapingType: 'bandage',
    sport: ['running', 'basketball', 'football'],
    colors: ['black', 'white', 'neon-green'],
    useCase: ['protection', 'support'],
    image: '/tape3.jpg',
    description: 'Cohesive bandage that sticks to itself, not to skin or hair. Perfect for quick wrapping and controlled compression.',
    features: [
      'No clips or fasteners required',
      'Lightweight and breathable',
      'Controlled compression',
      'Easy to remove'
    ],
    rating: 4.5,
    reviewCount: 98
  },
  {
    id: 'p7',
    name: 'Reflective Marathon Tape',
    price: 15.00,
    category: 'taping',
    tapingType: 'reflective',
    sport: ['running'],
    colors: ['neon-green', 'white'],
    useCase: ['performance', 'protection'],
    image: '/tape4.jpg',
    tag: 'New',
    description: 'Stay visible and supported during night runs. Our reflective tape combines kinesiology benefits with high-visibility elements.',
    features: [
      'Integrated reflective patterns',
      'Dynamic support for joints',
      'Sweat-resistant adhesive',
      'Enhanced safety for low-light conditions'
    ],
    rating: 4.9,
    reviewCount: 42
  },
  {
    id: 'p8',
    name: 'Ski DIY Kinesiology Tape',
    price: 18.00,
    category: 'taping',
    tapingType: 'diy',
    sport: ['ski'],
    colors: ['pink', 'blue', 'black'],
    useCase: ['protection', 'performance'],
    image: '/tape5.jpg',
    description: 'Extra-strength adhesive designed for cold and wet conditions. Ideal for winter sports and high-intensity activities.',
    features: [
      'Cold-weather optimized adhesive',
      'Extra-wide for better coverage',
      'High-density cotton fabric',
      'Quick-dry technology'
    ],
    rating: 4.7,
    reviewCount: 65
  },
  {
    id: 'p9',
    name: 'Pro Pre-Cut Sports Tape',
    price: 22.00,
    category: 'taping',
    tapingType: 'pro',
    sport: ['basketball', 'running'],
    colors: ['black', 'neon-green'],
    useCase: ['performance', 'support'],
    image: 'tape6.jpg',
    tag: 'Best Seller',
    description: 'Professional-grade pre-cut strips for the most common applications. Save time and ensure perfect application every time.',
    features: [
      'Pre-cut for specific body parts',
      'Rounded corners to prevent peeling',
      'Step-by-step application guide included',
      'Professional-grade durability'
    ],
    rating: 4.9,
    reviewCount: 188
  }
];

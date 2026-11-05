// Pre-built clean SVG illustrations for college items to guarantee offline rendering and zero broken image links
const createSvgThumbnail = (bgColor, iconSvg, label) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <rect width="600" height="400" fill="${bgColor}"/>
    <circle cx="300" cy="180" r="85" fill="rgba(255,255,255,0.18)"/>
    <g transform="translate(255, 135) scale(3.8)" stroke="#ffffff" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      ${iconSvg}
    </g>
    <text x="300" y="320" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="600" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">${label}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const CATEGORIES = [
  'Electronics',
  'Books and Notes',
  'ID Cards',
  'Bags',
  'Wallets',
  'Accessories',
  'Clothing',
  'Keys',
  'Other'
];

export const CAMPUS_LOCATIONS = [
  'Central Library',
  'Central Cafeteria',
  'Engineering Block (Block B)',
  'Science Block (Block A)',
  'Main Auditorium',
  'Sports Complex & Ground',
  'Computer Lab 3',
  'Mechanical Workshop',
  'Student Activity Center',
  'Campus Main Gate & Parking'
];

export const INITIAL_ITEMS = [
  {
    id: 'ITEM-101',
    name: 'Black HP Laptop (15.6")',
    type: 'found', // 'lost' | 'found'
    category: 'Electronics',
    description: 'Black HP 15s series laptop with Intel Core i5 sticker and a NASA decal on the top cover. Found left on Study Table #14 in the 2nd floor reading hall.',
    location: 'Central Library',
    date: '2026-11-03',
    reporterName: 'Prof. Ramesh Rao',
    reporterEmail: 'ramesh.library@college.edu',
    status: 'active', // 'active' | 'claimed' | 'returned'
    isDemo: true,
    image: createSvgThumbnail(
      '#1e293b',
      '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="1" y1="20" x2="23" y2="20"/>',
      'HP Pavilion 15s'
    )
  },
  {
    id: 'ITEM-102',
    name: 'Blue Milton Water Bottle',
    type: 'lost',
    category: 'Other',
    description: '750ml blue metallic insulated Milton bottle with a small dent near the bottom rim and a silver carabiner clip on the lid handle.',
    location: 'Sports Complex & Ground',
    date: '2026-11-04',
    reporterName: 'Ananya Sharma',
    reporterEmail: 'ananya.s@college.edu',
    status: 'active',
    isDemo: true,
    image: createSvgThumbnail(
      '#0284c7',
      '<path d="M7 2h10v3H7z"/><path d="M6 7h12v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"/>',
      'Milton Insulated 750ml'
    )
  },
  {
    id: 'ITEM-103',
    name: 'Student ID Card - CSE Dept',
    type: 'found',
    category: 'ID Cards',
    description: 'Official College Identity Card belonging to 3rd year Computer Science student. Roll No: CS-2023-089. Found at the juice counter.',
    location: 'Central Cafeteria',
    date: '2026-11-04',
    reporterName: 'Sunil (Cafeteria Staff)',
    reporterEmail: 'cafeteria.mgr@college.edu',
    status: 'active',
    isDemo: true,
    image: createSvgThumbnail(
      '#4338ca',
      '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><line x1="15" y1="9" x2="19" y2="9"/><line x1="15" y1="13" x2="19" y2="13"/>',
      'Student Identity Card'
    )
  },
  {
    id: 'ITEM-104',
    name: 'Engineering Mathematics Notebook',
    type: 'lost',
    category: 'Books and Notes',
    description: 'Classmate spiral-bound ruled notebook with blue cover. Contains detailed notes on Differential Equations and Laplace Transforms for Semester 3.',
    location: 'Engineering Block (Block B)',
    date: '2026-11-02',
    reporterName: 'Aditya Patel',
    reporterEmail: 'aditya.p@college.edu',
    status: 'active',
    isDemo: true,
    image: createSvgThumbnail(
      '#0f766e',
      '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
      'Classmate Math Spiral'
    )
  },
  {
    id: 'ITEM-105',
    name: 'Black Wildcraft Backpack',
    type: 'found',
    category: 'Bags',
    description: 'Black Wildcraft 30L college backpack with red accents. Found on the 4th row seating after the Orientation Seminar.',
    location: 'Main Auditorium',
    date: '2026-11-01',
    reporterName: 'Pooja Nair',
    reporterEmail: 'pooja.n@college.edu',
    status: 'active',
    isDemo: true,
    image: createSvgThumbnail(
      '#334155',
      '<path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>',
      'Wildcraft Campus 30L'
    )
  },
  {
    id: 'ITEM-106',
    name: 'boAt Airdopes 141 Wireless Earbuds',
    type: 'lost',
    category: 'Electronics',
    description: 'Black boAt Airdopes in compact charging case. Left on Desk 22 in Computer Lab 3 during the Operating Systems lab session.',
    location: 'Computer Lab 3',
    date: '2026-11-03',
    reporterName: 'Siddharth Sen',
    reporterEmail: 'siddharth.s@college.edu',
    status: 'active',
    isDemo: true,
    image: createSvgThumbnail(
      '#475569',
      '<circle cx="8" cy="12" r="5"/><circle cx="16" cy="12" r="5"/><path d="M8 7V3a4 4 0 0 1 8 0v4"/>',
      'boAt TWS Earbuds'
    )
  },
  {
    id: 'ITEM-107',
    name: 'Casio fx-991EX Scientific Calculator',
    type: 'found',
    category: 'Electronics',
    description: 'Casio ClassWiz fx-991EX calculator with sliding hard case. Has small silver dot mark on the solar panel corner.',
    location: 'Mechanical Workshop',
    date: '2026-11-02',
    reporterName: 'Lab Assistant Verma',
    reporterEmail: 'mechlab@college.edu',
    status: 'active',
    isDemo: true,
    image: createSvgThumbnail(
      '#374151',
      '<rect x="4" y="2" width="16" height="20" rx="2"/><rect x="7" y="5" width="10" height="4"/><line x1="7" y1="12" x2="9" y2="12"/><line x1="11" y1="12" x2="13" y2="12"/><line x1="15" y1="12" x2="17" y2="12"/>',
      'Casio fx-991EX ClassWiz'
    )
  },
  {
    id: 'ITEM-108',
    name: 'College Library Book: DSA in Java',
    type: 'lost',
    category: 'Books and Notes',
    description: 'Library book titled "Data Structures & Algorithms in Java" by Robert Lafore. Accession stamp #LIB-9821. Due for return this Friday.',
    location: 'Central Library',
    date: '2026-11-04',
    reporterName: 'Meera Deshmukh',
    reporterEmail: 'meera.d@college.edu',
    status: 'active',
    isDemo: true,
    image: createSvgThumbnail(
      '#b45309',
      '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="14" y2="11"/>',
      'DSA Textbook (Lafore)'
    )
  },
  {
    id: 'ITEM-109',
    name: 'Brown Leather Tommy Hilfiger Wallet',
    type: 'found',
    category: 'Wallets',
    description: 'Dark brown leather bi-fold wallet. Found resting on bench near the indoor basketball court.',
    location: 'Sports Complex & Ground',
    date: '2026-10-31',
    reporterName: 'Sports Coach Kapoor',
    reporterEmail: 'sports@college.edu',
    status: 'claimed', // demonstrates a recovered/claimed item
    isDemo: true,
    image: createSvgThumbnail(
      '#78350f',
      '<rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><circle cx="17" cy="14" r="1.5"/>',
      'Bi-Fold Leather Wallet'
    )
  },
  {
    id: 'ITEM-110',
    name: 'Honda Bike Key with Red Lanyard',
    type: 'lost',
    category: 'Keys',
    description: 'Single black Honda two-wheeler ignition key attached to a red college festival lanyard with a silver clip.',
    location: 'Campus Main Gate & Parking',
    date: '2026-11-04',
    reporterName: 'Karan Joshi',
    reporterEmail: 'karan.j@college.edu',
    status: 'active',
    isDemo: true,
    image: createSvgThumbnail(
      '#dc2626',
      '<path d="M21 2l-2 2m-1.5 1.5L14 9l-3 3-4-4 3-3 3.5-3.5"/><circle cx="7.5" cy="16.5" r="4.5"/>',
      'Honda Key + Red Lanyard'
    )
  }
];

export const INITIAL_CLAIMS = [
  {
    claimId: 'CLM-84920',
    itemId: 'ITEM-105',
    itemName: 'Black Wildcraft Backpack',
    claimantName: 'Aditya Patel',
    claimantEmail: 'aditya.p@college.edu',
    proofDescription: 'Inside the second pocket there is a blue fountain pen and my engineering math assignment sheet with roll number CS-23-042.',
    submittedDate: '2026-11-02',
    status: 'Pending', // 'Pending' | 'Approved' | 'Rejected'
    adminNote: 'Verification pending with auditorium security register.'
  },
  {
    claimId: 'CLM-71203',
    itemId: 'ITEM-109',
    itemName: 'Brown Leather Tommy Hilfiger Wallet',
    claimantName: 'Rohan Gupta',
    claimantEmail: 'rohan.g@college.edu',
    proofDescription: 'Contains my driving license and metro smart card ending in 4920, verified in front of sports coach.',
    submittedDate: '2026-11-01',
    status: 'Approved',
    adminNote: 'Owner verified in person via driving license on Nov 1.'
  }
];

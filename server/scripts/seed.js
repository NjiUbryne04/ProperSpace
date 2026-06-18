require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Property = require('../src/models/Property');

const SEED_USER = {
  username: 'propspace_admin',
  email: 'admin@propspace.cm',
  password: 'Admin1234!',
  name: 'PropSpace Cameroon',
  phone: '+237 699 000 000',
};

const listings = [
  // ── YAOUNDÉ ──────────────────────────────────────────────────────────────
  {
    title: 'Luxury Villa in Bastos',
    description: 'Stunning 5-bedroom villa in the prestigious Bastos neighbourhood. Features a private garden, modern kitchen, and 24/7 security. Ideal for diplomats and executives.',
    price: 1500000,
    city: 'Yaoundé',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80'],
  },
  {
    title: 'Modern Apartment in Nlongkak',
    description: 'Brand-new 3-bedroom apartment on the 4th floor with panoramic views of Yaoundé. Fitted kitchen, marble floors, and covered parking. Close to supermarkets and schools.',
    price: 450000,
    city: 'Yaoundé',
    country: 'Cameroon',
    propertyType: 'Apartment',
    imageUrls: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80'],
  },
  {
    title: 'Cozy Studio in Mvan',
    description: 'Well-lit furnished studio, 35 m², perfect for a young professional. Close to University of Yaoundé I, bus stops, and local market.',
    price: 120000,
    city: 'Yaoundé',
    country: 'Cameroon',
    propertyType: 'Studio',
    imageUrls: ['https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80'],
  },
  {
    title: 'Family Home in Mendong',
    description: 'Spacious 4-bedroom house with a large yard, borehole water supply, and generator backup. Quiet residential street near Mendong market.',
    price: 360000,
    city: 'Yaoundé',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80'],
  },
  {
    title: 'Executive Flat in Omnisports',
    description: 'Fully furnished 2-bedroom apartment with air conditioning, fibre internet, and smart TV. Walking distance to the Omnisports Stadium and major banks.',
    price: 540000,
    city: 'Yaoundé',
    country: 'Cameroon',
    propertyType: 'Apartment',
    imageUrls: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'],
  },
  {
    title: 'Modern Villa in Bastos Haut',
    description: 'Ultra-modern 6-bedroom villa with infinity pool, home theatre, and landscaped garden. Built to international standards with imported fixtures throughout.',
    price: 2100000,
    city: 'Yaoundé',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80'],
  },
  {
    title: 'Bright Studio in Essos',
    description: 'Newly renovated studio apartment, 30 m², with en-suite bathroom and kitchenette. Gated compound with caretaker. Ideal for a student or solo professional.',
    price: 90000,
    city: 'Yaoundé',
    country: 'Cameroon',
    propertyType: 'Studio',
    imageUrls: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80'],
  },
  {
    title: '3-Bedroom House in Biyem-Assi',
    description: 'Well-maintained 3-bedroom house on a quiet street in Biyem-Assi. Large living room, tiled throughout, private compound, and close to all amenities.',
    price: 270000,
    city: 'Yaoundé',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&q=80'],
  },
  {
    title: 'Penthouse in Centre-Ville',
    description: 'Unique top-floor 4-bedroom penthouse with wrap-around terrace offering 360° views of the city. High-end finishes, open-plan living, and concierge service.',
    price: 1080000,
    city: 'Yaoundé',
    country: 'Cameroon',
    propertyType: 'Apartment',
    imageUrls: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80'],
  },

  // ── DOUALA ───────────────────────────────────────────────────────────────
  {
    title: 'Luxury Villa in Bonanjo',
    description: 'Elegant 5-bedroom villa in the exclusive Bonanjo district, close to the Port of Douala. Private pool, two-car garage, and lush tropical garden.',
    price: 1920000,
    city: 'Douala',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80'],
  },
  {
    title: 'Modern Apartment in Bonapriso',
    description: 'Luxurious 3-bedroom apartment in Bonapriso with high ceilings, imported tiles, and a private balcony. Swimming pool and gym access included in the residence.',
    price: 720000,
    city: 'Douala',
    country: 'Cameroon',
    propertyType: 'Apartment',
    imageUrls: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80'],
  },
  {
    title: 'Studio in Akwa',
    description: 'Compact furnished studio in the heart of Akwa commercial district. Perfect for business travellers and consultants. Fast WiFi and utilities included.',
    price: 180000,
    city: 'Douala',
    country: 'Cameroon',
    propertyType: 'Studio',
    imageUrls: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80'],
  },
  {
    title: 'Family Villa in Makepe',
    description: 'Spacious 4-bedroom family house in calm Makepe neighbourhood. Large garden with fruit trees, borehole, solar water heater, and generator.',
    price: 480000,
    city: 'Douala',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80'],
  },
  {
    title: '2-Bedroom Apartment in Logbessou',
    description: 'Clean 2-bedroom apartment in a modern residence with 24/7 security and backup generator. Close to Logbessou hospital and schools.',
    price: 300000,
    city: 'Douala',
    country: 'Cameroon',
    propertyType: 'Apartment',
    imageUrls: ['https://images.unsplash.com/photo-1584738766473-61c083514bf4?w=600&q=80'],
  },
  {
    title: 'Waterfront Villa in Bonaberi',
    description: 'Exceptional 6-bedroom villa with direct river access. Perfect for hosting, with a large terrace, outdoor kitchen, and private jetty. A rare Douala gem.',
    price: 2400000,
    city: 'Douala',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=600&q=80'],
  },
  {
    title: 'Modern Studio in Bali',
    description: 'Fully equipped studio apartment in the Bali district. Air conditioned, with a modern bathroom and kitchenette. Excellent transport links to Douala airport.',
    price: 150000,
    city: 'Douala',
    country: 'Cameroon',
    propertyType: 'Studio',
    imageUrls: ['https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80'],
  },
  {
    title: '4-Bedroom House in Ndogpassi',
    description: 'Solid 4-bedroom house with tiled floors, security fence, private parking, and a large backyard. Close to Ndogpassi market and international schools.',
    price: 408000,
    city: 'Douala',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80'],
  },
  {
    title: 'Serviced Apartment in Bonamoussadi',
    description: 'Fully serviced 2-bedroom apartment with housekeeping, pool access, and secured parking. Ideal for expats. Close to international schools and restaurants.',
    price: 660000,
    city: 'Douala',
    country: 'Cameroon',
    propertyType: 'Apartment',
    imageUrls: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80'],
  },

  // ── KRIBI ─────────────────────────────────────────────────────────────────
  {
    title: 'Beachfront Villa in Kribi',
    description: 'Breathtaking beachfront 4-bedroom villa steps from the white sands of Kribi. Open-plan living area with ocean views, private beach access, and tropical garden.',
    price: 1200000,
    city: 'Kribi',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1449844908441-8829872d2914?w=600&q=80'],
  },
  {
    title: 'Holiday Apartment in Kribi Centre',
    description: 'Charming 2-bedroom holiday apartment 200 m from the beach. Fully furnished with sea breeze and a shared terrace. Perfect weekend getaway or Airbnb investment.',
    price: 330000,
    city: 'Kribi',
    country: 'Cameroon',
    propertyType: 'Apartment',
    imageUrls: ['https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=600&q=80'],
  },
  {
    title: 'Ocean View Studio in Kribi',
    description: 'Sweet ocean-facing studio apartment with a balcony overlooking the Atlantic. Tiled floors, modern bathroom, and just a short stroll to seafood restaurants.',
    price: 132000,
    city: 'Kribi',
    country: 'Cameroon',
    propertyType: 'Studio',
    imageUrls: ['https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=600&q=80'],
  },
  {
    title: 'Eco-Lodge House in Kribi',
    description: 'Unique 3-bedroom eco-friendly home built with local materials, solar panels, and a rainwater collection system. Nestled in lush forest 5 min from the beach.',
    price: 540000,
    city: 'Kribi',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=600&q=80'],
  },

  // ── LIMBE ─────────────────────────────────────────────────────────────────
  {
    title: 'Sea-View Villa in Limbe',
    description: 'Stunning 3-bedroom villa perched on the Limbe hillside with unobstructed views of the Atlantic and Mount Cameroon. Private terrace, garden, and borehole water.',
    price: 840000,
    city: 'Limbe',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=600&q=80'],
  },
  {
    title: 'Modern Apartment in Mile 4 Limbe',
    description: 'Well-appointed 2-bedroom apartment in a gated estate. Modern kitchen, reliable borehole, 24/7 security, and close to the Limbe Wildlife Centre and beaches.',
    price: 300000,
    city: 'Limbe',
    country: 'Cameroon',
    propertyType: 'Apartment',
    imageUrls: ['https://images.unsplash.com/photo-1619216843049-3c24f48b2d42?w=600&q=80'],
  },
  {
    title: 'Cozy Studio near Limbe Beach',
    description: 'Peaceful furnished studio 10 minutes from Limbe beach. Tiled floors, mosquito nets, and kitchenette. Ideal for teachers and NGO workers in the area.',
    price: 108000,
    city: 'Limbe',
    country: 'Cameroon',
    propertyType: 'Studio',
    imageUrls: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80'],
  },

  // ── BUEA ──────────────────────────────────────────────────────────────────
  {
    title: 'Mountain-View House in Buea Town',
    description: 'Spectacular 4-bedroom house at the foot of Mount Cameroon. Cool highland climate, large living room, and beautiful mountain views from every window.',
    price: 420000,
    city: 'Buea',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=600&q=80'],
  },
  {
    title: 'Student Apartment near UB Campus',
    description: '2-bedroom apartment within walking distance of the University of Buea campus. Reliable power, water, and fast WiFi. Perfect for two sharing students.',
    price: 150000,
    city: 'Buea',
    country: 'Cameroon',
    propertyType: 'Apartment',
    imageUrls: ['https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?w=600&q=80'],
  },
  {
    title: 'Furnished Studio in Mile 16 Buea',
    description: 'Small but efficient studio apartment ideal for a PhD student or junior lecturer. Quiet compound, shared garden, and 5 min drive to UB.',
    price: 78000,
    city: 'Buea',
    country: 'Cameroon',
    propertyType: 'Studio',
    imageUrls: ['https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80'],
  },
  {
    title: 'Executive Residence in Buea',
    description: 'Modern 5-bedroom executive home with a large compound, generator, borehole, and domestic staff quarters. Suitable for senior managers and expat families.',
    price: 960000,
    city: 'Buea',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1613490493576-16aced3ea972?w=600&q=80'],
  },

  // ── BAFOUSSAM ─────────────────────────────────────────────────────────────
  {
    title: 'Modern Villa in Bafoussam',
    description: 'Beautiful 4-bedroom villa in the heart of the Western Region capital. Two living rooms, a modern kitchen with granite countertops, and a private compound.',
    price: 540000,
    city: 'Bafoussam',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?w=600&q=80'],
  },
  {
    title: '3-Bedroom Apartment in Tamdja',
    description: 'Spacious 3-bedroom apartment on the 2nd floor of a modern building. Fitted kitchen, tile throughout, and a sunny balcony overlooking the city.',
    price: 252000,
    city: 'Bafoussam',
    country: 'Cameroon',
    propertyType: 'Apartment',
    imageUrls: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80'],
  },
  {
    title: 'Studio near Bafoussam Market',
    description: 'Affordable studio apartment close to the Grand Market in Bafoussam. Ideal for a trader or young entrepreneur. Good transport connections throughout the city.',
    price: 72000,
    city: 'Bafoussam',
    country: 'Cameroon',
    propertyType: 'Studio',
    imageUrls: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80'],
  },
  {
    title: 'Countryside House outside Bafoussam',
    description: 'Serene 5-bedroom farmhouse-style home with rolling hill views, a large orchard, and 2,000 m² of land. Perfect for a family seeking peace away from the city.',
    price: 720000,
    city: 'Bafoussam',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=600&q=80'],
  },

  // ── BAMENDA ───────────────────────────────────────────────────────────────
  {
    title: 'Hilltop House in Bamenda',
    description: 'Commanding 4-bedroom hilltop home with panoramic views of the Bamenda skyline and surrounding green highlands. Large terrace, generator, and borehole included.',
    price: 390000,
    city: 'Bamenda',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80'],
  },
  {
    title: '2-Bedroom Apartment in Up-Station Bamenda',
    description: 'Comfortable 2-bedroom apartment in the cool Up-Station area of Bamenda. Tiled floors, reliable water supply, and great views of the highlands.',
    price: 168000,
    city: 'Bamenda',
    country: 'Cameroon',
    propertyType: 'Apartment',
    imageUrls: ['https://images.unsplash.com/photo-1584738766473-61c083514bf4?w=600&q=80'],
  },
  {
    title: 'Studio in Commercial Avenue Bamenda',
    description: 'Budget-friendly studio apartment on Commercial Avenue, the economic heart of Bamenda. Walking distance to banks, restaurants, and transport hubs.',
    price: 66000,
    city: 'Bamenda',
    country: 'Cameroon',
    propertyType: 'Studio',
    imageUrls: ['https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80'],
  },

  // ── GAROUA ────────────────────────────────────────────────────────────────
  {
    title: 'Executive Compound in Garoua',
    description: 'Impressive 5-bedroom house in a high-walled secure compound in Garoua. Air conditioned rooms, solar water heater, and large garden with mango trees.',
    price: 600000,
    city: 'Garoua',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80'],
  },
  {
    title: 'Riverside Apartment in Garoua',
    description: '3-bedroom apartment near the Bénoué River. Modern bathrooms, solar power backup, and close to Garoua International Airport and FEICOM offices.',
    price: 270000,
    city: 'Garoua',
    country: 'Cameroon',
    propertyType: 'Apartment',
    imageUrls: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80'],
  },
  {
    title: 'Affordable Studio in Garoua Rive Droite',
    description: 'Simple but comfortable studio on the right bank of Garoua. Tiled floors, mosquito nets, and a private bathroom. Close to the weekly market.',
    price: 60000,
    city: 'Garoua',
    country: 'Cameroon',
    propertyType: 'Studio',
    imageUrls: ['https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=600&q=80'],
  },

  // ── NGAOUNDÉRÉ ────────────────────────────────────────────────────────────
  {
    title: 'Colonial-Style House in Ngaoundéré',
    description: 'Charming 4-bedroom colonial-era house with wide verandas, hardwood floors, and a large garden. Located near the Ngaoundéré train station and historic Lamido Palace.',
    price: 330000,
    city: 'Ngaoundéré',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=600&q=80'],
  },
  {
    title: 'Modern Apartment in Ngaoundéré',
    description: '2-bedroom apartment in a new building close to the University of Ngaoundéré. Generator backup, water borehole, and good mobile network coverage.',
    price: 192000,
    city: 'Ngaoundéré',
    country: 'Cameroon',
    propertyType: 'Apartment',
    imageUrls: ['https://images.unsplash.com/photo-1619216843049-3c24f48b2d42?w=600&q=80'],
  },

  // ── MAROUA ────────────────────────────────────────────────────────────────
  {
    title: 'Sahel-Style Villa in Maroua',
    description: 'Distinctive 4-bedroom Sahel-architecture villa with an interior courtyard, flat roof terrace, and traditional painted walls. Air conditioned throughout.',
    price: 420000,
    city: 'Maroua',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&q=80'],
  },
  {
    title: 'Simple Apartment near Maroua Market',
    description: '2-bedroom apartment with tiled floors and solar-powered lighting close to the vibrant Grand Marché de Maroua. Good value for money.',
    price: 120000,
    city: 'Maroua',
    country: 'Cameroon',
    propertyType: 'Apartment',
    imageUrls: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80'],
  },

  // ── EBOLOWA ───────────────────────────────────────────────────────────────
  {
    title: 'Green Garden House in Ebolowa',
    description: '3-bedroom house surrounded by lush vegetation in quiet Ebolowa. Large covered patio, generator, borehole, and space for poultry. Great family home.',
    price: 228000,
    city: 'Ebolowa',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80'],
  },
  {
    title: 'Cozy Studio in Ebolowa Centre',
    description: 'Affordable studio apartment in Ebolowa city centre. Clean, bright, and close to the regional government offices, pharmacies, and banks.',
    price: 54000,
    city: 'Ebolowa',
    country: 'Cameroon',
    propertyType: 'Studio',
    imageUrls: ['https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80'],
  },

  // ── EDÉA ──────────────────────────────────────────────────────────────────
  {
    title: 'Riverside House in Edéa',
    description: 'Beautiful 3-bedroom house on the banks of the Sanaga River. Enjoy the sound of the falls from your veranda. Borehole, solar panels, and boat access.',
    price: 360000,
    city: 'Edéa',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=600&q=80'],
  },
  {
    title: 'Worker Apartment near ALUCAM Edéa',
    description: '2-bedroom apartment convenient for ALUCAM and HYDRAC workers. Modern kitchen, air conditioning in bedrooms, and close to Edéa main market.',
    price: 168000,
    city: 'Edéa',
    country: 'Cameroon',
    propertyType: 'Apartment',
    imageUrls: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'],
  },

  // ── KUMBA ─────────────────────────────────────────────────────────────────
  {
    title: 'Hilltop Home in Kumba',
    description: '4-bedroom house on a hill in Kumba with a large compound, fruit trees, and views over the South West Region. Generator and borehole fully installed.',
    price: 300000,
    city: 'Kumba',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80'],
  },
  {
    title: 'Student Studio in Kumba',
    description: 'Affordable furnished studio for students or young professionals in Kumba. Clean shared compound, reliable water, and close to transport for Buea and Douala.',
    price: 60000,
    city: 'Kumba',
    country: 'Cameroon',
    propertyType: 'Studio',
    imageUrls: ['https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=600&q=80'],
  },

  // ── BERTOUA ───────────────────────────────────────────────────────────────
  {
    title: 'Expat House in Bertoua',
    description: '5-bedroom expat-standard house in Bertoua with a swimming pool, staff quarters, satellite TV, and a generator. Ideal for oil & gas or mining sector professionals.',
    price: 1080000,
    city: 'Bertoua',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80'],
  },
  {
    title: 'Modern Apartment in Bertoua Centre',
    description: '3-bedroom apartment on the main boulevard of Bertoua. Air conditioned rooms, tiled throughout, private parking, and close to the regional hospital.',
    price: 288000,
    city: 'Bertoua',
    country: 'Cameroon',
    propertyType: 'Apartment',
    imageUrls: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80'],
  },
  {
    title: 'Budget Studio in Bertoua',
    description: 'Simple and clean studio apartment perfect for a government-posted civil servant. Tiled floors, mosquito nets, private bathroom, and shared outdoor kitchen.',
    price: 66000,
    city: 'Bertoua',
    country: 'Cameroon',
    propertyType: 'Studio',
    imageUrls: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80'],
  },

  // ── NKONGSAMBA ────────────────────────────────────────────────────────────
  {
    title: 'Tea-Country House in Nkongsamba',
    description: 'Charming 3-bedroom house in the green hills of Nkongsamba. Cool climate, large veranda, private coffee plantation, and stunning views of the Mungo valley.',
    price: 240000,
    city: 'Nkongsamba',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=600&q=80'],
  },
  {
    title: 'Apartment in Nkongsamba Centre',
    description: '2-bedroom apartment in the town centre, close to the market and transport to Douala and Bafoussam. Modern bathroom and tiled floors.',
    price: 132000,
    city: 'Nkongsamba',
    country: 'Cameroon',
    propertyType: 'Apartment',
    imageUrls: ['https://images.unsplash.com/photo-1584738766473-61c083514bf4?w=600&q=80'],
  },

  // ── ADDITIONAL DOUALA & YAOUNDÉ PREMIUM ───────────────────────────────────
  {
    title: 'Smart Home in Bonapriso Douala',
    description: 'Cutting-edge smart home: voice-controlled lights, AI security cameras, automated gates, and app-controlled AC. 4 bedrooms, roof terrace, and heated pool.',
    price: 3000000,
    city: 'Douala',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80'],
  },
  {
    title: 'Diplomatic Villa in Bastos Yaoundé',
    description: 'Grand 7-bedroom diplomatic-standard villa behind the embassies district. Bullet-proof perimeter, three-car garage, staff wing, and landscaped 1,500 m² garden.',
    price: 3600000,
    city: 'Yaoundé',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1616137422495-1e9e46e2aa1e?w=600&q=80'],
  },
  {
    title: 'Penthouse Duplex in Douala',
    description: 'Exclusive two-level penthouse in downtown Douala. 5 bedrooms, two terraces with harbour views, private lift, and concierge. The pinnacle of city living.',
    price: 2700000,
    city: 'Douala',
    country: 'Cameroon',
    propertyType: 'Apartment',
    imageUrls: ['https://images.unsplash.com/photo-1615529162924-f8605388461d?w=600&q=80'],
  },
  {
    title: 'Garden Apartment in Yaoundé Quartier Lac',
    description: 'Ground-floor 3-bedroom apartment with a private garden patio. Modern open-plan kitchen, marble bathrooms, and direct garden access. Quiet Lac neighbourhood.',
    price: 570000,
    city: 'Yaoundé',
    country: 'Cameroon',
    propertyType: 'Apartment',
    imageUrls: ['https://images.unsplash.com/photo-1598228723793-50e3ad52b3b2?w=600&q=80'],
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  let user = await User.findOne({ email: SEED_USER.email });
  if (!user) {
    user = await User.create(SEED_USER);
    console.log(`Created seed user: ${user.email}`);
  } else {
    console.log(`Using existing seed user: ${user.email}`);
  }

  await Property.deleteMany({ author: user._id });
  console.log('Cleared old seed properties');

  const withAuthor = listings.map((l) => ({ ...l, author: user._id }));
  const created = await Property.insertMany(withAuthor);
  console.log(`\nSeeded ${created.length} Cameroon properties\n`);

  const counts = {};
  created.forEach((p) => { counts[p.city] = (counts[p.city] || 0) + 1; });
  Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([city, n]) => console.log(`  ${city}: ${n} listings`));

  await mongoose.disconnect();
  console.log('\nDone.');
}

seed().catch((err) => { console.error(err); process.exit(1); });

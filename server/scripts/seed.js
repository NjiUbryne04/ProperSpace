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
  {
    title: 'Modern Duplex Villa in Bastos, Yaoundé',
    description: 'Stunning contemporary 4-bedroom duplex in the prestigious Bastos district. Brown and cream exterior, open-plan living, fitted kitchen with granite tops, 24/7 security, backup generator, and a private walled compound. Ideal for diplomats and executives.',
    price: 1800000,
    city: 'Yaoundé',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1628144688607-c373d8e3f31b?w=600&q=80'],
  },
  {
    title: 'Executive Family Home in Bonapriso, Douala',
    description: 'Spacious 5-bedroom family house in the exclusive Bonapriso neighbourhood. Features marble floors, two living rooms, a fitted kitchen, staff quarters, borehole water, generator, and a large garden with mango and avocado trees.',
    price: 2200000,
    city: 'Douala',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1586228046763-cd367fc926bf?w=600&q=80'],
  },
  {
    title: 'Charming 3-Bedroom House in Makepe, Douala',
    description: 'Well-maintained 3-bedroom house on a calm residential street in Makepe. Tiled throughout, private compound with fruit trees, reliable borehole, and a covered parking space. Close to supermarkets, schools, and the Douala-Yaoundé highway.',
    price: 480000,
    city: 'Douala',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1661332618293-6b6204cd87fc?w=600&q=80'],
  },
  {
    title: 'Hilltop Residence with City View, Yaoundé',
    description: 'Panoramic 4-bedroom hilltop home in Omnisports with sweeping views of Yaoundé. Bright airy rooms, terracotta tiles, a large terrace perfect for entertaining, solar water heater, and a generator. Calm neighbourhood with excellent road access.',
    price: 750000,
    city: 'Yaoundé',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1645264531554-ea687bf4591e?w=600&q=80'],
  },
  {
    title: 'Colourful Modern Home in Bonanjo, Douala',
    description: 'Bright and stylish 3-bedroom home in Bonanjo close to the port authority and major banks. Freshly painted, fully tiled, private garden with security fence, and an elevated terrace with sea breeze. Perfect for a young family.',
    price: 620000,
    city: 'Douala',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1693628773849-0286d524a82b?w=600&q=80'],
  },
  {
    title: 'Orange-Façade Villa near Kribi Beach',
    description: 'Vibrant 4-bedroom villa painted in warm tones, 300 m from the white sand beaches of Kribi. Spacious wraparound veranda, outdoor kitchen, borehole, solar panels, and a lush tropical garden. Excellent holiday rental income potential.',
    price: 1200000,
    city: 'Kribi',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1568903421626-ca0f5d72b5b2?w=600&q=80'],
  },
  {
    title: 'Solid Brick Family House in Nlongkak, Yaoundé',
    description: 'Classic solid-brick 4-bedroom house in the popular Nlongkak neighbourhood. Large lounge, dining room, modern kitchen, utility room, private parking for two cars, and a garden compound. Walking distance to schools, churches, and Nlongkak market.',
    price: 420000,
    city: 'Yaoundé',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1585306873915-981cc5ba5b77?w=600&q=80'],
  },
  {
    title: 'Whitewashed Coastal Cottage in Limbe',
    description: 'Whitewashed 3-bedroom coastal cottage steps from Limbe\'s black-sand beach. Ocean breezes, a covered veranda with hammock, solar power, and a borehole. Ideal for a weekend retreat or permanent coastal living.',
    price: 540000,
    city: 'Limbe',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1600250058871-fc9ef7b397ee?w=600&q=80'],
  },
  {
    title: 'Pink Heritage House in Bafoussam',
    description: 'Charming heritage-style 3-bedroom house with a painted rose exterior set against the green Western Region hills. Wide front porch, hardwood floors, a large back garden, and excellent views of the Bafoussam plateau.',
    price: 360000,
    city: 'Bafoussam',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1781427011944-2e7a851e82ac?w=600&q=80'],
  },
  {
    title: 'Quiet Residential Villa in Biyem-Assi, Yaoundé',
    description: 'Quiet 4-bedroom villa in the well-established Biyem-Assi area. Tiled rooms, fitted kitchen, private compound with papaya and plantain trees, borehole, and a domestic staff room. Very close to Biyem-Assi market and bus stops.',
    price: 520000,
    city: 'Yaoundé',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1658872180512-7ee222963246?w=600&q=80'],
  },
  {
    title: 'Central Location House in Akwa, Douala',
    description: 'Strategic 3-bedroom house in the heart of Douala\'s commercial district, Akwa. Easy walk to banks, restaurants, and corporate offices. Private compound, reliable borehole, tiled floors, and a covered carport.',
    price: 680000,
    city: 'Douala',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1659947234294-b217aaeb25f8?w=600&q=80'],
  },
  {
    title: 'Black-and-White Modern House in Buea',
    description: 'Bold contemporary 3-bedroom house finished in black exterior with white trim at the foot of Mount Cameroon. Modern bathrooms, open kitchen, generator, and a cool highland climate all year round.',
    price: 450000,
    city: 'Buea',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1640635488629-03cd4e1038c7?w=600&q=80'],
  },
  {
    title: 'Gated Estate Home in Logbessou, Douala',
    description: 'Modern 4-bedroom house in a planned gated estate in Logbessou. Paved estate roads, communal water tower, 24/7 security, and excellent access to Douala International Airport and international schools.',
    price: 580000,
    city: 'Douala',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1636137627135-1de8c36e92de?w=600&q=80'],
  },
  {
    title: 'Traditional Compound House in Bamenda',
    description: 'Authentic 5-bedroom compound house in the cool highlands of Bamenda. Central courtyard, separate kitchen wing, fruit trees, borehole, generator, and large entertaining spaces with cool mountain air year-round.',
    price: 300000,
    city: 'Bamenda',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1646985645910-5b9b1dd7b9e2?w=600&q=80'],
  },
  {
    title: 'Grand Duplex Residence in Mendong, Yaoundé',
    description: 'Impressive 5-bedroom duplex with elegant brown-and-cream rendering in Mendong. Upper-floor terrace, two living rooms, American kitchen, home office, boys\' quarters, and a spacious compound with garden.',
    price: 1500000,
    city: 'Yaoundé',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1639774275491-71d62502a4e0?w=600&q=80'],
  },
  {
    title: 'High-Walled Secure Home in Garoua',
    description: 'Solid 4-bedroom house in a high-walled fenced compound in Garoua. Air-conditioned bedrooms, solar water heater, borehole, generator, and a large shaded terrace. Close to Garoua International Airport.',
    price: 400000,
    city: 'Garoua',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1661332626584-2ef99ddd6794?w=600&q=80'],
  },
  {
    title: 'Waterfront Stilt House near Kribi',
    description: 'Extraordinary 3-bedroom stilt house built over the Lobé River estuary near Kribi. Wake up to river views, fish from your deck, and watch sea turtles pass. Solar-powered, borehole water, and accessible by boat from the beach.',
    price: 900000,
    city: 'Kribi',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1672875615330-dca335f8a283?w=600&q=80'],
  },
  {
    title: 'Modern Estate Villa in Bonamoussadi, Douala',
    description: 'Elegant 4-bedroom house in Douala\'s sought-after Bonamoussadi estate. Paved roads within the estate, communal security, underground drainage, and proximity to international schools, restaurants, and supermarkets.',
    price: 850000,
    city: 'Douala',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1636970333550-2ce3aeda6754?w=600&q=80'],
  },
  {
    title: 'Green Countryside Villa in Ebolowa',
    description: 'Peaceful 4-bedroom countryside villa surrounded by tropical vegetation in Ebolowa. Large wraparound veranda, borehole with pressure pump, solar panels, generator, and a 1,500 m² garden with coffee plants and citrus trees.',
    price: 280000,
    city: 'Ebolowa',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1737210249822-f375019c3263?w=600&q=80'],
  },
  {
    title: 'Luxury Expat Villa in Bastos Haut, Yaoundé',
    description: 'Prestigious 6-bedroom expat-standard villa in upper Bastos — the most exclusive address in Yaoundé. Infinity pool, home cinema, gym, landscaped 2,000 m² garden, three-car garage, electric gates, and 24/7 armed security.',
    price: 3500000,
    city: 'Yaoundé',
    country: 'Cameroon',
    propertyType: 'House',
    imageUrls: ['https://images.unsplash.com/photo-1661332628548-082c0b446ee1?w=600&q=80'],
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

  await Property.deleteMany({});
  console.log('Cleared all existing properties\n');

  const withAuthor = listings.map((l) => ({ ...l, author: user._id }));
  const created = await Property.insertMany(withAuthor);

  console.log(`Seeded ${created.length} African house listings:\n`);
  created.forEach((p, i) => {
    console.log(`  ${i + 1}. [${p.city}] ${p.title}`);
    console.log(`     ${p.price.toLocaleString('fr-FR')} FCFA/month`);
  });

  await mongoose.disconnect();
  console.log('\nDone.');
}

seed().catch((err) => { console.error(err); process.exit(1); });

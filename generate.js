const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

// Helper functions
function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function randomFloat(min, max, dec = 2) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(dec));
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickN(arr, n) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

// Brand pool
const brands = [
  'Maybelline', 'L\'Oréal', 'MAC', 'NYX', 'Revlon', 'Clinique', 'Fenty Beauty',
  'Charlotte Tilbury', 'Urban Decay', 'Too Faced', 'Bobbi Brown', 'NARS',
  'Estée Lauder', 'Benefit', 'Tarte', 'e.l.f.', 'Covergirl', 'Huda Beauty',
  'Rare Beauty', 'Glossier'
];

// Tags pool
const tagPools = {
  mascara: ['mascara', 'eye makeup', 'lashes', 'volumizing', 'lengthening'],
  eyeshadow: ['eyeshadow', 'eye makeup', 'palette', 'pigmented', 'blendable'],
  powder: ['face powder', 'setting powder', 'matte finish', 'oil control', 'pressed powder'],
  lipstick: ['lipstick', 'lip color', 'matte', 'creamy', 'long-lasting'],
  nail: ['nail polish', 'nail care', 'glossy', 'quick-dry', 'manicure'],
  foundation: ['foundation', 'base makeup', 'coverage', 'liquid', 'skin-matching'],
  lipgloss: ['lip gloss', 'lip color', 'shine', 'hydrating', 'plumping'],
  eyeliner: ['eyeliner', 'eye makeup', 'waterproof', 'precise', 'smudge-proof'],
  blush: ['blush', 'cheek color', 'rosy', 'blendable', 'natural flush'],
  spray: ['setting spray', 'makeup fixer', 'long-wear', 'refreshing', 'hydrating'],
  concealer: ['concealer', 'coverage', 'brightening', 'under-eye', 'blemish'],
  brow: ['eyebrow', 'brow shaping', 'defining', 'natural look', 'grooming'],
  highlighter: ['highlighter', 'glow', 'luminous', 'shimmer', 'radiant'],
  primer: ['primer', 'base', 'smoothing', 'pore-minimizing', 'long-wear'],
  bronzer: ['bronzer', 'contour', 'sun-kissed', 'warm-toned', 'sculpting'],
  tool: ['makeup tool', 'brush', 'sponge', 'application', 'blending'],
  skincare: ['skincare', 'cleansing', 'gentle', 'daily routine', 'refreshing'],
  accessory: ['beauty accessory', 'organizer', 'travel', 'portable', 'convenient'],
  general: ['beauty', 'cosmetics', 'makeup', 'cruelty-free', 'everyday']
};

// Shade options per category
const shadeMap = {
  lipstick: ['Classic Red', 'Berry Kiss', 'Nude Blush', 'Coral Dream', 'Mauve Magic', 'Pink Petal'],
  foundation: ['Fair Ivory', 'Light Beige', 'Medium Sand', 'Warm Honey', 'Deep Mocha', 'Rich Espresso'],
  concealer: ['Porcelain', 'Light', 'Medium', 'Tan', 'Deep', 'Rich'],
  blush: ['Peach Glow', 'Rose Petal', 'Soft Coral', 'Berry Flush', 'Warm Nude', 'Sunset Pink'],
  eyeshadow: ['Champagne', 'Rose Gold', 'Smoky Taupe', 'Bronze Shimmer', 'Midnight Blue', 'Plum'],
  nail: ['Classic Red', 'Hot Pink', 'Nude Blush', 'Berry Wine', 'Coral Sunset', 'French White'],
  bronzer: ['Sun-Kissed', 'Golden Glow', 'Warm Bronze', 'Deep Tan'],
  highlighter: ['Champagne Pop', 'Rose Gold', 'Icy White', 'Golden Hour'],
  default: null
};

// Finish options
const finishOptions = ['Matte', 'Glossy', 'Satin', 'Shimmer', 'Dewy', 'Natural', 'Velvet', 'Cream'];

// Skin types
const skinTypes = ['All', 'Oily', 'Dry', 'Combination', 'Sensitive', 'Normal'];

// Ingredients pools
const ingredientPools = {
  mascara: ['Beeswax', 'Carnauba Wax', 'Iron Oxide', 'Panthenol', 'Vitamin E', 'Nylon Fibers', 'Rice Bran Wax'],
  eyeshadow: ['Mica', 'Talc', 'Dimethicone', 'Iron Oxide', 'Titanium Dioxide', 'Kaolin', 'Silica'],
  powder: ['Talc', 'Silica', 'Mica', 'Zinc Stearate', 'Dimethicone', 'Kaolin', 'Nylon-12'],
  lipstick: ['Castor Oil', 'Beeswax', 'Shea Butter', 'Vitamin E', 'Jojoba Oil', 'Candelilla Wax', 'Iron Oxide'],
  nail: ['Nitrocellulose', 'Butyl Acetate', 'Ethyl Acetate', 'Tosylamide', 'Isopropyl Alcohol', 'Trimethylpentanediyl Dibenzoate'],
  foundation: ['Water', 'Dimethicone', 'Glycerin', 'Titanium Dioxide', 'Iron Oxide', 'Niacinamide', 'Hyaluronic Acid'],
  lipgloss: ['Polybutene', 'Hydrogenated Polyisobutene', 'Jojoba Oil', 'Vitamin E', 'Shea Butter', 'Castor Oil'],
  eyeliner: ['Cyclopentasiloxane', 'Iron Oxide', 'Trimethylsiloxysilicate', 'Candelilla Wax', 'Vitamin E'],
  blush: ['Talc', 'Mica', 'Dimethicone', 'Iron Oxide', 'Silica', 'Kaolin', 'Zinc Stearate'],
  primer: ['Water', 'Dimethicone', 'Glycerin', 'Silica', 'Niacinamide', 'Vitamin C', 'Hyaluronic Acid'],
  skincare: ['Water', 'Glycerin', 'Aloe Vera', 'Vitamin E', 'Jojoba Oil', 'Chamomile Extract', 'Green Tea Extract'],
  general: ['Mica', 'Talc', 'Dimethicone', 'Vitamin E', 'Glycerin', 'Silica', 'Jojoba Oil']
};

// Benefits pools
const benefitPools = {
  mascara: ['Volumizing lashes', 'Lengthening effect', 'Long-lasting wear', 'No clumping', 'Easy removal', 'Smudge-proof'],
  eyeshadow: ['Highly pigmented', 'Blendable formula', 'Long-lasting color', 'Smooth application', 'Versatile shades', 'Crease-resistant'],
  powder: ['Controls shine', 'Smooth finish', 'Sets makeup', 'Lightweight feel', 'Blurs imperfections', 'All-day wear'],
  lipstick: ['Rich color payoff', 'Hydrating formula', 'Long-lasting', 'Comfortable wear', 'No feathering', 'Smooth application'],
  nail: ['Quick-drying', 'Chip-resistant', 'High-shine finish', 'Streak-free application', 'Long-lasting color', 'Easy removal'],
  foundation: ['Even coverage', 'Natural finish', 'Hydrating', 'Buildable coverage', 'Skin-matching', 'Lightweight feel'],
  lipgloss: ['High-shine finish', 'Non-sticky formula', 'Hydrating', 'Plumping effect', 'Smooth application', 'Buildable color'],
  eyeliner: ['Precise application', 'Waterproof', 'Smudge-proof', 'Long-lasting', 'Easy to apply', 'Intense color'],
  blush: ['Natural flush', 'Blendable', 'Buildable color', 'Long-lasting', 'Soft texture', 'Seamless finish'],
  primer: ['Smooths skin', 'Pore-minimizing', 'Extends makeup wear', 'Hydrating base', 'Lightweight', 'Silky finish'],
  bronzer: ['Sun-kissed glow', 'Buildable warmth', 'Natural contour', 'Blendable', 'Long-lasting', 'Smooth texture'],
  highlighter: ['Radiant glow', 'Buildable shimmer', 'Smooth application', 'Long-lasting luminosity', 'Natural-looking', 'Versatile use'],
  tool: ['Easy to use', 'Durable build', 'Smooth application', 'Professional results', 'Easy to clean', 'Versatile use'],
  skincare: ['Gentle cleansing', 'Refreshing feel', 'Removes impurities', 'Soft skin', 'Daily use', 'Non-irritating'],
  accessory: ['Portable design', 'Durable material', 'Spacious', 'Lightweight', 'Travel-friendly', 'Organized storage'],
  general: ['Easy to use', 'High quality', 'Long-lasting', 'Versatile', 'Professional results', 'Comfortable']
};

// Review user names
const userNames = [
  'Priya S.', 'Ananya M.', 'Riya K.', 'Sneha R.', 'Divya P.', 'Meera T.',
  'Pooja L.', 'Kavya N.', 'Isha G.', 'Neha D.', 'Tanya B.', 'Sanya W.',
  'Aditi V.', 'Nikita J.', 'Shreya H.', 'Sakshi C.', 'Aisha F.', 'Ritika A.',
  'Simran E.', 'Anjali U.', 'Maya R.', 'Zara K.', 'Kriti S.', 'Diya P.',
  'Palak M.', 'Vidya T.', 'Swati N.', 'Rhea G.', 'Kiara B.', 'Nisha L.',
  'EmmaB', 'SophiaLiu', 'OliviaJ', 'AvaSmith', 'MiaMakeup', 'CharlotteK',
  'AmeliaR', 'HarperG', 'EvelynT', 'AbigailN', 'BeautyLover22', 'GlowGirl',
  'MakeupQueen', 'SkincareJunkie', 'CosmeticFan', 'GlamourGal', 'PrettyInPink',
  'NaturalBeauty', 'StyleIcon', 'TrendyMiss'
];

// Review comment templates per sentiment
const positiveComments = [
  'Absolutely love this product! It works exactly as described and the quality is amazing.',
  'Best purchase I\'ve made in a while. The texture and finish are perfect.',
  'Really impressed with the quality. Will definitely buy again!',
  'This product exceeded my expectations. Beautiful result every time.',
  'Great value for the price. I use it daily and it never disappoints.',
  'Super pigmented and easy to apply. My new go-to product!',
  'The formula is incredible. Smooth, long-lasting, and looks beautiful.',
  'I\'ve tried many brands but this one stands out. Highly recommend!',
  'Perfect for everyday use. The quality is comparable to high-end brands.',
  'Amazing product! The packaging is also very pretty and sturdy.',
  'So glad I found this. It blends beautifully and stays on all day.',
  'Five stars! The color is gorgeous and the formula feels lightweight.',
  'This has become a staple in my beauty routine. Love everything about it.',
  'Wonderful product with great ingredients. My skin feels great after using it.',
  'The best in its category. I\'ve recommended it to all my friends.',
  'Lovely texture and finish. It applies smoothly and looks natural.',
  'Can\'t believe how good this is for the price. Truly amazing quality.',
  'Beautiful packaging and even better product inside. A must-have!',
  'I use this almost every day and it performs consistently well.',
  'Fantastic product! It does everything it promises and more.'
];

const neutralComments = [
  'Good product overall. Does what it says but nothing extraordinary.',
  'Decent quality for the price. Works fine for everyday use.',
  'It\'s okay. Not the best I\'ve tried but certainly not bad either.',
  'Average product. Gets the job done but I expected a bit more.',
  'Pretty good but could be better. The formula is decent enough.'
];

const negativeComments = [
  'Not what I expected. The quality could be much better for this price.',
  'Average at best. There are better options available in the market.',
  'The product is okay but doesn\'t last very long throughout the day.'
];

// Categorize each product for appropriate field values
function categorizeProduct(title) {
  const t = title.toLowerCase();
  if (t.includes('mascara')) return 'mascara';
  if (t.includes('eyeshadow')) return 'eyeshadow';
  if (t.includes('powder') || t.includes('canister')) return 'powder';
  if (t.includes('lipstick')) return 'lipstick';
  if (t.includes('nail')) return 'nail';
  if (t.includes('foundation') || t.includes('bb cream')) return 'foundation';
  if (t.includes('lip gloss') || t.includes('lip tint') || t.includes('lip plump')) return 'lipgloss';
  if (t.includes('eyeliner') || t.includes('kajal')) return 'eyeliner';
  if (t.includes('blush')) return 'blush';
  if (t.includes('setting spray') || t.includes('spray')) return 'spray';
  if (t.includes('concealer') || t.includes('corrector')) return 'concealer';
  if (t.includes('brow') || t.includes('pencil') && t.includes('brow')) return 'brow';
  if (t.includes('highlighter')) return 'highlighter';
  if (t.includes('primer')) return 'primer';
  if (t.includes('bronz') || t.includes('contour')) return 'bronzer';
  if (t.includes('brush') || t.includes('sponge') || t.includes('blender') || t.includes('puff') || t.includes('curler')) return 'tool';
  if (t.includes('remover') || t.includes('cleansing') || t.includes('cleanser')) return 'skincare';
  if (t.includes('mirror') || t.includes('organizer') || t.includes('bag') || t.includes('lash') || t.includes('eyelash')) return 'accessory';
  if (t.includes('strengthener')) return 'nail';
  if (t.includes('lip liner')) return 'lipstick';
  return 'general';
}

// Generate reviews for a product
function generateReviews(productId, productTitle, productRating) {
  const numReviews = randomInt(5, 8);
  const reviews = [];
  const usedNames = new Set();
  const baseDate = new Date('2025-01-15');

  for (let i = 0; i < numReviews; i++) {
    let userName;
    do {
      userName = pick(userNames);
    } while (usedNames.has(userName));
    usedNames.add(userName);

    // Weight rating around the product's rating
    let reviewRating;
    const rand = Math.random();
    if (rand < 0.5) {
      reviewRating = Math.round(productRating);
    } else if (rand < 0.8) {
      reviewRating = Math.min(5, Math.round(productRating) + 1);
    } else {
      reviewRating = Math.max(1, Math.round(productRating) - 1);
    }
    reviewRating = Math.max(1, Math.min(5, reviewRating));

    let comment;
    if (reviewRating >= 4) {
      comment = pick(positiveComments);
    } else if (reviewRating === 3) {
      comment = pick(neutralComments);
    } else {
      comment = pick(negativeComments);
    }

    const reviewDate = new Date(baseDate);
    reviewDate.setDate(reviewDate.getDate() + randomInt(0, 500));

    reviews.push({
      id: i + 1,
      userName: userName,
      rating: reviewRating,
      comment: comment,
      date: reviewDate.toISOString().split('T')[0]
    });
  }

  return reviews;
}

// Process each product
const enrichedProducts = db.products.map((product) => {
  const cat = categorizeProduct(product.title);
  const discountPercentage = randomInt(5, 30);
  const finalPrice = parseFloat((product.price * (1 - discountPercentage / 100)).toFixed(2));
  const reviews = generateReviews(product.id, product.title, product.rating);
  const reviewCount = reviews.length;

  // Determine availability
  let availabilityStatus;
  if (product.stock > 50) availabilityStatus = 'In Stock';
  else if (product.stock > 10) availabilityStatus = 'Low Stock';
  else if (product.stock > 0) availabilityStatus = 'Very Low Stock';
  else availabilityStatus = 'Out of Stock';

  // Get tags
  const tagPool = tagPools[cat] || tagPools.general;
  const tags = pickN(tagPool, randomInt(3, 5));

  // Shade
  const shadePool = shadeMap[cat] || shadeMap.default;
  const shade = shadePool ? pick(shadePool) : null;

  // Finish
  const finish = pick(finishOptions);

  // Skin type
  const skinType = pick(skinTypes);

  // Ingredients
  const ingPool = ingredientPools[cat] || ingredientPools.general;
  const ingredients = pickN(ingPool, randomInt(4, 6));

  // Benefits
  const benPool = benefitPools[cat] || benefitPools.general;
  const benefits = pickN(benPool, randomInt(3, 5));

  // Cruelty free & vegan
  const isCrueltyFree = Math.random() > 0.15;
  const isVegan = Math.random() > 0.3;

  // Expiry months
  const expiryMonths = randomInt(12, 36);

  // Additional images (use the main image + variations)
  const images = [
    product.image,
    product.image.replace('w=1260', 'w=800').replace('h=750', 'h=600'),
    product.image.replace('w=1260', 'w=640').replace('h=750', 'h=480')
  ];

  const createdAt = new Date('2025-01-01');
  createdAt.setDate(createdAt.getDate() + randomInt(0, 200));

  const enriched = {
    id: product.id,
    title: product.title,
    slug: product.slug || slugify(product.title),
    description: product.description,
    category: product.category,
    brand: product.brand || pick(brands),
    price: product.price,
    discountPercentage: discountPercentage,
    finalPrice: finalPrice,
    rating: product.rating,
    reviewCount: reviewCount,
    stock: product.stock,
    availabilityStatus: availabilityStatus,
    image: product.image,
    images: images,
    tags: tags,
    shade: shade,
    finish: finish,
    skinType: skinType,
    ingredients: ingredients,
    benefits: benefits,
    isCrueltyFree: isCrueltyFree,
    isVegan: isVegan,
    expiryMonths: expiryMonths,
    reviews: reviews,
    createdAt: createdAt.toISOString()
  };

  return enriched;
});

const output = { products: enrichedProducts };
fs.writeFileSync(dbPath, JSON.stringify(output, null, 2), 'utf-8');
console.log(`Done! Enriched ${enrichedProducts.length} products with all fields and reviews.`);

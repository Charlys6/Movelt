/* Usage: node scripts/seedProducts.js [API_URL]
   Example: node scripts/seedProducts.js http://localhost:5000
*/
const fetch = require('node-fetch');

const SAMPLE_PRODUCTS = [
  {
    name: 'Classic Skateboard',
    description: 'Maple deck, 8.0 inch — perfect for street and park.',
    price: 89.99,
    image: 'https://via.placeholder.com/500x500?text=Skateboard',
    category: 'skateboard',
    stock: 25,
    rating: 4.5,
    reviews: 12
  },
  {
    name: 'Urban E-Scooter',
    description: 'Lightweight electric scooter, 20km range.',
    price: 399.0,
    image: 'https://via.placeholder.com/500x500?text=E-Scooter',
    category: 'scooter',
    stock: 10,
    rating: 4.7,
    reviews: 34
  },
  {
    name: 'All-Terrain E-Bike',
    description: 'Powerful motor, 80km range, ideal for commuters.',
    price: 1299.0,
    image: 'https://via.placeholder.com/500x500?text=E-Bike',
    category: 'ebike',
    stock: 5,
    rating: 4.8,
    reviews: 19
  },
  {
    name: 'Pro Roller Skates',
    description: 'Durable boots with smooth bearings, indoor/outdoor.',
    price: 129.99,
    image: 'https://via.placeholder.com/500x500?text=Roller+Skates',
    category: 'roller-skate',
    stock: 30,
    rating: 4.4,
    reviews: 8
  },
  {
    name: 'Balance Hoverboard',
    description: 'Self-balancing hoverboard with safety-certified battery.',
    price: 249.0,
    image: 'https://via.placeholder.com/500x500?text=Hoverboard',
    category: 'hoverboard',
    stock: 12,
    rating: 4.2,
    reviews: 15
  }
];

async function seed(apiBase) {
  const url = apiBase.replace(/\/+$/, '') + '/api/products';

  for (const p of SAMPLE_PRODUCTS) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(p),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('Failed to create', p.name, res.status, text);
      } else {
        const data = await res.json();
        console.log('Created:', data.name || data._id || JSON.stringify(data));
      }
    } catch (err) {
      console.error('Error creating product', p.name, err.message);
    }
  }
}

const apiArg = process.argv[2] || 'http://localhost:5000';
seed(apiArg).then(() => console.log('Seeding complete'));
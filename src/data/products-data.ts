export default [
  {
    id: 1,
    name: "Dog Chew Toy",
    slug: "dog-chew-toy",
    category: "pet-food",
    subcategory: "dog-food",
    description: "This the description",
    images: [
      "https://images.unsplash.com/photo-1591946614720-90a587da4a36?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    ],
    variants: [
      { weight: "2.5kg", price: 10.16, salePrice: 8.99, currency: "JPY" },
      { weight: "5.5kg", price: 40.16, salePrice: 3.99, currency: "JPY" },
    ],
    reviews: [
      {
        id: 1,
        name: "Sarah Johnson",
        status: true,
        countryCode: "US",
        rating: 5,
        text: "The cat supplies from Crunchies are simply the best. The delivery is always on time, and their customer service team is incredibly helpful whenever I have questions.",
        date: "2025-01-01",
      },
      {
        id: 2,
        name: "Phidelis P.",
        status: true,
        countryCode: "FR",
        rating: 3,
        text: "The cat supplies from Crunchies are simply the best. The delivery is always on time, and their customer service team is incredibly helpful whenever I have questions.",
        date: "2025-01-01",
      },
    ],
    findOnline: [{ shopName: "", image: "", url: "", note: 4.9, review: 1000 }],
    locations: [{ alt: -17878, lot: -9009 }],
    stockAmount: 2,
    isNew: true,
    isSale: true,
  },
];

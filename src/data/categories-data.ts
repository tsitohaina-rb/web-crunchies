export default [
  {
    id: 1,
    title: "Pet Food",
    slug: "pet-food",
    description:
      "A wide selection of nutritious and tasty food for dogs, cats, and other pets, tailored to every age and dietary need.",
    image: "/images/category-pet-food.png",
    icon: "🐶🍖",
    color: "bg-primary/10",
    keywords: ["pet food", "dog food", "cat food", "dry food", "wet food"],
    subcategories: [
      {
        id: 101,
        title: "Dog Food",
        slug: "dog-food",
        description: "Dry and wet dog food for all breeds and sizes.",
      },
      {
        id: 102,
        title: "Cat Food",
        slug: "cat-food",
        description: "Nutritious meals and treats for cats.",
      },
    ],
  },
  {
    id: 2,
    title: "Pet Grooming",
    slug: "pet-grooming",
    description:
      "Grooming tools and products to keep your pets clean and fresh—shampoos, brushes, nail clippers, and coat care.",
    image: "/images/category-pet-grooming.png",
    icon: "🛁🐾",
    color: "bg-yellow-50",
    keywords: ["pet grooming", "shampoo", "brush", "clippers", "coat care"],
    subcategories: [
      {
        id: 201,
        title: "Shampoos & Conditioners",
        slug: "shampoos-conditioners",
        description:
          "Gentle and effective grooming products for pets' skin and fur.",
      },
      {
        id: 202,
        title: "Cleaning Solutions",
        slug: "cleaning-solutions",
        description: "Specialized cleaning products for pet messes.",
      },
    ],
  },
  {
    id: 3,
    title: "Pet Apparel",
    slug: "pet-apparel",
    description: "Cozy and stylish clothing for your pets.",
    image: "/images/category-pet-apparel.png",
    icon: "👕🐕",
    color: "bg-blue-100",
    keywords: [
      "pet clothes",
      "dog apparel",
      "cat clothes",
      "pet accessories",
      "pet fashion",
    ],
    subcategories: [
      {
        id: 301,
        title: "Dog Apparel",
        slug: "dog-apparel",
        description: "Stylish and comfortable clothing for dogs.",
      },
      {
        id: 302,
        title: "Cat Apparel",
        slug: "cat-apparel",
        description: "Fashionable outfits for cats.",
      },
    ],
  },
  {
    id: 4,
    title: "Pet Healthcare",
    slug: "pet-healthcare",
    description: "Essential products for your pet's health and wellness.",
    image: "/images/category-pet-healthcare.png",
    icon: "🏥🐕",
    color: "bg-red-100",
    keywords: ["pet healthcare", "supplements", "medications", "first aid"],
    subcategories: [],
  },
];

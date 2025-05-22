import categories from "@/data/categories-data";

// export interface CurrencyType {
//   currency: "USD" | "EUR" | "GBP" | "CNY" | "JPY";
// }

interface getLinkType {
  nameCateg: string;
  nameSub: string;
  linkCateg: string;
  linkSub: string;
}

// Get currency symbol
export const getCurrencySymbol = (currency: string): string => {
  const symbols: Record<typeof currency, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    CNY: "¥",
    JPY: "¥",
  };

  return symbols[currency];
};

// get link with subcategories
export const getLinkWithSubcategoriesAndName = (slug: string): getLinkType => {
  const category = categories.find((item) =>
    item.subcategories.find((item) => item.slug === slug)
  );
  if (category) {
    return {
      nameCateg: category.title,
      nameSub:
        category.subcategories.find((item) => item.slug === slug)?.title || "",
      linkCateg: `/shop/${category.slug}`,
      linkSub: `/shop/${category.slug}?subcategory=${slug}`,
    };
  }
  return {
    nameCateg: "",
    nameSub: "",
    linkCateg: "",
    linkSub: "",
  };
};

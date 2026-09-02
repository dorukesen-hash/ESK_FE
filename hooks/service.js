// Single source of truth for a variant's per-unit price, quantity tier +
// per-customer pricing combined. The API attaches `pricingOverride` to
// variant responses (GET /variant/:id, POST /variant/id-list) whenever the
// request is authenticated - null for guests, who just get plain tier
// pricing. An override is a flat price regardless of quantity; otherwise a
// blanket discountPercent (if any) is applied on top of the normal tier
// price. Order matters here: >=10 must be checked before >=5, unlike the
// previous version of this function where `quantity > 4` caught 10+ orders
// first and silently billed them at the five_nine_units rate.
export const getUnitPrice = (item) => {
  const override = item.pricingOverride;
  if (override?.hasOverride && override.overridePrice != null) {
    return override.overridePrice;
  }

  let unitPrice;
  if (item.quantity >= 10) {
    unitPrice = item.ten_plus_units;
  } else if (item.quantity >= 5) {
    unitPrice = item.five_nine_units;
  } else {
    unitPrice = item.one_four_units;
  }

  const discountPercent = override?.discountPercent;
  if (discountPercent) {
    unitPrice = unitPrice * (1 - discountPercent / 100);
  }

  return unitPrice;
};

export const calculatePrice = (item) => {
  return getUnitPrice(item) * item.quantity;
};

export const slugify = (str) => {
  return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
};

export const prettify = (str) => {
  return str
      .replace(/[-_]/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
};

export const allVariantsInCategories = (categories) => {
  let allVariants = [];

  categories.forEach((category) => {
    if (category.variants && category.variants.length > 0) {
      allVariants = allVariants.concat(category.variants);
    }

    if (category.subcategories && category.subcategories.length > 0) {
      category.subcategories.forEach((subcategory) => {
        if (subcategory.variants && subcategory.variants.length > 0) {
          allVariants = allVariants.concat(subcategory.variants);
        }

        if (subcategory.products && subcategory.products.length > 0) {
          subcategory.products.forEach((product) => {
            if (product.variants && product.variants.length > 0) {
              allVariants = allVariants.concat(product.variants);
            }
          });
        }
      });
    }
  });

  return allVariants;
};

export const getVariantFromCategories = (categories, variant) => {
  const allVariants = allVariantsInCategories(categories);
  return allVariants.find((v) => slugify(v.title) === slugify(variant));
};

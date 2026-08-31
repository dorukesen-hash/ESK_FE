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

export const calculatePackageDetails = (cart) => {
  const pallet = { L: 48, W: 44, H_max: 84, deck_height: 0};
  const boxes = cart.map(item => ({
    qty: item.quantity,
    dims_in: {
      L: parseFloat(item.pack_length || '0'),
      W: parseFloat(item.pack_width || '0'),
      H: parseFloat(item.pack_height || '0'),
    },
    weight_lb: parseFloat(item.pack_weight || '0'),
    allowed_orientations: item.allowed_orientations || ["LxW", "WxL"],
    max_stack_count: item.max_stack_count || 6,
    fragile: item.fragile || false
  }));

  // Paletleme algoritması
  let pallets = [];
  let remainingQty = boxes.map(box => box.qty);

  function fillPallet() {
    let usedQty = boxes.map(_ => 0);
    let currentHeight = pallet.deck_height;
    let layers = [];
    let palletFull = false;

    while (!palletFull) {
      let placedThisRound = false;
      for (let i = 0; i < boxes.length; i++) {
        if (remainingQty[i] === 0) continue;

        const box = boxes[i];
        const { L, W, H } = box.dims_in;
        if (H === 0) continue;

        let bestLayer = { perLayer: 0, nx: 0, ny: 0, orient: null, L, W };
        for (const orient of box.allowed_orientations) {
          let l = L, w = W;
          if (orient === "WxL") {
            l = W;
            w = L;
          }
          if (l === 0 || w === 0) continue;
          const nx = Math.floor(pallet.L / l);
          const ny = Math.floor(pallet.W / w);
          const perLayer = nx * ny;
          if (perLayer > bestLayer.perLayer) {
            bestLayer = { perLayer, nx, ny, orient, L: l, W: w };
          }
        }

        if (bestLayer.perLayer > 0 && currentHeight + H <= pallet.H_max) {
          const qtyToPlace = Math.min(bestLayer.perLayer, remainingQty[i]);

          // Kat yerleşimi: kat ayak izini küçültmek için (cols, rows) seçimi
          const nx = Math.max(bestLayer.nx, 1);
          const ny = Math.max(bestLayer.ny, 1);
          let bestCols = 1, bestRows = Math.min(qtyToPlace, ny);
          let bestMaxSpan = Infinity;
          let bestArea = Infinity;
          for (let c = 1; c <= Math.min(nx, qtyToPlace); c++) {
            const r = Math.ceil(qtyToPlace / c);
            if (r > ny) continue;
            const lengthSpan = c * bestLayer.L;
            const widthSpan = r * bestLayer.W;
            const maxSpan = Math.max(lengthSpan, widthSpan);
            const area = c * r;
            if (
              maxSpan < bestMaxSpan ||
              (maxSpan === bestMaxSpan && area < bestArea)
            ) {
              bestMaxSpan = maxSpan;
              bestArea = area;
              bestCols = c;
              bestRows = r;
            }
          }
          const usedCols = bestCols;
          const usedRows = bestRows;
          const lengthUsed = usedCols * bestLayer.L;
          const widthUsed = usedRows * bestLayer.W;

          layers.push({
            qty: qtyToPlace,
            dims: { L: bestLayer.L, W: bestLayer.W, H },
            orient: bestLayer.orient,
            nx: bestLayer.nx,
            ny: bestLayer.ny,
            usedCols,
            usedRows,
            lengthUsed,
            widthUsed,
            z_start: currentHeight,
            z_height: H
          });
          usedQty[i] += qtyToPlace;
          remainingQty[i] -= qtyToPlace;
          currentHeight += H;
          placedThisRound = true;
        }
      }
      if (!placedThisRound) {
        palletFull = true;
      }
    }

    // Palet ölçüleri ve ağırlık
    let totalWeight = 0;
    let totalVolume = 0;
    for (let i = 0; i < boxes.length; i++) {
      totalWeight += boxes[i].weight_lb * usedQty[i];
      const { L, W, H } = boxes[i].dims_in;
      totalVolume += (L * W * H) * usedQty[i];
    }
    const palletContentHeight = currentHeight - pallet.deck_height;
    const totalDeci = (pallet.L * pallet.W * palletContentHeight) / 3000;
    // Katların ayak izlerinden nihai L ve W: katlar üst üste geldiği için max alınır
    const palletLength = layers.length ? Math.max(...layers.map(l => l.lengthUsed)) : 0;
    const palletWidth = layers.length ? Math.max(...layers.map(l => l.widthUsed)) : 0;

    return {
      weight: totalWeight,
      length: palletLength,
      width: palletWidth,
      height: currentHeight,
      totalDeci: totalDeci,
      layers
    };
  }

  while (remainingQty.some(qty => qty > 0)) {
    pallets.push(fillPallet());
  }

  return pallets;
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

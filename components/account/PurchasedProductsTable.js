'use client';

import React, { useMemo, useState, useContext } from 'react';
import Link from 'next/link';
import { AppContext } from '@/Context/AppContext';
import { getVariantFromCategories, slugify } from '@/hooks/service';

// Helpers
const formatDate = (d) => {
  try {
    const date = typeof d === 'string' || typeof d === 'number' ? new Date(d) : d;
    if (isNaN(date?.getTime?.())) return '-';
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
  } catch {
    return '-';
  }
};

const formatMoney = (n, c = 'USD') => {
  const val = typeof n === 'number' ? n : Number(n ?? 0);
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: c }).format(val);
  } catch (_) {
    return `${c} ${val.toFixed(2)}`;
  }
};

function TableSkeleton({ rows = 8 }) {
  const cols = ['SKU','Description','Category','Order#','Order Placed','Qty','Price','Total','Select'];
  return (
    <div className="overflow-x-auto border border-border-gray rounded-lg">
      <table className="min-w-[1080px] w-full border-collapse">
        <thead>
          <tr className="bg-custom-table-head/60">
            {cols.map((h) => (
              <th key={h} className="text-[#182434] font-semibold text-[14px] p-2 text-center">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className="odd:bg-white even:bg-custom-table-soft-blue/40">
              {cols.map((__, j) => (
                <td key={j} className="p-2 text-center">
                  <div className="h-4 w-full max-w-[160px] bg-gray-200 rounded animate-pulse" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// SKU -> Kategori etiketi
const makeGetCategoryLabelBySku = (categories) => (sku) => {
  try {
    if (!sku || !Array.isArray(categories) || categories.length === 0) return null;
    const norm = String(sku).trim().toLowerCase();
    for (const cat of categories) {
      const catName = cat?.name || cat?.title;
      const subs = Array.isArray(cat?.subcategories) ? cat.subcategories : [];
      const catProducts = Array.isArray(cat?.products) ? cat.products : [];
      // Kategori altındaki ürünler
      for (const p of catProducts) {
        const variants = Array.isArray(p?.variants) ? p.variants : [];
        const pSku = (p?.sku || p?.SKU || p?.code || '').toString().trim().toLowerCase();
        if (pSku && pSku === norm) {
          return catName || null;
        }
        for (const v of variants) {
          const vSku = (v?.sku || v?.SKU || v?.code || '').toString().trim().toLowerCase();
          if (vSku && vSku === norm) {
            return catName || null;
          }
        }
      }
      // Alt kategoriler ve ürünleri
      for (const sub of subs) {
        const subName = sub?.name || sub?.title;
        const products = Array.isArray(sub?.products) ? sub.products : [];
        for (const p of products) {
          const variants = Array.isArray(p?.variants) ? p.variants : [];
          const pSku = (p?.sku || p?.SKU || p?.code || '').toString().trim().toLowerCase();
          if (pSku && pSku === norm) {
            return subName ? `${catName}, ${subName}` : (catName || null);
          }
          for (const v of variants) {
            const vSku = (v?.sku || v?.SKU || v?.code || '').toString().trim().toLowerCase();
            if (vSku && vSku === norm) {
              return subName ? `${catName}, ${subName}` : (catName || null);
            }
          }
        }
      }
    }
    return null;
  } catch (_) {
    return null;
  }
};

// Title tabanlı fallback rota üretici
const buildHrefForTitle = (categories, title) => {
  try {
    if (!title || !Array.isArray(categories) || categories.length === 0) return '/products';
    const variant = getVariantFromCategories(categories, title);
    if (!variant) return '/products';

    const category = categories.find((c) => c.id === variant.categoryId);
    const subcategory = category?.subcategories?.find((s) => s.id === variant.subcategoryId);
    const product = variant.productId ? subcategory?.products?.find((p) => p.id === variant.productId) : null;

    const categorySlug = category ? slugify(category.name) : 'category';
    const subcategorySlug = subcategory ? slugify(subcategory.name) : 'subcategory';
    const productSlug = product ? slugify(product.title) : null;
    const variantSlug = slugify(variant.title);

    return `/products/${categorySlug}/${subcategorySlug}` + (productSlug ? `/${productSlug}` : '') + `/${variantSlug}`;
  } catch (_) {
    return '/products';
  }
};

// SKU tabanlı rota üretici (fallback: title)
const buildHrefForSku = (categories, sku, fallbackTitle) => {
  try {
    if (!sku || !Array.isArray(categories) || categories.length === 0) return buildHrefForTitle(categories, fallbackTitle);
    const norm = String(sku).trim().toLowerCase();
    for (const cat of categories) {
      const subs = Array.isArray(cat?.subcategories) ? cat.subcategories : [];
      const catProducts = Array.isArray(cat?.products) ? cat.products : [];
      // Kategori seviyesinde
      for (const p of catProducts) {
        const variants = Array.isArray(p?.variants) ? p.variants : [];
        const pSku = (p?.sku || p?.SKU || p?.code || '').toString().trim().toLowerCase();
        if (pSku && pSku === norm) {
          const categorySlug = slugify(cat?.name || cat?.title || 'category');
          const productSlug = slugify(p?.title || p?.name || 'product');
          return `/products/${categorySlug}/${productSlug}`;
        }
        for (const v of variants) {
          const vSku = (v?.sku || v?.SKU || v?.code || '').toString().trim().toLowerCase();
          if (vSku && vSku === norm) {
            const categorySlug = slugify(cat?.name || cat?.title || 'category');
            const productSlug = slugify(p?.title || p?.name || 'product');
            const variantSlug = slugify(v?.title || v?.name || 'variant');
            return `/products/${categorySlug}/${productSlug}/${variantSlug}`;
          }
        }
      }
      // Alt kategoriler
      for (const sub of subs) {
        const products = Array.isArray(sub?.products) ? sub.products : [];
        for (const p of products) {
          const variants = Array.isArray(p?.variants) ? p.variants : [];
          const pSku = (p?.sku || p?.SKU || p?.code || '').toString().trim().toLowerCase();
          if (pSku && pSku === norm) {
            const categorySlug = slugify(cat?.name || cat?.title || 'category');
            const subcategorySlug = slugify(sub?.name || sub?.title || 'subcategory');
            const productSlug = slugify(p?.title || p?.name || 'product');
            return `/products/${categorySlug}/${subcategorySlug}/${productSlug}`;
          }
          for (const v of variants) {
            const vSku = (v?.sku || v?.SKU || v?.code || '').toString().trim().toLowerCase();
            if (vSku && vSku === norm) {
              const categorySlug = slugify(cat?.name || cat?.title || 'category');
              const subcategorySlug = slugify(sub?.name || sub?.title || 'subcategory');
              const productSlug = slugify(p?.title || p?.name || 'product');
              const variantSlug = slugify(v?.title || v?.name || 'variant');
              return `/products/${categorySlug}/${subcategorySlug}/${productSlug}/${variantSlug}`;
            }
          }
        }
      }
    }
    return buildHrefForTitle(categories, fallbackTitle);
  } catch (_) {
    return buildHrefForTitle(categories, fallbackTitle);
  }
};

export default function PurchasedProductsTable({ data = [], loading = false }) {
  const { state } = useContext(AppContext);
  const categories = useMemo(() => state?.categories ?? [], [state?.categories]);
  const getCategoryLabelBySku = useMemo(() => makeGetCategoryLabelBySku(categories), [categories]);

  const [selected, setSelected] = useState(() => new Set());
  const toggle = (key) => setSelected((prev) => { const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n; });

  const rows = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data.map((r) => {
      const qty = Number(r.qty ?? r.quantity ?? 0) || 0;
      const ext = Number(r.extPrice ?? r.total ?? 0) || 0;
      const unit = r.price ?? r.unitPrice ?? (qty > 0 ? (ext / qty) : 0);

      // Varyantı title/description ile bul
      const baseTitle = r.title || r.description || '';
      const variant = baseTitle ? getVariantFromCategories(categories, baseTitle) : null;

      // Varyanttan kategori etiketi üret
      let categoryFromVariant = null;
      if (variant) {
        const cat = Array.isArray(categories) ? categories.find((c) => c.id === variant.categoryId) : null;
        const sub = cat?.subcategories?.find?.((s) => s.id === variant.subcategoryId);
        const catName = cat?.name || cat?.title || null;
        const subName = sub?.name || sub?.title || null;
        categoryFromVariant = subName ? `${catName}, ${subName}` : (catName || null);
      }

      // SKU'dan kategori etiketi (yedek)
      const categoryFromSku = getCategoryLabelBySku(r.sku) ?? null;

      // Nihai etiket ve description
      const finalCategory = categoryFromVariant ?? categoryFromSku ?? '-';
      const finalDescription = variant?.title || baseTitle || '-';

      return {
        sku: r.sku || '-',
        description: finalDescription,
        category: finalCategory,
        orderNo: r.orderNo || r.order_number || r.number || '-',
        orderPlaced: r.date || r.orderDate || r.createdAt || null,
        qty,
        price: Number(unit) || 0,
        total: ext,
        currency: r.currency || 'USD',
        key: `${r.orderNo || r.number || 'ord'}|${r.sku || 'sku'}|${r.date || 'date'}`,
      };
    });
  }, [data, categories, getCategoryLabelBySku]);

  if (loading) return <TableSkeleton />;

  if (!rows.length) {
    return (
      <div className="w-full border rounded-lg border-border-gray p-6 text-center text-text-light">
        No records found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto text-text-dark">
      <table className="min-w-[1080px] w-full border-collapse text-[14px]">
        <thead className="h-[74px] bg-blue-100 text-[16px] font-semibold text-left">
          <tr className="bg-custom-table-head">
            <th className="p-2 text-center border-x-[2px] border-white">SKU</th>
            <th className="p-2 text-center border-x-[2px] border-white">Description</th>
            <th className="p-2 text-center border-x-[2px] border-white">Category</th>
            <th className="p-2 text-center border-x-[2px] border-white">Order#</th>
            <th className="p-2 text-center border-x-[2px] border-white">Order Placed</th>
            <th className="p-2 text-center border-x-[2px] border-white">Qty</th>
            <th className="p-2 text-center border-x-[2px] border-white">Price</th>
            <th className="p-2 text-center border-x-[2px] border-white">Total</th>
            <th className="p-2 text-center border-x-[2px] border-white">Select</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const href = buildHrefForSku(categories, r.sku, r.description);
            return (
            <tr key={r.key} className="border-b border-border-gray h-[48px]">
              <td className="p-2 text-center">
                <Link href={href} className="text-custom-blue hover:underline">{r.sku}</Link>
              </td>
              <td className="p-2 text-left">{r.description}</td>
              <td className="p-2 text-center">{r.category}</td>
              <td className="p-2 text-center">
                {r.orderNo && r.orderNo !== '-' ? (
                  <Link href={`/auth/my-account/track-orders/${encodeURIComponent(r.orderNo)}`} className="text-custom-blue hover:underline">
                    {r.orderNo}
                  </Link>
                ) : '-'}
              </td>
              <td className="p-2 text-center">{formatDate(r.orderPlaced)}</td>
              <td className="p-2 text-center">{r.qty}</td>
              <td className="p-2 text-center">{formatMoney(r.price, r.currency)}</td>
              <td className="p-2 text-center">{formatMoney(r.total, r.currency)}</td>
              <td className="p-2 text-center">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={selected.has(r.key)}
                  onChange={() => toggle(r.key)}
                />
              </td>
            </tr>
          )})}
        </tbody>
      </table>
    </div>
  );
}

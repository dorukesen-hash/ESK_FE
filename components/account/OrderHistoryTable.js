'use client';

import React, { useMemo, useState, useContext, useCallback } from 'react';
import Link from "next/link";
import { AppContext } from "@/Context/AppContext";
import {getVariantFromCategories, slugify} from "@/hooks/service";

// Icons (inline SVG)
const SortIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1 inline-block align-middle">
    <path d="M7 10l5-5 5 5" stroke="#182434" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 14l5 5 5-5" stroke="#182434" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Basit yükleme iskeleti (yeni kolon düzeni)
function TableSkeleton({ rows = 8 }) {
  const cols = ['Date','Order#','Category','SKU','Description','Qty','Ext. Price','Select'];
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

// Para ve tarih format yardımcıları
const formatMoney = (n, c = 'USD') => {
  const val = typeof n === 'number' ? n : Number(n ?? 0);
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: c }).format(val);
  } catch (_) {
    return `${val.toFixed(2)} ${c}`;
  }
};
const formatDate = (d) => {
  try {
    const date = typeof d === 'string' || typeof d === 'number' ? new Date(d) : d;
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
  } catch {
    return d?.toString?.() ?? '-';
  }
};

// Saf yardımcı: Başlıktan varyant yolunu hesapla (nested category/subcategory/product/variant)
function computeHrefForTitle(categories, title) {
  try {
    if (!title || !Array.isArray(categories) || categories.length === 0) {
      return '/products';
    }
    const variant = getVariantFromCategories(categories, title);
    if (!variant) {
      // Varyant bulunamazsa ürün listesine yönlendir
      return '/products';
    }

    // Hiyerarşi: category > subcategory > (optional) product > variant
    const category = categories.find((c) => c.id === variant.categoryId);
    const subcategory = category?.subcategories?.find((s) => s.id === variant.subcategoryId);
    const product = variant.productId
      ? subcategory?.products?.find((p) => p.id === variant.productId)
      : null;

    const categorySlug = category ? slugify(category.name) : 'category';
    const subcategorySlug = subcategory ? slugify(subcategory.name) : 'subcategory';
    const productSlug = product ? slugify(product.title) : null;
    const variantSlug = slugify(variant.title);

    return `/products/${categorySlug}/${subcategorySlug}` +
      (productSlug ? `/${productSlug}` : '') +
      `/${variantSlug}`;

  } catch (_) {
    return '/products';
  }
}

export default function OrderHistoryTable({ orders, loading = false, onSearch, onExport: _onExport, onSaveToList: _onSaveToList, onAddToCart: _onAddToCart }) {
  const sample = useMemo(() => ([
    {
      date: '2025-03-05', orderNo: '3869534', category: 'Cord Strapping, Composite', sku: 'CB8-P6.0',
      title: '1" Wire Buckle for Cord Strapping, Phosphated, 0.240 ga, Pack of 400', qty: 60, extPrice: 304.80, currency: 'USD'
    },
    {
      date: '2025-01-15', orderNo: '3869534', category: 'Cord Strapping, Composite', sku: 'COLASH 105S',
      title: '1-1/4" x 820\' Lashing, 820 ft, 5100 lbf', qty: 60, extPrice: 304.80, currency: 'USD'
    },
    {
      date: '2024-11-15', orderNo: '3869534', category: 'Cord Strapping, Composite', sku: 'EB20020012072W',
      title: 'Cardboard Edge Protector 2 X 2 X 72" 0.120 White ', qty: 60, extPrice: 304.80, currency: 'USD'
    },
  ]), []);

  const data = Array.isArray(orders) && orders.length ? orders : sample;

  const [keyword, setKeyword] = useState('');
  const [selected, setSelected] = useState(() => new Set()); // key set
  const [sortDir, setSortDir] = useState('desc'); // 'asc' | 'desc'

  const { state } = useContext(AppContext);
  const categories = useMemo(() => state?.categories ?? [], [state?.categories]);

  const rowKey = (o) => `${o.orderNo}|${o.sku}|${o.date}`;

  const sortedData = useMemo(() => {
    const copy = [...data];
    copy.sort((a, b) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      return sortDir === 'asc' ? da - db : db - da;
    });
    return copy;
  }, [data, sortDir]);

  const toggleSelect = (key) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  // SKU tabanlı arama: kategori etiketini üret
  const getCategoryLabelBySku = useCallback((sku) => {
    try {
      if (!sku || !Array.isArray(categories) || categories.length === 0) return null;
      const norm = String(sku).trim().toLowerCase();
      for (const cat of categories) {
        const catName = cat?.name || cat?.title;
        const subs = Array.isArray(cat?.subcategories) ? cat.subcategories : [];
        // Bazı yapılarda ürünler doğrudan kategori altında olabilir
        const catProducts = Array.isArray(cat?.products) ? cat.products : [];
        // Önce kategori seviyesindeki ürünleri tara
        for (const p of catProducts) {
          const variants = Array.isArray(p?.variants) ? p.variants : [];
          // Ürün SKU kontrolü (varsa)
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
        // Alt kategori ve içindeki ürün/variantları tara
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
  }, [categories]);

  // SKU'dan varyant yolunu bul (yeni) – bulunamazsa title tabanlı yönteme düşeriz
  const buildHrefForSku = useCallback((sku, fallbackTitle) => {
    try {
      if (!sku || !Array.isArray(categories) || categories.length === 0) return computeHrefForTitle(categories, fallbackTitle);
      const norm = String(sku).trim().toLowerCase();
      for (const cat of categories) {
        const subs = Array.isArray(cat?.subcategories) ? cat.subcategories : [];
        const catProducts = Array.isArray(cat?.products) ? cat.products : [];

        // Kategori seviyesinde ürünler
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
      return computeHrefForTitle(categories, fallbackTitle);
    } catch (_) {
      return computeHrefForTitle(categories, fallbackTitle);
    }
  }, [categories]);

  // SKU'dan kategori ve alt kategori nesnelerini bul (link üretimi için)
  const findCategoryAndSubBySku = useCallback((sku) => {
    try {
      if (!sku || !Array.isArray(categories) || categories.length === 0) return null;
      const norm = String(sku).trim().toLowerCase();
      for (const cat of categories) {
        const subs = Array.isArray(cat?.subcategories) ? cat.subcategories : [];
        const catProducts = Array.isArray(cat?.products) ? cat.products : [];

        // Kategori seviyesinde ürünler
        for (const p of catProducts) {
          const variants = Array.isArray(p?.variants) ? p.variants : [];
          const pSku = (p?.sku || p?.SKU || p?.code || '').toString().trim().toLowerCase();
          if (pSku && pSku === norm) {
            return { cat, sub: null };
          }
          for (const v of variants) {
            const vSku = (v?.sku || v?.SKU || v?.code || '').toString().trim().toLowerCase();
            if (vSku && vSku === norm) {
              return { cat, sub: null };
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
              return { cat, sub };
            }
            for (const v of variants) {
              const vSku = (v?.sku || v?.SKU || v?.code || '').toString().trim().toLowerCase();
              if (vSku && vSku === norm) {
                return { cat, sub };
              }
            }
          }
        }
      }
      return null;
    } catch (_) {
      return null;
    }
  }, [categories]);

  if (loading) return <TableSkeleton />;

  if (!data || data.length === 0) {
    return (
      <div className="w-full border rounded-lg border-border-gray p-6 text-center text-text-light">
        No orders found.
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Search + actions */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 flex-1 max-w-[500px]">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Keyword"
            className="flex-1 h-[40px] text-text-light px-3 border border-border-gray rounded-md outline-none focus:border-custom-blue"
          />
          <button
            type="button"
            onClick={() => onSearch?.(keyword)}
            className="h-[40px] px-4 rounded-md bg-custom-blue text-white text-sm font-medium cursor-pointer"
          >
            Search
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto text-text-dark">
        <table className="min-w-[1080px] w-full border-collapse text-[14px]">
          <thead className="h-[74px] bg-blue-100 text-[16px] font-semibold text-left">
            <tr className="bg-custom-table-head">
              <th className="p-2 text-center border-x-[2px] border-white">
                <button type="button" className="inline-flex items-center cursor-pointer" onClick={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}>
                  Date <SortIcon />
                </button>
              </th>
              <th className="p-2 text-center border-x-[2px] border-white">Order#</th>
              <th className="p-2 text-center border-x-[2px] border-white">Category</th>
              <th className="p-2 text-center border-x-[2px] border-white">SKU</th>
              <th className="p-2 text-center border-x-[2px] border-white">Title</th>
              <th className="p-2 text-center border-x-[2px] border-white">Qty</th>
              <th className="p-2 text-center border-x-[2px] border-white">Ext. Price</th>
              <th className="p-2 text-center border-x-[2px] border-white">Select</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((o) => {
              const key = rowKey(o);

              // Varyantı title/description ile çöz
              const baseTitle = o.title || o.description || '';
              const variant = baseTitle ? getVariantFromCategories(categories, baseTitle) : null;

              // Link üretimi için kategori ve alt kategori nesneleri
              let cat = null; let sub = null;
              if (variant) {
                cat = Array.isArray(categories) ? categories.find((c) => c.id === variant.categoryId) : null;
                sub = cat?.subcategories?.find?.((s) => s.id === variant.subcategoryId) ?? null;
              } else if (o.sku) {
                const found = findCategoryAndSubBySku(o.sku);
                if (found) { cat = found.cat; sub = found.sub; }
              }

              const catName = cat?.name || cat?.title || null;
              const subName = sub?.name || sub?.title || null;
              const catSlug = catName ? slugify(catName) : null;
              const subSlug = subName ? slugify(subName) : null;

              // Etiket fallback (link bulunamazsa)
              const labelFallback = (!catSlug && !subSlug) ? (getCategoryLabelBySku(o.sku) ?? null) : null;

              const finalTitle = variant?.title || baseTitle || '-';

              const href = buildHrefForSku(o.sku, finalTitle);
              return (
                  <tr key={key} className="border-b border-border-gray h-[48px]">
                  <td className="p-2 text-center">{formatDate(o.date)}</td>
                  <td className="p-2 text-center">
                    {o.orderNo ? (
                      <Link href={`/auth/my-account/track-orders/${encodeURIComponent(o.orderNo)}`} className="text-custom-blue hover:underline">
                        {o.orderNo}
                      </Link>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="p-2 text-center">
                    {catSlug ? (
                      <>
                        <Link href={`/products/${catSlug}`} className="text-custom-blue hover:underline">{catName}</Link>
                        {subSlug ? (
                          <>
                            {' , '}
                            <Link href={`/products/${catSlug}/${subSlug}`} className="text-custom-blue hover:underline">{subName}</Link>
                          </>
                        ) : null}
                      </>
                    ) : (
                      labelFallback ?? '-'
                    )}
                  </td>
                  <td className="p-2 text-center">
                    {/* link to this variant */}
                    <Link href={href} className="text-custom-blue hover:underline">{o.sku}</Link>
                  </td>
                  <td className="p-2 text-left">
                    {finalTitle}
                  </td>
                  <td className="p-2 text-center">{o.qty}</td>
                  <td className="p-2 text-center">{formatMoney(o.extPrice, o.currency || 'USD')}</td>
                  <td className="p-2 text-center">
                    <input type="checkbox" className="w-4 h-4" checked={selected.has(key)} onChange={() => toggleSelect(key)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

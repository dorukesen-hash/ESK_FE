"use client"

import React, {useCallback, useEffect, useMemo, useState, useContext} from "react";
import BreadCrumbs from "@/components/pageLayouts/BreadCrumbs";
import { getOrders } from "@/hooks/Api";
import {AppContext} from "@/Context/AppContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Basit yükleme iskeleti
function TableSkeleton({ rows = 8 }) {
  const cols = ['Order#','Ship-To','Invoice#','Order Date','Ship Date','Ship Via','Status','Track'];
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

// Yardımcılar
const formatDate = (d) => {
  if (!d) return '-';
  try {
    const date = typeof d === 'string' || typeof d === 'number' ? new Date(d) : d;
    if (isNaN(date.getTime())) return '-';
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
  } catch {
    return '-';
  }
};

const buildShipTo = (ord) => {
  const s = ord?.shipment || {};
  const name = s.name || ord?.name || ord?.billing?.name || ord?.customer?.name || '';
  const first = s.firstline || ord?.firstline || '';
  const second = s.secondline || ord?.secondline || '';
  const city = s.city || ord?.city || '';
  const state = s.state || ord?.state || '';
  const zip = s.zip || ord?.zip || '';
  const parts = [];
  if (name) parts.push(name);
  const line1 = [first, second].filter(Boolean).join(' ');
  if (line1) parts.push(line1);
  const line2 = [city, state, zip].filter(Boolean).join(', ').replace(', ,', ',');
  if (line2) parts.push(line2);
  return parts.length ? parts.join(' | ') : '-';
};

const guessShipVia = (ord) => {
  return ord?.shipment?.carrier?.name || '-';
};

const extractShipStatus = (ord) => {
  return ord?.shipment?.shipmentstatus?.name || null;
};

const extractTracking = (ord) => {
  return ord?.shipment?.tracking || ord?.trackingNumber || ord?.tracking || null;
};

// API yanıtını sipariş bazlı satırlara dönüştür
function normalizeTrackOrders(payload) {
  const list = Array.isArray(payload)
    ? payload
    : (Array.isArray(payload?.orders) ? payload.orders : []);

  return list.map((ord) => {
    const orderNo = ord.orderNumber || ord.orderNo || ord.order_number || ord.number || ord.id || '-';
    const shipTo = buildShipTo(ord);
    const invoiceNo = ord.invoiceNumber || ord.invoice?.number || ord.invoiceId || '-';
    const orderDate = ord.createdAt || ord.orderDate || ord.ordertime || ord.created_at || null;
    const shipDate = ord.shipment_date || ord.date_of_closure || ord.updatedAt || null;
    const shipVia = guessShipVia(ord);
    const status = ord.orderstatus?.name || ord.status || ord.closure || '-';
    const shipStatus = extractShipStatus(ord);
    const tracking = extractTracking(ord);

    return {
      orderNo,
      shipTo,
      invoiceNo: invoiceNo ?? '-',
      orderDate,
      shipDate,
      shipVia,
      status,
      shipStatus,
      tracking,
    };
  });
}

export default function Page() {
  const { state } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    if (!state?.user) {
      router.push('/auth/login');
    }
  }, [state?.user, router]);

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const payload = await getOrders(params);
      const normalized = normalizeTrackOrders(payload);
      setRows(normalized);
    } catch (err) {
      console.error('Failed to fetch orders', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const content = useMemo(() => {
    if (loading) return <TableSkeleton />;
    if (error) {
      return (
        <div className="mb-3 p-3 rounded-md border border-red-300 text-red-700 bg-red-50">
          Siparişler yüklenirken bir hata oluştu. Lütfen tekrar deneyin.
        </div>
      );
    }
    if (!rows || rows.length === 0) {
      return (
        <div className="w-full border rounded-lg border-border-gray p-6 text-center text-text-light">
          No orders found.
        </div>
      );
    }

    return (
      <div className="overflow-x-auto text-text-dark">
        <table className="min-w-[1080px] w-full border-collapse text-[14px]">
          <thead className="h-[74px] bg-blue-100 text-[16px] font-semibold text-left">
            <tr className="bg-custom-table-head">
              <th className="p-2 text-center border-x-[2px] border-white">Order#</th>
              <th className="p-2 text-center border-x-[2px] border-white">Ship-To</th>
              <th className="p-2 text-center border-x-[2px] border-white">Invoice#</th>
              <th className="p-2 text-center border-x-[2px] border-white">Order Date</th>
              <th className="p-2 text-center border-x-[2px] border-white">Ship Date</th>
              <th className="p-2 text-center border-x-[2px] border-white">Ship Via</th>
              <th className="p-2 text-center border-x-[2px] border-white">Status</th>
              <th className="p-2 text-center border-x-[2px] border-white">Track</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={`${r.orderNo}-${idx}`} className="border-b border-border-gray h-[48px]">
                <td className="p-2 text-center">
                  {r.orderNo ? (
                    <Link href={`/auth/my-account/track-orders/${encodeURIComponent(r.orderNo)}`} className="text-custom-blue hover:underline">
                      {r.orderNo}
                    </Link>
                  ) : (
                    '-'
                  )}
                </td>
                <td className="p-2 text-center">
                  {r.shipTo ? (
                    <span>
                      {String(r.shipTo)
                        .split(' | ')
                        .map((ln, i) => (
                          <div key={`shipto-cell-${idx}-${i}`}>{ln}</div>
                        ))}
                    </span>
                  ) : (
                    '-'
                  )}
                </td>
                <td className="p-2 text-center">
                  {r.invoiceNo || '-'}
                </td>
                <td className="p-2 text-center">{formatDate(r.orderDate)}</td>
                <td className="p-2 text-center">{formatDate(r.shipDate)}</td>
                <td className="p-2 text-center">{r.shipVia || '-'}</td>
                <td className="p-2 text-center">
                  <div>{r.status || '-'}</div>
                  {r.shipStatus && <div className="text-text-light text-[12px]">{r.shipStatus}</div>}
                </td>
                <td className="p-2 text-center">
                  {r.tracking ? (
                    <a
                      href={`https://parcelsapp.com/en/tracking/${encodeURIComponent(r.tracking)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center h-8 px-3 rounded-md bg-custom-blue text-white text-sm cursor-pointer hover:opacity-90"
                    >
                      Track
                    </a>
                  ) : (
                    <span className="text-text-light">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }, [rows, loading, error]);

  return (
    <div className="w-full h-full bg-white p-1 flex flex-col items-center">
      <div className="w-full max-w-[1440px]">
        <BreadCrumbs hideSegments={['auth']} />
        <div className="w-full">
          <h1 className="text-[28px] tablet:text-[32px] font-bold text-text-dark mb-4">Track Orders</h1>
          {content}
        </div>
      </div>
    </div>
  );
}

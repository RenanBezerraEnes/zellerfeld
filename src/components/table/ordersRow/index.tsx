import React from 'react';
import type { Order } from '../../../orders/types';

interface OrderRowProps {
  order: Order;
  expanded: boolean;
  onToggle: () => void;
}

export const OrderRow = React.memo(({ order, expanded, onToggle }: OrderRowProps) => {
  return (
    <>
      <tr
        className="hover:bg-gray-50 transition cursor-pointer border-b border-gray-300"
        onClick={onToggle}
      >
        <td className="px-2 py-2 font-semibold w-12">
          <div className="flex items-center gap-2">
            <span>{order.oid}</span>
            <span className="font-semibold">{expanded ? '▾' : '▸'}</span>
          </div>
        </td>
        <td className="px-4 py-2 w-80">
          <div className="flex items-start gap-2">
            <span className="bg-gray-100/80 rounded px-2 py-1 mb-1 py-1 text-xs font-semibold whitespace-nowrap min-w-[80px] text-center flex-shrink-0">
              {order.statusLeft.split(' ').map((word, idx) => (
                <span key={idx} className="block">
                  {word}
                </span>
              ))}
            </span>
            <span className="flex flex-col text-sm">
              <span className="bg-gray-100/80 rounded px-2 py-1 mb-1 inline-block">
                {order.statusLeft} <span className="font-bold">L</span>
              </span>
              <span className="bg-gray-100/80 rounded px-2 py-1 inline-block">
                {order.statusRight} <span className="font-bold">R</span>
              </span>
            </span>
          </div>
        </td>
        <td className="px-4 py-2 font-bold">
          <span className="bg-gray-100/80 rounded px-2 py-1 inline-block w-full text-center">
            {order.type}
          </span>
        </td>
        <td className="px-4 py-2">
          <span className="bg-gray-100/80 rounded px-2 py-1 inline-block w-full text-center">
            {order.lock}
          </span>
        </td>
        <td className="px-4 py-2">
          <span className="bg-gray-100/80 rounded px-2 py-1 inline-block w-full text-center">
            {order.customer}
          </span>
        </td>
        <td className="px-4 py-2 text-center font-bold">
          <span className="bg-gray-100/80 rounded px-2 py-1 inline-block w-full text-center">
            {order.daysSinceOrder}
          </span>
        </td>
        <td className="px-4 py-2">
          <span className="bg-gray-100/80 rounded px-2 py-1 inline-block w-full text-center">
            {order.model}
          </span>
        </td>
        <td className="px-4 py-2">
          <span className="bg-gray-100/80 rounded px-2 py-1 inline-block w-full text-center">
            {order.designer}
          </span>
        </td>
      </tr>
      {expanded && (
        <tr className="border-b border-gray-300">
          <td colSpan={8} className="px-4 py-2 bg-gray-50">
            <div className="p-4">
              I realised that there was an arrow to open it, however our data don't have nothing,
              that's I leave this message here. I'm looking forward to talk to you!
            </div>
          </td>
        </tr>
      )}
    </>
  );
});

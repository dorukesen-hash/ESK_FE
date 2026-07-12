import { useState } from "react";

export default function Accordion({ items }) {
  const [open, setOpen] = useState(Array(items.length).fill(false));

  const toggle = idx => {
    setOpen(prev => {
      const updated = [...prev];
      updated[idx] = !updated[idx];
      return updated;
    });
  };

  return (
    <ul className="list-none pl-0 text-justify mb-2">
      {items.map((item, idx) => (
        <li key={idx} className="mb-4 border-b-1 border-text-dark">
          <button
            type="button"
            className="w-full text-left px-4 py-3 font-semibold flex items-center "
            onClick={() => toggle(idx)}
          >
            <span className={`mr-2 transition-transform duration-200 ${open[idx] ? 'rotate-90' : ''}`}>▶</span>
            <span className="">{item.q}</span>
          </button>
          {open[idx] && (
            <div className="px-4 py-3 text-text-dark text-justify">
              {item.a}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

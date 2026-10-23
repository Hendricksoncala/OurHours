import { useState } from 'react';
import Icon from './Icons';
export default function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="accordion">
      {items.map((item, i) => (
        <section key={item.q} className="accordion-item">
          <button onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{item.q}</span>
            <b>{open === i ? '−' : '+'}</b>
          </button>
          {open === i && <p>{item.a}</p>}
        </section>
      ))}
    </div>
  );
}

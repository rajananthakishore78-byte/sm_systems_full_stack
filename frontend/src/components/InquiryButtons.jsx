import React from "react";
import { useBusiness } from "../context/BusinessContext.jsx";

export default function InquiryButtons({ productName }) {
  const { business } = useBusiness();

  const message = encodeURIComponent(
    `Hi, I'm interested in "${productName}". Could you share more details and availability?`
  );

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {business.whatsapp && (
        <a
          href={`https://wa.me/${business.whatsapp}?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-signal text-night-950 font-semibold px-5 py-3 hover:bg-signal-light transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.06a8.14 8.14 0 01-4.15-1.14l-.3-.18-3.11.82.83-3.03-.19-.31a8.15 8.15 0 01-1.25-4.31c0-4.5 3.66-8.16 8.17-8.16 2.18 0 4.23.85 5.77 2.39a8.1 8.1 0 012.39 5.78c0 4.51-3.66 8.14-8.16 8.14zm4.47-6.11c-.24-.12-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.12-.16.24-.63.8-.78.97-.14.16-.29.18-.53.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.2-1.44-1.35-1.68-.14-.24-.02-.37.11-.49.11-.11.24-.29.36-.43.12-.14.16-.24.24-.4.08-.16.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.04 0 1.2.88 2.37 1 2.53.12.16 1.73 2.64 4.19 3.7.59.25 1.05.4 1.4.51.59.19 1.13.16 1.55.1.47-.07 1.45-.59 1.65-1.17.2-.57.2-1.06.14-1.17-.06-.1-.22-.16-.46-.28z" />
          </svg>
          WhatsApp Us
        </a>
      )}
      {business.phone && (
        <a
          href={`tel:${business.phone.replace(/\s/g, "")}`}
          className="flex-1 flex items-center justify-center gap-2 border border-night-600 text-paper font-semibold px-5 py-3 hover:border-signal hover:text-signal transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
          Call
        </a>
      )}
      {business.email && (
        <a
          href={`mailto:${business.email}?subject=${encodeURIComponent(
            `Inquiry: ${productName}`
          )}`}
          className="flex-1 flex items-center justify-center gap-2 border border-night-600 text-paper font-semibold px-5 py-3 hover:border-signal hover:text-signal transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 4h16v16H4z" opacity="0" />
            <path d="M3 6l9 6 9-6M3 6h18v12H3z" />
          </svg>
          Email
        </a>
      )}
    </div>
  );
}

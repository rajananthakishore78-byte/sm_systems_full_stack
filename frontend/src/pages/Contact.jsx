import React from "react";
import { useBusiness } from "../context/BusinessContext.jsx";

export default function Contact() {
  const { business } = useBusiness();

  const waMessage = encodeURIComponent(
    "Hi, I'd like to know more about your CCTV cameras and installation."
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-display font-semibold text-paper">Get in Touch</h1>
      <p className="mt-2 text-paper/60 text-sm">
        Have a question about a product, pricing or installation? Reach us directly.
      </p>

      <div className="mt-8 grid sm:grid-cols-2 gap-5">
        {business.whatsapp && (
          <a
            href={`https://wa.me/${business.whatsapp}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-night-700 hover:border-signal p-5 transition-colors"
          >
            <h3 className="text-xs font-semibold tracking-wide text-signal mb-2">WhatsApp</h3>
            <p className="text-paper">Chat with us instantly</p>
          </a>
        )}
        {business.phone && (
          <a
            href={`tel:${business.phone.replace(/\s/g, "")}`}
            className="border border-night-700 hover:border-signal p-5 transition-colors"
          >
            <h3 className="text-xs font-semibold tracking-wide text-signal mb-2">Phone</h3>
            <p className="text-paper font-mono">{business.phone}</p>
          </a>
        )}
        {business.email && (
          <a
            href={`mailto:${business.email}`}
            className="border border-night-700 hover:border-signal p-5 transition-colors"
          >
            <h3 className="text-xs font-semibold tracking-wide text-signal mb-2">Email</h3>
            <p className="text-paper">{business.email}</p>
          </a>
        )}
        {business.address && (
          <div className="border border-night-700 p-5">
            <h3 className="text-xs font-semibold tracking-wide text-signal mb-2">Address</h3>
            <p className="text-paper/80 leading-relaxed">{business.address}</p>
          </div>
        )}
      </div>

      {business.mapEmbed && (
        <div className="mt-8 border border-night-700 aspect-video overflow-hidden">
          <iframe
            src={business.mapEmbed}
            title="Location map"
            className="w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}

      {business.workingHours && (
        <p className="mt-6 text-sm text-paper/50">{business.workingHours}</p>
      )}
    </div>
  );
}

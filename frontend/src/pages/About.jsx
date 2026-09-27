import React from "react";
import { useBusiness } from "../context/BusinessContext.jsx";

export default function About() {
  const { business } = useBusiness();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-display font-semibold text-paper">About {business.name}</h1>
      {business.about && (
        <p className="mt-5 text-paper/70 leading-relaxed whitespace-pre-line">{business.about}</p>
      )}

      {Array.isArray(business.whyChooseUs) && business.whyChooseUs.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-display font-semibold text-paper mb-4">Why choose us</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {business.whyChooseUs.map((point, i) => (
              <li key={i} className="flex items-start gap-3 border border-night-700 p-3 text-sm text-paper/70">
                <span className="text-signal mt-0.5">●</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-10 grid sm:grid-cols-2 gap-6 text-sm">
        {business.workingHours && (
          <div className="border border-night-700 p-4">
            <h3 className="text-xs font-semibold tracking-wide text-signal mb-2">Working Hours</h3>
            <p className="text-paper/70">{business.workingHours}</p>
          </div>
        )}
        {business.address && (
          <div className="border border-night-700 p-4">
            <h3 className="text-xs font-semibold tracking-wide text-signal mb-2">Visit Us</h3>
            <p className="text-paper/70">{business.address}</p>
          </div>
        )}
      </div>
    </div>
  );
}

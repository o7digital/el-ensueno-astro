import { useState } from "react";
import { ui } from "@/i18n/ui";

interface FloorPlanModalProps {
  title: string;
  image: string;
  lang?: "en" | "es";
}

export default function FloorPlanModal({ title, image, lang = "en" }: FloorPlanModalProps) {
  const labels = ui[lang];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-500 transition hover:border-amber-400 hover:bg-amber-50"
        onClick={() => setIsOpen(true)}
      >
        {labels["suite.viewFloorPlan"]}
        <span aria-hidden="true">↗</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
          role="dialog"
          aria-modal="true"
          aria-label={labels["suite.floorPlanTitle"]}
        >
          <div
            className="absolute inset-0 bg-black/80"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="relative z-10 w-full max-w-3xl rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-4">
              <p className="text-lg font-semibold uppercase tracking-[0.2em] text-ink">
                {labels["suite.floorPlanTitle"]}
              </p>
              <button
                type="button"
                aria-label={labels["suite.floorPlanClose"]}
                className="text-ink transition hover:text-dusk"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-2xl">×</span>
              </button>
            </div>
            <div className="p-6">
              <img
                src={image}
                alt={`${title} ${labels["suite.floorPlanTitle"]}`}
                className="w-full rounded-2xl object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

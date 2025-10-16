"use client";
import { useEffect, useMemo, useRef, useState } from "react";

interface Slide {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
}

interface CarouselProps {
  slides: Slide[];
  autoPlayMs?: number;
}

export default function Carousel({ slides, autoPlayMs = 4500 }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const safeSlides = useMemo(() => (slides && slides.length > 0 ? slides : []), [slides]);
  const goTo = (index: number) => setCurrent((index + safeSlides.length) % safeSlides.length);
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  useEffect(() => {
    if (safeSlides.length === 0) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, autoPlayMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [current, autoPlayMs, safeSlides.length]);

  if (safeSlides.length === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200">
      {/* Slides */}
      <div className="relative h-[340px] sm:h-[420px]">
        {safeSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: idx === current ? 1 : 0 }}
          >
            <div className="w-full h-full bg-gray-100">
              {slide.image ? (
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center px-6">
                    <h3 className="text-3xl font-bold text-gray-900 mb-3">{slide.title}</h3>
                    {slide.subtitle && (
                      <p className="text-gray-600 text-lg">{slide.subtitle}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Overlay content */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="max-w-3xl">
                <h3 className="text-2xl sm:text-3xl font-bold text-white drop-shadow">{slide.title}</h3>
                {slide.subtitle && (
                  <p className="text-white/90 mt-2 text-sm sm:text-base">{slide.subtitle}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        aria-label="Previous slide"
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-sm"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button
        aria-label="Next slide"
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-sm"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
        {safeSlides.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => goTo(idx)}
            className={`h-2 rounded-full transition-all ${idx === current ? "bg-white w-6" : "bg-white/60 w-2"}`}
          />
        ))}
      </div>
    </div>
  );
}



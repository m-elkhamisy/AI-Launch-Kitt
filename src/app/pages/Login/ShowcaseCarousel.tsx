import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "../../components/ui/carousel";
import { SHOWCASE_SLIDES, type ShowcaseSlide } from "./showcase-slides";
import { ShowcaseSlideView } from "./ShowcaseSlideView";
import { useAutoAdvance } from "./useAutoAdvance";

// The right column: what AI Launch Kit makes, cycling on its own.
//
// Built on the shadcn carousel that already ships in components/ui — it brings the
// carousel region role, slide grouping and arrow keys with it. That component is
// otherwise dormant; adopting it is an explicit part of this change.
export function ShowcaseCarousel({
  slides = SHOWCASE_SLIDES,
  intervalMs = 15_000,
}: {
  slides?: readonly ShowcaseSlide[];
  intervalMs?: number;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    const sync = () => setSelectedIndex(api.selectedScrollSnap());
    sync();
    api.on("select", sync);
    api.on("reInit", sync);
    return () => {
      api.off("select", sync);
      api.off("reInit", sync);
    };
  }, [api]);

  useAutoAdvance(api, { intervalMs });

  return (
    <Carousel
      opts={{ loop: true }}
      setApi={setApi}
      aria-label="What you can build with AI Launch Kit"
      className="h-full w-full"
    >
      {/* The component's default -ml-4 gutter would inset a full-bleed panel. */}
      <CarouselContent className="ml-0 h-full">
        {slides.map((slide, index) => (
          <CarouselItem key={slide.id} className="h-full pl-0">
            <ShowcaseSlideView slide={slide} eager={index === 0} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

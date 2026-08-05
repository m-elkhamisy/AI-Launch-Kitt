import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "../../components/ui/carousel";
import { SHOWCASE_SLIDES, type ShowcaseSlide } from "./showcase-slides";
import { ShowcaseIndicators } from "./ShowcaseIndicators";
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

  const { stop } = useAutoAdvance(api, { intervalMs });

  // Steering the carousel hands control over for good — it does not resume after
  // a pause, which is what makes the auto-advance dismissable rather than merely
  // interruptible.
  const selectSlide = (index: number) => {
    stop();
    api?.scrollTo(index);
  };

  const accent = slides[selectedIndex]?.accent ?? slides[0]?.accent ?? "#ffffff";

  return (
    <Carousel
      opts={{ loop: true }}
      setApi={setApi}
      aria-label="What you can build with AI Launch Kit"
      // CarouselContent's own scroll-clipping wrapper carries no height of its own,
      // so without this the panel would size to its content and push the page into
      // a vertical scroll on any viewport shorter than the 900px design. Reached by
      // descendant selector because the shadcn component is adopted unmodified.
      className="h-full w-full [&>[data-slot=carousel-content]]:h-full"
    >
      {/* The component defaults to a negative-margin gutter between slides, which
          would inset a panel meant to run edge to edge; these override it to zero. */}
      <CarouselContent className="ml-0 h-full">
        {slides.map((slide, index) => (
          <CarouselItem key={slide.id} className="h-full pl-0">
            {/* Only the selected slide animates: the others are mounted the whole
                time, so without this every panel would play its entrance at once,
                off-screen, and be sitting still by the time it scrolled into view. */}
            <ShowcaseSlideView
              slide={slide}
              active={index === selectedIndex}
              eager={index === 0}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute bottom-[32px] left-0 flex w-full justify-center">
        <ShowcaseIndicators
          count={slides.length}
          selectedIndex={selectedIndex}
          accent={accent}
          onSelect={selectSlide}
        />
      </div>
    </Carousel>
  );
}

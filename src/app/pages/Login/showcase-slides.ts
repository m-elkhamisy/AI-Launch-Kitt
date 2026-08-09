// The three capabilities shown beside sign-in, in the order the design cycles
// them. This is the only place slide content lives — a colour, headline or stat
// restated inside a component is how the old catalog tables drifted out of sync
// with what they described.
//
// Content and geometry come from Figma frames 249-7740 / 249-7902 / 249-7809.
import { BookOpen, FileText, MonitorSmartphone, type LucideIcon } from "lucide-react";

import brochureSpread1 from "@/assets/showcase/brochure-spread-1.webp";
import brochureSpread2Placeholder from "@/assets/showcase/brochure-spread-2-placeholder.webp";
import brochureTexture from "@/assets/showcase/brochure-texture.png";
import portfolioPage1 from "@/assets/showcase/portfolio-page-1.webp";
import portfolioPage2 from "@/assets/showcase/portfolio-page-2.webp";
import portfolioPage3 from "@/assets/showcase/portfolio-page-3.webp";
import portfolioPage4 from "@/assets/showcase/portfolio-page-4.webp";
import portfolioPage5 from "@/assets/showcase/portfolio-page-5.webp";
import portfolioTexture from "@/assets/showcase/portfolio-texture.png";
import websiteMockup from "@/assets/showcase/website-mockup.png";
import websiteTexture from "@/assets/showcase/website-texture.png";

export type ShowcaseStat = {
  value: string;
  caption: string;
  /** Set on the closing stat only — renders five stars in the slide accent. */
  rating?: boolean;
};

export type ShowcasePage = {
  /** One export serves both the open sheet and its thumbnail in the rail. */
  src: string;
  /** Printed under the thumbnail, as the viewer's page number. */
  label: string;
};

/**
 * How a slide's mockup is drawn — the kind names the component that renders it.
 *
 * The two document viewers are rebuilt from their pages, because a page turn has to
 * change what the window *shows*, which a baked image cannot do. They are separate
 * kinds rather than one because the windows differ: the portfolio is a macOS-style
 * preview with a thumbnail grid, the brochure an editor with a toolbar and a side
 * rail. The website stays a flat export with one strip re-rendered over it; see
 * `WebsiteMockup` for why that one is overlaid instead.
 */
export type ShowcaseMockup =
  | { kind: "website"; src: string }
  | { kind: "pdf"; fileName: string; pages: readonly ShowcasePage[] }
  | {
      kind: "brochure";
      fileName: string;
      /** The saved-at line under the filename. */
      fileMeta: string;
      pages: readonly ShowcasePage[];
    };

export type ShowcaseSlide = {
  id: string;
  /** Lowercase hex. Tints the badge, the stars and the filled indicators. */
  accent: string;
  badgeLabel: string;
  BadgeIcon: LucideIcon;
  /** Stored sentence case; the headline renders with capitalize, as in Figma. */
  headline: string;
  subcopy: string;
  mockup: ShowcaseMockup;
  /** Describes the capability rather than the picture — it stands in for the mockup. */
  mockupAlt: string;
  textureSrc: string;
  stats: readonly ShowcaseStat[];
};

const TRUSTED_BY: ShowcaseStat = {
  value: "Trusted by 2,000+ clients",
  caption: "4.9/5 average rating",
  rating: true,
};

export const SHOWCASE_SLIDES: readonly ShowcaseSlide[] = Object.freeze([
  {
    id: "website",
    accent: "#e99041",
    badgeLabel: "AI-Powered Design Builder",
    BadgeIcon: MonitorSmartphone,
    headline: "Launch a professional website in minutes",
    subcopy:
      "Generate a complete, responsive website tailored to your business, ready to customize and publish.",
    mockup: { kind: "website", src: websiteMockup },
    mockupAlt: "A generated business website shown on a desktop and a phone",
    textureSrc: websiteTexture,
    stats: [
      { value: "5 min", caption: "Average generation" },
      { value: "50+", caption: "Unique styles" },
      { value: "100%", caption: "Responsive & SEO" },
      TRUSTED_BY,
    ],
  },
  {
    id: "portfolio",
    accent: "#847eda",
    badgeLabel: "AI Portfolio Builder",
    BadgeIcon: FileText,
    headline: "Professional portfolio. Instantly yours.",
    subcopy:
      "AI creates a polished PDF portfolio that showcases your services, projects, and expertise in a clear, professional format.",
    // The five pages of the sample portfolio, in the order the viewer turns them.
    // Exported from the page fills behind Figma 249:7911 rather than from the
    // thumbnails, which Figma only renders at their 79px display size.
    mockup: {
      kind: "pdf",
      fileName: "LuminaTech_CapabilityPortfolio_2025.pdf",
      pages: [
        { src: portfolioPage1, label: "1" },
        { src: portfolioPage2, label: "2" },
        { src: portfolioPage3, label: "3" },
        { src: portfolioPage4, label: "4" },
        { src: portfolioPage5, label: "5" },
      ],
    },
    mockupAlt: "A generated PDF portfolio open in a document viewer",
    textureSrc: portfolioTexture,
    stats: [
      { value: "50+", caption: "Professional layouts" },
      { value: "100%", caption: "Brand matched" },
      { value: "1 click", caption: "Export as PDF" },
      TRUSTED_BY,
    ],
  },
  {
    id: "brochure",
    accent: "#6fc074",
    badgeLabel: "AI Brochure Generator",
    BadgeIcon: BookOpen,
    headline: "Create a brochure that sells your business",
    subcopy:
      "Generate a professional brochure with your services, branding, and contact details, ready to print or share digitally.",
    // Spread two is a stand-in: the design only holds the first spread, and the
    // real second one is still to be exported. Replace the placeholder asset and
    // this slide needs no other change.
    mockup: {
      kind: "brochure",
      fileName: "Brochure.pdf",
      fileMeta: "22.07.2026 • 13:42",
      pages: [
        { src: brochureSpread1, label: "1" },
        { src: brochureSpread2Placeholder, label: "2" },
      ],
    },
    mockupAlt: "A generated print-ready brochure open in a document viewer",
    textureSrc: brochureTexture,
    stats: [
      { value: "100%", caption: "Ready for print" },
      { value: "PDF export", caption: "Download & share" },
      { value: "Your Style", caption: "Matches your brand" },
      TRUSTED_BY,
    ],
  },
]);

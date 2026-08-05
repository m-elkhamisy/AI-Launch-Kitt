// The three capabilities shown beside sign-in, in the order the design cycles
// them. This is the only place slide content lives — a colour, headline or stat
// restated inside a component is how the old catalog tables drifted out of sync
// with what they described.
//
// Content and geometry come from Figma frames 249-7740 / 249-7902 / 249-7809.
import { BookOpen, FileText, MonitorSmartphone, type LucideIcon } from "lucide-react";

import brochureMockup from "../../../assets/showcase/brochure-mockup.png";
import brochureTexture from "../../../assets/showcase/brochure-texture.png";
import portfolioPage1 from "../../../assets/showcase/portfolio-page-1.webp";
import portfolioPage2 from "../../../assets/showcase/portfolio-page-2.webp";
import portfolioPage3 from "../../../assets/showcase/portfolio-page-3.webp";
import portfolioPage4 from "../../../assets/showcase/portfolio-page-4.webp";
import portfolioPage5 from "../../../assets/showcase/portfolio-page-5.webp";
import portfolioTexture from "../../../assets/showcase/portfolio-texture.png";
import websiteMockup from "../../../assets/showcase/website-mockup.png";
import websiteTexture from "../../../assets/showcase/website-texture.png";

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
 * How a slide's mockup is drawn.
 *
 * `image` is a flat export of the whole Figma frame: correct, but nothing inside
 * it can move. `pdf` carries the pages instead, letting `PdfViewerMockup` rebuild
 * the window and turn them. A slide graduates from one to the other as its
 * interior is rebuilt; the kind is what tells the panel which to render.
 */
export type ShowcaseMockup =
  | { kind: "image"; src: string }
  | { kind: "pdf"; fileName: string; pages: readonly ShowcasePage[] };

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
    mockup: { kind: "image", src: websiteMockup },
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
    mockup: { kind: "image", src: brochureMockup },
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

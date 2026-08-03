// Registers the jest-dom matchers (toBeInTheDocument, toHaveAttribute, …) on
// Vitest's expect. Loaded via `setupFiles` in vitest.config.ts.
import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Testing Library only auto-registers its cleanup when the test framework
// exposes globals. This project runs Vitest with `globals: false` (tests import
// describe/it/expect explicitly), so unmounting has to be wired up by hand —
// without it, renders accumulate across tests in a file and queries match
// leftover nodes from earlier cases.
afterEach(cleanup);

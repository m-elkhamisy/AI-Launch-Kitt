import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ProjectsPage } from "../../App";
import { makeProjectSummaries } from "../../test/fixtures";

const handlers = {
  onCreate: vi.fn(),
  onOpen: vi.fn(),
  onRefresh: vi.fn(),
  onSignOut: vi.fn(),
};

describe("ProjectsPage", () => {
  it("lists existing projects with their build status", () => {
    render(
      <ProjectsPage projects={makeProjectSummaries()} loading={false} busy={false} {...handlers} />,
    );

    expect(screen.getByText("Your websites")).toBeInTheDocument();
    expect(screen.getByText("Northstar")).toBeInTheDocument();
    expect(screen.getByText(/Build: completed/)).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Open" })).toHaveLength(2);
  });

  it("renders the empty state when there are no projects", () => {
    render(<ProjectsPage projects={[]} loading={false} busy={false} {...handlers} />);

    expect(screen.getByText("No websites yet")).toBeInTheDocument();
  });
});

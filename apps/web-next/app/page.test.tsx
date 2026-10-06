import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home", () => {
  it("renders the home page", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: "Web Next" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Get started" }),
    ).toBeInTheDocument();
  });
});

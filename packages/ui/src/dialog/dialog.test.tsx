import { render, screen, fireEvent } from "@testing-library/react";
import { createRef } from "react";
import { describe, it, expect } from "vitest";
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./dialog";

function TestDialog() {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogTitle>Title</DialogTitle>
        <DialogDescription>Description</DialogDescription>
        <DialogClose>Close</DialogClose>
      </DialogContent>
    </Dialog>
  );
}

describe("Dialog", () => {
  it("is closed by default", () => {
    render(<TestDialog />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens via the trigger and renders the compound parts", () => {
    render(<TestDialog />);

    fireEvent.click(screen.getByRole("button", { name: "Open" }));

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    // Radix wires Title/Description to the dialog for a11y.
    expect(dialog).toHaveAccessibleName("Title");
    expect(dialog).toHaveAccessibleDescription("Description");
  });

  it("closes via DialogClose", () => {
    render(<TestDialog />);

    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("forwards ref and merges className on DialogContent", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent ref={ref} className="custom-content">
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Open" }));

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(screen.getByRole("dialog")).toHaveClass("custom-content");
  });
});

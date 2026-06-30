import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { OrderConfirmation } from "@/emails/OrderConfirmation";

describe("OrderConfirmation", () => {
  it("shows the order id and total", () => {
    render(<OrderConfirmation orderId="ORD-1" email="a@b.com" lines={[{ name: "Multi Pro", quantity: 2, lineCents: 7998 }]} totalCents={7998} />);
    expect(screen.getByText(/ORD-1/)).toBeInTheDocument();
    expect(screen.getByText(/\$79\.98/)).toBeInTheDocument();
    expect(screen.getByText(/Multi Pro/)).toBeInTheDocument();
  });
});

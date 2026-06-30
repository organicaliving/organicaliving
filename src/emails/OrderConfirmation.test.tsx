import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { OrderConfirmation } from "@/emails/OrderConfirmation";

describe("OrderConfirmation", () => {
  it("shows the order id, line prices, and total", () => {
    render(
      <OrderConfirmation
        orderId="ORD-1"
        email="a@b.com"
        lines={[
          { name: "Multi Pro", quantity: 1, lineCents: 3999 },
          { name: "Optimus D3", quantity: 1, lineCents: 2499 },
        ]}
        totalCents={6498}
      />
    );
    expect(screen.getByText(/ORD-1/)).toBeInTheDocument();
    expect(screen.getByText(/Multi Pro/)).toBeInTheDocument();
    expect(screen.getByText(/Optimus D3/)).toBeInTheDocument();
    expect(screen.getByText(/\$39\.99/)).toBeInTheDocument();
    expect(screen.getByText(/\$64\.98/)).toBeInTheDocument();
  });
});

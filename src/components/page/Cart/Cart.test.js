
import React from "react";
import { render, screen } from "@testing-library/react";

const CartTotal = ({ cart }) => {
    const totalSum = cart
        .reduce((sum, item) => sum + parseFloat(item.totalPrice), 0)
        .toFixed(2);

    return <div>Total: ${totalSum}</div>;
};

test("calculates total sum of cart items correctly", () => {
    const cart = [
        { id: 1, totalPrice: "10.00" },
        { id: 2, totalPrice: "15.50" },
        { id: 3, totalPrice: "9.30" },
    ];

    render(<CartTotal cart={cart} />);

    expect(screen.getByText("Total: $34.80")).toBeInTheDocument();
});

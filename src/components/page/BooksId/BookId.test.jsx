import React, { useState } from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

// Компонент для тестування
const CalculateTotalComponent = ({ calculateTotal, handlePurchase }) => {
  const [totalPrice, setTotalPrice] = useState("");

  const handleCalculate = () => {
    calculateTotal(3, 10, setTotalPrice);
  };

  return (
    <div>
      <button onClick={handleCalculate}>Calculate Total</button>
      <span data-testid="total-price">{totalPrice}</span>
      <button onClick={handlePurchase}>Purchase</button>
    </div>
  );
};

// Функція для обчислення ціни
const calculateTotalPrice = (quantity, price, setTotalPrice) => {
  const total = quantity * price;
  setTotalPrice(total.toFixed(2));
};

// Тест для перевірки обчислення ціни
describe("CalculateTotalComponent", () => {
  it("calculateTotalPrice correctly calculates total price", () => {
    render(<CalculateTotalComponent calculateTotal={calculateTotalPrice} />);

    fireEvent.click(screen.getByText("Calculate Total"));

    expect(screen.getByTestId("total-price")).toHaveTextContent("30.00");
  });

  it("handlePurchase adds book to cart and navigates to cart page", () => {
    const mockAddNewCart = vi.fn();
    const mockSetQuantity = vi.fn();
    const mockNavigate = vi.fn();

    const mockCart = [];

    render(
      <CalculateTotalComponent
        calculateTotal={calculateTotalPrice}
        handlePurchase={() => {
          const uniqueBook = { id: 1, title: "Book", price: 10 };
          const quantity = 1;
          const totalPrice = "10.00";

          if (uniqueBook) {
            const isBookInCart = mockCart.some(
              (item) => item.id === uniqueBook.id
            );
            if (!isBookInCart) {
              mockAddNewCart({
                id: uniqueBook.id,
                title: uniqueBook.title,
                price: uniqueBook.price,
                quantity: quantity,
                totalPrice: totalPrice,
              });
              mockSetQuantity(1);
              mockNavigate("/cart");
            }
          }
        }}
      />
    );

    fireEvent.click(screen.getByText("Purchase"));

    expect(mockAddNewCart).toHaveBeenCalledWith({
      id: 1,
      title: "Book",
      price: 10,
      quantity: 1,
      totalPrice: "10.00",
    });

    expect(mockSetQuantity).toHaveBeenCalledWith(1);
    expect(mockNavigate).toHaveBeenCalledWith("/cart");
  });
});

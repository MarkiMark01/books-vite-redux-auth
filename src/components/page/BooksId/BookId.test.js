
import React, { useState } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

const CalculateTotalComponent = ({ calculateTotal, handlePurchase }) => {
    const [totalPrice, setTotalPrice] = useState('');

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

const calculateTotalPrice = (quantity, price, setTotalPrice) => {
    const total = quantity * price;
    setTotalPrice(total.toFixed(2));
};

test('calculateTotalPrice correctly calculates total price', () => {
    render(<CalculateTotalComponent calculateTotal={calculateTotalPrice} />);

    fireEvent.click(screen.getByText('Calculate Total'));

    expect(screen.getByTestId('total-price')).toHaveTextContent('30.00');
});

test('handlePurchase adds book to cart and navigates to cart page', () => {

    const mockAddNewCart = jest.fn();
    const mockSetQuantity = jest.fn();
    const mockNavigate = jest.fn();

    const mockCart = [];

    render(
        <CalculateTotalComponent
            calculateTotal={calculateTotalPrice}
            handlePurchase={() => {
                const uniqueBook = { id: 1, title: 'Book', price: 10 };
                const quantity = 1;
                const totalPrice = '10.00';

                if (uniqueBook) {
                    const isBookInCart = mockCart.some((item) => item.id === uniqueBook.id);
                    if (!isBookInCart) {
                        mockAddNewCart({
                            id: uniqueBook.id,
                            title: uniqueBook.title,
                            price: uniqueBook.price,
                            quantity: quantity,
                            totalPrice: totalPrice,
                        });
                        mockSetQuantity(1);
                        mockNavigate('/cart');
                    }
                }
            }}
            cart={mockCart}
            addNewCart={mockAddNewCart}
            setQuantity={mockSetQuantity}
            navigate={mockNavigate}
        />
    );

    fireEvent.click(screen.getByText('Purchase'));

    expect(mockAddNewCart).toHaveBeenCalledWith({
        id: 1,
        title: 'Book',
        price: 10,
        quantity: 1,
        totalPrice: '10.00',
    });

    expect(mockSetQuantity).toHaveBeenCalledWith(1);
    expect(mockNavigate).toHaveBeenCalledWith('/cart');
});



const filteredBooks = (books, textFilter, priceFilter) => {
    return books.filter((book) => {
        const numericPrice = parseFloat(book.price);
        return (
            book.title?.toLowerCase().includes(textFilter.toLowerCase()) &&
            (priceFilter === "All books" ||
                (priceFilter === "from $0 to $15" &&
                    numericPrice >= 0 &&
                    numericPrice <= 15) ||
                (priceFilter === "from $15 to $30" &&
                    numericPrice > 15 &&
                    numericPrice <= 30) ||
                (priceFilter === "more than $30" && numericPrice > 30))
        );
    });
};

describe('Filter function', () => {
    const books = [
        { title: 'Book 1', price: '10' },
        { title: 'Book 2', price: '20' },
        { title: 'Another Book', price: '30' }
    ];

    it('filters books by title and price range', () => {
        const textFilter = 'book';
        const priceFilter = 'from $15 to $30';

        const testFilteredBooks = filteredBooks(books, textFilter, priceFilter);

        expect(testFilteredBooks).toEqual([
            { title: 'Book 2', price: '20' },
            { title: 'Another Book', price: '30' }
        ]);
    });

    it('filters books by title only', () => {
        const textFilter = 'ano';
        const priceFilter = 'All books';

        const testFilteredBooks = filteredBooks(books, textFilter, priceFilter);

        expect(testFilteredBooks).toEqual([
            { title: 'Another Book', price: '30' }
        ]);
    });
});





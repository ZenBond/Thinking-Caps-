const BookList = ({books, getSingleBook}) => {
    function handleClick(e) {
        getSingleBook(e.currentTarget.id)
    }
    return (
        <div>
          <h2>Book List</h2>
          <ul className="book-cards">
            {books.map((book) => (
              <li onClick={handleClick} id={book.book_id} key={book.book_id} className="book-card">
                <img className='book-img' src={book.picture} alt={book.title} />
                <div>
                    <h3>{book.title}</h3>
                    <p>by {book.author}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
};

export default BookList;

const BookList = ({books, getSingleBook, removeBook}) => {
    function handleClick(e) {
        getSingleBook(e.currentTarget.id)
        console.log(e.target)
    }
    function handleRemove(e) {
      removeBook(e.currentTarget.id)
    }


    return (
        <div>
          <h2>Book List</h2>
          <ul className="book-cards">
            {books.map((book) => (
              <li onClick={handleClick} id={book.book_id} key={book.book_id} className="book-card" >
                <img className='book-img' src={book.picture} alt={book.title} />
                <div className="card-content">
                    <button id={book.book_id} onClick={handleRemove} className="remove-btn">X</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
};

export default BookList;

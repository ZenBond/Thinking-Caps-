import { useEffect, useState } from "react";
const SearchResultCard = ({ book, handlePostSubmit, handleAddToLibrary }) => {
    function handleClick() {
        handlePostSubmit();
        console.log(book); 
      }
    function handleHover() {
        handleAddToLibrary(book)
        console.log(book)
    }



    return (
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            {book.cover_i && (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
                className="img-fluid"
              />
            )}
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{book.title}</h5>
              <p className="card-text">
                {book.author_name ? `Author: ${book.author_name[0]}` : 'Unknown Author'}
              </p>
              <p className="card-text">{book.description ? book.description : 'No summary available'}</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                onMouseEnter={handleHover}
                picture={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
              >
                Add to Library
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default SearchResultCard;
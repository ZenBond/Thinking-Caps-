import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchResultCard from './SearchCardResult';
import axios from 'axios'

function AddBook({newBook, setNewBook, onHomeClick, onAddBookClick, handleAddToLibrary, handlePostSubmit, bookData, setBookData }) {
  const [searchResults, setSearchResults] = useState([]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value)
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
      
    }));
  };

  const handleSearch = async () => {
    try {
      const searchResponse = await axios.get(
        `https://openlibrary.org/search.json?q=${bookData.title}`
      );

      const results = searchResponse.data.docs;
      console.log(results)
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching book:', error.message);
    }
  };


return (
    <div>
      <Header onHomeClick={onHomeClick} onAddBookClick={onAddBookClick} />
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Add a New Book</h2>
            <form className="mb-3">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Search Book Title
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter book title"
                    name="title"
                    value={bookData.title}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </div>
              </div>
              {searchResults.map((result) => (
                <SearchResultCard
                  key={result.key}
                  book={result}
                  onAddBookClick={onAddBookClick}
                  handleAddToLibrary={handleAddToLibrary}
                  handlePostSubmit={handlePostSubmit}
                  searchResults={searchResults}
                  setSearchResults={setSearchResults}
                  newBook={newBook}
                  setNewBook={setNewBook}
                />
              ))}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBook;

import React, { useState } from 'react';
import Header from './components/Header';
import axios from 'axios'

function AddBook({ onHomeClick, onAddBookClick }) {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    summary: '',
    picture: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value)
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const res = await axios.post('http://localhost:3000/api/book', bookData)
    
        console.log('Book Added', res.data)
    
    
        
        setBookData({
          title: '',
          author: '',
          summary: '',
          picture: '',
        });
        onAddBookClick()
    } catch (err) {
        console.error('Error adding book:', err.message);
    }

    
  };

  return (
    <div>
      <Header onHomeClick={onHomeClick} onAddBookClick={onAddBookClick} />
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Add a New Book</h2>
            <form onSubmit={handleSubmit} className="mb-3">
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  name="title"
                  value={bookData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Author"
                  name="author"
                  value={bookData.author}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Summary"
                  name="summary"
                  value={bookData.summary}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="url"
                  className="form-control"
                  placeholder="Picture url"
                  name="picture"
                  value={bookData.picture}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add Book
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBook;

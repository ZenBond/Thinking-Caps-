import { useState } from "react"
import Header from "./Header"
import axios from 'axios'
function SingleBook({singleBook, onHomeClick, onAddBookClick}) {
    const [isEditing, setIsEditing] = useState(false)
    const [editedBook, setEditedBook] = useState({
        title: singleBook.title,
        author: singleBook.author,
        summary: singleBook.summary,
        picture: singleBook.picture
    })
    function handleClick() {
        setIsEditing(true)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedBook((prevBook) => ({
          ...prevBook,
          [name]: value,
        }));
      };

      const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.put(`http://localhost:3000/api/book/${singleBook.book_id}`, editedBook);
    
          console.log('Book Edited:', res.data);
    
          setIsEditing(false);
        } catch (err) {
          console.error('Error editing book:', err.message);
        }
      };


    return (
        <div className="single-book-container">
            <Header onAddBookClick={onAddBookClick} onHomeClick={onHomeClick}/>
            <div className="single-book-card">
                <img className='single-book-img' src={singleBook.picture} alt={singleBook.title} />
                <div className="single-book-details">
                    <h3>{singleBook.title}</h3>
                    <p>by {singleBook.author}</p>
                    <p>{singleBook.summary}</p>
                    {isEditing ? (
            <form onSubmit={handleEditSubmit}>
              <div>
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  name="title"
                  value={editedBook.title}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="author">Author:</label>
                <input
                  type="text"
                  name="author"
                  value={editedBook.author}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="summary">Summary:</label>
                <textarea
                  name="summary"
                  value={editedBook.summary}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="picture">Picture URL:</label>
                <input
                  type="url"
                  name="picture"
                  value={editedBook.picture}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit">Save</button>
            </form>
          ) : (
            <button onClick={handleClick}>Edit</button>
          )}
                </div>
            </div>
        </div>
    )
}

export default SingleBook
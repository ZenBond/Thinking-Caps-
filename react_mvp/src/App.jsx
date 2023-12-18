import { useState, useEffect } from 'react'
import axios from 'axios';
import BookList from './components/Booklist'
import SingleBook from './components/SingleBook';
import Loading from './components/Loading';
import Header from './components/Header';
import Footer from './Footer';
import AddBook from './AddBook';

import './App.css'

function App() {
  const [singleBook, setSingleBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [books, setBooks] = useState([]);
  const [showAddBookForm, setShowAddBookForm] = useState(false)
  

  //function to get single book
  const getSingleBook = async (id) => {
    const res = await axios.get(`http://localhost:3000/api/book/${id}`)
    setSingleBook(res.data)
    console.log(singleBook)
  }

  const onBookUpdate = (updatedBook) => {
    setSingleBook(updatedBook);
  };


  const removeBook = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/book/${id}`)
      setBooks((prevBooks) => prevBooks.filter((book) => book.book_id !== id))
      onHomeClick()
    } catch (err) {
      console.error('Error removing book:', err)
    }

  }


  function onHomeClick() {
    setSingleBook(null);
    setShowAddBookForm(null)
  }

  function onAddBookClick() {
    setShowAddBookForm(true)
    console.log(showAddBookForm)
  }



  //get all call for initial page
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/book');
        setBooks(res.data);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();


  }, [books]); 


  if(showAddBookForm) {
    return <AddBook onHomeClick={onHomeClick} onAddBookClick={onAddBookClick}/>
  }

  if(loading) {
    return <Loading />
  }

  if(!loading && singleBook) {
   return <SingleBook singleBook={singleBook} onHomeClick={onHomeClick} onAddBookClick={onAddBookClick}/>
  }

  return (
    <div>
      <Header showAddBookForm={showAddBookForm} onAddBookClick={onAddBookClick}/>
      <BookList books={books} getSingleBook={getSingleBook} removeBook={removeBook}/>
    </div>
  )
}

export default App

import { useState, useEffect } from 'react'
import axios from 'axios';
import BookList from './components/Booklist'
import SingleBook from './components/SingleBook';
import Loading from './components/Loading';

import './App.css'

function App() {
  const [singleBook, setSingleBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [books, setBooks] = useState([]);

  //function to get single book
  const getSingleBook = async (id) => {
    const res = await axios.get(`http://localhost:3000/api/book/${id}`)
    setSingleBook(res.data)
    console.log(singleBook)
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
  }, []); 


  if(loading) {
    return <Loading />
  }

  if(!loading && singleBook) {
   return <SingleBook singleBook={singleBook}/>
  }

  return (
    <div>
      <BookList books={books} getSingleBook={getSingleBook}/>
    </div>
  )
}

export default App

'use client';
import React, {useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; 
import { getBooksByCategory, openBookInBrowser } from '@/api/books.js';

const Books = () => {
    const { category } = useParams(); 
    const [books, setBooks] = useState([]);
    const [searchText, setSearchText] = useState('');
    useEffect(() => {
        fetchBooks(category);
      }, [category]);
      const fetchBooks = async () => {
        try {
          const data = await getBooksByCategory(category);
          if (data?.results) 
          {
              setBooks(data.results);
          }
          else
          {
              console.error('Error fetching books');
          }
         
        } catch (error) {
          console.error('Error fetching books:', error);
        }
      };
      const handleBookClick = (book) => {
        openBookInBrowser(book);
      };
      const handleSearch = (event) => {
        try {
        if (event.key === 'Enter') {
            if(searchText !== '')
            {
                const filteredBooks = books.filter((book) =>
                book?.bookshelves.includes(searchText) ||
                book?.title.includes(searchText) ||
                book?.authors.includes(searchText)
                );
                if(filteredBooks.length > 0)
                {
                    setBooks(filteredBooks);
                }
                else
                {
                    alert(`No books found for ${searchText}`);
                }
            }
            else
            {
                fetchBooks();
            }
        }
        
        
    } catch (error) {
        console.error('Error fetching books:', error);
      }
      };
      
    return (
      <div className='wrapper'>
        <div className='cat-heading'>
        <a href={'/category'}><img src={`/assets/images/back.svg`}/></a>
        <h2>{category}</h2>
        </div>
        <div className='search-bar'>
        <img src={`/assets/images/Search.svg`}/>
        <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) =>setSearchText(e.target.value)}
            onKeyDown={(e) =>  handleSearch(e)}
        />
        </div>
        <div className='books-listing'>
        {books.map((book) => (
            <div className='book-card' onClick={() => handleBookClick(book)} key={book?.id}>
                <div className='book-img'>
                <img src={book?.formats['image/jpeg']}/>
                </div>
                <div className='book-title'>
                {book?.title}
                </div>
                <div className='book-author'>
                {book?.authors[0]?.name} 
                </div>
            </div>
        ))}
        </div>
      </div>
    );
  };
  
  export default Books;
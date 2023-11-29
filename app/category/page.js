'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const categories = ['Fiction', 'Drama', 'Humour', 'Politics', 'Philosophy', 'History', 'Adventure'];
const halfLength = Math.ceil(categories.length / 2);
const leftCategories = categories.slice(0, halfLength);
const rightCategories = categories.slice(halfLength);
const Category = () => {
  const router = useRouter();

  return (
    <div className='wrapper'>
      <h1>Gutenberg Project</h1>
      <p>A social cataloging website that allows you to freely search its database of books, annotations,
        and reviews.</p>
      <div className='content'>
        <div className='left-side'>
          <ul>
            {leftCategories.map((category) => (
              <li key={category}>
                <div className='category-card'>
                  <div className='left-content'>
                    <img src={`assets/images/${category}.svg`} />
                    <div className='cat-tile'>{category}</div>
                  </div>
                  <div className='right-content'>
                  <Link href={`/books/${encodeURIComponent(category)}`} legacyBehavior>
                    <a><img src={`assets/images/Next.svg`} /></a>
                    </Link>
                  
                  </div>
                </div>

              </li>
            ))}
          </ul>
        </div>
        <div className='right-side'>
          <ul>
            {rightCategories.map((category) => (
              <li key={category}>
              <div className='category-card'>
                <div className='left-content'>
                  <img src={`assets/images/${category}.svg`} />
                  <div className='cat-tile'>{category}</div>
                </div>
                <div className='right-content'>
                <Link href={`/books/${encodeURIComponent(category)}`} legacyBehavior>
                  <a><img src={`assets/images/Next.svg`} /></a>
                  </Link>
                
                </div>
              </div>

            </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Category;
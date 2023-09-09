import React from 'react';
import { Link } from 'react-router-dom';
import Price from '../Price/Price';
import StarRating from '../StarRating/StarRating';
import classes from './thumbnails.module.css';
export default function Thumbnails({ books }) {
  return (
    <ul className={classes.list}>
      {books.map(book => (
        <li key={book.id}>
          <Link to={`/book/${book.id}`}>
            <img
              className={classes.image}
              src={`${book.imageUrl}`}
              alt={book.name}
            />

            <div className={classes.content}>
              <div className={classes.name}>{book.name}</div>
              <span
                className={`${classes.favorite} ${
                  book.favorite ? '' : classes.not
                }`}
              >
                ❤
              </span>
              <div className={classes.stars}>
                <StarRating stars={book.stars} />
              </div>
              <div className={classes.product_item_footer}>
                <div className={classes.origins}>
                  {book.origins.map(origin => (
                    <span key={origin}>{origin}</span>
                  ))}
                </div>
                <div className={classes.read_time}>
                  <span>🕒</span>
                  {book.cookTime}
                </div>
              </div>
              <div className={classes.price}>
                <Price price={book.price} />
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

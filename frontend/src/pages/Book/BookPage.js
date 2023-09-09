import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Price from '../../components/Price/Price';
import StarRating from '../../components/StarRating/StarRating';
import Tags from '../../components/Tags/Tags';
import { useCart } from '../../hooks/useCart';
import { getById } from '../../services/bookService';
import classes from './bookPage.module.css';
import NotFound from '../../components/NotFound/NotFound';
export default function BookPage() {
  const [book, setBook] = useState({});
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(book);
    navigate('/cart');
  };

  useEffect(() => {
    getById(id).then(setBook);
  }, [id]);
  return (
    <>
      {!book ? (
        <NotFound message="Book Not Found!" linkText="Back To Homepage" />
      ) : (
        <div className={classes.container}>
          <img
            className={classes.image}
            src={`${book.imageUrl}`}
            alt={book.name}
          />

          <div className={classes.details}>
            <div className={classes.header}>
              <span className={classes.name}>{book.name}</span>
              <span
                className={`${classes.favorite} ${
                  book.favorite ? '' : classes.not
                }`}
              >
                ❤
              </span>
            </div>
            <div className={classes.rating}>
              <StarRating stars={book.stars} size={25} />
            </div>

            <div className={classes.origins}>
              {book.origins?.map(origin => (
                <span key={origin}>{origin}</span>
              ))}
            </div>

            <div className={classes.tags}>
              {book.tags && (
                <Tags
                  tags={book.tags.map(tag => ({ name: tag }))}
                  forBookPage={true}
                />
              )}
            </div>

            <div className={classes.cook_time}>
              <span>
                Time to cook about <strong>{book.cookTime}</strong> minutes
              </span>
            </div>

            <div className={classes.price}>
              <Price price={book.price} />
            </div>

            <button onClick={handleAddToCart}>Add To Cart</button>
          </div>
        </div>
      )}
    </>
  );
}

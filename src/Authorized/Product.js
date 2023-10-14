import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Review from './Reviews';

const Product = ({products, newReview, reviews, setReviews})=> {
    const { id } = useParams();
    const product = products.find(product => product.id === id)

    return (
        <>
            <h1>{product.name}</h1>
            <h3>Created at: {product.created_at}</h3>
            <p>{product.description}</p>
            <img className='imageSize' src={product.image_url}></img><br/>
            <Link to="/products">Back</Link>
            <Review newReview={newReview} reviews={reviews} setReviews={setReviews}/>
            {/* <button onClick={ () => deleteLineItem(product)}>Remove Product</button> */}
            {/* TO DO */}
        </>
    )
};

export default Product
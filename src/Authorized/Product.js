import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Review from './Reviews';

const Product = ({products, newReview, reviews, setReviews, productTags})=> {
    const { id } = useParams();
    const product = products.find(product => product.id === id)
    const p_tags = productTags.find((productTag) => productTag.product_id === product.id)

    return (
        <>
            <h1>{product.name}</h1>
            <h3>Posted on {product.created_at.slice(0, 10)}</h3>
            <p>{product.description}</p>
            <img className='imageSize' src={product.image_url}></img><br/>
            {p_tags ? (p_tags.is_accessory ? <button>#Accessory</button> : null) : null}
            {p_tags ? (p_tags.is_substance ? <button>#Substance</button> : null) : null}
            {p_tags ? (p_tags.is_suit ? <button>#Suit</button> : null) : null}
            {p_tags ? (p_tags.is_unique ? <button>#Unique</button> : null) : null}
            {p_tags ? (p_tags.is_vehicle ? <button>#Vehicle</button> : null) : null}
            {p_tags ? (p_tags.is_weapon ? <button>#Weapon</button> : null) : null}
            <Review newReview={newReview} reviews={reviews} setReviews={setReviews}/>
        </>
    )
};

export default Product
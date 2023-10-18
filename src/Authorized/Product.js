import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Review from './Reviews';

const Product = ({products, newReview, reviews, setReviews, productTags})=> {
    const { id } = useParams();
    const product = products.find(product => product.id === id)

    return (
        <div className='singleProductContainer'>
        {products && products.length ? 
            <>
                <div className='singleProduct'>
                    <h1>{product.name}</h1>
                    <h2>Posted on {product.created_at}</h2>
                    <p>{product.description}</p>
                    <img src={product.image_url}></img><br/>
                    {product.is_accessory ? <button className='tagButton'>#Accessory</button> : null}
                    {product.is_substance ? <button className='tagButton'>#Substance</button> : null}
                    {product.is_suit ? <button className='tagButton'>#Suit</button> : null}
                    {product.is_unique ? <button className='tagButton'>#Unique</button> : null}
                    {product.is_vehicle ? <button className='tagButton'>#Vehicle</button> : null}
                    {product.is_weapon ? <button className='tagButton'>#Weapon</button> : null}
                </div>
                <div className='reviews'>
                    <Review newReview={newReview} reviews={reviews} setReviews={setReviews}/>
                </div>
            </>
        : null}
            </div>
    )
};

export default Product
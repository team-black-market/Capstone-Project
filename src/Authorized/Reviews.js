import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Reviews = ({products, newReview, setReviews, reviews}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [stars, setStars] = useState('');
    const nav = useNavigate();
    const { id } = useParams();

    const submit = async(ev)=> {
        ev.preventDefault();
        const reviews = {title: title, description: description, stars: stars}
        newReview({ id: id, products: products, setReviews: setReviews, newReview: newReview, reviews: reviews})
        // nav('/product/:id')
    };

return (
    <>
    <h1>Add your Review!</h1>
        <div>
            <form onSubmit={ submit }>
                <input placeholder='title' onChange={ev => setTitle(ev.target.value)} />
                <input placeholder='description' onChange={ev => setDescription(ev.target.value)} />
                <input placeholder='stars' onChange={ev => setStars(ev.target.value)} />
                <button>Submit</button>
            </form>
            
        </div>
    </>
    )
};

export default Reviews
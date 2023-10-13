import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Reviews = ({products, newReview, setReviews, reviews}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [stars, setStars] = useState('');
    const { id } = useParams();

    const submit = async(ev)=> {
        ev.preventDefault();
        const review = {title: title, description: description, stars: stars, productId: id}
        newReview({ id: id, setReviews: setReviews, review: review, reviews: reviews})
    };
    const star = '<img src=\'../assets/img/favoriteNav.svg\'/>';
    console.log(reviews)
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
            {
                reviews.filter(review => review.productid === id).map(review => {
                    return(
                        <div key={review.id}>
                            <div id='rating'>
                                <h1>{review.title}</h1> &nbsp;
                                {review.stars === 1 ? <div dangerouslySetInnerHTML={{__html: star}}></div> : null}
                                {review.stars === 2 ? <div dangerouslySetInnerHTML={{__html: star + star}}></div> : null}
                                {review.stars === 3 ? <div dangerouslySetInnerHTML={{__html: star + star + star}}></div> : null}
                                {review.stars === 4 ? <div dangerouslySetInnerHTML={{__html: star + star + star + star}}></div> : null}
                                {review.stars === 5 ? <div dangerouslySetInnerHTML={{__html: star + star + star + star + star}}></div> : null}
                            </div>
                            <h3>{review.description}</h3>
                        </div>
                    )
                })
            }
        </div>
    </>
    )
};

export default Reviews
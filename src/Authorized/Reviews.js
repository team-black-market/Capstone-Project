import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Reviews = ({products, newReview, setReviews, reviews}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [stars, setStars] = useState(1);
    const { id } = useParams();

    const submit = async(ev)=> {
        ev.preventDefault();
        const review = {title: title, description: description, stars: stars, productId: id}
        newReview({ id: id, setReviews: setReviews, review: review, reviews: reviews})
        setTitle('')
        setDescription('')
        setStars('')
    };
    const star = '<img src=\'../assets/img/favorite.svg\'/>';

return (
    <>
    <h1 style={{textAlign: 'center'}}>Add your Review!</h1>
        <div className={'formContainer'}>
            <form className='editForm' onSubmit={ submit }>
                <input placeholder='title' value={ title } onChange={ev => setTitle(ev.target.value)} />
                <input placeholder='description' value={ description } onChange={ev => setDescription(ev.target.value)} />
                <input id="number-input" type='number' min='1' max='5' step='1' placeholder='stars' value={ stars } onChange={ev => setStars(ev.target.value)} />
                <button>Submit</button>
            </form>
            <hr style={{border: '2px solid white', margin: '1em 0 1em 0'}}/>
            {
                reviews.filter(review => review.productid === id).map(review => {
                    return(
                        <div key={review.id}>
                            <div id='rating'>
                                <h1>{review.title}</h1>
                                {review.stars === 1 ? <div dangerouslySetInnerHTML={{__html: star}}></div> : null}
                                {review.stars === 2 ? <div dangerouslySetInnerHTML={{__html: star + star}}></div> : null}
                                {review.stars === 3 ? <div dangerouslySetInnerHTML={{__html: star + star + star}}></div> : null}
                                {review.stars === 4 ? <div dangerouslySetInnerHTML={{__html: star + star + star + star}}></div> : null}
                                {review.stars === 5 ? <div dangerouslySetInnerHTML={{__html: star + star + star + star + star}}></div> : null}
                            </div>
                            <h3>{review.description}</h3>
                            <hr style={{border: '1px solid white', margin: '1em 0 1em 0'}}/>
                        </div>
                    )
                })
            }
        </div>
    </>
    )
};

export default Reviews
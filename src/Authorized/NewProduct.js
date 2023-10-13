import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NewProduct = ({newestProduct, products, setProducts}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [image_url, setImage_url] = useState('');
    const nav = useNavigate();

    const submit = async(ev)=> {
        ev.preventDefault();
        const product = {name: name, description: description, price: price, quantity: quantity, image_url: image_url}
        newestProduct({products: products, product: product, setProducts: setProducts})
        nav('/products')
    };

    return (
    <>
    <h1>Add your Product</h1>
        <div>
            <form onSubmit={ submit }>
                <input placeholder='name' onChange={ev => setName(ev.target.value)} />
                <input placeholder='description' onChange={ev => setDescription(ev.target.value)} />
                <input placeholder='price' onChange={ev => setPrice(ev.target.value)} />
                <input placeholder='quantity' onChange={ev => setQuantity(ev.target.value)} />
                <input placeholder='image url' onChange={ev => setImage_url(ev.target.value)} />
                <button disabled={!name || !description || !price || !quantity || !image_url}>Create</button>
            </form>
            <Link to='/home'>Cancel</Link>
        </div>
    </>
    );
}

export default NewProduct;
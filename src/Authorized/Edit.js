// use put 
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditProduct = ({ products, updateProduct, setProducts }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [image_url, setImage_url] = useState('');
    const nav = useNavigate();
    const {id} = useParams();

useEffect(() => {
    const product = products.find((product) => product.id === id)
    if (product) {
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setQuantity(product.quantity);
        setImage_url(product.image_url);
    } else {
        console.log("massive stinky poo poo")
    }
}, []);

    const submit = async(ev)=> {
        ev.preventDefault();
        const updatedProduct = {id: id, name: name, description: description, price: price, quantity: quantity, image_url: image_url}
        updateProduct({updatedProduct: updatedProduct, setProducts: setProducts, products: products})
        nav('/products')
    };

return (
        <>
            <h1>Edit Product</h1>
                <div>
                    <form onSubmit={ submit }>
                        <input placeholder='name' onChange={ev => setName(ev.target.value)} />
                        <input placeholder='description' onChange={ev => setDescription(ev.target.value)} />
                        <input placeholder='price' onChange={ev => setPrice(ev.target.value)} />
                        <input placeholder='quantity' onChange={ev => setQuantity(ev.target.value)} />
                        <input placeholder='image url' onChange={ev => setImage_url(ev.target.value)} />
                        <button disabled={!name || !description || !price || !quantity || !image_url}>Update</button>
                    </form>
                    <Link to='/products'>Cancel</Link>
                </div>
        </>
    );
}

export default EditProduct;
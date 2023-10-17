import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NewProduct = ({newestProduct, products, setProducts, auth}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [location, setLocation] = useState('');
    const [image_url, setImage_url] = useState('');
    const nav = useNavigate();

    const submit = async(ev)=> {
        ev.preventDefault();
        const product = {name: name, description: description, price: price, quantity: quantity, image_url: image_url, userId: auth.id}
        newestProduct({products: products, product: product, setProducts: setProducts})
        nav('/products')
    };

    return (
    <>
        <div>
            <div className='editContainer'>
                <div className='productContainer' style={{margin: 0}}>
                    <div id='productHeader'>
                        <div>
                            <p>{price ? "$" + price : "Price"}</p>
                            <p>Qty: {quantity ? quantity : ""}</p>
                        </div>
                    </div>
                    <div id='productImage'>
                        <img src={image_url ? image_url : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png"}/>
                    </div>
                    <div id='productFooter'>
                        <Link>
                            { name ? (name.length <= 15 ? name : name.slice(0, 15) + '...') : "Product Name"}
                        </Link> 
                    </div>
                </div>
                <div className='formContainer'>
                    <h1 style={{textAlign: 'center'}}>New Product</h1>
                    <form className='editForm' onSubmit={ submit }>
                        <input placeholder={'Name' } onChange={ev => setName(ev.target.value)} />
                        <input contentEditable="true" placeholder={'Description'} onChange={ev => setDescription(ev.target.value)} />
                        <input type='number' placeholder={'Price'} onChange={ev => setPrice(ev.target.value)} />
                        <input type='number' placeholder={'Quantity'} onChange={ev => setQuantity(ev.target.value)} />
                        <input placeholder={'Image URL'} onChange={ev => setImage_url(ev.target.value)} />
                        <div>
                            <button onClick={()=> {nav('/products')}}>Cancel</button>
                            <button disabled={!name || !description || !price || !quantity || !image_url}>Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
    );
}

export default NewProduct;
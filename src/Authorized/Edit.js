// use put 
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditProduct = ({ products, updateProduct, setProducts, auth}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [image_url, setImage_url] = useState('');
    const [isVip, setIsVip] = useState(false)
    const nav = useNavigate();
    const {id} = useParams();
    const product = products.find((product) => product.id === id)

useEffect(() => {
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setQuantity(product.quantity);
    setImage_url(product.image_url);
    setIsVip(product.for_vip)
}, []);

useEffect(() => {
    if(name === ''){
        setName(product.name);
    }
    if(description === ''){
        setDescription(product.description);
    }
    if(price === ''){
        setPrice(product.price);
    }
    if(quantity === ''){
        setQuantity(product.quantity);
    }
    if(image_url === ''){
        setImage_url(product.image_url);
    }
}, [name, description, price, quantity, image_url, isVip]);

    const submit = async(ev)=> {
        ev.preventDefault();
        const updatedProduct = {id: id, name: name, description: description, price: price, quantity: quantity, image_url: image_url, for_vip: isVip}
        updateProduct({updatedProduct: updatedProduct, setProducts: setProducts, products: products})
        nav('/products')
    };

return (
        <div className='editContainer'>
            <div className='productContainer' style={{margin: 0}}>
                <div id='productHeader'>
                    <div>
                        <p>${price ? price : (product.price).toFixed(2)}</p>
                        <p>Qty: {quantity ? quantity : product.quantity}</p>
                    </div>
                    <div>
                        {
                            product.for_vip || isVip ? <img className='icon' src='../assets/img/vipIcon.svg'/> : null
                        }
                    </div>
                </div>
                <div id='productImage'>
                    <img src={image_url ? image_url : product.image_url}/>
                </div>
                <div id='productFooter'>
                    <Link to={`/products/${product.id}`}>
                        { name ? (name.length <= 15 ? name : name.slice(0, 15) + '...') : (product.name.length <= 15 ? product.name : product.name.slice(0, 15) + '...')}
                    </Link>
                </div>
            </div>
            <div className='formContainer'>
                <form className='editForm' onSubmit={ submit }>
                    <input placeholder={'Name: ' + product.name} onChange={ev => setName(ev.target.value)} />
                    <input contentEditable="true" placeholder={'Description: ' + product.description} onChange={ev => setDescription(ev.target.value)} />
                    <input type='number' placeholder={'Price: $' + (product.price).toFixed(2)} onChange={ev => setPrice(ev.target.value)} />
                    <input type='number' placeholder={'Quantity: ' + product.quantity} onChange={ev => setQuantity(ev.target.value)} />
                    <input placeholder={'Image URL: ' + product.image_url} onChange={ev => setImage_url(ev.target.value)} />
                    { auth.is_admin ?
                    <div className='toggleButtons'>
                        <button style={isVip === true ? {borderColor: 'orange'} : null} type='button' onClick={ ()=> isVip === false ? setIsVip(true) : setIsVip(false)}>VIP</button>
                    </div> 
                    : null}
                    <div>
                        <button onClick={()=> {nav('/products')}}>Cancel</button>
                        <button disabled={ name === product.name && description === product.description && price === product.price && quantity === product.quantity && image_url === product.image_url && product.for_vip === isVip}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProduct;
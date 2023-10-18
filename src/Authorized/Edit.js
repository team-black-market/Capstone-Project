import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../api';

const EditProduct = ({ products, updateProduct, setProducts, auth, productTags, addProductTags, editProductTags}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [image_url, setImage_url] = useState('');
    const [isVip, setIsVip] = useState(false)
    const [isWeapon, setIsWeapon] = useState(false)
    const [isAccessory, setIsAccessory] = useState(false)
    const [isMaterial, setIsMaterial] = useState(false)
    const [isSuit, setIsSuit] = useState(false)
    const [isSubstance, setIsSubstance] = useState(false)
    const [isVehicle, setIsVehicle] = useState(false)
    const [isUnique, setIsUnique] = useState(false)
    const nav = useNavigate();
    const {id} = useParams();
    const product = products.find((product) => product.id === id)
    const p_tags = productTags.find((productTag) => productTag.product_id === product.id)

    useEffect(() => {
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setQuantity(product.quantity);
        setImage_url(product.image_url);
        setIsVip(product.for_vip)
    }, [product]);

    useEffect(()=> {
        if(p_tags){
            setIsWeapon(p_tags.is_weapon)
            setIsAccessory(p_tags.is_accessory)
            setIsMaterial(p_tags.is_material)
            setIsSuit(p_tags.is_suit)
            setIsSubstance(p_tags.is_substance)
            setIsVehicle(p_tags.is_vehicle)
            setIsUnique(p_tags.is_unique)
        }
    }, [p_tags])

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

const create = async(ev)=> {
    ev.preventDefault();
    const updatedProduct = {id: id, name: name, description: description, price: price, quantity: quantity, image_url: image_url, for_vip: isVip}
    updateProduct({updatedProduct: updatedProduct, setProducts: setProducts, products: products})
    const tags = {product_id: product.id, is_Weapon: isWeapon, is_Accessory: isAccessory, is_Material: isMaterial, is_Suit: isSuit, is_Substance: isSubstance, is_Unique: isUnique, is_Vehicle: isVehicle}
    addProductTags(tags)
    nav('/products')
};

const edit = async(ev)=> {
    ev.preventDefault();
    const updatedProduct = {id: id, name: name, description: description, price: price, quantity: quantity, image_url: image_url, for_vip: isVip}
    updateProduct({updatedProduct: updatedProduct, setProducts: setProducts, products: products})
    const tags = {id: p_tags.id, product_id: product.id, is_Weapon: isWeapon, is_Accessory: isAccessory, is_Material: isMaterial, is_Suit: isSuit, is_Substance: isSubstance, is_Unique: isUnique, is_Vehicle: isVehicle}
    editProductTags(tags)
    nav('/products')
}

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
                            isVip ? <img className='icon' src='../assets/img/vipIcon.svg'/> : null
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
                <form className='editForm' onSubmit={ p_tags ? edit : create }>
                    <input placeholder={'Name: ' + product.name} onChange={ev => setName(ev.target.value)} />
                    <input contentEditable="true" placeholder={'Description: ' + product.description} onChange={ev => setDescription(ev.target.value)} />
                    <input type='number' placeholder={'Price: $' + (product.price).toFixed(2)} onChange={ev => setPrice(ev.target.value)} />
                    <input type='number' placeholder={'Quantity: ' + product.quantity} onChange={ev => setQuantity(ev.target.value)} />
                    <input placeholder={'Image URL: ' + product.image_url} onChange={ev => setImage_url(ev.target.value)} />
                    { auth.is_admin ?
                    <>
                    <h1 style={{textAlign: 'center', marginBottom: '0.5em', fontSize: '3em'}}>Tags</h1>
                        <div className='toggleButtons'>
                            <button style={isVip === true ? {borderColor: 'orange', color: 'orange'} : null} type='button' onClick={ ()=> isVip === false ? setIsVip(true) : setIsVip(false)}>VIP</button>
                            <button style={isWeapon === true ? {borderColor: 'orange', color: 'orange'} : null} type='button' onClick={ ()=> isWeapon === false ? setIsWeapon(true) : setIsWeapon(false)}>Weapon</button>
                            <button style={isAccessory === true ? {borderColor: 'orange', color: 'orange'} : null} type='button' onClick={ ()=> isAccessory === false ? setIsAccessory(true) : setIsAccessory(false)}>Accessory</button>
                            <button style={isMaterial === true ? {borderColor: 'orange', color: 'orange'} : null} type='button' onClick={ ()=> isMaterial === false ? setIsMaterial(true) : setIsMaterial(false)}>Material</button>
                            <button style={isSuit === true ? {borderColor: 'orange', color: 'orange'} : null} type='button' onClick={ ()=> isSuit === false ? setIsSuit(true) : setIsSuit(false)}>Suit</button>
                            <button style={isSubstance === true ? {borderColor: 'orange', color: 'orange'} : null} type='button' onClick={ ()=> isSubstance === false ? setIsSubstance(true) : setIsSubstance(false)}>Substance</button>
                            <button style={isVehicle === true ? {borderColor: 'orange', color: 'orange'} : null} type='button' onClick={ ()=> isVehicle === false ? setIsVehicle(true) : setIsVehicle(false)}>Vehicle</button>
                            <button style={isUnique === true ? {borderColor: 'orange', color: 'orange'} : null} type='button' onClick={ ()=> isUnique === false ? setIsUnique(true) : setIsUnique(false)}>Unique</button>
                        </div>
                        <hr style={{border: '1px solid white', margin: '0.5em 0 1em 0'}}/>
                    </>
                    : null}
                    <div>
                        <button onClick={()=> {nav('/products')}}>Cancel</button>
                        <button>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProduct;
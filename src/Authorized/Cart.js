import React, { useState } from 'react';//added useState

const Cart = ({ updateOrder, removeFromCart, lineItems, cart, products })=> {
//built in function to take in address
  const newAddress = {};
  const addAddress = ()=> {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
  

  function submit(ev){
    ev.preventDefault()
    newAddress = {
        address, city, state, zip
    }
}
//CALL NEEDED?
return (
    <form id="shipping" onSubmit={ submit }>
      <h4>Please Add Shipping Address</h4>
        <label for="address">Street Address</label>
        <input type="text" id="address" value={ address } 
        onChange={(ev)=>setAddress(ev.target.value)}/>
        
        <label for="city">City</label>
        <input type="text" id="city" value={ city } onChange={(ev)=>setCity(ev.target.value)} />
        
        <label for="state">State</label>
        <input type="text" id="state" value={ state } onChange={(ev)=>setState(ev.target.value)}/>
    
        <label for="zip">ZIP</label>
        <input type="text" id="zip" value={ zip } onChange={(ev)=>setZip(ev.target.value)}/>

        <button>Submit Shipping Address</button>
    </form>

)}
addAddress(newAddress);//I want to call this somewhere else, but it's not working somewhere else
let total = 0;
  return (
    <div>
      <h2>Cart</h2>
      <ul>
     
        {
          lineItems.filter(lineItem=> lineItem.order_id === cart.id).map( lineItem => {
            const product = products.find(product => product.id === lineItem.product_id) || {};
            total += product.price * lineItem.quantity

            return (
              <li key={ lineItem.id }>
                { product.name }
                ({ lineItem.quantity })
                <button onClick={ ()=> removeFromCart(lineItem)}>Remove From Cart</button>
              </li>
            );
          })
        }
      </ul>
      {`Your total is $${(total/100).toFixed(2)}`} 
      <br />
      {`Shipping to: ${ (newAddress) }`}
      <br />
      {
        lineItems.filter(lineItem => lineItem.order_id === cart.id ).length ? <button onClick={ ()=> {
          updateOrder({...cart, is_cart: false }); }}>Create Order</button>: null
      }
      
    </div>
  );
};

export default Cart;

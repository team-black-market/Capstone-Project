import React, { useState } from 'react';//added useState

const Cart = ({ updateOrder, removeFromCart, lineItems, cart, products, updateLineItem, minusLineItem })=> {
  let total = 0;


//built in function to take in address
  const newAddress = { address, city, state, zip };
  const addAddress = ()=> {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
  

 // function submit(ev){
   // ev.preventDefault()
   // newAddress = {
    //    address, city, state, zip
   // }
//}

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
const addShipTo = addAddress(newAddress);

    return (
      <div>
        <h2>Cart</h2>
        { addShipTo }
        <ul>
          {
            lineItems.filter(lineItem=> lineItem.order_id === cart.id).map( lineItem => {
              const product = products.find(product => product.id === lineItem.product_id) || {};
              total += product.price * lineItem.quantity
  
  
              return (
                <li key={ lineItem.id }>
                  { product.name }
                  ({ lineItem.quantity })
                  <button onClick={lineItem.quantity === 1 ? () => removeFromCart(lineItem) : () => minusLineItem(lineItem)}>
                    -
                  </button>
                  <button onClick={ lineItem.quantity < product.quantity ? () => updateLineItem(lineItem): null}>
                    +
                  </button>
                  <button onClick={ ()=> removeFromCart(lineItem)}>Remove From Cart</button>
                </li>
              );
            })
          }
        </ul>
        {total !== 0.00 ? `Your total is $${(total/100).toFixed(2)}` : 'Your cart is empty!'}
        <br />
        {
          lineItems.filter(lineItem => lineItem.order_id === cart.id ).length ? <button onClick={()=> {
            updateOrder({...cart, is_cart: false });
          }}>Create Order</button>: null
        }
      </div>
    );
  };
  
  export default Cart;

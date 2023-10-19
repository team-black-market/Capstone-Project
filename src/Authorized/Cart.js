import React from 'react';

const Cart = ({ updateOrder, removeFromCart, lineItems, cart, products, updateLineItem, minusLineItem })=> {
let total = 0;

  return (
    <div className="cart">
      <h2 className="cart-title"><center>Shopping Cart</center></h2>
      <ul>
        {
          lineItems.filter(lineItem=> lineItem.order_id === cart.id).map( lineItem => {
            const product = products.find(product => product.id === lineItem.product_id) || {};
            total += product.price * lineItem.quantity
            return (
              <li key={ lineItem.id } className="cart-list-item">
                { product.name }
                ({ lineItem.quantity })
                <button onClick={ ()=> updateLineItem(lineItem)} disabled={(lineItem.quantity === product.quantity) ? true : false}>+</button>
                &nbsp;
                {
                  lineItem.quantity > 1 ? <button onClick={ ()=> minusLineItem(lineItem)}>-</button> 
                  : <button onClick={ ()=> removeFromCart(lineItem)}>Remove from cart?</button>
                }
              </li>
            );
          })
        }
      </ul>
      <div className="cart-total">
      {total !== 0.00 ? `Your total is $${total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}` : 'Your cart is empty!'}
      </div>
      <br />
      {
        lineItems.filter(lineItem => lineItem.order_id === cart.id ).length ? <button className="cart-create-order" onClick={()=> {
          updateOrder({...cart, is_cart: false });
        }}><center>Create Order</center></button>: null
      }
    </div>
  );
};

export default Cart;

{/* <li key={ lineItem.id }>
{ product.name }
({ lineItem.quantity })
<button onClick={()=> updateLineItem(lineItem)}>+</button>
{
  lineItem.quantity === 1 ? <button onClick={()=> removeFromCart(lineItem)}>Remove from cart?</button> : <button onClick={()=> minusLineItem(lineItem)}>-</button> 
}
</li> */}

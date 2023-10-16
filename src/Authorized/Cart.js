import React from 'react';

const Cart = ({ updateOrder, removeFromCart, lineItems, cart, products, updateLineItem, minusLineItem })=> {
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
      {total !== 0.00 ? `Your total is $${(total).toFixed(2)}` : 'Your cart is empty!'}
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

{/* <li key={ lineItem.id }>
{ product.name }
({ lineItem.quantity })
<button onClick={()=> updateLineItem(lineItem)}>+</button>
{
  lineItem.quantity === 1 ? <button onClick={()=> removeFromCart(lineItem)}>Remove from cart?</button> : <button onClick={()=> minusLineItem(lineItem)}>-</button> 
}
</li> */}

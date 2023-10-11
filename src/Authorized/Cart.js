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
                <button onClick={lineItem.quantity === 1 ? () => removeFromCart(lineItem) : null}>
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

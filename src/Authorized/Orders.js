import React from 'react';
import { Link } from 'react-router-dom';

const Orders = ({ orders, products, lineItems, cart })=> {
let total = 0
const activeOrders = orders.filter(order => !order.is_cart)
  
  return (
    <div>
        {
          activeOrders.length !== 0 ?
          <div className='orderContainer'>
            <h2 style={{fontSize: '4em'}}>Orders</h2>
            {
              activeOrders.map( order => {
                const orderLineItems = lineItems.filter(lineItem => lineItem.order_id === order.id);
                return (
                  <div className='orderSubcontainer' key={ order.id }>
                    <p style={{textAlign: 'center', textShadow: '0 1px 0 white'}}><b>Your order from { new Date(order.created_at).toLocaleString()}</b></p>
                      {
                        orderLineItems.map( lineItem => {
                          const product = products.find(product => product.id === lineItem.product_id);
                            total += product.price * lineItem.quantity
                          return (
                            <div className='order' key={ lineItem.id }>
                              <p>${total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} for</p>
                              &nbsp;
                              <Link to={`/products/${product.id}`}>{product.name}</Link>
                            </div>
                          );
                        })
                      }
                  </div>
                );
              })
            }
          </div>
          : 
          <div className='noListDiv'>
            <h2>Uh oh! Looks like there's nothing here!</h2>
            <Link style={{fontSize: '2.5em', marginBottom: '1em'}} to='/products'>Click here to get started!</Link>
            <img src='../assets/img/writingIcon.svg'/>
          </div>
        }
    </div>
  );
};

export default Orders;

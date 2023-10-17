import React from 'react';

const Orders = ({ orders, products, lineItems, cart })=> {
let total = 0
  
  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {
          orders.filter(order => !order.is_cart).map( order => {
            const orderLineItems = lineItems.filter(lineItem => lineItem.order_id === order.id);
            return (
              <li key={ order.id }>
                ({ new Date(order.created_at).toLocaleString() })
                <ul>
                  {
                    orderLineItems.map( lineItem => {
                      const product = products.find(product => product.id === lineItem.product_id);
                        total += product.price * lineItem.quantity
                      return (
                        <li key={ lineItem.id }>
                          { product ? product.name: '' }<br/>
                          <ul>Total: ${total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</ul><br/>
                        </li>
                      );
                    })
                  }
                </ul>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Orders;

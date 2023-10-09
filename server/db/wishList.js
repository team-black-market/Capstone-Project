const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const fetchWishItems = async(userId)=> {
  const SQL = `
    SELECT wish_items.* 
    FROM
    products
  `;
  const response = await client.query(SQL, [ userId ]);
  return response.rows;
};

const ensureWish = async(wishItem)=> {
  let wishId = wishItem.order_id;
  if(!wishId){
    const SQL = `
      SELECT wish_id 
      FROM products 
      WHERE id = $1 
    `;
    const response = await client.query(SQL, [wishItem.id]);
    wishId = response.rows[0].wish_id;
  }
  const SQL = `
    SELECT * 
    FROM products
    WHERE id = $1 
  `;
  const response = await client.query(SQL, [wishId]);
};
const updateWishItem = async(wishItem)=> {
  await ensureWish(wishItem);
  SQL = `
    UPDATE wish_items
    SET quantity = $1
    WHERE id = $2
    RETURNING *
  `;
  const response = await client.query(SQL, [wishItem.quantity, wishItem.id]);
  return response.rows[0];
};

const createWishItem = async(wishItem)=> {
  await ensureWish(wishItem);
  const SQL = `
  INSERT INTO wish_items (product_id, id) VALUES($1, $2) RETURNING *
`;
 response = await client.query(SQL, [ wishItem.product_id, uuidv4()]);
  return response.rows[0];
};

const deleteWishItem = async(wishItem)=> {
  await ensureWish(wishItem);
  const SQL = `
    DELETE from wish_items
    WHERE id = $1
  `;
  await client.query(SQL, [wishItem.id]);
};

/*const updateOrder = async(order)=> {
  const SQL = `
    UPDATE orders SET is_cart = $1 WHERE id = $2 RETURNING *
  `;
  const response = await client.query(SQL, [order.is_cart, order.id]);
  return response.rows[0];
};

const fetchOrders = async(userId)=> {
  const SQL = `
    SELECT * FROM orders
    WHERE user_id = $1
  `;
  let response = await client.query(SQL, [ userId ]);
  const cart = response.rows.find(row => row.is_cart);
  if(!cart){
    await client.query(`
      INSERT INTO orders(is_cart, id, user_id) VALUES(true, $1, $2)
      `,
      [uuidv4(), userId]
    ); 
    response = await client.query(SQL, [ userId ]);
    return response.rows;
    //return fetchOrders(userId);
  }
  return response.rows;
};*/

module.exports = {
  fetchWishItems,
  createWishItem,
  updateWishItem,
  deleteWishItem
};
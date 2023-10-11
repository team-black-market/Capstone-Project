const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const fetchWishItems = async(user_id)=> {
  const SQL = `
  SELECT wish_items.* 
  FROM wish_items
  JOIN products
  ON products.id = wish_items.product_id
  JOIN users
  ON users.id = wish_items.user_id
  WHERE users.id = $1
  ORDER BY product_id
  `;
  const response = await client.query(SQL, [ user_id ]);
  return response.rows;
};

const createWishItem = async({user_id, product_id})=> {
  const SQL = `
  INSERT INTO wish_items (id, user_id, product_id) VALUES($1, $2, $3) 
  RETURNING *
`;
  const response = await client.query(SQL, [ uuidv4(), user_id, product_id]);
  return response.rows[0];
};

const deleteWishItem = async(user_id, id)=> {
  const SQL = `
    DELETE FROM wish_items
    WHERE user_id = $1 AND id = $2
  `;
  await client.query(SQL, [user_id, id]);
};

module.exports = {
  fetchWishItems,
  createWishItem,
  deleteWishItem
};
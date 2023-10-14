const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const fetchProducts = async()=> {
  const SQL = `
    SELECT *
    FROM products
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const createProduct = async(product)=> {
  const SQL = `
    INSERT INTO products (id, name, price, description, quantity, image_url, for_vip) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *
  `;
  const response = await client.query(SQL, [uuidv4(), product.name, product.price, product.description, product.quantity, product.image_url, product.for_vip]);
  return response.rows[0];
};

const updateProduct = async(product)=> {
  try {
    const SQL = `
      UPDATE products SET name = $2, price = $3, description = $4, quantity = $5, image_url = $6 WHERE id = $1 RETURNING *
    `;
    const response = await client.query(SQL, [product.id, product.name, product.price, product.description, product.quantity, product.image_url]);
    return response.rows[0];
  } catch (error) {
    console.log(error)
  }
};

module.exports = {
  fetchProducts,
  createProduct,
  updateProduct
};

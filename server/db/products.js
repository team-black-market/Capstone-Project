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
    INSERT INTO products (id, name, price, description, quantity, image_url, for_vip, userId , is_weapon, is_unique, is_accessory, is_material, is_suit, is_substance, is_vehicle) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *
  `;
  const response = await client.query(SQL, [uuidv4(), product.name, product.price, product.description, product.quantity, product.image_url, product.for_vip, product.userId, product.is_weapon, product.is_unique, product.is_accessory, product.is_material, product.is_suit, product.is_substance, product.is_vehicle]);
  return response.rows[0];
};

const updateProduct = async(product)=> {
  try {
    const SQL = `
      UPDATE products SET name = $2, price = $3, description = $4, quantity = $5, image_url = $6, for_vip = $7, is_weapon = $8, is_unique = $9, is_accessory = $10, is_material = $11, is_suit = $12, is_substance = $13, is_vehicle = $14 WHERE id = $1 RETURNING *
    `;
    const response = await client.query(SQL, [product.id, product.name, product.price, product.description, product.quantity, product.image_url, product.for_vip, product.is_weapon, product.is_unique, product.is_accessory, product.is_material, product.is_suit, product.is_substance, product.is_vehicle]);
    return response.rows[0];
  } catch (error) {
    console.log(error)
  }
};

const deleteProduct = async(product)=> {
  try {
    const SQL = `
      UPDATE products SET is_active = false WHERE id = $1
    `;
    await client.query(SQL, [product.id]);
  } catch (error) {
    console.log(error)
  }
};
module.exports = {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
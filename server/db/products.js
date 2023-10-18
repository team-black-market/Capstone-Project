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
    INSERT INTO products (id, name, price, description, quantity, image_url, for_vip, userId) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
  `;
  const response = await client.query(SQL, [uuidv4(), product.name, product.price, product.description, product.quantity, product.image_url, product.for_vip, product.userId]);
  return response.rows[0];
};

const updateProduct = async(product)=> {
  try {
    const SQL = `
      UPDATE products SET name = $2, price = $3, description = $4, quantity = $5, image_url = $6, for_vip = $7 WHERE id = $1 RETURNING *
    `;
    const response = await client.query(SQL, [product.id, product.name, product.price, product.description, product.quantity, product.image_url, product.for_vip]);
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

const fetchProductTags = async()=> {
  const SQL = `
    SELECT *
    FROM product_tags
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const addProductTags = async(tags)=> {
  const SQL = `
    INSERT INTO product_tags(id, product_id, is_weapon, is_unique, is_accessory, is_material, is_suit, is_substance, is_vehicle)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) 
    RETURNING *
  `;
  const response = await client.query(SQL, [ uuidv4(), tags.product_id, tags.is_Weapon, tags.is_Unique, tags.is_Accessory, tags.is_Material, tags.is_Suit, tags.is_Substance, tags.is_Vehicle]);
  return response.rows;
} 

module.exports = {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchProductTags,
  addProductTags
};
const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const fetchReviews = async()=> {
    const SQL = `
      SELECT *
      FROM reviews
    `;
    const response = await client.query(SQL);
    return response.rows;
  };

const createReview = async(review)=> {
    const SQL = `
    INSERT INTO reviews (id, title, description, stars, productId) VALUES($1, $2, $3, $4, $5) RETURNING *
    `;
    const response = await client.query(SQL, [ uuidv4(), review.title, review.description, review.stars, review.productId]);
    return response.rows[0];
  };

module.exports = {
    fetchReviews,
    createReview
};
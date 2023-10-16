const client = require('./client');

const {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require('./products');

const {
  fetchReviews,
  createReview
} = require('./reviews');

const {
  createUser,
  updateUser,
  updatePass,
  authenticate,
  findUserByToken
} = require('./auth');

const {
  fetchLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  fetchOrders
} = require('./cart');

const {
  fetchWishItems,
  createWishItem,
  deleteWishItem
} = require('./wishList')


const seed = async()=> {
  const SQL = `
    DROP TABLE IF EXISTS product_tags;
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS wish_items;
    DROP TABLE IF EXISTS line_items;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;

    CREATE TABLE users(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      is_admin BOOLEAN DEFAULT false,
      is_vip BOOLEAN DEFAULT false
    );

    CREATE TABLE products(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      name VARCHAR(100) UNIQUE NOT NULL,
      price INTEGER,
      description TEXT,
      quantity INTEGER,
      is_active BOOLEAN DEFAULT TRUE,
      image_url VARCHAR(255),
      for_vip BOOLEAN DEFAULT false
    );

    CREATE TABLE orders(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      is_cart BOOLEAN NOT NULL DEFAULT true,
      user_id UUID REFERENCES users(id) NOT NULL
    );

    CREATE TABLE reviews(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      title VARCHAR(100) UNIQUE NOT NULL,
      description TEXT,
      stars INT,
      productId UUID REFERENCES products(id) NOT NULL
    );

    CREATE TABLE line_items(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      product_id UUID REFERENCES products(id) NOT NULL,
      order_id UUID REFERENCES orders(id) NOT NULL,
      quantity INTEGER DEFAULT 1,
      CONSTRAINT product_and_order_key UNIQUE(product_id, order_id)
    );

    CREATE TABLE wish_items(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      product_id UUID REFERENCES products(id) NOT NULL,
      user_id UUID REFERENCES users(id) NOT NULL,
      CONSTRAINT user_and_product_key UNIQUE(user_id, product_id)
    );

    CREATE TABLE product_tags(
      id UUID PRIMARY KEY,
      product_id UUID REFERENCES products(id) NOT NULL,
      is_weapon BOOLEAN DEFAULT false,
      is_unique BOOLEAN DEFAULT false,
      is_accessory BOOLEAN DEFAULT false,
      is_material BOOLEAN DEFAULT false,
      is_suit BOOLEAN DEFAULT false,
      is_substance BOOLEAN DEFAULT false,
      is_vehicle BOOLEAN DEFAULT false
    );
  `;
  await client.query(SQL);

  const [moe, lucy, ethyl] = await Promise.all([
    createUser({ username: 'moe', password: '1234', is_admin: false, is_vip: false}),
    createUser({ username: 'lucy', password: '1234', is_admin: false, is_vip: true}),
    createUser({ username: 'ethyl', password: '1234', is_admin: true, is_vip: true})
  ]);

  const [foo, bar, bazz] = await Promise.all([
    //add vip item
    createProduct({ name: 'The Batmobile', price:100000000, description:'The infamous mode of transportation for one of the most prestigious heroes in Gotham, Batman!', quantity: 1, image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmfDSHF5eotCiwTQbfT981MuXDn5G66tiT3TfPNU-F2iGizWRproABlsU16ygzkeDCMHs&usqp=CAU', for_vip: true }),
    createProduct({ name: 'The Lasso of Truth', price:265000, description:'A weapon wielded by none other than Wonder Woman herself!', quantity: 1, image_url: 'https://www.therpf.com/forums/attachments/lasso-jpg.1332542/', for_vip: true }),
    createProduct({ name: 'The Mark I', price:1998500, description:'The first suit ever designed and created by Tony Stark. One of a kind.', quantity: 1, image_url: 'https://media.sketchfab.com/models/57b18282c1a84c5899fcc7f67762a386/thumbnails/256649c3628f4a27ba26b4f28f6f5d6d/a3a7c33dabb64747953debf50e283685.jpeg', for_vip: true }),
    createProduct({ name: 'Baby Picture of Morgan Freeman', price:9004, description:'A rare sight none have seen before. A youthful picture of the age defying legend!', quantity:2, image_url: 'https://i.ytimg.com/vi/3F4i6fcLWIA/hqdefault.jpg', for_vip: false }),
    createProduct({ name: 'The Trident of Neptune', price:676900, description:'The weapon of choice of aquatic demigods. One of a kind.', quantity: 1, image_url: 'https://m.media-amazon.com/images/I/71OyzgTdl9L._UF1000,1000_QL80_.jpg', for_vip: false }),
    createProduct({ name: 'Kryptonite', price:10500500, description:'All you will ever need to be more powerful than Superman.', quantity: 1, image_url: 'https://www.syfy.com/sites/syfy/files/2021/12/gettyimages-886851320.jpg', for_vip: false }),
    createProduct({ name: 'Power Ring', price:600, description:'For the justice fighter on a budget.', quantity: 1, image_url: 'https://m.media-amazon.com/images/I/71DnkGb6aJL._AC_UY1000_.jpg', for_vip: false }),
    createProduct({ name: 'Sunblade', price:770660, description:'The most powerful weapon you have never heard of.', quantity: 1, image_url: 'https://static.displate.com/857x1200/displate/2020-04-16/efe7e21a54155ea7fda02f78d401d031_772a9c614abdd596d330932afe4271cc.jpg', for_vip: false }),
    createProduct({ name: 'Spidermans Web Shooters', price:3000, description:'This is spiderman\'s web gadget used on his wrist. Each purchase comes with 10 reloads of premade web fluid.', quantity: 4, image_url: 'https://i.pinimg.com/550x/a4/29/d3/a429d3d5410d417ae86b38c2d1af5e79.jpg', for_vip: false }),
    createProduct({ name: 'Thors Hammer', price:100, description:'Our cheapest item. We can provide you the coordinates once paid. Delivery is not an option because none of the team members are worthy. Good luck trying to pick this up yourself.', quantity: 1, image_url: 'https://media.printables.com/media/prints/292790/images/2572161_3c320593-2113-4ace-9767-47d31f0ef12d/thumbs/cover/1200x630/jpg/img_5334.jpg', for_vip: false }),
  ]);

  await Promise.all([
    createReview({ title: 'stinky', description: 'poo poo', stars: 2, productId: foo.id})
  ]);

  await Promise.all([
    createWishItem({ user_id: ethyl.id, product_id: foo.id}),
    createWishItem({ user_id: ethyl.id, product_id: bazz.id})
  ]);

  let orders = await fetchOrders(ethyl.id);
  let cart = orders.find(order => order.is_cart);
  let lineItem = await createLineItem({ order_id: cart.id, product_id: foo.id});
  lineItem.quantity++;
  await updateLineItem(lineItem);
  lineItem = await createLineItem({ order_id: cart.id, product_id: bar.id});
  cart.is_cart = false;
  await updateOrder(cart);
};

module.exports = {
  fetchProducts,
  fetchOrders,
  fetchLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  updateUser,
  updatePass,
  authenticate,
  findUserByToken,
  fetchWishItems,
  createWishItem,
  deleteWishItem,
  seed,
  createProduct,
  createUser,
  fetchReviews,
  createReview,
  updateProduct,
  deleteProduct,
  client
};

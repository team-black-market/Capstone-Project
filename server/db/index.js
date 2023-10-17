const client = require('./client');

const {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchProductTags
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
  createAddress,
  fetchAddresses
} = require('./address');

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
    DROP TABLE IF EXISTS addresses;
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

    CREATE TABLE addresses(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      data JSON DEFAULT '{}',
      user_id UUID REFERENCES users(id) NOT NULL
    );
    
    CREATE TABLE products(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      name VARCHAR(100) NOT NULL,
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

  await createAddress({ user_id: moe.id, data: { formatted_address: '1010 Downing Ave'}});
  await createAddress({ user_id: moe.id, data: { formatted_address: '2020 Vision St'}});
  await createAddress({ user_id: moe.id, data: { formatted_address: '907 S Peters St'}});

  const [foo, bar, bazz] = await Promise.all([
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
    createProduct({ name: 'Adamantium', price:10500000, description:'Unbreakable, unbeatable, unstoppable.', quantity: 3, image_url: 'https://vignette.wikia.nocookie.net/marveldatabase/images/a/a5/Astonishing_X-Men_Vol_3_1_Textless.jpg/revision/latest?cb=20080601124741', for_vip: true }),
    createProduct({ name: 'Invisible Jet', price:350000, description:'It is there, I promise.', quantity: 1, image_url: 'https://imgix-media.wbdndc.net/cms/filer_public/78/49/78491075-33ed-49db-820b-29bca8aa6f19/191021_wwjet-header-hero-marqueehero.jpg', for_vip: false }),
    createProduct({ name: 'Gauntlet', price:50000, description:'Stylish accessory to accomodate any fashion choice, with settings for decorative gemstones', quantity: 1, image_url: 'https://img-new.cgtrader.com/items/2110172/b95a5094f2/infinity-gauntlet-3d-model-obj-mtl.jpg', for_vip: false }),
    createProduct({ name: 'Circus Hammer', price:10, description:'People have speculated that you could fight Superman with this thing.  Those people are clowns.', quantity: 10, image_url: 'https://i.pinimg.com/originals/7c/d8/06/7cd8066da09073f351f8b3331ae6a7d5.jpg', for_vip: false }),
    createProduct({ name: 'Cloak of Invisibility', price:4000, description:'60% of the time, it works every time.', quantity: 1, image_url: 'https://i.pinimg.com/originals/42/90/66/4290666c9cf783195aaa576bf2e52691.jpg', for_vip: false }),
    createProduct({ name: 'Asgardian Scepter', price:80000, description:'Like new.  You do not have to be a god to wield it, but it helps.', quantity: 1, image_url: 'https://i.pinimg.com/originals/62/02/4d/62024d912e2688a6f128e1fe65ca2991.jpg', for_vip: true }),
    createProduct({ name: 'Cape', price:7, description:'Just cape.', quantity: 1, image_url: 'https://images.halloweencostumes.co.uk/products/54333/1-1/adult-blue-superhero-cape.jpg', for_vip: false }),
    createProduct({ name: 'Robin\'s Grappling Gun', price:30, description:'Nicknamed the Bat rope, the Grappling Gun is a hand-held device that can fire a grappling hook across far distances!', quantity: 1, image_url: 'https://files.cults3d.com/uploaders/5620755/illustration-file/4901b22c-6e58-425a-8162-d973ab0cf12c/render.JPG', for_vip: false }),
    createProduct({ name: 'Batarang\'s', price:15, description:'Batman\s iconic batarangs!', quantity: 6, image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGktTTiH3-ThjblBbTpV9miuPmnin9wZFHow&usqp=CAU', for_vip: false }),
    createProduct({ name: 'Vibranium', price:100000000, description:'A piece of the very rare metal Vibranium.', quantity: 1, image_url: 'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/1/17/Vibranium_in_Hand.jpg', for_vip: true }),
    createProduct({ name: 'Starlord\'s Old Helmet', price:25000000, description:'An old school helmet from the legend himself. Best as a collector\'s item.', quantity: 1, image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQABVztO4uhES5RcH9-FUyfwganskdzw6Ff5A&usqp=CAU', for_vip: false }),
    createProduct({ name: 'Catwoman\'s Whip', price:100, description:'A lost companion.', quantity: 1, image_url: 'https://www.heavencostumes.com.au/media/catalog/product/cache/0af21d88f990463ba047d7bbbbb4e2b1/l/o/long-black-whip-costume-weapon-accessory-int-ya30blk.jpg', for_vip: false }),
    createProduct({ name: 'The Flash\'s Lightning bolt', price:10000, description:'With advanced technology I was able to capture one of the flash\'s lightnig bolts!', quantity: 1, image_url: 'https://media.istockphoto.com/id/157166346/photo/lightning-bottle.jpg?s=612x612&w=0&k=20&c=x6mRtAudFKrfOCmBGm02OYYZKqfyu2e9YOWS_ay5lqE=', for_vip: false }),
    createProduct({ name: 'Jarvis Recreation', price:340000000, description:'After getting my hands on some of Iron Man\'s gadgets, I was able to create a copy of Jarvis, Iron Man\'s trusted AI companion!', quantity: 1, image_url: 'https://static.wikia.nocookie.net/marvelmovies/images/0/06/J.A.R.V.I.S..jpg', for_vip: true }),
    createProduct({ name: 'Amulet of Agamotto', price:99999999, description:'Stolen from Dr. Strange himself.', quantity: 1, image_url: 'https://m.media-amazon.com/images/I/61YPp496lzL._AC_UY1000_.jpg', for_vip: false }),
    createProduct({ name: 'Trident of Neptune', price:50000, description:'Aquaman\s trident waiting to be weld again!', quantity: 1, image_url: 'https://i.etsystatic.com/19286482/r/il/e7fdc9/2098298360/il_fullxfull.2098298360_21ur.jpg', for_vip: false }),
    createProduct({ name: 'Green Arrow\s bow and arrows', price:500000, description:'Looking to get 500k for the whole set. A great collectors item.', quantity: 1, image_url: 'https://i.etsystatic.com/19083621/r/il/cf5cfb/3404353711/il_600x600.3404353711_gvkf.jpg', for_vip: false }),
    createProduct({ name: 'Silver Surfer\'s Surfboard', price:60000, description:'Imagine actually surfing with this thing dude! You could brag to your friends so much!', quantity: 1, image_url: 'https://i.ebayimg.com/images/g/0I0AAOSwTxNkG4MF/s-l1600.jpg', for_vip: false }),
    createProduct({ name: 'The Hulk\s Ripped Shorts', price:50000, description:'Don\'t ask, just buy.', quantity: 1, image_url: 'https://marveltoynews.com/wp-content/uploads/2013/09/20130925-161754-e1380141660704.jpg', for_vip: false }),
    createProduct({ name: 'Raphael\'s Sai', price:5000, description:'The Teenage Mutant Ninja Turtle, Raphael\'s Sai\'s!', quantity: 2, image_url: 'https://static.wikia.nocookie.net/tmnt/images/c/ca/Sai.jpg', for_vip: false }),
    createProduct({ name: 'Scorption\s Kunai', price:7, description:'Straight from one of Scorpion\'s frosty opponents.', quantity: 1, image_url: 'https://cdna.artstation.com/p/assets/images/images/038/430/292/4k/eric-newgard-img-0970-small.jpg?1623082656', for_vip: false }),
    createProduct({ name: 'Carbonadium Katana', price:30000000, description:'Carbonadium is nearly as strong as adamantium, but more flexible. It emits toxic radiation and can impede superhuman healing factors.', quantity: 1, image_url: 'https://www.hsbladesent.com/cdn/shop/products/AAA_9834-1-510x340_jpg.webp?v=1648841051', for_vip: true }),
  ]);

  await Promise.all([
    createReview({ title: 'stinky', description: 'poo poo', stars: 2, productId: foo.id})
  ]);

  await Promise.all([
    createWishItem({ user_id: ethyl.id, product_id: foo.id}),
    createWishItem({ user_id: ethyl.id, product_id: bazz.id})
  ]);

  await Promise.all([
    fetchProductTags({user_id: ethyl.id})
  ])

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
  fetchAddresses,
  createAddress,
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
  fetchProductTags,
  client
};

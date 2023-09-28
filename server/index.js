const {
  seed,
  client,
} = require('./db');
const app = require('./app');

const init = async()=> {
  await client.connect();
  console.log('connected to database');
  await seed();
  console.log('create your tables and seed data');

  const port = process.env.PORT || 3000;
  app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
  });
}

init();

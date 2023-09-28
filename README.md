# the store 

- npm install
- modify connection string
- create database
- npm run start:dev
- npm run build:dev

# requirements

[ ] Show the products in ascending order by name
[ ] A product should have a price which is can be an integer (a 1 dollar item can would have a price of 100)
[ ] The price should be displayed next to the product in the products section with a currency format (an item for 100 should display a price of $1.00
[ ] A product should have a description. The description can be lengthy. The datatype should be TEXT.
[ ] The first 100 characters of the description should be shown under the product in the products section.
[ ] Show the quantity of the line items in the order section.
[ ] The total value of the cart should be shown in the cart section.
[ ] If no items are in the cart, a message should appear which states "Add some items to your cart".
[ ] A user should be able to add a new product, by entering a name, description, and price in a form in the products section.
[ ] A reviews section should be added. A review will belong to a product. A review should have a field called txt, which take a max of 255 characters. It should also have a rating field which is an INTEGER. Ratings should be from 1 to 5. (seed data for reviews)
[ ] The reviews in review section should be grouped by product.
[ ] A user should be able to increment and decrement the number of items in their carts.
[ ] The site should allow users to display each section separately.
  - /products should show products
  - /cart should show the cart
  - /orders should show the orders
  - /reviews should show the reviews 
  - /products/:id should show the full products description and the reviews for that product
[ ] Display the most popular product based on the number of times it has been sold.

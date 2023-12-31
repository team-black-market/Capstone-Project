import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api";

const Products = ({
  products,
  cartItems,
  createLineItem,
  updateLineItem,
  auth,
  wishlist,
  setWishlist,
  minusLineItem,
  removeFromCart,
  deleteProduct,
}) => {
  const [deletePrompt, setDeletePrompt] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [tagFilter, setTagFilter] = useState({})
  const navigate = useNavigate();
  const { term } = useParams();

  const setDeleteStates = (product) => {
    setDeletePrompt(true);
    setDeleteItem(product);
  };

  const searchFunction = ()=> {
    if(searchTerm !== ''){
      navigate(`/products/search/${searchTerm}`)
    } else {
      navigate(`/products`);
    }
  };

  useEffect(()=> {
    setTagFilter({
      weapon: false,
      accessory: false,
      material: false,
      suit: false,
      substance: false,
      vehicle: false,
      unique: false,
    })
  }, [])

  return (
    <div>
      {deletePrompt ? (
        <div className="deletePrompt">
          <div>
            <h1>Are you sure you want to delete this product?</h1>
            <div>
              <button
                className="deletePromptButton"
                id="deleteButton"
                onClick={() => {
                  deleteProduct(deleteItem);
                  setDeletePrompt(false);
                }}
              >
                Delete
              </button>
              <button
                className="deletePromptButton"
                onClick={() => {
                  setDeletePrompt(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div id="searchBarContainer">
        <form onSubmit={searchFunction}>
          <input
            id='searchBar'
            placeholder="Search"
            value={searchTerm || ""}
            onChange={(ev) => {
              setSearchTerm(ev.target.value);
            }}
          />
          &nbsp;&nbsp;
          <button>Search</button>
          <div className='filterByContainer'>
            <h3 style={{textAlign: 'center'}}>Sort by: </h3>
            <label>
              <input type="checkbox" onClick={(ev)=> {ev.target.checked ? setTagFilter({...tagFilter, weapon: true}) : setTagFilter({...tagFilter, weapon: false})}}/>
              &nbsp;
              Weapon
            </label>
            <label>
              <input type="checkbox" onClick={(ev)=> {ev.target.checked ? setTagFilter({...tagFilter, accessory: true}) : setTagFilter({...tagFilter, accessory: false})}}/>
              &nbsp;
              Accessory
            </label>
            <label>
              <input type="checkbox" onClick={(ev)=> {ev.target.checked ? setTagFilter({...tagFilter, material: true}) : setTagFilter({...tagFilter, material: false})}}/>
              &nbsp;
              Material
            </label>
            <label>
              <input type="checkbox" onClick={(ev)=> {ev.target.checked ? setTagFilter({...tagFilter, suit: true}) : setTagFilter({...tagFilter, suit: false})}}/>
              &nbsp;
              Suit
            </label>
            <label>
              <input type="checkbox" onClick={(ev)=> {ev.target.checked ? setTagFilter({...tagFilter, substance: true}) : setTagFilter({...tagFilter, substance: false})}}/>
              &nbsp;
              Substance
            </label>
            <label>
              <input type="checkbox" onClick={(ev)=> {ev.target.checked ? setTagFilter({...tagFilter, vehicle: true}) : setTagFilter({...tagFilter, vehicle: false})}}/>
              &nbsp;
              Vehicle
            </label>
            <label>
              <input type="checkbox" onClick={(ev)=> {ev.target.checked ? setTagFilter({...tagFilter, unique: true}) : setTagFilter({...tagFilter, unique: false})}}/>
              &nbsp;
              Unique
            </label>
          </div>
        </form>
      </div>
      <ul id="products">
        {products
          .filter(
            (product) => {
              return (!term || product.name.toLowerCase().includes(term.toLowerCase())) && 
              ((Object.keys(tagFilter).every((k) => tagFilter[k] === false)) || 
              ((product.is_weapon === tagFilter.weapon) && (product.is_accessory === tagFilter.accessory) && (product.is_material === tagFilter.material) && (product.is_suit === tagFilter.suit) && (product.is_substance === tagFilter.substance) && (product.is_vehicle === tagFilter.vehicle) && (product.is_unique === tagFilter.unique)))
            }
          )
          .map((product) => {
            const cartItem = cartItems.find(
              (lineItem) => lineItem.product_id === product.id
            );
            const favorite = wishlist.find(
              (wishItem) => wishItem.product_id === product.id
            )
            return auth.is_vip || product.userid === auth.id ? (
              <div className="productContainer" key={product.id}>
                <div id="productHeader">
                  <div>
                    <p>${(product.price).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</p>

                    <p>Qty: {product.quantity}</p>
                  </div>
                  <div>
                    {product.for_vip ? (
                      <img className="icon" src="../assets/img/vipIcon.svg" />
                    ) : null}
                    &nbsp;&nbsp;
                    {favorite ? (
                      <img
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          api.removeFromWishlist({
                            userId: auth.id,
                            wishItem: favorite,
                            setWishlist,
                            wishlist,
                          })
                        }
                        key="wishItem.id"
                        src="../assets/img/favorite.svg"
                      />
                    ) : (
                      <img
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          api.addToWishList({
                            userId: auth.id,
                            wishItem: product,
                            setWishlist,
                            wishlist,
                          })
                        }
                        key="wishItem.id"
                        src="../assets/img/notFavorite.svg"
                      />
                    )}
                    &nbsp;&nbsp;
                      <Link to={`/products/${product.id}/edit`}>
                        <img
                          className="icon"
                          src="../assets/img/editIcon.svg"
                        />
                      </Link>
                      &nbsp;&nbsp;
                      <img
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setDeleteStates(product);
                        }}
                        className="icon"
                        src="../assets/img/deleteIcon.svg"
                      />
                  </div>
                </div>
                <div id="productImage">
                  <img src={product.image_url} />
                </div>
                <div id="productFooter">
                  <Link to={`/products/${product.id}`}>
                    {product.name.length <= 30
                      ? product.name
                      : product.name.slice(0, 30) + "..."}
                  </Link>
                  {auth.id ? (
                    cartItem ? (
                      <div>
                        <button
                          onClick={() => updateLineItem(cartItem)}
                          disabled={
                            cartItem.quantity === product.quantity
                              ? true
                              : false
                          }
                        >
                          +
                        </button>
                        &nbsp;
                        {cartItem.quantity > 1 ? (
                          <button onClick={() => minusLineItem(cartItem)}>
                            -
                          </button>
                        ) : (
                          <button onClick={() => removeFromCart(cartItem)}>
                            -
                          </button>
                        )}
                      </div>
                    ) : (
                      <button onClick={() => createLineItem(product)}>
                        Add to cart
                      </button>
                    )
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="productContainer" key={product.id}>
                <div id="productHeader">
                  <div>
                    <p>${product.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</p>
                    <p>Qty: {product.quantity}</p>
                  </div>
                  <div>
                    {favorite ? (
                      <img
                        onClick={() =>
                          api.removeFromWishlist({
                            userId: auth.id,
                            wishItem: favorite,
                            setWishlist,
                            wishlist,
                          })
                        }
                        key="wishItem.id"
                        src="../assets/img/favorite.svg"
                      />
                    ) : (
                      <img
                        onClick={() =>
                          api.addToWishList({
                            userId: auth.id,
                            wishItem: product,
                            setWishlist,
                            wishlist,
                          })
                        }
                        key="wishItem.id"
                        src="../assets/img/notFavorite.svg"
                      />
                    )}
                  </div>
                </div>
                <div id="productImage">
                  <img src={product.image_url} />
                </div>
                <div id='productFooter'>
                  <Link to={`/products/${product.id}`}>
                    { product.name }
                  </Link>
                  {
                      auth.id ? (
                        cartItem ?
                        <div>
                          <button onClick={ ()=> updateLineItem(cartItem)} disabled={(cartItem.quantity === product.quantity) ? true : false}>+</button>
                          &nbsp;
                          {
                            cartItem.quantity > 1 ? <button onClick={ ()=> minusLineItem(cartItem)}>-</button> 
                            : <button onClick={ ()=> removeFromCart(cartItem)}>-</button>
                          }
                        </div>
                        : <button onClick={ ()=> createLineItem(product)}>Add to cart</button>
                      ): null 
                    }
                  {
                    auth.is_admin ? (
                      <Link to={`/products/${product.id}/edit`}>Edit</Link>
                    ): null
                  }  
                </div>
              </div>
            );
          })}
      </ul>   
    </div>
  );
};

export default Products;

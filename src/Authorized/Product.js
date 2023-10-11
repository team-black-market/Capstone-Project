import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Product = ({products, deleteLineItem})=> {
    const { id } = useParams();
    const product = products.find(product => product.id === id)
    return (
        <>
            <h1>{product.name}</h1>
            <h3>Created at: {product.created_at}</h3>
            <p>{product.description}</p>
            <img className='imageSize' src={product.image_url}></img><br/>
            <Link to="/products">Back</Link>
            {/* <button onClick={ () => deleteLineItem(product)}>Remove Product</button> */}
        </>
    )
};

export default Product
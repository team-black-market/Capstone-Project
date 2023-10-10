import React from 'react'
import {useState, useEffect } from 'react'



const Searchbar = ({products}) =>{
  const [query, setQuery] = useState('')
  const [search, setSearch] = useState('')


  const handleChange = (ev) =>{
    ev.preventDefault
    console.log(ev)
    setQuery(ev)

  }

  useEffect(() =>{
    if(query.length > 0){
   const searchQuery = products.filter((product) => {

      return product.name.match(query)

    })
    setSearch(searchQuery)
  }
  }, [query])



  return(
    <div className='searchbar'>
      <label>Search</label>
      <input type='text' onChange={ev => handleChange(ev.target.value)}
      />

      <table>
        <thead>
          <tr>
          <th>Product</th>
          <th>Price</th>
          </tr>
        </thead>

        {products.map((product, index) =>{
          return(

              <tbody key={product.id}>
                <tr>
                <td>{product.name}</td>
                <td>{product.price}</td>
                </tr>
              </tbody>

          )
})}
      </table>


    </div>
  )
}



export default Searchbar;
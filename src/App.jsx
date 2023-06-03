import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'

function App() {
  //const [count, setCount] = useState(0)
  const [searchItem, setSearchItem] = useState('')
  const [productss, setProducts] = useState([])

  //const [id, setid] = useState("")
  const [title, setTitle] = useState("")
  const [description, setdescription] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")


  // Adding New Product
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: uuid(),
      title: title,
      description: description,
      category: category,
      price: price,
    }
    fetch('https://dummyjson.com/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTransaction),
    })
      .then((resp) => resp.json())
      .then((newQuestion) => console.log(newQuestion))
    
  }

  function Search({ search, onSearchChange }) {
    return (
      <div className='ui large fluid icon input'>
        <input
          type='text'
          placeholder='Search your Recent Transactions'
          onChange={onSearchChange}
          value={search}
        />
        <i className='circular search link icon'></i>
      </div>
    )
  }


  //For deleting products
  const deleterecord = (id) => {
    fetch("https://dummyjson.com/products" + id, { method: 'DELETE' }).then((response) => response.json())
      .then((result) => {
        alert("Record deleted")
        fetchProductData()
      })
  }

  //for showing products
  const fetchProductData = () => {
    fetch("https://dummyjson.com/products")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setProducts(data.products)
      })
  }

  useEffect(() => {
    fetchProductData()
  }, [])

  //console.log(productss)
  return (
    <>
      <div>
      {productss.length > 0 && (
        <ul>
          {productss.map(product => (
            <li key={product.id}>{product.title} </li>
          ))}
        </ul>
      )}

      <h4>Add New Product</h4>
      
      <form class="book-form">
        <div class="space-y-2">
          <label for="title">Product title</label>
          <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} class="text-input" type="text" id="input-Bookname" title="title"/>
        </div>
        <div class="space-y-2">
          <label for="category">Description</label>
          <input name="description" value={description} onChange={(e) => setdescription(e.target.value)} required="" class="text-input" type="text" id="input-Bookauthor" title="description"/>
        </div>
        <div class="space-y-2">
          <label for="image">Category</label>
          <select name="category" value={category} onChange={(e) => setCategory(e.target.value)} required="" class="text-input" type="text" id="input-Bookthumbnail" title="category">
          <option value="">Select Category</option>
          <option value="electronics">electronics</option>
          <option value="jewelery">jewelery</option>
          <option value="men's clothing">men's clothing</option>
          <option value="women's clothing">women's clothing</option>
          </select>
        </div>
        
        <div class="grid grid-cols-2 gap-8 pb-4">
          <div class="space-y-2"><label for="price">Price</label>
          <input name="price" value={price} onChange={(e) => setPrice(e.target.value)} required="" class="text-input" type="number" id="input-Bookprice" title="price"/>
        </div>
        </div>
        <button onClick={handleSubmit} type="submit" class="submit" id="submit">Add Product</button>
      </form>
    </div>
    </>
  )
}

export default App

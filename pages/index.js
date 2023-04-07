import { getData } from '../utils/fetchData'
import { useState, useContext } from 'react'
import { DataContext } from '@/store/GlobalState'

import Head from 'next/head'
import ProductItem from '../components/product/ProductItem'



const Home = (props) => {
  const [products,setProducts] = useState(props.products)

  const [isCheck, setIsCheck] = useState(false)

  const {state} = useContext(DataContext)
  const {auth} = state

  const handleCheck = (id) =>{
    products.forEach(product => {
      if(product._id === id) product.checked = !product.checked
    })
    setProducts([...products])
  }

  const handleCheckALL = () => {
    products.forEach(product => product.checked = !isCheck)
    setProducts([...products])
    setIsCheck(!isCheck)
  }

  const handleDeleteAll = () => {
    let deleteArr = []
    products.forEach(product =>{
      if(product.checked) {
        deleteArr.push({ data: '', id: product._id, title: 'Deleted all selected products', type: 'DELETE_PRODUCT'})
      }
    })

    dispatch({type: 'ADD_MODAL', payload: deleteArr})
  }


  return (
    <div className='home_page'>
      <Head>
          <title>Home Page</title>
      </Head>
      {
        auth.user && auth.user.role === 'admin' &&
        <div className='delete_all btn btn-danger mt-2' style={{marginBottom: '-10px'}}>
          <input type='checkbox' checked={isCheck} onChange={handleCheckALL}
          style={{width: '20px', height: '20px', transform: 'translateY(8px)'}}/>
          <button className='btn btn-danger ml-2'
          data-bs-toggle="modal" data-bs-target="#exampleModal"
          onClick={handleDeleteAll}>
            DELETE ALL
          </button>
        </div>
      }
      <div className='products'>
        

        {
          products.length === 0 
          ? <h2>No Products</h2>
          :products.map(product => (
            <ProductItem key={product._id} product={product} handleCheck={handleCheck}/>
          ))
        }
      </div>
    </div>
    
  )
}


export async function getServerSideProps() {
  const res = await getData('product')
  return {
    props: {
      products: res.products,
      result: res.result
    }, 
  }
}

export default Home

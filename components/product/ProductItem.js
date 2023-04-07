import Link from 'next/link'
import { useContext } from 'react'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'


const ProductItem = ({product, handleCheck}) => {
    const { state, dispatch } = useContext(DataContext)
    const { cart, auth } = state

    const userLink = () => {
        return (
            <>
                <Link href={`product/${product._id}`} className="btn btn-info" style={{marginRight:'5px', flex: 1}}>
                    View
                </Link>
                <button className="btn btn-success"
                style={{marginLeft:'5px', flex: 1}}
                disabled={product.inStock === 0? true: false}
                onClick={() =>dispatch(addToCart(product, cart))}>
                    Buy
                </button>
            </>
        )
    }

    const adminLink = () => {
        return (
            <>
                <Link href={`create/${product._id}`} className="btn btn-info" style={{marginRight:'5px', flex: 1}}>
                    Edit
                </Link>
                <button className="btn btn-danger"
                style={{marginLeft:'5px', flex: 1}}
                data-bs-toggle="modal" data-bs-target="#exampleModal"
                onClick={() => dispatch({
                    type: 'ADD_MODAL',
                    payload: [{
                        data: '',
                        id: product._id,
                        title: product.title,
                        type: 'DELETE_PRODUCT'
                    }]
                })}>
                    Delete
                </button>
            </>
        )
    }


    return (
        <div className="card" style={{width: '18rem'}}>
            {
                auth.user && auth.user.role === 'admin' &&
                <input id='abc' type='checkbox' checked={product.checked}
                className='position-absolute ms-0'
                style={{background: 'red', width: '20px', height: '20px', border: 0}}
                onChange={() => handleCheck(product._id)}/>
            }
            <img src={product.images[0].url} className="card-img-top" alt={product.images[0].url}/>
            <div className="card-body">
                <h5 className="card-title text-capitalize" title={product.title}>
                    {product.title}
                </h5>
                <div className="row justify-content-between">
                    <h6 className="text-danger">${product.price}</h6>
                    {
                        product.inStock > 0
                        ?<h6 className="text-danger">In Stock: {product.inStock}</h6>
                        :<h6 className="text-danger">Out of Stock</h6>
                    }
                </div>

                <p className="card-text" title={product.description}>
                    {product.description} 
                </p>
                
                <div className="row justify-content-between mx-0">
                    {!auth.user ||auth.user.role !== 'admin' ? userLink() : adminLink()}
                </div>
            </div>
        </div>
    )
}

export default ProductItem
import auth from "@/middleware/auth"
import Link from "next/link"
import PaypalBtn from "./paypalBtn"
import { patchData } from "@/utils/fetchData"
import { updateItem } from "@/store/Actions"

const OrderDetail = ({orderDetail, state, dispatch}) => {
    const {auth, orders} = state

    const handleDelivered = (order) => {
        dispatch({type: 'NOTIFY', payload: {loading: true}})
        patchData(`order/delivered/${order._id}`, null, auth.token)
        .then(res =>{
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})

            console.log(res)
        })
    }
    return(
        <>
            {
                orderDetail.map(order => (
                <div key={order._id} style={{margin: '20px auto'}} className="d-flex justify-content-around">
                    <div className="text-uppercase my-3" style={{maxWidth: '600px'}}>
                        <h2 className="text-break">Order {order._id}</h2>
                        <div className="mt-4 text-secondary">
                            <h3>Shipping</h3>
                            <p>Name: {order.user.name}</p>
                            <p>Email: {order.user.email}</p>
                            <p>Address: {order.address}</p>
                            <p>Mobile: {order.mobile}</p>

                            <div className={`alert ${order.delivered ? 'alert-success' : 'alert-danger'}
                            d-flex justify-content-between align-items-center`} role="alert">
                                {
                                    order.delivered ? `Deliverd on ${order.updatedAt}` : 'Not Deliverd'
                                }
                                {
                                    auth.user.role === 'admin' && !order.delivered &&
                                    <button className="btn btn-dark text-uppercase "
                                    onClick={() => handleDelivered(order._id)}>
                                        Mark as delivered
                                    </button>
                                }
                            </div>

                            <h3>Payment</h3>
                            <h6>Method: {order.method}</h6>
                            <p>PaymentId: {order.paymentId}</p>
                            <div className={`alert ${order.paid ? 'alert-success' : 'alert-danger'}
                            d-flex justify-content-between align-items-center`} role="alert">
                                {
                                    order.paid ? `Paid on ${order.dateOfPayment}` : 'Not Paid'
                                }
                            </div>

                            <div>
                                <h3>Order Items</h3>
                                {
                                    order.cart.map(item => (
                                        <div className="border-bottom mx-0 p-2 d-flex justify-content-sm-between align-items-center" 
                                        key={item._id} style={{maxWidth: '550px'}}>
                                            <img src={item.images[0].url} alt={item.images[0].url}
                                            style={{width: '50px', height: '45px', objectFit: 'cover'}}/>
                                            
                                            <h5 className="flex-fill text-secondary px-3 m-0">
                                                <Link href={`/product/${item._id}`}>
                                                    {item.title}
                                                </Link>
                                            </h5>

                                            <span className="text-info m-0">
                                                {item.quantity} x ${item.price} = ${item.price * item.quantity}
                                            </span>
                                            
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    {
                        !order.paid && auth.user.role !== 'admin' && 
                        <div className="p-4">
                            <h2 className="mb-4 text-uppercase">Total: ${order.total}</h2>
                            <PaypalBtn order={order}/>
                        </div>
                    }

                </div>
                ))
            }
            
        </>
    )
}

export default OrderDetail
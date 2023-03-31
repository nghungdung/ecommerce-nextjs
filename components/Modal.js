import { useContext } from "react"
import { DataContext } from "@/store/GlobalState"
import { deleteItem } from "@/store/Actions"
import { deleteData } from "@/utils/fetchData"



const Modal = () => {
    const {state, dispatch} = useContext(DataContext)
    const { modal, auth } = state

    const handleSubmit = () => {
        if(modal.type === 'ADD_USERS'){
            deleteData(`user/${modal.id}`, auth.token)
            .then(res => {
                if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
                return dispatch({type: 'NOTIFY', payload: {succes: res.msg}})
            })
        }

        if(modal.type === 'ADD_CATEGORIES'){
            deleteData(`categories/${modal.id}`, auth.token)
            .then(res => {
                if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
                return dispatch({type: 'NOTIFY', payload: {succes: res.msg}})
            })
        }
        dispatch(deleteItem(modal.data, modal.id, modal.type))
        dispatch({ type: "ADD_MODAL", payload: {} })

    }

    return(
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title text-capitalize" id="exampleModalLabel">
                        {modal.title}
                    </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    Do you want to remove this item from cart ?
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleSubmit}>Yes</button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Cancel</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Modal 
import { useContext } from "react"
import { DataContext } from "@/store/GlobalState"
import { deleteItem } from "@/store/Actions"



const Modal = () => {
    const {state, dispatch} = useContext(DataContext)
    const { modal } = state

    const handleSubmit = () => {
        dispatch(deleteItem(modal.data, modal.id, 'ADD_CART'))
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
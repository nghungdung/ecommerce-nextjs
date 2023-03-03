const Toast = ({msg, handleShow, bgColor}) =>{
    return(
        <div className={`toast show position-fixed ${bgColor}`} 
        style={{top: '5px', right: '5px', zIndex: 9, minWidth:'280px'}}>
           <div className={`toast-header ${bgColor} d-flex`}>
                <strong className="me-auto text-white">{msg.title}</strong>
                <button type="button" className="btn-close ml-auto p-2" data-bs-dismiss="toast"
                style={{outline: 'none'}} aria-label="Close" onClick={handleShow}></button>
            </div>

            <div className="toast-body text-white">{msg.msg}</div>

        </div>
    )
} 

export default Toast
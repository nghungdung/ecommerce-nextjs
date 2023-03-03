const Toast = ({msg, handleShow, bgColor}) =>{
    return(
        <div className={`toast show position-fixed text-light ${bgColor}`} 
        style={{top: '5px', right: '5px', zIndex: 9, minWidth:'280px'}}>
           <div className={`toast-header ${bgColor} text-light d-flex`}>
                <strong className="mr-auto text-primary">{msg.title}</strong>
                <button type="button" className="btn-close ml-auto p-2" data-bs-dismiss="toast"
                style={{outline: 'none'}} aria-label="Close" onClick={handleShow}></button>
            </div>

            <div className="toast-body">{msg.msg}</div>

        </div>
    )
} 

export default Toast
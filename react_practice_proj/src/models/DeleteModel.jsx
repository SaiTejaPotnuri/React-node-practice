import React from 'react';
import ReactDOM from 'react-dom';

let DeleteModal = ({ show, product, hideModel,onDeleteProduct  }) => {

    
  return ReactDOM.createPortal(
   <>
        <div className="modal" style={{display: show ? "block" : "none",backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Confirm Delete</h5>
                    <button type="button" className="btn-close" onClick={hideModel}></button>
                </div>
                <div className="modal-body text-center pb-4">
                    <p className="mb-0 text-secondary">
                        Are you sure you want to delete this <b>{product.pName}</b>  product ?.
                    </p>
                </div>
                <div className="modal-footer border-top-0 justify-content-center gap-2">
                    <button type="button" className="btn btn-secondary" onClick={hideModel}>Cancel</button>
                    <button type="button" className="btn btn-danger" onClick={onDeleteProduct}>Delete</button>
                </div>
            </div>
        </div>
    </div>
  
  </>,document.getElementById('root-portal')
  );
};

export default DeleteModal;
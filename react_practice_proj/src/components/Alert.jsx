function Alert({children,color="primary",closed}) {
    return <><div className={'alert alert-'+color+ ' alert-dismissible fade show'} role="alert">
        {children}
        <button
         type="button"
         className="btn-close"
         data-bs-dismiss="alert"
         aria-label="Close"
         onClick={(event) => closed(event)}
       ></button>
      </div>
         
       </>
}

export default Alert;
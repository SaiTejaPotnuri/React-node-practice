
function ButtonComponent({children,color="primary",onClicked}) {
    return <>
            <button type="button" className={"btn btn-" + color} onClick={(event) => onClicked(event)}>{children}</button>

    </>

}

export default ButtonComponent;
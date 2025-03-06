function FilterProduct(props) {

    let filterOnChange = (eve) => { 
        props.onFilterSelected(eve.target.value);
    }

    return <>
        <select className="form-select" disabled={props.disable} defaultValue={"All"} onChange={filterOnChange} style={{width:"max-content"}} aria-label="All">
            <option value="All">All</option>
            <option value="Available">Available</option>
            <option value="UnAvailable">UnAvailable</option>
        </select>
    </>

}

export default FilterProduct;
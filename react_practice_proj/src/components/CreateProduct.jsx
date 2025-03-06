import { useContext, useState  } from "react";
import ProductsContext from "../context/ProductsContext";
import useHttp from "../custom-hooks/use-http";
import { useDispatch } from "react-redux";
import {addProduct} from '../store/productSlice';


function CreateProduct(props){

    let dispatch = useDispatch();
    let useHttpHook = useHttp();
    let page = useContext(ProductsContext);
    let [product,setProduct] = useState({
        pName : "",
        pPrice : 0,
        pDesc : "",
        isAvailable : false
    })


   let  addNewProduct = async (eve) =>{
    eve.preventDefault();
        let item = {
            pName : product?.pName,
            pPrice : Number(product?.pPrice),
            pDesc : product?.pDesc,
            isAvailable : Boolean(product?.isAvailable)
        }
        // props.newProduct(item);
        // setProduct({
        //     pName : "",
        //     pPrice : 0,
        //     pDesc : "",
        //     isAvailable : false
        // })


        // fetch('https://react-practice-01-832c4-default-rtdb.firebaseio.com/products.json',{
        //     method: 'POST',
        //     body: JSON.stringify(item),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }).then((res) =>res.json()).then((res) =>{

        //     item.id = res.name
        //     page.onAddProduct(item);

        //     // return res.json();
        // }).catch((err) => {
        //     console.log(err);
        // })


        const response = await useHttpHook.createData('/products', item);
        console.log(response,"from create");

        if(response !== null){
            item.id = response.name;
            page.onAddProduct(item);
            dispatch(addProduct(item));
        }



    }

    if (page.existingPage !== "Add Product") {
        return null;
      }

    let updateName = (eve) =>{
        setProduct((prevState) => {
            return {
                ...prevState,
                pName : eve.target.value
            }
        })
    }

    let updatePrice = (eve) => {
        setProduct((prevState) => {
            return {
                ...prevState,
                pPrice : eve.target.value
            }
        })
    }

    let updateDescription = (eve) => {
        setProduct((prevState) => {
            return {
                ...prevState,
                pDesc : eve.target.value
            }
        })
    }

    let updateAvilability = (eve) => {
        setProduct((prevState) => {
            return {
                ...prevState,
                isAvailable : eve.target.checked
            }
        })
    }

    {/** page.existingPage === "Add Product" ? <> : <> "Before routing i used to do with existing page condition" */}
    return  <> 
        <div className="d-flex align-items-center justify-content-center mt-3">
         <div className="card mb-4" style={{width: "30rem"}}>
            <div className="card-header">
                <h4 className="mb-0">Add New Product</h4>
            </div>
            <div className="card-body">
                <form id="productForm" onSubmit={addNewProduct}>
                    <div className="mb-3">
                        <label htmlFor="productName" className="form-label">Product Name</label>
                        <input type="text" value={product.pName} onChange={updateName} className="form-control" id="productName" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productPrice" className="form-label">Product Price</label>
                        <input type="number" value={product.pPrice} onChange={updatePrice} className="form-control" id="productPrice" step="0.01" min="0" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productDescription" className="form-label">Description</label>
                        <textarea className="form-control" value={product.pDesc} onChange={updateDescription} id="productDescription" rows="3" required></textarea>
                    </div>
                    <div className="mb-3 form-check form-switch">
                        <input className="form-check-input" checked={product.isAvailable} onChange={updateAvilability} type="checkbox" id="isAvailable" />
                        <label className="form-check-label" htmlFor="isAvailable">Available</label>
                    </div>
                    <div className=" w-full d-flex align-items-center justify-content-end">
                    <button type="submit" className="btn btn-primary">Add Product</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    </>

}

export default CreateProduct;
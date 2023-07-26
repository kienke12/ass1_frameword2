import Listproduct from "@/context/product"
import axios from "axios"
import { useContext, useEffect } from "react"


const Product = ()=>{
    const {state, dispatch} = useContext(Listproduct) as any
    useEffect(()=>{
        const fetchproduct = async()=>{
            try {
                const {data} = await axios.get(" http://localhost:3000/products");
                console.log(data);
                dispatch({type:"GET",payload:data})
            } catch (error) {
                
            }
        }
        fetchproduct()
    },[])

    const addProduct = async (product: any) => {
        try {
            // call api
            const { data } = await axios.post("http://localhost:3000/products", product);
            // rerender
            dispatch({ type: "add", payload: data });
        } catch (error) {}
    };
    const updateProduct = async (product: any) => {
        try {
            // call api
            const { data } = await axios.put("http://localhost:3000/products/"+product.id, product);
            // rerender
            dispatch({ type: "update", payload: data });
        } catch (error) {}
    };
    const deleteProduct = async (id: any) => {
        try {
            // call api
            await axios.delete("http://localhost:3000/products/"+id);
            // rerender
            dispatch({ type: "delete", payload: id });
        } catch (error) {}
    };
    return (
        <div>
            aaaa
            
            {state?.product.map((item:any)=>{
                return <div key={item.id}>{item.name} + {item.price}</div>
            })}
            <button className="border" onClick={() => addProduct({ name: "test", price:"200" })}>
                Add Product
            </button>
            <button className="border" onClick={() => updateProduct({ name: "test update", price:"300",id:4 })}>
                Update Product
            </button>
            <button className="border" onClick={() => deleteProduct(4)}>
                Delete Product
            </button>
        </div>
    )
}
export default Product
import { produce } from "immer"
import { createContext, useReducer } from "react"

const Listproduct = createContext([])

const initialstate = {
    product: []
} as { product: any[] }

export const productred = (state :any, action: any) => {
    
        // console.log(action.payload);
        switch (action.type) {
            case "GET":
                state.product = action.payload;
                return 
            case "add":
                state.product.push(action.payload)
                return
            case "delete":
                state.product = state.product.filter((item:any)=>item.id !== action.payload);
                return
            case "update":
                state.product = state.product.map((item:any)=>
                    item.id === action.payload.id ? action.payload : item
                )
                return
            default:
                return state;
        }
    
}

const ProductProvider = ({children}:any) =>{
    const [state , dispatch] = useReducer(produce(productred),initialstate)
    return (
        <Listproduct.Provider value={{state,dispatch }as any}>
            {children}
        </Listproduct.Provider>
    )
}

export {ProductProvider}
export default Listproduct


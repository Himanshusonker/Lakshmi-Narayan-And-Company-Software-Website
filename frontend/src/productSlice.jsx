import {createSlice} from '@reduxjs/toolkit';

const initialState={
    cart:[]
}

const productSlice=createSlice({
    
    name:"cartProduct",

    initialState:initialState,

    reducers:{

        addtoCart:(state, action)=>{

            let cartItems= state.cart.filter((item)=>item.id === action.payload.id);
            if(cartItems.length>=1)
            {
                alert("Product Already Added");
            }
            else
            {
                state.cart.push(action.payload);
            }
        },

        increaseQuantity:(state, action)=>{
            for(var i=0; i<state.cart.length; i++)
            {
                if(state.cart[i].id==action.payload)
                {
                    state.cart[i].qnty+=1;
                }
            }
        },

        decreaseQuantity:(state, action)=>{
            for(var i=0; i<state.cart.length; i++)
            {
                if(state.cart[i].id==action.payload)
                {
                    if(state.cart[i].qnty==1)
                    {
                        alert("You can not Decrease Product Quantity Less than 1");
                    }
                    else
                    {
                        state.cart[i].qnty-=1;
                    }
                }
            }
        },

        removeItem:(state, action)=>{
            state.cart=state.cart.filter(item=>item.id!==action.payload);
        },

        paymentnow:(state, action)=>{
            
        }

    }
    
        
})
export const {addtoCart, increaseQuantity, decreaseQuantity, removeItem}= productSlice.actions;
export default productSlice.reducer;
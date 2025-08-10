import { createContext, useReducer, ReactNode, useEffect } from "react";
import { gibiCartItemType } from "@/types/GibiCartItemType";
import { CartReducerList, CartActions } from "@/reducers/CartReducerList";

type ContextCartType = {
    gibiCart: gibiCartItemType[];
    dispatch: React.Dispatch<CartActions>;
};

export const ContextCart = createContext<ContextCartType | null>(null);

export const ContextCartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, dispatch] = useReducer(CartReducerList, []);

    return (    
        <ContextCart.Provider value={{ gibiCart: cartItems, dispatch }}>
            {children}
        </ContextCart.Provider>
    );
};

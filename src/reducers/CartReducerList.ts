import { gibiCartItemType } from "@/types/GibiCartItemType";

type AddCart = {
    type: 'AddCart';
    payload: gibiCartItemType;
};

type AddQuantity = {
    type: 'AddQuantity';
    payload: {
        id: number
    }
};

type RemoveQuantity = {
    type: 'RemoveQuantity';
    payload: {
        id: number
    }
};

type DeleteItem = {
    type: 'DeleteItem';
    payload: {
        id: number
    }
};

export type CartActions = AddCart | AddQuantity | RemoveQuantity | DeleteItem;

export const CartReducerList = (list: gibiCartItemType[], action: CartActions) => {

    switch (action.type) {
        case "AddCart":
            const existingItem = list.find(item => item.id === action.payload.id);

            if (existingItem) {
                return list.map(item =>
                    item.id === action.payload.id ?
                        { ...item, quantity: item.quantity + 1 }
                        :
                        item);
            }
            return [...list,
            {
                id: action.payload.id,
                title: action.payload.title,
                price: action.payload.price,
                quantity: action.payload.quantity,
                thumbnail: {
                    path: action.payload.thumbnail.path,
                    extension: action.payload.thumbnail.extension
                }
            }
            ]

        case "AddQuantity":
            return list.map(item =>
                item.id === action.payload.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );

            case "RemoveQuantity":
                return list.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
                        : item
                );
            
            case "DeleteItem":
                return list.filter((item) => item.id !== action.payload.id)

        default: return list;
    }
}
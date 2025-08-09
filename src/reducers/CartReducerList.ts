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

type Coupon = {
    type: 'Coupon';
    payload: {
        code: string
    }
}

export type CartActions = AddCart | AddQuantity | RemoveQuantity | DeleteItem | Coupon;

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
                },
                rare: action.payload.rare
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

        case "Coupon":

            switch (action.payload.code) {
                case "COMM15":
                    return list.map(item => {
                        if (!item.rare) {
                            return { ...item, price: item.price - (item.price * 0.15) };
                        }
                        return item;
                    });

                case "RARE20":
                    return list.map(item => {
                        if (item.rare) {
                            return { ...item, price: item.price - (item.price * 0.20) };
                        }
                        return item;
                    });
            }

        default: return list;
    }
}
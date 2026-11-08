import { createContext, useContext } from "react";

const AddItemsContext = createContext({
    "addFoodActive": false,
    "addFoodMenuActive": false,

    changeAddFoodActive: (status) => {},
    changeAddFoodMenuActive: (status) => {}
});

const AddItemsContextProvider = AddItemsContext.Provider;

const useAddItemsContext = () => {
    return useContext(AddItemsContext);
}

export { AddItemsContext, AddItemsContextProvider, useAddItemsContext };
import { createContext, useContext } from "react";

const ListItemsContext = createContext({
    "listFoodActive": false,
    "editFoodItemActive": false,
    "listFoodMenuActive": false,
    "editFoodMenuItemActive": false,
    "listFoodData": [],

    changeListFoodActive: (status) => {},
    changeEditFoodItemActive: (status) => {},
    changeListFoodMenuActive: (status) => {},
    changeEditFoodMenuItemActive: (status) => {},
    addFoodItems: (item) => {},
    removeFoodItems: (item) => {},
    removeAllFoodItems: () => {},
    changeFoodItems: (index, value) => {}
});

const ListItemsContextProvider = ListItemsContext.Provider;

const useListItemsContext = () => {
    return useContext(ListItemsContext);
}

export { ListItemsContext, ListItemsContextProvider, useListItemsContext };
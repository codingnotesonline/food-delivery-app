import { createContext, useContext } from "react";

const AppContext = createContext({
    "foodList": [],
    "cartItems": {},
    "loginStatus": -1,
    "userLoggedin": 0,
    "searchContent": "",

    addFoodInList: (item) => {},
    removeFoodFromList: (item) => {},
    removeAllFoodListItems: () => {},
    addCartItems: (item, count) => {},
    removeCartItems: (item, count) => {},
    changeCartItems: (item, count) => {},
    changeLoginStatus: (status) => {},
    changeUserLoggedin: (status) => {},
    changeSearchContent: (content) => {}
});

const AppContextProvider = AppContext.Provider;

const useAppContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppContextProvider, useAppContext};
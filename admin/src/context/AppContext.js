import { createContext, useContext } from "react";

const AppContext = createContext({
    "loginStatus": 0,
    
    changeLoginStatus: (status) => {}
});

const AppContextProvider = AppContext.Provider;

const useAppContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppContextProvider, useAppContext};
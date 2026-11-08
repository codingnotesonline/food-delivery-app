import { createContext, useContext } from "react";

const HomeContext = createContext({
    "category": "All",
    "searchContent": "",

    changeCategory: (category) => {},
    changeSearchContent: (content) => {}
});

const HomeContextProvider = HomeContext.Provider;

const useHomeContext = () => {
    return useContext(HomeContext);
}

export {HomeContext, HomeContextProvider, useHomeContext};
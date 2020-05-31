import React, { createContext, memo, useContext } from "react";
import isEqual from "react-fast-compare";



export const MultiContext = createContext(null);

MultiContext.displayName = "MultiContext";

export const MultiContextProvider = memo(
    function ({ map, children }) {
        
        const contextMap = {};

        for (const i in map) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            contextMap[map[i].name] = map[i].context()
        }

        return (
            <MultiContext.Provider value={contextMap}>
                {children}
            </MultiContext.Provider>
        );
    },
    (prevProps, nextProps) => isEqual(prevProps.children, nextProps.children)
);

MultiContextProvider.displayName = "MultiContextProvider";


export const useContextMulti = (state) => {    
    let value = useContext(MultiContext)

    


    return value
}
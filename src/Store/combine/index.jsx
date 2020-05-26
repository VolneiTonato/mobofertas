import React from 'react'


export const combineComponents = (...components) => {
    return components
        .reverse()
        .reduce((AccumulatedComponents, CurrentComponent) => {
        return ({ children }) => {
            return (React.createElement(AccumulatedComponents, null,
                React.createElement(CurrentComponent, null, children)));
        };
    }, ({ children }) => React.createElement(React.Fragment, null, children))
}
import React, { Children, Dispatch, SetStateAction, useRef, useState } from 'react';

import { createContext } from 'react';
import { BaseProp } from 'typings';


interface Props extends Omit<BaseProp, 'className'> { }

export const GlobalContext = createContext({ price: 0 });

export const GlobalContextProvider = ({ children }: Props) => {
    const price = useRef(0);
    return (
        <GlobalContext.Provider value={{ price: price.current }}>
            {Array.isArray(children)
                ? children.map((child) => child)
                : children}
        </GlobalContext.Provider>
    );
};

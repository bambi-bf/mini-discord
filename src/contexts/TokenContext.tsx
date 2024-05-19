"use client"
import React, { createContext, useEffect, useState } from 'react';

export interface TokenContextData {
    access_token: string,
    accessTokenFunc: Function,
    token_type: string,
    tokenTypeFunc: Function
}

// Create a context
export const TokenContext = createContext<TokenContextData>({
    access_token: '',
    accessTokenFunc: (token: string) => { },
    token_type: '',
    tokenTypeFunc: (type: string) => { }
});

// Create a provider component
const TokenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [access_token, setAccessToken] = useState('');
    const [token_type, setTokenType] = useState("");

    const accessTokenFunc = (token: string) => {
        setAccessToken(token);
    }

    const tokenTypeFunc = (type: string) => {
        setTokenType(type);
    }

    return (
        <TokenContext.Provider value={{
            access_token,
            accessTokenFunc,
            token_type,
            tokenTypeFunc
        }}>
            {children}
        </TokenContext.Provider>
    );
};

export default TokenProvider;
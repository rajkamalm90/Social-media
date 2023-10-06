import React, { createContext } from 'react';
export const LoginContext = createContext()

//A context object allows you to share data between components without having to pass props down the component tree. 
//This is useful for sharing data that is needed by many different components, 
//such as the user's login state.
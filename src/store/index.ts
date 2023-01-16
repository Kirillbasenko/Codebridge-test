import { configureStore } from '@reduxjs/toolkit';

import article from "./slices/articleSlice"

const stringMiddleware = () => (next: (arg0: { type: string; }) => any) => (action: any) => {
   if(typeof action === "string"){
      return next({
         type: action
      })
   }
   return next(action)
}

const store = configureStore({
   reducer: { article },
   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
   devTools: process.env.NODE_ENV !== "production"
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
import { configureStore } from '@reduxjs/toolkit'
import { fruitsReducer } from '../features/fruits/fruits-slice'
import { reduxFlowLogger } from './redux-logs'

export const makeStore = () => configureStore({
    reducer: {
        fruits: fruitsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reduxFlowLogger),
    
})

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
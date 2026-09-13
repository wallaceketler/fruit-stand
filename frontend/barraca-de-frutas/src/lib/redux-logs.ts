import { isAction, type Middleware } from '@reduxjs/toolkit'

export const reduxFlowLogger: Middleware = 
    (storeApi) => (next) => (action) => {
        if(process.env.NODE_ENV !== 'development' || !isAction(action)){
            return next(action)
        }

        const previousState = storeApi.getState()
        console.groupCollapsed(`[Redux] ${action.type}`)
        console.log('1. Acton recebida:', action)
        console.log('2. Estado anterior:', previousState)

        const result = next(action)

        console.log('3. Estado depois:', storeApi.getState())
        console.groupEnd()

        return result
    }
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fruitRepository } from './local-storage-fruit-repository';
import type { Fruit, FruitInput } from './fruit';

export type FruitsStatus = | 'idle' | 'loading' | 'succeeded' | 'failed';

export interface FruitsState {
    items: Fruit[];
    status: FruitsStatus;
    error: string | null;
}

const initialState: FruitsState = {
    items: [],
    status: 'idle',
    error: null,
}

export const loadFruits = createAsyncThunk(
    'fruits/load',
    async () => fruitRepository.list(),
)

export const deleteFruit = createAsyncThunk(
    'fruits/delete',
    async (id: string) => { 
        await fruitRepository.remove(id)
        return id
    }
)

export interface UpdateFruitPayload {
    id: string;
    input: FruitInput;
}

export const updateFruit = createAsyncThunk(
    'fruits/update',
    async ({id, input} : UpdateFruitPayload) => 
        fruitRepository.update(id, input)
    
)

export const createFruit = createAsyncThunk(
    'fruits/create',
    async (input: FruitInput) => 
        fruitRepository.create(input)
    
)

const fruitsSlice = createSlice({
    name: 'fruits',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadFruits.pending, (state) => {
            state.status = 'loading'
            state.error = null
        }).addCase(loadFruits.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.items = action.payload
        }).addCase(loadFruits.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message ?? 'Não foi possível carregar as frutas'
        }).addCase(createFruit.pending, (state) => {
            state.error = null
        }).addCase(createFruit.fulfilled, (state, action) => {
            state.items.push(action.payload)
        }).addCase(createFruit.rejected, (state, action) => {
            state.error = action.error.message ?? 'Não foi possível criar a fruta'
        }).addCase(updateFruit.pending, (state) => {
            state.error = null
        }).addCase(updateFruit.fulfilled, (state, action) => {
            const index = state.items.findIndex((fruit) => fruit.id === action.payload.id);
            if (index >= 0){
                state.items[index] = action.payload;
            }else{
                state.items.push(action.payload)
            }
        }).addCase(updateFruit.rejected, (state, action) => {
            state.error = action.error.message ?? 'Não foi possível atualizar a fruta'
        }).addCase(deleteFruit.pending, (state) => {
            state.error = null
        }).addCase(deleteFruit.fulfilled, (state, action) => {
            state.items = state.items.filter( (fruit) => fruit.id !== action.payload)
        }).addCase(deleteFruit.rejected, (state, action) => {
            state.error = action.error.message ?? 'Não foi possível excluir a fruta'
        })
    }
})


export const fruitsReducer = fruitsSlice.reducer;
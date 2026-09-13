import type { RootState } from '@/lib/store';

export const selectAllFruits = (state: RootState) => state.fruits.items
export const selectFruitsStatus = (state: RootState) => state.fruits.status
export const selectFruitsError = (state: RootState) => state.fruits.error

export const selectFruitById = (
    state: RootState,
    id: string,
) => state.fruits.items.find((fruit) => fruit.id === id) ?? null
import type { Fruit, FruitInput } from './fruit'

export interface FruitRepository {
  list(): Promise<Fruit[]>
  findById(id: string): Promise<Fruit | null>
  create(input: FruitInput): Promise<Fruit>
  update(id: string, input: FruitInput): Promise<Fruit>
  remove(id: string): Promise<void>
}

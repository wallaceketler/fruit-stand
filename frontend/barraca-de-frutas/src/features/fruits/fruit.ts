export interface Fruit {
  id: string
  name: string
  price: string
  quantity: string
}

export type FruitInput = Omit<Fruit, 'id'>

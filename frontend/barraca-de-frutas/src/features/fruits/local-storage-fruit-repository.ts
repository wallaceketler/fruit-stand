import type { Fruit, FruitInput } from './fruit'
import type { FruitRepository } from './fruit-repository'

const LAST_INDEX_KEY = 'lastIndex'

type StoredFruit = Omit<Fruit, 'id'>

function isStoredFruit(value: unknown): value is StoredFruit {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const fruit = value as Record<string, unknown>

  return (
    typeof fruit.name === 'string' &&
    typeof fruit.price === 'string' &&
    typeof fruit.quantity === 'string'
  )
}

export class LocalStorageFruitRepository implements FruitRepository {
  constructor(private readonly providedStorage?: Storage) {}

  async list(): Promise<Fruit[]> {
    const storage = this.getStorage()
    const fruits: Fruit[] = []

    for (let index = 0; index < storage.length; index += 1) {
      const id = storage.key(index)

      if (!id || id === LAST_INDEX_KEY) {
        continue
      }

      const fruit = this.read(storage, id)

      if (fruit) {
        fruits.push({ id, ...fruit })
      }
    }

    return fruits
  }

  async findById(id: string): Promise<Fruit | null> {
    const fruit = this.read(this.getStorage(), id)
    return fruit ? { id, ...fruit } : null
  }

  async create(input: FruitInput): Promise<Fruit> {
    const storage = this.getStorage()
    const lastIndex = storage.getItem(LAST_INDEX_KEY)
    const id = String(lastIndex === null ? 1 : Number.parseInt(lastIndex, 10) + 1)

    storage.setItem(id, JSON.stringify(input))
    storage.setItem(LAST_INDEX_KEY, id)

    return { id, ...input }
  }

  async update(id: string, input: FruitInput): Promise<Fruit> {
    this.getStorage().setItem(id, JSON.stringify(input))
    return { id, ...input }
  }

  async remove(id: string): Promise<void> {
    this.getStorage().removeItem(id)
  }

  private getStorage(): Storage {
    if (this.providedStorage) {
      return this.providedStorage
    }

    if (typeof window === 'undefined') {
      throw new Error('LocalStorageFruitRepository só pode ser usado no navegador')
    }

    return window.localStorage
  }

  private read(storage: Storage, id: string): StoredFruit | null {
    const value = storage.getItem(id)

    if (!value) {
      return null
    }

    try {
      const parsed: unknown = JSON.parse(value)
      return isStoredFruit(parsed) ? parsed : null
    } catch {
      return null
    }
  }
}

export const fruitRepository: FruitRepository = new LocalStorageFruitRepository()

import { AppError } from '@/middlewares/error.middleware';

export interface Entity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Store<T extends Entity> {
  private data: Map<string, T>;

  constructor() {
    this.data = new Map<string, T>();
  }

  public async findById(id: string): Promise<T> {
    const item = this.data.get(id);
    if (!item) {
      throw new AppError(404, 'Item not found');
    }
    return { ...item };
  }

  public async findOne(predicate: (item: T) => boolean): Promise<T | undefined> {
    for (const item of this.data.values()) {
      if (predicate(item)) {
        return { ...item };
      }
    }
    return undefined;
  }

  public async findMany(predicate?: (item: T) => boolean): Promise<T[]> {
    const items = Array.from(this.data.values()).map(item => ({ ...item }));
    return predicate ? items.filter(predicate) : items;
  }

  public async create(id: string, data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    if (this.data.has(id)) {
      throw new AppError(409, 'Item already exists');
    }

    const now = new Date();
    const newItem = {
      id,
      ...data,
      createdAt: now,
      updatedAt: now,
    } as T;

    this.data.set(id, newItem);
    return { ...newItem };
  }

  public async update(id: string, data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>): Promise<T> {
    const existingItem = await this.findById(id);
    if (!existingItem) {
      throw new AppError(404, 'Item not found');
    }

    const updatedItem = {
      ...existingItem,
      ...data,
      updatedAt: new Date(),
    };

    this.data.set(id, updatedItem);
    return { ...updatedItem };
  }

  public async delete(id: string): Promise<void> {
    if (!this.data.has(id)) {
      throw new AppError(404, 'Item not found');
    }
    this.data.delete(id);
  }

  public async clear(): Promise<void> {
    this.data.clear();
  }
} 
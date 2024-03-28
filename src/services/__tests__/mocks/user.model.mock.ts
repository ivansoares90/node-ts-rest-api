import { Types } from 'mongoose';
import { UserDocument } from '@/models/user.model';

export class MockUserModel {
  private static users: Map<string, UserDocument> = new Map();

  static findById(id: string): Promise<UserDocument | null> {
    return Promise.resolve(this.users.get(id) || null);
  }

  static findOne(query: { email: string }): Promise<UserDocument | null> {
    const user = Array.from(this.users.values()).find(u => u.email === query.email);
    return Promise.resolve(user || null);
  }

  static create(data: Partial<UserDocument>): Promise<UserDocument> {
    const id = new Types.ObjectId().toString();
    const user: UserDocument = {
      _id: new Types.ObjectId(id),
      email: data.email!,
      firstName: data.firstName!,
      lastName: data.lastName!,
      password: data.password!,
      createdAt: new Date(),
      updatedAt: new Date(),
      comparePassword: async (password: string): Promise<boolean> => {
        return password === data.password;
      }
    } as UserDocument;
    this.users.set(id, user);
    return Promise.resolve(user);
  }

  static findByIdAndUpdate(
    id: string,
    data: Partial<UserDocument>,
    options: { new: boolean; runValidators: boolean }
  ): Promise<UserDocument | null> {
    const user = this.users.get(id);
    if (!user) return Promise.resolve(null);

    const updatedUser: UserDocument = {
      ...user,
      ...data,
      updatedAt: new Date()
    } as UserDocument;
    this.users.set(id, updatedUser);
    return Promise.resolve(updatedUser);
  }

  static findByIdAndDelete(id: string): Promise<UserDocument | null> {
    const user = this.users.get(id);
    if (user) {
      this.users.delete(id);
    }
    return Promise.resolve(user || null);
  }

  static clear(): void {
    this.users.clear();
  }
} 
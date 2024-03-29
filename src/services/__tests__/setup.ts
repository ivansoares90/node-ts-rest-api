import { connectTestDB, disconnectTestDB } from '@/config/test-database';
import { MockUserModel } from './mocks/user.model.mock';

beforeAll(async () => {
  // Connect to test database
  await connectTestDB();
  // Clear mock data
  MockUserModel.clear();
});

afterAll(async () => {
  // Disconnect from test database
  await disconnectTestDB();
});

afterEach(() => {
  // Clear mock data after each test
  MockUserModel.clear();
}); 
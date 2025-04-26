import { User } from './types';

// Simple mock authentication - in a real app this would interact with a backend

// Demo user for testing
const DEMO_USER: User = {
  id: '1',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin',
};

const DEMO_PASSWORD = 'admin123';

export function saveUserToStorage(user: User): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
}

export function getUserFromStorage(): User | null {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
}

export function removeUserFromStorage(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
}

export async function loginUser(email: string, password: string): Promise<User> {
  // This simulates a login API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === DEMO_USER.email && password === DEMO_PASSWORD) {
        saveUserToStorage(DEMO_USER);
        resolve(DEMO_USER);
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 500);
  });
}

export async function logoutUser(): Promise<void> {
  // This simulates a logout API call
  return new Promise((resolve) => {
    setTimeout(() => {
      removeUserFromStorage();
      resolve();
    }, 300);
  });
}

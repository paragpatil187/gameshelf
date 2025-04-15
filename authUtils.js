// Mock implementation of NextAuth/Google authentication
// In a real application, this would use the actual NextAuth library

// Mock user database
const users = [
  {
    id: "1",
    name: "Test User",
    email: "test@example.com",
    password: "password123",
  },
];

// Sign in with email and password
export async function signInWithCredentials(email, password) {
  return new Promise((resolve, reject) => {
    // Simulate API delay
    setTimeout(() => {
      const user = users.find(
        (user) => user.email === email && user.password === password,
      );

      if (user) {
        // Return user without password
        const { password, ...userWithoutPassword } = user;
        resolve(userWithoutPassword);
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 500);
  });
}

// Sign up with email and password
export async function signUpWithCredentials(name, email, password) {
  return new Promise((resolve, reject) => {
    // Simulate API delay
    setTimeout(() => {
      // Check if user already exists
      const existingUser = users.find((user) => user.email === email);

      if (existingUser) {
        reject(new Error("Email already in use"));
      } else {
        // Create new user
        const newUser = {
          id: String(users.length + 1),
          name,
          email,
          password,
        };

        users.push(newUser);

        // Return user without password
        const { password: _, ...userWithoutPassword } = newUser;
        resolve(userWithoutPassword);
      }
    }, 500);
  });
}

// Sign in with Google
export async function signInWithGoogle() {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Simulate a successful Google authentication
      const googleUser = {
        id: "google-123",
        name: "Google User",
        email: "googleuser@gmail.com",
        profileImage: "https://lh3.googleusercontent.com/a/default-user",
      };

      resolve(googleUser);
    }, 800);
  });
}

// Sign out
export async function signOut() {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      resolve();
    }, 300);
  });
}

// Validate email format
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Validate password strength
export function validatePassword(password) {
  return password.length >= 6;
}

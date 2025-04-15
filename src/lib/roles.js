// Role definitions
export const ROLES = {
  USER: "user",
  ADMIN: "admin",
};

// Check if user has admin role
export function isAdmin(user) {
  return user?.role === ROLES.ADMIN;
}

// Check if user has specific role
export function hasRole(user, role) {
  return user?.role === role;
}

// Get user's role (defaults to USER if not specified)
export function getUserRole(user) {
  return user?.role || ROLES.USER;
}

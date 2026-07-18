import type { Permission, Role } from '@repo/types';
import { decodeToken } from './token';
import { getAccessToken } from './token';

/**
 * Check if user has a specific permission
 */
export function hasPermission(permission: Permission | Permission[], userPermissions?: Permission[]): boolean {
  const permissions = userPermissions || getUserPermissionsFromToken();
  
  if (!permissions || permissions.length === 0) return false;

  if (Array.isArray(permission)) {
    return permission.some((p) => permissions.includes(p));
  }

  return permissions.includes(permission);
}

/**
 * Check if user has all required permissions
 */
export function hasAllPermissions(permissions: Permission[], userPermissions?: Permission[]): boolean {
  const userPerms = userPermissions || getUserPermissionsFromToken();
  
  if (!userPerms || userPerms.length === 0) return false;

  return permissions.every((p) => userPerms.includes(p));
}

/**
 * Check if user has a specific role
 */
export function hasRole(role: Role | Role[], userRole?: Role): boolean {
  const currentRole = userRole || getUserRoleFromToken();
  
  if (!currentRole) return false;

  if (Array.isArray(role)) {
    return role.includes(currentRole);
  }

  return currentRole === role;
}

/**
 * Check if user is admin or super admin
 */
export function isAdmin(userRole?: Role): boolean {
  const role = userRole || getUserRoleFromToken();
  return role === 'admin' || role === 'super_admin';
}

/**
 * Check if user is super admin
 */
export function isSuperAdmin(userRole?: Role): boolean {
  const role = userRole || getUserRoleFromToken();
  return role === 'super_admin';
}

/**
 * Get current user role from JWT token
 */
export function getUserRoleFromToken(): Role | null {
  try {
    if (typeof window === 'undefined') return null;
    
    const token = getAccessToken();
    if (!token) return null;

    const decoded = decodeToken(token);
    return (decoded?.role as Role) || null;
  } catch {
    return null;
  }
}

/**
 * Get current user permissions from JWT token
 */
export function getUserPermissionsFromToken(): Permission[] {
  try {
    if (typeof window === 'undefined') return [];
    
    const token = getAccessToken();
    if (!token) return [];

    const decoded = decodeToken(token);
    return (decoded?.permissions as Permission[]) || [];
  } catch {
    return [];
  }
}

/**
 * Get current user ID from JWT token
 */
export function getUserIdFromToken(): string | null {
  try {
    if (typeof window === 'undefined') return null;
    
    const token = getAccessToken();
    if (!token) return null;

    const decoded = decodeToken(token);
    return decoded?.sub || null;
  } catch {
    return null;
  }
}

/**
 * Check if user can perform action on a specific resource
 */
export function canAccess(permission: Permission, role?: Role | Role[]): boolean {
  const userRole = getUserRoleFromToken();
  const currentRole = userRole ?? undefined;
  
  // Super admin can access everything
  if (isSuperAdmin(currentRole)) return true;

  // Check role if specified
  if (role && !hasRole(role, currentRole)) {
    return false;
  }

  // Check permission
  return hasPermission(permission);
}

/**
 * Filter menu items based on user permissions and roles
 */
export function filterMenuByPermissions(
  menu: Array<{ permission?: Permission; roles?: Role[] }>,
  userPermissions?: Permission[],
  userRole?: Role
): Array<{ permission?: Permission; roles?: Role[] }> {
  const perms = userPermissions || getUserPermissionsFromToken();
  const role = userRole || getUserRoleFromToken();

  return menu.filter((item) => {
    if (!item.permission && (!item.roles || item.roles.length === 0)) {
      return true;
    }

    // Check role restriction
    if (item.roles && item.roles.length > 0 && !item.roles.includes(role as Role)) {
      return false;
    }

    // Check permission
    if (item.permission && !perms.includes(item.permission)) {
      return false;
    }

    return true;
  });
}

import { useMemo } from 'react';
import type { Permission, Role } from '@repo/types';
import {
  hasPermission,
  hasAllPermissions,
  hasRole,
  isAdmin,
  isSuperAdmin,
  canAccess,
} from '@repo/auth';
import { useAuth } from './useAuth';

/**
 * usePermission - Check user permissions
 */
export function usePermission(permissions: Permission | Permission[]) {
  const { user } = useAuth();

  return useMemo(() => {
    if (!user) {
      return { allowed: false };
    }

    const allowed = hasPermission(permissions, user.permissions);
    return { allowed, permission: permissions };
  }, [user, permissions]);
}

/**
 * useAllPermissions - Check if user has all required permissions
 */
export function useAllPermissions(permissions: Permission[]) {
  const { user } = useAuth();

  return useMemo(() => {
    if (!user) {
      return { allowed: false };
    }

    const allowed = hasAllPermissions(permissions, user.permissions);
    return { allowed, permissions };
  }, [user, permissions]);
}

/**
 * useRole - Check user role
 */
export function useRole(roles: Role | Role[]) {
  const { user } = useAuth();

  return useMemo(() => {
    if (!user) {
      return { allowed: false };
    }

    const allowed = hasRole(roles, user.role);
    return { allowed, role: user.role };
  }, [user, roles]);
}

/**
 * useIsAdmin - Check if user is admin
 */
export function useIsAdmin() {
  const { user } = useAuth();

  return useMemo(() => {
    return user ? isAdmin(user.role) : false;
  }, [user]);
}

/**
 * useIsSuperAdmin - Check if user is super admin
 */
export function useIsSuperAdmin() {
  const { user } = useAuth();

  return useMemo(() => {
    return user ? isSuperAdmin(user.role) : false;
  }, [user]);
}

/**
 * useCanAccess - Check if user can access resource with permission and role
 */
export function useCanAccess(permission: Permission, role?: Role | Role[]) {
  const { user } = useAuth();

  return useMemo(() => {
    if (!user) {
      return false;
    }

    return canAccess(permission, role);
  }, [user, permission, role]);
}

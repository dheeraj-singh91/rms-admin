'use client';

import React, { type ReactNode } from 'react';
import type { Permission, Role } from '@repo/types';
import { hasAllPermissions, hasPermission, hasRole, isAdmin } from './utils/permissions';
import { useAuth } from '@repo/hooks';

interface GuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface RoleGuardProps extends GuardProps {
  roles: Role | Role[];
}

interface PermissionGuardProps extends GuardProps {
  permissions: Permission | Permission[];
  requireAll?: boolean;
}

/**
 * ProtectedRoute - Ensures user is authenticated
 */
export function ProtectedRoute({ children, fallback }: GuardProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return fallback || <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return fallback || <div>Unauthorized - Please login</div>;
  }

  return <>{children}</>;
}

/**
 * RoleGuard - Ensures user has required role
 */
export function RoleGuard({ children, fallback, roles }: RoleGuardProps) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return fallback || <div>Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    return fallback || <div>Unauthorized - Please login</div>;
  }

  if (!hasRole(roles, user.role)) {
    return fallback || <div>403 - Forbidden: Insufficient role</div>;
  }

  return <>{children}</>;
}

/**
 * PermissionGuard - Ensures user has required permission(s)
 */
export function PermissionGuard({
  children,
  fallback,
  permissions,
  requireAll = false,
}: PermissionGuardProps) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return fallback || <div>Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    return fallback || <div>Unauthorized - Please login</div>;
  }

  const requiredPermissions = Array.isArray(permissions) ? permissions : [permissions];
  const hasAccess = requireAll
    ? hasAllPermissions(requiredPermissions, user.permissions)
    : hasPermission(requiredPermissions, user.permissions);

  if (!hasAccess) {
    return fallback || <div>403 - Forbidden: Insufficient permissions</div>;
  }

  return <>{children}</>;
}

/**
 * AdminGuard - Ensures user is admin or super admin
 */
export function AdminGuard({ children, fallback }: GuardProps) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return fallback || <div>Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    return fallback || <div>Unauthorized - Please login</div>;
  }

  if (!isAdmin(user.role)) {
    return fallback || <div>403 - Forbidden: Admin access required</div>;
  }

  return <>{children}</>;
}

/**
 * Query Keys for TanStack Query (React Query)
 * Centralized query key factory for consistent caching and invalidation
 */

export const queryKeys = {
  /**
   * Auth queries
   */
  auth: {
    all: ['auth'] as const,
    login: () => [...queryKeys.auth.all, 'login'] as const,
    logout: () => [...queryKeys.auth.all, 'logout'] as const,
    currentUser: () => [...queryKeys.auth.all, 'currentUser'] as const,
    profile: () => [...queryKeys.auth.all, 'profile'] as const,
    permissions: () => [...queryKeys.auth.all, 'permissions'] as const,
    roles: () => [...queryKeys.auth.all, 'roles'] as const,
  },

  /**
   * User queries
   */
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'lists'] as const,
    list: (params: Record<string, unknown>) => [
      ...queryKeys.users.lists(),
      params,
    ] as const,
    details: () => [...queryKeys.users.all, 'details'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
    preferences: (id: string) => [...queryKeys.users.detail(id), 'preferences'] as const,
  },

  /**
   * Menu queries
   */
  menus: {
    all: ['menus'] as const,
    lists: () => [...queryKeys.menus.all, 'lists'] as const,
    list: (params: Record<string, unknown>) => [
      ...queryKeys.menus.lists(),
      params,
    ] as const,
    details: () => [...queryKeys.menus.all, 'details'] as const,
    detail: (id: string) => [...queryKeys.menus.details(), id] as const,
    byRole: (role: string) => [...queryKeys.menus.all, 'byRole', role] as const,
  },

  /**
   * Dashboard queries
   */
  dashboard: {
    all: ['dashboard'] as const,
    stats: () => [...queryKeys.dashboard.all, 'stats'] as const,
    charts: () => [...queryKeys.dashboard.all, 'charts'] as const,
    activities: (params: Record<string, unknown>) => [
      ...queryKeys.dashboard.all,
      'activities',
      params,
    ] as const,
  },

  /**
   * Reports queries
   */
  reports: {
    all: ['reports'] as const,
    lists: () => [...queryKeys.reports.all, 'lists'] as const,
    list: (params: Record<string, unknown>) => [
      ...queryKeys.reports.lists(),
      params,
    ] as const,
    details: () => [...queryKeys.reports.all, 'details'] as const,
    detail: (id: string) => [...queryKeys.reports.details(), id] as const,
    export: (id: string) => [...queryKeys.reports.detail(id), 'export'] as const,
  },

  /**
   * Settings queries
   */
  settings: {
    all: ['settings'] as const,
    general: () => [...queryKeys.settings.all, 'general'] as const,
    security: () => [...queryKeys.settings.all, 'security'] as const,
    notifications: () => [...queryKeys.settings.all, 'notifications'] as const,
    integrations: () => [...queryKeys.settings.all, 'integrations'] as const,
  },

  /**
   * File upload queries
   */
  files: {
    all: ['files'] as const,
    lists: () => [...queryKeys.files.all, 'lists'] as const,
    uploads: (params: Record<string, unknown>) => [
      ...queryKeys.files.all,
      'uploads',
      params,
    ] as const,
  },

  /**
   * Generic query factory for application-specific data
   * Usage: queryKeys.data('users', { page: 1 })
   */
  data: (resource: string, params?: Record<string, unknown>) => [
    'data',
    resource,
    ...(params ? [params] : []),
  ] as const,
};

export type AppQueryKey = readonly (string | object)[];

/**
 * Helper function to invalidate related queries
 */
export function getRelatedQueryKeys(resource: string): AppQueryKey[] {
  switch (resource) {
    case 'users':
      return [queryKeys.users.all, queryKeys.auth.permissions()];
    case 'menus':
      return [queryKeys.menus.all];
    case 'reports':
      return [queryKeys.reports.all];
    case 'settings':
      return [queryKeys.settings.all];
    default:
      return [[resource]];
  }
}

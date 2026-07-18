import type { ReactNode } from 'react';

// ==================== Auth Types ====================

export type Role = 'admin' | 'manager' | 'viewer' | 'super_admin';

export type Permission = 'read' | 'write' | 'delete' | 'approve' | 'export' | 'import';

export interface User {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role: Role;
  permissions: Permission[];
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
  permissions: Permission[];
  iat: number;
  exp: number;
  iss?: string;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  user: User;
  expiresIn: number;
}

// ==================== App Config & Auth Payloads ====================

export interface AppConfig {
  appName: string;
  displayName: string;
  accessKey: string;
  theme: string;
  logo: string;
}

export interface GetTokenRequest {
  username: string;
  accesskey: string;
  clientIP: string;
}

export interface GetTokenResponse {
  saltkey: string;
  success: boolean;
  msg: string;
  [key: string]: string | boolean; // For accessTokenVm, accessTokenSrms, etc.
}

export interface ValidateUserRequest {
  username: string;
  password: string; // FinalPassword
  captcha: string;
}

export interface ValidateUserResponse {
  accessToken: string;
  refreshToken?: string;
  mfaType: number;
  singleIDurl?: string;
  otpValidity?: number;
  success: boolean;
}

export interface SendOtpRequest {
  username: string;
  password: string;
}

export interface SendOtpResponse {
  otp: string;
  otpValidity: number;
  success: boolean;
}

export interface VerifyOtpRequest {
  otp: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  desiredScreen: string;
  msg: string;
}

export interface ValidateTokenRequest {
  token: string;
}

export interface ValidateTokenResponse {
  success: boolean;
  desiredScreen: string;
}

export interface UpdatePasswordRequest {
  username: string;
  newPassword: string;
}

export interface UpdatePasswordResponse {
  success: boolean;
  msg: string;
}

// ==================== Menu Types ====================

export interface MenuItem {
  id: string;
  label: string;
  path?: string;
  icon?: string;
  permission?: Permission;
  roles?: Role[];
  children?: MenuItem[];
  badge?: {
    value: number | string;
    severity?: 'success' | 'secondary' | 'info' | 'warning' | 'danger';
  };
}

export interface MenuConfig {
  items: MenuItem[];
  version: number;
  lastUpdated: Date;
}

// ==================== API Response Types ====================

export interface ApiResponse<T = unknown> {
  data?: T;
  message: string;
  success: boolean;
  statusCode: number;
  timestamp: string;
}

export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
  timestamp: string;
  path?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ==================== Request/Response Wrappers ====================

export interface RequestConfig {
  retryCount?: number;
  timeout?: number;
  skipAuth?: boolean;
}

export interface ResponseWrapper<T> {
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  data?: T | null;
}

// ==================== Common DTOs ====================

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}

export interface AuditLog extends BaseEntity {
  action: string;
  entityType: string;
  entityId: string;
  changes?: Record<string, unknown>;
  userId: string;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  title?: string;
  duration?: number;
}

export interface TableColumn {
  field: string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  template?: (row: unknown) => ReactNode;
}

export interface DialogOptions {
  title: string;
  message: string;
  icon?: 'confirm' | 'warning' | 'error' | 'info';
  accept?: {
    label: string;
    callback: () => void;
  };
  reject?: {
    label: string;
    callback?: () => void;
  };
}

// ==================== Filter/Search Types ====================

export interface FilterOption {
  label: string;
  value: string | number | boolean;
}

export interface SearchFilters {
  [key: string]: string | number | boolean | string[];
}

// ==================== File Upload Types ====================

export interface FileUploadResponse {
  url: string;
  fileName: string;
  size: number;
  mimeType: string;
}

export interface FileUploadError {
  fileName: string;
  error: string;
}

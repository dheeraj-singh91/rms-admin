// Providers & Context
export { AuthProvider } from './providers/AuthProvider';

// Guards
export { ProtectedRoute, RoleGuard, PermissionGuard, AdminGuard } from './guards';

// Token utilities
export {
  createAuthTokenStorage,
  getAccessToken,
  setAccessToken,
  clearAccessToken,
  getRefreshToken,
  setRefreshToken,
  clearRefreshToken,
  getTokenExpiry,
  setTokenExpiry,
  clearTokenExpiry,
  clearAllTokens,
  decodeToken,
  isTokenExpired,
  getTokenExpiryInSeconds,
  getTokenExpiryDate,
} from './utils/token';

// Session utilities
export { getStoredUser, setStoredUser, clearStoredUser, clearSession } from './utils/session';

// Permission utilities
export {
  hasPermission,
  hasAllPermissions,
  hasRole,
  isAdmin,
  isSuperAdmin,
  getUserRoleFromToken,
  getUserPermissionsFromToken,
  getUserIdFromToken,
  canAccess,
  filterMenuByPermissions,
} from './utils/permissions';

// Crypto & API Hooks
export { sha256, computeFinalPassword } from './crypto/hash';
export { saltStore } from './crypto/saltStore';
export {
  useGetTokenMutation,
  useValidateUserMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useValidateTokenMutation,
} from './hooks/useAuthMutations';

// UI Components
export { Captcha } from './components/Captcha';
export { Countdown } from './components/Countdown';
export { ForgotPassword } from './components/ForgotPassword';
export { LoginForm, type LoginFormData } from './components/LoginForm';
export { OtpInput } from './components/OtpInput';
export { OtpScreen } from './components/OtpScreen';


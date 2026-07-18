'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@repo/hooks';
import { LoginForm, type LoginFormData } from '@repo/auth';
import { useValidateUserMutation, computeFinalPassword, saltStore } from '@repo/auth';
import { appConfig } from '../../../config/app.config';
import type { User } from '@repo/types';

export default function LoginPage() {
  const router = useRouter();
  const { dispatchLoginSuccess, dispatchSetError, error } = useAuth();
  const validateMutation = useValidateUserMutation();

  const handleLogin = async (data: LoginFormData) => {
    try {
      const saltkey = saltStore.get();
      if (!saltkey) {
        dispatchSetError('Security session not initialized. Please refresh.');
        return;
      }

      // Compute final password hash
      const finalPassword = await computeFinalPassword(data.password, saltkey);

      // Call validate API
      const res = await validateMutation.mutateAsync({
        username: data.username,
        password: finalPassword,
        captcha: data.captcha,
      });

      if (res.success) {
        const mockUser: User = {
          id: '1',
          name: 'SRMS Admin User',
          email: `${data.username}@rms.samsung.com`,
          role: 'admin',
          permissions: ['read', 'write', 'delete'],
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        dispatchLoginSuccess({
          user: mockUser,
          accessToken: res.accessToken,
          mfaStatus: res.mfaType,
          permissions: mockUser.permissions,
        });

        if (res.mfaType === 1) {
          router.push(`/otp?validity=${res.otpValidity}&username=${data.username}`);
        } else if (res.mfaType === 2 && res.singleIDurl) {
          window.location.href = res.singleIDurl;
        } else {
          router.push('/');
        }
      } else {
        dispatchSetError('Invalid credentials or captcha.');
      }
    } catch (err) {
      dispatchSetError('An error occurred during login.');
    }
  };

  return (
    <LoginForm
      appName={appConfig.displayName}
      logo={appConfig.logo}
      onSubmit={handleLogin}
      isLoading={validateMutation.isPending}
      error={error}
    />
  );
}

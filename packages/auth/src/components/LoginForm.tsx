import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button, Card } from '@repo/ui';
import { Captcha } from './Captcha';
import { ForgotPassword } from './ForgotPassword';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  captcha: z.string().min(1, 'Captcha is required'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  appName: string;
  logo: string;
  onSubmit: (data: LoginFormData) => void;
  isLoading: boolean;
  error?: string | null;
}

export function LoginForm({ appName, logo, onSubmit, isLoading, error }: LoginFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema as any),
    defaultValues: {
      username: '',
      password: '',
      captcha: '',
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg p-6">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt={appName} className="h-16 mb-2 object-contain" />
          <h1 className="text-2xl font-bold text-gray-800">{appName} Login</h1>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Username</label>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter username"
                  className={errors.username ? 'border-red-500' : ''}
                  disabled={isLoading}
                />
              )}
            />
            {errors.username && <span className="text-red-500 text-xs">{errors.username.message}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  placeholder="Enter password"
                  className={errors.password ? 'border-red-500' : ''}
                  disabled={isLoading}
                />
              )}
            />
            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
            <div className="mt-1">
              <ForgotPassword />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Captcha (A8c3X)</label>
            <Captcha />
            <Controller
              name="captcha"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter captcha text"
                  className={`mt-2 ${errors.captcha ? 'border-red-500' : ''}`}
                  disabled={isLoading}
                />
              )}
            />
            {errors.captcha && <span className="text-red-500 text-xs">{errors.captcha.message}</span>}
          </div>

          <Button
            type="submit"
            label={isLoading ? 'Authenticating...' : 'Login'}
            disabled={isLoading}
            className="w-full py-2.5 mt-2"
          />
        </form>
      </Card>
    </div>
  );
}

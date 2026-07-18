import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button } from '@repo/ui';
import { Captcha } from './Captcha';
import { ForgotPassword } from './ForgotPassword';
import './LoginForm.css';

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
  resetPath?: string;
}

export function LoginForm({ appName, logo, onSubmit, isLoading, error, resetPath }: LoginFormProps) {
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
    <div className="lf-page">
      <div className="lf-card">
        {/* ── LEFT: Form Panel ── */}
        <div className="lf-left">
          {/* Logo */}
          <div className="lf-logo-wrap">
            <img
              src={logo}
              alt={appName}
              className="lf-logo"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="lf-logo-fallback" style={{ display: 'none' }}>
              {appName.charAt(0).toUpperCase()}
            </div>
          </div>

          <h1 className="lf-heading">Welcome Back!</h1>
          <p className="lf-subheading">Sign in to {appName} to continue</p>

          {/* Error */}
          {error && (
            <div className="lf-error">
              <i className="pi pi-exclamation-circle lf-error-icon" />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="lf-form" noValidate>
            {/* Username */}
            <div className="lf-field">
              <label className="lf-label" htmlFor="lf-username">Username</label>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <div className={`lf-input-wrap${errors.username ? ' lf-input-error' : ''}`}>
                    <i className="pi pi-user lf-input-icon" />
                    <Input
                      {...field}
                      id="lf-username"
                      placeholder="Enter your username"
                      disabled={isLoading}
                      aria-invalid={!!errors.username}
                    />
                  </div>
                )}
              />
              {errors.username && (
                <span className="lf-field-error">{errors.username.message}</span>
              )}
            </div>

            {/* Password */}
            <div className="lf-field">
              <div className="lf-password-header">
                <label className="lf-label" htmlFor="lf-password">Password</label>
                <ForgotPassword resetPath={resetPath} />
              </div>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <div className={`lf-input-wrap${errors.password ? ' lf-input-error' : ''}`}>
                    <i className="pi pi-lock lf-input-icon" />
                    <Input
                      {...field}
                      id="lf-password"
                      type="password"
                      placeholder="Enter your password"
                      disabled={isLoading}
                      aria-invalid={!!errors.password}
                    />
                  </div>
                )}
              />
              {errors.password && (
                <span className="lf-field-error">{errors.password.message}</span>
              )}
            </div>

            {/* Captcha */}
            <div className="lf-field">
              <label className="lf-label">Security Code</label>
              <Captcha />
              <Controller
                name="captcha"
                control={control}
                render={({ field }) => (
                  <div className={`lf-input-wrap${errors.captcha ? ' lf-input-error' : ''}`} style={{ marginTop: '0.5rem' }}>
                    <i className="pi pi-shield lf-input-icon" />
                    <Input
                      {...field}
                      id="lf-captcha"
                      placeholder="Enter the code above"
                      disabled={isLoading}
                      aria-invalid={!!errors.captcha}
                    />
                  </div>
                )}
              />
              {errors.captcha && (
                <span className="lf-field-error">{errors.captcha.message}</span>
              )}
            </div>

            {/* Submit */}
            <Button
              id="lf-submit"
              type="submit"
              label={isLoading ? 'Authenticating…' : 'Login'}
              icon={isLoading ? 'pi pi-spin pi-spinner' : 'pi pi-sign-in'}
              iconPos="right"
              disabled={isLoading}
              className="lf-submit-btn"
            />
          </form>

          <p className="lf-app-name">{appName}</p>
        </div>

        {/* ── RIGHT: Visual Panel ── */}
        <div className="lf-right">
          {/* Animated blobs */}
          <div className="lf-blob lf-blob-1" />
          <div className="lf-blob lf-blob-2" />
          <div className="lf-blob lf-blob-3" />

          <div className="lf-illustration">
            {/* Shield icon */}
            <div className="lf-shield">
              <i className="pi pi-shield lf-shield-icon" />
            </div>

            {/* Feature cards */}
            <div className="lf-feature-cards">
              <div className="lf-feature-card">
                <div className="lf-feature-icon lf-feature-icon-purple">
                  <i className="pi pi-lock" />
                </div>
                <div className="lf-feature-text">
                  <h4>Secure Access</h4>
                  <p>Enterprise-grade encryption</p>
                </div>
              </div>

              <div className="lf-feature-card">
                <div className="lf-feature-icon lf-feature-icon-pink">
                  <i className="pi pi-check-circle" />
                </div>
                <div className="lf-feature-text">
                  <h4>Multi-Factor Auth</h4>
                  <p>OTP & SingleID supported</p>
                </div>
              </div>

              <div className="lf-feature-card">
                <div className="lf-feature-icon lf-feature-icon-blue">
                  <i className="pi pi-server" />
                </div>
                <div className="lf-feature-text">
                  <h4>VM Management</h4>
                  <p>Full lifecycle control</p>
                </div>
              </div>
            </div>

            <p className="lf-tagline">
              Manage your virtual infrastructure with confidence
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

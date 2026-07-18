'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Toast } from 'primereact/toast';
import { Input, Button } from '@repo/ui';
import { useUpdatePasswordMutation } from '../hooks/useAuthMutations';
import './ResetPasswordForm.css';

// ── Password rules ───────────────────────────────────────────
export const passwordRules = [
  { id: 'length',    label: 'At least 8 characters',             test: (v: string) => v.length >= 8 },
  { id: 'upper',     label: 'At least one uppercase letter (A–Z)',test: (v: string) => /[A-Z]/.test(v) },
  { id: 'lower',     label: 'At least one lowercase letter (a–z)',test: (v: string) => /[a-z]/.test(v) },
  { id: 'number',    label: 'At least one number (0–9)',          test: (v: string) => /\d/.test(v) },
  { id: 'special',   label: 'At least one special character (!@#$…)', test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];

const getStrengthScore = (password: string) =>
  passwordRules.filter((r) => r.test(password)).length;

const strengthMeta = [
  { label: 'Weak',   cls: 'weak',   segments: 1 },
  { label: 'Weak',   cls: 'weak',   segments: 1 },
  { label: 'Fair',   cls: 'fair',   segments: 2 },
  { label: 'Good',   cls: 'good',   segments: 3 },
  { label: 'Strong', cls: 'strong', segments: 4 },
  { label: 'Strong', cls: 'strong', segments: 4 },
];

// ── Zod schema ────────────────────────────────────────────────
const resetSchema = z
  .object({
    username: z.string().min(1, 'Username is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain an uppercase letter')
      .regex(/[a-z]/, 'Must contain a lowercase letter')
      .regex(/\d/, 'Must contain a number')
      .regex(/[^A-Za-z0-9]/, 'Must contain a special character'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormData = z.infer<typeof resetSchema>;

// ── Props ─────────────────────────────────────────────────────
interface ResetPasswordFormProps {
  appName: string;
  loginPath: string; // e.g. '/vm/login' | '/oams/login' | '/srms/login'
}

// ── Component ─────────────────────────────────────────────────
export function ResetPasswordForm({ appName, loginPath }: ResetPasswordFormProps) {
  const router = useRouter();
  const toastRef = useRef<Toast>(null);
  const updateMutation = useUpdatePasswordMutation();

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetSchema as any),
    defaultValues: { username: '', newPassword: '', confirmPassword: '' },
    mode: 'onChange',
  });

  const watchedPassword = watch('newPassword') ?? '';
  const watchedConfirm  = watch('confirmPassword') ?? '';
  const score           = getStrengthScore(watchedPassword);
  const meta            = strengthMeta[score] ?? strengthMeta[0];

  // Determine per-rule state: 'pass' | 'fail' | 'error' (typed but doesn't pass yet)
  const getRuleState = (rule: (typeof passwordRules)[0]) => {
    if (!watchedPassword) return 'fail';
    return rule.test(watchedPassword) ? 'pass' : 'error';
  };

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setApiError(null);
      const res = await updateMutation.mutateAsync({
        username: data.username,
        newPassword: data.newPassword,
      });

      if (res.success) {
        toastRef.current?.show({
          severity: 'success',
          summary: 'Password Updated',
          detail: 'Your password has been changed successfully. Redirecting to login…',
          life: 3000,
        });
        setTimeout(() => router.push(loginPath), 2800);
      } else {
        setApiError(res.msg || 'Password update failed. Please try again.');
      }
    } catch (err: any) {
      setApiError(err?.response?.data?.msg || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="rp-page">
      {/* PrimeReact Toast */}
      <Toast ref={toastRef} position="top-right" />

      <div className="rp-card">
        {/* ── LEFT: Form Panel ── */}
        <div className="rp-left">
          {/* Back button */}
          <button
            className="rp-back-btn"
            onClick={() => router.push(loginPath)}
            type="button"
            aria-label="Back to login"
          >
            <i className="pi pi-arrow-left" />
            Back to Login
          </button>

          {/* Icon */}
          <div className="rp-icon-wrap">
            <div className="rp-icon-circle">
              <i className="pi pi-key" />
            </div>
          </div>

          <h1 className="rp-heading">Reset Password</h1>
          <p className="rp-subheading">
            Create a new strong password for your {appName} account
          </p>

          {/* API error */}
          {apiError && (
            <div className="rp-banner rp-banner-error">
              <i className="pi pi-exclamation-circle" />
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="rp-form" noValidate>
            {/* Username */}
            <div className="rp-field">
              <label className="rp-label" htmlFor="rp-username">Username</label>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <div className={`rp-input-wrap${errors.username ? ' rp-input-error' : ''}`}>
                    <i className="pi pi-user rp-input-icon" />
                    <Input
                      {...field}
                      id="rp-username"
                      placeholder="Enter your username"
                      disabled={updateMutation.isPending}
                    />
                  </div>
                )}
              />
              {errors.username && (
                <span className="rp-field-error">{errors.username.message}</span>
              )}
            </div>

            {/* New Password */}
            <div className="rp-field">
              <label className="rp-label" htmlFor="rp-new-password">New Password</label>
              <Controller
                name="newPassword"
                control={control}
                render={({ field }) => (
                  <div className={`rp-input-wrap${errors.newPassword ? ' rp-input-error' : watchedPassword && score === 5 ? ' rp-input-success' : ''}`}>
                    <i className="pi pi-lock rp-input-icon" />
                    <Input
                      {...field}
                      id="rp-new-password"
                      type={showNew ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      disabled={updateMutation.isPending}
                    />
                    <button
                      type="button"
                      className="rp-input-eye"
                      onClick={() => setShowNew((v) => !v)}
                      aria-label={showNew ? 'Hide password' : 'Show password'}
                    >
                      <i className={`pi ${showNew ? 'pi-eye-slash' : 'pi-eye'}`} />
                    </button>
                  </div>
                )}
              />
              {errors.newPassword && (
                <span className="rp-field-error">{errors.newPassword.message}</span>
              )}

              {/* Strength checker — shown as soon as user starts typing */}
              {watchedPassword.length > 0 && (
                <div className="rp-strength-box">
                  <p className="rp-strength-title">
                    <i className="pi pi-shield" />
                    Password Requirements
                  </p>
                  <div className="rp-strength-rules">
                    {passwordRules.map((rule) => {
                      const state = getRuleState(rule);
                      return (
                        <div key={rule.id} className={`rp-strength-rule rp-rule-${state}`}>
                          <div className="rp-rule-icon">
                            <i className={`pi ${state === 'pass' ? 'pi-check' : state === 'error' ? 'pi-times' : 'pi-minus'}`} />
                          </div>
                          {rule.label}
                        </div>
                      );
                    })}
                  </div>

                  {/* Strength bar */}
                  <div className="rp-strength-bar-wrap">
                    <div className="rp-strength-bar-track">
                      {[1, 2, 3, 4].map((seg) => (
                        <div
                          key={seg}
                          className={`rp-strength-segment${seg <= meta.segments ? ` active-${meta.cls}` : ''}`}
                        />
                      ))}
                    </div>
                    <span className={`rp-strength-label label-${meta.cls}`}>
                      Strength: {meta.label}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="rp-field">
              <label className="rp-label" htmlFor="rp-confirm-password">Confirm New Password</label>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <div className={`rp-input-wrap${errors.confirmPassword ? ' rp-input-error' : watchedConfirm && watchedConfirm === watchedPassword ? ' rp-input-success' : ''}`}>
                    <i className="pi pi-lock rp-input-icon" />
                    <Input
                      {...field}
                      id="rp-confirm-password"
                      type={showConfirm ? 'text' : 'password'}
                      placeholder="Re-enter your new password"
                      disabled={updateMutation.isPending}
                    />
                    <button
                      type="button"
                      className="rp-input-eye"
                      onClick={() => setShowConfirm((v) => !v)}
                      aria-label={showConfirm ? 'Hide password' : 'Show password'}
                    >
                      <i className={`pi ${showConfirm ? 'pi-eye-slash' : 'pi-eye'}`} />
                    </button>
                  </div>
                )}
              />

              {/* Inline match hint */}
              {watchedConfirm.length > 0 && (
                <span className={`rp-match-hint ${watchedConfirm === watchedPassword ? 'match-ok' : 'match-bad'}`}>
                  <i className={`pi ${watchedConfirm === watchedPassword ? 'pi-check-circle' : 'pi-times-circle'}`} />
                  {watchedConfirm === watchedPassword ? 'Passwords match' : 'Passwords do not match'}
                </span>
              )}
              {errors.confirmPassword && (
                <span className="rp-field-error">{errors.confirmPassword.message}</span>
              )}
            </div>

            {/* Submit */}
            <Button
              id="rp-submit-btn"
              type="submit"
              label={updateMutation.isPending ? 'Updating Password…' : 'Update Password'}
              icon={updateMutation.isPending ? 'pi pi-spin pi-spinner' : 'pi pi-check'}
              iconPos="right"
              disabled={updateMutation.isPending}
              className="rp-submit-btn"
            />
          </form>

          <p className="rp-app-name">{appName}</p>
        </div>

        {/* ── RIGHT: Visual Panel ── */}
        <div className="rp-right">
          <div className="rp-blob rp-blob-1" />
          <div className="rp-blob rp-blob-2" />
          <div className="rp-blob rp-blob-3" />

          <div className="rp-illustration">
            {/* Central icon */}
            <div className="rp-visual-icon">
              <i className="pi pi-key" />
            </div>

            {/* Info cards */}
            <div className="rp-info-cards">
              <div className="rp-info-card">
                <div className="rp-info-icon rp-info-icon-purple">
                  <i className="pi pi-shield" />
                </div>
                <div className="rp-info-text">
                  <h4>Strong Password</h4>
                  <p>Mix letters, numbers & symbols</p>
                </div>
              </div>

              <div className="rp-info-card">
                <div className="rp-info-icon rp-info-icon-green">
                  <i className="pi pi-lock" />
                </div>
                <div className="rp-info-text">
                  <h4>Encrypted Storage</h4>
                  <p>Your password is stored securely</p>
                </div>
              </div>

              <div className="rp-info-card">
                <div className="rp-info-icon rp-info-icon-orange">
                  <i className="pi pi-refresh" />
                </div>
                <div className="rp-info-text">
                  <h4>Regular Updates</h4>
                  <p>Change every 90 days recommended</p>
                </div>
              </div>
            </div>

            <p className="rp-tagline">
              A strong password is your first line of defence
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

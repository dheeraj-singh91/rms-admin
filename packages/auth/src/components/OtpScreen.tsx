'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@repo/ui';
import { OtpInput } from './OtpInput';
import { Countdown } from './Countdown';
import { useVerifyOtpMutation, useSendOtpMutation } from '../hooks/useAuthMutations';
import './OtpScreen.css';

interface OtpScreenProps {
  username: string;
  appName: string;
  initialValidity: number;
}

export function OtpScreen({ username, appName, initialValidity }: OtpScreenProps) {
  const [otp, setOtp] = useState('');
  const [validity, setValidity] = useState(initialValidity);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const verifyMutation = useVerifyOtpMutation();
  const sendMutation = useSendOtpMutation();

  const handleVerify = async () => {
    try {
      setError(null);
      const res = await verifyMutation.mutateAsync({ otp });
      if (res.success) {
        router.push(res.desiredScreen || '/');
      } else {
        setError(res.msg || 'Invalid OTP');
      }
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Verification failed');
    }
  };

  const handleResend = async () => {
    try {
      setError(null);
      const res = await sendMutation.mutateAsync({ username, password: '' });
      if (res.success) {
        setValidity(res.otpValidity);
        setOtp('');
      }
    } catch (err) {
      setError('Failed to resend OTP');
    }
  };

  return (
    <div className="otp-page">
      <div className="otp-card">
        {/* ── LEFT: OTP Form Panel ── */}
        <div className="otp-left">
          {/* Back button */}
          <button
            className="otp-back-btn"
            onClick={() => router.back()}
            type="button"
            aria-label="Go back"
          >
            <i className="pi pi-arrow-left" />
            Back to Login
          </button>

          {/* Icon */}
          <div className="otp-icon-wrap">
            <div className="otp-icon-circle">
              <i className="pi pi-mobile" />
            </div>
          </div>

          <h1 className="otp-heading">Verify Your Identity</h1>
          <p className="otp-subheading">
            Enter the 6-digit security code sent to<br />
            <strong>{username ? `${username}'s registered device` : 'your registered device'}</strong>
          </p>

          {/* Error */}
          {error && (
            <div className="otp-error">
              <i className="pi pi-exclamation-circle" />
              {error}
            </div>
          )}

          {/* OTP digit inputs */}
          <OtpInput
            value={otp}
            onChange={setOtp}
            length={6}
            disabled={verifyMutation.isPending}
          />

          {/* Countdown / Resend */}
          <div className="otp-countdown-wrap">
            <span className="otp-countdown-label">Code expires in</span>
            <Countdown
              initialSeconds={validity}
              onResend={handleResend}
              isLoading={sendMutation.isPending}
            />
          </div>

          {/* Verify button */}
          <Button
            id="otp-verify-btn"
            label={verifyMutation.isPending ? 'Verifying…' : 'Verify Code'}
            icon={verifyMutation.isPending ? 'pi pi-spin pi-spinner' : 'pi pi-check-circle'}
            iconPos="right"
            disabled={otp.length !== 6 || verifyMutation.isPending}
            onClick={handleVerify}
            className="otp-verify-btn"
          />

          <p className="otp-app-name">{appName}</p>
        </div>

        {/* ── RIGHT: Visual Panel ── */}
        <div className="otp-right">
          {/* Blobs */}
          <div className="otp-blob otp-blob-1" />
          <div className="otp-blob otp-blob-2" />
          <div className="otp-blob otp-blob-3" />

          <div className="otp-illustration">
            {/* Central icon */}
            <div className="otp-visual-icon">
              <i className="pi pi-mobile" />
            </div>

            {/* Animated OTP dots preview */}
            <div className="otp-dots-preview">
              {['•', '•', '•', '•', '•', '•'].map((dot, i) => (
                <div key={i} className="otp-dot">{dot}</div>
              ))}
            </div>

            {/* Info cards */}
            <div className="otp-info-cards">
              <div className="otp-info-card">
                <div className="otp-info-icon otp-info-icon-purple">
                  <i className="pi pi-clock" />
                </div>
                <div className="otp-info-text">
                  <h4>Time-Limited</h4>
                  <p>Code expires automatically</p>
                </div>
              </div>

              <div className="otp-info-card">
                <div className="otp-info-icon otp-info-icon-green">
                  <i className="pi pi-shield" />
                </div>
                <div className="otp-info-text">
                  <h4>One-Time Use</h4>
                  <p>Valid for a single sign-in</p>
                </div>
              </div>

              <div className="otp-info-card">
                <div className="otp-info-icon otp-info-icon-orange">
                  <i className="pi pi-refresh" />
                </div>
                <div className="otp-info-text">
                  <h4>Resendable</h4>
                  <p>Request a new code anytime</p>
                </div>
              </div>
            </div>

            <p className="otp-tagline">
              Two-factor authentication keeps your account safe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

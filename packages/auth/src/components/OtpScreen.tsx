'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button } from '@repo/ui';
import { OtpInput } from './OtpInput';
import { Countdown } from './Countdown';
import { useVerifyOtpMutation, useSendOtpMutation } from '../hooks/useAuthMutations';

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
      // In reality, password would be securely managed, but for the mock payload:
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">{appName} Security</h2>
        <p className="text-gray-600 mb-6">Enter the 6-digit code sent to your device.</p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded text-sm text-left">
            {error}
          </div>
        )}

        <div className="mb-6">
          <OtpInput value={otp} onChange={setOtp} length={6} disabled={verifyMutation.isPending} />
        </div>

        <div className="mb-6 flex justify-center">
          <Countdown initialSeconds={validity} onResend={handleResend} isLoading={sendMutation.isPending} />
        </div>

        <Button
          label={verifyMutation.isPending ? 'Verifying...' : 'Verify'}
          disabled={otp.length !== 6 || verifyMutation.isPending}
          onClick={handleVerify}
          className="w-full py-2.5"
        />
      </Card>
    </div>
  );
}

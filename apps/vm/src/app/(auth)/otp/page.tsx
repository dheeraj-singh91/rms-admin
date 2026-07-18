'use client';

import { useSearchParams } from 'next/navigation';
import { OtpScreen } from '@repo/auth';
import { appConfig } from '../../../config/app.config';
import { Suspense } from 'react';

function OtpContent() {
  const searchParams = useSearchParams();
  const validity = Number(searchParams.get('validity')) || 180;
  const username = searchParams.get('username') || '';

  return (
    <OtpScreen
      username={username}
      appName={appConfig.displayName}
      initialValidity={validity}
    />
  );
}

export default function OtpPage() {
  return (
    <Suspense fallback={<div>Loading OTP...</div>}>
      <OtpContent />
    </Suspense>
  );
}

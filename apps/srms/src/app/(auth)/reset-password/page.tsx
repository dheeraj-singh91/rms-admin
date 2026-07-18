'use client';

import { ResetPasswordForm } from '@repo/auth';
import { appConfig } from '../../../config/app.config';

export default function ResetPasswordPage() {
  return (
    <ResetPasswordForm
      appName={appConfig.displayName}
      loginPath="/login"
    />
  );
}

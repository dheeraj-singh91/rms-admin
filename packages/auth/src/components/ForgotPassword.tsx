'use client';

import { useRouter } from 'next/navigation';

interface ForgotPasswordProps {
  resetPath?: string; // e.g. '/vm/reset-password'
}

export function ForgotPassword({ resetPath }: ForgotPasswordProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (resetPath) {
      router.push(resetPath);
    }
  };

  return (
    <a
      href={resetPath ?? '#'}
      className="lf-forgot"
      onClick={handleClick}
    >
      Forgot Password?
    </a>
  );
}

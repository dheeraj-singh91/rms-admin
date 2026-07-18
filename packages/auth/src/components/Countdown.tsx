import { useState, useEffect } from 'react';
import { Button } from '@repo/ui';

interface CountdownProps {
  initialSeconds: number;
  onResend: () => void;
  isLoading?: boolean;
}

export function Countdown({ initialSeconds, onResend, isLoading }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    setTimeLeft(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (timeLeft > 0) {
    return <div className="text-gray-600 font-mono text-lg">{formatTime(timeLeft)}</div>;
  }

  return (
    <Button
      label="Resend OTP"
      severity="secondary"
      onClick={() => {
        onResend();
      }}
      disabled={isLoading}
    />
  );
}

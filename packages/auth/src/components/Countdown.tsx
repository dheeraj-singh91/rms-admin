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
    return <span className="otp-timer">{formatTime(timeLeft)}</span>;
  }

  return (
    <Button
      label="Resend OTP"
      onClick={onResend}
      disabled={isLoading}
      className="otp-resend-btn"
    />
  );
}

import React, { useRef, KeyboardEvent, ClipboardEvent } from 'react';
import { Input } from '@repo/ui';

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
}

export function OtpInput({ value, onChange, length = 6, disabled = false }: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const getDigits = () => {
    const digits = value.split('').slice(0, length);
    while (digits.length < length) digits.push('');
    return digits;
  };

  const digits = getDigits();

  const focusInput = (index: number) => {
    if (index >= 0 && index < length) {
      inputRefs.current[index]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (digits[index] === '') {
        // Move to previous if current is already empty
        const newDigits = [...digits];
        if (index > 0) {
          newDigits[index - 1] = '';
          onChange(newDigits.join(''));
          focusInput(index - 1);
        }
      } else {
        // Clear current
        const newDigits = [...digits];
        newDigits[index] = '';
        onChange(newDigits.join(''));
      }
    } else if (e.key === 'ArrowLeft') {
      focusInput(index - 1);
    } else if (e.key === 'ArrowRight') {
      focusInput(index + 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (!val) return;
    
    // Use only the last character entered
    const char = val.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = char;
    onChange(newDigits.join(''));
    
    if (char && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, length);
    if (pastedData) {
      const newDigits = [...digits];
      for (let i = 0; i < pastedData.length; i++) {
        if (i < length) newDigits[i] = pastedData[i];
      }
      onChange(newDigits.join(''));
      focusInput(Math.min(pastedData.length, length - 1));
    }
  };

  return (
    <div className="flex gap-2 justify-between w-full max-w-xs mx-auto">
      {digits.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={2} // allow typing over to get last char
          value={digit}
          disabled={disabled}
          autoFocus={index === 0}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
        />
      ))}
    </div>
  );
}

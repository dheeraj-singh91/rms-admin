import { InputText, type InputTextProps } from 'primereact/inputtext';
import { forwardRef } from 'react';

export interface InputProps extends InputTextProps {}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <InputText ref={ref} {...props} />;
});
Input.displayName = 'Input';

import { Button as PRButton, type ButtonProps as PRButtonProps } from 'primereact/button';
import { forwardRef } from 'react';

export interface ButtonProps extends PRButtonProps {}

export const Button = forwardRef<PRButton, ButtonProps>((props, ref) => {
  return <PRButton ref={ref} {...props} />;
});
Button.displayName = 'Button';



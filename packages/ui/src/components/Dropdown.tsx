import { Dropdown as PRDropdown, type DropdownProps as PRDropdownProps } from 'primereact/dropdown';
import { forwardRef } from 'react';

export interface DropdownProps extends PRDropdownProps {}

export const Dropdown = forwardRef<PRDropdown, DropdownProps>((props, ref) => {
  return <PRDropdown ref={ref} {...props} />;
});
Dropdown.displayName = 'Dropdown';

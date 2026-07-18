import { InputText } from 'primereact/inputtext';
import { forwardRef } from 'react';

export interface SearchFilterProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchFilter = forwardRef<HTMLInputElement, SearchFilterProps>(({ value, onChange, placeholder = 'Search...', className }, ref) => {
  return (
    <div className={`p-input-icon-left ${className || ''}`}>
      <i className="pi pi-search" />
      <InputText 
        ref={ref} 
        value={value} 
        onChange={(e) => onChange?.(e.target.value)} 
        placeholder={placeholder} 
      />
    </div>
  );
});
SearchFilter.displayName = 'SearchFilter';

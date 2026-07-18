import { ProgressSpinner, type ProgressSpinnerProps } from 'primereact/progressspinner';
import { forwardRef } from 'react';

export interface LoaderProps extends ProgressSpinnerProps {}

export const Loader = forwardRef<any, LoaderProps>((props, ref) => {
  return (
    <div className="flex items-center justify-center p-4">
      <ProgressSpinner ref={ref} {...props} />
    </div>
  );
});
Loader.displayName = 'Loader';



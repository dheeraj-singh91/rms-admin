import { Dialog as PRDialog, type DialogProps as PRDialogProps } from 'primereact/dialog';
import { forwardRef } from 'react';

export interface DialogProps extends PRDialogProps {}

export const Dialog = forwardRef<PRDialog, DialogProps>((props, ref) => {
  return <PRDialog ref={ref} {...props} />;
});
Dialog.displayName = 'Dialog';

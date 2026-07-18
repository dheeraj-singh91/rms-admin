import { ConfirmPopup as PRConfirmPopup, type ConfirmPopupProps as PRConfirmPopupProps } from 'primereact/confirmpopup';
import { forwardRef } from 'react';

export interface ConfirmPopupProps extends PRConfirmPopupProps {}

export const ConfirmPopup = forwardRef<PRConfirmPopup, ConfirmPopupProps>((props, ref) => {
  return <PRConfirmPopup ref={ref} {...props} />;
});
ConfirmPopup.displayName = 'ConfirmPopup';

export { confirmPopup } from 'primereact/confirmpopup';

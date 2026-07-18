import { BreadCrumb as PRBreadCrumb, type BreadCrumbProps as PRBreadCrumbProps } from 'primereact/breadcrumb';
import { forwardRef } from 'react';

export interface BreadcrumbProps extends PRBreadCrumbProps {}

export const Breadcrumb = forwardRef<PRBreadCrumb, BreadcrumbProps>((props, ref) => {
  return <PRBreadCrumb ref={ref} {...props} />;
});
Breadcrumb.displayName = 'Breadcrumb';

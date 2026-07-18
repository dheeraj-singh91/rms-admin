import { Paginator as PRPaginator, type PaginatorProps as PRPaginatorProps } from 'primereact/paginator';
import { forwardRef } from 'react';

export interface PaginationProps extends PRPaginatorProps {}

export const Pagination = forwardRef<PRPaginator, PaginationProps>((props, ref) => {
  return <PRPaginator ref={ref} {...props} />;
});
Pagination.displayName = 'Pagination';

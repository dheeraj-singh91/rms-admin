import { DataTable as PRDataTable, type DataTableProps as PRDataTableProps, type DataTableValueArray } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { forwardRef, type ReactNode } from 'react';

export type DataTableProps<TValue extends DataTableValueArray> = PRDataTableProps<TValue> & {
  children?: ReactNode;
};


// We type as any for the forwardRef signature due to generic limitations with forwardRef, 
// but users will usually not need to ref the DataTable.
export const DataTable = forwardRef<PRDataTable<any>, DataTableProps<any>>((props, ref) => {
  return <PRDataTable ref={ref} {...props} />;
});
DataTable.displayName = 'DataTable';

export { Column };

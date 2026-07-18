import { useState, useCallback, useMemo } from 'react';
import type { PaginationMeta } from '@repo/types';

export interface UsePaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
  maxPages?: number;
}

/**
 * usePagination - Manage pagination state
 */
export function usePagination(
  total: number,
  options: UsePaginationOptions = {}
) {
  const [page, setPage] = useState(options.initialPage || 1);
  const [pageSize, setPageSize] = useState(options.initialPageSize || 10);

  const totalPages = Math.ceil(total / pageSize);

  const pagination = useMemo<PaginationMeta>(
    () => ({
      page,
      pageSize,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    }),
    [page, pageSize, total, totalPages]
  );

  const goToPage = useCallback(
    (newPage: number) => {
      const validPage = Math.max(1, Math.min(newPage, totalPages));
      setPage(validPage);
    },
    [totalPages]
  );

  const goToFirstPage = useCallback(() => {
    setPage(1);
  }, []);

  const goToLastPage = useCallback(() => {
    setPage(totalPages);
  }, [totalPages]);

  const nextPage = useCallback(() => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const previousPage = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const setNewPageSize = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  }, []);

  return {
    page,
    pageSize,
    totalPages,
    pagination,
    goToPage,
    goToFirstPage,
    goToLastPage,
    nextPage,
    previousPage,
    setPageSize: setNewPageSize,
  };
}

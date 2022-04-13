import { useState } from "react";

type PaginationProps<T> = {
  data: T[];
  perPage: number;
};

type PaginationReturn<T> = {
  hasNext: () => boolean;
  hasPrev: () => boolean;
  next: () => void;
  prev: () => void;
  currentPage: number;
  data: T[];
};

export default function usePagination<T>(
  props: PaginationProps<T>
): PaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(0);

  const next = () => hasNext() && setCurrentPage(currentPage + 1);
  const prev = () => hasPrev() && setCurrentPage(currentPage - 1);

  const left = currentPage * props.perPage;
  const right =
    left + props.perPage > props.data.length
      ? props.data.length
      : left + props.perPage;
  const hasPrev = () => currentPage > 0;
  const hasNext = () => right < props.data.length;

  return {
    hasNext,
    hasPrev,
    next,
    prev,
    currentPage: currentPage,
    data: props.data.slice(left, right),
  };
}

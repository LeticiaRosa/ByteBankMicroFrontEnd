import { useState, useEffect, useCallback } from "react";

interface UseInfiniteScrollProps {
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isLoading: boolean;
}

export const useInfiniteScroll = ({
  hasNextPage,
  fetchNextPage,
  isLoading,
}: UseInfiniteScrollProps) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000 || // Trigger antes de chegar ao fim
      isFetching ||
      isLoading ||
      !hasNextPage
    ) {
      if (!isFetching && !isLoading && hasNextPage) {
        setIsFetching(true);
      }
    }
  }, [isFetching, isLoading, hasNextPage]);

  const fetchMoreData = useCallback(() => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
    setIsFetching(false);
  }, [hasNextPage, isLoading, fetchNextPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreData();
  }, [isFetching, fetchMoreData]);

  return { isFetching };
};

import { useState, useMemo, useCallback, useEffect } from "react";
import { FilterOptions, Transaction } from "../types/transaction";
import { useConta } from "../contexts/ContaContext";

const ITEMS_PER_PAGE = 5;

export const usePaginatedTransactions = (filters: FilterOptions) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const {
    transacoesFiltradas,
    lastTransaction: ultima_transacao,
    gruposTransacoes,
    groupTransactionsByMonth,
  } = useConta();

  // Filtrar todas as transações
  const allFilteredTransactions: Transaction[] = useMemo(() => {
    return transacoesFiltradas(filters);
  }, [filters]);

  // Transações visíveis (paginadas)
  const visibleTransactions: Transaction[] = useMemo(() => {
    return allFilteredTransactions.slice(0, currentPage * ITEMS_PER_PAGE);
  }, [allFilteredTransactions, currentPage]);

  // Verificar se há mais páginas
  const hasNextPage = useMemo(() => {
    return visibleTransactions.length < allFilteredTransactions.length;
  }, [visibleTransactions.length, allFilteredTransactions.length]);

  // Última transação
  const lastTransaction: Transaction = useMemo(() => {
    return ultima_transacao();
  }, [allFilteredTransactions]);

  // Transações agrupadas por mês (apenas as visíveis)
  const transacoesPorMes = useMemo(() => {
    return groupTransactionsByMonth(visibleTransactions);
  }, [visibleTransactions]);

  // Carregar próxima página
  const fetchNextPage = useCallback(() => {
    if (hasNextPage && !isLoading) {
      setIsLoading(true);

      // Simular delay de carregamento realista
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1);
        setIsLoading(false);
      }, 2000);
    }
  }, [hasNextPage, isLoading]);

  // Reset da paginação quando filtros mudam
  const resetPagination = useCallback(() => {
    setCurrentPage(1);
    setIsLoading(false);
  }, []);

  // Reset automático quando filtros mudam
  useEffect(() => {
    setCurrentPage(1);
    setIsLoading(false);
  }, [filters]);

  return {
    visibleTransactions,
    transacoesPorMes,
    lastTransaction,
    hasNextPage,
    isLoading,
    fetchNextPage,
    resetPagination,
    totalTransactions: allFilteredTransactions.length,
    visibleCount: visibleTransactions.length,
    currentPage,
  };
};

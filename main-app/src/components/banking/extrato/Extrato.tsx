"use client";
import React, { useEffect, useState } from "react";
import { useConta } from "../../../contexts/ContaContext";
import TransacaoForm from "../TransacaoForm";
import ItemExtrato from "./ItemExtrato";
import Modal from "../../ui/Modal";
import { FilterOptions, Transaction } from "../../../types/transaction";
import { usePaginatedTransactions } from "../../../hooks/usePaginatedTransactions";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import TransactionFilter from "../TransactionFilter";
import LoadingSpinner from "../../ui/form/LoadingSpinner";

export default function Extrato() {
  const [isClient, setIsClient] = useState(false);

  const { gruposTransacoes } = useConta();
  // Estados para filtros e modal
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({});
  const [transacaoParaEditar, setTransacaoParaEditar] =
    useState<Transaction | null>(null);
  const [modalAberto, setModalAberto] = useState(false);

  // Hook para transações paginadas
  const {
    transacoesPorMes,
    lastTransaction,
    hasNextPage,
    isLoading,
    fetchNextPage,
    totalTransactions,
    visibleCount,
    currentPage,
  } = usePaginatedTransactions(activeFilters);

  // Hook para scroll infinito
  const { isFetching } = useInfiniteScroll({
    hasNextPage,
    fetchNextPage,
    isLoading,
  });

  const abrirModal = (transacao: Transaction) => {
    setTransacaoParaEditar(transacao);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setTransacaoParaEditar(null);
    setModalAberto(false);
  };

  const handleSave = () => {
    // Após salvar, feche o modal
    fecharModal();
  };

  const handleApplyFilter = (filters: FilterOptions) => {
    setActiveFilters(filters);
  };

  const handleClearFilter = () => {
    setActiveFilters({});
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <aside className="card max-md:items-center relative min-w-80">
        <h3 className="title pb-8">Extrato</h3>
        <div className="flex justify-center items-center py-8">
          <LoadingSpinner text="Carregando extrato..." />
        </div>
      </aside>
    );
  }
  return (
    <aside className="card max-md:items-center relative">
      <h3 className="title pb-8">Extrato</h3>

      {/* Componente de Filtro */}
      <TransactionFilter
        onApplyFilter={handleApplyFilter}
        onClearFilter={handleClearFilter}
        activeFilters={activeFilters}
      />

      <div className="transacoes max-md:items-center">
        {/* Última operação realizada */}
        {lastTransaction && (
          <div className="mb-4 w-full max-w-96 max-sm:max-w-full">
            <div className="border-l-4 border-verde pl-4">
              <h3 className="text-lg font-semibold text-gray-800 ">
                Última operação
              </h3>
              <div className="flex justify-between items-start">
                <ItemExtrato
                  typeItemExtrato="LastTransaction"
                  id={lastTransaction.id}
                  key={lastTransaction.id}
                  type={lastTransaction.type}
                  amount={lastTransaction.amount}
                  date={lastTransaction.date}
                  recipient={lastTransaction.recipient}
                  category={lastTransaction.category}
                  onEditar={() => abrirModal(lastTransaction)}
                />
              </div>
            </div>
          </div>
        )}
        <span className="text-lg font-semibold text-gray-800 mb-2">
          {totalTransactions > 0 && (
            <>
              <p>Histórico completo</p>
              <span className="text-sm text-gray-500 ml-2">
                ({visibleCount} de {totalTransactions}
                {currentPage > 1 && ` • Página ${currentPage}`})
              </span>
            </>
          )}
        </span>
        {totalTransactions === 0 && (
          <div className="flex flex-col items-center justify-center">
            <h4 className="text-center">
              {Object.keys(activeFilters).length > 0
                ? "Nenhuma transação encontrada com os filtros aplicados"
                : "Nenhuma transação encontrada"}
            </h4>
          </div>
        )}
        {totalTransactions > 0 &&
          Object.entries(transacoesPorMes).map(([mes, transacoes]) => (
            <div key={mes} className="w-full max-w-96 max-sm:max-w-full">
              <h4 className="mes-group">{mes}</h4>
              {(transacoes as Transaction[]).map((transacao) => (
                <ItemExtrato
                  typeItemExtrato="Transaction"
                  id={transacao.id}
                  key={transacao.id}
                  type={transacao.type}
                  amount={transacao.amount}
                  date={transacao.date}
                  recipient={transacao.recipient}
                  category={transacao.category}
                  onEditar={() => abrirModal(transacao)}
                />
              ))}
            </div>
          ))}

        {/* Loading spinner para scroll infinito */}
        {(isLoading || isFetching) && (
          <div className="w-full max-w-96 max-sm:max-w-full">
            <LoadingSpinner text="Carregando mais transações..." />
          </div>
        )}

        {/* Indicador de fim da lista */}
        {!hasNextPage && totalTransactions > 0 && (
          <div className="text-center py-4">
            <p className="text-sm text-gray-500">
              Todas as transações foram carregadas
            </p>
          </div>
        )}
      </div>

      {modalAberto && (
        <Modal onClose={fecharModal} title="Editar Transação">
          <TransacaoForm
            fecharModal={fecharModal}
            modo="editar"
            transacaoParaEditar={transacaoParaEditar}
            onSave={handleSave}
          />
        </Modal>
      )}
    </aside>
  );
}

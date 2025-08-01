import { createContext, useContext, useEffect, useState } from "react";
import Conta, { GrupoTransacao } from "../controllers/Conta";
import { FilterOptions, Transaction } from "../types/transaction";

type ContaContextType = {
  saldo: number;
  gruposTransacoes: GrupoTransacao[];
  registrarTransacao: (transacao: Transaction) => void;
  atualizarTransacao: (transacao: Transaction) => void;
  removerTransacao: (id: string) => void;
  transacoesFiltradas: (filterOptions: FilterOptions) => Transaction[];
  lastTransaction: (gruposTransacoes: Transaction[]) => Transaction | null;
  groupTransactionsByMonth: (
    transactions: Transaction[]
  ) => Record<string, Transaction[]>;
};

const ContaContext = createContext({} as ContaContextType);

export function ContaProvider({ children }: { children: React.ReactNode }) {
  const [saldo, setSaldo] = useState<number>(0);
  const [gruposTransacoes, setGruposTransacoes] = useState<GrupoTransacao[]>(
    []
  );

  useEffect(() => {
    setSaldo(Conta.getSaldo());
    setGruposTransacoes(Conta.getGruposTransacoes());
  }, []);

  function registrarTransacao(transacao: Transaction) {
    Conta.registrarTransacao(transacao);
    setGruposTransacoes(Conta.getGruposTransacoes());
    setSaldo(Conta.getSaldo());
  }

  function atualizarTransacao(transacaoAtualizada: Transaction) {
    Conta.atualizarTransacao(transacaoAtualizada);
    setGruposTransacoes(Conta.getGruposTransacoes());
    setSaldo(Conta.getSaldo());
  }

  function removerTransacao(id: string) {
    Conta.excluirTransacao(id);
    setGruposTransacoes(Conta.getGruposTransacoes());
    setSaldo(Conta.getSaldo());
  }

  function transacoesFiltradas(filterOptions: FilterOptions): Transaction[] {
    return Conta.filterTransactions(filterOptions);
  }

  function lastTransaction(
    gruposTransacoes: Transaction[]
  ): Transaction | null {
    return Conta.lastTransaction(gruposTransacoes);
  }

  function groupTransactionsByMonth(
    transactions: Transaction[]
  ): Record<string, Transaction[]> {
    return Conta.groupTransactionsByMonth(transactions);
  }

  return (
    <ContaContext.Provider
      value={{
        saldo,
        gruposTransacoes,
        registrarTransacao,
        atualizarTransacao,
        removerTransacao,
        transacoesFiltradas,
        lastTransaction,
        groupTransactionsByMonth,
      }}
    >
      {children}
    </ContaContext.Provider>
  );
}

export function useConta() {
  const context = useContext(ContaContext);
  if (!context) {
    throw new Error("useConta deve ser usado dentro de um ContaProvider");
  }
  return context;
}

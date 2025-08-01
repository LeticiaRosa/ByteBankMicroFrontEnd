import React from "react";
import { ValidaDebito } from "../decorators/validaDebito";
import { ValidaDeposito } from "../decorators/validaDeposito";
import { FilterOptions, Transaction } from "../types/transaction";
import { Armazenador } from "./Armazenador";

export type GrupoTransacao = {
  label: string;
  transacoes: Transaction[];
};

export enum TipoTransacao {
  DEPOSITO = "Depósito",
  TRANSFERENCIA = "Transferência",
  PAGAMENTO_BOLETO = "Pagamento de Boleto",
}

export class Conta {
  protected nome: string;
  protected saldo: number = Number(Armazenador.obter<number>("saldo")) || 0;
  private transacoes: Transaction[] = (() => {
    try {
      const storedData = Armazenador.obter<string>(
        "transacoes",
        (key: string, value: unknown) => {
          if (key === "data" && typeof value === "string") {
            return new Date(value);
          }
          return value;
        }
      );

      return storedData && storedData.trim() !== ""
        ? JSON.parse(storedData)
        : [];
    } catch (error) {
      console.error("Erro ao carregar transações:", error);
      return [];
    }
  })();

  constructor(nome: string) {
    this.nome = nome;
  }

  getGruposTransacoes(): GrupoTransacao[] {
    const gruposTransacoes: GrupoTransacao[] = [];
    const listaTransacoes: Transaction[] = this.transacoes;
    const transacoesOrdenadas = listaTransacoes.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    let labelAtualGrupoTransacao: string = "";

    for (const transacao of transacoesOrdenadas) {
      const labelGrupoTransacao: string = new Date(
        transacao.date
      )?.toLocaleDateString("pt-br", {
        month: "long",
        year: "numeric",
      });
      if (labelAtualGrupoTransacao !== labelGrupoTransacao) {
        labelAtualGrupoTransacao = labelGrupoTransacao;
        gruposTransacoes.push({
          label: labelGrupoTransacao,
          transacoes: [],
        });
      }
      const lastGroup = gruposTransacoes.at(-1);
      if (lastGroup) {
        lastGroup.transacoes.push(transacao);
      }
    }

    return gruposTransacoes;
  }

  getSaldo() {
    return this.saldo;
  }

  getDataAcesso(): Date {
    return new Date();
  }

  registrarTransacao(novaTransacao: Transaction): void {
    const novaTransacaoComId = <Transaction>{
      ...novaTransacao,
      id: crypto.randomUUID(),
      date: new Date(),
    };
    if (novaTransacaoComId.type == TipoTransacao.DEPOSITO) {
      this.depositar(novaTransacaoComId.amount);
    } else if (
      novaTransacaoComId.type == TipoTransacao.TRANSFERENCIA ||
      novaTransacaoComId.type == TipoTransacao.PAGAMENTO_BOLETO
    ) {
      this.debitar(novaTransacaoComId.amount);
      novaTransacaoComId.amount *= 1;
    } else {
      throw new Error("Tipo de Transação é inválido!");
    }
    this.transacoes.push(novaTransacaoComId);
    Armazenador.salvar<string>("transacoes", JSON.stringify(this.transacoes));
  }

  @ValidaDebito
  debitar(amount: number): void {
    this.saldo -= amount;
    Armazenador.salvar<string>("saldo", this.saldo.toString());
  }

  @ValidaDeposito
  depositar(amount: number): void {
    this.saldo += amount;
    Armazenador.salvar<string>("saldo", this.saldo.toString());
  }

  private calcularSaldoFinal(
    transacoes: Transaction[],
    operacao: string
  ): number {
    const valorFinal = transacoes.reduce((acc, currentValue) => {
      if (currentValue.type === TipoTransacao.DEPOSITO) {
        acc += currentValue.amount;
      } else {
        acc -= currentValue.amount;
      }
      return acc;
    }, 0);

    if (valorFinal < 0) {
      throw new Error(`Saldo insuficiente para a ${operacao}`);
    }

    return valorFinal;
  }

  atualizarTransacao(novaTransacao: Transaction): void {
    const index = this.transacoes.findIndex(
      (transacao) => transacao.id === novaTransacao.id
    );
    const novaTransacaoComNovaData = <Transaction>{
      ...novaTransacao,
      date: new Date(),
    };

    if (index !== -1) {
      const cloneTransacoes = [...this.transacoes];
      cloneTransacoes[index] = novaTransacaoComNovaData;

      this.saldo = this.calcularSaldoFinal(cloneTransacoes, "transação");

      this.transacoes[index] = novaTransacaoComNovaData;
      Armazenador.salvar<string>("saldo", JSON.stringify(this.saldo));
      Armazenador.salvar<string>("transacoes", JSON.stringify(this.transacoes));
    } else {
      throw new Error("Transação não encontrada");
    }
  }

  excluirTransacao(id: string): void {
    const index = this.transacoes.findIndex((transacao) => transacao.id === id);
    if (index !== -1) {
      const cloneTransacoes = [...this.transacoes];
      cloneTransacoes.splice(index, 1);

      this.saldo = this.calcularSaldoFinal(
        cloneTransacoes,
        "exclusão da transação"
      );

      Armazenador.salvar<string>("saldo", JSON.stringify(this.saldo));
      this.transacoes.splice(index, 1);
      Armazenador.salvar<string>("transacoes", JSON.stringify(this.transacoes));
    } else {
      throw new Error("Transação não encontrada");
    }
  }

  /* Obtém a última transação do array*/
  lastTransaction(gruposTransacoes: Transaction[]): Transaction | null {
    return gruposTransacoes.length > 0 ? gruposTransacoes[0] : null;
  }

  /* Agrupa as transações por mês e ano */
  groupTransactionsByMonth(
    transactions: Transaction[]
  ): Record<string, Transaction[]> {
    return transactions.reduce((grupos, transacao) => {
      const date = new Date(transacao.date);
      const month = date.toLocaleString("pt-br", { month: "long" });
      const year = date.getFullYear();
      const monthYear = `${month} de ${year}`;
      if (!grupos[monthYear]) {
        grupos[monthYear] = [];
      }
      grupos[monthYear].push(transacao);
      return grupos;
    }, {} as Record<string, Transaction[]>);
  }

  /* Filtra transações baseado nos critérios fornecidos */
  filterTransactions(filters: FilterOptions): Transaction[] {
    return this.transacoes.filter((transacao) => {
      // Filtro por tipo
      if (filters.type && transacao.type !== filters.type) {
        return false;
      }

      // Filtro por categoria
      if (filters.category && transacao.category !== filters.category) {
        return false;
      }

      // Filtro por remetente (busca parcial, case insensitive)
      if (filters.recipient && transacao.recipient) {
        const recipientMatch = transacao.recipient
          .toLowerCase()
          .includes(filters.recipient.toLowerCase());
        if (!recipientMatch) {
          return false;
        }
      } else if (filters.recipient && !transacao.recipient) {
        return false;
      }

      // Filtro por valor mínimo
      if (
        filters.amountMin !== undefined &&
        Math.abs(transacao.amount) < filters.amountMin
      ) {
        return false;
      }

      // Filtro por valor máximo
      if (
        filters.amountMax !== undefined &&
        Math.abs(transacao.amount) > filters.amountMax
      ) {
        return false;
      }

      // Filtro por data de início
      if (filters.dateFrom) {
        const filterDate = new Date(filters.dateFrom);
        const transactionDate = new Date(transacao.date);
        if (transactionDate < filterDate) {
          return false;
        }
      }

      // Filtro por data fim
      if (filters.dateTo) {
        const filterDate = new Date(filters.dateTo);
        const transactionDate = new Date(transacao.date);
        if (transactionDate > filterDate) {
          return false;
        }
      }

      return true;
    });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Conta("Conta Corrente");

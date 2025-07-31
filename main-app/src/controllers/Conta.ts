import { Transacao } from "../components/banking/TransacaoForm";
import { ValidaDebito } from "../decorators/validaDebito";
import { ValidaDeposito } from "../decorators/validaDeposito";
import { Armazenador } from "./Armazenador";

export type TransacaoType = {
  tipoTransacao: TipoTransacao;
  valor: number;
  data: Date;
  id: string;
};

export type GrupoTransacao = {
  label: string;
  transacoes: TransacaoType[];
};

export enum TipoTransacao {
  DEPOSITO = "Depósito",
  TRANSFERENCIA = "Transferência",
  PAGAMENTO_BOLETO = "Pagamento de Boleto",
}

export class Conta {
  protected nome: string;
  protected saldo: number = Number(Armazenador.obter<number>("saldo")) || 0;
  private transacoes: TransacaoType[] = (() => {
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
    const listaTransacoes: TransacaoType[] = this.transacoes;
    const transacoesOrdenadas = listaTransacoes.sort(
      (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
    );

    let labelAtualGrupoTransacao: string = "";

    for (const transacao of transacoesOrdenadas) {
      const labelGrupoTransacao: string = new Date(
        transacao.data
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

  registrarTransacao(novaTransacao: Transacao): void {
    const novaTransacaoComId = <TransacaoType>{
      ...novaTransacao,
      id: crypto.randomUUID(),
      data: new Date(),
    };
    if (novaTransacaoComId.tipoTransacao == TipoTransacao.DEPOSITO) {
      this.depositar(novaTransacaoComId.valor);
    } else if (
      novaTransacaoComId.tipoTransacao == TipoTransacao.TRANSFERENCIA ||
      novaTransacaoComId.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO
    ) {
      this.debitar(novaTransacaoComId.valor);
      novaTransacaoComId.valor *= 1;
    } else {
      throw new Error("Tipo de Transação é inválido!");
    }
    this.transacoes.push(novaTransacaoComId);
    Armazenador.salvar<string>("transacoes", JSON.stringify(this.transacoes));
  }

  @ValidaDebito
  debitar(valor: number): void {
    this.saldo -= valor;
    Armazenador.salvar<string>("saldo", this.saldo.toString());
  }

  @ValidaDeposito
  depositar(valor: number): void {
    this.saldo += valor;
    Armazenador.salvar<string>("saldo", this.saldo.toString());
  }

  private calcularSaldoFinal(
    transacoes: TransacaoType[],
    operacao: string
  ): number {
    const valorFinal = transacoes.reduce((acc, currentValue) => {
      if (currentValue.tipoTransacao === TipoTransacao.DEPOSITO) {
        acc += currentValue.valor;
      } else {
        acc -= currentValue.valor;
      }
      return acc;
    }, 0);

    if (valorFinal < 0) {
      throw new Error(`Saldo insuficiente para a ${operacao}`);
    }

    return valorFinal;
  }

  atualizarTransacao(novaTransacao: Transacao): void {
    const index = this.transacoes.findIndex(
      (transacao) => transacao.id === novaTransacao.id
    );
    const novaTransacaoComNovaData = <TransacaoType>{
      ...novaTransacao,
      data: new Date(),
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
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Conta("Conta Corrente");

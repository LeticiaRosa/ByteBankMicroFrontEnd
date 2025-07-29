"use client";
import { useConta } from "../../../contexts/ContaContext";
import TransacaoForm, { Transacao } from "../TransacaoForm";
import ItemExtrato from "./ItemExtrato";
import { useState } from "react";
import Modal from "../../ui/Modal";

export default function Extrato() {
  const { gruposTransacoes } = useConta();
  const [transacaoParaEditar, setTransacaoParaEditar] =
    useState<Transacao | null>(null);
  const [modalAberto, setModalAberto] = useState(false);

  const abrirModal = (transacao: Transacao) => {
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

  return (
    <aside className="card max-md:items-center relative">
      <h3 className="title pb-8">Extrato</h3>
      <div className="transacoes">
        {gruposTransacoes?.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <h4 className="text-center">Nenhuma transação encontrada</h4>
          </div>
        )}
        {gruposTransacoes?.length > 0 &&
          gruposTransacoes.map((transacao) => (
            <div key={transacao.label}>
              <h4 className="mes-group">{transacao.label}</h4>
              {transacao.transacoes.map((tran) => (
                <ItemExtrato
                  id={tran.id}
                  key={tran.id}
                  tipo={tran.tipoTransacao}
                  valor={tran.valor}
                  data={tran.data.toString()}
                  onEditar={() => abrirModal(tran)}
                />
              ))}
            </div>
          ))}
      </div>

      {/* Modal de edição */}
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

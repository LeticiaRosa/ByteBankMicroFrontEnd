import { Pencil, Trash } from "phosphor-react";
import { Separador } from "../../ui/form/Separador";
import Button from "../../ui/form/Button";
import { formatadorValor } from "../../../utils/formatadorValor";
import { useConta } from "../../../contexts/ContaContext";
import { toast } from "react-toastify";
import Modal from "../../ui/Modal";
import { useState } from "react";

interface ItemExtratoProps {
  id: string;
  tipo: string;
  valor: number;
  data: string;
  onEditar?: (id: string) => void;
}

export default function ItemExtrato({
  id,
  tipo,
  valor,
  data,
  onEditar,
}: ItemExtratoProps) {
  const { removerTransacao } = useConta();
  const valorFormatado = formatadorValor.format(valor);
  const [openModal, setOpenModal] = useState(false);
  function handleModalClose() {
    setOpenModal(false);
  }
  const handleExcluir = (id: string) => {
    try {
      removerTransacao(id);
      toast.success("Transação excluída com sucesso!");
    } catch {
      toast.error("Erro ao excluir a transação.");
    }
  };
  return (
    <div>
      <div
        key={id}
        className={`transacao-item ${
          tipo === "Depósito" ? "text-verde-light" : "text-laranja-grafico"
        }`}
      >
        <div className="flex flex-row items-center gap-4 justify-between w-full">
          <p className=" text-nowrap">{tipo}</p>
          <p className="text-gray-500 text-xs ">
            {new Date(data).toLocaleDateString("pt-BR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between w-full">
          <h6 className="pr-4">{valorFormatado}</h6>
          <div className="flex flex-row gap-2">
            <Button
              variant="icon"
              onClick={() => {
                if (onEditar) onEditar(id);
              }}
            >
              <Pencil />
            </Button>
            <Button variant="icon" onClick={() => setOpenModal(true)}>
              <Trash />
            </Button>
          </div>
        </div>

        <Separador size="large" />
      </div>
      {openModal && (
        <Modal
          title="Você tem certeza que deseja excluir esta transação?"
          onClose={handleModalClose}
        >
          <p>Caso você exclua esta transação, ela não poderá ser recuperada.</p>
          <div className="flex justify-between gap-2 mt-4 pt-6">
            <Button variant="outline" onClick={handleModalClose}>
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                handleExcluir(id);
                handleModalClose();
              }}
            >
              Excluir
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../ui/form/Button";
import Input from "../ui/form/Input";
import Label from "../ui/form/Label";
import Select from "../ui/form/Select";
import { z } from "zod";
import { TipoTransacao } from "../../controllers/Conta";
import { useConta } from "../../contexts/ContaContext";
import { toast } from "react-toastify";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css"; // Adicione esta linha
const formSchema = z.object({
  tipoTransacao: z.enum(["Depósito", "Transferência", "Pagamento de Boleto"], {
    message: "Tipo de transação é obrigatório",
  }),
  valor: z.coerce
    .number({
      message: "Valor inválido",
    })
    .min(0.01, { message: "O valor deve ser maior que zero" })
    .max(1000000, { message: "O valor deve ser menor que 1.000.000" }),
});

type Inputs = z.infer<typeof formSchema>;

export type Transacao = {
  tipoTransacao: string;
  valor: number;
  id?: string | number;
};

interface TransacaoFormProps {
  fecharModal?: () => void;
  transacaoParaEditar?: Transacao | null;
  onSave?: (transacao: Transacao) => void;
  modo?: "criar" | "editar";
}

export default function TransacaoForm({
  fecharModal,
  transacaoParaEditar,
  onSave,
  modo = "criar",
}: TransacaoFormProps) {
  const { registrarTransacao, atualizarTransacao } = useConta();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      tipoTransacao:
        (transacaoParaEditar?.tipoTransacao as TipoTransacao) || undefined,
      valor: transacaoParaEditar?.valor || undefined,
    },
  });

  useEffect(() => {
    // Update form when transacaoParaEditar changes
    if (transacaoParaEditar) {
      setValue(
        "tipoTransacao",
        transacaoParaEditar.tipoTransacao as TipoTransacao
      );
      setValue("valor", transacaoParaEditar.valor);
    }
  }, [transacaoParaEditar, setValue]);

  function handleOnSubmit(data: Inputs) {
    const transacao: Transacao = {
      tipoTransacao: data.tipoTransacao as TipoTransacao,
      valor: data.valor,
      ...(transacaoParaEditar?.id ? { id: transacaoParaEditar.id } : {}),
    };

    try {
      if (modo === "editar" && transacaoParaEditar) {
        atualizarTransacao?.(transacao);
        toast.success("Transação Atualizada com Sucesso!", {
          position: "top-right",
        });
      } else {
        registrarTransacao(transacao);
        toast.success("Transação Efetuada com Sucesso!", {
          position: "top-right",
        });
      }

      // If custom save handler provided, call it
      if (onSave) {
        onSave(transacao);
      }

      // Only reset if creating a new transaction
      if (modo === "criar") {
        reset();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : typeof error === "string"
          ? error
          : "Ocorreu um erro ao processar a transação";

      if (
        errorMessage.toLowerCase().includes("saldo") ||
        errorMessage.toLowerCase().includes("valor")
      ) {
        setError("valor", {
          type: "manual",
          message: errorMessage,
        });
      } else {
        setError("tipoTransacao", {
          type: "manual",
          message: errorMessage,
        });
      }
    }
  }

  const formTitle = modo === "criar" ? "Nova transação" : "Editar transação";
  const submitButtonText =
    modo === "criar" ? "Concluir transação" : "Atualizar transação";

  return (
    <section className="flex flex-col w-full items-center justify-center xs:items-start xs:justify-start gap-2">
      {modo == "criar" && <h2 className="title pb-4">{formTitle}</h2>}
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="pl-2 flex w-full"
      >
        <div className="flex flex-col w-full items-center justify-center xs:items-start xs:justify-start">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap:2 lg:gap-4 justify-between">
            <div className="campo ">
              <Label htmlFor="tipoTransacao" className="">
                Tipo de Transação:
              </Label>
              <Select
                options={[
                  { value: "", label: "Selecione" },
                  { value: "Depósito", label: "Depósito" },
                  { value: "Transferência", label: "Transferência" },
                  {
                    value: "Pagamento de Boleto",
                    label: "Pagamento de Boleto",
                  },
                ]}
                id="tipoTransacao"
                {...register("tipoTransacao")}
              />
              {errors.tipoTransacao && (
                <p className="text-red-500 text-size-14 mt-1">
                  {errors.tipoTransacao.message}
                </p>
              )}
            </div>
            <div className="campo pb-6">
              <Label htmlFor="valor">Valor:</Label>
              <Input
                type="number"
                id="valor"
                placeholder="0,00"
                step=".01"
                min="0.01"
                // className="max-w-40"
                {...register("valor")}
              />
              {errors.valor && (
                <p className="text-red-500 text-size-14 mt-1">
                  {errors.valor.message}
                </p>
              )}
            </div>
            {modo !== "criar" && (
              <Button
                variant="outline"
                type="button"
                className="flex w-25 justify-start "
                onClick={fecharModal}
              >
                Cancelar
              </Button>
            )}
            {modo === "criar" && <p></p>}
            <Button
              className="flex max-w-45 justify-center"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processando..." : submitButtonText}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}

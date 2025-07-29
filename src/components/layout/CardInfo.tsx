"use client";
import { useState } from "react";
import { useConta } from "../../contexts/ContaContext";
import { Eye, EyeClosed } from "phosphor-react";
import { formatadorValor } from "../../utils/formatadorValor";

export default function CardInfo() {
  const { saldo } = useConta();
  const [showSaldo, setShowSaldo] = useState(false);
  const userName = "Joana da Silva Oliveira";
  const saldoFormatado = formatadorValor.format(saldo);

  return (
    <div className="card bg-verde grid grid-cols-4 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 items-start  w-full text-white rounded-lg">
      <div className="grid col-span-4 col-start-1 xs:col-span-1 md:col-span-4 md:col-start-1 lg:col-span-1">
        <h2 className="title text-white text-nowrap">
          Olá, {userName.split(" ")[0]}! :)
        </h2>
        <p className="text-white text-size-14">
          {new Date().toLocaleDateString("pt-BR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="grid col-span-4 col-start-3 xs:col-span-1 md:col-span-3 md:col-start-3 lg:col-span-1 items-start justify-end gap-1 pt-6 lg:pt-14 px-2 ">
        <div className="flex flex-row items-center justify-between w-full">
          <h3 className="text-size-18 font-semibold">Saldo</h3>
          <p
            className="text-size-25 text-nowrap cursor-pointer"
            onClick={() => setShowSaldo(!showSaldo)}
          >
            {showSaldo ? <Eye /> : <EyeClosed />}
          </p>
        </div>

        <hr className="w-34 h-0.5 border-0 rounded-sm bg-laranja-grafico" />
        <p className="text-size-14 text-nowrap">Conta Corrente</p>
        {showSaldo ? (
          <span className="text-white text-size-20">{saldoFormatado}</span>
        ) : (
          <span className="text-white text-size-20">*****</span>
        )}
      </div>
    </div>
  );
}

import React from "react";

interface BalanceCardProps {
  title: string;
  value: number;
  type?: "default" | "income" | "expense";
  icon?: React.ReactNode;
}

const BalanceCard: React.FC<BalanceCardProps> = ({
  title,
  value,
  type = "default",
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const getColorClass = () => {
    switch (type) {
      case "income":
        return "bg-verde-grafico text-white";
      case "expense":
        return "bg-laranja-grafico text-white";
      default:
        return "bg-white";
    }
  };

  return (
    <article
      className={`p-6 rounded-lg border ${getColorClass()} shadow-sm transition-all hover:shadow-md`}
    >
      <header className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium uppercase tracking-wide">{title}</h3>
        {/* Renderiza o ícone se fornecido */}
        <div
          className={`text-2xl ${
            type === "income"
              ? "text-green-500"
              : type === "expense"
              ? "text-red-500"
              : "text-gray-500"
          }`}
        />
        {type === "income" ? "💰" : type === "expense" ? "💸" : " 📊"}
      </header>
      <div className="text-3xl font-bold">{formatCurrency(value)}</div>
    </article>
  );
};

export default BalanceCard;

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Transaction } from "../types";

interface TransactionChartProps {
  transactions: Transaction[];
}

const TransactionChart2: React.FC<TransactionChartProps> = ({
  transactions,
}) => {
  const processChartData = () => {
    const monthlyData: Record<string, { income: number; expense: number }> = {};

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;

      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = { income: 0, expense: 0 };
      }

      if (transaction.type === "income") {
        monthlyData[monthYear].income += transaction.amount;
      } else {
        monthlyData[monthYear].expense += transaction.amount;
      }
    });

    // Converter para array para o Recharts
    return Object.entries(monthlyData).map(([month, data]) => ({
      month,
      income: data.income,
      expense: data.expense,
    }));
  };

  const chartData = processChartData();

  return (
    <div className="flex flex-col items-center text-center rounded-lg shadow-sm border border-gray-300">
      <p className="title  p-4">Receitas vs Despesas</p>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            formatter={(value) => [`R$ ${value}`, undefined]}
            labelFormatter={(label) => `Mês: ${label}`}
          />
          <Legend />
          <Bar dataKey="income" name="Receitas" fill="#47A138" />
          <Bar dataKey="expense" name="Despesas" fill="#FF5031" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionChart2;

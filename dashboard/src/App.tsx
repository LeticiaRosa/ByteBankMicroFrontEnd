import React from "react";

import BalanceCard from "./components/BalanceCard";
import "./styles/global.css";
import TransactionChart from "./components/TransactionChart";
import { getCategoryLabel } from "./utils/categories";
export interface TransactionData {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}
function AppDashboard() {
  const data: TransactionData[] = [
    { name: getCategoryLabel("bills"), uv: 400, pv: 2400, amt: 2400 },
    { name: getCategoryLabel("services"), uv: 300, pv: 4567, amt: 2400 },
    { name: getCategoryLabel("taxes"), uv: 200, pv: 1398, amt: 2210 },
    { name: getCategoryLabel("education"), uv: 500, pv: 3200, amt: 3200 },
    { name: getCategoryLabel("entertainment"), uv: 250, pv: 1800, amt: 1800 },
  ];
  return (
    <main>
      <div className="flex flex-row gap-6 p-6 ">
        <BalanceCard
          title="Despesas"
          value={data.reduce((acc, item) => acc + item.uv, 0)}
          type="expense"
        />
        <BalanceCard
          title="Receitas"
          value={data.reduce((acc, item) => acc + item.uv, 0)}
          type="income"
        />
      </div>

      <TransactionChart data={data} />
    </main>
  );
}

export default AppDashboard;

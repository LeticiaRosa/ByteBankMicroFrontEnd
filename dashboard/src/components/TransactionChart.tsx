import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { TransactionData } from "../App";

interface TransactionChartProps {
  data: TransactionData[];
}

function TransactionChart({ data }: TransactionChartProps) {
  const renderCustomAxisTick = ({ x, y, payload }: any) => {
    let IconComponent;

    // Encontrar o valor correspondente nos dados
    const categoryData = data.find((item) => item.name === payload.value);
    const value = categoryData?.uv || 0;

    return (
      <g>
        {/* Texto da categoria */}
        <text x={x} y={y + 50} textAnchor="middle" fill="#666" fontSize="16">
          {payload.value}
        </text>
      </g>
    );
  };

  const renderCustomBarLabel = ({
    payload,
    x,
    y,
    width,
    height,
    value,
  }: any) => {
    return (
      <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>
        {value}
      </text>
    );
  };

  return (
    <section className="flex flex-col items-center p-4 text-center ">
      <p className="title">Categorias mais comuns de transações financeiras</p>
      <ResponsiveContainer width="80%" height={350}>
        <BarChart width={1200} height={480} data={data}>
          <XAxis
            dataKey="name"
            tick={renderCustomAxisTick}
            interval={0}
            height={140}
          />
          <YAxis />
          <Bar
            dataKey="uv"
            barSize={30}
            fill="#004d61"
            label={renderCustomBarLabel}
          />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

export default TransactionChart;

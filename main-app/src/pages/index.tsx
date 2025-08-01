import React from "react";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import ServiceLayout from "../components/layout/ServiceLayout";

const DashboardComponent = dynamic(import("dashboard/Dashboard"), {
  ssr: false,
  loading: () => <p>Carregando Dashboard...</p>,
});

export default function Home() {
  return (
    <ServiceLayout>
      <section className="card min-h-50">
        <DashboardComponent />
      </section>
    </ServiceLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const logado = true; // Sua lógica de verificação

  if (!logado) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

import React from "react";
import { ReactElement } from "react";
import ServiceLayout from "../../../components/layout/ServiceLayout";
import { NextPageWithLayout } from "../../_app";

const Investimentos: NextPageWithLayout = () => {
  return <section className="card min-h-50">Investimentos</section>;
};

Investimentos.getLayout = function getLayout(page: ReactElement) {
  return <ServiceLayout>{page}</ServiceLayout>;
};

export default Investimentos;

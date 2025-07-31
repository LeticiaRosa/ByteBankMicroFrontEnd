import React from "react";
import { ReactElement } from "react";
import ServiceLayout from "../../../components/layout/ServiceLayout";
import { NextPageWithLayout } from "../../_app";

const Transferencias: NextPageWithLayout = () => {
  return <section className="card min-h-50">Transferencias</section>;
};

Transferencias.getLayout = function getLayout(page: ReactElement) {
  return <ServiceLayout>{page}</ServiceLayout>;
};

export default Transferencias;

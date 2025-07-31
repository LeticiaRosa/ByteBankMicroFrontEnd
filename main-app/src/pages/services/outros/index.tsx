import React from "react";
import { ReactElement } from "react";
import ServiceLayout from "../../../components/layout/ServiceLayout";
import { NextPageWithLayout } from "../../_app";

const Outros: NextPageWithLayout = () => {
  return <section className="card min-h-50">Outros</section>;
};

Outros.getLayout = function getLayout(page: ReactElement) {
  return <ServiceLayout>{page}</ServiceLayout>;
};

export default Outros;

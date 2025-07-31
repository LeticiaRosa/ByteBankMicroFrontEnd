import React from "react";
import { ReactElement } from "react";
import TransacaoForm from "../../components/banking/TransacaoForm";
import ServiceLayout from "../../components/layout/ServiceLayout";
import { NextPageWithLayout } from "../_app";

const Services: NextPageWithLayout = () => {
  return (
    <div className="card w-full">
      <TransacaoForm />
    </div>
  );
};

Services.getLayout = function getLayout(page: ReactElement) {
  return <ServiceLayout>{page}</ServiceLayout>;
};

export default Services;

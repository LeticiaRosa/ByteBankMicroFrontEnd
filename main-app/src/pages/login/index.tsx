import { GetServerSideProps } from "next";

export default function Page() {
  // Esta página nunca será renderizada devido ao redirect
  return null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const logado = true; // Sua lógica de verificação aqui

  if (logado) {
    return {
      redirect: {
        destination: "/services",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
};

"use client";
import { useState } from "react";
import HeaderServices from "../../components/layout/HeaderServices";
import { Menu } from "../../components/layout/Menu";
import { ContaProvider } from "../../contexts/ContaContext";
import CardInfo from "../../components/layout/CardInfo";
import Extrato from "../../components/banking/extrato/Extrato";
import { ToastContainer } from "react-toastify";
import { menuItems } from "../../config/menuItems";

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openMenu, setOpenMenu] = useState(false);

  function handleOpenMenu(action?: string) {
    if (action === "open") {
      setOpenMenu(false);
    } else {
      setOpenMenu(!openMenu);
    }
  }

  return (
    <>
      <HeaderServices setOpenMenu={handleOpenMenu} />
      <div className="center">
        <div className="container pt-6 max-w-250">
          <Menu
            openMenu={openMenu}
            setOpenMenu={handleOpenMenu}
            menuItems={menuItems}
          />
          <ContaProvider>
            <div className="container-page">
              <div className="flex flex-col gap-6 w-full">
                <CardInfo />
                <main className="w-full">{children}</main>
              </div>
              <Extrato />
              <ToastContainer
                position="top-right"
                autoClose={5000}
                theme="light"
              />
            </div>
          </ContaProvider>
        </div>
      </div>
    </>
  );
}

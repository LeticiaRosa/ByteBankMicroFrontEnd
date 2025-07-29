"use client";
import Image from "next/image";
import HeaderHome from "./components/HeaderHome";
import Vantagens from "./Vantagens";
import Footer from "../../components/layout/Footer";
import { useState } from "react";
import { Menu } from "../../components/layout/Menu";
import { menuItemsHome } from "../../config/menuItemsHome";

export default function Home() {
  const [openMenu, setOpenMenu] = useState(false);

  function handleOpenMenu(action?: string) {
    if (action === "open") {
      setOpenMenu(true);
    } else {
      setOpenMenu(!openMenu);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <HeaderHome setOpenMenu={handleOpenMenu} />
      <div className="center flex xs:hidden">
        <div className="container pt-6 max-w-250">
          <Menu
            menuItems={menuItemsHome}
            setOpenMenu={handleOpenMenu}
            openMenu={openMenu}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-b from-white to-verde pb-4">
        <div className="container pt-6 max-w-250 flex flex-col items-center ">
          <div className="flex flex-col items-center justify-center text-center md:flex-row ">
            <div>
              <p className="text-3xl pt-10 font-semibold text-verde">
                Experimente mais liberdade no controle da sua vida financeira.
              </p>
              <p className="text-size-25 p-10 text-verde">
                Crie sua conta com a gente!
              </p>
            </div>
            <Image
              src="/image.png"
              alt="User Interaction"
              width={300}
              height={300}
              className="rounded-2xl shadow-lg shadow-verde w-auto h-auto"
            />
          </div>
          <Vantagens />
        </div>
      </div>
      <Footer />
    </div>
  );
}

"use client";
import { redirect } from "next/navigation";
import Image from "next/image";
import { HeaderBase } from "./HeaderBase";
import { List, UserCircle } from "phosphor-react";

interface HeaderProps {
  setOpenMenu: () => void;
}

export default function HeaderServices({ setOpenMenu }: HeaderProps) {
  return (
    <HeaderBase>
      <div className="flex items-center justify-between gap-6">
        <List
          alt="Menu"
          width={40}
          height={40}
          className="xs:hidden hover:cursor-pointer text-white"
          onClick={() => setOpenMenu()}
        />
        <Image
          src="/logo.png"
          alt="Logo"
          width={120}
          height={2}
          className="xs:flex hidden hover:cursor-pointer w-auto h-auto"
          onClick={() => redirect("/home")}
          priority={true}
        />
      </div>

      <div className="flex items-center justify-end gap-6 text-white ">
        <span className="text-size-14 xs:flex hidden">
          Joana da Silva Oliveira
        </span>
        <UserCircle
          weight="light"
          alt="Ícone de usuário"
          width={40}
          height={40}
        />
      </div>
    </HeaderBase>
  );
}

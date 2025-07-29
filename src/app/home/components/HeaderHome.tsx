"use client";
import Image from "next/image";
import { HeaderBase } from "../../../components/layout/HeaderBase";
import Button from "../../../components/ui/form/Button";
import LinkButton from "../../../components/ui/form/Link";
import { List } from "phosphor-react";
import { redirect } from "next/navigation";

interface HeaderProps {
  setOpenMenu: (action?: string) => void;
}

export default function HeaderHome({ setOpenMenu }: HeaderProps) {
  return (
    <HeaderBase>
      <div className="flex items-center justify-between gap-2 md:gap-6 text-white w-full xs:w-auto">
        <List
          alt="Menu"
          width={40}
          height={40}
          className="xs:hidden hover:cursor-pointer w-auto h-auto"
          onClick={() => {
            setOpenMenu("open");
          }}
        />

        <Image
          priority={true}
          src="/logo.png"
          alt="Logo"
          width={120}
          height={2}
          className="flex xs:hidden md:flex w-auto h-auto"
        />
        <Image
          src="/logo-icone.png"
          alt="Logo"
          width={40}
          height={40}
          className="hidden xs:flex md:hidden w-auto h-auto"
        />
        <div className="hidden xs:flex gap-4 xs:gap-2 w-full">
          <LinkButton href="/sobre">Sobre</LinkButton>
          <LinkButton href="/">Serviços</LinkButton>
        </div>
      </div>

      <div className="hidden xs:flex xs:items-center xs:justify-end gap-2 lg:gap-6 text-white w-full">
        <Button variant="secondary" onClick={() => redirect("/")}>
          Abrir minha conta
        </Button>
        <Button
          variant="outline"
          className="text-white hover:text-verde"
          onClick={() => redirect("/")}
        >
          Já tenho conta
        </Button>
      </div>
    </HeaderBase>
  );
}

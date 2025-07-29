"use client";

import { usePathname } from "next/navigation";
import LinkButton from "../ui/form/Link";
import { Separador } from "../ui/form/Separador";
import { X } from "phosphor-react";
import { menuItemsType } from "../../config/menuItemsType";

interface MenuProps {
  openMenu: boolean;
  setOpenMenu: (action?: string) => void;
  menuItems: menuItemsType;
}

export function Menu({ openMenu, setOpenMenu, menuItems }: MenuProps) {
  const pathname = usePathname();

  return (
    <>
      {openMenu && <div className="modal" onClick={() => setOpenMenu()}></div>}
      <nav id="menu" className={`menu  ${openMenu ? "menu-open" : ""}`}>
        <ul className="flex place-content-between md:flex-col md:gap-4">
          <div className="flex items-end justify-end">
            <button
              className={`${openMenu ? "flex " : "hidden"}`}
              onClick={() => setOpenMenu()}
            >
              <X />
            </button>
          </div>
          {menuItems.map((item) => (
            <li
              key={item.id}
              className="flex text-center items-center justify-center md:flex-col md:items-center md:text-size-16 text-size-14 px-4"
              onClick={() => setOpenMenu("open")}
            >
              <div className="flex flex-col gap-2 items-center text-nowrap">
                <LinkButton
                  href={item.href}
                  className={`${
                    pathname === item.href
                      ? "text-verde font-semibold"
                      : "text-black"
                  } transition-colors`}
                >
                  {item.label}
                </LinkButton>

                <Separador
                  size="small"
                  variant={pathname === item.href ? "secondary" : "primary"}
                />
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

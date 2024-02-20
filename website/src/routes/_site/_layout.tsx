import { Link, Outlet } from "@remix-run/react";

import { clsx } from "@resolid/react-ui";
import type { MouseEventHandler } from "react";
import resolidSvg from "~/assets/images/resolid.svg";
import { HistoryNavLink } from "~/components/HistoryLink";

export default function SiteLayout() {
  return (
    <>
      <header className={"fixed inset-x-0 z-10 w-full border-b backdrop-blur"}>
        <nav className={"mx-auto flex h-16 items-center justify-between px-4 xl:max-w-6xl"}>
          <Link to={"/"}>
            <img width={150} alt={"Resolid"} src={resolidSvg} />
          </Link>
          <div className={""}>
            <NavMenu />
          </div>
        </nav>
      </header>
      <div className={"pt-16"}>
        <Outlet />
      </div>
    </>
  );
}

const NavMenu = ({ onClick }: { onClick?: MouseEventHandler<HTMLAnchorElement> }) => {
  return (
    <ul
      className={
        "mx-auto flex max-w-xs list-none flex-col p-4 font-medium tracking-wide md:max-w-none md:flex-row md:p-0"
      }
    >
      {[
        { name: "主页", href: "", end: true },
        { name: "组件库", href: "ui" },
        { name: "论坛", href: "forum" },
        { name: "博客", href: "blog" },
        { name: "关于", href: "about" },
      ].map((menu) => {
        return (
          <li key={menu.name}>
            <HistoryNavLink
              className={({ isActive }) => {
                return clsx("block p-2 hover:text-blue-500 md:px-4", isActive && "text-blue-400");
              }}
              onClick={onClick}
              to={menu.href}
              end={menu.end}
            >
              {menu.name}
            </HistoryNavLink>
          </li>
        );
      })}
    </ul>
  );
};

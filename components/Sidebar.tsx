"use client";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";

interface SidebarProps {
  children: React.ReactNode;
}
const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "خانه",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "سرچ",
        active: pathname === "/search",
        href: "/",
      },
    ],
    [pathname]
  );
  return (
    <div className="flex h-full">
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box className="flex flex-col gap-y-4 px-5 py-4">
          {routes.map((item) => (
            <SidebarItem key={item.label} {...item} />
          ))}
        </Box>
        <Box className="overflow-y-auto h-full ">
          <Library />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};

export default Sidebar;

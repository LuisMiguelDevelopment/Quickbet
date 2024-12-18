import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import Image from "next/image";
import Logo from "../public/Logo.png";
import { UserIcon } from "./icons";
import { siteConfig } from "@/config/site";

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth="2xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full">
        <NavbarBrand className="gap-8 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image src={Logo} alt="logo" />
          </NextLink>
          <NavbarItem className="hidden sm:flex gap-8">
            <Link
              isExternal
              href={siteConfig.links.twitter}
              title="Popular"
              className="text-white p-[16px]"
            >
              Popular
            </Link>
            <Link
              isExternal
              href={siteConfig.links.discord}
              title="Discord"
              className="text-white  p-[16px]"
            >
              Favorites
            </Link>
          </NavbarItem>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end" className="hidden sm:flex">
        <UserIcon />
      </NavbarContent>
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          <Link isExternal href={siteConfig.links.github}>
            Popular
          </Link>
          <Link isExternal href={siteConfig.links.github}>
            Favorites
          </Link>
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};

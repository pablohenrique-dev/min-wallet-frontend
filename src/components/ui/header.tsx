import { Link, useSearchParams } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuthContext } from "@/contexts/auth";
import { Button } from "./button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Avatar, AvatarFallback } from "./avatar";
import { useQueryClient } from "@tanstack/react-query";
import { Logo } from "../icons/logo";
import { UpdateUserDialog } from "./update-user-dialog";

export function Header() {
  const queryClient = useQueryClient();
  const { user, logout } = useAuthContext();

  const [searchParams] = useSearchParams();

  const emailSearchParam = searchParams.get("email");

  function handleLogout() {
    queryClient.clear();
    logout();
  }

  function getFirstTwoWords(text: string) {
    const words = text.split(" ");
    const firstTwoWords = words.slice(0, 2);
    return firstTwoWords.join(" ");
  }

  if (!user || (user && emailSearchParam)) return null;
  return (
    <header className="container mt-6 flex animate-fade-bottom items-center justify-between border-b border-zinc-200 pb-4">
      <Button
        asChild
        className="mb-[-6px] px-0 text-xl font-semibold"
        variant="link"
      >
        <Link to="/" className="px-0">
          <Logo />
        </Link>
      </Button>
      <NavigationMenu>
        <NavigationMenuList className="gap-4">
          <NavigationMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex w-fit items-center gap-4 pl-4 hover:bg-transparent"
                >
                  <p className="hidden sm:block">
                    {getFirstTwoWords(user.name)}
                  </p>
                  <Avatar>
                    <AvatarFallback className="select-none bg-black text-white">
                      {user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-fit shadow-xl" align="end">
                <DropdownMenuLabel className="ml-2">
                  Minha conta
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <p className="block px-4 py-3 text-sm sm:hidden">
                  {getFirstTwoWords(user.name)}
                </p>
                <DropdownMenuSeparator className="block sm:hidden" />
                <p className="px-4 py-3 text-sm">{user.email}</p>
                <DropdownMenuSeparator />
                <UpdateUserDialog />
                <DropdownMenuSeparator />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="w-full justify-between gap-8 px-4"
                >
                  Sair <LogOut size={16} />
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}

import { Link } from "react-router-dom";
import { UserCog, LogOut } from "lucide-react";
import { useAuthContext } from "@/contexts/auth";
import { Button } from "./button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Avatar, AvatarFallback } from "./avatar";
import { useQueryClient } from "@tanstack/react-query";

export function Header() {
  const queryClient = useQueryClient();
  const { user, logout } = useAuthContext();

  function handleLogout() {
    queryClient.clear();
    logout();
  }

  if (!user) return null;
  return (
    <header className="container mt-6 flex items-center justify-between border-b border-zinc-200 pb-4">
      <Button
        asChild
        className="mb-[-6px] px-0 text-xl font-semibold"
        variant="link"
      >
        <Link to="/" className="px-0">
          MinWallet
        </Link>
      </Button>
      <NavigationMenu>
        <NavigationMenuList className="gap-4">
          <NavigationMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarFallback className="select-none bg-black text-white">
                      {user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/account" className="w-full justify-between gap-8">
                    Minha conta
                    <UserCog size={16} />
                  </Link>
                </NavigationMenuLink>
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

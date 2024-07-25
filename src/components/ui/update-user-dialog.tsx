import React from "react";
import { UserCog } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Button } from "./button";
import { UpdateUserForm } from "./update-user-form";

export function UpdateUserDialog() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild className="w-full">
        <Button
          variant="outline"
          className="flex justify-between gap-8 border-none"
        >
          Editar
          <UserCog size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogDescription>
            Faça alterações em seu perfil aqui. Clique em atualizar quando
            terminar.
          </DialogDescription>
        </DialogHeader>
        <UpdateUserForm setIsDialogOpen={setIsDialogOpen} />
      </DialogContent>
    </Dialog>
  );
}

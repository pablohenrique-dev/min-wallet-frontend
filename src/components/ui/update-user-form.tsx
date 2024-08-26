import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { Button } from "./button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { api, apiRoutes } from "@/services/api";
import { User } from "@/contexts/auth-context";
import { useAuthContext } from "@/contexts/auth";
import { useNavigate } from "react-router-dom";

const updateUserFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "O nome precisa ter no mínimo 3 caracteres!" }),
  email: z
    .string()
    .min(6, { message: "Este Campo é obrigatório!" })
    .email({ message: "Formato de email inválido!" })
    .trim(),
});

type UpdateUserFormType = z.infer<typeof updateUserFormSchema>;

interface UpdateUserFormProps {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function UpdateUserForm({ setIsDialogOpen }: UpdateUserFormProps) {
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();

  const form = useForm<UpdateUserFormType>({
    resolver: zodResolver(updateUserFormSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });

  async function onSubmit(values: UpdateUserFormType) {
    try {
      const { data } = await api.patch<User>(apiRoutes.updateProfile, values);
      setUser(data);
      setIsDialogOpen(false);
      toast.success("Atualização concluída com sucesso!", {
        className: "border-l-4 border-green-500",
      });
    } catch (error) {
      toast.error(
        "Ocorreu um erro ao atualizar suas informações, tente novamente!",
        { className: "border-l-4 border-red-500" },
      );
    }
  }

  function handleChangePassword() {
    const confirmChangePassword = confirm(
      "Tem certeza que quer alterar a senha?",
    );
    if (confirmChangePassword) {
      navigate(`/forgot-password?email=${user?.email}`);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-[384px] space-y-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Nome</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite seu nome"
                  {...field}
                  className="px-4 py-6 text-base"
                />
              </FormControl>
              {form.formState.errors.name?.message && (
                <FormMessage>{form.formState.errors.name.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite seu email"
                  {...field}
                  className="px-4 py-6 text-base"
                />
              </FormControl>
              {form.formState.errors.email?.message && (
                <FormMessage>{form.formState.errors.email.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <Button
          className="w-full py-6 text-base disabled:cursor-not-allowed disabled:opacity-70"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Carregando..." : "Atualizar"}
        </Button>
        <Button
          className="w-full py-6 text-base disabled:cursor-not-allowed disabled:opacity-70"
          variant={"ghost"}
          onClick={handleChangePassword}
        >
          Alterar senha
        </Button>
      </form>
    </Form>
  );
}

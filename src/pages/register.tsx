import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/contexts/auth";
import { AuthLayout } from "@/components/layouts/auth";
import { toast } from "sonner";

const registerFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "O nome precisa ter no mínimo 3 caracteres!" }),
  email: z
    .string()
    .min(6, { message: "Este Campo é obrigatório!" })
    .email({ message: "Formato de email inválido!" })
    .trim(),
  password: z
    .string()
    .min(6, { message: "A senha precisa ter no mínimo 6 caracteres!" }),
});

type registerFormType = z.infer<typeof registerFormSchema>;

export function RegisterPage() {
  const form = useForm<registerFormType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { isUserLogged, register } = useAuthContext();
  const navigate = useNavigate();

  async function onSubmit(values: registerFormType) {
    try {
      await register(values);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  if (isUserLogged) return <Navigate to="/" />;
  return (
    <AuthLayout>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto w-full max-w-[384px] space-y-5"
        >
          <h2 className="mb-8 text-4xl font-semibold">Crie sua conta</h2>
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
                  <FormMessage>
                    {form.formState.errors.name.message}
                  </FormMessage>
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
                  <FormMessage>
                    {form.formState.errors.email.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Senha</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite sua senha"
                    {...field}
                    type="password"
                    className="px-4 py-6 text-base"
                  />
                </FormControl>
                {form.formState.errors.password?.message && (
                  <FormMessage>
                    {form.formState.errors.password.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <Button
            className="w-full py-6 text-base disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Carregando..." : "Criar conta"}
          </Button>
          <p className="text-center text-lg">
            Já possui uma conta?{" "}
            <Button asChild variant="link" className="p-0 text-lg font-bold">
              <Link to="/login">Entrar</Link>
            </Button>
          </p>
        </form>
      </Form>
    </AuthLayout>
  );
}

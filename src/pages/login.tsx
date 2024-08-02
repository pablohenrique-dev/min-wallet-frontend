import { Link, useNavigate, Navigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { toast } from "sonner";
import { AuthLayout } from "@/components/layouts/auth";
import { Head } from "@/components/seo/head";

const loginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Formato de email inválido!" })
    .min(6, { message: "Este Campo é obrigatório!" })
    .trim(),
  password: z
    .string()
    .min(6, { message: "A senha precisa ter no mínimo 6 caracteres!" }),
});

type loginFormType = z.infer<typeof loginFormSchema>;

export function LoginPage() {
  const form = useForm<loginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isUserLogged, login } = useAuthContext();
  const navigate = useNavigate();

  async function onSubmit(credentials: loginFormType) {
    try {
      await login(credentials);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { className: "border-l-4 border-red-500" });
      }
    }
  }

  if (isUserLogged) return <Navigate to="/" />;
  return (
    <AuthLayout>
      <Head title="Entrar" description="Faça login em sua conta" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto w-full max-w-[384px] space-y-5"
        >
          <h2 className="mb-8 text-4xl font-semibold">Entre em sua conta</h2>
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
                <Button
                  asChild
                  variant="link"
                  className="block px-0 pb-0 text-end text-base opacity-85"
                >
                  <Link to="/forgot-password">Esqueceu a senha?</Link>
                </Button>
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
            {form.formState.isSubmitting ? "Carregando..." : "Entrar"}
          </Button>
          <p className="text-center text-lg">
            Não possui uma conta?{" "}
            <Button asChild variant="link" className="p-0 text-lg font-bold">
              <Link to="/register">Criar conta</Link>
            </Button>
          </p>
        </form>
      </Form>
    </AuthLayout>
  );
}

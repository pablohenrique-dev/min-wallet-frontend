import { AuthLayout } from "@/components/layouts/auth";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { api } from "@/services/api";
import { Link, Navigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthContext } from "@/contexts/auth";
import { Head } from "@/components/seo/head";

const forgotPasswordFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Formato de email inválido!" })
    .min(6, { message: "Este Campo é obrigatório!" })
    .trim(),
});

type forgotPasswordFormType = z.infer<typeof forgotPasswordFormSchema>;

export function ForgotPasswordPage() {
  const { isUserLogged } = useAuthContext();

  const form = useForm<forgotPasswordFormType>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(credentials: forgotPasswordFormType) {
    try {
      await api.post("/forgot-password", credentials);
      toast.success(
        "Solicitação enviada com sucesso! verifique o seu e-mail!",
        { className: "border-l-4 border-green-500" },
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error("E-mail fornecido não existe!");
        return null;
      }
      toast.error("Ocorreu um erro ao solicitar a mudança de senha!", {
        className: "border-l-4 border-red-500",
      });
      return null;
    }
  }

  if (isUserLogged) return <Navigate to="/" />;
  return (
    <AuthLayout>
      <Head
        title="Esqueci minha senha"
        description="Solicite a troca de senha"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto w-full max-w-[384px] space-y-5"
        >
          <h2 className="text-4xl font-semibold">Esqueceu a senha?</h2>
          <p className="opacity-85">
            Ao preencher o campo abaixo e clicar no botão enviar, será enviado
            para o seu e-mail um link para redefinição de senha.
          </p>
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

          <Button
            className="w-full py-6 text-base disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Carregando..." : "Enviar"}
          </Button>

          <Button
            asChild
            variant="link"
            className="block p-0 text-center text-lg"
          >
            <Link to="/login">Voltar para página de login</Link>
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
}

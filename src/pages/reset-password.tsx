import React from "react";
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
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { api } from "@/services/api";
import { toast } from "sonner";
import { useAuthContext } from "@/contexts/auth";
import { Head } from "@/components/seo/head";

const resetPasswordFormSchema = z.object({
  password: z
    .string()
    .min(6, { message: "A senha precisa ter no mínimo 6 caracteres!" }),
});

type resetPasswordFormType = z.infer<typeof resetPasswordFormSchema>;

export function ResetPasswordPage() {
  const { isUserLogged } = useAuthContext();

  const form = useForm<resetPasswordFormType>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
    },
  });

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  async function onSubmit(credentials: resetPasswordFormType) {
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    try {
      await api.put("/reset-password", { token, email, ...credentials });

      toast.success("Senha atualizada! Faça login com a nova senha", {
        className: "border-l-4 border-green-500",
      });
      timeoutRef.current = setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          toast.error("E-mail fornecido não existe!", {
            className: "border-l-4 border-red-500",
          });
          timeoutRef.current = setTimeout(() => {
            navigate("/forgot-password");
          }, 5100);
          return null;
        }
        if (error.response?.status === 400) {
          toast.error(
            "Tempo para redefinição de senha expirado ou token inválido!",
            { className: "border-l-4 border-red-500" },
          );
          timeoutRef.current = setTimeout(() => {
            navigate("/forgot-password");
          }, 5100);
          return null;
        }
      }
      toast.error("Ocorreu um erro ao redefinir a senha, tente novamente!", {
        className: "border-l-4 border-red-500",
      });
      return null;
    }
  }

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (isUserLogged) return <Navigate to="/" />;
  return (
    <AuthLayout>
      <Head title="Redefinir senha" description="Redefina a sua senha" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto w-full max-w-[384px] space-y-5"
        >
          <h2 className="text-4xl font-semibold">Redefinir senha</h2>
          <p className="opacity-85">
            Após redefinir a senha da sua conta, você será redirecionado para a
            página de login.
          </p>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Nova senha</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite sua nova senha"
                    className="px-4 py-6 text-base"
                    type="password"
                    {...field}
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

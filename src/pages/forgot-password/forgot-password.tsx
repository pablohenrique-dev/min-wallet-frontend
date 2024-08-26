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
import axios from "axios";
import { api } from "@/services/api";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useAuthContext } from "@/contexts/auth";
import { Head } from "@/components/seo/head";
import { ResendRequestTimer } from "./components/resend-request-timer";

const forgotPasswordFormSchema = z.object({
  email: z.string().email({ message: "Formato de email inválido!" }).trim(),
});

export type forgotPasswordFormType = z.infer<typeof forgotPasswordFormSchema>;

export function ForgotPasswordPage() {
  const { isUserLogged } = useAuthContext();

  const [searchParams] = useSearchParams();

  const emailSearchParam = searchParams.get("email");

  const [isBtnDisabled, setIsBtnDisabled] = React.useState(false);

  const form = useForm<forgotPasswordFormType>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: emailSearchParam || "",
    },
  });

  async function onSubmit(credentials: forgotPasswordFormType) {
    try {
      await api.post("/forgot-password", credentials);
      toast.success(
        "Solicitação enviada com sucesso! verifique o seu e-mail!",
        { className: "border-l-4 border-green-500" },
      );
      setIsBtnDisabled(true);
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

  const TIMER_INTERVAL_IN_MILLISECONDS = 1000 * 60;

  React.useEffect(() => {
    let enableBtnTimeout: NodeJS.Timeout;
    if (isBtnDisabled) {
      enableBtnTimeout = setTimeout(
        () => setIsBtnDisabled(false),
        TIMER_INTERVAL_IN_MILLISECONDS,
      );
    }
    return () => {
      clearTimeout(enableBtnTimeout);
    };
  }, [isBtnDisabled, TIMER_INTERVAL_IN_MILLISECONDS]);

  if (isUserLogged && !emailSearchParam) return <Navigate to="/" />;
  return (
    <AuthLayout>
      <Head
        title="Alterar minha senha"
        description="Solicite a troca de senha"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto w-full max-w-[384px] space-y-5"
        >
          <h2 className="text-4xl font-semibold">Alterar minha senha</h2>
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
            disabled={form.formState.isSubmitting || isBtnDisabled}
          >
            {form.formState.isSubmitting ? "Carregando..." : "Enviar"}
          </Button>

          {isBtnDisabled && (
            <ResendRequestTimer
              timerIntervalInMilliseconds={TIMER_INTERVAL_IN_MILLISECONDS}
            />
          )}

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

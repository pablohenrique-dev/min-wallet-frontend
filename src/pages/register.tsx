import React from "react";
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
import { ToastValues, Toast } from "@/components/ui/toast";

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
  const [toast, setToast] = React.useState<ToastValues | null>(null);
  const { isUserLogged, register } = useAuthContext();
  const navigate = useNavigate();

  async function onSubmit(values: registerFormType) {
    try {
      await register(values);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        setToast({
          message: error.message,
          type: "error",
        });
      }
    }
  }

  if (isUserLogged) return <Navigate to="/" />;
  return (
    <section className="grid h-screen grid-cols-1 md:grid-cols-[640px_auto]">
      <div className="mx-6 my-32 flex animate-fade-left flex-col items-center justify-center sm:mx-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto w-full max-w-[384px] space-y-5"
          >
            <h2 className="mb-8 text-center text-4xl font-semibold">
              Crie sua conta
            </h2>
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

            <Button className="w-full py-6 text-base" type="submit">
              Criar conta
            </Button>
            <p className="text-center text-lg">
              Já possui uma conta?{" "}
              <Button asChild variant="link" className="p-0 text-lg font-bold">
                <Link to="/login">Entrar</Link>
              </Button>
            </p>
          </form>
        </Form>
      </div>
      <div className="hidden w-full animate-fade-in bg-[url('bg-image-black-pattern.jpg')] bg-cover md:block"></div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          closeToast={setToast}
        />
      )}
    </section>
  );
}

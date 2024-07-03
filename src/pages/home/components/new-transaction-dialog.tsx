import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Toast, ToastValues } from "@/components/ui/toast";
import { useCreateNewTransaction } from "../hooks/use-create-new-transaction";

const transactionFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: "O título precisa ter no mínimo 3 caracteres!" }),
  value: z.coerce.number().refine((value) => value !== 0, {
    message: "O valor precisa ser diferente de 0!",
  }),
  description: z.string().trim().default(""),
});

export type transactionFormType = z.infer<typeof transactionFormSchema>;

export function NewTransactionDialog() {
  const form = useForm<transactionFormType>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      title: "",
      description: "",
      value: 0,
    },
  });
  const [toast, setToast] = React.useState<ToastValues | null>(null);

  const { mutate } = useCreateNewTransaction(setToast);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="gap-2" variant="secondary">
            Nova transação
            <Plus size={16} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Adicione uma nova transação</DialogTitle>
            <DialogDescription>
              Cadastre entradas e saídas para manter seu controle financeiro!
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) => mutate(values))}
              className="mt-10 w-full max-w-[384px] space-y-5"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Título</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite um título"
                        {...field}
                        className="px-4 py-6 text-base"
                      />
                    </FormControl>
                    {form.formState.errors.title?.message && (
                      <FormMessage>
                        {form.formState.errors.title.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Descrição</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite uma descrição"
                        {...field}
                        type="text"
                        className="px-4 py-6 text-base"
                      />
                    </FormControl>
                    {form.formState.errors.description?.message && (
                      <FormMessage>
                        {form.formState.errors.description.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Valor</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite um valor"
                        {...field}
                        type="number"
                        className="px-4 py-6 text-base"
                      />
                    </FormControl>
                    {form.formState.errors.value?.message && (
                      <FormMessage>
                        {form.formState.errors.value.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <DialogTrigger asChild>
                <Button className="w-full py-6 text-base" type="submit">
                  Criar
                </Button>
              </DialogTrigger>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          closeToast={setToast}
        />
      )}
    </>
  );
}

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Plus } from "lucide-react";
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
import { useCreateTransaction } from "../hooks/use-create-transaction";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatToBRL } from "@/utils/price-formatter";
import { useSearchParams } from "react-router-dom";

const transactionFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: "O título precisa ter no mínimo 3 caracteres!" }),
  value: z.string().refine((value) => value !== "0,00", {
    message: "O valor precisa ser diferente de 0!",
  }),
  description: z.string().trim().default(""),
  date: z.date({ message: "Escolha uma data!" }),
  type: z.enum(["INCOME", "EXPENSE"], {
    message: "Selecione uma das opções acima!",
  }),
});

export type transactionFormType = z.infer<typeof transactionFormSchema>;

export function CreateTransactionDialog() {
  const form = useForm<transactionFormType>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      title: "",
      description: "",
      value: "0,00",
    },
  });

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [, setSearchParams] = useSearchParams();

  const { mutate } = useCreateTransaction();

  function onSubmit(values: transactionFormType) {
    mutate(values);
    form.reset();
    setIsDialogOpen(false);
    setSearchParams(new URLSearchParams());
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="w-full gap-2 sm:w-fit" variant="default">
          Nova transação
          <Plus size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicione uma nova transação</DialogTitle>
          <DialogDescription>
            Cadastre entradas e saídas para manter seu controle financeiro!
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-1 w-full space-y-5"
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
                    <div className="relative">
                      <span className="absolute top-1/2 translate-y-[-50%] rounded-l-lg bg-primary px-4 py-3 font-semibold text-white">
                        R$
                      </span>
                      <Input
                        placeholder="Digite um valor"
                        {...field}
                        type="text"
                        className="px-4 py-6 pl-16 text-base"
                        onChange={({ target }) => {
                          const value = formatToBRL(target.value);
                          field.onChange(value);
                        }}
                      />
                    </div>
                  </FormControl>
                  {form.formState.errors.value?.message && (
                    <FormMessage>
                      {form.formState.errors.value.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-base">Data</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start px-4 py-6 text-left text-base font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-4 h-4 w-4" />
                        {field.value ? (
                          <span className="mt-1">
                            {dayjs(field.value).format("DD/MM/YYYY")}
                          </span>
                        ) : (
                          <span>Escolha uma data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(field.value)}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base">Tipo da transação</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      <FormItem
                        className={cn(
                          "rounded border text-base hover:border-green-500 hover:text-green-500",
                          field.value === "INCOME" &&
                            "border-green-500 bg-green-500 text-white hover:text-white",
                        )}
                      >
                        <FormControl className="sr-only">
                          <RadioGroupItem value="INCOME" />
                        </FormControl>
                        <FormLabel className="block w-full cursor-pointer py-4 text-center font-normal">
                          Entradas
                        </FormLabel>
                      </FormItem>
                      <FormItem
                        className={cn(
                          "rounded border text-base hover:border-red-500 hover:text-red-500",
                          field.value === "EXPENSE" &&
                            "border-red-500 bg-red-500 text-white hover:text-white",
                        )}
                      >
                        <FormControl className="sr-only">
                          <RadioGroupItem value="EXPENSE" />
                        </FormControl>
                        <FormLabel className="block w-full cursor-pointer py-4 text-center font-normal">
                          Saídas
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogTrigger asChild>
              <Button
                className="w-full py-6 text-base disabled:cursor-not-allowed"
                type="submit"
                disabled={!form.formState.isValid}
              >
                Criar
              </Button>
            </DialogTrigger>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

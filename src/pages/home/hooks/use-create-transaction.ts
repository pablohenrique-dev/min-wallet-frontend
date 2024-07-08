import { api, apiRoutes } from "@/services/api";
import { transactionFormType } from "../components/create-transaction-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/tanstack-query/constants";
import { formatBRLToNumber } from "@/utils/price-formatter";
import { toast } from "sonner";

interface CreateTransactionParams extends transactionFormType {}

async function createTransaction(values: CreateTransactionParams) {
  const body = { ...values, value: formatBRLToNumber(values.value) };

  return api.post(apiRoutes.transactions, body);
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.transactions] });
      toast.success("Transação criada com sucesso!", { className: "border-l-4 border-green-500" });
    },
    onError: () => {
      toast.error("Ocorreu um erro ao criar uma nova transação!", { className: "border-l-4 border-red-500" });
    },
  });

  return { mutate };
}

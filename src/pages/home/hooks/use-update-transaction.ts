import { queryKeys } from "@/tanstack-query/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionFormType } from "../components/update-transaction-dialog";
import { api, apiRoutes } from "@/services/api";
import { formatBRLToNumber } from "@/utils/price-formatter";
import { toast } from "sonner";

interface UpdateTransactionParams extends transactionFormType {
  id: string;
}

async function updateTransaction(values: UpdateTransactionParams) {
  const body = { ...values, value: formatBRLToNumber(values.value) };

  return api.put(`${apiRoutes.transactions}/${values.id}`, body);
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: [queryKeys.transactions],
        }),
        queryClient.invalidateQueries({
          queryKey: [queryKeys.summary],
        }),
      ]);

      toast.success("Transação atualizada com sucesso!", {
        className: "border-l-4 border-green-500",
      });
    },
    onError: () => {
      toast.error("Ocorreu um erro ao atualizar uma transação!", {
        className: "border-l-4 border-red-500",
      });
    },
  });

  return { mutate };
}

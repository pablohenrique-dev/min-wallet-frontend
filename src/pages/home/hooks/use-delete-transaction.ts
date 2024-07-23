import { api, apiRoutes } from "@/services/api";
import { queryKeys } from "@/tanstack-query/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

async function deleteTransaction(id: string) {
  return api.delete(`${apiRoutes.transactions}/${id}`);
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: [queryKeys.transactions],
        }),
        queryClient.invalidateQueries({
          queryKey: [queryKeys.summary],
        }),
      ]);

      toast.success("Transação deletada com sucesso!", {
        className: "border-l-4 border-green-500",
      });
    },
    onError: () => {
      toast.error("Ocorreu um erro ao deletar a transação!", {
        className: "border-l-4 border-red-500",
      });
    },
  });

  return { mutateDelete: mutate };
}

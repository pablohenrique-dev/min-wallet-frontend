import React from "react";
import { api, apiRoutes } from "@/services/api";
import { transactionFormType } from "../components/new-transaction-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/tanstack-query/constants";
import { ToastValues } from "@/components/ui/toast";

async function createNewTransaction(values: transactionFormType) {
  await api.post(apiRoutes.transactions, values);
}

export function useCreateNewTransaction(
  setToast: React.Dispatch<React.SetStateAction<ToastValues | null>>,
) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createNewTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.transactions] });
      setToast({
        message: "Transação criada com sucesso!",
        type: "success",
      });
    },
    onError: () => {
      setToast({
        message: "Ocorreu um erro ao criar uma nova transação!",
        type: "error",
      });
    },
  });

  return { mutate };
}

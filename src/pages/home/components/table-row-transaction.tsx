import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UpdateTransactionDialog } from "./update-transaction-dialog";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { priceFormatter } from "@/utils/price-formatter";
import { Transaction } from "../hooks/use-get-transactions";
import { useDeleteTransaction } from "../hooks/use-delete-transaction";

interface TableRowTransactionsProps {
  transaction: Transaction;
}

export function TableRowTransaction({
  transaction,
}: TableRowTransactionsProps) {
  const { mutateDelete } = useDeleteTransaction();

  function handleDeleteTransaction(transactionId: string) {
    const confirmDelete = confirm("Tem certeza que deseja excluir?");
    if (confirmDelete) mutateDelete(transactionId);
  }

  return (
    <TableRow>
      <TableCell>{dayjs(transaction.date).format("DD/MM/YYYY")}</TableCell>
      <TableCell>
        {transaction.type === "INCOME" ? (
          <Badge className="flex w-fit items-center gap-2 border border-green-500 bg-green-100 pt-1 text-black hover:bg-green-400">
            <span className="mt-[-2px] aspect-square w-2 rounded-full bg-green-700"></span>
            Entrada
          </Badge>
        ) : (
          <Badge className="flex w-fit items-center gap-2 border border-red-500 bg-red-100 pt-1 text-black hover:bg-red-400">
            <span className="mt-[-2px] aspect-square w-2 rounded-full bg-red-700"></span>
            Saída
          </Badge>
        )}
      </TableCell>
      <TableCell className="overflow-hidden text-ellipsis text-nowrap font-medium">
        {transaction.title}
      </TableCell>
      <TableCell
        title={transaction.description}
        className="overflow-hidden text-ellipsis text-nowrap sm:max-w-[300px]"
      >
        {transaction.description || "-"}
      </TableCell>
      <TableCell className="text-right">
        {priceFormatter.format(transaction.value)}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex gap-2">
          <UpdateTransactionDialog transaction={transaction} />
          <Button
            className="hover:bg-red-500 hover:text-white"
            variant="secondary"
            onClick={() => handleDeleteTransaction(transaction.id)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

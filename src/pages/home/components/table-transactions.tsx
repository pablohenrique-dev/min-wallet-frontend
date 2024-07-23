import React from "react";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GetTransactionsResponse } from "../hooks/use-get-transactions";
import { priceFormatter } from "@/utils/price-formatter";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { UpdateTransactionDialog } from "./update-transaction-dialog";

interface TransactionsTableProps {
  transactionPages?: GetTransactionsResponse[];
}

type ValueOrder = "def" | "asc" | "desc";

export function TableTransactions({
  transactionPages,
}: TransactionsTableProps) {
  const [valueOrder, setValueOrder] = React.useState<ValueOrder>("def");
  const [searchParams, setSearchParams] = useSearchParams();

  function handleValueOrder(order: ValueOrder) {
    setValueOrder(order);
    setSearchParams((searchParams) => {
      if (order === "def") {
        searchParams.set("order", "");
        return searchParams;
      }
      searchParams.set("order", order);
      return searchParams;
    });
  }

  React.useEffect(() => {
    const initialValueOrder = searchParams.get("order");
    if (initialValueOrder) {
      setValueOrder(initialValueOrder as ValueOrder);
    }
  }, [searchParams]);

  return (
    <>
      <h2 className="mb-4 text-2xl font-semibold">Transações:</h2>
      <Table className="text-base">
        <TableCaption>Uma lista de suas últimas transações</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[130px]">Criada em:</TableHead>
            <TableHead className="w-[100px]">Tipo</TableHead>
            <TableHead className=" ">Titulo</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1 text-base"
                  >
                    <span className="sr-only sm:not-sr-only">Valor</span>
                    <ChevronsUpDown className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={valueOrder === "def"}
                    onClick={() => handleValueOrder("def")}
                  >
                    Padrão
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={valueOrder === "asc"}
                    onClick={() => handleValueOrder("asc")}
                  >
                    Crescente
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={valueOrder === "desc"}
                    onClick={() => handleValueOrder("desc")}
                  >
                    Decrescente
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableHead>
            <TableHead className="w-[72px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactionPages &&
            transactionPages.map((page) => {
              return page.transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {dayjs(transaction.date).format("DD/MM/YYYY")}
                  </TableCell>
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
                    <UpdateTransactionDialog transaction={transaction} />
                  </TableCell>
                </TableRow>
              ));
            })}
        </TableBody>
      </Table>
    </>
  );
}

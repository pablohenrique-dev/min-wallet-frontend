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
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactionPages &&
          transactionPages.map((page) => {
            return page.transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {dayjs(transaction.created_at).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell>
                  {transaction.value > 0 ? "Entrada" : "Saída"}
                </TableCell>
                <TableCell className="font-medium">
                  {transaction.title}
                </TableCell>
                <TableCell>{transaction.description || "-"}</TableCell>
                <TableCell className="text-right">
                  {priceFormatter.format(transaction.value)}
                </TableCell>
              </TableRow>
            ));
          })}
      </TableBody>
    </Table>
  );
}

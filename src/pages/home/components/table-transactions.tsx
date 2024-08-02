import React from "react";
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
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { TableRowTransaction } from "./table-row-transaction";

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

  function EmptyTableRow() {
    return (
      <TableRow>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
        <TableCell className="text-nowrap">
          Nenhuma transação encontrada
        </TableCell>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
      </TableRow>
    );
  }

  React.useEffect(() => {
    const initialValueOrder = searchParams.get("order");
    if (initialValueOrder) {
      setValueOrder(initialValueOrder as ValueOrder);
    }
  }, [searchParams]);

  return (
    <>
      <h2 className="mb-4 text-2xl font-semibold opacity-80">Transações</h2>
      <Table className="text-base">
        <TableCaption>Uma lista de suas últimas transações</TableCaption>
        <TableHeader>
          <TableRow className="text-sm sm:text-base">
            <TableHead className="w-[130px] text-nowrap">Criada em:</TableHead>
            <TableHead className="w-[100px]">Tipo</TableHead>
            <TableHead>Titulo</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1 text-base"
                  >
                    <span className="text-sm sm:text-base">Valor</span>
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
              if (page.count === 0) {
                return <EmptyTableRow key={page.count} />;
              }
              return page.transactions.map((transaction) => (
                <TableRowTransaction
                  key={transaction.id}
                  transaction={transaction}
                />
              ));
            })}
        </TableBody>
      </Table>
    </>
  );
}

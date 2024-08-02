import React from "react";
import { useGetTransactions } from "./hooks/use-get-transactions";
import { TableTransactions } from "./components/table-transactions";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "react-router-dom";
import { TableActions } from "./components/table-actions";
import { CardTransaction } from "./components/card-transaction";
import { useGetSummary } from "./hooks/use-get-summary";
import { Summary } from "./components/summary";
import { useCreateDateInterval } from "./hooks/use-create-date-interval";
import { Loading } from "@/components/ui/loading";
import { TrendingDown, TrendingUp, WalletMinimal } from "lucide-react";
import { Head } from "@/components/seo/head";

export function HomePage() {
  const [searchParams] = useSearchParams();

  const { from, to } = useCreateDateInterval({
    month: searchParams.get("month") || undefined,
    year: searchParams.get("year") || undefined,
  });

  const { data: summary } = useGetSummary({
    from,
    to,
    title: searchParams.get("title") || undefined,
  });

  const { data, hasNextPage, fetchNextPage, isFetching } = useGetTransactions({
    page: 1,
    title: searchParams.get("title") || undefined,
    order: searchParams.get("order") || undefined,
    from,
    to,
  });

  const { ref, inView } = useInView();

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  return (
    <section className="container my-8 animate-fade-in">
      <Head
        title="MinWallet"
        description="Gerencie sua vida financeira de forma fácil com o minwallet."
      />
      <Summary>
        <CardTransaction value={summary?.totalIncome}>
          <TrendingUp size={20} color="green" />
          Entradas
        </CardTransaction>
        <CardTransaction value={summary?.totalExpense}>
          <TrendingDown size={20} color="red" />
          Saídas
        </CardTransaction>
        <CardTransaction value={summary?.balance}>
          <WalletMinimal size={20} color="blue" />
          Saldo
        </CardTransaction>
      </Summary>

      <TableActions />

      <TableTransactions transactionPages={data?.pages} />

      <div className="flex w-full justify-center" ref={ref}>
        {isFetching && <Loading />}
      </div>
    </section>
  );
}

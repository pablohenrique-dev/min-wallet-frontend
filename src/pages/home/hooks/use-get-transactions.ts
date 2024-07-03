import { api, apiRoutes } from "@/services/api";
import { queryKeys } from "@/tanstack-query/constants";
import { useInfiniteQuery } from "@tanstack/react-query";

export interface Transaction {
  id: string;
  title: string;
  description: string;
  value: number;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface GetTransactionsResponse {
  count: number;
  pages: number;
  next_page: number | null;
  previous_page: number | null;
  transactions: Transaction[];
}

interface GetTransactionsParams {
  page?: number;
  order?: string;
  title?: string;
  from?: string;
  to?: string;
}

function addParamsToUrl(baseUrl: string, params: GetTransactionsParams) {
  let url = baseUrl;
  const queryStrings: string[] = [];

  for (const key in params) {
    if (params[key as keyof GetTransactionsParams] !== undefined) {
      queryStrings.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(
          params[key as keyof GetTransactionsParams]!.toString(),
        )}`,
      );
    }
  }

  if (queryStrings.length > 0) {
    url += "?" + queryStrings.join("&");
  }

  return url;
}

async function getTransactions(params: GetTransactionsParams) {
  const url = addParamsToUrl(apiRoutes.transactions, params);

  const { data } = await api.get<GetTransactionsResponse>(url);
  return data;
}

export function useGetTransactions({
  order,
  title,
  from,
  to,
}: GetTransactionsParams) {
  const { data, isFetching, isLoading, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [queryKeys.transactions, order, title, from, to],
      queryFn: ({ pageParam }) =>
        getTransactions({ page: pageParam, from, order, title, to }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.next_page,
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false,
    });

  return { data, isFetching, isLoading, hasNextPage, fetchNextPage };
}

// export function useGetTransactions({
//   page,
//   order,
//   title,
//   from,
//   to,
// }: GetTransactionsParams) {
//   const { data, isFetching, isLoading } = useQuery({
//     queryKey: ["transactions", page, order, title, from, to],
//     queryFn: () => getTransactions({ page, from, order, title, to }),
//     staleTime: 1000 * 60,
//   });

//   return { ...data, isFetching, isLoading };
// }

import { api, apiRoutes } from "@/services/api";
import { queryKeys } from "@/tanstack-query/constants";
import { addParamsToUrl } from "@/utils/add-search-params-to-url";
import { useQuery } from "@tanstack/react-query";

interface GetSummaryResponse {
  amount: number;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

interface GetSummaryParams {
  from?: string;
  to?: string;
  title?: string;
}

async function getSummary(params: GetSummaryParams) {
  const url = addParamsToUrl<GetSummaryParams>(apiRoutes.summary, params);
  const { data } = await api.get<GetSummaryResponse>(url);
  return data;
}

export function useGetSummary({ from, to,  title }: GetSummaryParams) {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [queryKeys.summary, from, to, title],
    queryFn: () => getSummary({ from, to, title }),
  });

  return { data, isLoading, isFetching };
}

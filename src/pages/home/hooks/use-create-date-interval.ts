import dayjs from "dayjs";

interface CreateDateIntervalParams {
  month?: string;
  year?: string;
}

export function useCreateDateInterval({
  month,
  year,
}: CreateDateIntervalParams) {
  const from =
    month && year
      ? dayjs(`${year}-${month}-01`).startOf("month").format("YYYY-MM-DD")
      : undefined;
  const to =
    month && year
      ? dayjs(`${year}-${month}-01`).endOf("month").format("YYYY-MM-DD")
      : undefined;

  return { from, to };
}

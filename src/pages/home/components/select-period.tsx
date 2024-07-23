import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { getLastFiveYears } from "@/utils/get-last-five-years";

const months = [
  "Todos os meses",
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const years = ["Todos os anos", ...getLastFiveYears()];

export function SelectPeriod() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSelectMonth(value: string) {
    if (value === "0") {
      setSearchParams((searchParams) => {
        searchParams.delete("year");
        searchParams.delete("month");
        return searchParams;
      });
      return null;
    }

    setSearchParams((searchParams) => {
      searchParams.set("month", value);

      if (searchParams.get("year") === null) {
        const year = dayjs().year().toString();
        searchParams.set("year", year);
      }

      return searchParams;
    });
  }

  function getSelectedOrCurrentMonth() {
    const selectedMonth = searchParams.get("month");

    return selectedMonth || "0";
  }

  function handleSelectYear(value: string) {
    if (isNaN(Number(value))) {
      setSearchParams((searchParams) => {
        searchParams.delete("year");
        searchParams.delete("month");
        return searchParams;
      });
      return null;
    }

    setSearchParams((searchParams) => {
      searchParams.set("year", value);

      if (searchParams.get("month") === null) {
        const currentMonth = (dayjs().month() + 1).toString();
        searchParams.set("month", currentMonth);
      }

      return searchParams;
    });
  }

  function getSelectedOrCurrentYear() {
    const selectedYear = searchParams.get("year");

    return selectedYear || "Todos os anos";
  }

  return (
    <Popover>
      <PopoverTrigger asChild className="w-full sm:w-fit">
        <Button variant="outline">Selecionar período</Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-fit gap-4 shadow-xl" align="center">
        <Select
          onValueChange={handleSelectMonth}
          value={getSelectedOrCurrentMonth()}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Mês" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Selecione um mês:</SelectLabel>
              {months.map((month, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={handleSelectYear}
          value={getSelectedOrCurrentYear()}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Ano" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Selecione um ano:</SelectLabel>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </PopoverContent>
    </Popover>
  );
}

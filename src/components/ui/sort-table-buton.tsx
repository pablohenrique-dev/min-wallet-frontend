import React from "react";
import { ChevronsUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Separator } from "./separator";

export function SortTableButton() {
  const [iconSelected, setIconSelected] = React.useState<
    "arrowUp" | "arrowDown" | "chevronsUpDown"
  >("chevronsUpDown");

  function selectIconSelected(
    type: "arrowUp" | "arrowDown" | "chevronsUpDown",
  ) {
    const icons = {
      arrowUp: <ArrowUp size={16} />,
      arrowDown: <ArrowDown size={16} />,
      chevronsUpDown: <ChevronsUpDown size={16} />,
    };

    return icons[type];
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="felx items-center justify-between gap-2 hover:bg-gray-200"
        >
          Valor {selectIconSelected(iconSelected)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-fit flex-col gap-1 p-1">
        <Button
          variant="ghost"
          className="felx items-center justify-between gap-1"
          onClick={() => setIconSelected("arrowUp")}
        >
          Crescente
          <ArrowUp size={16} />
        </Button>
        <Button
          variant="ghost"
          className="felx items-center justify-between gap-1"
          onClick={() => setIconSelected("arrowDown")}
        >
          Decrescente
          <ArrowDown size={16} />
        </Button>
        <Separator orientation="horizontal" />
        <Button
          variant="ghost"
          className="felx items-center justify-between gap-1"
          onClick={() => setIconSelected("chevronsUpDown")}
        >
          Padrão
          <ChevronsUpDown size={16} />
        </Button>
      </PopoverContent>
    </Popover>
  );
}

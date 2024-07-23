import React from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = React.useRef<HTMLInputElement>(null);

  function searchTransactionsByTitle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const inputValue = inputRef.current?.value || "";
    setSearchParams((searchParams) => {
      searchParams.set("title", inputValue);
      return searchParams;
    });
    inputRef.current?.blur();
  }

  React.useEffect(() => {
    const title = searchParams.get("title");
    if (inputRef.current) {
      inputRef.current.value = title || "";
    }
  }, [searchParams]);

  return (
    <form
      onSubmit={searchTransactionsByTitle}
      className="flex h-fit w-full sm:max-w-[320px] items-center"
    >
      <div className="relative w-full">
        <Button
          variant="ghost"
          className="absolute bottom-0 right-0 top-0 m-auto"
        >
          <Search size={18} color="gray" />
        </Button>
        <Input
          placeholder="Pesquisar por título..."
          className=""
          ref={inputRef}
          name="title"
        />
      </div>
    </form>
  );
}

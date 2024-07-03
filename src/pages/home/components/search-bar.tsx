import React from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

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
      className="mb-6 w-full max-w-[320px]"
    >
      <div className="relative">
        <Search
          size={18}
          color="gray"
          className="absolute bottom-0 right-3 top-0 m-auto"
        />
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

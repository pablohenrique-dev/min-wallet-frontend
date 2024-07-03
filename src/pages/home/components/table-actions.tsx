import { NewTransactionDialog } from "./new-transaction-dialog";
import { SearchBar } from "./search-bar";

export function TableActions() {
  return (
    <div className="flex items-center justify-between">
      <SearchBar />
      <NewTransactionDialog />
    </div>
  );
}

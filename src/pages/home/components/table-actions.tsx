import { CreateTransactionDialog } from "./create-transaction-dialog";
import { SearchBar } from "./search-bar";
import { SelectPeriod } from "./select-period";

export function TableActions() {
  return (
    <div className="mb-6 flex flex-col-reverse items-center justify-between gap-6 sm:flex-row">
      <SearchBar />
      <div className="flex w-full flex-col items-center justify-end gap-4 sm:flex-row">
        <SelectPeriod />
        <CreateTransactionDialog />
      </div>
    </div>
  );
}

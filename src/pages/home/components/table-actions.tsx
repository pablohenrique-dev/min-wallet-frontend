import { CreateTransactionDialog } from "./create-transaction-dialog";
import { SearchBar } from "./search-bar";
import { SelectPeriod } from "./select-period";

export function TableActions() {
  return (
    <div className="mb-6 flex flex-col-reverse items-center justify-between gap-6 sm:flex-row">
      <SearchBar />
      <div className="flex w-full items-center justify-end gap-4">
        <SelectPeriod />
        <CreateTransactionDialog />
      </div>
    </div>
  );
}

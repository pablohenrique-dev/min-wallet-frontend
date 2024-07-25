import React from "react";

interface SummaryProps extends React.PropsWithChildren {}

export function Summary({ children }: SummaryProps) {
  return (
    <>
      <h2 className="mb-4 text-2xl font-semibold">Resumo</h2>
      <div className="grid grid-cols-1 gap-8 pb-8 sm:grid-cols-3">
        {children}
      </div>
    </>
  );
}

import React from "react";
import { AuthContextProvider } from "@/contexts/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { CircleCheck, CircleX, CircleAlert } from "lucide-react";

const queryClient = new QueryClient();

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster
            toastOptions={{
              className: "font-Epilogue text-base font-semibold",
            }}
            position="top-right"
            duration={5000}
            icons={{
              success: <CircleCheck size={18} />,
              error: <CircleX size={18} />,
              warning: <CircleAlert size={18} />,
            }}
          />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

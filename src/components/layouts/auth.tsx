import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <section className="grid h-screen grid-cols-1 md:grid-cols-[640px_auto]">
      <div className="mx-6 my-32 flex animate-fade-left flex-col items-center justify-center sm:mx-0">
        {children}
      </div>
      <div className="hidden w-full animate-fade-in bg-[url('@/assets/bg-image-black-pattern.jpg')] bg-cover md:block"></div>
    </section>
  );
}

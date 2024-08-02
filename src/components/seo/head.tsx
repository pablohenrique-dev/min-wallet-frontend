import React from "react";

interface HeadProps {
  title?: string;
  description?: string;
}

export function Head({ title, description }: HeadProps) {
  React.useEffect(() => {
    document.title = title ? title + " | MinWallet" : "MinWallet";
    document
      .querySelector("meta[name='description'")
      ?.setAttribute("content", description || "");
  }, [title, description]);

  return <></>;
}

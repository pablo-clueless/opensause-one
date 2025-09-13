import React from "react";

import { SOCIAL_LINKS } from "@/config";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background fixed right-0 bottom-0 left-0 z-0 flex h-screen w-full flex-none items-center">
      <div className="container mx-auto flex h-full flex-col justify-between space-y-2 py-4">
        <div className=""></div>
        <div className="w-full space-y-2">
          <div className="grid w-full grid-cols-5 gap-x-5">
            {SOCIAL_LINKS.map(({ href, label }) => (
              <a
                className="link hover:text-primary before:bg-primary text-sm"
                href={href}
                key={label}
                target="_blank"
              >
                {label}
              </a>
            ))}
          </div>
          <h1 className="text-8xl leading-[1.25] font-bold">SAMSON OKUNOLA</h1>
          <div className="flex w-full items-center justify-between text-xs">
            <p>&copy;{new Date().getFullYear()}</p>
            <p className="text-primary font-medium">SAMSON OKUNOLA</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

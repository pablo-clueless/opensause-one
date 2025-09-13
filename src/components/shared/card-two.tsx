import React from "react";

import type { WallProps } from "@/types";

interface Props {
  wall: WallProps;
}

export const CardTwo = ({ wall }: Props) => {
  return (
    <div className="group mb-4 w-full break-inside-avoid shadow-md">
      <div className="relative w-full overflow-hidden">
        <img
          src={wall.image}
          alt={wall.alt}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="h-auto w-full object-cover grayscale transition-all duration-500 group-hover:scale-125 group-hover:rotate-[15deg] group-hover:grayscale-0"
        />
      </div>
    </div>
  );
};

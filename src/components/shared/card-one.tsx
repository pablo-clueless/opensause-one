import { ArrowRightIcon } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

import type { ProjectProps } from "@/types";

interface Props {
  index: number;
  project: ProjectProps;
}

export const CardOne = ({ index, project }: Props) => {
  return (
    <motion.div
      className="w-full space-y-2"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
    >
      <div className="relative aspect-[5/3] overflow-hidden border">
        <Image
          src={"/assets/images/placeholder.png"}
          alt={project.name}
          fill
          sizes="100%"
          className="object-cover object-top transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="grid w-full grid-cols-4 gap-x-4">
        <p className="text-xl font-medium">{project.name}</p>
        <p className="text-xs uppercase">{project.type}</p>
        <p className="text-sm">{project.year}</p>
        {project.type === "nda" ? (
          <p className="text-4xl">N/A</p>
        ) : (
          <a
            className="link before:bg-foreground group flex items-center gap-x-5 text-4xl transition-colors duration-300"
            href={project.url}
            target="_blank"
          >
            VIEW
            <ArrowRightIcon className="transition-all duration-500 group-hover:translate-x-6" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

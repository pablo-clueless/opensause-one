import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React from "react";

import { Button } from "../ui/button";
import { useInterval } from "@/hooks";
import { formatTime } from "@/lib";

export const Navbar = () => {
  const [date, setDate] = React.useState(new Date());

  useInterval(() => {
    setDate(new Date());
  }, 1000);

  return (
    <AnimatePresence>
      <motion.nav className="bg-foreground fixed top-6 left-1/2 !z-10 flex -translate-x-1/2 items-center gap-x-10 px-3 py-2">
        <Link className="text-background font-heading text-xl" href="/">
          Samson Okunola
        </Link>
        <p className="text-primary w-32 text-sm">LOS, NG {formatTime(date)}</p>
        <Button asChild size="sm">
          <a href="mailto:smsnmicheal@gmail.com">Get In Touch</a>
        </Button>
      </motion.nav>
    </AnimatePresence>
  );
};

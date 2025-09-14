import { InboxIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

import { SOCIAL_LINKS } from "@/config";
import { THINGS } from "@/constants";

interface Position {
  x: number;
  y: number;
}

interface Velocity {
  x: number;
  y: number;
}

interface Thing {
  position: Position;
  velocity: Velocity;
  id: number;
}

export const Footer = () => {
  const [things, setThings] = React.useState<Thing[]>([]);
  const animationRef = React.useRef<number>(null);
  const ref = React.useRef<HTMLDivElement>(null);

  const THING_SIZE = 40;
  const SPEED_MULTIPLIER = 0.5;
  const DAMPING = 0.99;

  const initializeThings = React.useCallback(() => {
    if (!ref.current) return;

    const containerHeight = ref.current.clientHeight;
    const containerWidth = ref.current.clientWidth;

    const newThings: Thing[] = [];

    THINGS.forEach((_, index) => {
      let position: Position;
      let attempts = 0;
      const maxAttempts = 50;

      do {
        position = {
          x: Math.random() * (containerWidth - THING_SIZE),
          y: Math.random() * (containerHeight - THING_SIZE),
        };
        attempts++;
      } while (
        attempts < maxAttempts &&
        newThings.some((thing) => {
          const dx = thing.position.x - position.x;
          const dy = thing.position.y - position.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          return distance < THING_SIZE + 10;
        })
      );

      newThings.push({
        id: index,
        position,
        velocity: {
          x: (Math.random() - 0.5) * 4 * SPEED_MULTIPLIER,
          y: (Math.random() - 0.5) * 4 * SPEED_MULTIPLIER,
        },
      });
    });

    setThings(newThings);
  }, []);

  const checkCollision = (thing1: Thing, thing2: Thing): boolean => {
    const dx = thing1.position.x - thing2.position.x;
    const dy = thing1.position.y - thing2.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < THING_SIZE;
  };

  const resolveCollision = (thing1: Thing, thing2: Thing): [Thing, Thing] => {
    const dx = thing1.position.x - thing2.position.x;
    const dy = thing1.position.y - thing2.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance === 0) return [thing1, thing2];

    const normalX = dx / distance;
    const normalY = dy / distance;

    const overlap = THING_SIZE - distance;
    const separateX = (overlap * normalX) / 2;
    const separateY = (overlap * normalY) / 2;

    const newThing1 = {
      ...thing1,
      position: {
        x: thing1.position.x + separateX,
        y: thing1.position.y + separateY,
      },
    };

    const newThing2 = {
      ...thing2,
      position: {
        x: thing2.position.x - separateX,
        y: thing2.position.y - separateY,
      },
    };

    const relativeVelocityX = thing1.velocity.x - thing2.velocity.x;
    const relativeVelocityY = thing1.velocity.y - thing2.velocity.y;

    const velocityInNormalDirection = relativeVelocityX * normalX + relativeVelocityY * normalY;

    if (velocityInNormalDirection > 0) return [newThing1, newThing2];

    const restitution = 0.8;
    const impulse = (2 * velocityInNormalDirection) / 2;
    const impulseX = impulse * normalX * restitution;
    const impulseY = impulse * normalY * restitution;

    return [
      {
        ...newThing1,
        velocity: {
          x: thing1.velocity.x - impulseX,
          y: thing1.velocity.y - impulseY,
        },
      },
      {
        ...newThing2,
        velocity: {
          x: thing2.velocity.x + impulseX,
          y: thing2.velocity.y + impulseY,
        },
      },
    ];
  };

  const updateThings = React.useCallback(() => {
    if (!ref.current) return;

    const containerHeight = ref.current.clientHeight;
    const containerWidth = ref.current.clientWidth;

    setThings((prevThings) => {
      let updatedThings = prevThings.map((thing) => ({
        ...thing,
        position: {
          x: thing.position.x + thing.velocity.x,
          y: thing.position.y + thing.velocity.y,
        },
        velocity: {
          x: thing.velocity.x * DAMPING,
          y: thing.velocity.y * DAMPING,
        },
      }));

      updatedThings = updatedThings.map((thing) => {
        const newVelocity = { ...thing.velocity };
        const newPosition = { ...thing.position };

        if (newPosition.x <= 0) {
          newPosition.x = 0;
          newVelocity.x = Math.abs(newVelocity.x) * 0.8;
        } else if (newPosition.x >= containerWidth - THING_SIZE) {
          newPosition.x = containerWidth - THING_SIZE;
          newVelocity.x = -Math.abs(newVelocity.x) * 0.8;
        }

        if (newPosition.y <= 0) {
          newPosition.y = 0;
          newVelocity.y = Math.abs(newVelocity.y) * 0.8;
        } else if (newPosition.y >= containerHeight - THING_SIZE) {
          newPosition.y = containerHeight - THING_SIZE;
          newVelocity.y = -Math.abs(newVelocity.y) * 0.8;
        }

        return {
          ...thing,
          position: newPosition,
          velocity: newVelocity,
        };
      });

      for (let i = 0; i < updatedThings.length; i++) {
        for (let j = i + 1; j < updatedThings.length; j++) {
          if (checkCollision(updatedThings[i], updatedThings[j])) {
            const [newThing1, newThing2] = resolveCollision(updatedThings[i], updatedThings[j]);
            updatedThings[i] = newThing1;
            updatedThings[j] = newThing2;
          }
        }
      }

      return updatedThings;
    });
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      initializeThings();
    };

    initializeThings();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [initializeThings]);

  React.useEffect(() => {
    if (things.length === 0) return;

    const animate = () => {
      updateThings();
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [things.length, updateThings]);

  return (
    <footer className="bg-foreground text-background fixed right-0 bottom-0 left-0 z-0 flex h-screen w-full flex-none items-center">
      <div className="container mx-auto flex h-full flex-col justify-between space-y-2 pt-40 pb-4">
        <div className="grid w-full grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-x-2">
              <MapPinIcon className="text-primary size-4" />
              <p className="text-sm">Lagos, Nigeria</p>
            </div>
            <div className="flex items-center gap-x-2">
              <InboxIcon className="text-primary size-4" />
              <a
                className="link before:bg-primary hover:text-primary text-sm"
                href="mailto:smsnmicheal@gmail.com"
              >
                smsnmicheal@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-x-2">
              <PhoneIcon className="text-primary size-4" />
              <a
                className="link before:bg-primary hover:text-primary text-sm"
                href="tel:+2349023966260"
              >
                +2349023966260
              </a>
            </div>
          </div>
        </div>
        <motion.div
          className="relative flex h-[300px] w-full overflow-hidden rounded-lg border border-neutral-700 bg-neutral-900/20"
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {things.map(({ position, id }, index) => {
            const thingData = THINGS[index];
            if (!thingData) return null;
            const { label, logo: Logo } = thingData;
            return (
              <motion.div
                className="bg-background/10 border-background/20 group absolute flex size-10 cursor-pointer items-center justify-center rounded-md border shadow-lg backdrop-blur-sm"
                key={`${label}-${id}`}
                style={{
                  left: position.x,
                  top: position.y,
                }}
                initial={{
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  rotate: [0, 360],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 0.5 },
                  opacity: { duration: 0.5 },
                }}
                whileHover={{
                  scale: 1.2,
                  rotate: 0,
                  zIndex: 10,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    duration: 0.2,
                  },
                }}
              >
                <Logo className="text-background group-hover:text-primary size-6 transition-colors duration-200" />
                <motion.div
                  className="bg-primary/20 absolute inset-0 rounded-md opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                <motion.div
                  className="pointer-events-none absolute inset-0"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(239, 68, 68, 0.4)",
                      "0 0 0 10px rgba(239, 68, 68, 0)",
                      "0 0 0 0 rgba(239, 68, 68, 0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                />
                <motion.div
                  className="bg-background text-foreground pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 rounded px-2 py-1 text-xs whitespace-nowrap opacity-0 shadow-lg group-hover:opacity-100"
                  initial={{ y: 5, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {label}
                </motion.div>
              </motion.div>
            );
          })}
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              className="bg-primary/30 absolute h-1 w-1 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
                x: [0, (Math.random() - 0.5) * 50],
                y: [0, (Math.random() - 0.5) * 50],
              }}
              transition={{
                delay: i * 0.3,
                duration: 4,
                repeat: Infinity,
                repeatDelay: Math.random() * 3,
              }}
            />
          ))}
        </motion.div>
        <div className="w-full space-y-2">
          <div className="grid w-full grid-cols-5 gap-x-5">
            {SOCIAL_LINKS.map(({ href, label }) => (
              <motion.a
                className="link hover:text-primary before:bg-primary text-sm"
                href={href}
                key={label}
                target="_blank"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {label}
              </motion.a>
            ))}
          </div>
          <motion.h1
            className="text-8xl leading-[1.25] font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            SAMSON OKUNOLA
          </motion.h1>
          <div className="flex w-full items-center justify-between text-xs">
            <p>&copy;{new Date().getFullYear()}</p>
            <p className="text-primary font-medium">SAMSON OKUNOLA</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

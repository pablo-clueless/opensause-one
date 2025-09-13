import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import { CardOne, CardTwo, Footer, Navbar, Seo } from "@/components/shared";
import { PROJECTS, WALL, WORK_HISTORY } from "@/__mock__";
import { MasonryLayout } from "@/components/layouts";
import { cn, formatDate } from "@/lib";

const startYear = new Date("12-03-2020").getFullYear();
const maxYear = Math.max(...WORK_HISTORY.map(({ start }) => new Date(start).getFullYear()));
const timeline = Array.from({ length: maxYear - startYear + 1 }, (_, i) => String(i + startYear));

const Page = () => {
  const [activeYear, setActiveYear] = React.useState("2020");
  const ref = React.useRef<HTMLDivElement>(null);

  const history = React.useMemo(() => {
    return timeline.map((year) => {
      const workHistory = WORK_HISTORY.filter(
        (work) => new Date(work.start).getFullYear() === Number(year),
      );
      return {
        year,
        workHistory,
      };
    });
  }, []);

  const historiesInActiveYear = React.useMemo(() => {
    return (
      history.find((history) => history.year === activeYear) || {
        year: activeYear,
        workHistory: [],
      }
    );
  }, [activeYear, history]);

  React.useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!ref.current) return;

      const timelineElement = ref.current;
      const isInTimeline = timelineElement.contains(e.target as Node);

      if (isInTimeline) {
        e.preventDefault();
        const currentIndex = timeline.indexOf(activeYear);
        const scrollThreshold = 50;
        if (e.deltaY > scrollThreshold && currentIndex < timeline.length - 1) {
          setTimeout(() => {
            setActiveYear(timeline[currentIndex + 1]);
          }, 150);
        } else if (e.deltaY < -scrollThreshold && currentIndex > 0) {
          setTimeout(() => {
            setActiveYear(timeline[currentIndex - 1]);
          }, 150);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeYear]);

  return (
    <>
      <Seo title="Samson Okunola: Software Engineer" includeSiteName={false} />
      <Navbar />
      <div className="relative !z-[1] mb-[100vh] h-fit min-h-screen">
        <div className="bg-background relative grid h-screen w-full place-items-center py-20">
          <div className="flex h-full w-4/5 flex-col items-center justify-end gap-y-40">
            <div className="flex w-full items-center justify-between">
              <div className="max-w-1/4 space-y-2">
                <div className="bg-foreground flex w-fit items-center gap-x-1 rounded-full px-2 py-1">
                  <span className="bg-primary size-2 rounded-full"></span>
                  <p className="text-background text-xs">Available to work</p>
                </div>
                <h2 className="text-2xl font-semibold">Software Engineer based in Lagos.</h2>
              </div>
              <div className="max-w-1/4 space-y-2">
                <p className="">
                  Hi, I&apos;m Samson Okunola - a Software Engineer passionate about creating
                  amazing digital experience for my users.
                </p>
              </div>
            </div>
            <div className="w-full space-y-5 text-center">
              <h1 className="text-8xl leading-[1.25] font-extrabold uppercase">samson okunola</h1>
              <p className="text-primary-inverse px-10 text-2xl">Builder. Engineer. Developer</p>
            </div>
          </div>
        </div>
        <div className="bg-background min-h-screen w-full">
          <div className="container mx-auto flex h-screen snap-y snap-mandatory snap-start flex-col items-center space-y-20 py-20">
            <motion.div
              className="grid w-full grid-cols-2 gap-x-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-semibold">WORK HISTORY</h2>
              <p className="text-sm leading-relaxed text-neutral-600 lg:w-1/2">
                A journey through roles and experiences that shaped my expertise in building
                scalable solutions.
              </p>
            </motion.div>
            <div className="relative flex w-full flex-1 items-center justify-center">
              <motion.div
                className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
                key={activeYear}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-foreground text-[12rem] font-bold mix-blend-multiply">
                  {activeYear}
                </h3>
              </motion.div>
              <div className="grid h-full w-full grid-cols-12 gap-10" ref={ref}>
                <div className="sticky top-1/2 z-20 flex h-fit -translate-y-1/2 flex-col gap-y-20">
                  {timeline.map((year, index) => (
                    <motion.button
                      onClick={() => setActiveYear(year)}
                      className={cn(
                        "text-xs font-medium transition-all duration-300 hover:scale-110",
                        activeYear === year ? "text-primary scale-125" : "text-neutral-500",
                      )}
                      key={year}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      {year}
                    </motion.button>
                  ))}
                </div>
                <div className="relative z-20 col-span-11 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeYear}
                      className="w-full max-w-4xl"
                      initial={{ opacity: 0, y: 50, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -50, scale: 0.9 }}
                      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                    >
                      {historiesInActiveYear.workHistory.length > 0 ? (
                        <div className="space-y-8">
                          {historiesInActiveYear.workHistory.map((work, index) => (
                            <motion.div
                              key={`${work.name}-${work.start}`}
                              className="bg-background/80 rounded-lg border border-neutral-200 p-8 shadow-lg backdrop-blur-sm"
                              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.6,
                                delay: index * 0.05,
                                type: "spring",
                                stiffness: 80,
                              }}
                              whileHover={{
                                y: -5,
                                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                                transition: { duration: 0.2 },
                              }}
                            >
                              <div className="space-y-4">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <motion.h4
                                      className="text-foreground text-2xl font-bold"
                                      layoutId={`title-${work.name}`}
                                    >
                                      {work.role}
                                    </motion.h4>
                                    <motion.p
                                      className="text-primary text-lg font-medium"
                                      layoutId={`name-${work.name}`}
                                    >
                                      {work.name}
                                    </motion.p>
                                  </div>
                                  <motion.div
                                    className="text-right text-sm font-medium text-neutral-600"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                  >
                                    <p>{formatDate(work.start)}</p>
                                    {work.end ? <p>— {formatDate(work.end)}</p> : <p>Present</p>}
                                  </motion.div>
                                </div>
                                {work.description && (
                                  <motion.p
                                    className="leading-relaxed text-neutral-700"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                  >
                                    {work.description}
                                  </motion.p>
                                )}
                                {work.technologies && work.technologies.length > 0 && (
                                  <motion.div
                                    className="flex flex-wrap gap-2"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                  >
                                    {work.technologies.map((tech, techIndex) => (
                                      <motion.span
                                        key={tech}
                                        className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                          delay: 0.6 + techIndex * 0.05,
                                          type: "spring",
                                          stiffness: 150,
                                        }}
                                        whileHover={{ scale: 1.1 }}
                                      >
                                        {tech}
                                      </motion.span>
                                    ))}
                                  </motion.div>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <motion.div
                          className="py-20 text-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <motion.p
                            className="text-xl text-neutral-500 italic"
                            animate={{
                              opacity: [0.5, 1, 0.5],
                              scale: [0.98, 1, 0.98],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            No work history for {activeYear}
                          </motion.p>
                        </motion.div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto space-y-20 py-20">
            <motion.div
              className="grid w-full grid-cols-2 gap-x-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-semibold">PROJECTS</h2>
              <p className="text-sm leading-relaxed text-neutral-600 lg:w-1/2">
                A collection of applications and solutions I&apos;ve built
              </p>
            </motion.div>
            <div className="grid w-full grid-cols-2 gap-x-5 gap-y-10">
              {PROJECTS.map((project, index) => (
                <CardOne index={index} key={index} project={project} />
              ))}
            </div>
          </div>
          <div className="container mx-auto space-y-20 py-20">
            <motion.div
              className="grid w-full grid-cols-2 gap-x-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-semibold">WALL</h2>
              <p className="text-sm leading-relaxed text-neutral-600 lg:w-1/2">
                I like taking cool pictures of work, friends and family
              </p>
            </motion.div>
            <MasonryLayout breakpointCols={4}>
              {WALL.map((wall, index) => (
                <CardTwo key={index} wall={wall} />
              ))}
            </MasonryLayout>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;

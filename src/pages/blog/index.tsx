import React from "react";

import { Footer, Navbar, Seo } from "@/components/shared";

const Page = () => {
  return (
    <>
      <Seo title="Blog" />
      <Navbar />
      <div className="relative !z-[1] mb-[100vh] h-fit min-h-screen">
        <div className="bg-background relative grid h-screen w-full place-items-center py-20"></div>
      </div>
      <Footer />
    </>
  );
};

export default Page;

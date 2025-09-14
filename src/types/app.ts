export type ProjectProps = {
  name: string;
  image: string;
  url: string;
  color: string;
  type: string;
  year: string;
};

export type WallProps = {
  type: "image";
  image: string;
  alt: string;
};

export type WorkHistoryProps = {
  name: string;
  start: string;
  end: string;
  role: string;
  description: string;
  technologies: string[];
};

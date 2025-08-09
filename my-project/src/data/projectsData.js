// src/data/projectsData.js
import legaleaseImg from "./imgs/legalEase.png";
import contestTrackerImg from "./imgs/contest.png";
import portfolioImg from "./imgs/portfolio.png";
import geosentinelImg from "./imgs/geoSentinel.png";

export const projectsData = [
  {
    title: "LegalEase",
    url: "https://github.com/alstongit/LegalEase",
    tech: ["React", "Express", "Node.js", "ML", "BERT", "FASTAPI"],
    image: legaleaseImg,
    
  },
  {
    title: "Contest Tracker",
    url: "https://github.com/alstongit/Mern-ContestTracker",
    tech: ["React", "Tailwind CSS", "Shadcn", "Node.js", "Express", "MongoDB"],
    image: contestTrackerImg,
    
  },
  {
    title: "GeoSentinel",
    url: "https://geo-sentinel.vercel.app/",
    tech: ["React", "FastAPI", "Tailwind CSS", "ML"],
    image: geosentinelImg,
    
  },
];

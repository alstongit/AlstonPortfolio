// src/data/projectsData.js
import legaleaseImg from "./imgs/legalEase.webp";
import contestTrackerImg from "./imgs/contest.webp";
//import portfolioImg from "./imgs/portfolio.png";
import geosentinelImg from "./imgs/geosentinel.webp";

export const projectsData = [
  {
    title: "LegalEase",
    url: "https://github.com/alstongit/LegalEase",
    tech: ["React", "Express", "Node.js", "ML", "BERT", "FASTAPI", "PyTorch"],
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
    url: "https://geosentinel.live/",
    tech: ["React", "FastAPI", "Tailwind CSS", "ML","AWS", "PyTorch", "Three.js", ],
    image: geosentinelImg,
    
  },
];

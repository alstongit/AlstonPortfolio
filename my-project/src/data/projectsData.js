// src/data/projectsData.js
import legaleaseImg from "./imgs/legalEase.png";
import contestTrackerImg from "./imgs/contest.png";
import portfolioImg from "./imgs/portfolio.png";

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
    title: "Personal Portfolio",
    url: "https://github.com/alstongit/AlstonPortfolio",
    tech: ["React", "GSAP", "Tailwind CSS"],
    image: portfolioImg,
    
  },
];

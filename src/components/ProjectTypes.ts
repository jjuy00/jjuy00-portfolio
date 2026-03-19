export interface Project {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  tags: string[];
  link?: string;
  rx: number;
}

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Portfolio v1",
    shortDesc: "개인 포트폴리오 사이트",
    fullDesc:
      "React + TypeScript + Vite로 제작한 개인 포트폴리오 웹사이트입니다. 컴포넌트 분리, Canvas 애니메이션, Radix UI 등을 활용했습니다.",
    tags: ["React", "TypeScript", "Vite", "Radix UI"],
    // link: "https://github.com/jjuy00",
    rx: 0.18,
  },
  {
    id: "p2",
    title: "Coming Soon",
    shortDesc: "준비 중인 프로젝트",
    fullDesc: "곧 추가될 프로젝트입니다. 기대해주세요!",
    tags: [],
    rx: 0.4,
  },
  {
    id: "p3",
    title: "Coming Soon",
    shortDesc: "준비 중인 프로젝트",
    fullDesc: "곧 추가될 프로젝트입니다. 기대해주세요!",
    tags: [],
    rx: 0.63,
  },
  {
    id: "p4",
    title: "Coming Soon",
    shortDesc: "준비 중인 프로젝트",
    fullDesc: "곧 추가될 프로젝트입니다. 기대해주세요!",
    tags: [],
    rx: 0.84,
  },
];
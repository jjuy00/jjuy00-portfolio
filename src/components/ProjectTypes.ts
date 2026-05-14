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
    title: "맘대로",
    shortDesc: "비대면 심리 상담 플랫폼",
    fullDesc:
      "7인 팀 프로젝트로 개발한 비대면 심리 상담 플랫폼입니다. 상담 예약 페이지와 심리 자가검진 페이지의 UI 구현 및 REST API 연동을 담당했습니다.",
    tags: ["React", "JavaScript", "REST API"],
    link: "https://github.com/mam-daero/mamdaero",
    rx: 0.22,
  },
  {
    id: "p2",
    title: "SongPicker",
    shortDesc: "노래방 선곡 추천 서비스",
    fullDesc:
      "6인 팀 프로젝트로 개발한 노래방 선곡 추천 서비스입니다. 회원가입·로그인·그룹 관리 페이지 UI 및 API 연동을 담당했으며, 코사인 유사도와 차원 축소 기반의 콘텐츠 필터링 추천 알고리즘을 개발했습니다.",
    tags: ["React", "TypeScript", "Vite", "Python", "Django"],
    link: "https://github.com/SongPicker/SongPicker",
    rx: 0.5,
  },
  {
    id: "p3",
    title: "멍스팟",
    shortDesc: "반려견 산책 모임 플랫폼",
    fullDesc:
      "6인 팀 프로젝트로 개발한 반려견 산책 모임 플랫폼입니다. 회원가입·로그인 페이지 UI 및 API 연동을 담당했으며, 카카오맵 API를 활용해 산책 경로, 모임 장소 핀 마커, 장소 검색 기능을 구현했습니다.",
    tags: ["React", "JavaScript", "카카오맵 API"],
    link: "https://github.com/MeongSpot/MeongSpot",
    rx: 0.78,
  },
];
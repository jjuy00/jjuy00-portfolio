import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/jjuy00-portfolio/", // 레포 이름 그대로
  plugins: [react()],
});

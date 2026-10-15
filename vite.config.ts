// Vite-inställningar: alla HTML-sidor måste listas här för att komma med i bygget (Netlify)

import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        allProjects: "allProjects.html",
        allMembers: "allMembers.html",
        archives: "archives.html",
        project: "project.html",
      },
    },
  },
});

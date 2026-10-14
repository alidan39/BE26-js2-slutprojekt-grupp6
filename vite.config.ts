import { defineConfig } from "vite";

// Alla HTML-sidor måste listas här för att komma med i bygget (Netlify)
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

import { defineConfig } from "vite";
import { resolve } from "path";

// Alla HTML-sidor måste listas här för att komma med i bygget (Netlify)
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        allProjects: resolve(import.meta.dirname, "allProjects.html"),
        allMembers: resolve(import.meta.dirname, "allMembers.html"),
        archives: resolve(import.meta.dirname, "archives.html"),
        project: resolve(import.meta.dirname, "project.html"),
      },
    },
  },
});

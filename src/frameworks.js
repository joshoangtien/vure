const execSync = require("child_process").execSync;
const fs = require("fs");
const path = require("path");

const frameworks = {
  tailwind: {
    name: "Tailwind",
    setup: (directory, packageManager, selected) => {
      execSync(`${packageManager} add -D tailwindcss postcss autoprefixer`, {
        cwd: directory,
        stdio: "inherit",
      });

      execSync("npx --yes tailwindcss init -p", {
        cwd: directory,
        stdio: "inherit",
      });

      fs.writeFileSync(
        path.resolve(directory, "tailwind.config.js"),
        `module.exports = {\n  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],\n  theme: {\n    extend: {}\n  },\n  plugins: []\n};\n`
      );

      fs.writeFileSync(
        path.resolve(directory, "src/index.css"),
        `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`
      );
    },
  },
  "tailwind-cjs": {
    name: "Tailwind",
    setup: (directory, packageManager, selected) => {
      execSync(`${packageManager} add -D tailwindcss postcss autoprefixer`, {
        cwd: directory,
        stdio: "inherit",
      });

      execSync("npx --yes tailwindcss init -p", {
        cwd: directory,
        stdio: "inherit",
      });

      fs.renameSync(
        path.resolve(directory, "tailwind.config.js"),
        path.resolve(directory, "tailwind.config.cjs")
      );

      fs.renameSync(
        path.resolve(directory, "postcss.config.js"),
        path.resolve(directory, "postcss.config.cjs")
      );

      fs.writeFileSync(
        path.resolve(directory, "tailwind.config.cjs"),
        `module.exports = {\n  content: ["./index.html", "./src/**/*.{html,js,svelte,ts}"],\n  theme: {\n    extend: {}\n  },\n  plugins: []\n};\n`
      );

      fs.writeFileSync(
        path.resolve(directory, "src/index.css"),
        `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`
      );
    },
  },
  sass: {
    name: "SASS",
    setup: (directory, packageManager, selected) => {
      execSync(`${packageManager} add -D sass`, {
        cwd: directory,
        stdio: "inherit",
      });
    },
  },
  "react-router-dom": {
    name: "React Router Dom",
    setup: (directory, packageManager, selected) => {
      execSync(`${packageManager} add react-router-dom`, {
        cwd: directory,
        stdio: "inherit",
      });

      fs.writeFileSync(
        path.resolve(directory, "src/main.jsx"),
        `import App from "./App";\nimport { BrowserRouter } from "react-router-dom";\nimport ReactDOM from "react-dom/client";\nimport "./index.css";\n\nReactDOM.createRoot(document.getElementById("root")).render(\n  <BrowserRouter>\n    <App />\n  </BrowserRouter>\n);\n`
      );

      fs.writeFileSync(
        path.resolve(directory, "src/App.jsx"),
        `import { Route, Routes } from "react-router-dom";\n\nimport About from "./pages/About";\nimport Home from "./pages/Home";\n\nexport default function App() {\n  return (\n    <div>\n      <Routes>\n        <Route index element={<Home />}></Route>\n        <Route path="/about" element={<About />}></Route>\n      </Routes>\n      <p>Generated with vure</p>\n    </div>\n  );\n}\n`
      );

      fs.mkdirSync(path.resolve(directory, "src/pages"), {
        recursive: true,
      });

      fs.writeFileSync(
        path.resolve(directory, "src/pages/Home.jsx"),
        `import { Link } from "react-router-dom";\n\nexport default function Home() {\n  return (\n    <div>\n      <h1>Home</h1>\n      <Link to="/about">About</Link>\n    </div>\n  );\n}\n`
      );

      fs.writeFileSync(
        path.resolve(directory, "src/pages/About.jsx"),
        `import { Link } from "react-router-dom";\n\nexport default function About() {\n  return (\n    <div>\n      <h1>About</h1>\n      <Link to="/">Home</Link>\n    </div>\n  );\n}\n`
      );
    },
  },
  "react-router-dom-ts": {
    name: "React Router Dom",
    setup: (directory, packageManager, selected) => {
      execSync(`${packageManager} add react-router-dom@6`, {
        cwd: directory,
        stdio: "inherit",
      });

      fs.writeFileSync(
        path.resolve(directory, "src/main.tsx"),
        `import App from "./App";\nimport { BrowserRouter } from "react-router-dom";\nimport ReactDOM from "react-dom/client";\nimport "./index.css";\n\nReactDOM.createRoot(document.getElementById('root')!).render(\n  <BrowserRouter>\n    <App />\n  </BrowserRouter>\n)\n`
      );

      fs.writeFileSync(
        path.resolve(directory, "src/App.tsx"),
        `import { Route, Routes } from "react-router-dom";\n\nimport About from "./pages/About";\nimport Home from "./pages/Home";\n\nexport default function App() {\n  return (\n    <div>\n      <Routes>\n        <Route index element={<Home />}></Route>\n        <Route path="/about" element={<About />}></Route>\n      </Routes>\n      <p>Generated with vure</p>\n    </div>\n  );\n}\n`
      );

      fs.mkdirSync(path.resolve(directory, "src/pages"), {
        recursive: true,
      });

      fs.writeFileSync(
        path.resolve(directory, "src/pages/Home.tsx"),
        `import { FC } from "react";\nimport { Link } from "react-router-dom";\n\nconst Home: FC = () => {\n  return (\n    <div>\n      <h1>Home</h1>\n      <Link to="/about">About</Link>\n    </div>\n  );\n};\n\nexport default Home;\n`
      );

      fs.writeFileSync(
        path.resolve(directory, "src/pages/About.tsx"),
        `import { FC } from "react";\nimport { Link } from "react-router-dom";\n\nconst About: FC = () => {\n  return (\n    <div>\n      <h1>About</h1>\n      <Link to="/">Home</Link>\n    </div>\n  );\n};\n\nexport default About;\n`
      );
    },
  },
  "vue-router": {
    name: "Vue Router",
    setup: (directory, packageManager, selected) => {
      execSync(`${packageManager} add vue-router@4`, {
        cwd: directory,
        stdio: "inherit",
      });

      fs.mkdirSync(path.resolve(directory, "src/router"), { recursive: true });

      fs.writeFileSync(
        path.resolve(directory, "src/router/index.js"),
        `import { createRouter, createWebHistory } from "vue-router";\n\nimport Home from "../pages/Home.vue";\n\nconst routes = [\n  {\n    path: "/",\n    name: "home",\n    component: Home,\n  },\n  {\n    path: "/about",\n    name: "about",\n    // route level code-splitting\n    // this generates a separate chunk (about.[hash].js) for this route\n    // which is lazy-loaded when the route is visited.\n    component: () =>\n      import(/* webpackChunkName: "about" */ "../pages/About.vue"),\n  },\n];\n\nconst router = createRouter({\n  history: createWebHistory(),\n  routes,\n});\n\nexport default router;\n`
      );

      fs.writeFileSync(
        path.resolve(directory, "src/App.vue"),
        `<template>\n  <router-view />\n  <p>Generated with vure</p>\n</template>\n`
      );

      fs.mkdirSync(path.resolve(directory, "src/pages"), { recursive: true });

      fs.writeFileSync(
        path.resolve(directory, "src/pages/Home.vue"),
        `<template>\n  <h1>Home</h1>\n  <router-link to="/about">About</router-link>\n</template>\n`
      );

      fs.writeFileSync(
        path.resolve(directory, "src/pages/About.vue"),
        `<template>\n  <h1>About</h1>\n  <router-link to="/">Home</router-link>\n</template>\n`
      );

      fs.writeFileSync(
        path.resolve(directory, "src/main.js"),
        `import App from "./App.vue";\nimport { createApp } from "vue";\nimport router from "./router";\nimport "./index.css";\n\ncreateApp(App).use(router).mount("#app");\n`
      );
    },
  },
  "vue-router-ts": {
    name: "Vue Router",
    setup: (directory, packageManager, selected) => {
      execSync(`${packageManager} add vue-router@4`, {
        cwd: directory,
        stdio: "inherit",
      });

      fs.mkdirSync(path.resolve(directory, "src/router"), { recursive: true });

      fs.writeFileSync(
        path.resolve(directory, "src/router/index.ts"),
        `import { createRouter, createWebHistory } from "vue-router";\n\nimport Home from "../pages/Home.vue";\n\nconst routes = [\n  {\n    path: "/",\n    name: "home",\n    component: Home,\n  },\n  {\n    path: "/about",\n    name: "about",\n    // route level code-splitting\n    // this generates a separate chunk (about.[hash].js) for this route\n    // which is lazy-loaded when the route is visited.\n    component: () =>\n      import(/* webpackChunkName: "about" */ "../pages/About.vue"),\n  },\n];\n\nconst router = createRouter({\n  history: createWebHistory(),\n  routes,\n});\n\nexport default router;\n`
      );

      fs.writeFileSync(
        path.resolve(directory, "src/App.vue"),
        `<template>\n  <router-view />\n  <p>Generated with vure</p>\n</template>\n`
      );

      fs.mkdirSync(path.resolve(directory, "src/pages"), { recursive: true });

      fs.writeFileSync(
        path.resolve(directory, "src/pages/Home.vue"),
        `<template>\n  <h1>Home</h1>\n  <router-link to="/about">About</router-link>\n</template>\n`
      );

      fs.writeFileSync(
        path.resolve(directory, "src/pages/About.vue"),
        `<template>\n  <h1>About</h1>\n  <router-link to="/">Home</router-link>\n</template>\n`
      );

      fs.writeFileSync(
        path.resolve(directory, "src/main.ts"),
        `import App from "./App.vue";\nimport { createApp } from "vue";\nimport router from "./router";\nimport "./index.css";\n\ncreateApp(App).use(router).mount("#app");\n`
      );
    },
  },
  "svelte-navigator": {
    name: "Svelte Navigator",
    setup: (directory, packageManager, selected) => {
      execSync(`${packageManager} add svelte-navigator@3`, {
        cwd: directory,
        stdio: "inherit",
      });

      fs.writeFileSync(
        path.resolve(directory, "src/App.svelte"),
        `\x3Cscript>\n  import { Router, Route } from "svelte-navigator";\n  import About from "./pages/About.svelte";\n  import Home from "./pages/Home.svelte";\n\x3C/script>\n\n<div>\n  <Router>\n    <Route path="/" component={Home} />\n    <Route path="/about" component={About} />\n  </Router>\n  <p>Generated with vure</p>\n</div>\n`
      );

      fs.mkdirSync(path.resolve(directory, "src/pages"), { recursive: true });

      fs.writeFileSync(
        path.resolve(directory, "src/pages/Home.svelte"),
        `\x3Cscript>\n  import { Link } from "svelte-navigator";\n\x3C/script>\n\n<h1>Home</h1>\n<Link to="/about">About</Link>\n`
      );

      fs.writeFileSync(
        path.resolve(directory, "src/pages/About.svelte"),
        `\x3Cscript>\n  import { Link } from "svelte-navigator";\n\x3C/script>\n\n<h1>About</h1>\n<Link to="/">Home</Link>\n`
      );
    },
  },
  "eslint-react": {
    name: "ESLint",
    setup: (directory, packageManager, selected) => {
      if (!selected.includes("prettier-react")) {
        execSync(`${packageManager} add -D eslint-config-react-app`, {
          cwd: directory,
          stdio: "inherit",
        });

        fs.writeFileSync(
          path.resolve(directory, ".eslintrc.json"),
          `{\n  "extends": ["react-app"]\n}\n`
        );
      } else {
        execSync(
          `${packageManager} add -D eslint-config-react-app eslint-config-prettier eslint-plugin-prettier`,
          {
            cwd: directory,
            stdio: "inherit",
          }
        );

        fs.writeFileSync(
          path.resolve(directory, ".eslintrc.json"),
          `{\n  "extends": ["react-app", "prettier"]\n}\n`
        );
      }
    },
  },
  "eslint-vue": {
    name: "ESLint",
    setup: (directory, packageManager, selected) => {
      if (!selected.includes("prettier-vue")) {
        execSync(`${packageManager} add -D eslint-plugin-vue`, {
          cwd: directory,
          stdio: "inherit",
        });

        fs.writeFileSync(
          path.resolve(directory, ".eslintrc.json"),
          `{\n  "extends": ["plugin:vue/vue3-recommended"]\n}\n`
        );
      } else {
        execSync(
          `${packageManager} add -D eslint-plugin-vue eslint-config-prettier eslint-plugin-prettier`,
          {
            cwd: directory,
            stdio: "inherit",
          }
        );

        fs.writeFileSync(
          path.resolve(directory, ".eslintrc.json"),
          `{\n  "extends": ["plugin:vue/vue3-recommended", "prettier"]\n}\n`
        );
      }
    },
  },
  "eslint-svelte": {
    name: "ESLint",
    setup: (directory, packageManager, selected) => {
      execSync(`${packageManager} add -D eslint-plugin-svelte3`, {
        cwd: directory,
        stdio: "inherit",
      });

      fs.writeFileSync(
        path.resolve(directory, ".eslintrc.json"),
        `{\n  "parserOptions": {\n    "ecmaVersion": 6,\n    "sourceType": "module"\n  },\n  "env": {\n    "es6": true,\n    "browser": true\n  },\n  "plugins": ["svelte3"],\n  "overrides": [\n    {\n      "files": ["*.svelte"],\n      "processor": "svelte3/svelte3"\n    }\n  ]\n}\n`
      );
    },
  },
  "eslint-svelte-ts": {
    name: "ESLint",
    setup: (directory, packageManager, selected) => {
      execSync(
        `${packageManager} add -D eslint-plugin-svelte3 @typescript-eslint/parser @typescript-eslint/eslint-plugin`,
        {
          cwd: directory,
          stdio: "inherit",
        }
      );

      fs.writeFileSync(
        path.resolve(directory, ".eslintrc.json"),
        `{\n  "parser": "@typescript-eslint/parser",\n  "plugins": ["svelte3", "@typescript-eslint"],\n  "overrides": [\n    {\n      "files": ["*.svelte"],\n      "processor": "svelte3/svelte3"\n    }\n  ],\n  "settings": {\n    "svelte3/typescript": true\n  }\n}\n`
      );
    },
  },
  "prettier-react": {
    name: "Prettier",
    setup: (directory, packageManager, selected) => {
      fs.writeFileSync(
        path.resolve(directory, ".prettierrc"),
        `{\n  "semi": true,\n  "tabWidth": 2,\n  "printWidth": 100,\n  "singleQuote": false,\n  "trailingComma": "all",\n  "jsxBracketSameLine": true\n}\n`
      );
    },
  },
  "prettier-vue": {
    name: "Prettier",
    setup: (directory, packageManager, selected) => {
      fs.writeFileSync(
        path.resolve(directory, ".prettierrc"),
        `{\n  "semi": true,\n  "tabWidth": 2,\n  "printWidth": 100,\n  "singleQuote": false,\n  "trailingComma": "all",\n  "jsxBracketSameLine": true\n}\n`
      );
    },
  },
  "vitest-react": {
    name: "Testing (Vitest)",
    setup: (directory, packageManager, selected) => {
      execSync(
        `${packageManager} add -D @testing-library/jest-dom @testing-library/react @testing-library/react-hooks @testing-library/user-event vitest jsdom`,
        {
          cwd: directory,
          stdio: "inherit",
        }
      );

      fs.writeFileSync(
        path.resolve(directory, "vite.config.js"),
        `import { defineConfig } from "vite";\nimport react from "@vitejs/plugin-react";\n\n// https://vitejs.dev/config/\nexport default defineConfig({\n  plugins: [react()],\n  test: {\n    globals: true,\n    environment: "jsdom",\n    setupFiles: "./src/test/setup.js",\n  },\n});\n`
      );

      fs.mkdirSync(path.resolve(directory, "src/test"), { recursive: true });

      fs.writeFileSync(
        path.resolve(directory, "src/test/setup.js"),
        `import "@testing-library/jest-dom";\n`
      );

      fs.writeFileSync(
        path.resolve(directory, "src/test/App.test.jsx"),
        selected.includes("react-router-dom")
          ? `import { describe, expect, it } from "vitest";\nimport { render, screen } from "@testing-library/react";\n\nimport App from "../App";\nimport { BrowserRouter } from "react-router-dom";\n\ndescribe("Working test", () => {\n  it("The title is visible", () => {\n    render(\n      <BrowserRouter>\n        <App />\n      </BrowserRouter>,\n    );\n    expect(screen.getByText(/generated with vure/i)).toBeInTheDocument();\n  });\n});\n`
          : `import { describe, expect, it } from "vitest";\nimport { render, screen } from "@testing-library/react";\n\nimport App from "../App";\n\ndescribe("Working test", () => {\n  it("The title is visible", () => {\n    render(<App />);\n    expect(screen.getByText(/generated with vure/i)).toBeInTheDocument();\n  });\n});\n`
      );

      const packageJSON = JSON.parse(
        fs.readFileSync(path.resolve(directory, "package.json"), {
          encoding: "utf-8",
        })
      );
      packageJSON.scripts.test = "vitest run";

      fs.writeFileSync(
        path.resolve(directory, "package.json"),
        JSON.stringify(packageJSON, null, 2)
      );
    },
  },
  "vitest-react-ts": {
    name: "Testing (Vitest)",
    setup: (directory, packageManager, selected) => {
      execSync(
        `${packageManager} add -D @testing-library/jest-dom @testing-library/react @testing-library/react-hooks @testing-library/user-event vitest jsdom`,
        {
          cwd: directory,
          stdio: "inherit",
        }
      );

      fs.writeFileSync(
        path.resolve(directory, "vite.config.ts"),
        `import { defineConfig } from "vite";\nimport react from "@vitejs/plugin-react";\n\n// https://vitejs.dev/config/\nexport default defineConfig({\n  plugins: [react()],\n  ["test" as any]: {\n    globals: true,\n    environment: "jsdom",\n    setupFiles: "./src/test/setup.ts",\n  },\n});\n`
      );

      fs.mkdirSync(path.resolve(directory, "src/test"), { recursive: true });

      fs.writeFileSync(
        path.resolve(directory, "src/test/setup.ts"),
        `import "@testing-library/jest-dom";\n`
      );

      fs.writeFileSync(
        path.resolve(directory, "src/test/App.test.tsx"),
        selected.includes("react-router-dom-ts")
          ? `import { describe, expect, it } from "vitest";\nimport { render, screen } from "@testing-library/react";\n\nimport App from "../App";\nimport { BrowserRouter } from "react-router-dom";\n\ndescribe("Working test", () => {\n  it("The title is visible", () => {\n    render(\n      <BrowserRouter>\n        <App />\n      </BrowserRouter>,\n    );\n    expect(screen.getByText(/generated with vure/i)).toBeInTheDocument();\n  });\n});\n`
          : `import { describe, expect, it } from "vitest";\nimport { render, screen } from "@testing-library/react";\n\nimport App from "../App";\n\ndescribe("Working test", () => {\n  it("The title is visible", () => {\n    render(<App />);\n    expect(screen.getByText(/generated with vure/i)).toBeInTheDocument();\n  });\n});\n`
      );

      const packageJSON = JSON.parse(
        fs.readFileSync(path.resolve(directory, "package.json"), {
          encoding: "utf-8",
        })
      );
      packageJSON.scripts.test = "vitest run";

      fs.writeFileSync(
        path.resolve(directory, "package.json"),
        JSON.stringify(packageJSON, null, 2)
      );
    },
  },
  "vitest-vue": {
    name: "Testing (Vitest)",
    setup: (directory, packageManager, selected) => {
      execSync(`${packageManager} add -D vitest @vue/test-utils jsdom`, {
        cwd: directory,
        stdio: "inherit",
      });

      fs.writeFileSync(
        path.resolve(directory, "vite.config.js"),
        `import { defineConfig } from "vite";\nimport vue from "@vitejs/plugin-vue";\n\n// https://vitejs.dev/config/\nexport default defineConfig({\n  plugins: [vue()],\n  test: {\n    globals: true,\n    environment: "jsdom",\n  },\n});\n`
      );

      fs.mkdirSync(path.resolve(directory, "src/test"), { recursive: true });

      fs.writeFileSync(
        path.resolve(directory, "src/test/App.test.js"),
        selected.includes("vue-router")
          ? `import App from "../App.vue";\nimport { mount } from "@vue/test-utils";\nimport router from "../router";\n\ntest("The title is visible", async () => {\n  expect(App).toBeTruthy();\n\n  const wrapper = mount(App, { global: { plugins: [router] } });\n\n  expect(wrapper.text()).toContain("Generated with vure");\n});\n`
          : `import App from "../App.vue";\nimport { mount } from "@vue/test-utils";\n\ntest("The title is visible", async () => {\n  expect(App).toBeTruthy();\n\n  const wrapper = mount(App);\n\n  expect(wrapper.text()).toContain("Generated with vure");\n});\n`
      );

      const packageJSON = JSON.parse(
        fs.readFileSync(path.resolve(directory, "package.json"), {
          encoding: "utf-8",
        })
      );
      packageJSON.scripts.test = "vitest run";

      fs.writeFileSync(
        path.resolve(directory, "package.json"),
        JSON.stringify(packageJSON, null, 2)
      );
    },
  },
  "vitest-vue-ts": {
    name: "Testing (Vitest)",
    setup: (directory, packageManager, selected) => {
      execSync(`${packageManager} add -D vitest @vue/test-utils jsdom`, {
        cwd: directory,
        stdio: "inherit",
      });

      fs.writeFileSync(
        path.resolve(directory, "vite.config.ts"),
        `import { defineConfig } from "vite";\nimport vue from "@vitejs/plugin-vue";\n\n// https://vitejs.dev/config/\nexport default defineConfig({\n  plugins: [vue()],\n  ["test" as any]: {\n    globals: true,\n    environment: "jsdom",\n  },\n});\n`
      );

      fs.mkdirSync(path.resolve(directory, "src/test"), { recursive: true });

      fs.writeFileSync(
        path.resolve(directory, "src/test/App.test.ts"),
        selected.includes("vue-router-ts")
          ? `import App from "../App.vue";\nimport { mount } from "@vue/test-utils";\nimport router from "../router";\n\ntest("The title is visible", async () => {\n  expect(App).toBeTruthy();\n\n  const wrapper = mount(App, { global: { plugins: [router] } });\n\n  expect(wrapper.text()).toContain("Generated with vure");\n});\n`
          : `import App from "../App.vue";\nimport { mount } from "@vue/test-utils";\n\ntest("The title is visible", async () => {\n  expect(App).toBeTruthy();\n\n  const wrapper = mount(App);\n\n  expect(wrapper.text()).toContain("Generated with vure");\n});\n`
      );

      const packageJSON = JSON.parse(
        fs.readFileSync(path.resolve(directory, "package.json"), {
          encoding: "utf-8",
        })
      );
      packageJSON.scripts.test = "vitest run";

      fs.writeFileSync(
        path.resolve(directory, "package.json"),
        JSON.stringify(packageJSON, null, 2)
      );
    },
  },
  "vitest-svelte": {
    name: "Testing (Vitest)",
    setup: (directory, packageManager, selected) => {
      execSync(
        `${packageManager} add -D vitest @testing-library/svelte jsdom`,
        {
          cwd: directory,
          stdio: "inherit",
        }
      );

      fs.writeFileSync(
        path.resolve(directory, "vite.config.js"),
        `import { defineConfig } from "vite";\nimport { svelte } from "@sveltejs/vite-plugin-svelte";\n\nexport default defineConfig({\n  plugins: [svelte({ hot: !process.env.VITEST })],\n  test: {\n    globals: true,\n    environment: "jsdom",\n  },\n});\n`
      );

      fs.mkdirSync(path.resolve(directory, "src/test"), { recursive: true });

      fs.writeFileSync(
        path.resolve(directory, "src/test/App.test.js"),
        `import { cleanup, render } from "@testing-library/svelte";\n\nimport App from "../App.svelte";\n\ndescribe("Working Test", () => {\n  afterEach(() => cleanup());\n\n  it("The title is visible", () => {\n    const { container } = render(App);\n    expect(container).toBeTruthy();\n    expect(container.innerHTML).toContain("Generated with vure");\n  });\n});\n`
      );

      const packageJSON = JSON.parse(
        fs.readFileSync(path.resolve(directory, "package.json"), {
          encoding: "utf-8",
        })
      );
      packageJSON.scripts.test = "vitest run";

      fs.writeFileSync(
        path.resolve(directory, "package.json"),
        JSON.stringify(packageJSON, null, 2)
      );
    },
  },
  "vitest-svelte-ts": {
    name: "Testing (Vitest)",
    setup: (directory, packageManager, selected) => {
      execSync(
        `${packageManager} add -D vitest @testing-library/svelte jsdom`,
        {
          cwd: directory,
          stdio: "inherit",
        }
      );

      fs.writeFileSync(
        path.resolve(directory, "vite.config.ts"),
        `import { defineConfig } from "vite";\nimport { svelte } from "@sveltejs/vite-plugin-svelte";\n\nexport default defineConfig({\n  plugins: [svelte({ hot: !process.env.VITEST })],\n  ["test" as any]: {\n    globals: true,\n    environment: "jsdom",\n  },\n});\n`
      );

      fs.mkdirSync(path.resolve(directory, "src/test"), { recursive: true });

      fs.writeFileSync(
        path.resolve(directory, "src/test/App.test.ts"),
        `import { cleanup, render } from "@testing-library/svelte";\n\nimport App from "../App.svelte";\n\ndescribe("Working Test", () => {\n  afterEach(() => cleanup());\n\n  it("The title is visible", () => {\n    const { container } = render(App);\n    expect(container).toBeTruthy();\n    expect(container.innerHTML).toContain("Generated with vure");\n  });\n});\n`
      );

      const packageJSON = JSON.parse(
        fs.readFileSync(path.resolve(directory, "package.json"), {
          encoding: "utf-8",
        })
      );
      packageJSON.scripts.test = "vitest run";

      fs.writeFileSync(
        path.resolve(directory, "package.json"),
        JSON.stringify(packageJSON, null, 2)
      );
    },
  },
};

module.exports = frameworks;

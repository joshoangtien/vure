const fs = require("fs");
const path = require("path");

const updateFiles = (directory, files) => {
  files.remove.forEach((file) => {
    fs.rmSync(path.resolve(directory, file), {
      recursive: true,
      force: true,
    });
  });

  Object.entries(files.write).map(([key, value]) =>
    fs.writeFileSync(path.resolve(directory, key), value, { encoding: "utf-8" })
  );
};

const templates = {
  react: {
    name: "React",
    initial: (directory) => {
      updateFiles(directory, {
        remove: ["src/App.css", "src/favicon.svg", "src/logo.svg"],
        write: {
          "src/App.jsx": `import { useState } from "react";\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setCount(count + 1)}>Increase: {count}</button>\n      <p>Generated with vure</p>\n    </div>\n  );\n}\n`,
          "index.html": `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>Vite App</title>\n  </head>\n  <body>\n    <div id="root"></div>\n    \x3Cscript type="module" src="/src/main.jsx">\x3C/script>\n  </body>\n</html>\n`,
          "src/index.css":
            "body {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}",
        },
      });
    },
    allowed: [
      "tailwind",
      "sass",
      "react-router-dom",
      "eslint-react",
      "prettier-react",
      "vitest-react",
    ],
  },
  "react-ts": {
    name: "React Typescript",
    initial: (directory) => {
      updateFiles(directory, {
        remove: ["src/App.css", "src/favicon.svg", "src/logo.svg"],
        write: {
          "src/App.tsx": `import { FC, useState } from "react";\n\nconst App: FC = () => {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <button onClick={() => setCount(count + 1)}>Increase: {count}</button>\n      <p>Generated with vure</p>\n    </div>\n  );\n};\n\nexport default App;\n`,
          "index.html": `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>Vite App</title>\n  </head>\n  <body>\n    <div id="root"></div>\n    \x3Cscript type="module" src="/src/main.tsx">\x3C/script>\n  </body>\n</html>\n`,
          "src/index.css":
            "body {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}",
        },
      });
    },
    allowed: [
      "tailwind",
      "sass",
      "react-router-dom-ts",
      "eslint-react",
      "prettier-react",
      "vitest-react-ts",
    ],
  },
  vue: {
    name: "Vue",
    initial: (directory) => {
      updateFiles(directory, {
        remove: ["public", "src/assets", "src/components"],
        write: {
          "src/App.vue": `\x3Cscript setup>\nimport { ref } from "vue";\n\nconst count = ref(0);\n\x3C/script>\n\n<template>\n  <div>\n    <button @click="count++">Increase: {{ count }}</button>\n    <p>Generated with vure</p>\n  </div>\n</template>\n`,
          "index.html": `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>Vite App</title>\n  </head>\n  <body>\n    <div id="app"></div>\n    \x3Cscript type="module" src="/src/main.js">\x3C/script>\n  </body>\n</html>\n`,
          "src/index.css":
            "body {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}",
          "src/main.js": `import App from "./App.vue";\nimport { createApp } from "vue";\nimport "./index.css";\n\ncreateApp(App).mount("#app");\n`,
        },
      });
    },
    allowed: [
      "tailwind",
      "sass",
      "vue-router",
      "eslint-vue",
      "prettier-vue",
      "vitest-vue",
    ],
  },
  "vue-ts": {
    name: "Vue Typescript",
    initial: (directory) => {
      updateFiles(directory, {
        remove: ["public", "src/assets", "src/components"],
        write: {
          "src/App.vue": `\x3Cscript setup lang="ts">\nimport { ref } from "vue";\n\nconst count = ref(0);\n\x3C/script>\n\n<template>\n  <div>\n    <button @click="count++">Increase: {{ count }}</button>\n    <p>Generated with vure</p>\n  </div>\n</template>\n`,
          "index.html": `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>Vite App</title>\n  </head>\n  <body>\n    <div id="app"></div>\n    \x3Cscript type="module" src="/src/main.ts">\x3C/script>\n  </body>\n</html>\n`,
          "src/index.css":
            "body {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}",
          "src/main.ts": `import App from "./App.vue";\nimport { createApp } from "vue";\nimport "./index.css";\n\ncreateApp(App).mount("#app");\n`,
        },
      });
    },
    allowed: [
      "tailwind",
      "sass",
      "vue-router-ts",
      "eslint-vue",
      "prettier-vue",
      "vitest-vue-ts",
    ],
  },
  svelte: {
    name: "Svelte",
    initial: (directory) => {
      updateFiles(directory, {
        remove: ["public", "src/assets", "src/lib"],
        write: {
          "src/App.svelte": `\x3Cscript>\n  let count = 0;\n\x3C/script>\n\n<div>\n  <button on:click={() => count++}>Increase: {count}</button>\n  <p>Generated with vure</p>\n</div>\n`,
          "index.html": `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>Vite App</title>\n  </head>\n  <body>\n    <div id="app"></div>\n    \x3Cscript type="module" src="/src/main.js">\x3C/script>\n  </body>\n</html>\n`,
          "src/index.css":
            "body {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}",
          "src/main.js": `import App from "./App.svelte";\nimport "./index.css";\n\nconst app = new App({\n  target: document.getElementById("app"),\n});\n\nexport default app;\n`,
        },
      });
    },
    allowed: [
      "tailwind-cjs",
      "sass",
      "svelte-navigator",
      "eslint-svelte",
      "vitest-svelte",
    ],
  },
  "svelte-ts": {
    name: "Svelte Typescript",
    initial: (directory) => {
      updateFiles(directory, {
        remove: ["public", "src/assets", "src/lib"],
        write: {
          "src/App.svelte": `\x3Cscript lang="ts">\n  let count = 0;\n\x3C/script>\n\n<div>\n  <button on:click={() => count++}>Increase: {count}</button>\n  <p>Generated with vure</p>\n</div>\n`,
          "index.html": `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>Vite App</title>\n  </head>\n  <body>\n    <div id="app"></div>\n    \x3Cscript type="module" src="/src/main.ts">\x3C/script>\n  </body>\n</html>\n`,
          "src/index.css":
            "body {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}",
          "src/main.ts": `import App from "./App.svelte";\nimport "./index.css";\n\nconst app = new App({\n  target: document.getElementById("app"),\n});\n\nexport default app;\n`,
        },
      });
    },
    allowed: [
      "tailwind-cjs",
      "sass",
      "svelte-navigator",
      "eslint-svelte-ts",
      "vitest-svelte-ts",
    ],
  },
};

module.exports = templates;

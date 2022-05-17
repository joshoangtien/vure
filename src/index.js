#! /usr/bin/env node

const { program } = require("commander");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const degit = require("degit");
const kebabCase = require("lodash.kebabcase");
const execSync = require("child_process").execSync;
const templates = require("./templates");
const frameworks = require("./frameworks");
const { templateNotes, frameworkNotes } = require("./notes");

program.option("-t, --template <template>", "Specify the template");
program.option("--with-yarn", "Use yarn to install packages");

program.parse();

const options = program.opts();

let name = program.args[0];

let template =
  options.template in templates ? templates[options.template].name : null;

const packageManager =
  options.withYarn || process?.env?.npm_config_user_agent?.startsWith("yarn")
    ? "yarn"
    : "npm";

(async () => {
  if (!name) {
    name = (
      await inquirer.prompt({
        type: "input",
        message: "What's the name of your app?",
        default: "my-app",
        name: "name",
      })
    ).name;
  }

  const directory = path.resolve(process.cwd(), name);

  if (fs.existsSync(directory) && fs.readdirSync(directory).length > 0) {
    console.log(`⚙️ ${directory}`);
    const { willRemoveFiles } = await inquirer.prompt({
      type: "confirm",
      name: "willRemoveFiles",
      message: "Directory is not empty. Remove existing files and continue?",
      initial: true,
    });

    if (willRemoveFiles) {
      fs.rmSync(directory, { recursive: true, force: true });
      fs.mkdirSync(directory);
    } else {
      process.exit(1);
    }
  }

  if (!template) {
    template = (
      await inquirer.prompt({
        type: "list",
        name: "template",
        message: "Choose a template",
        choices: Object.values(templates).map((temp) => temp.name),
      })
    ).template;
  }

  const templateId = Object.entries(templates).find(
    ([key, value]) => value.name === template
  )[0];

  const { frameworks: selectedFrameworks } = await inquirer.prompt({
    type: "checkbox",
    name: "frameworks",
    message: "Choose the framework / tool that you need",
    choices: templates[templateId].allowed.map((item) => ({
      name: frameworks[item].name,
      value: item,
    })),
  });

  const emitter = degit(
    `vitejs/vite/packages/create-vite/template-${templateId}`,
    {
      cache: false,
      force: true,
      verbose: true,
      mode: "tar",
    }
  );

  await emitter.clone(directory);

  fs.renameSync(
    path.resolve(directory, "_gitignore"),
    path.resolve(directory, ".gitignore")
  );

  const packageJSON = JSON.parse(
    fs.readFileSync(path.resolve(directory, "package.json"), {
      encoding: "utf-8",
    })
  );

  packageJSON.name = kebabCase(directory.split("/").slice(-1)[0]);

  fs.writeFileSync(
    path.resolve(directory, "package.json"),
    JSON.stringify(packageJSON, null, 2),
    { encoding: "utf-8" }
  );

  templates[templateId].initial(directory);

  execSync(`${packageManager} install`, { cwd: directory, stdio: "inherit" });

  Object.entries(frameworks).forEach(([frameworkId, framework]) => {
    if (selectedFrameworks.includes(frameworkId)) {
      framework.setup(directory, packageManager, selectedFrameworks);
    }
  });

  console.log(`\n🎉 Successfully created your project!\n`);

  if (
    templateId in templateNotes ||
    selectedFrameworks.some((item) => item in frameworkNotes)
  )
    console.log(`🚀 Important note:`);

  if (templateId in templateNotes)
    console.log(`👉 ${templateNotes[templateId]}`);

  selectedFrameworks.forEach(
    (item) =>
      item in frameworkNotes && console.log(`👉 ${frameworkNotes[item]}`)
  );
})();

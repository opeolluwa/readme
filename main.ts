import { existsSync } from "https://deno.land/std@0.197.0/fs/mod.ts";
import { Command } from "npm:commander@11";
import { join } from "node:path";

const program = new Command();

program
  .name("readme")
  .description("Create a README.md boilerplate for your project")
  .version("23.08") // august 2023
  .option("-f, --force", "overwrite existing README")
  .option("-b, --backup", "Backup existing README")
  .option("-p, --path <string>", "Path to save the generated README")
  .option("-t, --title <string>", "The project title")
  .option("-d, --description <string>", "The project description");

if (import.meta.main) {
  program.parse();
  const options = program.opts();
  const path = options?.path ? join(options.path, "README.md") : "./README.md";

  // overwrite existing readme
  if (readmeExists(path) && options.backup) {
    await Deno.rename(join(path), join(options?.path, "README.md.bak"));
    await generateReadme(options.title, options.description);
  } else if (options.force && readmeExists(path)) {
    Deno.removeSync("./README.md");
    await generateReadme(options.title, options.description);
  } else if (options.force && !readmeExists) {
    await generateReadme(options.title, options.description);
  } else if (readmeExists(path)) {
    console.log("%cREADME already exist ❌", "color:#FFCCCC");
    Deno.exit(1); // quit the program if readme exists
  } else {
    await generateReadme(options.title, options.description, path);
  }
}

async function generateReadme(
  title = "Project Title",
  description = "Simple overview of use/purpose.",
  path = "./README.md",
) {
  // create the readme otherwise
  await Deno.writeTextFile(
    path,
    `# ${
      title.replace(/(^\w{1})|(\s+\w{1})/g, (letter: string) =>
        letter.toUpperCase())
    }

${description}

- [Description](#description)
- [Getting Started](#getting-started)
  - [Dependencies](#dependencies)
  - [Installing](#installing)
  - [Executing program](#executing-program)
- [Documentation](#documentation)
- [Help](#help)
- [Authors](#authors)
- [Version History](#version-history)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Description

An in-depth paragraph about your project and overview of use.

## Getting Started

### Dependencies

- Describe any prerequisites, libraries, OS version, etc., needed before installing program.
- ex. Windows 10

### Installing

- How/where to download your program
- Any modifications needed to be made to files/folders

### Executing program

- How to run the program
- Step-by-step bullets

\`\`\`
code blocks for commands
\`\`\`

## Documentation

Describe any special instructions that are necessary to install a software package on your computer (if applicable).

## Help

Any advise for common problems or issues.

\`\`\`
command to run if program contains helper info
\`\`\`

## Authors

Contributors names and contact info

ex. Dominique Pizzie  
ex. [@DomPizzie](https://twitter.com/dompizzie)

## Version History

- 0.2
  - Various bug fixes and optimizations
  - See [commit change]() or See [release history]()
- 0.1
  - Initial Release

## License

This project is licensed under the [NAME HERE] License - see the LICENSE.md file for details

## Acknowledgments

Inspiration, code snippets, etc.
`,
  );
  console.log("%cREADME successfully added ✅", "color:#E6FFCC");
}

// see if the file already in the provided directory
function readmeExists(path: string): boolean {
  const fileExistInPath = existsSync(path.trim(), {
    isReadable: true,
    isFile: true,
  });

  return fileExistInPath;
}

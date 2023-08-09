import { existsSync } from "https://deno.land/std@0.197.0/fs/mod.ts";
import { Command } from "npm:commander@11";

const program = new Command();

program
  .name("readme")
  .description("Create a README.md boilerplate for your project")
  .version("0.1.0");

program
  .command("new")
  .description("create a new readme")
  .argument("<string>", "the project title")
  .action(async (title: string = "Project Title") => {
    const readmeExists: boolean = existsSync("README.md", {
      isReadable: true,
      isFile: true,
    });
    if (readmeExists) {
      console.log("%cREADME already exist ❌", "color:#FFCCCC");
    } else {
      // create the readme otherwise
      await Deno.writeTextFile(
        "./README.md",
        `# ${title.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
          letter.toUpperCase()
        )}

A Quick description of the project

- [Description](#description)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Support](#support)
- [Documentation](#documentation)
- [License](#license)

## Getting Started

To get started, clone the project and install the dependencies.

## Prerequisites

To run the application in a development environment, you'll need the following prerequisites:

- [List of prerequisites here, such as programming languages, frameworks, libraries, and tools]
- [Any specific version requirements]
- [Any external services or dependencies]

Make sure you have these prerequisites installed and set up before proceeding with the installation and usage of the application.

## Installation

Instructions on how to install and set up the project for deployment

## Usage

Information on various available commands

## Support

Information on how to get help and support for the project, including contact details for your company's support team.

## Documentation

Information on the software design, API documentation, etc

## License

The License and the License' limitation`
      );
      console.log("%cREADME successfully added ✅", "color:#E6FFCC");
    }
  });

if (import.meta.main) {
  program.parse();
}

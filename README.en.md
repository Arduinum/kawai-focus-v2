# Kawai-Focus
A focus app based on the Pomodoro technique.

The project is currently at the MVP1 development stage:

- **Pomodoro** — timers for the Pomodoro technique to manage your work sessions and rest breaks;
- **Guide** — information on how to use the timers and the app, as well as details about the Pomodoro technique itself;
- **App Limiter** — block or limit distracting applications during your work blocks.

## Tech Stack

- **Vue.js** — handles the user interface and SQLite operations (frontend);
- **Ionic** — provides native UI components and the mobile version;
- **Tauri** — the engine powering the desktop version of the application.

## Author

**Project Developer:**
- **Name and Surname** — Eugene Kaddo
- **Nickname** — Arduinum628

I share detailed insights about the app's development process in my articles on [Kawai-Focus](https://pressanybutton.ru/category/kawai-focus/) at the website [Kod on napkin](https://pressanybutton.ru).

<details>
<summary><strong>Branch and Commit Naming Conventions</strong></summary>

Branch example: `nickname/name_task`
- **nickname** — your GitHub username;
- **name_task** — task name (matches the card title on YouGile).

Commit example: `refactor: renaming a variable`
- **feat:** — a new feature for the application code (excluding build configurations);
- **devops:** — build configuration changes (adding, removing, or fixing configurations);
- **fix:** — a bug fix in the application code;
- **docs:** — documentation changes only;
- **style:** — changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.);
- **refactor:** — a code change that neither fixes a bug nor adds a feature (e.g., renaming a variable);
- **test:** — adding missing tests or correcting existing tests;
- **chore:** — changes to the build process or auxiliary tools and libraries such as documentation generation.

Conventions are based on [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
</details>

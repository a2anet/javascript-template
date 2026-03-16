# JavaScript Template

A2A Net's template for JavaScript/TypeScript projects that use [Cursor](https://cursor.com/en)/[VSCode](https://code.visualstudio.com/) and [Claude Code](https://code.claude.com/docs/en/overview).
Uses [Bun](https://bun.sh/), [Biome](https://biomejs.dev/), and [TypeScript](https://www.typescriptlang.org/).

## Prerequisites

- [Bun](https://bun.sh/) installed

### Cursor

- [Cursor](https://cursor.com/en)
- Biome

### VSCode

- [VSCode](https://code.visualstudio.com/)
- [Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)

### Claude Code

- [Claude Code](https://code.claude.com/docs/en/overview)

## Basic Set Up

1. Initialise Bun

```bash
bun init
```

2. Add development packages

```bash
bun add --dev @biomejs/biome typescript
```

3. Add `biome.json` to your folder with:

```json
{
    "$schema": "https://biomejs.dev/schemas/1.9.0/schema.json",
    "organizeImports": { "enabled": true },
    "formatter": { "indentStyle": "space", "indentWidth": 4, "lineWidth": 100 },
    "linter": { "rules": { "recommended": true } }
}
```

4. Add `.vscode/settings.json` to your folder

## Advanced Set Up

1. Copy (not clone) this template to your new project

2. Update the following files with your package name:

   - `package.json`: Update `name`, `author`, `repository`, `bugs`, and `homepage`
   - `release-please-config.json`: Update `package-name`
   - `src/index.ts`: Update SPDX header
   - `tests/index.test.ts`: Update SPDX header

3. Initialise the project:

```bash
bun install
```

4. Run the checks:

```bash
bun run check
bun run typecheck
bun test
```

### CI/CD

This template includes GitHub Actions workflows for continuous integration and release automation.

#### Workflows

| Workflow           | Trigger         | Description                                                      |
| ------------------ | --------------- | ---------------------------------------------------------------- |
| **CI**             | Push/PR to main | Runs Biome, TypeScript, and Bun test with coverage               |
| **Release Please** | Push to main    | Creates releases with changelogs and publishes to npm (optional) |

#### Conventional Commits

This template uses [release-please](https://github.com/googleapis/release-please) for automated releases. Use [conventional commits](https://www.conventionalcommits.org/) to trigger version bumps.

| Commit prefix | Version bump  | Description                                         |
| ------------- | ------------- | --------------------------------------------------- |
| `feat!:`      | Major (x.0.0) | Breaking changes that require major version bump    |
| `feat:`       | Minor (0.x.0) | New features that add functionality                 |
| `fix:`        | Patch (0.0.x) | Bug fixes                                           |
| `perf:`       | Patch (0.0.x) | Performance improvements                            |
| `build:`      | None          | Build system or dependency changes                  |
| `chore:`      | None          | Maintenance tasks that don't affect production code |
| `ci:`         | None          | CI/CD configuration changes                         |
| `docs:`       | None          | Documentation updates                               |
| `refactor:`   | None          | Code restructuring without behavior changes         |
| `revert:`     | None          | Reverting previous commits                          |
| `style:`      | None          | Code formatting changes                             |
| `test:`       | None          | Adding or updating tests                            |

#### Releases

1. Make commits using conventional commit format
2. Push to `main` branch
3. Release Please automatically creates/updates a Release PR
4. When ready, merge the Release PR
5. A GitHub Release is created and (if configured) the package is published to npm automatically

#### Publishing

##### Enable Publishing

The `release-please.yml` workflow includes npm publishing but requires setup.

To enable npm publishing:

1. **Create an npm account** at https://www.npmjs.com

2. **Generate an Access Token on npm**:

   - Go to https://www.npmjs.com/settings/~/tokens
   - Generate a new "Automation" token
   - Copy the token value

3. **Add Token to GitHub Secrets**:

   - Go to your repo Settings → Secrets and variables → Actions
   - Add a new repository secret named `NPM_TOKEN` with the token value

4. **Create GitHub Environment**:

   - Go to your repo Settings → Environments
   - Create a new environment named `npm`

The first release will publish your package to npm.

##### Disable Publishing

If you don't want to publish to npm, remove the `build` and `publish` jobs from `.github/workflows/release-please.yml`. The release workflow will still create GitHub releases with changelogs.

#### GitHub Repository Settings

##### Branch Protection Rules

Protect your `main` branch to prevent accidental pushes and ensure code quality:

1. Go to Settings → Branches → Add classic branch protection rule
2. Branch name pattern: `main`
3. Enable the following:
   - **Require a pull request before merging**
     - Require approvals: 1
     - Dismiss stale pull request approvals when new commits are pushed
   - **Require status checks to pass before merging**
     - Require branches to be up to date before merging
     - Add status checks (after your first CI run):
       - `Lint & Format`
       - `Type Check`
       - `Test`
   - **Require linear history**

These rules ensure all code goes through PR review and passes CI checks before merging to `main`.

##### Pull Request Settings

Enforce linear history and clean commits:

1. Go to Settings → General → Pull Requests
2. Check the following:
   - Allow squash merging
   - Automatically delete head branches
3. Uncheck the following:
   - Allow merge commits
   - Allow rebase merging

This ensures every PR becomes a single, clean commit on `main` with a proper conventional commit message.

##### Workflow Permissions

Configure GitHub Actions permissions to allow Release Please to create pull requests:

**For personal repositories:**

1. Go to repository Settings → Actions → General
2. Scroll down to **Workflow permissions**
3. Select **"Read and write permissions"**
4. Check **"Allow GitHub Actions to create and approve pull requests"**
5. Click **Save**

**For organization repositories:**

If the workflow permissions option is greyed out in your repository settings, you need to configure this at the organization level:

1. Go to your **organization** Settings → Actions → General (requires organization owner permissions)
2. Scroll down to **Workflow permissions**
3. Select **"Read and write permissions"**
4. Check **"Allow GitHub Actions to create and approve pull requests"**
5. Click **Save**

Without these settings, the Release Please workflow will fail with: `GitHub Actions is not permitted to create or approve pull requests`

#### Claude Code GitHub Actions

Enable Claude to respond to `@claude` mentions in PRs and issues:

```bash
claude
/install-github-app
```

This installs the Claude GitHub App and configures the workflow. Once set up, mention `@claude` in any PR or issue comment to get AI assistance with code reviews, bug fixes, and feature implementation.

## Project Structure

```
your-project/
├── .github/
│   └── workflows/
│       ├── ci.yml              # Lint, typecheck, test
│       └── release-please.yml  # Automated releases + npm publishing
├── src/
│   └── index.ts                # Main entry point (version updated by release-please)
├── tests/
│   └── index.test.ts
├── .vscode/
│   └── settings.json
├── biome.json
├── tsconfig.json
├── package.json
├── release-please-config.json
├── .release-please-manifest.json
└── README.md
```

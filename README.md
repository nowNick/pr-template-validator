# PR Template Validator

[![GitHub Super-Linter](https://github.com/actions/typescript-action/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/actions/typescript-action/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml)

This projects provides a GitHub Action that can be used on pull requests to validate if their title/description contain
required text.

## Features

- Title Validation: checks if title contains specified substring or regular expression
- Body Validation: checks if PR description contains specified substring or regular expression

## Usage

Add this configuration to your workflow configuration at `.github/workflows`.

```yaml
name: Pull Request Template Validation
on:
  pull_request:
    types: [opened, edited, labeled, unlabeled]

jobs:
  pr-template-validation:
    name: Validates if PR title and body matches template
    runs-on: ubuntu-latest
    # Don't run on PRs labeled as exception
    if: ${{ !contains(github.event.*.labels.*.name, 'skip-pr-template-validation') }}
    steps:
      - name: Validate PR Title & Body
        uses: nowNick/pr-template-validator@master
        with:
          title-contains: 'XYZ-'
          body-regex: 'ABC-\d+'
```

## Inputs

This action can be configured by following inputs:

### `title-contains`

Expected substring that a PR title should contain

### `title-regex`

Expected regular expression that a PR title should match to

### `body-contains`

Expected substring that a PR body should contain

### `body-regex`

Expected regular expression that a PR body should match to

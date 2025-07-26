# Contributing to n8n-nodes-agentsgt

Thank you for your interest in contributing to the AgentsGT node for n8n! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Release Process](#release-process)

## Code of Conduct

This project adheres to the [n8n Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Set up the development environment
4. Create a feature branch
5. Make your changes
6. Submit a pull request

## Development Setup

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- n8n (for testing)

### Installation

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/n8n-nodes-agentsgt.git
cd n8n-nodes-agentsgt

# Install dependencies
npm install

# Build the project
npm run build
```

### Linking with n8n for Development

To test your changes with a local n8n instance:

```bash
# In the n8n-nodes-agentsgt directory
npm link

# In your n8n directory
npm link n8n-nodes-agentsgt
```

## Development Workflow

1. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes to the codebase

3. Build the project to verify it compiles:
   ```bash
   npm run build
   ```

4. Format your code:
   ```bash
   npm run format
   ```

5. Lint your code:
   ```bash
   npm run lint
   ```

6. Test your changes with a local n8n instance

7. Commit your changes with a descriptive commit message:
   ```bash
   git commit -m "Add feature: your feature description"
   ```

8. Push your branch to GitHub:
   ```bash
   git push origin feature/your-feature-name
   ```

9. Create a pull request on GitHub

## Coding Standards

This project follows the coding standards used in the n8n project:

- Use TypeScript for all code
- Follow the ESLint configuration provided in the project
- Use Prettier for code formatting
- Write descriptive comments for complex logic
- Include JSDoc comments for public APIs

### Node Structure

When adding new functionality:

1. Follow the existing pattern in `AgentsGT.node.ts`
2. Ensure proper error handling
3. Use descriptive names for parameters
4. Group related parameters using displayOptions
5. Provide helpful descriptions for all parameters

## Testing

Currently, the project relies on manual testing. When testing your changes:

1. Verify all operations work as expected
2. Test with various input combinations
3. Ensure error handling works correctly
4. Check that the node UI displays correctly in n8n

## Submitting Changes

1. Ensure your code passes all checks (build, lint, format)
2. Update documentation if necessary
3. Update the CHANGELOG.md file with your changes
4. Create a pull request with a clear description of the changes
5. Reference any related issues in your pull request

### Pull Request Guidelines

- Keep pull requests focused on a single feature or bugfix
- Provide a clear description of what your changes do
- Include screenshots for UI changes if applicable
- Respond to review comments and make requested changes

## Release Process

The maintainers will handle the release process, which typically involves:

1. Merging approved pull requests
2. Updating the version in package.json
3. Updating the CHANGELOG.md
4. Creating a new release on GitHub
5. Publishing to npm

---

Thank you for contributing to the AgentsGT node for n8n! Your efforts help improve the integration for all users.

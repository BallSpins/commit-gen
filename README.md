# Commit Gen - Universal Commit Message Generator

A smart commit message generator that analyzes your code changes and suggests appropriate commit messages based on conventional commits standard. Works with any programming language and framework.

## Features

- Universal language support (JavaScript, PHP, Python, Java, Go, Ruby, C#, etc.)
- Framework detection (Laravel, React, Vue, Django, Spring, Express, Flask, etc.)
- Smart prediction based on git changes
- Conventional commits compliance
- Interactive and CLI modes
- Custom templates support
- Git integration
- Cross-platform support

## Installation

### Global Installation (Recommended)
```bash
npm install -g commit-gen
```

### Using npx (No Installation Required)
```bash
npx commit-gen [options]
```

### Manual Installation
```bash
git clone <repository>
cd commit-gen
npm install
npm link
```

## Quick Start

### Smart Prediction Mode
The smart mode analyzes your git changes and suggests appropriate commit messages:

```bash
commit-gen --smart
# or
commit-gen -S
```

### Interactive Mode
For guided commit message creation:

```bash
commit-gen --interactive
# or  
commit-gen -i
```

## Usage Examples

### Basic Usage
```bash
# Smart prediction for any project
commit-gen -S

# Interactive mode
commit-gen -i

# Quick commit generation
commit-gen --type feat --scope auth --description "add login functionality"
```

### Framework-Specific Examples

**Laravel Project:**
```bash
cd your-laravel-project
commit-gen -S
# Output: feat(controllers): add user management functionality
```

**React Project:**
```bash
cd your-react-project
commit-gen -S  
# Output: feat(components): create user profile component
```

**Django Project:**
```bash
cd your-django-project
commit-gen -S
# Output: feat(views): add user management views
```

**Spring Boot Project:**
```bash
cd your-spring-project
commit-gen -S
# Output: feat(controllers): implement user API endpoints
```

### Validation and Suggestions
```bash
# Validate a commit message
commit-gen --validate "feat(auth): add login functionality"

# Get scope suggestions
commit-gen --suggest-scope user
```

## Command Line Options

- `-S, --smart` - Use smart prediction based on git changes
- `-i, --interactive` - Use interactive mode
- `-t, --type <type>` - Commit type (feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert)
- `-s, --scope <scope>` - Commit scope
- `-d, --description <description>` - Commit description  
- `-b, --breaking` - Indicate breaking change
- `--validate <message>` - Validate a commit message
- `--suggest-scope <input>` - Get scope suggestions based on input
- `-h, --help` - Show help message
- `-v, --version` - Show version number

## Supported Languages

- **JavaScript/TypeScript**: .js, .jsx, .ts, .tsx, .mjs, .cjs
- **PHP**: .php
- **Python**: .py, .pyx
- **Java**: .java
- **Go**: .go
- **Ruby**: .rb
- **C#**: .cs
- And more through file extension detection

## Supported Frameworks

- **PHP**: Laravel, Symfony
- **JavaScript**: React, Vue, Angular, Express, Node.js
- **Python**: Django, Flask, FastAPI
- **Java**: Spring Boot, Jakarta EE
- **Go**: Gin, Echo
- **Ruby**: Rails, Sinatra
- **C#**: .NET, ASP.NET Core

## How Smart Prediction Works

1. **Git Analysis**: Reads `git diff --cached` to analyze staged changes
2. **Language Detection**: Identifies programming languages from file extensions
3. **Framework Detection**: Matches file patterns against known framework structures
4. **Change Classification**: Categorizes changes as features, fixes, refactors, etc.
5. **Scope Detection**: Determines appropriate scope from file paths and project structure
6. **Message Generation**: Creates conventional commit message based on analysis

### Prediction Examples

- **New controller file in Laravel**: `feat(controllers): add user management`
- **Modified test files**: `test: add user authentication tests`
- **Style changes**: `style: update button components`
- **Configuration updates**: `chore: update database configuration`
- **Bug fixes in small files**: `fix: resolve authentication issue`

## Configuration

Create a `commit-gen.json` file in your project root to customize behavior:

```json
{
  "scopes": ["auth", "api", "ui", "database"],
  "types": {
    "feat": "Features",
    "fix": "Bug Fixes"
  },
  "framework": "laravel",
  "template": "custom"
}
```

### Configuration Options

- `scopes`: Array of custom scopes for your project
- `types`: Custom commit type descriptions
- `framework`: Force specific framework detection
- `template`: Use custom message templates

## Project Structure Detection

The tool automatically detects project structure:

```
Laravel:    app/Http/Controllers/ → scope: "controllers"
React:      src/components/ → scope: "components"  
Django:     apps/users/views.py → scope: "views"
Spring:     src/main/java/controller/ → scope: "controllers"
```

## Conventional Commits Compliance

All generated messages follow the Conventional Commits specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Commit Types

- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test additions/modifications
- `build`: Build system changes
- `ci`: CI configuration changes
- `chore`: Other changes
- `revert`: Revert previous commits

## Integration with Git

### Git Hook Integration
Add to your `.git/hooks/prepare-commit-msg`:

```bash
#!/bin/bash
COMMIT_MSG_FILE=$1
commit-gen --smart > $COMMIT_MSG_FILE
```

### Git Alias
Add to your `.gitconfig`:

```ini
[alias]
    smart-commit = "!f() { commit-gen --smart | git commit -F -; }; f"
```

## Troubleshooting

### Common Issues

**"No changes detected"**
- Ensure you have staged changes: `git add .`

**"Not a git repository"**
- Initialize git: `git init`
- Or use interactive mode: `commit-gen -i`

**"Prediction confidence low"**
- The tool works best with conventional project structures
- Use interactive mode for more control

**Framework not detected**
- Ensure your project follows standard directory structure
- Use `--scope` flag to manually specify scope

### Debug Mode

Set environment variable for detailed output:

```bash
DEBUG=commit-gen commit-gen --smart
```

## Development

### Building from Source

```bash
git clone https://github.com/BallSpins/commit-gen.git
cd commit-gen
npm install
npm test
npm link
```

### Running Tests

```bash
npm test
```

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and feature requests, please create an issue in the GitHub repository.

## Version History

- **1.0.0**: Initial release with universal language support
- Features: Smart prediction, framework detection, conventional commits
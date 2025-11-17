#!/usr/bin/env node

import { CommitMessageGenerator } from './src/index.js';
import inquirer from 'inquirer';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';

const generator = new CommitMessageGenerator();

const argv = yargs(hideBin(process.argv))
  .option('type', {
    alias: 't',
    type: 'string',
    description: 'Commit type (feat, fix, docs, etc.)'
  })
  .option('scope', {
    alias: 's', 
    type: 'string',
    description: 'Commit scope'
  })
  .option('description', {
    alias: 'd',
    type: 'string',
    description: 'Commit description'
  })
  .option('breaking', {
    alias: 'b',
    type: 'boolean',
    description: 'Indicate breaking change'
  })
  .option('interactive', {
    alias: 'i',
    type: 'boolean',
    description: 'Use interactive mode'
  })
  .option('smart', {
    alias: 'S',
    type: 'boolean',
    description: 'Use smart prediction based on git changes',
    default: false
  })
  .option('validate', {
    type: 'string',
    description: 'Validate a commit message'
  })
  .option('suggest-scope', {
    type: 'string', 
    description: 'Get scope suggestions based on input'
  })
  .version('1.0.0')
  .help()
  .argv;

async function main() {
  try {
    if (argv.validate) {
      validateMessage(argv.validate);
      return;
    }

    if (argv['suggest-scope']) {
      suggestScopes(argv['suggest-scope']);
      return;
    }

    if (argv.smart || (!argv.type && !argv.interactive)) {
      await smartMode();
      return;
    }

    if (argv.interactive) {
      await interactiveMode();
    } else {
      await generateFromArgs();
    }
  } catch (error) {
    console.error(chalk.red('Error:'), error.message);
    process.exit(1);
  }
}

async function smartMode() {
  console.log(chalk.blue('Smart mode: Analyzing your changes...'));
  
  const result = await generator.generateSmartCommit();
  
  if (!result) {
    console.log(chalk.yellow('Could not predict changes, falling back to interactive mode...'));
    await interactiveMode();
    return;
  }

  const { message, prediction, suggested } = result;

  const confidence = Math.round(prediction.confidence * 100);
  console.log(chalk.gray(`Prediction confidence: ${confidence}%`));
  
  if (prediction.language) {
    console.log(chalk.gray(`Detected language: ${prediction.language}`));
  }
  
  if (prediction.framework) {
    console.log(chalk.gray(`Detected framework: ${prediction.framework}`));
  }

  console.log('\n' + chalk.green('Suggested commit message:'));
  console.log(chalk.cyan('-'.repeat(60)));
  console.log(chalk.white(message));
  console.log(chalk.cyan('-'.repeat(60)));

  if (suggested.length > 0) {
    console.log('\n' + chalk.yellow('Alternative suggestions:'));
    suggested.forEach((alt, index) => {
      console.log(chalk.gray(`${index + 1}. ${alt.type}(${prediction.scope}): ${alt.description}`));
      console.log(chalk.gray(`   ${alt.reason}`));
    });
  }

  const { useSuggestion } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'useSuggestion',
      message: 'Use this commit message?',
      default: true
    }
  ]);

  if (useSuggestion) {
    console.log(chalk.green('Ready to commit!'));
    console.log(chalk.gray('Run: git commit -m "' + message.split('\n')[0] + '"'));
  } else {
    await interactiveMode();
  }
}

async function interactiveMode() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Select commit type:',
      choices: generator.getCommitTypes()
    },
    {
      type: 'input',
      name: 'scope',
      message: 'Enter scope (optional):',
      validate: (input) => {
        if (input && input.length > 20) {
          return 'Scope should be 20 characters or less';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Enter commit description:',
      validate: (input) => {
        if (!input.trim()) {
          return 'Description is required';
        }
        if (input.length > 50) {
          return 'Description should be 50 characters or less';
        }
        return true;
      }
    },
    {
      type: 'confirm',
      name: 'isBreaking',
      message: 'Is this a breaking change?',
      default: false
    }
  ]);

  const message = generator.generateCommitMessage(
    answers.type,
    answers.scope,
    answers.description,
    answers.isBreaking
  );

  displayResult(message);
}

async function generateFromArgs() {
  const message = generator.generateCommitMessage(
    argv.type || 'chore',
    argv.scope,
    argv.description,
    argv.breaking
  );

  displayResult(message);
}

function displayResult(message) {
  console.log('\n' + chalk.green('Generated commit message:'));
  console.log(chalk.cyan('-'.repeat(60)));
  console.log(chalk.white(message));
  console.log(chalk.cyan('-'.repeat(60)));
  console.log(chalk.gray('\nTip: Use your terminal to copy this message to clipboard'));
}

function validateMessage(message) {
  const result = generator.validateCommitMessage(message);
  
  if (result.isValid) {
    console.log(chalk.green('Valid commit message'));
  } else {
    console.log(chalk.red('Invalid commit message:'));
    result.errors.forEach(error => console.log(`  - ${error}`));
  }
}

function suggestScopes(input) {
  const suggestions = generator.suggestScopes(input);
  console.log(chalk.blue('Scope suggestions:'));
  suggestions.forEach(scope => console.log(`  - ${scope}`));
}

main();
import { COMMIT_TYPES } from './config.js';
import { PredictionEngine } from './prediction-engine.js';

export class CommitMessageGenerator {
  constructor() {
    this.types = COMMIT_TYPES;
    this.predictor = new PredictionEngine();
  }

  generateCommitMessage(type, scope, description, isBreaking = false) {
    const typeConfig = this.types[type];
    if (!typeConfig) {
      throw new Error(`Invalid commit type: ${type}`);
    }

    let message = '';

    if (scope && scope.trim()) {
      message += `${type}(${scope.trim()}): `;
    } else {
      message += `${type}: `;
    }

    if (description && description.trim()) {
      message += description.trim();
    } else {
      message += this.generateDescription(type, scope);
    }

    if (isBreaking) {
      message += '\n\nBREAKING CHANGE: ';
    }

    return message;
  }

  generateDescription(type, scope) {
    const scopeName = scope || 'component';
    
    const defaultTemplates = {
      feat: `add ${scopeName} functionality`,
      fix: `resolve ${scopeName} issue`,
      refactor: `restructure ${scopeName} code`,
      test: `add ${scopeName} test coverage`,
      docs: `update ${scopeName} documentation`,
      style: `update ${scopeName} styles`,
      chore: `update ${scopeName} configuration`
    };

    return defaultTemplates[type] || defaultTemplates.feat;
  }

  async generateSmartCommit() {
    try {
      const prediction = this.predictor.analyzeChanges();
      
      return {
        message: this.generateCommitMessage(
          prediction.type,
          prediction.scope,
          prediction.description
        ),
        prediction,
        suggested: this.getAlternativeSuggestions(prediction)
      };
    } catch (error) {
      return null;
    }
  }

  getAlternativeSuggestions(prediction) {
    const alternatives = [];
    const { type, scope } = prediction;

    if (type === 'feat') {
      alternatives.push({
        type: 'fix',
        description: `resolve ${scope} issue`,
        reason: 'If this fixes a bug rather than adds features'
      });
    }

    if (type === 'refactor') {
      alternatives.push({
        type: 'perf', 
        description: `optimize ${scope} performance`,
        reason: 'If this improves performance'
      });
    }

    return alternatives;
  }

  validateCommitMessage(message) {
    const errors = [];

    const conventionalCommitRegex = /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\(\w+\))?: .+/;
    if (!conventionalCommitRegex.test(message)) {
      errors.push('Message does not follow conventional commit format');
    }

    const firstLine = message.split('\n')[0];
    if (firstLine.length > 72) {
      errors.push('First line should be 72 characters or less');
    }

    if (!message.trim()) {
      errors.push('Commit message cannot be empty');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  getCommitTypes() {
    return Object.entries(this.types).map(([key, config]) => ({
      value: key,
      name: `${key.padEnd(10)} - ${config.description}`
    }));
  }

  suggestScopes(input) {
    const commonScopes = [
      'auth', 'api', 'ui', 'database', 'config', 'deployment', 
      'validation', 'middleware', 'router', 'component', 'style', 
      'test', 'docs', 'build', 'ci', 'models', 'controllers',
      'services', 'utils', 'hooks', 'store', 'views'
    ];

    if (!input) return commonScopes.slice(0, 5);
    
    return commonScopes
      .filter(scope => scope.toLowerCase().includes(input.toLowerCase()))
      .slice(0, 5);
  }
}
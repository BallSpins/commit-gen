import { execSync } from 'child_process';
import { LanguageDetector } from './language-detector.js';
import { FrameworkDetector } from './framework-detector.js';
import { COMMIT_TYPES } from './config.js';
import { readFileSync, existsSync } from 'fs';

export class PredictionEngine {
  constructor() {
    this.languageDetector = new LanguageDetector();
    this.frameworkDetector = new FrameworkDetector();
  }

  analyzeChanges() {
    try {
      const diff = execSync('git diff --cached --name-status', { encoding: 'utf8' });
      const diffContent = execSync('git diff --cached --unified=0', { encoding: 'utf8' });
      return this.analyzeGitDiff(diff, diffContent);
    } catch (error) {
      return this.analyzeFileSystem();
    }
  }

  analyzeGitDiff(diffOutput, diffContent = '') {
    const changes = {
      files: [],
      added: 0,
      modified: 0,
      deleted: 0,
      fileTypes: new Set(),
      languages: new Set(),
      specificScopes: new Map(),
      changeContext: new Map()
    };

    const lines = diffOutput.split('\n').filter(line => line.trim());
    
    lines.forEach(line => {
      const [status, filePath] = line.split('\t');
      if (!filePath) return;

      changes.files.push({ status, path: filePath });
      
      if (status === 'A') changes.added++;
      else if (status === 'M') changes.modified++;
      else if (status === 'D') changes.deleted++;

      const fileType = this.getFileCategory(filePath);
      changes.fileTypes.add(fileType);

      const language = this.languageDetector.detectLanguageFromFile(filePath);
      if (language) changes.languages.add(language);

      this.trackSpecificScopes(changes, filePath, status);
    });

    this.analyzeChangeContext(changes, diffContent);

    const primaryLanguage = this.languageDetector.detectFromFiles(changes.files.map(f => f.path));
    const framework = this.frameworkDetector.detectFromFiles(changes.files.map(f => f.path));

    return this.predictFromChanges(changes, primaryLanguage, framework);
  }

  analyzeChangeContext(changes, diffContent) {
    changes.files.forEach(file => {
      const fileDiff = this.extractFileDiff(diffContent, file.path);
      const context = this.determineChangeContext(fileDiff, file.path);
      
      if (context) {
        changes.changeContext.set(file.path, context);
      }
    });
  }

  extractFileDiff(diffContent, filePath) {
    const lines = diffContent.split('\n');
    let inFile = false;
    let fileDiff = [];

    for (const line of lines) {
      if (line.startsWith('---') || line.startsWith('+++')) {
        if (line.includes(filePath)) {
          inFile = true;
        } else {
          inFile = false;
        }
      } else if (inFile && (line.startsWith('+') || line.startsWith('-') || line.startsWith('@'))) {
        fileDiff.push(line);
      }
    }

    return fileDiff.join('\n');
  }

  determineChangeContext(diffContent, filePath) {
    const addedLines = (diffContent.match(/^\+/gm) || []).length;
    const removedLines = (diffContent.match(/^-/gm) || []).length;
    const totalChanges = addedLines + removedLines;

    if (totalChanges <= 3) {
      return 'fix';
    }

    if (removedLines > 8 && addedLines > 8) {
      return 'refactor';
    }

    if (addedLines > removedLines * 2) {
      return 'feat';
    }

    if (filePath.includes('config') || filePath.includes('setting')) {
      return 'chore';
    }

    if (diffContent.includes('fix') || diffContent.includes('bug') || diffContent.includes('error')) {
      return 'fix';
    }

    if (diffContent.includes('refactor') || diffContent.includes('optimize')) {
      return 'refactor';
    }

    return 'modify';
  }

  trackSpecificScopes(changes, filePath, status) {
    const framework = this.frameworkDetector.detectFromFiles([filePath]);
    if (!framework) return;

    const scope = this.frameworkDetector.extractScopeFromPath(filePath, framework);
    if (scope) {
      const current = changes.specificScopes.get(scope) || { count: 0, statuses: new Set() };
      current.count++;
      current.statuses.add(status);
      changes.specificScopes.set(scope, current);
    }
  }

  getFileCategory(filePath) {
    if (this.languageDetector.isTestFile(filePath)) return 'test';
    if (this.languageDetector.isConfigFile(filePath)) return 'config';
    if (this.languageDetector.isDocumentationFile(filePath)) return 'docs';
    
    if (filePath.includes('.css') || filePath.includes('.scss') || 
        filePath.includes('.less') || filePath.includes('.styl')) {
      return 'style';
    }
    
    if (filePath.includes('migration')) return 'migration';
    if (filePath.includes('seed') || filePath.includes('factory')) return 'seed';
    if (filePath.includes('test') || filePath.includes('spec')) return 'test';
    
    return 'code';
  }

  predictFromChanges(changes, language, framework) {
    const prediction = {
      type: 'chore',
      scope: null,
      description: '',
      confidence: 0.5,
      language,
      framework
    };

    prediction.type = this.predictCommitType(changes, framework);
    prediction.scope = this.predictScope(changes, framework);
    prediction.description = this.generateDescription(prediction.type, prediction.scope, changes, framework);
    prediction.confidence = this.calculateConfidence(prediction, changes);

    return prediction;
  }

  predictCommitType(changes, framework) {
    if (framework === 'laravel') {
      return this.predictLaravelCommitType(changes);
    }
    if (framework === 'react') {
      return this.predictReactCommitType(changes);
    }
    if (framework === 'django') {
      return this.predictDjangoCommitType(changes);
    }

    const scopes = Array.from(changes.specificScopes.entries());
    
    if (changes.deleted > changes.added + changes.modified) {
      return 'refactor';
    }

    if (changes.added > changes.modified * 2) {
      return 'feat';
    }

    if (changes.modified > 0 && changes.files.length <= 3) {
      const hasFixContext = Array.from(changes.changeContext.values()).some(ctx => ctx === 'fix');
      return hasFixContext ? 'fix' : 'refactor';
    }

    const fileCategories = Array.from(changes.fileTypes);
    if (fileCategories.includes('test')) return 'test';
    if (fileCategories.includes('docs')) return 'docs';
    if (fileCategories.includes('style')) return 'style';
    if (fileCategories.includes('config')) return 'chore';
    if (fileCategories.includes('migration')) {
      return changes.added > 0 ? 'feat' : 'refactor';
    }
    if (fileCategories.includes('seed')) {
      return changes.added > 0 ? 'feat' : 'chore';
    }

    return 'refactor';
  }

  predictLaravelCommitType(changes) {
    const scopes = Array.from(changes.specificScopes.entries());
    
    for (const [scope, data] of scopes) {
      const statuses = Array.from(data.statuses);
      
      if (scope === 'migrations') {
        if (statuses.includes('A')) return 'feat';
        if (statuses.includes('M')) return 'refactor';
      }
      
      if (scope === 'seeds' || scope === 'factories') {
        if (statuses.includes('A')) return 'feat';
        if (statuses.includes('M')) return 'chore';
      }
      
      if (scope === 'services' || scope === 'repositories') {
        if (statuses.includes('A')) return 'feat';
        if (changes.files.length <= 2) return 'fix';
        return 'refactor';
      }
      
      if (scope === 'requests' || scope === 'rules') {
        if (statuses.includes('A')) return 'feat';
        return 'fix';
      }
      
      if (scope === 'tests') {
        if (statuses.includes('A')) return 'test';
        return 'fix';
      }

      if (scope === 'events' || scope === 'listeners') {
        if (statuses.includes('A')) return 'feat';
        return 'refactor';
      }

      if (scope === 'controllers') {
        if (statuses.includes('A')) return 'feat';
        if (changes.files.length <= 2) return 'fix';
        return 'refactor';
      }

      if (scope === 'models') {
        if (statuses.includes('A')) return 'feat';
        if (changes.files.length <= 2) return 'fix';
        return 'refactor';
      }
    }

    return this.predictCommitType(changes, 'laravel');
  }

  predictReactCommitType(changes) {
    const scopes = Array.from(changes.specificScopes.entries());
    
    for (const [scope, data] of scopes) {
      const statuses = Array.from(data.statuses);
      
      if (scope === 'components') {
        if (statuses.includes('A')) return 'feat';
        if (changes.files.length <= 2) return 'fix';
        return 'refactor';
      }
      
      if (scope === 'hooks') {
        if (statuses.includes('A')) return 'feat';
        return 'refactor';
      }
      
      if (scope === 'store') {
        if (statuses.includes('A')) return 'feat';
        return 'refactor';
      }

      if (scope === 'styles') {
        return 'style';
      }
    }

    return this.predictCommitType(changes, 'react');
  }

  predictDjangoCommitType(changes) {
    const scopes = Array.from(changes.specificScopes.entries());
    
    for (const [scope, data] of scopes) {
      const statuses = Array.from(data.statuses);
      
      if (scope === 'models') {
        if (statuses.includes('A')) return 'feat';
        if (changes.files.length <= 2) return 'fix';
        return 'refactor';
      }
      
      if (scope === 'views') {
        if (statuses.includes('A')) return 'feat';
        if (changes.files.length <= 2) return 'fix';
        return 'refactor';
      }
      
      if (scope === 'migrations') {
        if (statuses.includes('A')) return 'feat';
        return 'refactor';
      }

      if (scope === 'tests') {
        if (statuses.includes('A')) return 'test';
        return 'fix';
      }
    }

    return this.predictCommitType(changes, 'django');
  }

  predictScope(changes, framework) {
    if (changes.specificScopes.size > 0) {
      const sortedScopes = Array.from(changes.specificScopes.entries())
        .sort(([,a], [,b]) => b.count - a.count);
      return sortedScopes[0][0];
    }

    if (!framework) {
      return this.predictScopeFromFileStructure(changes.files);
    }

    const frameworkScopes = this.frameworkDetector.getFrameworkScopes(framework);
    const scopeCounts = {};

    changes.files.forEach(file => {
      const scope = this.frameworkDetector.extractScopeFromPath(file.path, framework);
      if (scope && frameworkScopes.includes(scope)) {
        scopeCounts[scope] = (scopeCounts[scope] || 0) + 1;
      }
    });

    if (Object.keys(scopeCounts).length > 0) {
      return Object.entries(scopeCounts)
        .sort(([,a], [,b]) => b - a)[0][0];
    }

    return this.predictScopeFromFileStructure(changes.files);
  }

  predictScopeFromFileStructure(files) {
    const dirCounts = {};
    
    files.forEach(file => {
      const dirs = file.path.split('/');
      if (dirs.length > 1) {
        const topDir = dirs[0];
        dirCounts[topDir] = (dirCounts[topDir] || 0) + 1;
      }
    });

    if (Object.keys(dirCounts).length > 0) {
      return Object.entries(dirCounts)
        .sort(([,a], [,b]) => b - a)[0][0];
    }

    return null;
  }

  generateDescription(type, scope, changes, framework) {
    const scopeName = scope || 'component';
    const context = this.getChangeContext(changes, scope);

    if (framework === 'laravel') {
      return this.generateLaravelDescription(type, scopeName, changes, context);
    }
    if (framework === 'react') {
      return this.generateReactDescription(type, scopeName, context);
    }
    if (framework === 'django') {
      return this.generateDjangoDescription(type, scopeName, context);
    }

    return this.generateGeneralDescription(type, scopeName, context);
  }

  getChangeContext(changes, scope) {
    const scopeData = changes.specificScopes.get(scope);
    if (!scopeData) return 'modify';

    const statuses = Array.from(scopeData.statuses);
    
    if (statuses.includes('A')) return 'add';
    if (statuses.includes('D')) return 'delete';
    if (statuses.includes('M') && changes.files.length <= 2) return 'fix';
    return 'modify';
  }

  generateGeneralDescription(type, scope, context) {
    const templates = {
      feat: {
        add: [
          `add ${scope} functionality`,
          `implement ${scope} feature`,
          `create ${scope}`,
          `introduce ${scope} capability`
        ],
        modify: [
          `enhance ${scope} functionality`,
          `improve ${scope} feature`,
          `extend ${scope} capabilities`
        ]
      },
      fix: {
        add: [
          `add ${scope} error handling`,
          `implement ${scope} fix`
        ],
        modify: [
          `resolve ${scope} issue`,
          `fix ${scope} bug`,
          `correct ${scope} behavior`,
          `patch ${scope} problem`
        ],
        delete: [
          `remove ${scope} bug`,
          `eliminate ${scope} issue`
        ]
      },
      refactor: {
        add: [
          `add ${scope} improvements`,
          `implement ${scope} optimizations`
        ],
        modify: [
          `restructure ${scope} code`,
          `optimize ${scope} implementation`,
          `improve ${scope} architecture`,
          `reorganize ${scope} structure`
        ],
        delete: [
          `clean up ${scope} code`,
          `remove ${scope} redundancies`
        ]
      },
      test: {
        add: [
          `add ${scope} test coverage`,
          `implement ${scope} tests`
        ],
        modify: [
          `update ${scope} test cases`,
          `improve ${scope} test coverage`
        ]
      },
      docs: {
        add: [
          `add ${scope} documentation`,
          `create ${scope} docs`
        ],
        modify: [
          `update ${scope} documentation`,
          `improve ${scope} docs`
        ]
      },
      style: {
        modify: [
          `update ${scope} styles`,
          `improve ${scope} appearance`,
          `adjust ${scope} styling`
        ]
      },
      chore: {
        add: [
          `add ${scope} configuration`,
          `set up ${scope} settings`
        ],
        modify: [
          `update ${scope} configuration`,
          `modify ${scope} setup`,
          `adjust ${scope} settings`
        ],
        delete: [
          `remove ${scope} configuration`,
          `clean up ${scope} settings`
        ]
      }
    };

    const typeTemplates = templates[type] || templates.feat;
    const contextTemplates = typeTemplates[context] || typeTemplates.modify;
    
    return contextTemplates[Math.floor(Math.random() * contextTemplates.length)];
  }

  generateLaravelDescription(type, scope, changes, context) {
    const laravelTemplates = {
      migrations: {
        feat: {
          add: [
            `create ${this.cleanScope(scope)} table`,
            `add ${this.cleanScope(scope)} table structure`
          ],
          modify: [
            `update ${this.cleanScope(scope)} table structure`,
            `modify ${this.cleanScope(scope)} migration`
          ]
        },
        refactor: {
          modify: [
            `refactor ${this.cleanScope(scope)} table structure`,
            `optimize ${this.cleanScope(scope)} migration`
          ]
        }
      },
      seeds: {
        feat: {
          add: [
            `add ${this.cleanScope(scope)} seed data`,
            `populate ${this.cleanScope(scope)} data`
          ],
          modify: [
            `update ${this.cleanScope(scope)} seed data`,
            `modify ${this.cleanScope(scope)} seeder`
          ]
        },
        chore: {
          modify: [
            `update ${this.cleanScope(scope)} seed records`,
            `adjust ${this.cleanScope(scope)} data`
          ]
        }
      },
      factories: {
        feat: {
          add: [
            `create ${this.cleanScope(scope)} factory`,
            `add ${this.cleanScope(scope)} model factory`
          ],
          modify: [
            `update ${this.cleanScope(scope)} factory`,
            `modify ${this.cleanScope(scope)} model factory`
          ]
        }
      },
      services: {
        feat: {
          add: [
            `implement ${this.cleanScope(scope)} service`,
            `add ${this.cleanScope(scope)} business logic`
          ]
        },
        fix: {
          modify: [
            `fix ${this.cleanScope(scope)} service logic`,
            `resolve ${this.cleanScope(scope)} service issue`
          ]
        },
        refactor: {
          modify: [
            `refactor ${this.cleanScope(scope)} service`,
            `optimize ${this.cleanScope(scope)} service logic`
          ]
        }
      },
      requests: {
        feat: {
          add: [
            `add ${this.cleanScope(scope)} validation rules`,
            `create ${this.cleanScope(scope)} form request`
          ]
        },
        fix: {
          modify: [
            `fix ${this.cleanScope(scope)} validation rules`,
            `correct ${this.cleanScope(scope)} request validation`
          ]
        }
      },
      controllers: {
        feat: {
          add: [
            `implement ${this.cleanScope(scope)} controller`,
            `add ${this.cleanScope(scope)} endpoints`
          ]
        },
        fix: {
          modify: [
            `fix ${this.cleanScope(scope)} controller logic`,
            `resolve ${this.cleanScope(scope)} controller issue`
          ]
        },
        refactor: {
          modify: [
            `refactor ${this.cleanScope(scope)} controller`,
            `optimize ${this.cleanScope(scope)} controller methods`
          ]
        }
      },
      models: {
        feat: {
          add: [
            `create ${this.cleanScope(scope)} model`,
            `add ${this.cleanScope(scope)} entity`
          ]
        },
        fix: {
          modify: [
            `fix ${this.cleanScope(scope)} model relationships`,
            `correct ${this.cleanScope(scope)} model attributes`
          ]
        },
        refactor: {
          modify: [
            `refactor ${this.cleanScope(scope)} model`,
            `optimize ${this.cleanScope(scope)} model queries`
          ]
        }
      },
      events: {
        feat: {
          add: [
            `add ${this.cleanScope(scope)} event`,
            `create ${this.cleanScope(scope)} event class`
          ]
        }
      },
      listeners: {
        feat: {
          add: [
            `add ${this.cleanScope(scope)} event listener`,
            `create ${this.cleanScope(scope)} listener`
          ]
        }
      },
      tests: {
        test: {
          add: [
            `add ${this.cleanScope(scope)} test coverage`,
            `create ${this.cleanScope(scope)} tests`
          ]
        },
        fix: {
          modify: [
            `fix ${this.cleanScope(scope)} test cases`,
            `correct ${this.cleanScope(scope)} test assertions`
          ]
        }
      }
    };

    const scopeTemplates = laravelTemplates[scope];
    if (scopeTemplates && scopeTemplates[type] && scopeTemplates[type][context]) {
      const templates = scopeTemplates[type][context];
      return templates[Math.floor(Math.random() * templates.length)];
    }

    return this.generateGeneralDescription(type, scope, context);
  }

  generateReactDescription(type, scope, context) {
    const reactTemplates = {
      components: {
        feat: {
          add: [
            `create ${this.cleanScope(scope)} component`,
            `add ${this.cleanScope(scope)} UI component`
          ],
          modify: [
            `update ${this.cleanScope(scope)} component`,
            `enhance ${this.cleanScope(scope)} component functionality`
          ]
        },
        fix: {
          modify: [
            `fix ${this.cleanScope(scope)} component rendering`,
            `resolve ${this.cleanScope(scope)} component issue`
          ]
        },
        refactor: {
          modify: [
            `refactor ${this.cleanScope(scope)} component`,
            `optimize ${this.cleanScope(scope)} component performance`
          ]
        }
      },
      hooks: {
        feat: {
          add: [
            `create ${this.cleanScope(scope)} custom hook`,
            `add ${this.cleanScope(scope)} hook functionality`
          ]
        },
        refactor: {
          modify: [
            `refactor ${this.cleanScope(scope)} hook logic`,
            `optimize ${this.cleanScope(scope)} hook implementation`
          ]
        }
      },
      store: {
        feat: {
          add: [
            `implement ${this.cleanScope(scope)} store`,
            `add ${this.cleanScope(scope)} state management`
          ]
        },
        refactor: {
          modify: [
            `refactor ${this.cleanScope(scope)} store structure`,
            `optimize ${this.cleanScope(scope)} state management`
          ]
        }
      }
    };

    const scopeTemplates = reactTemplates[scope];
    if (scopeTemplates && scopeTemplates[type] && scopeTemplates[type][context]) {
      const templates = scopeTemplates[type][context];
      return templates[Math.floor(Math.random() * templates.length)];
    }

    return this.generateGeneralDescription(type, scope, context);
  }

  generateDjangoDescription(type, scope, context) {
    const djangoTemplates = {
      models: {
        feat: {
          add: [
            `create ${this.cleanScope(scope)} model`,
            `add ${this.cleanScope(scope)} database model`
          ],
          modify: [
            `update ${this.cleanScope(scope)} model fields`,
            `modify ${this.cleanScope(scope)} model structure`
          ]
        }
      },
      views: {
        feat: {
          add: [
            `implement ${this.cleanScope(scope)} view`,
            `add ${this.cleanScope(scope)} view logic`
          ],
          modify: [
            `update ${this.cleanScope(scope)} view functionality`,
            `modify ${this.cleanScope(scope)} view logic`
          ]
        }
      },
      migrations: {
        feat: {
          add: [
            `create ${this.cleanScope(scope)} migration`,
            `add ${this.cleanScope(scope)} database migration`
          ],
          modify: [
            `update ${this.cleanScope(scope)} migration`,
            `modify ${this.cleanScope(scope)} migration file`
          ]
        }
      }
    };

    const scopeTemplates = djangoTemplates[scope];
    if (scopeTemplates && scopeTemplates[type] && scopeTemplates[type][context]) {
      const templates = scopeTemplates[type][context];
      return templates[Math.floor(Math.random() * templates.length)];
    }

    return this.generateGeneralDescription(type, scope, context);
  }

  cleanScope(scope) {
    return scope.replace(/migrations|seeds|factories|services|controllers|models|tests?/g, '').trim() || 'component';
  }

  calculateConfidence(prediction, changes) {
    let confidence = 0.5;

    if (prediction.framework) confidence += 0.2;
    if (changes.files.length > 0) confidence += 0.1;
    if (prediction.scope) confidence += 0.1;
    if (changes.specificScopes.size > 0) confidence += 0.2;
    if (changes.added + changes.modified > 0) confidence += 0.1;

    return Math.min(confidence, 0.95);
  }

  analyzeFileSystem() {
    const changes = {
      files: this.getRecentFiles(),
      added: 0,
      modified: 0,
      deleted: 0,
      fileTypes: new Set(),
      languages: new Set(),
      specificScopes: new Map(),
      changeContext: new Map()
    };

    changes.files.forEach(file => {
      changes.modified++;
      
      const fileType = this.getFileCategory(file.path);
      changes.fileTypes.add(fileType);

      const language = this.languageDetector.detectLanguageFromFile(file.path);
      if (language) changes.languages.add(language);

      this.trackSpecificScopes(changes, file.path, 'M');
    });

    const primaryLanguage = this.languageDetector.detectFromFiles(changes.files.map(f => f.path));
    const framework = this.frameworkDetector.detectFromFiles(changes.files.map(f => f.path));

    return this.predictFromChanges(changes, primaryLanguage, framework);
  }

  getRecentFiles() {
  try {
    let output;
    
    if (process.platform === 'win32') {
      // Use git to get recently modified files (cross-platform)
      try {
        output = execSync('git ls-files -m', { encoding: 'utf8' });
        return output.split('\n')
          .filter(Boolean)
          .map(path => ({ path: path.trim(), status: 'M' }))
          .slice(0, 10);
      } catch (gitError) {
        // If not in git repo, use PowerShell
        output = execSync('powershell "Get-ChildItem -Recurse -File -Exclude node_modules,.git | Sort-Object LastWriteTime -Descending | Select-Object -First 10 | % { $_.FullName }"', { 
          encoding: 'utf8' 
        });
        
        return output.split('\r\n')
          .filter(line => line.trim() && line.includes('\\'))
          .map(line => ({ path: line.trim(), status: 'M' }))
          .slice(0, 10);
      }
    } else {
      // Unix/Linux/Mac
      output = execSync('find . -type f -mmin -30 -not -path "./node_modules/*" -not -path "./.git/*" | head -10', { 
        encoding: 'utf8' 
      });
      
      return output.split('\n')
        .filter(Boolean)
        .map(path => ({ path: path.trim(), status: 'M' }))
        .slice(0, 10);
    }
  } catch (error) {
    // Silent fail - return empty array
    return [];
  }
}
}
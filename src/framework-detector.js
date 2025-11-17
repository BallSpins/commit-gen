import { FRAMEWORKS } from './config.js';
import { readFileSync, existsSync } from 'fs';

export class FrameworkDetector {
  detectFromFiles(filePaths) {
    const frameworkScores = {};
    
    filePaths.forEach(filePath => {
      const framework = this.detectFrameworkFromFile(filePath);
      if (framework) {
        frameworkScores[framework] = (frameworkScores[framework] || 0) + 1;
      }
    });

    return this.getPrimaryFramework(frameworkScores);
  }

  detectFrameworkFromFile(filePath) {
    for (const [framework, config] of Object.entries(FRAMEWORKS)) {
      for (const [type, pattern] of Object.entries(config.patterns)) {
        if (pattern.test(filePath)) {
          return framework;
        }
      }
    }
    return null;
  }

  detectFromConfig() {
    const configFiles = {
      laravel: ['artisan', 'composer.json'],
      react: ['package.json'],
      vue: ['package.json', 'vue.config.js'],
      django: ['manage.py', 'requirements.txt'],
      spring: ['pom.xml', 'build.gradle'],
      express: ['package.json', 'app.js'],
      flask: ['app.py', 'requirements.txt']
    };

    for (const [framework, files] of Object.entries(configFiles)) {
      for (const file of files) {
        if (existsSync(file)) {
          if (this.validateFrameworkFile(framework, file)) {
            return framework;
          }
        }
      }
    }

    return null;
  }

  validateFrameworkFile(framework, filePath) {
    try {
      const content = readFileSync(filePath, 'utf8');
      
      switch (framework) {
        case 'laravel':
          return content.includes('"laravel/framework"') || 
                 content.includes("'laravel/framework'");
        case 'react':
          return content.includes('"react"') || content.includes("'react'");
        case 'vue':
          return content.includes('"vue"') || content.includes("'vue'") ||
                 content.includes('"nuxt"') || content.includes("'nuxt'");
        case 'django':
          return content.includes('Django') || content.includes('django');
        case 'spring':
          return content.includes('spring-boot') || content.includes('springframework');
        case 'express':
          return content.includes('"express"') || content.includes("'express'");
        case 'flask':
          return content.includes('Flask') || content.includes('flask');
        default:
          return true;
      }
    } catch {
      return false;
    }
  }

  getPrimaryFramework(frameworkScores) {
    const configFramework = this.detectFromConfig();
    if (configFramework) return configFramework;

    if (Object.keys(frameworkScores).length === 0) return null;
    
    return Object.entries(frameworkScores)
      .sort(([,a], [,b]) => b - a)[0][0];
  }

  getFrameworkScopes(framework) {
    return FRAMEWORKS[framework]?.scopes || [];
  }

  extractScopeFromPath(filePath, framework) {
    const frameworkConfig = FRAMEWORKS[framework];
    if (!frameworkConfig) return null;

    for (const [type, pattern] of Object.entries(frameworkConfig.patterns)) {
      const match = filePath.match(pattern);
      if (match) {
        return type;
      }
    }

    return null;
  }
}
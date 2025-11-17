import { LANGUAGE_PATTERNS } from './config.js';

export class LanguageDetector {
  detectFromFiles(filePaths) {
    const languageStats = {};
    
    filePaths.forEach(filePath => {
      const language = this.detectLanguageFromFile(filePath);
      if (language) {
        languageStats[language] = (languageStats[language] || 0) + 1;
      }
    });

    return this.getPrimaryLanguage(languageStats);
  }

  detectLanguageFromFile(filePath) {
    for (const [language, patterns] of Object.entries(LANGUAGE_PATTERNS)) {
      if (patterns.extensions.some(ext => filePath.endsWith(ext))) {
        return language;
      }
    }
    return null;
  }

  getPrimaryLanguage(languageStats) {
    if (Object.keys(languageStats).length === 0) return null;
    
    return Object.entries(languageStats)
      .sort(([,a], [,b]) => b - a)[0][0];
  }

  isTestFile(filePath) {
    for (const patterns of Object.values(LANGUAGE_PATTERNS)) {
      if (patterns.testPatterns.some(pattern => filePath.includes(pattern))) {
        return true;
      }
    }
    return false;
  }

  isConfigFile(filePath) {
    const configPatterns = [
      'package.json', 'composer.json', 'requirements.txt', 'pom.xml',
      'build.gradle', 'go.mod', 'Gemfile', 'web.config', 'dockerfile',
      '.env', 'config/', 'settings.', 'configuration.'
    ];
    
    return configPatterns.some(pattern => 
      filePath.toLowerCase().includes(pattern.toLowerCase())
    );
  }

  isDocumentationFile(filePath) {
    const docPatterns = [
      '.md', '.txt', '.rst', '.html', 'readme', 'docs/', 'documentation/'
    ];
    
    return docPatterns.some(pattern => 
      filePath.toLowerCase().includes(pattern.toLowerCase())
    );
  }
}
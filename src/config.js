export const COMMIT_TYPES = {
  feat: {
    description: 'A new feature',
    title: 'Features'
  },
  fix: {
    description: 'A bug fix', 
    title: 'Bug Fixes'
  },
  docs: {
    description: 'Documentation only changes',
    title: 'Documentation'
  },
  style: {
    description: 'Changes that do not affect the meaning of the code',
    title: 'Styles'
  },
  refactor: {
    description: 'A code change that neither fixes a bug nor adds a feature',
    title: 'Code Refactoring'
  },
  perf: {
    description: 'A code change that improves performance',
    title: 'Performance Improvements'
  },
  test: {
    description: 'Adding missing tests or correcting existing tests',
    title: 'Tests'
  },
  build: {
    description: 'Changes that affect the build system or external dependencies',
    title: 'Builds'
  },
  ci: {
    description: 'Changes to CI configuration files and scripts',
    title: 'Continuous Integration'
  },
  chore: {
    description: 'Other changes that do not modify src or test files',
    title: 'Chores'
  },
  revert: {
    description: 'Reverts a previous commit',
    title: 'Reverts'
  }
};

export const FRAMEWORKS = {
  laravel: {
    patterns: {
      controllers: /app\/Http\/Controllers\/(.+)\.php/,
      models: /app\/Models\/(.+)\.php/,
      migrations: /database\/migrations\/(.+)\.php/,
      seeds: /database\/seeders\/(.+)\.php/,
      factories: /database\/factories\/(.+)\.php/,
      requests: /app\/Http\/Requests\/(.+)\.php/,
      services: /app\/Services\/(.+)\.php/,
      repositories: /app\/Repositories\/(.+)\.php/,
      events: /app\/Events\/(.+)\.php/,
      listeners: /app\/Listeners\/(.+)\.php/,
      jobs: /app\/Jobs\/(.+)\.php/,
      mail: /app\/Mail\/(.+)\.php/,
      notifications: /app\/Notifications\/(.+)\.php/,
      policies: /app\/Policies\/(.+)\.php/,
      resources: /app\/Http\/Resources\/(.+)\.php/,
      rules: /app\/Rules\/(.+)\.php/,
      middleware: /app\/Http\/Middleware\/(.+)\.php/,
      views: /resources\/views\/(.+)\.blade\.php/,
      routes: /routes\/(.+)\.php/,
      config: /config\/(.+)\.php/,
      tests: /tests\/(.+)\.php/
    },
    scopes: [
      'controllers', 'models', 'migrations', 'seeds', 'factories', 
      'requests', 'services', 'repositories', 'events', 'listeners',
      'jobs', 'mail', 'notifications', 'policies', 'resources',
      'rules', 'middleware', 'views', 'routes', 'config', 'tests'
    ]
  },
  
  react: {
    patterns: {
      components: /src\/components\/(.+)\.(jsx|js|tsx|ts)/,
      hooks: /src\/hooks\/(.+)\.(js|ts)/,
      pages: /src\/pages\/(.+)\.(jsx|js|tsx|ts)/,
      store: /src\/store\/(.+)\.(js|ts)/,
      services: /src\/services\/(.+)\.(js|ts)/,
      utils: /src\/utils\/(.+)\.(js|ts)/,
      contexts: /src\/contexts\/(.+)\.(js|ts)/,
      constants: /src\/constants\/(.+)\.(js|ts)/,
      types: /src\/types\/(.+)\.(js|ts)/,
      styles: /src\/styles\/(.+)\.(css|scss|sass|less)/,
      tests: /src\/.*\.(test|spec)\.(js|jsx|ts|tsx)/
    },
    scopes: [
      'components', 'hooks', 'pages', 'store', 'services', 'utils',
      'contexts', 'constants', 'types', 'styles', 'tests'
    ]
  },

  vue: {
    patterns: {
      components: /src\/components\/(.+)\.vue/,
      views: /src\/views\/(.+)\.vue/,
      store: /src\/store\/(.+)\.(js|ts)/,
      composables: /src\/composables\/(.+)\.(js|ts)/,
      utils: /src\/utils\/(.+)\.(js|ts)/,
      plugins: /src\/plugins\/(.+)\.(js|ts)/,
      directives: /src\/directives\/(.+)\.(js|ts)/,
      assets: /src\/assets\/(.+)\.(css|scss|sass|less)/,
      tests: /src\/.*\.(test|spec)\.(js|ts)/
    },
    scopes: [
      'components', 'views', 'store', 'composables', 'utils',
      'plugins', 'directives', 'assets', 'tests'
    ]
  },

  django: {
    patterns: {
      views: /(\w+)\/views\.py/,
      viewsets: /(\w+)\/viewsets\.py/,
      models: /(\w+)\/models\.py/,
      serializers: /(\w+)\/serializers\.py/,
      urls: /(\w+)\/urls\.py/,
      admin: /(\w+)\/admin\.py/,
      forms: /(\w+)\/forms\.py/,
      services: /(\w+)\/services\.py/,
      signals: /(\w+)\/signals\.py/,
      tasks: /(\w+)\/tasks\.py/,
      middleware: /(\w+)\/middleware\.py/,
      templates: /templates\/(.+)\.html/,
      migrations: /migrations\/(.+)\.py/,
      tests: /(\w+)\/tests\.py/
    },
    scopes: [
      'views', 'viewsets', 'models', 'serializers', 'urls', 'admin',
      'forms', 'services', 'signals', 'tasks', 'middleware', 
      'templates', 'migrations', 'tests'
    ]
  },

  spring: {
    patterns: {
      controllers: /controller\/(.+)\.java/,
      services: /service\/(.+)\.java/,
      repositories: /repository\/(.+)\.java/,
      entities: /entity\/(.+)\.java/,
      dtos: /dto\/(.+)\.java/,
      config: /config\/(.+)\.java/,
      security: /security\/(.+)\.java/,
      exceptions: /exception\/(.+)\.java/,
      utils: /util\/(.+)\.java/,
      tests: /test\/(.+)\.java/
    },
    scopes: [
      'controllers', 'services', 'repositories', 'entities', 'dtos',
      'config', 'security', 'exceptions', 'utils', 'tests'
    ]
  },

  express: {
    patterns: {
      routes: /routes\/(.+)\.(js|ts)/,
      controllers: /controllers\/(.+)\.(js|ts)/,
      middleware: /middleware\/(.+)\.(js|ts)/,
      models: /models\/(.+)\.(js|ts)/,
      services: /services\/(.+)\.(js|ts)/,
      utils: /utils\/(.+)\.(js|ts)/,
      config: /config\/(.+)\.(js|ts)/,
      tests: /.*\.(test|spec)\.(js|ts)/
    },
    scopes: [
      'routes', 'controllers', 'middleware', 'models', 'services',
      'utils', 'config', 'tests'
    ]
  },

  flask: {
    patterns: {
      routes: /(\w+)\/routes\.py/,
      models: /(\w+)\/models\.py/,
      services: /(\w+)\/services\.py/,
      utils: /(\w+)\/utils\.py/,
      config: /config\.py/,
      templates: /templates\/(.+)\.html/,
      tests: /(\w+)\/tests\.py/
    },
    scopes: [
      'routes', 'models', 'services', 'utils', 'config', 'templates', 'tests'
    ]
  },

  rails: {
    patterns: {
      controllers: /app\/controllers\/(.+)\.rb/,
      models: /app\/models\/(.+)\.rb/,
      views: /app\/views\/(.+)\.erb/,
      services: /app\/services\/(.+)\.rb/,
      jobs: /app\/jobs\/(.+)\.rb/,
      mailers: /app\/mailers\/(.+)\.rb/,
      helpers: /app\/helpers\/(.+)\.rb/,
      tests: /test\/(.+)\.rb/,
      specs: /spec\/(.+)\.rb/
    },
    scopes: [
      'controllers', 'models', 'views', 'services', 'jobs', 'mailers',
      'helpers', 'tests', 'specs'
    ]
  }
};

export const LANGUAGE_PATTERNS = {
  javascript: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'],
    testPatterns: ['.test.', '.spec.']
  },
  typescript: {
    extensions: ['.ts', '.tsx', '.d.ts'],
    testPatterns: ['.test.', '.spec.']
  },
  php: {
    extensions: ['.php'],
    testPatterns: ['Test.php']
  },
  python: {
    extensions: ['.py', '.pyx'],
    testPatterns: ['_test.py', 'test_', '.spec.py']
  },
  java: {
    extensions: ['.java'],
    testPatterns: ['Test.java', 'test/']
  },
  go: {
    extensions: ['.go'],
    testPatterns: ['_test.go']
  },
  ruby: {
    extensions: ['.rb'],
    testPatterns: ['_spec.rb', '_test.rb']
  },
  csharp: {
    extensions: ['.cs'],
    testPatterns: ['Test.cs', 'Tests/']
  }
};
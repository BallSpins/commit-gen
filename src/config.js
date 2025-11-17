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

  symfony: {
    patterns: {
      controllers: /src\/Controller\/(.+)\.php/,
      entities: /src\/Entity\/(.+)\.php/,
      repositories: /src\/Repository\/(.+)\.php/,
      services: /src\/Service\/(.+)\.php/,
      forms: /src\/Form\/(.+)\.php/,
      events: /src\/Event\/(.+)\.php/,
      listeners: /src\/EventListener\/(.+)\.php/,
      commands: /src\/Command\/(.+)\.php/,
      migrations: /migrations\/(.+)\.php/,
      templates: /templates\/(.+)\.twig/,
      config: /config\/(.+)\.yaml/
    },
    scopes: [
      'controllers', 'entities', 'repositories', 'services', 'forms',
      'events', 'listeners', 'commands', 'migrations', 'templates', 'config'
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

  angular: {
    patterns: {
      components: /src\/app\/components\/(.+)\.(ts|html|scss)/,
      services: /src\/app\/services\/(.+)\.ts/,
      guards: /src\/app\/guards\/(.+)\.ts/,
      interceptors: /src\/app\/interceptors\/(.+)\.ts/,
      pipes: /src\/app\/pipes\/(.+)\.ts/,
      directives: /src\/app\/directives\/(.+)\.ts/,
      modules: /src\/app\/modules\/(.+)\.ts/,
      models: /src\/app\/models\/(.+)\.ts/,
      utils: /src\/app\/utils\/(.+)\.ts/,
      tests: /src\/.*\.spec\.ts/
    },
    scopes: [
      'components', 'services', 'guards', 'interceptors', 'pipes',
      'directives', 'modules', 'models', 'utils', 'tests'
    ]
  },

  nextjs: {
    patterns: {
      pages: /pages\/(.+)\.(jsx|js|tsx|ts)/,
      components: /components\/(.+)\.(jsx|js|tsx|ts)/,
      api: /pages\/api\/(.+)\.(js|ts)/,
      styles: /styles\/(.+)\.(css|scss|sass|less)/,
      utils: /utils\/(.+)\.(js|ts)/,
      hooks: /hooks\/(.+)\.(js|ts)/,
      store: /store\/(.+)\.(js|ts)/
    },
    scopes: [
      'pages', 'components', 'api', 'styles', 'utils', 'hooks', 'store'
    ]
  },

  nuxt: {
    patterns: {
      pages: /pages\/(.+)\.vue/,
      components: /components\/(.+)\.vue/,
      composables: /composables\/(.+)\.(js|ts)/,
      plugins: /plugins\/(.+)\.(js|ts)/,
      middleware: /middleware\/(.+)\.(js|ts)/,
      store: /store\/(.+)\.(js|ts)/,
      utils: /utils\/(.+)\.(js|ts)/,
      api: /api\/(.+)\.(js|ts)/
    },
    scopes: [
      'pages', 'components', 'composables', 'plugins', 'middleware', 
      'store', 'utils', 'api'
    ]
  },

  svelte: {
    patterns: {
      components: /src\/lib\/components\/(.+)\.svelte/,
      routes: /src\/routes\/(.+)\.svelte/,
      stores: /src\/stores\/(.+)\.(js|ts)/,
      utils: /src\/utils\/(.+)\.(js|ts)/,
      actions: /src\/actions\/(.+)\.(js|ts)/,
      tests: /src\/.*\.(test|spec)\.(js|ts)/
    },
    scopes: [
      'components', 'routes', 'stores', 'utils', 'actions', 'tests'
    ]
  },

  solidjs: {
    patterns: {
      components: /src\/components\/(.+)\.(jsx|js|tsx|ts)/,
      pages: /src\/pages\/(.+)\.(jsx|js|tsx|ts)/,
      stores: /src\/stores\/(.+)\.(js|ts)/,
      utils: /src\/utils\/(.+)\.(js|ts)/,
      api: /src\/api\/(.+)\.(js|ts)/
    },
    scopes: [
      'components', 'pages', 'stores', 'utils', 'api'
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

  nestjs: {
    patterns: {
      controllers: /src\/(.+)\.controller\.(ts|js)/,
      services: /src\/(.+)\.service\.(ts|js)/,
      modules: /src\/(.+)\.module\.(ts|js)/,
      entities: /src\/(.+)\.entity\.(ts|js)/,
      dtos: /src\/(.+)\.dto\.(ts|js)/,
      guards: /src\/(.+)\.guard\.(ts|js)/,
      interceptors: /src\/(.+)\.interceptor\.(ts|js)/,
      middleware: /src\/(.+)\.middleware\.(ts|js)/,
      tests: /.*\.spec\.(ts|js)/
    },
    scopes: [
      'controllers', 'services', 'modules', 'entities', 'dtos',
      'guards', 'interceptors', 'middleware', 'tests'
    ]
  },

  fastify: {
    patterns: {
      routes: /routes\/(.+)\.(js|ts)/,
      plugins: /plugins\/(.+)\.(js|ts)/,
      services: /services\/(.+)\.(js|ts)/,
      utils: /utils\/(.+)\.(js|ts)/,
      schemas: /schemas\/(.+)\.(js|ts)/
    },
    scopes: [
      'routes', 'plugins', 'services', 'utils', 'schemas'
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

  fastapi: {
    patterns: {
      routers: /routers\/(.+)\.py/,
      models: /models\/(.+)\.py/,
      schemas: /schemas\/(.+)\.py/,
      services: /services\/(.+)\.py/,
      dependencies: /dependencies\/(.+)\.py/,
      utils: /utils\/(.+)\.py/,
      tests: /tests\/(.+)\.py/
    },
    scopes: [
      'routers', 'models', 'schemas', 'services', 'dependencies', 'utils', 'tests'
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

  javafx: {
    patterns: {
      controllers: /controller\/(.+)\.java/,
      models: /model\/(.+)\.java/,
      views: /view\/(.+)\.fxml/,
      utils: /util\/(.+)\.java/
    },
    scopes: [
      'controllers', 'models', 'views', 'utils'
    ]
  },

  flutter: {
    patterns: {
      widgets: /lib\/widgets\/(.+)\.dart/,
      pages: /lib\/pages\/(.+)\.dart/,
      services: /lib\/services\/(.+)\.dart/,
      models: /lib\/models\/(.+)\.dart/,
      providers: /lib\/providers\/(.+)\.dart/,
      utils: /lib\/utils\/(.+)\.dart/,
      tests: /test\/(.+)\.dart/
    },
    scopes: [
      'widgets', 'pages', 'services', 'models', 'providers', 'utils', 'tests'
    ]
  },

  reactnative: {
    patterns: {
      components: /src\/components\/(.+)\.(jsx|js|tsx|ts)/,
      screens: /src\/screens\/(.+)\.(jsx|js|tsx|ts)/,
      navigation: /src\/navigation\/(.+)\.(js|ts)/,
      services: /src\/services\/(.+)\.(js|ts)/,
      utils: /src\/utils\/(.+)\.(js|ts)/,
      store: /src\/store\/(.+)\.(js|ts)/,
      tests: /src\/.*\.(test|spec)\.(js|ts)/
    },
    scopes: [
      'components', 'screens', 'navigation', 'services', 'utils', 'store', 'tests'
    ]
  },

  unity: {
    patterns: {
      scripts: /Assets\/Scripts\/(.+)\.cs/,
      scenes: /Assets\/Scenes\/(.+)\.unity/,
      prefabs: /Assets\/Prefabs\/(.+)\.prefab/,
      materials: /Assets\/Materials\/(.+)\.mat/,
      shaders: /Assets\/Shaders\/(.+)\.shader/
    },
    scopes: [
      'scripts', 'scenes', 'prefabs', 'materials', 'shaders'
    ]
  },

  godot: {
    patterns: {
      scripts: /src\/(.+)\.gd/,
      scenes: /scenes\/(.+)\.tscn/,
      resources: /resources\/(.+)\.tres/
    },
    scopes: [
      'scripts', 'scenes', 'resources'
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
  },

  gin: {
    patterns: {
      handlers: /handlers\/(.+)\.go/,
      services: /services\/(.+)\.go/,
      models: /models\/(.+)\.go/,
      middleware: /middleware\/(.+)\.go/,
      utils: /utils\/(.+)\.go/
    },
    scopes: [
      'handlers', 'services', 'models', 'middleware', 'utils'
    ]
  },

  echo: {
    patterns: {
      handlers: /handlers\/(.+)\.go/,
      services: /services\/(.+)\.go/,
      models: /models\/(.+)\.go/,
      middleware: /middleware\/(.+)\.go/
    },
    scopes: [
      'handlers', 'services', 'models', 'middleware'
    ]
  },

  // .NET Frameworks
  aspnet: {
    patterns: {
      controllers: /Controllers\/(.+)\.cs/,
      models: /Models\/(.+)\.cs/,
      services: /Services\/(.+)\.cs/,
      views: /Views\/(.+)\.cshtml/,
      viewmodels: /ViewModels\/(.+)\.cs/,
      repositories: /Repositories\/(.+)\.cs/,
      middleware: /Middleware\/(.+)\.cs/
    },
    scopes: [
      'controllers', 'models', 'services', 'views', 'viewmodels', 
      'repositories', 'middleware'
    ]
  }
};

export const LANGUAGE_PATTERNS = {
  javascript: {
    extensions: ['.js', '.jsx', '.mjs', '.cjs'],
    testPatterns: ['.test.', '.spec.', 'test/', '__tests__/']
  },
  typescript: {
    extensions: ['.ts', '.tsx', '.d.ts', '.mts', '.cts'],
    testPatterns: ['.test.', '.spec.', 'test/', '__tests__/']
  },
  php: {
    extensions: ['.php', '.php4', '.php5', '.php7', '.phtml'],
    testPatterns: ['Test.php', 'test/', 'tests/', 'TestCase.php']
  },
  python: {
    extensions: ['.py', '.pyw', '.pyx', '.pyc', '.pyo', '.pyd'],
    testPatterns: ['_test.py', 'test_', '.spec.py', 'tests/']
  },
  java: {
    extensions: ['.java', '.class', '.jar'],
    testPatterns: ['Test.java', 'test/', 'tests/', 'IT.java', 'TestCase.java']
  },
  go: {
    extensions: ['.go', '.mod', '.sum'],
    testPatterns: ['_test.go', '_suite_test.go', 'test/']
  },
  ruby: {
    extensions: ['.rb', '.rbw', '.rake', '.gemspec'],
    testPatterns: ['_spec.rb', '_test.rb', 'spec/', 'test/']
  },
  csharp: {
    extensions: ['.cs', '.csx'],
    testPatterns: ['Test.cs', 'Tests/', 'test/', 'Spec.cs']
  },
  cpp: {
    extensions: ['.cpp', '.cc', '.cxx', '.c++', '.h', '.hpp', '.hh', '.hxx'],
    testPatterns: ['_test.', '_spec.', 'test/', 'tests/']
  },
  c: {
    extensions: ['.c', '.h'],
    testPatterns: ['_test.', '_spec.', 'test/', 'tests/']
  },
  rust: {
    extensions: ['.rs', '.rlib'],
    testPatterns: ['_test.rs', '_spec.rs', 'tests/']
  },
  swift: {
    extensions: ['.swift'],
    testPatterns: ['Test.swift', 'Tests/', 'test/']
  },
  kotlin: {
    extensions: ['.kt', '.kts'],
    testPatterns: ['Test.kt', 'test/', 'tests/']
  },
  scala: {
    extensions: ['.scala', '.sc'],
    testPatterns: ['Test.scala', 'Spec.scala', 'test/', 'tests/']
  },
  perl: {
    extensions: ['.pl', '.pm', '.t'],
    testPatterns: ['.t', '_test.pl', 'test/']
  },
  r: {
    extensions: ['.r', '.R', '.Rmd'],
    testPatterns: ['_test.R', 'test_', 'tests/']
  },
  haskell: {
    extensions: ['.hs', '.lhs'],
    testPatterns: ['Test.hs', 'Spec.hs', 'test/']
  },
  elixir: {
    extensions: ['.ex', '.exs'],
    testPatterns: ['_test.exs', 'test/']
  },
  clojure: {
    extensions: ['.clj', '.cljs', '.cljc'],
    testPatterns: ['_test.clj', 'test/']
  },
  erlang: {
    extensions: ['.erl', '.hrl'],
    testPatterns: ['_test.erl', '_SUITE.erl', 'test/']
  },
  dart: {
    extensions: ['.dart'],
    testPatterns: ['_test.dart', 'test/']
  },
  lua: {
    extensions: ['.lua'],
    testPatterns: ['_test.lua', 'spec/', 'test/']
  },
  shell: {
    extensions: ['.sh', '.bash', '.zsh', '.fish'],
    testPatterns: ['.test.', '_test.', 'test/']
  },
  html: {
    extensions: ['.html', '.htm', '.xhtml'],
    testPatterns: ['.test.', '_test.', 'test/']
  },
  css: {
    extensions: ['.css', '.scss', '.sass', '.less', '.styl'],
    testPatterns: ['.test.', '_test.', 'test/']
  },
  sql: {
    extensions: ['.sql', '.psql'],
    testPatterns: ['_test.sql', 'test/']
  },
  yaml: {
    extensions: ['.yaml', '.yml'],
    testPatterns: ['.test.', '_test.']
  },
  json: {
    extensions: ['.json'],
    testPatterns: ['.test.', '_test.']
  },
  xml: {
    extensions: ['.xml', '.xsd', '.xsl'],
    testPatterns: ['.test.', '_test.']
  },
  markdown: {
    extensions: ['.md', '.markdown'],
    testPatterns: []
  },
  docker: {
    extensions: ['Dockerfile', '.dockerignore'],
    testPatterns: []
  },
  makefile: {
    extensions: ['Makefile', '.mk'],
    testPatterns: []
  },
  config: {
    extensions: ['.env', '.ini', '.cfg', '.conf', '.properties'],
    testPatterns: []
  }
};
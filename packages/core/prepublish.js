const fs = require('fs')
const pkg = require('./package.json')

const {
  version,
  description,
  main,
  module: pkgModule,
  exports: pkgExports,
  name,
  bugs,
  types,
  dependencies,
  peerDependencies,
  scripts,
  repository,
  files,
  publishConfig,
} = pkg

const env = (process.env.ENVIRONMENT || 'staging').replace('refs/heads/', '');

const tag = env === 'main' ? 'latest' : env;

fs.writeFileSync(
  './package.json',
  JSON.stringify(
    {
      name: process.env.GHR === 'true' ? '@dyte-in/ui-kit' : '@dytesdk/ui-kit',
      version,
      description,
      main,
      module: pkgModule,
      exports: pkgExports,
      types,
      bugs,
      private: false,
      peerDependencies,
      publishConfig: (process.env.GHR === 'true' || !env.includes('main'))
        ? { tag } : publishConfig,
      scripts: {
        start: scripts.start,
        postpublish: scripts.postpublish,
      },
      repository: process.env.GHR === 'true' ? repository : undefined,
      files,
    },
    null,
    2
  )
)

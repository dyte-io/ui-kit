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
  peerDependencies,
  scripts,
  repository,
  files,
  publishConfig
} = pkg

const dependencies = {
  ...pkg.dependencies,
  "@dytesdk/ui-kit": `^${version}`
}

const env = (process.env.ENVIRONMENT || 'staging').replace('refs/heads/', '');

const tag = env === 'main' ? 'latest' : env;

fs.writeFileSync(
  './package.json',
  JSON.stringify(
    {
      name: process.env.GHR === 'true' ? '@dyte-in/vue-ui-kit' : '@dytesdk/vue-ui-kit',
      version,
      description,
      main,
      module: pkgModule,
      exports: pkgExports,
      types,
      bugs,
      private: false,
      dependencies,
      peerDependencies,
      scripts: {
        start: scripts.start,
        postpublish: scripts.postpublish,
      },
      repository: process.env.GHR === 'true' ? repository : undefined,
      files,
      publishConfig: (process.env.GHR === 'true' || !env.includes('main'))
        ? { tag } : publishConfig,
    },
    null,
    2
  )
)

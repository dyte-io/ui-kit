const fs = require('fs')
const pkg = require('./package.json')


const dependencies = {
  ...pkg.dependencies,
  "@dytesdk/ui-kit": pkg.version
}

const env = (process.env.ENVIRONMENT || 'staging').replace('refs/heads/','');

const tag = env == 'main' ? 'latest' : env;

try {
  fs.unlinkSync('./dist/package.json');
} catch { }

fs.writeFileSync(
  './package.json',
  JSON.stringify(
    {
      ...pkg,
      dependencies,
      "module": "dist/fesm2015/dytesdk-angular-ui-kit.mjs",
      "es2020": "dist/fesm2020/dytesdk-angular-ui-kit.mjs",
      "esm2020": "dist/esm2020/dytesdk-angular-ui-kit.mjs",
      "fesm2020": "dist/fesm2020/dytesdk-angular-ui-kit.mjs",
      "fesm2015": "dist/fesm2015/dytesdk-angular-ui-kit.mjs",
      "typings": "dist/dytesdk-angular-ui-kit.d.ts",
      "exports": {
        "./package.json": {
          "default": "./package.json"
        },
        ".": {
          "types": "./dist/dytesdk-angular-ui-kit.d.ts",
          "esm2020": "./dist/esm2020/dytesdk-angular-ui-kit.mjs",
          "es2020": "./dist/fesm2020/dytesdk-angular-ui-kit.mjs",
          "es2015": "./dist/fesm2015/dytesdk-angular-ui-kit.mjs",
          "node": "./dist/fesm2015/dytesdk-angular-ui-kit.mjs",
          "default": "./dist/fesm2020/dytesdk-angular-ui-kit.mjs"
        }
      },
      "sideEffects": false,
      name: process.env.GHR === 'true' ? '@dyte-in/angular-ui-kit' : '@dytesdk/angular-ui-kit',
      repository: process.env.GHR === 'true' ? repository : undefined,
      publishConfig: (process.env.GHR === 'true' || !env.includes('main'))
        ? { tag } : pkg.publishConfig,
    },
    null,
    2
  )
)

const fs = require('fs')
const glob = require('glob')
const path = require('path')
const components = glob
    .sync(__dirname + '/../src/components/**/*.vue')
    .map(it => it.replace(/.vue$/, '').split('../src/components/')[1])
    .map(it => (
        { name: it.split('/').pop(), path: it + '.vue' }
    ))

fs.writeFileSync(
    path.join(__dirname, '../src/index.js'),
    `/* this file is auto-generated */

${components
        .map(it => `import ${it.name} from './components/${it.path}'`)
        .join('\n')}

export { ${components.map(it => it.name).join(', ')} }

function install(Vue) {
${components
        .map(it => `    Vue.component('${it.name}', ${it.name})`)
        .join('\n')}
}

export default { install }
`
)

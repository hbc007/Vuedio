const { interpolateName } = require('loader-utils')

module.exports = function(content) {
    const componentName = interpolateName(this, '[name]', { content })
    return content.replace(
        'export default',
        `if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('${componentName}', component.exports)
}
export default`
    )
}

import PapTreeGrid from './components/base/treeGrid.vue'

const install = (Vue, opts = {}) => {
    Vue.component(PapTreeGrid.name, PapTreeGrid)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default { PapTreeGrid, install }

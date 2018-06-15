import PapBaseTable from './components/base/basetable.vue'

const install = (Vue, opts = {}) => {
    Vue.component(PapBaseTable.name, PapBaseTable)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default { PapBaseTable, install }

import PapDynamicTable from './components/pap-dynamic-table.vue'

const install = (Vue, opts = {}) => {
    Vue.component(PapDynamicTable.name, PapDynamicTable)
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default { PapDynamicTable, install }

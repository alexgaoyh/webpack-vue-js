import PapElSearchForm from './components/pap-el-search-form.vue'

const install = (Vue, opts = {}) => {
    Vue.component(PapElSearchForm.name, PapElSearchForm)
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default { PapElSearchForm, install }

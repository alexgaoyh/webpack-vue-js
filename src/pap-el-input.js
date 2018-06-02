import PapElInput from './components/pap-el-input.vue'

const install = (Vue, opts = {}) => {
    Vue.component(PapElInput.name, PapElInput)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default { PapElInput, install }

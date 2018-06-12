import PapRbacUser from './components/pap-rbac-user.vue'
import VModal from 'vue-js-modal';

const install = (Vue, opts = {}) => {
    Vue.use(VModal)
    Vue.component(PapRbacUser.name, PapRbacUser)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default { PapRbacUser, install }

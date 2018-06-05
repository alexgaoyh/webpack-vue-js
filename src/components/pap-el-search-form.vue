<template>
    <el-form :inline="inline" ref="form" @submit.native.prevent="searchHandler()">
        <el-form-item v-for="(form, index) in forms" :key="index"
                      :label="form.label" :rules="form.rules || []"
                      :label-width="form.labelWidth ? (form.labelWidth + 'px') : ''">
            <el-input v-if="form.type == 'text' || form.type == undefined"
                      v-model="form.value"
                      :size="form.size ? form.size : size"
                      :readonly="form.readonly"
                      :disabled="form.disabled"
                      :placeholder="form.placeholder"
                      :style="itemStyle + (form.itemWidth ? `width: ${form.itemWidth}px;` : '')" ></el-input>
            <v-select v-if="form.type == 'select'" v-model="form.value"
                       :size="form.size ? form.size : size" :options="form.options"
                       :label="form.optionLabel" :value="form.optionValue"
                       :readonly="form.readonly"
                       :disabled="form.disabled"
                       :placeholder="form.placeholder"
                       :style="itemStyle + (form.itemWidth ? `width: ${form.itemWidth}px;` : '')" >
            </v-select>
            <datepicker  v-if="form.type == 'date'" v-model="form.value"
                         :language="dateLanguage" :format="dateFormat"
                         :size="form.size ? form.size : size" :options="form.options"
                         :label="form.optionLabel" :value="form.optionValue"
                         :readonly="form.readonly"
                         :disabled="form.disabled"
                         :placeholder="form.placeholder"
                         :style="itemStyle + (form.itemWidth ? `width: ${form.itemWidth}px;` : '')" ></datepicker>
        </el-form-item>
    </el-form>
</template>
<script>
    import ElForm from "../../node_modules/element-ui/packages/form/src/form";
    import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item";
    import ElInput from "../../node_modules/element-ui/packages/input/src/input";
    import vSelect from 'vue-select'
    import Datepicker from 'vuejs-datepicker';
    import {zh} from 'vuejs-datepicker/dist/locale'

    export default {
        components: { vSelect, Datepicker, ElInput, ElFormItem, ElForm},
        name: 'papelsearchform',
        props: {
            size: {
                type: String,
                default: ''
            },
            showResetBtn: {
                type: Boolean,
                default: false
            },
            inline: {
                type: Boolean,
                default: false
            },
            itemWidth: Number,
            submitHandler: Function,
            submitLoading: {
                type: Boolean,
                default: false
            },
            submitBtnText: {
                type: String,
                default: '查询'
            },
            resetBtnText: {
                type: String,
                default: '重置'
            },
            forms: {
                type: Array,
                required: true
            }
        },
        data () {
            return{
                dateLanguage: zh,
                dateFormat: 'yyyy-MM-dd'
            }
        },
        computed: {
            itemStyle () {
                const { itemWidth } = this
                if (itemWidth) {
                    return `width: ${itemWidth}px;`
                }
                return ''
            }
        },
        methods: {

        }
    }
</script>

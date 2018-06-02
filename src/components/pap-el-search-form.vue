<template>
    <el-form :model="params" :inline="inline" ref="form" @submit.native.prevent="searchHandler()"
             :label-width="labelWidth ? (labelWidth + 'px') : ''">
        <el-form-item v-for="(form, index) in forms" :key="index"
                      :prop="form.itemType != 'daterange' ? form.prop : (datePrefix + index)"
                      :label="form.label" :rules="form.rules || []"
                      :label-width="form.labelWidth ? (form.labelWidth + 'px') : ''">
            <el-input v-if="form.itemType === 'input' || form.itemType === undefined"
                      v-model="params[form.modelValue]"
                      :size="form.size ? form.size : size"
                      :readonly="form.readonly"
                      :disabled="form.disabled"
                      :placeholder="form.placeholder"
                      :style="itemStyle + (form.itemWidth ? `width: ${form.itemWidth}px;` : '')" ></el-input>
        </el-form-item>
    </el-form>
</template>
<script>
    import ElForm from "../../node_modules/element-ui/packages/form/src/form";
    import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item";
    import ElInput from "../../node_modules/element-ui/packages/input/src/input";

    export default {
        components: {ElInput, ElFormItem, ElForm},
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
            fuzzy: {
                type: Boolean,
                default: false
            },
            labelWidth: Number,
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
            const { forms, fuzzy } = this.$props
            const datePrefix = 'daterange-prefix'
            const selectOptionPrefix = 'select-option-prefix'
            let dataObj = {
                selectOptions: {}
            }
            let params = {}
            let format = {}
            let fuzzyOps = {}
            forms.forEach((v, i) => {
                const propType = typeof v.prop
                if (propType === 'string') {
                    v.modelValue = v.prop
                    params[v.prop] = ''
                    fuzzyOps[v.prop] = v.fuzzy ? v.fuzzy : fuzzy
                    if (v.format) {
                        format[v.prop] = v.format
                    }
                } else if (propType === 'object' && Object.prototype.toString.call(v.prop) === '[object Array]') {
                    v.prop.forEach(vv => {
                        params[vv] = ''
                        if (v.format) {
                            format[vv] = v.format
                        }
                        fuzzyOps[vv] = v.fuzzy ? v.fuzzy : fuzzy
                    })
                }
                if (v.itemType === 'daterange') {
                    params[datePrefix + i] = ''
                    v.modelValue = datePrefix + i
                }
            })
            return {
                params,
                datePrefix,
                selectOptionPrefix,
                dataObj,
                format,
                fuzzyOps
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
            isArray (value) {
                return typeof value === 'object' && Object.prototype.toString.call(value) === '[object Array]'
            },
            searchHandler () {
                this.getParams((error, params) => {
                    if (!error) {
                        const { submitHandler } = this
                        if (submitHandler) {
                            submitHandler(params)
                        } else {
                            throw new Error('Need to set attribute: submitHandler !')
                        }
                    }
                })
            },
            getParamFuzzy () {
                return this.fuzzyOps
            },
            getParams (callback) {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        const { params, datePrefix, format } = this
                        let formattedForm = {}
                        Object.keys(params).forEach(v => {
                            if (v.indexOf(datePrefix) === -1) {
                                formattedForm[v] = format[v] ? format[v](params[v], v) : params[v]
                            }
                        })
                        if (callback) callback(null, formattedForm)
                    } else {
                        if (callback) callback(new Error())
                    }
                })
            },
            resetForm () {
                this.$refs['form'].resetFields()
            },
            changeDate (date, startDate, endDate) {
                let dates
                if (date === null) {
                    this.params[startDate] = ''
                    this.params[endDate] = ''
                    return
                }
                if (typeof date === 'string') {
                    dates = date.split(' - ')
                } else if (date && date.hasOwnProperty('length')) {
                    const firstDate = date[0]
                    const secondDate = date[1]
                    dates = [
                        `${firstDate.getFullYear()}-${('0' + (firstDate.getMonth() + 1)).substr(-2)}-${('0' + firstDate.getDate()).substr(-2)}`,
                        `${secondDate.getFullYear()}-${('0' + (secondDate.getMonth() + 1)).substr(-2)}-${('0' + secondDate.getDate()).substr(-2)}`
                    ]
                }
                this.params[startDate] = dates[0]
                this.params[endDate] = dates[1]
            },
            getRemoteData ({ fetch, dataKey, resultField, resultHandler }) {
                fetch().then(response => {
                    let result = response
                    if (typeof response === 'object' && !this.isArray(response)) {
                        if (resultField.indexOf('.') !== -1) {
                            resultField.split('.').forEach(vv => {
                                result = result[vv]
                            })
                        } else {
                            result = response[resultField]
                        }
                    }
                    if (!result || !(result instanceof Array)) {
                        console.warn(`The result of key:${resultField} is not Array. 接口返回的字段:${resultField} 不是一个数组`)
                    }
                    if (this.resultHandler) {
                        this.selectOptions[dataKey] = result.map(this.resultHandler)
                    } else {
                        this.selectOptions[dataKey] = result
                    }
                })
            }
        }
    }
</script>

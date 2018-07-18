<template>
    <div class="app-container calendar-list-container">
        <table>
            <tbody >
                <tr>
                    <th v-for="(column, columnIndex) in columns" >{{column.label}}</th>
                </tr>
                <tr v-for="(item, itemIndex) in tableDataTemp">
                    <td v-for="(column, columnIndex) in columns" >
                        <input type="text" v-model="item[columnIndex].value"
                               v-if="item[columnIndex].name === column.key && item[columnIndex].type==='input'"
                               @blur="inputBlur(itemIndex, item, columnIndex, column)"
                        />
                        <select v-model="item[columnIndex].value"
                                v-if="item[columnIndex].name === column.key && item[columnIndex].type==='select'"
                                @change="selectOnChange(itemIndex, item, columnIndex, column)">
                            <option v-for="option in item[columnIndex].options" v-bind:value="option.value" >
                                {{option.text}}
                            </option>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default {
        name: 'papdynamictable',
        props: {
            columns: {
                type: Array,
                default: function () {
                    return []
                }
            },
            tableData: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        watch: {
            tableData: function() {
                console.log('watch tableData')
                this.tableDataTemp = this.tableData
            }
        },
        data () {
            return {
                tableDataTemp: []
            }
        },
        created () {
            this.tableDataTemp = this.tableData
            console.log('created')
        },
        methods: {
            inputBlur(itemIndex, item, columnIndex, column){
                console.log({itemIndex: itemIndex, item: item, columnIndex: columnIndex, column: column});
                var obj = {itemIndex: itemIndex, item: item, columnIndex: columnIndex, column: column};
                this.$emit('input-blur-emit', obj)
            },
            selectOnChange(itemIndex, item, columnIndex, column){
                console.log({itemIndex: itemIndex, item: item, columnIndex: columnIndex, column: column});
                var obj = {itemIndex: itemIndex, item: item, columnIndex: columnIndex, column: column};
                this.$emit('select-on-change-emit', obj)
            }
        }
    }
</script>
<style scoped="scoped">
</style>
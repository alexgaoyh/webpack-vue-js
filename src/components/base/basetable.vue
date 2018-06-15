<template>
    <div class="app-container calendar-list-container">
        <v-table
                columns-width-drag is-horizontal-resize is-vertical-resize
                style="width:100%"
                :is-loading="isLoading" :columns="columns"
                :table-data="tableDataTemp"
                row-hover-color="#eee" row-click-color="#edf7ff"
                :select-all="selectAll"
                :select-change="selectChange"
                :select-group-change="selectGroupChange"
        ></v-table>

        <div class="mt20 mb20 bold">
            <v-pagination @page-change="pageChange" @page-size-change="pageSizeChange"
                          :total="pageTotal" :page-size="papPageSize" :pageSizeOption="papPageSizeOption"
                          :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']">
            </v-pagination>
        </div>

    </div>
</template>
<script>
    // 引入样式
    import 'vue-easytable/libs/themes-base/index.css'
    // 导入 table 和 分页组件
    import {VTable,VPagination} from 'vue-easytable'

    export default {
        components: {VTable, VPagination},
        name: 'papbasetable',
        props: {
            papPageSize:  {
                type: Number,
                default: 30
            },
            papPageSizeOption: {
                type: Array,
                default: function () {
                    return [10, 20, 30, 50, 100]
                }
            },
            pageTotal: {
                type: Number,
                default: 0
            },
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
            },
            isLoading: {
                type: Boolean,
                default: false
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
                tableSelectedData: [],
                tableDataTemp: []
            }
        },
        created () {
            console.log('created')
        },
        methods: {
            selectAll(selection){
                this.tableSelectedData = selection;
                this.$emit('select-all', this.tableSelectedData)
            },
            selectChange(selection,rowData){
                this.tableSelectedData = selection;
                this.$emit('select-change', this.tableSelectedData, rowData)
            },
            selectGroupChange(selection){
                this.tableSelectedData = selection;
                this.$emit('select-group-change', this.tableSelectedData)
            },
            pageChange(pageIndex){
                this.$emit('page-change', pageIndex)
            },
            pageSizeChange(pageSize){
                this.$emit('page-size-change', pageSize)
            }
        }
    }
</script>
<style scoped="scoped">
    .v-table-views {
        height: 500px;
    }
    .title-cell-class-name-test1 {
        background-color: #2db7f5;
        color:#fff;
    }
    .title-cell-class-name-test2 {
        background-color: #f60;
        color:#fff;
    }
</style>
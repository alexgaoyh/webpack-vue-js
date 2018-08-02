<template>
    <div class="app-container calendar-list-container">
        <!-- 搜索相关 -->
        <div class="filter-container">
            <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户名称" v-model="listQuery.name" ></el-input>
            <el-button class="filter-item" style="margin-left: 10px;"type="primary" icon="edit" @click="handleFilter">搜索</el-button>
            <el-button class="filter-item" style="margin-left: 10px;"type="primary" icon="search" @click="handleAdd">添加</el-button>
            <el-button class="filter-item" style="margin-left: 10px;"type="primary" icon="search" @click="handleUpdate">修改</el-button>
            <el-button class="filter-item" style="margin-left: 10px;"type="primary" icon="search" @click="handleDelete">删除</el-button>
            <el-button class="filter-item" style="margin-left: 10px;" :type="action.type" icon="search"
                       @click="operActionClick(action.type, action.text)" v-for='action in operActionProps'
                       :key="action.text">{{action.text}}</el-button>
        </div>

        <v-table
                columns-width-drag is-horizontal-resize is-vertical-resize
                style="width:100%"
                :is-loading="isLoading" :columns="columns"
                :table-data="tableData"
                row-hover-color="#eee" row-click-color="#edf7ff"
                :select-all="selectALL"
                :select-change="selectChange"
                :select-group-change="selectGroupChange"
        ></v-table>

        <div class="mt20 mb20 bold">
            <v-pagination @page-change="pageChange" @page-size-change="pageSizeChange"
                          :total="listQuery.total" :page-size="papPageSize" :pageSizeOption="papPageSizeOption"
                          :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']">
            </v-pagination>
        </div>

        <modal name="userModal" :height="500">
            <el-form class="pap-rbac-user-modal small-space" :model="temp"  label-position="left" label-width="70px">
                <el-input type="hidden" v-model="temp.id"></el-input>
                <el-form-item label="用户编码">
                    <el-input placeholder="请输入内容" v-model="temp.code" v-bind:readonly="dialogReadType">
                    </el-input>
                </el-form-item>
                <el-form-item label="用户名称">
                    <el-input placeholder="请输入内容" v-model="temp.name" v-bind:readonly="dialogReadType">
                    </el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input placeholder="请输入内容" v-model="temp.mobile" v-bind:readonly="dialogReadType">
                    </el-input>
                </el-form-item>
                <el-form-item label="用户密码">
                    <el-input type="password" placeholder="请输入内容" v-model="temp.passwords" v-bind:readonly="dialogReadType">
                    </el-input>
                </el-form-item>
                <el-button class="filter-item" style="margin-left: 10px; text-align: center;" type="primary" icon="edit" @click="closeUserAdd">关闭</el-button>
                <el-button class="filter-item" style="margin-left: 10px; text-align: center;" type="primary" icon="search" @click="userModalSaveOrUpdate">保存</el-button>
            </el-form>
        </modal>

    </div>
</template>
<script>
    import ElInput from "../../node_modules/element-ui/packages/input/src/input";
    import ElButton from "../../node_modules/element-ui/packages/button/src/button";
    import ElForm from "../../node_modules/element-ui/packages/form/src/form";
    import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item";
    import Qs from 'qs'
    import {post} from '../util/http';
    Vue.prototype.$post = post;
    // 引入样式
    import 'vue-easytable/libs/themes-base/index.css'
    // 导入 table 和 分页组件
    import {VTable,VPagination} from 'vue-easytable'
    import mixins from './base/mixins.vue'


    export default {
        components: {ElFormItem, ElForm, ElButton, ElInput, VTable, VPagination},
        mixins: [mixins],
        name: 'paprbacuser',
        props: {
            baseUrl: {
                type: String,
                default: ''
            },
            operActionProps: Array
        },
        data () {
            return {
                listQuery: {
                    page: 1,
                    rows: 10,
                    name: '',
                    total: 0
                },
                dialogReadType: false,
                temp: {

                },
                isLoading: false,
                tableData: [
                ],
                // 表格选中的值
                tableSelectedData: [],
                columns: [
                    {width: 30, titleAlign: 'center',columnAlign:'center',type: 'selection',isResize:true},
                    {field: 'code', title:'用户编码', width: 100, titleAlign: 'center',columnAlign:'center',isResize:true},
                    {field: 'name', title:'姓名', width: 300, titleAlign: 'center',columnAlign:'center',isResize:true},
                    {field: 'mobile', title: '手机号码', width: 300, titleAlign: 'center',columnAlign:'center'}
                ]

            }
        },
        created () {
            // 分页框页面通用
            this.listQuery.rows = this.papPageSize
            this.getList()
        },
        methods: {
            operActionClick(type, text) {
                this.$emit('on-outer-click', this.tableSelectedData, type, text)
            },
            handleAdd () {
                this.temp = {};
                this.$modal.show('userModal');
            },
            handleUpdate () {
                var _this = this;
                if(this.tableSelectedData && this.tableSelectedData.length !== 1) {
                    alert('请选择一条记录进行操作!');
                } else {
                    this.$post(this.baseUrl + '/v1/rbac/user/' + this.tableSelectedData[0].id, {}).then((response) => {
                        // 这里是处理正确的回调
                        console.log(response)
                        if(response.code === '200') {
                            _this.temp = response.data;
                            this.$modal.show('userModal');
                        }
                    }).catch(err => {
                        console.log(err)
                        _this.$message.error(err)
                    })
                }
            },
            handleDelete () {
                var _this = this;
                if(this.tableSelectedData && this.tableSelectedData.length !== 1) {
                    alert('请选择一条记录进行操作!');
                } else {
                    var formData = {
                        deleteJSON: JSON.stringify(this.tableSelectedData[0])
                    }
                    this.$post(this.baseUrl + '/v1/rbac/user/delete', Qs.stringify(formData)).then((response) => {
                        // 这里是处理正确的回调
                        console.log(response)
                        if(response.code === '200') {
                            _this.getList()
                        }
                    }).catch(err => {
                        console.log(err)
                        _this.$message.error(err)
                    })
                }
            },
            handleRoleEdit () {
                
            },
            getList () {
                var _this = this;
                var formData = {
                    queryJSON: JSON.stringify(this.listQuery),
                    pageJSON: JSON.stringify(this.listQuery)
                }
                this.$post(this.baseUrl + '/v1/rbac/user/querypage', Qs.stringify(formData)).then((response) => {
                    // 这里是处理正确的回调
                    console.log(response)
                    if(response.code === '200') {
                        _this.tableData = response.list
                        _this.listQuery.total = response.page.total
                    }
                }).catch(err => {
                    console.log(err)
                    alert(err)
                })
            },
            closeUserAdd () {
                this.$modal.hide('userModal');
            },
            userModalSaveOrUpdate () {
                var _this = this;
                if(this.temp && this.temp.id != undefined && this.temp.id != '') {
                    var updateFormData = {
                        updateJSON: JSON.stringify(this.temp)
                    }
                    this.$post(this.baseUrl + '/v1/rbac/user/update', Qs.stringify(updateFormData)).then((response) => {
                        // 这里是处理正确的回调
                        console.log(response)
                        if(response.code === '200') {
                            _this.$modal.hide('userModal');
                            _this.getList()
                        }
                    }).catch(err => {
                        console.log(err)
                        alert(err)
                    })
                } else {
                    var addFormData = {
                        addJSON: JSON.stringify(this.temp)
                    }
                    this.$post(this.baseUrl + '/v1/rbac/user/add', Qs.stringify(addFormData)).then((response) => {
                        // 这里是处理正确的回调
                        console.log(response)
                        if(response.code === '200') {
                            _this.$modal.hide('userModal');
                            _this.getList()
                        }
                    }).catch(err => {
                        console.log(err)
                        alert(err)
                    })
                }
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
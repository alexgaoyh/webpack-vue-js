<template>
    <div class="app-container calendar-list-container">
        <!-- 搜索相关 -->
        <div class="filter-container">
            <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户名称" v-model="listQuery.name" ></el-input>
            <el-button class="filter-item" style="margin-left: 10px;"type="primary" icon="edit" @click="handleFilter">搜索</el-button>
            <el-button class="filter-item" style="margin-left: 10px;"type="primary" icon="search" @click="handleAdd">添加</el-button>
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="edit" @click="handleRoleEdit">
                角色配置
            </el-button>
        </div>

        <v-table
                columns-width-drag is-horizontal-resize
                style="width:100%"
                :is-loading="isLoading" :columns="columns"
                :table-data="tableData"
                :show-vertical-border="false" row-hover-color="#eee" row-click-color="#edf7ff"
                :select-all="selectALL"
                :select-change="selectChange"
                :select-group-change="selectGroupChange"
        ></v-table>

        <div class="mt20 mb20 bold">
            <v-pagination @page-change="pageChange" @page-size-change="pageSizeChange"
                          :total="listQuery.total" :page-size="pageSize" :pageSizeOption="pageSizeOption"
                          :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']">
            </v-pagination>
        </div>

        <modal name="userModal" :height="400">
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
            }
        },
        data () {
            return {
                listQuery: {
                    page: 1,
                    rows: 10,
                    name: '',
                    total: 1
                },
                dialogReadType: false,
                temp: {

                },
                isLoading: false,
                tableData: [
                    {name:'赵伟',tel:'156*****1987',hobby:'钢琴、书法、唱歌',address:'上海市黄浦区金陵东路569号17楼'}
                ],
                columns: [
                    {width: 30, titleAlign: 'center',columnAlign:'center',type: 'selection',isResize:true},
                    {field: 'name', title:'姓名', width: 50, titleAlign: 'center',columnAlign:'center',isResize:true},
                    {field: 'tel', title: '手机号码', width: 100, titleAlign: 'center',columnAlign:'center',isResize:true},
                    {field: 'hobby', title: '爱好', width: 230, titleAlign: 'center',columnAlign:'center',isResize:true},
                    {field: 'address', title: '地址', width: 308, titleAlign: 'center',columnAlign:'left'}
                ]

            }
        },
        created () {
            this.getList()
        },
        methods: {
            selectALL(selection){
                console.log('select-aLL',selection);
            },
            selectChange(selection,rowData){
                console.log('select-change',selection, rowData);
            },
            selectGroupChange(selection){
                console.log('select-group-change',selection);
            },
            pageChange(pageIndex){
                this.pageIndex = pageIndex;
                this.getTableData();
                console.log(pageIndex)
            },
            pageSizeChange(pageSize){
                this.pageIndex = 1;
                this.pageSize = pageSize;
                this.getTableData();
            },
            // 顶部的统一搜索处理
            handleFilter () {
                this.getList()
            },
            handleAdd () {
                this.$modal.show('userModal');
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
                }).catch(err => {
                    console.log(err)
                    _this.$message.error(err)
                })
            },
            closeUserAdd () {
                this.$modal.hide('userModal');
            },
            userModalSaveOrUpdate () {

            }
        }
    }
</script>
<style scoped="scoped">
    .title-cell-class-name-test1 {
        background-color: #2db7f5;
        color:#fff;
    }
    .title-cell-class-name-test2 {
        background-color: #f60;
        color:#fff;
    }
</style>
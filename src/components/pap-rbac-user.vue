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

    export default {
        components: {ElFormItem, ElForm, ElButton, ElInput},
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
                    name: ''
                },
                dialogReadType: false,
                temp: {

                }
            }
        },
        created () {
            this.getList()
        },
        methods: {
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

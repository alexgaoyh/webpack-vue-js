<!-- 建议所有的列表文件引入当前组件，并且使用 mixins 属性，避免页面失控 -->
<!-- 基类的vue部分，从当前url中获取到？后面的参数并且转换为 listQuery对象，用来防止详情页到列表页时候的页面失控 -->
<!-- 业务vue组件import当前文件，并且增加 mixins 部分即可增强当前业务属性 https://cn.vuejs.org/v2/guide/mixins.html -->
<!-- 混合 (mixins) 是一种分发 Vue 组件中可复用功能的非常灵活的方式。混合对象可以包含任意组件选项。以组件使用混合对象时，所有混合对象的选项将被混入该组件本身的选项。 -->
<!-- 通过该选项 doNotInitListQuery 来判断是否需要在组件创建完毕之后就初始化listQuery, 在调用该 mixins 的组件中 添加这么一个选项 就可以让组件不执行初始化方法 -->
<!-- 在调用当前组件的业务组件中，增加 export default{ doNotInitListQuery: true }  这一部分，即可控制当前方法的执行与否-->
<!-- 注意在使用此方法的过程中，需要重写 getList() 方法，并且增加 listQuery 属性，里面有 page rows 两个属性，用来判断分页相关逻辑 -->
<script>
    export default {
        data () {
            return {
                papPageSize: 30,
                papPageSizeOption: [10, 20, 30, 50, 100],
            }
        },
        created () {
            let option = this.$options.doNotInitListQuery
            if (!option) {
                this._baseVueInitListQuery()
            }
        },
        methods: {
            selectALL(selection){
                console.log('select-aLL',selection);
                this.tableSelectedData = selection;
            },
            selectChange(selection,rowData){
                console.log('select-change',selection, rowData);
                this.tableSelectedData = selection;
            },
            selectGroupChange(selection){
                console.log('select-group-change',selection);
                this.tableSelectedData = selection;
            },
            pageChange(pageIndex){
                this.listQuery.page = pageIndex;
                this.getList();
                console.log(pageIndex)
            },
            pageSizeChange(pageSize){
                this.listQuery.page = 1;
                this.listQuery.rows = pageSize;
                this.getList();
            },
            // 顶部的统一搜索处理
            handleFilter () {
                this.getList()
            },
            _baseVueInitListQuery () {
            },
            isEmptyObject (obj) {
                var name
                for (name in obj) {
                    return false
                }
                return true
            },
            formatDate (strTime) {
                var date = new Date(strTime)
                return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
            }
        }
    }
</script>

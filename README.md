
#20180601
    https://github.com/alexgaoyh/webpack-vue-js

    use webpack and vue to generate a common js for script
    使用webpack，结合vue ,打包生成一个可供 script 引入的js文件，创建通用的组件功能

    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    </head>
    <body>
    	<div id="app">
    		<vue-txt-number></vue-txt-number>
    	</div>
    </body>
    <!-- 先引入 Vue -->
    <script src="https://cdn.bootcss.com/vue/2.5.9/vue.js"></script>
    <script src="js/vue-txt-number.min.js"></script>
    <script>
    	Vue.use(window.VueTxtNumber)
    	new Vue({
    		el: '#app'
    	})
    </script>

#20180604
    由于
        https://github.com/ElemeFE/element/issues/6748
        https://github.com/ElemeFE/element/issues/7096
        https://github.com/ElemeFE/element/issues/8075

    增加 https://sagalbot.github.io/vue-select 的支持， 解决select下拉框的使用问题
    针对样式部分，可以约定
    .v-select.searchable .dropdown-toggle {
        width: 202px;
        height: 40px;
    }

     注意当前的下拉框在使用的过程中，返回值是一个对象，并且是选中节点的所有的object值，不仅仅是value部分

#20180605
    日期选择框的处理  https://github.com/charliekassel/vuejs-datepicker

#20180611
    Vue的插件集合 https://github.com/vuejs/awesome-vue#components--libraries

    数字输入框的控制
        https://github.com/kevinongko/vue-numeric

#20180612
    弹窗
        https://github.com/euvl/vue-js-modal
        http://vue-js-modal.yev.io/

    表格
        https://github.com/huangshuwei/vue-easytable
        http://doc.huangsw.com/vue-easytable/app.html#/intro

#20180615
    权限管理页面部分保存

#20180718
    增加动态表格的功能.
        动态表格，表格动态增加行数据，同时针对当前操作的单元格进行一个数据的反馈维护.
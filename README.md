
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
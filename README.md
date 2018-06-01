
#20180601
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

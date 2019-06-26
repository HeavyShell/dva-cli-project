dva-cli脚手架项目搭建历程

一，项目搭建：
1 cnpm install dva-cli -g 全局安装dva-cli
2 dva -v 查看版本如下：
    dva-cli version 0.9.2
    dva version 2.3.1
    roadhog version 2.4.2
3 dva new demo 使用工具创建目录，并初始化
4 npm start 运行项目，访问：http://localhost:8000/即可

二，配置路由：
1 增加两个页面，用于模拟切换路由，aa和bb
2 默认hash路由如下效果
3 进一步改造history路由，cnpm install history --save 安装history
4 修改src/index.js文件：
    import createHistory from 'history/createBrowserHistory'

    // 1. Initialize
    const app = dva({
        history:createHistory()
    });
5 history路由如下效果

三，页面接入store数据，model配置
1 改造src/index.js，初始化model：
    app.model(require('./models/example').default);
    app.model(require('./models/aa').default);
    app.model(require('./models/bb').default);
2 改造models目录，增加aa.js,bb.js文件
3 改造routes目录，模板接入store数据

四，路由改造，组件动态加载，model按需引入
1 这一步很重要，大型项目，页面组件和model众多，初始化全部引入，不可取
2 使用dva/dynamic方法，改造src/router.js
3 为了解决在本地刷新页面404情况，修改public/index.html中引入绝对根目录地址，例如：'/index.js'
4 修改.webpackrc如下：
    {
        "publicPath": "/"
    }

五，引入样式UI库antd
1 安装 cnpm install antd babel-plugin-import --save，
  其中babel-plugin-import是用来按需加载antd的脚本和样式的
2 编辑.webpackrc，使babel-plugin-import插件生效
3 在首页中引入Button和Tag：import {Button,Tag} from 'antd';运行如下：

六，国际化
1 安装immutable(数据操作工具，推荐使用这个)和react-intl（国际化插件）
2 改造src/index.js文件,增加全局model为app，改造如下：
    import dva from 'dva';
    import './index.css';
    import ReactDOM from 'react-dom';
    import Provider from './locale/provider';
    import createHistory from 'history/createBrowserHistory'

    // 1. Initialize
    const app = dva({
        history:createHistory()
    });

    // 2. Plugins
    // app.use({});

    // 3. Model
    app.model(require('./models/app').default);

    // 4. Router
    app.router(require('./router').default);

    // 5. Start
    const App=app.start();

    //此处，是dva配合国际化使用方式
    ReactDOM.render(<Provider store={app._store}><App /></Provider>, document.getElementById('root'));
3 思路：创建i18字段存于app的model中，当前语言取自这里，当切换时，改变此变量即可


====================================================================
以上部分，项目基础已搭建完毕，可直接使用了，以下的就是与业务相关的一些步骤
====================================================================
一，安装几个实用的包，将来项目中会用到

cnpm install path-to-regexp classnames moment axios react-helmet react-infinite-scroller --save

二，导航菜单设计
1 定义路由菜单：
/  首页
/music  音乐列表
/music/edit/id?  音乐-新增编辑
/film  电影
    /film/domestic 电影-国产电影
    /film/domestic/edit/id? 电影-国产电影-新增编辑
    /film/foreign 电影-国外电影
    /film/foreign/edit/id? 电影-国外电影-新增编辑
/about  关于我们
2 修改router.js,按照新的菜单 填充routeData，重新修改routes下文件，重新修改models
3 utils下新建config.js文件，并把routes移入此文件，新建index.js把config和request导入，均作为utils导出

三，布局设计
1 登录页单独一页，进入系统后页面分为上左右布局，通用的后台管理系统界面
2 src下新建layout目录，存放布局组件,修改router文件：
import Layout from './layout';
......
<Router history={history}>
      <Layout>
        <Switch>
        ......
3 左侧放入无限极菜单，动态控制菜单，涉及到父子关系，故routeData数据改造，增加id，pid，name，icon，show字段，
  并存储一份immutable数据menuMap于store中

四，接入数据
1 临时借用豆瓣的电影和音乐数据：
国内电影：https://movie.douban.com/j/new_search_subjects?sort=T&range=0,10&tags=&start=0&countries=%E4%B8%AD%E5%9B%BD%E5%A4%A7%E9%99%86
国外电影：https://movie.douban.com/j/new_search_subjects?sort=T&range=0,10&tags=&start=0&countries=%E7%BE%8E%E5%9B%BD

五，增加权限布局auth
1 app的store中设置字段token，用来检验是否有权限，此token为登录时，服务端返回的鉴权字段，
  前端也需要在sessionStorage中存储一份，解决页面刷新持久登录，在退出后清除即可
2 增加登录页面路由/login

六，完善下404页面，完善页面翻译
1 修改404.js
2 完善页面主要翻译

七,模拟数据mockjs的使用demo（不重要）
1 安装cnpm install mockjs --save
2 修改.roadhogrc.mock.js文件：
    const fs=require('fs');
    const path=require('path');
    const mockPath=path.join(__dirname+'/mock');

    const mock={};
    fs.readdirSync(mockPath).forEach(file=>{

        Object.assign(mock,require('./mock/'+file));
    });

    module.exports=mock;
3 修改.webpackrc文件，增加代理url：
    "/mock/api": {
        "target": "",
        "changeOrigin": true,
        "secure": false,
        "pathRewrite": { "^/mock/api" : "" }
    }
4 mock/下创建user.js,模拟user数据
5 创建user模块


使用：
1 下载包解压，进入目录

2 安装 npm i 或 cnpm i

3 运行 npm start启动后访问http://localhost:9999/

4 打包 npm run build
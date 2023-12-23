//该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
import register from '../view/register'
import login from '../view/login'
import home from '../view/home'
import roomms from '../view/roomms'
import order from '../view/order'
import center from '../view/center'
import account from '../view/account'
import usermainpage from '../view/usermainpage'
import adminconstruct from '../components/adminconstruct.vue'
import adminknow from '../view/admin/adminknow'
import adminregist from '../view/admin/adminregist'
import admincenter from '../view/admin/admincenter'
import adminaccount from '../view/admin/adminaccount'
import adminuser from '../view/admin/adminuser'
import adminroom from '../view/admin/adminroom'
import adminorder from '../view/admin/adminorder'
import RoomDetails from '../components/RoomDetails.vue';
import updataorder from '../view/admin/updataorder'
import addroom from '../view/admin/addroom'
export default new VueRouter({
    routes:[
        {
            path:'/user_register',
            component:register
        },
        {
            path:'/',
            component:login
        },
        {
            path:'/admin',
            component:adminconstruct,
            children:[
                {
                    path:'adminknow',
                    component:adminknow
                },
                {
                    path:'adminregist',
                    component:adminregist
                },
                {
                    path:'admincenter',
                    component:admincenter
                },
                {
                    path:'adminuser',
                    component:adminuser
                },
                {
                    path:'adminorder',
                    component:adminorder

                },
                {
                    path:'adminaccount',
                    component:adminaccount

                },
                {
                    path:'adminroom',
                    component:adminroom
                },
                {
                    path:'updataorder',
                    component:updataorder
                },
                {
                    path:'addroom',
                    component:addroom
                }
            ]
        },
        {
            path:'/front',
            component:usermainpage,
            children:[
                {
                    path:'home',
                    component:home
                },
                {

                    path:'order',
                    component:order
                },
                {
                    path:'center',
                    component:center
                },
                {
                    path:'account',
                    component:account
                },
                {
                    path:'roomms',
                    component:roomms
                },
                {
                    path:'/room/:rid',// 设置动态路由参数，rid 可以是房间的唯一标识符
                    name:'RoomDetails',
                    component:RoomDetails,
                    props:true // 将路由参数作为组件的 props 传递
                }
                ]
            },
    ],
    linkActiveClass: "active"
})
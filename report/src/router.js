import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Main from './components/Main.vue'
import Register from './components/student/Register.vue'
import Student from './components/student/Student.vue'
import Class from './components/student/Class.vue'
import SignUp from './components/student/SignUp.vue'
import Modify from './components/student/Modify.vue'
import Notify from './components/student/Notify.vue'
import Information from './components/student/Information.vue'

import StudentInfo from './components/manager/StudentInfo.vue'
import ClassInfo from './components/manager/ClassInfo.vue'
import ChangeNotify from './components/manager/ChangeNotify.vue'
import ModifyInfo from './components/manager/ModifyInfo.vue'
import AddClass from './components/manager/AddClass.vue'
import ChangeClass from './components/manager/ChangeClass.vue'

const routes = [
    {path: '/', component: Main},
    {path: '/register', component: Register},
    {path: '/student/:name', component: Student},
    {path: '/sclass/:id', component: Class},
    {path: '/signup/:name', component: SignUp},
    {path: '/modify/:name', component: Modify},
    {path: '/notify', component: Notify},
    {path: '/information/:name', component: Information},

    {path: '/changeNotify', component: ChangeNotify},
    {path: '/classInfo', component: ClassInfo},
    {path: '/studentInfo/:className', component: StudentInfo},
    {path: '/modifyInfo/:name', component: ModifyInfo},
    {path: '/addClass', component: AddClass},
    {path: '/changeClass/:className', component: ChangeClass},
]

const router = new VueRouter({
    mode:'history',
    routes
})
export default router
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

const routes = [
	{
		path: '/',
		name: 'dashboard',
		component: Dashboard
	},
    {
        path: '/ielts',
        name: 'ielts',
        component: () => import(/* webpackChunkName: "ielts" */ '../views/IeltsTest.vue')
    },
    {
        path: '/ielts/:id',
        name: 'ManageTest',
        component: () => import(/* webpackChunkName: "manageTest" */ '../views/ManageTest.vue')
    },
    {
        path: '/mock',
        name: 'mock',
        component: () => import(/* webpackChunkName: "mock" */ '../views/MockExam.vue')
    }
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router


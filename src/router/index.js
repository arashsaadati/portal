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
    }
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router


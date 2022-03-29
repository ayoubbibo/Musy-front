import { createWebHistory, createRouter } from "vue-router";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import dashboard from '../components/Dashboard'
//import Register from "../components/Register.vue";
// lazy-loaded
const Profile = () => import("../components/Profile.vue")
const BoardAdmin = () => import("../components/BoardAdmin.vue")
const BoardModerator = () => import("../components/BoardModerator.vue")
const BoardUser = () => import("../components/BoardUser.vue")

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/dashboard",
    component: dashboard,
    children: [
      {
        path: '',
        component: BoardUser
      },
      {
        path: "user",
        name: "user",
        // lazy-loaded
        component: BoardUser,
      },
      {
        path: 'playlists',
        component: () => import(/* webpackChunkName: "Playlists" */ '../components/Playlists.vue'),
        props(route) {
          return {  toplay: route.query.toplay }
        }
      },
      {
        path: 'about',
        component: Home
      },
      {
        path: "profile",
        name: "profile",
        // lazy-loaded
        component: Profile,
      },
      {
        path: "admin",
        name: "admin",
        // lazy-loaded
        component: BoardAdmin,
        props(route) {
          return {  toUpdate: route.query.toUpdate }
        }
      },
      {
        path: "mod",
        name: "moderator",
        // lazy-loaded
        component: BoardModerator,
      },
      
      
    ]
  }
];




const router = createRouter({
  history: createWebHistory(),
  routes,
});


/*
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
  next();
  }
 });
*/
export default router;
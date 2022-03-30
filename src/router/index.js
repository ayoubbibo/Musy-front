import { createWebHistory, createRouter } from "vue-router";
import Home from "../components/Home.vue";
import About from "../components/About.vue";
import Login from "../components/Login.vue";
import dashboard from '../components/Dashboard'
//import Register from "../components/Register.vue";
// lazy-loaded
const Profile = () => import("../components/Profile.vue")
const BoardArtist = () => import("../components/BoardArtist.vue")
const BoardUser = () => import("../components/BoardUser.vue")

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
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
        name:"about",
        component: About
      },
      {
        path: "profile",
        name: "profile",
        // lazy-loaded
        component: Profile,
      },
      {
        path: "artist",
        name: "artist",
        // lazy-loaded
        component: BoardArtist,
        props(route) {
          return {  toUpdate: route.query.toUpdate }
        }
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/home');
  } else {
  next();
  }
 });
export default router;
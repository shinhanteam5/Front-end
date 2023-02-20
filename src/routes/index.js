import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home';
import Frac from '../views/Frac';
import Tendency from '../views/Tendency';
import Search from '../views/Search';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/frac',
    component: Frac,
  },
  {
    path: '/frac/select',
    component: Tendency,
  },
  {
    path: '/frac/search',
    component: Search,
  },
  //   {
  //     path: '/frac/list',
  //     component: '',
  //   },
  //   {
  //     path: '/frac/detail',
  //     component: '',
  //   },
  //   {
  //     path: '/frac/',
  //     component: '',
  //   },
];

export default createRouter({
  // Hash, History 중 Hash 모드 선택
  history: createWebHashHistory(),
  // pages 구분
  routes,
});

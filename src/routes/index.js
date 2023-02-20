import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home';
import Frac from '../views/Frac';
import Tendency from '../views/Tendency';
import Search from '../views/Search';
import StockList from '../views/StockList';
import StockBuy from '../views/StockBuy';

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
  {
    path: '/frac/Stocklist',
    component: StockList,
  },
  //   {
  //     path: '/frac/detail',
  //     component: '',
  //   },
  {
    path: '/frac/buy',
    component: StockBuy,
  },
];

export default createRouter({
  // Hash, History 중 Hash 모드 선택
  history: createWebHashHistory(),
  // pages 구분
  routes,
});

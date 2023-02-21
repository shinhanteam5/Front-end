import { createRouter, createWebHashHistory,VueRouter } from 'vue-router';
import Home from '../views/Home';
import Frac from '../views/Frac';
import Tendency from '../views/Tendency';
import Search from '../views/Search';
import StockList from '../views/StockList';
import StockDetail from '../views/StockDetail';
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
    path: '/frac/stockList',
    component: StockList,
  },
  //   {
  //     path: '/frac/detail',
  //     component: '',
  //   },
  {
    path: '/frac/stockBuy',
    component: StockBuy,
    name: 'Params',
    props: true
  },
  {
    path: '/frac/stockdetail',
    component: StockDetail,
  },
];

export default createRouter({
  // Hash, History 중 Hash 모드 선택
  history: createWebHashHistory(),
  // pages 구분
  routes,
});

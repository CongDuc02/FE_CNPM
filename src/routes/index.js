import AdminPage from '../pages/AdminPage/AdminPage'
import DetailsOrderPage from '../pages/DetailsOrderPage/DetailsOrderPage'
import Homepage from '../pages/HomePage/Homepage'
import MyOrderPage from '../pages/MyOrder/MyOrder'
import NotfoundPage from '../pages/NotfoudPage/NotfoudPage'
import OrderPage from '../pages/OrderPage/OrderPage'
import OrderSucess from '../pages/OrderSuccess/OrderSuccess'
import PaymentPage from '../pages/PaymentPage/PaymentPage'
import ProductDetailPage from '../pages/ProductDetailPage/ProductDetailPage'
import ProductsPage from '../pages/ProductsPage/ProductsPage'
import ProfilePage from '../pages/Profile/Profile'
import SigninPage from '../pages/SigninPage/SigninPage'
import SignupPage from '../pages/SingupPage/SignupPage'
import TypeProductPage from '../pages/TypeProductPage/TypeProductPage'
export const routes = [
  {
    path: '/',
    page: Homepage,
    isShowHeader: true
  },
  {
    path: '/order',
    page: OrderPage,
    isShowHeader: true
  },
  {
    path: '/my-order',
    page: MyOrderPage,
    isShowHeader: true
  },
  {
    path: '/details-order/:id',
    page: DetailsOrderPage,
    isShowHeader: true
  },
  {
    path: '/orderSuccess',
    page: OrderSucess,
    isShowHeader: true
},
  {
    path: '/payment',
    page: PaymentPage,
    isShowHeader: true
  },
  {
    path: '/products',
    page: ProductsPage,
    isShowHeader: true
  },
  {
    path: '/product/:type',
    page: TypeProductPage,
    isShowHeader: true
  },
  {
    path: '/signin',
    page: SigninPage,
    isShowHeader: false
  },
  {
    path: '/signup',
    page: SignupPage,
    isShowHeader: false
  },
  {
    path: '/product-details/:id',
    page: ProductDetailPage,
    isShowHeader: true
  },
  {
    path: '/profile-user',
    page: ProfilePage,
    isShowHeader: true
  },

  {
    path: '/system/admin',
    page: AdminPage,
    isPrivated: true,
    isShowHeader: false
  },

  {
    path: '*',
    page: NotfoundPage,
    // isShowHeader: false
  }
]

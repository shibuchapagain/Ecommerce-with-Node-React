import MenuComponent from "./home/menu.component";
import HomePageFooterComponent from "./home/footer.component";
import AdminDashboard from "./admin/dashboard.component";
// for banner
import { BannerCreate, BannerList, BannerEdit } from "./admin/banner";
// for brand
import { BrandCreate, BrandList, BrandEdit } from "./admin/brand";
// for category
import { CategoryCreate, CategoryList, CategoryEdit } from "./admin/category";
// for user
import { UserCreate, UserList, UserEdit } from "./admin/user";
// for product
import { ProductCreate, ProductList, ProductEdit } from "./admin/product";

const CustomComponent = {
  MenuComponent,
  HomePageFooterComponent,
  AdminDashboard,
  // for banner
  BannerList,
  BannerCreate,
  BannerEdit,
  // for brand
  BrandCreate,
  BrandList,
  BrandEdit,
  // for category
  CategoryCreate,
  CategoryList,
  CategoryEdit,
  // for user
  UserCreate,
  UserList,
  UserEdit,
  // for product
  ProductCreate,
  ProductList,
  ProductEdit,
};

export default CustomComponent;

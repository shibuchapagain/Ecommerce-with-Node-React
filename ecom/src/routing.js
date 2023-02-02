import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pages from "./pages";
import CustomComponent from "./components";
import AllProductList from "./pages/home/product-list/all-products.page";
import PrivateComponent from "./components/auth/private-routes.component";
import SearchResult from "./pages/home/search/search-result.page";
import CategoryProductList from "./pages/home/category-list/category-product-list.page";
// import { ToastContainer } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import ProductDetail from "./pages/home/product-detail/product-detail.page";
import CartDetail from "./pages/home/cart-detail/cart-detail.page";
import Checkout from "./pages/home/checkout";
// const BrandPage = () => {
//   let [brandDetail, setBrandDetail] = useState("Apple");

//   // for taking query string
//   // let [query, setQuery] = useSearchParams();

//   // for taking params data
//   let params = useParams();
//   return (
//     <>
//       <p>{brandDetail}</p>
//       <p>{params.id} is id...</p>
//     </>
//   );
// };

const Routing = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        {/* <CustomComponent.MenuComponent /> */}
        <Routes>
          <Route path="/" element={<Pages.HomePageLayout />}>
            <Route index element={<Pages.HomePage />} />
            <Route path="contact-us" element={<>Contact Us Page</>} />
            <Route path="about-us" element={<>About Us Page</>} />

            <Route path="register" element={<Pages.AuthPage />} />
            <Route path="login" element={<Pages.AuthPage />} />

            <Route path="search" element={<SearchResult />} />

            <Route path="/category/:slug" element={<CategoryProductList />} />

            <Route path="products" element={<AllProductList />} />
            <Route path="product/:slug" element={<ProductDetail />} />

            <Route path="cart" element={<CartDetail />} />

            <Route path="/checkout" element={<Checkout />} />
          </Route>

          <Route
            path="/admin"
            element={<PrivateComponent component={<Pages.AdminLayout />} />}
          >
            {/* for banner */}
            <Route index element={<CustomComponent.AdminDashboard />} />
            <Route path="banner" element={<CustomComponent.BannerList />} />
            <Route
              path="banner/create"
              element={<CustomComponent.BannerCreate />}
            />
            <Route path="banner/:id" element={<CustomComponent.BannerEdit />} />

            {/* for brand */}

            <Route index element={<CustomComponent.AdminDashboard />} />
            <Route path="brand" element={<CustomComponent.BrandList />} />
            <Route
              path="brand/create"
              element={<CustomComponent.BrandCreate />}
            />
            <Route path="brand/:id" element={<CustomComponent.BrandEdit />} />

            {/* for category */}
            <Route index element={<CustomComponent.AdminDashboard />} />
            <Route path="category" element={<CustomComponent.CategoryList />} />
            <Route
              path="category/create"
              element={<CustomComponent.CategoryCreate />}
            />
            <Route
              path="category/:id"
              element={<CustomComponent.CategoryEdit />}
            />

            {/* for user */}
            <Route index element={<CustomComponent.AdminDashboard />} />
            <Route path="user" element={<CustomComponent.UserList />} />
            <Route
              path="user/create"
              element={<CustomComponent.UserCreate />}
            />
            <Route path="user/:id" element={<CustomComponent.UserEdit />} />

            {/* for product */}
            <Route index element={<CustomComponent.AdminDashboard />} />
            <Route path="product" element={<CustomComponent.ProductList />} />
            <Route
              path="product/create"
              element={<CustomComponent.ProductCreate />}
            />
            <Route
              path="product/:id"
              element={<CustomComponent.ProductEdit />}
            />
          </Route>

          <Route path="*" element={<Pages.ErrorPage />} />
        </Routes>
        {/* <CustomComponent.HomePageFooterComponent /> */}
      </BrowserRouter>
    </>
  );
};

export default Routing;

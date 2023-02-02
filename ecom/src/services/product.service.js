import HttpRequestService from "./http-request.service";

class ProductService extends HttpRequestService {
  listSearchData = async (keyword) => {
    try {
      let response = await this.getRequest(
        "/product/search?keyword=" + keyword
      );
      return response;
    } catch (err) {
      throw err;
    }
  };
  getProductBySlug = async (slug) => {
    try {
      let response = await this.getRequest("/product/by-slug/" + slug);
      return response;
    } catch (err) {
      throw err;
    }
  };

  getCartDetail = async (cart) => {
    try {
      let response = await this.postRequest("/order/cart", { cart });
      return response;
    } catch (err) {
      throw err;
    }
  };

  createOrder = async (data) => {
    try {
      let response = await this.postRequest("/order", data, { strict: true });
      return response;
    } catch (err) {
      throw err;
    }
  };
}

export const product_svc = new ProductService();
export default ProductService;

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image1 from "./../../../assets/images/watch.webp";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useCallback, useEffect, useState } from "react";
import BannerService from "../../admin/banner/banner.service";
const banner_svc = new BannerService();
export const BannerListComponent = () => {
  const [banner, setBanner] = useState();
  const getAllBanners = useCallback(async () => {
    try {
      let response = await banner_svc.getAllList();

      if (response.status) {
        let active_banner = response.retult.filter(
          (item) => item?.status === "active"
        );
        setBanner(active_banner);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getAllBanners();
  }, []);

  return (
    <>
      <Carousel
        showThumbs={false}
        showIndicators={true}
        onClickItem={(e, item) => {
          window.location = item.props.url;
        }}
      >
        {banner &&
          banner.map((item, index) => (
            <div className="home-banner" key={index} url={item.link}>
              <img
                src={process.env.React_APP_IMAGE_URL + "banner/" + item.image}
              />
            </div>
          ))}
      </Carousel>
    </>
  );
};

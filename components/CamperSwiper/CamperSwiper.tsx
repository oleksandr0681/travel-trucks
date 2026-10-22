"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperCore } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import styles from "./CamperSwiper.module.css";

interface ImageGalleryProps {
  images?: string[];
}

export default function ImageGallery({ images = [] }: ImageGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

  if (!images || images.length === 0) {
    return (
      <div className={styles.galleryContainer}>
        <p>No images to display</p>
      </div>
    );
  }

  return (
    <div className={styles.galleryContainer}>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={false}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.mainSlider}
      >
        {images.map((imgUrl, index) => (
          <SwiperSlide key={index} className={styles.mainSlide}>
            <Image
              src={imgUrl}
              alt={`Image ${index + 1}`}
              fill
              priority={index === 0}
              className={styles.image}
              sizes="(max-width: 638px) 100%, 638px"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={31}
        slidesPerView="auto"
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.thumbsSlider}
      >
        {images.map((imgUrl, index) => (
          <SwiperSlide key={index} className={styles.thumbSlide}>
            <Image
              src={imgUrl}
              alt={`Мініатюра ${index + 1}`}
              fill
              className={styles.image}
              sizes="(max-width: 650px) 80px, 136px"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { ReactNode } from 'react'

interface Props {
  slides: ReactNode[]
  slidesPerView?: number
  height?: string
  delay?: number
  className?: string
}

export function VerticalSwiper({ slides, slidesPerView = 3, height = '240px', delay = 2000, className = '' }: Props) {
  return (
    <Swiper
      direction="vertical"
      slidesPerView={slidesPerView}
      spaceBetween={12}
      autoplay={{ delay, disableOnInteraction: false }}
      loop
      modules={[Autoplay]}
      style={{ height }}
      className={`w-full ${className}`}
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={i}>{slide}</SwiperSlide>
      ))}
    </Swiper>
  )
}

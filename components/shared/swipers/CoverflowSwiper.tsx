'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import { ReactNode } from 'react'

interface Props {
  slides: ReactNode[]
  slidesPerView?: number | 'auto'
  className?: string
}

export function CoverflowSwiper({ slides, slidesPerView = 'auto', className = '' }: Props) {
  return (
    <Swiper
      effect="coverflow"
      grabCursor
      centeredSlides
      slidesPerView={slidesPerView}
      coverflowEffect={{ rotate: 45, stretch: 0, depth: 120, modifier: 1, slideShadows: false }}
      autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
      pagination={{ clickable: true, dynamicBullets: true }}
      loop
      modules={[EffectCoverflow, Autoplay, Pagination]}
      className={`w-full pb-12 ${className}`}
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={i} style={{ width: '340px', height: 'auto' }}>
          {slide}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCube, Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-cube'
import 'swiper/css/pagination'
import { ReactNode } from 'react'

interface Props { slides: ReactNode[]; className?: string }

export function CubeSwiper({ slides, className = '' }: Props) {
  return (
    <Swiper
      effect="cube"
      grabCursor
      cubeEffect={{ shadow: true, slideShadows: false, shadowOffset: 15, shadowScale: 0.92 }}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop
      modules={[EffectCube, Autoplay, Pagination]}
      className={`w-full pb-10 ${className}`}
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={i}>{slide}</SwiperSlide>
      ))}
    </Swiper>
  )
}

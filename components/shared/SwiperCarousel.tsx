'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { 
  EffectCoverflow, 
  EffectCube, 
  Autoplay, 
  Pagination, 
  Navigation, 
  Mousewheel, 
  FreeMode 
} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/effect-cube'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'

// VARIANT 1: Coverflow Effect (for testimonials / feature showcase)
export function CoverflowSwiper({ slides }: { slides: any[] }) {
  return (
    <Swiper
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
      slidesPerView="auto"
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      modules={[EffectCoverflow, Autoplay, Pagination]}
      className="w-full py-12"
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={i} style={{ width: '320px' }}>
          {slide}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

// VARIANT 2: Cube Effect (for page/section transitions showcase)
export function CubeSwiper({ slides }: { slides: any[] }) {
  return (
    <Swiper
      effect="cube"
      grabCursor={true}
      cubeEffect={{
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      }}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      modules={[EffectCube, Autoplay, Pagination]}
      className="w-full max-w-md mx-auto"
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={i}>{slide}</SwiperSlide>
      ))}
    </Swiper>
  )
}

// VARIANT 3: Vertical Scroll (for activity feed / notifications)
export function VerticalSwiper({ slides }: { slides: any[] }) {
  return (
    <Swiper
      direction="vertical"
      slidesPerView={3}
      spaceBetween={12}
      mousewheel={true}
      freeMode={true}
      loop={slides.length > 3}
      autoplay={{ 
        delay: 3000, 
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }}
      modules={[Autoplay, Pagination, Mousewheel, FreeMode]}
      className="h-[380px] w-full"
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={i} className="!h-auto py-2">
          {slide}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

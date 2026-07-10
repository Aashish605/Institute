import { useEffect, useState } from 'react'
import { Star, Quote } from 'lucide-react'
import { Card, CardContent } from '@/Components/ui/card'
import { Badge } from '@/Components/ui/badge'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import api from '../config/api'

const styles = `
.testimonials-swiper .swiper-wrapper {
  align-items: stretch;
}
.testimonials-swiper .swiper-slide {
  height: auto !important;
}
`

const TestimonialCard = ({ testimonial }) => (
  <div className="h-full">
    <Card className="relative overflow-hidden border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />
      <CardContent className="p-6 flex flex-col flex-1">
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                'w-4 h-4',
                i < testimonial.rating ? 'fill-amber-400 stroke-amber-400' : 'fill-muted stroke-muted-foreground'
              )}
            />
          ))}
        </div>
        <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">&ldquo;{testimonial.content}&rdquo;</p>
        <div className="flex items-center gap-3 mt-auto">
          <img
            src={testimonial.avatar || 'https://i.pravatar.cc/100?img=1'}
            alt={testimonial.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-border flex-shrink-0"
            loading="lazy"
          />
          <div className="min-w-0">
            <p className="font-semibold text-sm truncate">{testimonial.name}</p>
            <p className="text-xs text-text-muted truncate">{testimonial.role}{testimonial.role && testimonial.company ? ' at ' : ''}{testimonial.company}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
)

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/testimonial/get')
      .then(res => setTestimonials(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading || testimonials.length === 0) return null

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <style>{styles}</style>
      <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4 rounded-full px-4 py-1.5">
              <Quote className="w-3 h-3 mr-1.5 inline" />
              Testimonials
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">What Our <span className="text-secondary">Students</span> Say</h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Hear from our alumni who have transformed their careers through our programs
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-primary/20 via-secondary/30 to-primary/20 rounded-full mx-auto mt-6" />
          </motion.div>

        <Swiper
          slidesPerView={1}
          spaceBetween={24}
          modules={[Autoplay]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="testimonials-swiper"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="h-full">
                <TestimonialCard testimonial={t} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Testimonials

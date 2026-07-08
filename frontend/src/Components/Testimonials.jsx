import { Star, Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const styles = `
.testimonials-swiper .swiper-wrapper {
  align-items: stretch;
}
.testimonials-swiper .swiper-slide {
  height: auto !important;
}
`

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Software Engineer',
    company: 'Tech Corp',
    avatar: 'https://i.pravatar.cc/100?img=1',
    content: 'The comprehensive curriculum and hands-on projects gave me the confidence to transition into a software engineering role. The instructors were incredibly supportive throughout my journey.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Data Analyst',
    company: 'DataFlow Inc',
    avatar: 'https://i.pravatar.cc/100?img=3',
    content: 'I was able to upskill and land my dream job within 6 months of completing the program. The practical approach to learning made all the difference in my career growth.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Product Manager',
    company: 'InnovateLab',
    avatar: 'https://i.pravatar.cc/100?img=5',
    content: 'The flexible scheduling allowed me to balance work and study effectively. The real-world projects helped me build a portfolio that impressed recruiters.',
    rating: 5,
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Full Stack Developer',
    company: 'WebCraft Studio',
    avatar: 'https://i.pravatar.cc/100?img=8',
    content: 'What sets this institute apart is the personalized mentorship. My mentor guided me through complex concepts and helped me build a network in the industry.',
    rating: 4,
  },
  {
    id: 5,
    name: 'Priya Sharma',
    role: 'UI/UX Designer',
    company: 'DesignCraft',
    avatar: 'https://i.pravatar.cc/100?img=9',
    content: 'The design thinking workshops and portfolio reviews were invaluable. I learned to approach problems creatively and landed my dream design role.',
    rating: 5,
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'DevOps Engineer',
    company: 'CloudScale',
    avatar: 'https://i.pravatar.cc/100?img=12',
    content: 'The cloud and DevOps program was rigorous and up-to-date with industry standards. The hands-on labs prepared me for real-world challenges.',
    rating: 4,
  },
]

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
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-border flex-shrink-0"
            loading="lazy"
          />
          <div className="min-w-0">
            <p className="font-semibold text-sm truncate">{testimonial.name}</p>
            <p className="text-xs text-text-muted truncate">{testimonial.role} at {testimonial.company}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
)

const Testimonials = () => {
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
          {testimonials.map((t, i) => (
            <SwiperSlide key={t.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="h-full"
              >
                <TestimonialCard testimonial={t} />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Testimonials

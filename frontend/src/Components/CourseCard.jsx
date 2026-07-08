import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Heart, Clock, Users, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardDescription, CardTitle, CardFooter, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const CourseCard = ({ course, index = 0 }) => {
  const [liked, setLiked] = useState(false)

  return (
    <div className="group relative rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 pt-0 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {course.discount && (
          <Badge variant="secondary" className="absolute top-3 right-3 rounded-sm">
            {course.discount} OFF
          </Badge>
        )}
      </div>
      <Button
        size="icon"
        onClick={() => setLiked(!liked)}
        className="absolute top-3 left-3 rounded-full bg-white/80 hover:bg-white shadow-sm"
      >
        <Heart className={cn('w-4 h-4', liked ? 'fill-destructive stroke-destructive' : 'stroke-text-muted')} />
        <span className="sr-only">Like</span>
      </Button>
      <Card className="border-none shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg line-clamp-1">{course.title}</CardTitle>
          <CardDescription className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="rounded-sm text-xs">
              <Clock className="w-3 h-3 mr-1" /> Self-paced
            </Badge>
            <Badge variant="outline" className="rounded-sm text-xs">
              <Users className="w-3 h-3 mr-1" /> Online
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-sm text-text-secondary line-clamp-2">{course.description}</p>
        </CardContent>
        <CardFooter className="justify-between gap-3 max-sm:flex-col max-sm:items-stretch pt-2">
          <div className="flex flex-col">
            {course.oldPrice && (
              <span className="text-xs text-text-muted line-through">NPR {course.oldPrice}</span>
            )}
            <span className="text-xl font-bold text-primary">NPR {course.newPrice}</span>
          </div>
          <NavLink to={`/course/${course.title}/enroll`}>
            <Button size="lg" className="w-full bg-secondary hover:bg-secondary-dark text-white">
              Enroll Now
            </Button>
          </NavLink>
        </CardFooter>
      </Card>
    </div>
  )
}

const CourseCardSkeleton = () => (
  <div className="rounded-xl border border-border overflow-hidden">
    <div className="h-48 skeleton" />
    <div className="p-5 space-y-3">
      <div className="h-5 skeleton rounded w-3/4" />
      <div className="h-3 skeleton rounded w-1/2" />
      <div className="h-3 skeleton rounded w-full" />
      <div className="flex justify-between pt-2">
        <div className="h-6 skeleton rounded w-20" />
        <div className="h-10 skeleton rounded w-28" />
      </div>
    </div>
  </div>
)

export default CourseCard
export { CourseCardSkeleton }

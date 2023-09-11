'use client'

import { MouseEvent as ReactMouseEvent, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, type PanInfo } from 'framer-motion'
import { MoveLeft, MoveRight } from 'lucide-react'
import checkMobile from '@/lib/check-mobile'

import { cn } from '@/lib/utils'

const DRAG_THRESHOLD = 150
const FALLBACK_WIDTH = 509

const CURSOR_SIZE = 80

interface ImageData {
  title: string
  url: string
}

interface CarouselProps {
  images: ImageData[]
}

// THIS CODE IS HORRIBLE BUT IT WORKS FOR NOW SO I'M NOT GONNA TOUCH IT
// -- AP

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  let isMobile = checkMobile()
  const START_INDEX = isMobile ? 0 : 1

  const containerRef = useRef<HTMLUListElement>(null)
  const itemsRef = useRef<(HTMLLIElement | null)[]>([])
  const [activeSlide, setActiveSlide] = useState(START_INDEX)
  const canScrollPrev = activeSlide > 0
  const canScrollNext = activeSlide < images.length - 1
  const offsetX = useMotionValue(0)
  const animatedX = useSpring(offsetX, {
    damping: 20,
    stiffness: 150,
  })

  const [isDragging, setIsDragging] = useState(false)
  function handleDragSnap(
    _: MouseEvent,
    { offset: { x: dragOffset } }: PanInfo
  ) {
    //reset drag state
    setIsDragging(false)
    containerRef.current?.removeAttribute('data-dragging')

    //stop drag animation (rest velocity)
    animatedX.stop()

    const currentOffset = offsetX.get()

    //snap back if not dragged far enough or if at the start/end of the list
    if (
      Math.abs(dragOffset) < DRAG_THRESHOLD ||
      (!canScrollPrev && dragOffset > 0) ||
      (!canScrollNext && dragOffset < 0)
    ) {
      animatedX.set(currentOffset)
      return
    }

    let offsetWidth = 0
    /*
      - start searching from currently active slide in the direction of the drag
      - check if the drag offset is greater than the width of the current item
      - if it is, add/subtract the width of the next/prev item to the offsetWidth
      - if it isn't, snap to the next/prev item
    */
    for (
      let i = activeSlide;
      dragOffset > 0 ? i >= 0 : i < itemsRef.current.length;
      dragOffset > 0 ? i-- : i++
    ) {
      const item = itemsRef.current[i]
      if (item === null) continue
      const itemOffset = item.offsetWidth

      const prevItemWidth =
        itemsRef.current[i - 1]?.offsetWidth ?? FALLBACK_WIDTH
      const nextItemWidth =
        itemsRef.current[i + 1]?.offsetWidth ?? FALLBACK_WIDTH

      if (
        (dragOffset > 0 && //dragging left
          dragOffset > offsetWidth + itemOffset && //dragged past item
          i > 1) || //not the first/second item
        (dragOffset < 0 && //dragging right
          dragOffset < offsetWidth + -itemOffset && //dragged past item
          i < itemsRef.current.length - 2) //not the last/second to last item
      ) {
        dragOffset > 0
          ? (offsetWidth += prevItemWidth)
          : (offsetWidth -= nextItemWidth)
        continue
      }

      if (dragOffset > 0) {
        //prev
        offsetX.set(currentOffset + offsetWidth + prevItemWidth)
        setActiveSlide(i - 1)
      } else {
        //next
        offsetX.set(currentOffset + offsetWidth - nextItemWidth)
        setActiveSlide(i + 1)
      }
      break
    }
  }
  function scrollPrev() {
    //prevent scrolling past first item
    if (!canScrollPrev) return

    const nextWidth = itemsRef.current
      .at(activeSlide - 1)
      ?.getBoundingClientRect().width
    if (nextWidth === undefined) return
    offsetX.set(offsetX.get() + nextWidth)

    setActiveSlide((prev) => prev - 1)
  }
  function scrollNext() {
    // prevent scrolling past last item
    if (!canScrollNext) return

    const nextWidth = itemsRef.current
      .at(activeSlide + 1)
      ?.getBoundingClientRect().width
    if (nextWidth === undefined) return
    offsetX.set(offsetX.get() - nextWidth)

    setActiveSlide((prev) => prev + 1)
  }

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const animatedHoverX = useSpring(mouseX, {
    damping: 20,
    stiffness: 400,
    mass: 0.1,
  })
  const animatedHoverY = useSpring(mouseY, {
    damping: 20,
    stiffness: 400,
    mass: 0.1,
  })

  function navButtonHover({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLButtonElement, MouseEvent>) {
    const parent = currentTarget.offsetParent
    if (!parent) return
    const { left: parentLeft, top: parentTop } = parent.getBoundingClientRect()

    const { left, top, width, height } = currentTarget.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2

    const offsetFromCenterX = clientX - centerX
    const offsetFromCenterY = clientY - centerY

    mouseX.set(left - parentLeft + offsetFromCenterX / 4)
    mouseY.set(top - parentTop + offsetFromCenterY / 4)
  }

  function disableDragClick(e: ReactMouseEvent<HTMLAnchorElement>) {
    if (isDragging) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <div className="group container mx-6 px-0 min-w-[320px] w-full">
      <div className="relative px-2">
        <div className="relative overflow-hidden">
          <motion.ul
            ref={containerRef}
            className="flex items-start"
            style={{
              x: animatedX,
            }}
            drag="x"
            dragConstraints={{
              left: -(FALLBACK_WIDTH * (images.length - 1)),
              right: FALLBACK_WIDTH,
            }}
            onMouseMove={({ currentTarget, clientX, clientY }) => {
              const parent = currentTarget.offsetParent
              if (!parent) return
              const { left, top } = parent.getBoundingClientRect()
              mouseX.set(clientX - left - CURSOR_SIZE / 2)
              mouseY.set(clientY - top - CURSOR_SIZE / 2)
            }}
            onDragStart={() => {
              containerRef.current?.setAttribute('data-dragging', 'true')
              setIsDragging(true)
            }}
            onDragEnd={handleDragSnap}
          >
            {images.map((img, index) => {
              const active = index === activeSlide
              return (
                <motion.li
                  layout
                  key={img.title}
                  ref={(el) => (itemsRef.current[index] = el)}
                  className={cn(
                    'group relative shrink-0 select-none px-3 transition-opacity duration-300',
                    !active && 'opacity-30'
                  )}
                  transition={{
                    ease: 'easeInOut',
                    duration: 0.4,
                  }}
                  style={{
                    flexBasis: isMobile
                      ? active
                        ? '100%'
                        : '90%'
                      : active
                      ? '40%'
                      : '30%',
                  }}
                >
                  <div className="block" draggable={false}>
                    <div
                      className={cn(
                        'relative grid place-content-center overflow-hidden',
                        active ? 'aspect-[5/3]' : 'aspect-[4/3]'
                      )}
                    >
                      <Image
                        src={img.url}
                        alt="Carousel Image"
                        fill={true}
                        draggable={false}
                        sizes="40vw, 30vw"
                        className="object-cover h-full rounded-lg bg-gray-900"
                      />
                    </div>
                  </div>
                  <div
                    className={cn(
                      'mt-4 flex justify-center',
                      !active && 'hidden'
                    )}
                  >
                    <Link
                      href={img.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-bold leading-tight transition-colors"
                      draggable={false}
                      onClick={disableDragClick}
                    >
                      {img.title}
                    </Link>
                  </div>
                </motion.li>
              )
            })}
          </motion.ul>
        </div>
        <button
          type="button"
          className={cn(
            'group absolute z-20 grid aspect-square place-content-center rounded-full transition-colors',
            isMobile ? 'left-[12%] -bottom-1/3' : 'left-[24%] top-1/3'
          )}
          style={{
            width: CURSOR_SIZE,
            height: CURSOR_SIZE,
          }}
          onClick={scrollPrev}
          disabled={!canScrollPrev}
        >
          <span className="sr-only">Previous Guide</span>
          <MoveLeft className="h-10 w-10 stroke-[1.5] text-primary transition-colors group-enabled:group-hover:text-primary/50 group-disabled:opacity-50" />
        </button>
        <button
          type="button"
          className={cn(
            'group absolute z-20 grid aspect-square place-content-center rounded-full transition-colors',
            isMobile ? 'right-[12%] -bottom-1/3' : 'right-[24%] top-1/3'
          )}
          style={{
            width: CURSOR_SIZE,
            height: CURSOR_SIZE,
          }}
          onClick={scrollNext}
          disabled={!canScrollNext}
        >
          <span className="sr-only">Next Guide</span>
          <MoveRight className="h-10 w-10 stroke-[1.5] text-primary transition-colors group-enabled:group-hover:text-primary/50 group-disabled:opacity-50" />
        </button>
      </div>
    </div>
  )
}

export default Carousel
export type { ImageData }

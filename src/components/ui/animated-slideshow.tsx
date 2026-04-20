"use client";

import * as React from "react";
import { HTMLMotionProps, MotionConfig, motion } from "framer-motion";
import { cn } from "@/src/lib/utils";

/**
 * TYPES
 */
interface HoverSliderProps extends React.HTMLAttributes<HTMLElement> {}

interface TextStaggerHoverProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  index: number;
}

// Extend standard image attributes to allow 'alt', 'src', etc.
interface HoverSliderImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  index: number;
  imageUrl: string;
}

interface HoverSliderContextValue {
  activeSlide: number;
  changeSlide: (index: number) => void;
}

/**
 * CONTEXT
 */
const HoverSliderContext = React.createContext<HoverSliderContextValue | undefined>(undefined);

function useHoverSliderContext() {
  const context = React.useContext(HoverSliderContext);
  if (context === undefined) {
    throw new Error("useHoverSliderContext must be used within a HoverSliderProvider");
  }
  return context;
}

/**
 * COMPONENTS
 */
export const HoverSlider = React.forwardRef<HTMLElement, HoverSliderProps>(
  ({ children, className, ...props }, ref) => {
    const [activeSlide, setActiveSlide] = React.useState<number>(0);
    const changeSlide = React.useCallback((index: number) => setActiveSlide(index), []);

    return (
      <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
        <section className={className} ref={ref} {...props}>
          {children}
        </section>
      </HoverSliderContext.Provider>
    );
  }
);
HoverSlider.displayName = "HoverSlider";

export const TextStaggerHover = React.forwardRef<HTMLSpanElement, TextStaggerHoverProps>(
  ({ text, index, className, ...props }, ref) => {
    const { activeSlide, changeSlide } = useHoverSliderContext();
    const isActive = activeSlide === index;
    
    // Split text into characters, handling spaces for layout
    const characters = text.split("").map((char) => (char === " " ? "\u00A0" : char));

    return (
      <span
        className={cn("relative inline-block overflow-hidden cursor-pointer", className)}
        onMouseEnter={() => changeSlide(index)}
        ref={ref}
        {...props}
      >
        {characters.map((char, charIndex) => (
          <span key={charIndex} className="relative inline-block overflow-hidden">
            <MotionConfig
              transition={{
                delay: charIndex * 0.01,
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <motion.span
                className="inline-block text-zinc-600"
                animate={isActive ? { y: "-100%" } : { y: "0%" }}
              >
                {char}
              </motion.span>
              <motion.span
                className="absolute left-0 top-0 inline-block text-white"
                initial={{ y: "100%" }}
                animate={isActive ? { y: "0%" } : { y: "100%" }}
              >
                {char}
              </motion.span>
            </MotionConfig>
          </span>
        ))}
      </span>
    );
  }
);
TextStaggerHover.displayName = "TextStaggerHover";

export const clipPathVariants = {
  visible: { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", opacity: 1, scale: 1 },
  hidden: { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", opacity: 0, scale: 1.05 },
};

export const HoverSliderImageWrap = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid [&>*]:col-start-1 [&>*]:row-start-1 [&>*]:size-full",
          className
        )}
        {...props}
      />
    );
  }
);
HoverSliderImageWrap.displayName = "HoverSliderImageWrap";

export const HoverSliderImage = React.forwardRef<HTMLImageElement, HTMLMotionProps<"img"> & HoverSliderImageProps>(
  ({ index, imageUrl, className, alt, ...props }, ref) => {
    const { activeSlide } = useHoverSliderContext();
    return (
      <motion.img
        src={imageUrl}
        alt={alt}
        className={cn("object-contain", className)}
        variants={clipPathVariants}
        initial="hidden"
        animate={activeSlide === index ? "visible" : "hidden"}
        transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.6 }}
        ref={ref}
        {...props}
      />
    );
  }
);
HoverSliderImage.displayName = "HoverSliderImage";
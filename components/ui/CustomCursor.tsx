'use client'
import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false)
    const [isHovering, setIsHovering] = useState(false)

    // Using motion values for performance to avoid React re-renders on every pixel move
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    // Spring physics configuration for the trailing ring to give it a fluid, premium feel
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 }
    const cursorXSpring = useSpring(cursorX, springConfig)
    const cursorYSpring = useSpring(cursorY, springConfig)

    useEffect(() => {
        // Only initialize on desktop devices with a fine pointer (mouse)
        if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
            return
        }

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)

            const target = e.target as HTMLElement
            // Look for any interactive element up the DOM tree
            const isClickable = target.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer') !== null

            setIsHovering(isClickable)
        }

        const handleMouseEnter = () => setIsVisible(true)
        const handleMouseLeave = () => setIsVisible(false)

        window.addEventListener('mousemove', moveCursor)
        window.addEventListener('mouseenter', handleMouseEnter)
        window.addEventListener('mouseleave', handleMouseLeave)

        // Show cursor by default once mounted
        setIsVisible(true)

        return () => {
            window.removeEventListener('mousemove', moveCursor)
            window.removeEventListener('mouseenter', handleMouseEnter)
            window.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [cursorX, cursorY])

    if (!isVisible) return null

    return (
        <>
            {/* The primary leading dot */}
            <motion.div
                className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[9999]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                    background: '#6366f1',
                    scale: isHovering ? 0 : 1, // Shrink to 0 when hovering to let the ring take focus
                    opacity: isHovering ? 0 : 1,
                }}
                transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
            />

            {/* The trailing reactive ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] flex items-center justify-center"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                    border: isHovering ? 'none' : '2px solid rgba(99, 102, 241, 0.4)',
                    background: isHovering ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                    scale: isHovering ? 1.5 : 1,
                    backdropFilter: isHovering ? 'blur(2px)' : 'none',
                }}
                transition={{ type: 'tween', ease: 'backOut', duration: 0.2 }}
            >
                {/* Tiny inner dot that scales up when hovering over an interactive element */}
                <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-indigo-400"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: isHovering ? 1 : 0,
                        scale: isHovering ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                />
            </motion.div>
        </>
    )
} 

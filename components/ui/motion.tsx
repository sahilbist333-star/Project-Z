"use client"

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ReactNode, useEffect, useState } from 'react'

interface WrapperProps {
    children: ReactNode
    delay?: number
    className?: string
}

export function FadeIn({ children, delay = 0, className = "" }: WrapperProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function ScaleIn({ children, delay = 0, className = "" }: WrapperProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function StaggerContainer({ children, className = "", delayChildren = 0 }: { children: ReactNode, className?: string, delayChildren?: number }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: 0.1,
                        delayChildren,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function StaggerItem({ children, className = "" }: { children: ReactNode, className?: string }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function FloatElement({ children, delay = 0, className = "" }: WrapperProps) {
    return (
        <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function GlowingPerspectiveCard({ children, className = "" }: { children: ReactNode, className?: string }) {
    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function InfiniteMarquee({ children, className = "", speed = 40 }: { children: ReactNode, className?: string, speed?: number }) {
    return (
        <div className={`overflow-hidden flex w-full ${className}`}>
            <motion.div
                className="flex items-center whitespace-nowrap min-w-full shrink-0"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: speed, ease: "linear", repeat: Infinity }}
            >
                <div className="flex items-center justify-around w-full shrink-0 px-6">
                    {children}
                </div>
                <div className="flex items-center justify-around w-full shrink-0 px-6">
                    {children}
                </div>
            </motion.div>
        </div>
    )
}

export function MousePerspectiveCard({ children, className = "" }: { children: ReactNode, className?: string }) {
    // Default values for a permanent 3D tilt
    const defaultX = 0.3
    const defaultY = -0.3

    const x = useMotionValue(defaultX)
    const y = useMotionValue(defaultY)

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5
        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(defaultX)
        y.set(defaultY)
    }

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={className}
        >
            <div style={{ transform: "translateZ(50px)" }} className="w-full h-full relative">
                {children}
            </div>
        </motion.div>
    )
}

export function HeroBackground3D({ className = "" }: { className?: string }) {
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    if (!mounted) return <div className={className} />

    return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${className}`} style={{ perspective: "1000px" }}>
            <motion.div
                animate={{ rotateX: [60, 60], rotateZ: [0, 360] }}
                transition={{ duration: 120, ease: "linear", repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] md:w-[150vw] md:h-[150vw] opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(99,102,241,0.5) 1px, transparent 0)',
                    backgroundSize: '40px 40px',
                    transformBox: "fill-box",
                    transformOrigin: "center center"
                }}
            />
            {/* 3D Floating Blobs */}
            <motion.div
                animate={{ y: [-20, 20], x: [-10, 10], rotate: [0, 10] }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-indigo-600/20 blur-[100px] rounded-full mix-blend-screen"
                style={{ transform: "translateZ(100px)" }}
            />
            <motion.div
                animate={{ y: [20, -20], x: [10, -10], rotate: [0, -10] }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[20%] left-[10%] w-[600px] h-[600px] bg-purple-600/10 blur-[100px] rounded-full mix-blend-screen"
                style={{ transform: "translateZ(50px)" }}
            />
            <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-blue-600/10 blur-[80px] rounded-full mix-blend-screen"
                style={{ transform: "translateZ(150px)" }}
            />
            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/80 via-transparent to-[#080808] z-[1]"></div>
        </div>
    )
}

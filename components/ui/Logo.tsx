'use client'
import Link from 'next/link'
import Image from 'next/image'

interface LogoProps {
    className?: string
    showText?: boolean
    link?: boolean
    size?: 'sm' | 'md' | 'lg'
}

export default function Logo({ className = '', showText = true, link = true, size = 'md' }: LogoProps) {
    const heightString = size === 'sm' ? 'h-6' : size === 'lg' ? 'h-10' : 'h-8'

    // We use a relatively high width limit to ensure the image scales purely by height via object-contain 
    const width = size === 'sm' ? 140 : size === 'lg' ? 240 : 180
    const height = size === 'sm' ? 24 : size === 'lg' ? 40 : 32

    const content = (
        <div className={`flex items-center group ${className}`}>
            <Image
                src="/logo.png"
                alt="Zointly Logo"
                width={width}
                height={height}
                className={`object-contain transition-transform group-hover:scale-[1.02] ${heightString} w-auto`}
                priority
            />
        </div>
    )

    if (link) {
        return <Link href="/">{content}</Link>
    }

    return content
}

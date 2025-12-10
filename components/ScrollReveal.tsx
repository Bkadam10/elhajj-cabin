
import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, className = "", delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.1,
                rootMargin: "50px"
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    const style = {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)', // Slightly increased distance
        // Slower duration (1.2s) for a more luxurious/aesthetic feel
        transition: `opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`
    };

    return (
        <div ref={ref} style={style} className={className}>
            {children}
        </div>
    );
};

export default ScrollReveal;

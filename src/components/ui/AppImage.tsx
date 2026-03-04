'use client';

import React, { useState, useCallback, useMemo, memo } from 'react';
import Image from 'next/image';

interface AppImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    priority?: boolean;
    quality?: number;
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
    fill?: boolean;
    sizes?: string;
    onClick?: () => void;
    fallbackSrc?: string;
    loading?: 'lazy' | 'eager';
    unoptimized?: boolean;
    [key: string]: unknown;
}

const AppImage = memo(function AppImage({
    src,
    alt,
    width,
    height,
    className = '',
    priority = false,
    quality = 85,
    placeholder = 'empty',
    blurDataURL,
    fill = false,
    sizes,
    onClick,
    fallbackSrc = '/assets/images/no_image.png',
    loading = 'lazy',
    unoptimized = false,
}: AppImageProps) {
    const [imageSrc, setImageSrc] = useState(src);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleError = useCallback(() => {
        if (!hasError && imageSrc !== fallbackSrc) {
            setImageSrc(fallbackSrc);
            setHasError(true);
        }
        setIsLoading(false);
    }, [hasError, imageSrc, fallbackSrc]);

    const handleLoad = useCallback(() => {
        setIsLoading(false);
        setHasError(false);
    }, []);

    const imageClassName = useMemo(() => {
        const classes = [className];
        if (isLoading) classes.push('bg-gray-200');
        if (onClick) classes.push('cursor-pointer hover:opacity-90 transition-opacity duration-200');
        return classes.filter(Boolean).join(' ');
    }, [className, isLoading, onClick]);

    const imageProps = useMemo(() => {
        return {
            src: imageSrc,
            alt,
            className: imageClassName,
            quality,
            placeholder,
            unoptimized,
            onError: handleError,
            onLoad: handleLoad,
            onClick,
            priority,
            loading: priority ? undefined : loading,
            blurDataURL: (blurDataURL && placeholder === 'blur') ? blurDataURL : undefined,
        };
    }, [imageSrc, alt, imageClassName, quality, placeholder, blurDataURL, unoptimized, priority, loading, handleError, handleLoad, onClick]);

    if (fill) {
        return (
            <div className="relative" style={{ width: '100%', height: '100%' }}>
                <Image
                    {...imageProps}
                    src={imageSrc}
                    alt={alt}
                    fill
                    sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
                    style={{ objectFit: 'cover' }}
                />
            </div>
        );
    }

    return (
        <Image
            {...imageProps}
            src={imageSrc}
            alt={alt}
            width={width || 400}
            height={height || 300}
            sizes={sizes}
        />
    );
});

AppImage.displayName = 'AppImage';

export default AppImage;
import { useEffect, useState } from 'react';

const breakpoints = {
    mobile: 640,
    tablet: 768,
    laptop: 1024,
    desktop: 1280,
};

const useResponsive = () => {
    const [screenSize, setScreenSize] = useState('desktop');

    const handleResize = () => {
        const width = window.innerWidth;
        if (width < breakpoints.mobile) {
            setScreenSize('mobile');
        }
        else if (width < breakpoints.tablet) {
            setScreenSize('tablet');
        }
        else if (width < breakpoints.laptop) {
            setScreenSize('laptop');
        }
        else {
            setScreenSize('desktop');
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return {
        screenSize,
        isMobile: screenSize === 'mobile',
        isTablet: screenSize === 'tablet',
        isLaptop: screenSize === 'laptop',
        isDesktop: screenSize === 'desktop',
    };
};

export default useResponsive;

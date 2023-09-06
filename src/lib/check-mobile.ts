export default function checkMobile(): boolean {
    // if (typeof window === 'undefined') return false; // Don't know why but this broke mobile detection partially
    
    const isMobile = window.matchMedia('(max-width: 720px)').matches;
    return isMobile;
}
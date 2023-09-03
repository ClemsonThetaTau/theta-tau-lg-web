export default function checkMobile(): boolean {
    const isMobile = window.matchMedia('(max-width: 600px)').matches;
    return isMobile;
}
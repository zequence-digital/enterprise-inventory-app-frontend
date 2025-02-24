export function useGoogleRedirect(url: string) {
    let pathname;
    if (typeof window !== 'undefined') {
        pathname = window.location.origin + url;
    }

    return { pathname };
}

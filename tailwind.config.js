/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./src/**/*.{html,js}"
    ],
    theme: {
        extend: {
            fontFamily: {
                grostek: ['Host Grotesk', 'serif']
            }
        },
        keyframes: {
            overlayShow: {
                from: {opacity: "0"},
                to: {opacity: "1"},
            },
            contentShow: {
                from: {
                    opacity: "0",
                    transform: "translate(-50%, -48%) scale(0.96)",
                },
                to: {opacity: "1", transform: "translate(-50%, -50%) scale(1)"},
            },
            spin: {
                from: {
                    transform: 'rotate(0deg)',
                },
                to: {
                    transform: 'rotate(360deg)',
                },
            },
        },
        animation: {
            overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
            contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
            'spin-slow': 'spin 3s linear infinite', // Slow spin
            'spin-fast': 'spin 0.5s linear infinite', // Fast spin
        },
    },
    plugins: [],
}


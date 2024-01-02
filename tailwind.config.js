/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'white-5': 'rgba(255, 255, 255, 0.05)',
				'white-15': 'rgba(255, 255, 255, 0.15)'
			},
			animation: {
				handwave: 'handwave 2.5s infinite',
				twinkle: 'twinkle 5s linear infinite'
			},
			keyframes: {
				handwave: {
					'0%, 60%, 100%': { transform: 'rotate(0deg)' },
					'50%': { transform: 'rotate(10deg)' },
					'10%, 30%': { transform: 'rotate(14deg)' },
					'20%': { transform: 'rotate(-8deg)' },
					'40%': { transform: 'rotate(-4deg)' }
				},
				twinkle: {
					'0%': {
						transform: 'scale(1)',
						backgroundColor: 'rgba(255, 255, 255, 0.0)',
						animationTimingFunction: 'ease-in'
					},
					'60%': {
						transform: 'scale(0.8)',
						backgroundColor: 'rgba(255, 255, 255, 1)',
						animationTimingFunction: 'ease-out'
					},
					'80%, 100%': {
						transform: 'scale(1)',
						backgroundColor: 'rgba(255, 255, 255, 0.0)'
					}
				}
			}
		}
	},
	plugins: []
};

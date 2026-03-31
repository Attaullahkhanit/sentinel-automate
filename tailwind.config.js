/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/renderer/index.html",
    "./src/renderer/src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-main': 'var(--bg-main)',
        'bg-surface': 'var(--bg-surface)',
        'bg-surface-light': 'var(--bg-surface-light)',
        'border-color': 'var(--border-color)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'primary': 'var(--primary)',
        'primary-bg': 'var(--primary-bg)',
        'success': 'var(--success)',
        'danger': 'var(--danger)',
        'warning': 'var(--warning)',
      },
      fontFamily: {
        'tech-mono': 'var(--font-mono)',
        'tech-sans': 'var(--font-sans)',
      }
    },
  },
  plugins: [],
}

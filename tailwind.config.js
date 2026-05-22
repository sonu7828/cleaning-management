module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A",
        secondary: "#2563EB",
        background: "#0F172A",
        card: "#111827",
        border: "#1F2937",
        textPrimary: "#F9FAFB",
        textSecondary: "#9CA3AF",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
        // Deep navy CRM palette
        "navy-950": "#0a0e27",
        "navy-900": "#0f1535",
        "navy-800": "#141d42",
        "navy-700": "#1a2550",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
      },
      screens: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        "bounce-slow": "bounce 2s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "fade-in": "fadeIn 0.3s ease-out forwards",
        "shake": "shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-4px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(4px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "glow-blue": "0 0 25px rgba(37, 99, 235, 0.15)",
        "glow-purple": "0 0 25px rgba(168, 85, 247, 0.15)",
        "glow-emerald": "0 0 25px rgba(16, 185, 129, 0.15)",
        "glow-indigo": "0 0 30px rgba(99, 102, 241, 0.15)",
        panel: "0 20px 40px rgba(0, 0, 0, 0.5), 0 1px 0 rgba(255,255,255,0.05) inset",
        "premium-glow": "0 0 30px rgba(59, 130, 246, 0.08)",
        "login-card": "0 25px 60px rgba(0, 0, 0, 0.6), 0 1px 0 rgba(255,255,255,0.04) inset",
      },
    },
  },
  plugins: [],
};
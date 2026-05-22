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
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "glow-blue": "0 0 25px rgba(37, 99, 235, 0.15)",
        "glow-purple": "0 0 25px rgba(168, 85, 247, 0.15)",
        "glow-emerald": "0 0 25px rgba(16, 185, 129, 0.15)",
        panel: "0 20px 40px rgba(0, 0, 0, 0.5), 0 1px 0 rgba(255,255,255,0.05) inset",
        "premium-glow": "0 0 30px rgba(59, 130, 246, 0.08)",
      },
    },
  },
  plugins: [],
};
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    borderRadius: {
      none: "0px",
      sm: "2px",
      DEFAULT: "4px",
      md: "4px",
      lg: "4px",
      xl: "4px",
      "2xl": "4px",
      "3xl": "4px",
      full: "9999px",
    },
    extend: {
      colors: {
        primary: "#347AB7",
        secondary: "#2E6C9E",
        background: "#EBF2F6",
        card: "#FFFFFF",
        border: "#D1DDE5",
        textPrimary: "#1E293B",
        textSecondary: "#64748B",
        success: "#10B981",
        warning: "#FF3709",
        danger: "#EF4444",
        // Map standard blue colors to Workstair blue shades
        blue: {
          50: '#F0F5FA',
          100: '#E1EBF5',
          500: '#347AB7',
          600: '#2E6C9E',
          700: '#265982',
        },
        // Deep navy CRM palette mapped to Workstair blue & grey-blue for compatibility
        "navy-950": "#265982",
        "navy-900": "#2E6C9E",
        "navy-800": "#347AB7",
        "navy-700": "#E9F0F5",
      },
      fontFamily: {
        sans: ["Open Sans", "Inter", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
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
        "glow-blue": "none",
        "glow-purple": "none",
        "glow-emerald": "none",
        "glow-indigo": "none",
        panel: "0 1px 3px rgba(0, 0, 0, 0.05)",
        "premium-glow": "none",
        "login-card": "0 4px 12px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
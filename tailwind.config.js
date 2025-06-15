/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./content/posts/**/*.{md}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            lineHeight: "1.75",
            fontSize: "1.125rem",
            h1: {
              fontSize: "2.25rem",
              fontWeight: "800",
              lineHeight: "1.1",
              marginBottom: "2rem",
            },
            h2: {
              fontSize: "1.875rem",
              fontWeight: "700",
              lineHeight: "1.2",
              marginTop: "2.5rem",
              marginBottom: "1.5rem",
            },
            h3: {
              fontSize: "1.5rem",
              fontWeight: "600",
              lineHeight: "1.3",
              marginTop: "2rem",
              marginBottom: "1rem",
            },
            p: {
              marginBottom: "1.5rem",
              lineHeight: "1.8",
            },
            img: {
              borderRadius: "0.75rem",
              marginTop: "2rem",
              marginBottom: "2rem",
            },
            blockquote: {
              borderLeftWidth: "4px",
              padding: "1rem 1.5rem",
              borderRadius: "0.5rem",
              fontStyle: "italic",
              marginTop: "2rem",
              marginBottom: "2rem",
            },
            code: {
              padding: "0.25rem 0.5rem",
              borderRadius: "0.375rem",
              fontSize: "0.875rem",
            },
            pre: {
              borderRadius: "0.5rem",
              padding: "1.5rem",
              overflow: "auto",
              marginTop: "2rem",
              marginBottom: "2rem",
            },
          },
        },
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("tailwindcss-animate"),
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("@tailwindcss/typography"),
  ],
};

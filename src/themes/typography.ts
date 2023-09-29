// ==============================|| DEFAULT THEME - TYPOGRAPHY  ||============================== //
declare module "@mui/material/styles" {
  interface TypographyVariants {
    fontSizeNotFoundTitle: number
    fontSizeNotFoundSubtitle: number
    fontSizeNotFoundSubtitle2: number
  }

  interface TypographyVariantsOptions {
    fontSizeNotFoundTitle?: React.CSSProperties
    fontSizeNotFoundSubtitle?: React.CSSProperties
    fontSizeNotFoundSubtitle2?: React.CSSProperties
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    fontSizeNotFoundTitle: true
    fontSizeNotFoundSubtitle: true
    fontSizeNotFoundSubtitle2: true
  }
}
const Typography = (fontFamily: string) => ({
  htmlFontSize: 16,
  fontFamily,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,
  h1: {
    fontWeight: 600,
    fontSize: "2.375rem",
    lineHeight: 1.21
  },
  h2: {
    fontWeight: 600,
    fontSize: "1.875rem",
    lineHeight: 1.27
  },
  h3: {
    fontWeight: 600,
    fontSize: "1.5rem",
    lineHeight: 1.33
  },
  h4: {
    fontWeight: 600,
    fontSize: "1.25rem",
    lineHeight: 1.4
  },
  h5: {
    fontWeight: 600,
    fontSize: "1rem",
    lineHeight: 1.5
  },
  h6: {
    fontWeight: 400,
    fontSize: "0.875rem",
    lineHeight: 1.57
  },
  caption: {
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: 1.66
  },
  body1: {
    fontSize: "0.875rem",
    lineHeight: 1.57
  },
  body2: {
    fontSize: "0.75rem",
    lineHeight: 1.66
  },
  subtitle1: {
    fontSize: "0.875rem",
    fontWeight: 600,
    lineHeight: 1.57
  },
  subtitle2: {
    fontSize: "0.75rem",
    fontWeight: 500,
    lineHeight: 1.66
  },
  overline: {
    lineHeight: 1.66
  },
  button: {
    textTransform: "capitalize"
  },
  fontSizeNotFoundTitle: "calc(17vh + 40px)",
  fontSizeNotFoundSubtitle: "calc(4vh + 1px)",
  fontSizeNotFoundSubtitle2: "calc(1vh + 8px)"
})

export default Typography

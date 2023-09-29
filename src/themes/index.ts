// material-ui
import { createTheme, ThemeOptions } from "@mui/material/styles"

// project import
import Palette from "./palette"
import Typography from "./typography"
import CustomShadows from "./shadows"
import componentsOverride from "./overrides"
import { PaletteMode } from "@mui/material"
import { PaletteColorOptions } from "@mui/material/styles/createPalette"

// ==============================|| DEFAULT THEME - MAIN  ||============================== //

declare module "@mui/material/styles" {
  interface Palette {
    dark: PaletteColorOptions
    textInfo: PaletteColorOptions
  }
  // allow configuration using `createTheme`
  interface PaletteOptions {
    dark?: PaletteColorOptions
    textInfo?: PaletteColorOptions
  }

  interface PaletteColor {
    lighter?: string
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    dark: true
    textInfo: true
  }
}

const ThemeCustomization = (mode: PaletteMode) => {
  const theme = Palette(mode)

  const themeOptions = {
    breakpoints: {
      values: {
        xs: 0,
        sm: 768,
        md: 1024,
        lg: 1266,
        xl: 1536
      }
    },
    direction: "ltr",
    mixins: {
      toolbar: {
        minHeight: 60,
        paddingTop: 8,
        paddingBottom: 8
      }
    },
    palette: theme.palette,
    customShadows: CustomShadows(theme),
    typography: Typography(`'Inter', 'Helvetica Neue', Arial, sans-serif`)
  } as ThemeOptions

  const themes = createTheme(themeOptions)
  themes.components = componentsOverride(themes)

  return themes
}

const theme = ThemeCustomization("light")

export default theme

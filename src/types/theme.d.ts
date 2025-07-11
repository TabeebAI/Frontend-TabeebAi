import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary?: Palette['primary'];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
  }
  
  interface TypographyVariants {
    code?: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    code?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    code: true;
  }
}

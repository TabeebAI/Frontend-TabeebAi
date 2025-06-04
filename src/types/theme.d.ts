import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary?: Palette['primary'];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
  }
  // Likewise for custom typography variants:
  interface TypographyVariants {
    code?: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    code?: React.CSSProperties;
  }
}

// Also let <Typography variant="code" /> work:
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    code: true;
  }
}

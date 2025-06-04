import React from "react";
import { Container, Grid, Link, Typography, Box, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        mt: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={4}
          justifyContent="space-between"
          component={motion.div}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Contact Info */}
          <Grid size={{xs:12, md:4}}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: support@gmail.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +1 (555) 123-4567
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Address: 123 Consultation Street, City, Country
            </Typography>
          </Grid>

          {/* Legal Links */}
          <Grid size={{xs:12, md:4}}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Legal
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Link href="/privacy-policy" color="inherit" underline="hover">
                Privacy Policy
              </Link>
              <Link href="/terms-of-use" color="inherit" underline="hover">
                Terms of Use
              </Link>
            </Box>
          </Grid>

          {/* Social Links */}
          <Grid size={{xs:12, md:4}}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton
                component="a"
                href="https://facebook.com"
                target="_blank"
                rel="noopener"
                color="inherit"
              >
                <Facebook />
              </IconButton>
              <IconButton
                component="a"
                href="https://twitter.com"
                target="_blank"
                rel="noopener"
                color="inherit"
              >
                <Twitter />
              </IconButton>
              <IconButton
                component="a"
                href="https://instagram.com"
                target="_blank"
                rel="noopener"
                color="inherit"
              >
                <Instagram />
              </IconButton>
              <IconButton
                component="a"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener"
                color="inherit"
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box textAlign="center" mt={5}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} HISS. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

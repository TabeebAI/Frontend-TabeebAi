import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";
import heroImage from "@assets/images/doctor-robot.png";

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const HeroSection: React.FC = () => {
  return (
    <section id="hero" style={{ scrollMarginTop: "200px" }}>
      <Box
        sx={{
          height: "92vh",
          display: "flex",
          alignItems: "center",
          px: 3,
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ width: "100%" }}
        >
          <Grid container spacing={6} alignItems="center">
            {/* Left Column - Text Content */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <motion.div variants={fadeInUp}>
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: "1rem", md: "3rem" },
                    lineHeight: 1.2,
                    mb: 3,
                    color: "primary.dark",
                  }}
                >
                  Your Smart Medical Partner —
                  <Box
                    component="span"
                    sx={{ color: "secondary.main", display: "block" }}
                  >
                    Get AI-Driven Health Advice Instantly
                  </Box>
                </Typography>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: { xs: "1.1rem", md: "1.3rem" },
                    mb: 4,
                    color: "text.secondary",
                  }}
                >
                  Fast. Private. Personalized consultations backed by medical
                  intelligence.
                </Typography>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                  <Button
                    component={RouterLink}
                    to="/login"
                    variant="contained"
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: "50px",
                      textTransform: "none",
                      fontSize: "1.1rem",
                      color: "secondary.dark",
                      "&:hover": {
                        borderColor: "secondary.dark",
                        color: "primary.main",
                      },
                    }}
                  >
                    Get Started
                  </Button>

                  <ScrollLink to="learn-more-target" smooth duration={500}>
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: "50px",
                        textTransform: "none",
                        fontSize: "1.1rem",
                        borderColor: "secondary.main",
                        color: "secondary.main",
                        "&:hover": {
                          borderColor: "secondary.dark",
                          color: "secondary.dark",
                        },
                      }}
                    >
                      Learn More
                    </Button>
                  </ScrollLink>
                </Box>
              </motion.div>
            </Grid>

            {/* Right Column - Image */}
            <Grid
              size={{ xs: 12, sm: 6 }}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <motion.div variants={imageVariants}>
                <Box
                  sx={{
                    maxWidth: "650px",
                    width: "100%",
                    position: "relative",
                    "& img": {
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                    },
                  }}
                >
                  <img
                    src={heroImage}
                    alt="AI-powered medical assistant illustration"
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Box>
    </section>
  );
};

export default HeroSection;

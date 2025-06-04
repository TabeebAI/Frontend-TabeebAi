import React from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { textVariants } from "@pages/landingPage/components/TestimonialSection/animations";

import ctaGif from "@assets/videos/cta.gif";

const CTASection: React.FC = () => {
  return (
    <section id="cta" style={{ scrollMarginTop: "80px" }}>
      <Container
        maxWidth="xl"
        sx={{
          py: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          bgcolor: "white",
        }}
        component={motion.section}
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {/* 1. GIF */}
        <Box
          component={motion.img}
          src={ctaGif}
          alt="Consultation animation"
          variants={textVariants}
          sx={{
            width: { xs: "20%", md: "10%" },
            mb: 2,
            borderRadius: 2,
            boxShadow: 3,
          }}
        />

        {/* 2. Heading */}
        <Typography
          variant="h3"
          fontWeight={700}
          gutterBottom
          component={motion.h2}
          variants={textVariants}
        >
          Start your consultation today
        </Typography>

        {/* 3. Subtext */}
        <Typography
          variant="body1"
          color="text.secondary"
          mb={4}
          component={motion.p}
          variants={textVariants}
        >
          Join us and experience personalized solutions tailored just for you.
        </Typography>

        {/* 4. Button */}
        <motion.div variants={textVariants}>
          <Button
            variant="outlined"
            sx={{
              borderRadius: "999px",
              borderColor: "secondary.main",
              color: "secondary.main",
              "&:hover": {
                borderColor: "secondary.dark",
                color: "primary.main",
                backgroundColor: "secondary.dark",
                boxShadow: (theme) =>
                  `0 2px 8px ${theme.palette.secondary.light}`,
              },
            }}
          >
            Sign Up / Login
          </Button>
        </motion.div>
      </Container>
    </section>
  );
};

export default CTASection;

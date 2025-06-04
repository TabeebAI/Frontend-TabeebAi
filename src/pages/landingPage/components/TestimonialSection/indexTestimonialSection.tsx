import React from "react";
import { Button, Container, Grid, Typography, styled } from "@mui/material";
import { motion } from "framer-motion";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "./data/testimonials";
import { containerVariants, textVariants, cardVariants } from "./animations";

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.light} 100%)`,
  color: theme.palette.getContrastText(theme.palette.secondary.main),
  padding: theme.spacing(1, 4),
  borderRadius: theme.shape.borderRadius * 2,
  textTransform: "none",
  fontWeight: 600,
  "&:hover": {
    background: `linear-gradient(45deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
  },
}));

const MotionGrid = motion(Grid);

const TestimonialSection: React.FC = () => {
  return (
    <section id="testimonials" style={{ scrollMarginTop: "1000px" }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* animate the whole grid container */}
        <MotionGrid
          container
          spacing={4}
          alignItems="center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* left: testimonials list */}
          <MotionGrid
            size={{ xs: 12, md: 7 }}
            container
            direction="column"
            variants={containerVariants} // you can nest another stagger if you like
          >
            {testimonials.map((t, i) => (
              <MotionGrid key={t.name} variants={cardVariants}>
                <TestimonialCard
                  testimonial={t}
                  highlighted={i === 1}
                  index={i}
                  total={testimonials.length}
                />
              </MotionGrid>
            ))}
          </MotionGrid>

          {/* right: heading, text, button */}
          <MotionGrid
            size={{ xs: 12, md: 5 }}
            container
            direction="column"
            justifyContent="center"
            variants={textVariants}
          >
            <Typography
              component={motion.h2}
              variant="h3"
              fontWeight={700}
              gutterBottom
              variants={textVariants}
            >
              What Our Customers Says
            </Typography>
            <Typography
              component={motion.p}
              variant="body1"
              color="text.secondary"
              mb={4}
              variants={textVariants}
            >
              Relation so in confined smallest children unpacked delicate. Why
              sir end believe uncivil respect. Always get adieus nature day
              course for common.
            </Typography>
            <motion.div variants={textVariants}>
              <GradientButton variant="contained">View More</GradientButton>
            </motion.div>
          </MotionGrid>
        </MotionGrid>
      </Container>
    </section>
  );
};

export default TestimonialSection;

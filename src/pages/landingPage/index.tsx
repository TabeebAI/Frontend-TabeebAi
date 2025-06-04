import React from "react";
import { Box } from "@mui/material";
import HeroSection from "@/pages/landingPage/components/heroSection";
import HowItWorksSection from "@/pages/landingPage/components/HowItWorksSection";
import AIPoweredFeaturesSection from "@/pages/landingPage/components/AIPoweredFeaturesSection";
import IndexTestimonialSection from "@/pages/landingPage/components/TestimonialSection/indexTestimonialSection";
import CTASection from "@/pages/landingPage/components/CTASection";

const LandingPage: React.FC = () => (
  <Box
    sx={{
      pt: "62px",
      "& section": {
        scrollMarginTop: "80px",
      },
    }}
  >
    <HeroSection />
    <HowItWorksSection />
    <AIPoweredFeaturesSection />
    <IndexTestimonialSection />
    <CTASection />
  </Box>
);

export default LandingPage;

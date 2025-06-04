import React from "react";
import { Box, Grid, Typography, styled } from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

// Styled Components
const Section = styled(motion.section)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(12, 3),
}));

const FeatureItem = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(2),
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  flexShrink: 0,
  width: 48,
  height: 48,
  borderRadius: 8,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

// Animation Variants
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const features = [
  { title: 'Smart symptom checker', icon: <CheckCircleIcon /> },
  { title: 'Personalized recommendations', icon: <ThumbUpAltOutlinedIcon /> },
  { title: 'Specialist matching', icon: <ForumOutlinedIcon /> },
  { title: '24/7 access', icon: <AccessTimeOutlinedIcon /> },
];

const AIPoweredFeatures: React.FC = () => {
  return (
    <Section
      id="features"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      sx={{backgroundColor: "background.default"}}
      style={{ scrollMarginTop: "80px" }}
    >
      <Grid container spacing={4} alignItems="flex-start">
        {/* Title Column */}
        <Grid size={{ xs:12, md:4}}>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>
            Feature benefits
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Discover how our AI-driven medical assistant empowers you with reliable insights,
            instant access, and expert matches—all at your fingertips.
          </Typography>
        </Grid>

        {/* Features List Column */}
        <Grid size={{ xs:12, md:8}}>
          <Grid container spacing={4}>
            {features.map((feature, idx) => (
              <Grid size={{ xs:12, sm:6}} key={idx}>
                <motion.div variants={itemVariants}>
                  <FeatureItem>
                    <IconWrapper>{feature.icon}</IconWrapper>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`Description for ${feature.title.toLowerCase()}.`}
                      </Typography>
                    </Box>
                  </FeatureItem>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Section>
  );
};

export default AIPoweredFeatures;

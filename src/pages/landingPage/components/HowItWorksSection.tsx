import React from "react";
import { Box, Grid, Typography, Card, styled } from "@mui/material";
import { motion } from "framer-motion";
import DescriptionIcon from '@mui/icons-material/Description';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ChatIcon from '@mui/icons-material/Chat';

// Styled components
const Section = styled(motion.section)(({ theme }) => ({
  background: theme.palette.grey[50],
  padding: theme.spacing(8, 3),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  height: '100%',
  textAlign: 'center',
  padding: theme.spacing(4, 2),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[2],
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[6],
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  margin: '0 auto',
  borderRadius: '50%',
  background: theme.palette.primary.light,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: theme.shadows[1],
  marginBottom: theme.spacing(2),
}));

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const steps = [
  {
    title: 'Describe Symptoms',
    description: 'Share your symptoms in detail and any relevant medical history.',
    icon: <DescriptionIcon sx={{ fontSize: 40, color: 'secondary.main' }} />
  },
  {
    title: 'AI Analyzes & Recommends',
    description: 'Our AI engine analyzes your inputs and suggests personalized next steps.',
    icon: <AnalyticsIcon sx={{ fontSize: 40, color: 'secondary.main' }} />
  },
  {
    title: 'Get Report or Chat',
    description: 'Receive a detailed report or connect instantly with a healthcare specialist.',
    icon: <ChatIcon sx={{ fontSize: 40, color: 'secondary.main' }} />
  }
];

const HowItWorksSection: React.FC = () => (
  <Section
    id="how-it-works"
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    style={{ scrollMarginTop: "80px" }}
  >
    <Typography variant="h2" align="center" sx={{ fontWeight: 700, color: 'text.primary' }}>
      How It Works
    </Typography>
    <Typography variant="subtitle1" align="center" sx={{ mb: 6, color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
      A seamless three-step process to get reliable health insights powered by AI.
    </Typography>

    <Grid container spacing={4} justifyContent="center" alignItems="stretch">
      {steps.map((step, index) => (
        <Grid size={{ xs:12, sm:6, md:4}} key={index} sx={{ display: 'flex' }}>
          <motion.div variants={itemVariants} style={{ width: '100%' }}>
            <StyledCard elevation={0}>
              <IconWrapper>{step.icon}</IconWrapper>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                <Box component="span" sx={{ color: 'primary.main', mr: 1 }}>0{index + 1}</Box>
                {step.title}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Typography variant="body2" color="text.secondary">
                {step.description}
              </Typography>
            </StyledCard>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  </Section>
);

export default HowItWorksSection;

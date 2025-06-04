import React from "react";
import { Avatar, Box, Card, Typography, useTheme, styled } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

export interface Testimonial {
  name: string;
  avatarSrc: string;
  text: string;
}

interface Props {
  testimonial: Testimonial;
  highlighted?: boolean;
  index: number;
  total: number;
}

const HighlightBar = styled("div")<{ highlightColor: string }>(
  ({ highlightColor }) => ({
    width: 4,
    borderRadius: 4,
    background: highlightColor,
    marginRight: 16,
  })
);

const TestimonialCard: React.FC<Props> = ({
  testimonial,
  highlighted = false,
  index,
  total,
}) => {
  const theme = useTheme();
  const greyBorder = theme.palette.grey[400];
  const gradient = `linear-gradient(180deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.light} 100%)`;

  // determine which color to use
  const rightBorderColor =
    index === 0 || index === total - 1
      ? greyBorder
      : theme.palette.secondary.main;

  return (
    <Card
      elevation={highlighted ? 4 : 1}
      sx={{
        width: '80%',
        display: 'flex',
        alignItems: 'flex-start',
        p: 2,
        mb: 4,
        backgroundColor: theme.palette.background.paper,
        transform: highlighted ? 'translateX(3rem)' : 'none',
        transition: 'transform 0.3s ease',
        borderRight: 4,
        borderColor: rightBorderColor,
      }}
    >
      {highlighted && <HighlightBar highlightColor={gradient} />}
      <Avatar
        src={testimonial.avatarSrc}
        sx={{ width: 48, height: 48, mr: 2 }}
      />
      <Box flex={1}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="subtitle1" fontWeight={600}>
            {testimonial.name}
          </Typography>
          <FormatQuoteIcon
            sx={{
              fontSize: 32,
              background: highlighted
                ? gradient
                : theme.palette.action.disabledBackground,
              color: highlighted ? "#fff" : theme.palette.text.disabled,
              borderRadius: "50%",
              p: highlighted ? 0.5 : 0.3,
            }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {testimonial.text}
        </Typography>
      </Box>
    </Card>
  );
};

export default TestimonialCard;

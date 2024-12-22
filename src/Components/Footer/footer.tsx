import React from "react";
import { Box, Container, Typography, IconButton, Link } from "@mui/material";
import { Grid as MuiGrid } from "@mui/material";
import { styled } from "@mui/system";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, } from "react-icons/fa";
import {MdOutlineAlternateEmail} from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: "#1976d2",
  color: "#ffffff",
  padding: theme.spacing(6, 0),
  marginTop: "auto"
}));

const StyledLink = styled(Link)({
  color: "#ffffff",
  textDecoration: "none",
  "&:hover": {
    color: "#e0e0e0",
    textDecoration: "underline"
  }
});

const SocialIcon = styled(IconButton)({
  color: "#ffffff",
  "&:hover": {
    color: "#e0e0e0",
    backgroundColor: "rgba(255, 255, 255, 0.1)"
  }
});

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
    { title: "Privacy Policy", path: "/privacy" }
  ];

  const socialLinks = [
    { icon: <FaFacebook size={24} />, url: "https://facebook.com", label: "Facebook" },
    { icon: <FaTwitter size={24} />, url: "https://twitter.com", label: "Twitter" },
    { icon: <FaInstagram size={24} />, url: "https://instagram.com", label: "Instagram" },
    { icon: <FaLinkedin size={24} />, url: "https://linkedin.com", label: "LinkedIn" }
  ];

  return (
    <StyledFooter as="footer">
      <Container maxWidth="lg">
        <MuiGrid container spacing={4}>
          <MuiGrid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Navigation
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              {navigationLinks.map((link) => (
                <StyledLink
                  key={link.title}
                  href={link.path}
                  aria-label={`Navigate to ${link.title}`}
                >
                  {link.title}
                </StyledLink>
              ))}
            </Box>
          </MuiGrid>

          <MuiGrid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Connect With Us
            </Typography>
            <Box display="flex" gap={2}>
              {socialLinks.map((social) => (
                <StyledLink
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <SocialIcon>
                    {social.icon}
                  </SocialIcon>
                </StyledLink>
              ))}
            </Box>
          </MuiGrid>

          <MuiGrid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              <MdOutlineAlternateEmail  style={{marginRight: 10}}/>  
              Email: info@yourapp.com
            </Typography>
            <Typography variant="body2">
              <FaPhone style={{marginRight: 10}}/>
              Phone: +1 (555) 123-4567
            </Typography>
            <Typography variant="body2">
              <FaLocationDot style={{marginRight: 10}}/>
              Address: 123 App Street, Digital City, 12345
            </Typography>
          </MuiGrid>

          <MuiGrid item xs={12}>
            <Box
              sx={{
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                paddingTop: 2,
                marginTop: 2,
                textAlign: "center"
              }}
            >
              <Typography variant="body2">
                © {currentYear} Social Media App.
              </Typography>
            </Box>
          </MuiGrid>
        </MuiGrid>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
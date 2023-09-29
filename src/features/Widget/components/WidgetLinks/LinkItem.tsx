import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system"
import { Link } from "react-router-dom";
import IMSImage from "@/components/Image/IMSImage";
import { IWidgetLinkItem } from "@/types";

const LinkItemWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: 'column',
  alignItems: "center",
  gap: theme.spacing(1)
}))

const StyledTypography = styled(Typography)({
  fontWeight: '600',
  color: '#888',
  whiteSpace: 'nowrap',
  width: '100%',
  textAlign: 'center'
})

export const LinkItem = ({ img: { src, alt }, link }: IWidgetLinkItem) => {
  return (
    <Link to={link} target="_blank">
      <LinkItemWrapper>
        <IMSImage src={src} alt={alt} sx={{
          objectFit: 'contain',
          width: '100%',
          height: '55px'
        }} />
        <StyledTypography variant="body2">
          {alt}
        </StyledTypography>
      </LinkItemWrapper>
    </Link>
  );
}

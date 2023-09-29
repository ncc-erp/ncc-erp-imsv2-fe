import { Box } from "@mui/material"
import { styled } from "@mui/system"
import { WidgetLinksItems } from "@/enums/widget"
import { LinkItem } from "../components/WidgetLinks/LinkItem"
import { IWidgetLinkItem } from "@/types"

const LinksWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  paddingTop: theme.spacing(1)
}))

const WidgetLinks = (): JSX.Element => {
  return (
    <LinksWrapper>
      {WidgetLinksItems.map((link: (IWidgetLinkItem)) => <LinkItem key={link.id} img={link.img} link={link.link} />)}
    </LinksWrapper>
  )
}

export default WidgetLinks

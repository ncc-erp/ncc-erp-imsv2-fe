import { IFacesRes } from "@/types/faces"
import { longDateTimeFormat } from "@/utils/time"
import { AccessTime } from "@mui/icons-material"
import { Box, styled, Theme, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useState } from "react"
import { BasicTooltip } from "../Tooltip/Tooltip"

interface FaceCardProps {
  user: IFacesRes
}

const useStyles = makeStyles<Theme>((theme) => ({
  containerContent: {
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
    padding: "6px 0px",
    display: "none"
  },

  projects: {
    color: theme.palette.text.secondary,
    display: "-webkit-box",
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
    textOverflow: "ellipsis"
  },
  positionInfo: {
    color: "white",
    borderRadius: theme.shape.borderRadius,
    fontWeight: "bolder"
  },
  name: {
    fontWeight: "bolder",
    borderRadius: theme.shape.borderRadius,
    color: "white"
  },
  checkInTime: {
    borderRadius: theme.shape.borderRadius,
    color: "white",
    display: "flex",
    gap: "3px"
  },
  positionAndCheckInTime: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    "&:hover": {
      "& $containerContent": {
        display: "flex"
      }
    }
  }
}))

const StyledFaceCard = styled(Box)<{ img: string }>(({ theme, img }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  backgroundImage: `url(${img})`,
  backgroundSize: "cover",
  backgroundPosition: "center center",
  "&:hover": {
    backgroundImage: `linear-gradient(180deg, rgba(103,103,103,0.9) 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.5) 60%, rgba(103,103,103,1) 100%), url(${img})`
  }
}))

export function FaceCard({
  user: { fullName, branch, type, checkInAt, img, projectUsers }
}: FaceCardProps) {
  const classes = useStyles({ img })
  const position = [branch, type].filter((item) => item).join(" - ")

  return (
    <BasicTooltip
      placement="bottom"
      enterDelay={500}
      content={
        projectUsers.length > 0 && (
          <Box gap={"0.5rem"} display={"flex"} flexDirection="column">
            {projectUsers.map((project) => (
              <Box key={project.projectId}>
                <Typography variant="body1">
                  {`${project.projectName}`}
                </Typography>
                <Typography variant="body2" className={classes.projects}>
                  {project.pms.join(", ")}
                </Typography>
              </Box>
            ))}
          </Box>
        )
      }
    >
      <StyledFaceCard className={classes.root} img={img}>
        <Box className={classes.containerContent}>
          <Typography className={classes.name} variant="h5" component="div">
            {fullName}
          </Typography>
          <Box className={classes.positionAndCheckInTime}>
            <Typography
              className={classes.positionInfo}
              variant="body1"
              component="div"
            >
              {position}
            </Typography>
            <div className={classes.checkInTime}>
              <AccessTime color="disabled" fontSize="small" />
              <Typography>{longDateTimeFormat(new Date(checkInAt))}</Typography>
            </div>
          </Box>
        </Box>
      </StyledFaceCard>
    </BasicTooltip>
  )
}

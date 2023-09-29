import { List, ListItem, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useLocation, useNavigate } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import { AppDispatch } from '@/store'
import { setSubCategoryId } from '@/store/news'
import { DEFAULT_ALL } from '@/types'
import { NewsIcon } from '../icons/NewsIcon'
import { GuidelinesIcon } from '../icons/GuidelinesIcon'
import { TraditionalRoomIcon } from '../icons/TraditionalRoomIcon'
import { PoliciesIcon } from '../icons/PoliciesIcon'
import { EventsIcon } from '../icons/EventsIcon'
import { HomeIcon } from '../icons/HomeIcon'

type INavbarProps = PropsFromStore

export const navbarItem = [
  {
    label: "Dashboard",
    link: "/dashboard",
    Icon: HomeIcon
  },
  {
    label: "News",
    link: "/information/news",
    Icon: NewsIcon
  },
  {
    label: "Events",
    link: "/information/events",
    Icon: EventsIcon
  },
  {
    label: "Guidelines",
    link: "/information/guidelines",
    Icon: GuidelinesIcon
  },
  {
    label: "Policies",
    link: "/information/policies",
    Icon: PoliciesIcon
  },
  {
    label: "Traditional room",
    link: "/traditional-room",
    Icon: TraditionalRoomIcon
  }
]

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  navbar: {
    padding: 0,
    display: "flex",
    gap: theme.spacing(1),
    listStyle: "none",
    fontSize: theme.typography.h5.fontSize,
    "& .MuiListItem-root": {
      color: "#000",
      fontWeight: theme.typography.fontWeightRegular,
      padding: "4px 8px",
      display: "flex",
      alignItems: "center",
      gap: theme.spacing(1),
      transition: ".25s",
      cursor: "pointer",
      width: "unset",
      "&:hover": {
        color: theme.palette.primary.light
      }
    },
    "& img": {
      width: 26
    },
  },
  active: {
    "& span": {
      color: theme.palette.primary.main
    }
  },
  adminView: {
    [theme.breakpoints.down("md")]: {
      flex: 1,
      "& span": {
        display: "none"
      }
    },
    // TODO: responsive mobile
    [theme.breakpoints.down(500)]: {
      display: "none"
    },
    "& ul": {
      justifyContent: "center"
    }
  }
}))

const Navbar = (props: INavbarProps) => {
  const { setSubCategory } = props
  const classes = useStyles()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const handleClick = (link: string) => {
    setSubCategory(DEFAULT_ALL)
    navigate(link)
  }

  return (
    <div className={`
      ${pathname.includes("admin") ? classes.adminView : ''}
    `}>
      <List
        className={classes.navbar}
        style={{
          flexDirection: "row",
          padding: '0 20px'
        }}
      >
        {navbarItem.map(({ link, label, Icon }, index) => {
          // fix active route for news details
          const active = pathname.includes(link);
          
          return <ListItem
            className={`${active ? classes.active : ''}`}
            key={index}
            title={label}
            onClick={() => handleClick(link)}
          >
            <Icon active={active} />
            <span>{label}</span>
          </ListItem>
        })}
      </List>
    </div>
  )
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setSubCategory: (id: number) => dispatch(setSubCategoryId(id))
})

const connector = connect(null, mapDispatchToProps)

type PropsFromStore = ConnectedProps<typeof connector>

export default connector(Navbar)

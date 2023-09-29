import { useMemo, useEffect, useState } from 'react'
import {
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Theme
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useLocation, useNavigate } from 'react-router-dom'
import { ConnectedProps, connect } from 'react-redux'
import { ExpandLess, ExpandMore } from '@mui/icons-material'

import IMSImage from '../Image/IMSImage'
import { AppState, AppDispatch } from '@/store'
import { sSubCategories, sSubCategoryId } from '@/store/news/selector'
import { getCategories } from "@/store/news/thunkApi"
import { DEFAULT_ALL, ISubCategories } from '@/types'
import { capitalizeFirstLetter } from '@/utils'
import { setSubCategoryId } from '@/store/news'
import { navbarItem } from '../Header/Navbar'

type INavbarProps = PropsFromStore

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  navbar: {
    width: 250,
    padding: 0,
    display: "flex",
    gap: theme.spacing(1),
    listStyle: "none",
    fontSize: theme.typography.h5.fontSize,
		flexDirection: "column",
    "& .MuiListItemText-root span": {
      flex: 1,
      color: "#000",
      fontWeight: theme.typography.fontWeightRegular,
      padding: "4px 8px",
      display: "flex",
      alignItems: "center",
      gap: theme.spacing(1),
      transition: ".25s",
      cursor: "pointer",
      fontSize: theme.typography.h5.fontSize,
      "&:hover": {
        color: theme.palette.primary.light
      }
    },
    "& img": {
      width: "22px",
      marginBottom: 4
    },
  },
  active: {
    color: theme.palette.primary.main,
    "& .MuiListItemText-root span": {
      color: theme.palette.primary.main
    }
  },
  subCategory: {
    cursor: "pointer",
    wordBreak: "break-word",
    "&:hover": {
      color: theme.palette.primary.light
    }
  }
}))

const Sidebar = (props: INavbarProps) => {
  const {
    pSubCategories,
    pGetCategories,
    subCategory,
    setSubCategory,
  } = props
  const classes = useStyles()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState<{ [label: string]: boolean }>()

  useEffect(() => {
    if (pSubCategories.length === 1 && pSubCategories[0].id === DEFAULT_ALL) {
      pGetCategories()
    }
  }, [])

  const navbarItems = useMemo(() => {
    let newOpen = {};
    const result = navbarItem.map(item => {
      let children: ISubCategories[] = []
      if (item.link.includes("information")) {
        const entityName = item.link.split("/").pop()
        if (entityName) {
          children = pSubCategories.filter(
            s => s.entityName === capitalizeFirstLetter(entityName)
          )
        }
        const subCate = pSubCategories.find(({ id }) => id === subCategory)
        newOpen = {
          ...newOpen,
          [item.label]: subCate?.entityName === item.label || false
        }
      }
      return {
        ...item,
        children
      }
    })
    setOpen(newOpen)
    return result
  }, [pSubCategories])

  const onToggleChildList = (label: string) => {
    setOpen(prev => prev ? ({
      ...prev,
      [label]: !prev[label]
    }) : prev)
  }

  const handleClickChildCategory = (id: number, link: string) => {
    setSubCategory(id)
    if (pathname !== link) {
      navigate(link)
    }
  }

  const handleClickLink = (link: string) => {
    setSubCategory(DEFAULT_ALL)
    navigate(link)
  }

  return (
    <div>
      <List className={classes.navbar}>
        {navbarItems.map(({ link, label, Icon, children }, index) => {
          const active = pathname.includes(link);
          
          return <div key={index}>
            <ListItem
              className={`${active ? classes.active : ''}`}
              title={label}
            >
              <ListItemText onClick={() => handleClickLink(link)}>
                <Icon active={active} />
                {label}
              </ListItemText>
              <ListItemSecondaryAction>
                {(!!children.length && open) && (
                  <IconButton onClick={() => onToggleChildList(label)}>
                    {open[label] ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                )}
              </ListItemSecondaryAction>
            </ListItem>
            {open && (
              <Collapse in={open[label]} timeout="auto" unmountOnExit>
                <List disablePadding sx={{ marginLeft: 5 }}>
                  {!!children.length && children.map(c => (
                    <ListItem
                      key={c.id}
                      className={`${classes.subCategory} ${c.id === subCategory ? classes.active : ""}`}
                      onClick={() => handleClickChildCategory(c.id, link)}
                    >
                      {c.displayName}
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </div>
        })}
      </List>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  pSubCategories: sSubCategories(state),
  subCategory: sSubCategoryId(state)
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  pGetCategories: () => dispatch(getCategories()),
  setSubCategory: (id: number) => dispatch(setSubCategoryId(id))
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromStore = ConnectedProps<typeof connector>

export default connector(Sidebar)

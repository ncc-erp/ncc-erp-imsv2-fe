import * as React from "react"

import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import { makeStyles } from "@mui/styles"
import {
  ListSubheader,
  List,
  ListItemButton,
  Checkbox,
  ListItemText,
  Collapse
} from "@mui/material"
import { FILTER_TYPE } from "@/enums/auditLog"

export interface IFilterListData {
  title: string
  filterType?: FILTER_TYPE
  childrenDatePicker?: {
    elements?: React.ReactNode[]
    value?: string
  }
  childrenSelect?: {
    title: string
    isSelected: boolean
    setIsSelected: (ind: number) => void
  }[]
}
export interface IFilterList {
  width?: number | string
  filterEl: IFilterListData[]
}

const useStyles = makeStyles({
  mainTitle: {
    "&.MuiListItemText-root span": {
      "font-weight": 800
    }
  }
})

export default function FilterList(props: IFilterList) {
  const { width, filterEl } = props
  const [open, setOpen] = React.useState(filterEl.map((el, index) => false))
  const styles = useStyles()

  const handleClick = (index: number) => {
    setOpen((b) => {
      const bUpdate = [...b]
      bUpdate[index] = !b[index]
      return bUpdate
    })
  }

  const calculateFilterMessage = (filterElement: IFilterListData) => {
    switch(filterElement.filterType){
      case FILTER_TYPE.DATE_PICKER:
        return filterElement.childrenDatePicker?.value
      default: {
        const chilIsSelected = filterElement.childrenSelect?.findIndex(
          (chil: {
            title: string
            isSelected: boolean
            setIsSelected: (ind: number) => void
          }) => chil.isSelected
        )
        return (chilIsSelected !== undefined && chilIsSelected >= 0 ) && filterElement.childrenSelect?.[chilIsSelected].title
      }
    }
  }

  return (
    <List
      sx={{
        width: width || "100%",
        bgcolor: "background.paper",
        maxHeight: 600,
        overflowY: "auto"
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Filter List
        </ListSubheader>
      }
    >
      {filterEl.map((el, index) => {
        const currentSelected = React.useMemo(() => calculateFilterMessage(el), [el])
        return (
          <React.Fragment key={el.title}>
            <ListItemButton onClick={() => handleClick(index)}>
              <ListItemText
                primary={el.title}
                secondary={currentSelected}
                className={styles.mainTitle}
              />
              {open[index] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {el.childrenSelect && el.childrenSelect.map((children, ind) => (
              <Collapse key={ind} in={open[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => children.setIsSelected(ind)}
                  >
                    <Checkbox
                      disableRipple={true}
                      checked={children.isSelected}
                      sx={{ pl: 0 }}
                    />
                    <ListItemText primary={children.title} />
                  </ListItemButton>
                </List>
              </Collapse>
            ))}
            {el.childrenDatePicker && el.childrenDatePicker.elements?.map((child, childIndex) => (
              <Collapse key={childIndex} in={open[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    {child}
                  </ListItemButton>
                </List>
              </Collapse>
            ))}
          </React.Fragment>
        )
      })}
    </List>
  )
}

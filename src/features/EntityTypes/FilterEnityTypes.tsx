import { IReqFilter, NEWS_CATEGORY , NEWS_CATEGORY_ARRAY } from "@/types"
import React, { useMemo } from "react"
import { connect } from "react-redux"
import MenuPopup from "@/components/MenuPopup/MenuPopup"
import FilterList, {
  IFilterListData
} from "@/features/News/components/FilterList"
import FilterAltIcon from "@mui/icons-material/FilterAlt"

import { ENTITY_TYPE_STATUS, ENTITY_TYPE_STATUS_ARRAY } from "@/enums/entityTypes"

interface IFilterNewsProps {
  setReqFilter: React.Dispatch<React.SetStateAction<IReqFilter | undefined>>
  reqFilter?: IReqFilter
  setPage: React.Dispatch<React.SetStateAction<number>>
  setMainCategory: React.Dispatch<React.SetStateAction<NEWS_CATEGORY>>
  mainCategory?: NEWS_CATEGORY
  entityTypeStatus: ENTITY_TYPE_STATUS
  setEntityTypeStatus: React.Dispatch<React.SetStateAction<ENTITY_TYPE_STATUS>>
}

function FilterEnityTypes({
  setPage,
  setMainCategory,
  mainCategory,
  entityTypeStatus,
  setEntityTypeStatus
}: IFilterNewsProps) {

  const filterElData: IFilterListData[] = useMemo(() => {
    return [
      {
        title: "Main categories",
        childrenSelect: NEWS_CATEGORY_ARRAY.map((category: string) => ({
          title: category,
          isSelected: category === mainCategory,
          setIsSelected: (index: number) => {
            // reset page to 1
            setPage(1);
            setMainCategory(NEWS_CATEGORY_ARRAY[index])
          }
        })
        )
      },
      {
        title: "Category status",
        childrenSelect: ENTITY_TYPE_STATUS_ARRAY.map((status: ENTITY_TYPE_STATUS) => ({
          title: status,
          isSelected: status === entityTypeStatus,
          setIsSelected: (index: number) => {
            // reset page to 1
            setPage(1);
            setEntityTypeStatus(ENTITY_TYPE_STATUS_ARRAY[index])
          }
        })
        )
      }
    ]
  }, [mainCategory, entityTypeStatus])

  return (
    <MenuPopup
      buttonProps={{
        variant: "contained",
        size: "small"
      }}
      buttonChildren={<FilterAltIcon />}
      MenuChildren={<FilterList width={250} filterEl={filterElData} />}
    />
  )
}
const mapStateToProps = null

const mapDispatchToProps = null
export default connect(mapStateToProps, mapDispatchToProps)(FilterEnityTypes)

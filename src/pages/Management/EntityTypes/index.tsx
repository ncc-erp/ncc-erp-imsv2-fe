import { ColumnId, ENTITY_TYPE_STATUS } from "@/enums/entityTypes"
import TableEntity from "@/features/EntityTypes/TableEntity"
import FilterEnityTypes from "@/features/EntityTypes/FilterEnityTypes"
import { AppDispatch, AppState } from "@/store"
import {
  getEntityTypes,
  getEntityTypesAll,
  postEntityType,
  putEntityType
} from "@/store/entityTypes/thunkApi"
import { IRequestParams, SORT_ENUM } from "@/types/common"
import {
  ColumnEntityData,
  DataEntityTypesForm,
  IReqOrderEntity
} from "@/types/entityTypes"
import { IReqFilter, NEWS_CATEGORY } from "@/types/news"
import useDebounce from "@/utils/useDebounce"
import AddIcon from "@mui/icons-material/Add"
import { Box, Button } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import SearchEntityTypes from "@/features/EntityTypes/SearchEntityTypes"
import { resetData } from "@/store/entityTypes"
import { IMSModal } from "@/components"
import EntityTypesFrom from "@/features/EntityTypes/EntityTypesFrom"
import { PAGE_SIZE_LIST } from "@/types/pagination"

interface IManageEntityTypesProps {
  getEntityTypesAll: (params: IRequestParams) => Promise<unknown>
  resetData: () => void
  pPostEntityType: (data: DataEntityTypesForm) => Promise<any>
  pPutEntityType: (data: DataEntityTypesForm) => Promise<any>
  pEntityTypeData: DataEntityTypesForm
}

const columns: ColumnEntityData[] = [
  {
    id: ColumnId.SUBCATEGORIES,
    label: "Sub Categories",
    minWidth: 150,
    align: "left",
    width: "60%"
  },
  {
    id: ColumnId.MAINCATEGORIES,
    label: "Main Categories",
    minWidth: 170,
    width: "20%",
    align: "left",
    format: (value: number) => value.toFixed(2)
  }
]

const useStyles = makeStyles({
  container: {},
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
    "@media screen and (max-width: 640px)": {
      flexDirection: "column",
      gap: 40
    }
  },
  leftHeader: {
    display: "flex"
  }
})
function ManageEntityTypesPage({
  getEntityTypesAll,
  resetData,
  pEntityTypeData,
  pPostEntityType,
  pPutEntityType
}: IManageEntityTypesProps) {
  const styles = useStyles()
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(PAGE_SIZE_LIST[0])
  const [reqSort, setReqSort] = useState<IReqOrderEntity>({
    direction: SORT_ENUM.ASC,
    property: ColumnId.SUBCATEGORIES
  })
  const [reqFilter, setReqFilter] = useState<IReqFilter>()
  const [searchText, setSearchText] = useState<string>("")
  const debounceSearchText = useDebounce(searchText, 500)
  const [showModalEntityTypes, setShowModalEntityTypes] =
    useState<boolean>(false)
  const [isEditEntityTypes, setisEditEntityTypes] = useState<boolean>(false)
  const [disabled, setDisabled] = useState(true)
  const [mainCategory, setMainCategory] = useState<NEWS_CATEGORY>(NEWS_CATEGORY.ALL)
  const [entityTypeStatus, setEntityTypeStatus] = useState<ENTITY_TYPE_STATUS>(ENTITY_TYPE_STATUS.ACTIVE)

  const handleClose = () => {
    setShowModalEntityTypes(false)
    setDisabled(true)
  }

  const handleClick = () => {
    resetData()
    setisEditEntityTypes(false)
    setShowModalEntityTypes(true)
  }

  const calculateEntityTypeStatus = () => {
    switch(entityTypeStatus){
      case ENTITY_TYPE_STATUS.ALL:
        return undefined;
      case ENTITY_TYPE_STATUS.ACTIVE:
        return true;
      case ENTITY_TYPE_STATUS.INACTIVE:
        return false;
    };
  }
  
  function getEntityType() {
    getEntityTypesAll({
      page: page,
      size: rowsPerPage,
      order: reqSort.direction,
      orderBy: reqSort.property as string,
      entityName: mainCategory === NEWS_CATEGORY.ALL ? undefined : mainCategory,
      search: searchText,
      isActive: calculateEntityTypeStatus(),
    })
  }
  const handleSubmit = async () => {
    if (isEditEntityTypes) {
      await pPutEntityType(pEntityTypeData)
      getEntityType()
    } else {
      await pPostEntityType(pEntityTypeData)
      getEntityType()
    }
    setShowModalEntityTypes(false)
  }

  useEffect(() => {
    getEntityType()
  }, [reqSort, page, mainCategory, debounceSearchText, rowsPerPage, entityTypeStatus])

  return (
    <Box className={styles.container}>
      <div className={styles.header}>
        <div className={styles.leftHeader}>
          <SearchEntityTypes setSearchText={setSearchText} setPage={setPage} />
          <Button
            variant="contained"
            size="small"
            onClick={handleClick}
            color="primary"
          >
            <AddIcon />
          </Button>
        </div>

        <FilterEnityTypes
          setReqFilter={setReqFilter}
          reqFilter={reqFilter}
          setPage={setPage}
          setMainCategory={setMainCategory}
          mainCategory={mainCategory}
          entityTypeStatus={entityTypeStatus}
          setEntityTypeStatus={setEntityTypeStatus}
        />
      </div>
      <TableEntity
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        columns={columns}
        setPage={setPage}
        page={page}
        setReqSort={setReqSort}
        setisEditEntityTypes={setisEditEntityTypes}
        setShowModalEntityTypes={setShowModalEntityTypes}
        setDisabled={setDisabled}
      />
      <IMSModal
        header={{
          title: `${isEditEntityTypes ? "Edit" : "Create New"} Categories`
        }}
        position="CENTER"
        open={showModalEntityTypes}
        saveButton={{
          onClick: handleSubmit,
          color: "primary",
          disabled: disabled
        }}
        cancelButton={{
          onClick: handleClose,
          color: "primary",
          variant: "outlined"
        }}
      >
        <EntityTypesFrom setDisabled={setDisabled} isEditEntityTypes={isEditEntityTypes} />
      </IMSModal>
    </Box>
  )
}
const mapStateToProps = (state: AppState) => ({
  pEntityTypeData: state.entityTypes.entityTypeData
})
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getEntityTypesAll: (params: IRequestParams) =>
    dispatch(getEntityTypesAll(params)),
  resetData: () => dispatch(resetData()),
  pPostEntityType: (data: DataEntityTypesForm) =>
    dispatch(postEntityType(data)),
  pPutEntityType: (data: DataEntityTypesForm) => dispatch(putEntityType(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageEntityTypesPage)

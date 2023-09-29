import React, { useEffect, useState, useCallback, useMemo } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { connect, ConnectedProps } from "react-redux"
import { styled } from "@mui/material/styles"
import { makeStyles } from "@mui/styles"
import useDebounce from "@/utils/useDebounce"
import { Box, SelectChangeEvent, Button } from "@mui/material"
import Paper from "@mui/material/Paper"
import { Search } from "@/components/Search/Search"
import { AlbumsTable } from "@/features/Albums/component/AlbumsTable"
import IPagination from "@/components/Pagination/IPagination"
import {
  getAllAdminAlbums,
  getSearchFilters,
  saveAlbum,
  updateAlbum
} from "@/store/albums/thunkApi"
import { sGetAlbums, sGetFilterSearch } from "@/store/albums/selector"
import { AppDispatch, AppState } from "@/store"
import { PAGE_SIZE_LIST } from "@/types/pagination"
import {
  IAlbumSave,
  IAlbumsSearch,
  SORT_ENUM,
  IAlbum,
  ICategory
} from "@/types"
import { IMSModal, NoItemFound } from "@/components"
import AddIcon from "@mui/icons-material/Add"
import { MANAGE_ALBUMS_TABLE_COLUMNS , ALBUM_STATUS, ALBUM_STATUS_ARRAY } from "@/enums/albums"
import { AddAlbum } from "@/features/Albums/component/AddAlbum"
import { EditAlbum } from "@/features/Albums/component/EditAlbum"
import {
  createNewAlbumSchema,
  editAlbumSchema
} from "@/features/Albums/schema/albumsSchema"
import { STATUS_CODE } from "@/enums/httpRequest"
import MenuPopup from "@/components/MenuPopup/MenuPopup"
import FilterList, {
  IFilterListData
} from "@/features/News/components/FilterList"
import FilterAltIcon from "@mui/icons-material/FilterAlt"

const ManageAlbumsWrapper = styled(Box)({
  "& >:not(:nth-of-type(1))": {
    marginTop: 20
  }
})

const ManageAlbumsHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between"
})

const useStyles = makeStyles({
  pagination: {
    justifyContent: "flex-end",
    gap: "20px"
  }
})

const ManageAlbumsPage = React.memo(
  ({
    albums,
    pGetAllAlbums,
    pGetSearchFilters,
    pSaveAlbum,
    pUpdateAlbum,
    filterSearch
  }: PropsFromStore) => {
    const [firstLoading, setFirstLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(PAGE_SIZE_LIST[0])
    const [selectedCategory, setSelectedCategory] = useState<number>(-1)
    const [searchText, setSearchText] = useState<string>("")
    const [albumStatus, setAlbumStatus] = useState(ALBUM_STATUS.ACTIVE);
    const [order, setOrder] = useState<SORT_ENUM>(SORT_ENUM.DESC)
    const [orderBy, setOrderBy] = useState<string>("albumTime")
    const debounceSearchText = useDebounce(searchText, 500)
    const [openPopup, setOpenPopup] = useState(false)
    const [toggleReload, setToggleReload] = useState(false)
    const [editAlbum, setEditAlbum] = useState<undefined | string>(undefined)

    useEffect(() => {
      const getAlbumsData = async (params: IAlbumsSearch) => {
        await pGetAllAlbums(params)
        setFirstLoading(false)
      }
      getAlbumsData({
        search: debounceSearchText || undefined,
        categoryId: selectedCategory >= 0 ? selectedCategory : undefined,
        page,
        size: rowsPerPage,
        order,
        orderBy,
        isActive: calculateIsActiveStatus(albumStatus)
      })
    }, [
      debounceSearchText,
      selectedCategory,
      page,
      rowsPerPage,
      order,
      orderBy,
      toggleReload,
      albumStatus
    ])

    useEffect(() => {
      pGetSearchFilters()
    }, [])

    const handleChangeRowsPerPage = (e: SelectChangeEvent) => {
      setRowsPerPage(parseInt(e.target.value))
      setPage(1)
    }

    const handleAddOrEditAlbum = async (data: IAlbumSave) => {
      const formData = { ...data }
      formData.albumTime = new Date(formData.albumTime as string).toISOString()

      const { payload: { status }} = await ( editAlbum ? pUpdateAlbum({ id: editAlbum, data: formData}) : pSaveAlbum(formData));
      if ((editAlbum && status === STATUS_CODE.UPDATED_SUCCESSFULLY) || (!editAlbum && status === STATUS_CODE.CREATED_SUCCESSFULLY)) {
        setToggleReload((reload) => !reload)
        handleClosePopup()
      }
    }

    const handleClosePopup = () => {
      setOpenPopup(false)
      setEditAlbum(undefined)
      form.reset()
    }

    function calculateIsActiveStatus (albumStatus: ALBUM_STATUS) {
      switch(albumStatus){
        case ALBUM_STATUS.ALL:
          return undefined;
        case ALBUM_STATUS.ACTIVE:
          return true;
        case ALBUM_STATUS.INACTIVE:
          return false;
      }
    }

    const styles = useStyles()

    const form = useForm<IAlbumSave>({
      defaultValues: {
        albumTime: null,
        isActive: true,
        thumbnailImageFile: undefined,
        thumbnailImage: undefined,
        title: undefined,
        description: "",
        albumUrl: "",
        categoryId: undefined
      },
      resolver: yupResolver(editAlbum ? editAlbumSchema : createNewAlbumSchema)
    })

    const handleEdit = useCallback((id: string) => {
      const album = albums?.data.find((album: IAlbum) => album.id.toString() === id)
      if (album) {
        Object.entries(form.formState.defaultValues as IAlbumSave).forEach(
          (arr) => {
            // don't take these fields
            if(!["thumbnailImageFile", "categoryId"].includes(arr[0])) {
              form.setValue(arr[0] as keyof IAlbumSave, album[arr[0] as keyof IAlbum] as keyof IAlbumSave)
            }
            
          }
        )
        const category = filterSearch?.category?.find(
          (category: ICategory) => category.displayName === album.category
        )
        if (category) {
          form.setValue("categoryId", category.id)
        }
      }

      setOpenPopup(true)
      setEditAlbum(id);
    }, [albums?.data, form.formState.defaultValues, filterSearch?.category])
    
    const filterElData: IFilterListData[] = useMemo(() => {

      let albumCategoryFilters = [{ id: - 1, displayName: 'All'}]

      if(filterSearch?.category && filterSearch?.category?.length > 0){
        albumCategoryFilters = [...albumCategoryFilters, ...filterSearch?.category as { id: number, displayName: string }[]]
      }
      return [
        {
          title: "Main categories",
          childrenSelect: albumCategoryFilters?.map(({ id, displayName }: { id: number, displayName: string }) => ({
            title: displayName,
            isSelected: id === selectedCategory,
            setIsSelected: (index: number) => {
              // reset page to 1
              setPage(1);
              setSelectedCategory(albumCategoryFilters?.[index]?.id as number)
            }
          })
          )
        },
        {
          title: "Album status",
          childrenSelect: ALBUM_STATUS_ARRAY.map((status: ALBUM_STATUS) => ({
            title: status,
            isSelected: status === albumStatus,
            setIsSelected: (index: number) => {
              setPage(1)
              setAlbumStatus(ALBUM_STATUS_ARRAY[index])
            }
          })
          )
        }
      ]
    }, [selectedCategory, filterSearch?.category, albumStatus])
    return (
      <ManageAlbumsWrapper>
        <ManageAlbumsHeader>
          <Box sx={{ display: "flex" }}>
            <Search setPage={setPage} setSearchText={setSearchText} />
            <Button
              variant="contained"
              size="small"
              onClick={() => setOpenPopup(true)}
              color="primary"
            >
              <AddIcon />
            </Button>
          </Box>
          <MenuPopup
            buttonProps={{
              variant: "contained",
              size: "small"
            }}
            buttonChildren={<FilterAltIcon />}
            MenuChildren={<FilterList width={250} filterEl={filterElData} />}
          />
        </ManageAlbumsHeader>
        <Paper sx={{ overflow: "auto" }}>
          <AlbumsTable
            items={albums?.data}
            columns={MANAGE_ALBUMS_TABLE_COLUMNS}
            firstLoading={firstLoading}
            order={order}
            setOrder={setOrder}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            onEdit={handleEdit}
          />
          {!albums?.data.length && (
            <NoItemFound />
          )}
          <IPagination
            count={albums?.pageCount}
            defaultPage={1}
            page={page}
            className={styles.pagination}
            showFirstButton
            showLastButton
            rowsPerPageOptions={PAGE_SIZE_LIST}
            rowsPerPage={rowsPerPage}
            onChange={(e, page) => setPage(page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <IMSModal
          header={{
            title: (editAlbum ? "Edit" : "Add") + " Album",
            style: {
              margin: "8px 0 8px 16px"
            }
          }}
          position="CENTER"
          height="auto"
          open={openPopup}
          saveButton={{
            color: "primary",
            onClick: () => form.handleSubmit(handleAddOrEditAlbum)()
          }}
          cancelButton={{
            onClick: handleClosePopup,
            color: "primary",
            variant: "outlined"
          }}
        >
          {editAlbum ? (
            <EditAlbum
              categories={filterSearch?.category || null}
              form={form}
            />
          ) : (
            <AddAlbum categories={filterSearch?.category || null} form={form} />
          )}
        </IMSModal>
      </ManageAlbumsWrapper>
    )
  }
)

const mapStateToProps = (state: AppState) => ({
  albums: sGetAlbums(state),
  filterSearch: sGetFilterSearch(state)
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  pGetAllAlbums: (params: IAlbumsSearch) => dispatch(getAllAdminAlbums(params)),
  pGetSearchFilters: () => dispatch(getSearchFilters()),
  pSaveAlbum: (data: IAlbumSave) => dispatch(saveAlbum(data)),
  pUpdateAlbum: ({ id, data }: {id: string, data: IAlbumSave}) => dispatch(updateAlbum({id, data}))
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromStore = ConnectedProps<typeof connector>

export default connector(ManageAlbumsPage)

ManageAlbumsPage.displayName = "Manage Albums Page"

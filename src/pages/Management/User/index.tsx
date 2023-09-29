import { columnsTableUser } from "@/api/__mocks__/data/users"
import { EditUserRolePopover, TableUsers, UserFilter } from "@/features/User"
import { AppDispatch, AppState } from "@/store"
import { sGetUsers } from "@/store/user/selector"
import { getUserRoles, updateUser, getUsers } from "@/store/user/thunkApi"
import { DataUser } from "@/types"
import { IUserRequestParams, SORT_ENUM } from "@/types/common"
import { IPaginationParams } from "@/types/pagination"
import { IUpdateUserRole, UserRoles } from "@/types/users"
import useDebounce from "@/utils/useDebounce"
import { Box } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useEffect, useState } from "react"
import { connect, ConnectedProps } from "react-redux"

const useStyles = makeStyles({
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
    display: "flex",
    width: "100%"
  }
})

function UsersPage({
  pGetUsers,
  userRoles,
  users,
  getUserRoles,
  updateUserRole,
}: PropsFromStore): JSX.Element {
  const styles = useStyles()
  const [paginationQuery, setPaginationQuery] = useState<IUserRequestParams>({
    page: 1,
    size: 10,
    orderBy: "id",
    order: SORT_ENUM.ASC,
    role: -1
  })

  const [searchQuery, setSearchQuery] = useState("")

  const searchQueryDebounced = useDebounce(searchQuery, 200)
  const [currentUser, setCurrentUser] = useState<DataUser | null>(null)
  const [currentSelectedRoles, setCurrentSelectedRoles] = useState<UserRoles[]>(
    []
  )
  const [prevPage, setPrevPage] = useState<number>(0)
  const [anchorElEdit, setAnchorElEdit] = useState<HTMLButtonElement | null>(null)

  useEffect(() => {
    setCurrentSelectedRoles(currentUser?.roles || [])
  }, [currentUser])

  function setSearchFilter(payload: IPaginationParams) {
    setPaginationQuery((prev) => ({
      ...prev,
      ...payload
    }))
  }

  function handleCloseModal() {
    setAnchorElEdit(null)
  }

  function handleChangeRoleFilter(number: number) {
    setPaginationQuery((prev) => ({
      ...prev,
      page: 1,
      role: number
    }))
  }

  function handleChangeSearchQuery(search: string) {
    setSearchQuery(search)
    setPaginationQuery((prev) => ({...prev, page: 1}))
  }

  async function handleUpdateUserRole() {
    if (!currentUser) return
    await updateUserRole({
      userId: currentUser?.id,
      roleNames: currentSelectedRoles.map((value) => value.name)
    })

    setAnchorElEdit(null)
    fetchAllUser()
  }

  const columns: string[] = columnsTableUser

  const fetchAllUser = async () => {
    const currentPage = paginationQuery.page ?? 1
    await pGetUsers({
      ...paginationQuery,
      page: currentPage,
      search: searchQueryDebounced
    })
    
    setPrevPage(currentPage)
  }


  useEffect(() => {
    getUserRoles()
  }, [])

  useEffect(() => {
    fetchAllUser()
  }, [
    paginationQuery.size,
    paginationQuery.page,
    paginationQuery.order,
    paginationQuery.orderBy,
    paginationQuery.role,
    searchQueryDebounced
  ])
  
  return (
    <Box>
      <Box className={styles.header}>
        <Box className={styles.leftHeader}>
          <UserFilter
            allRoles={userRoles}
            search={searchQuery}
            setSearch={handleChangeSearchQuery}
            setRoleFilter={handleChangeRoleFilter}
            roleFilter={paginationQuery.role ?? -1}
          />
        </Box>
      </Box>
      <TableUsers
        searchFilter={paginationQuery}
        search={searchQuery}
        users={users.data}
        count={users.pageCount}
        columns={columns}
        setAnchorElEdit={setAnchorElEdit}
        setSelectedUser={(user) => {
          setCurrentUser(user)
          setCurrentSelectedRoles(user.roles)
        }}
        setSearchFilter={setSearchFilter}
      />
      <EditUserRolePopover
        anchorEl={anchorElEdit}
        userRoles={userRoles}
        currentSelectedRoles={currentSelectedRoles}
        setCurrentSelectedRoles={setCurrentSelectedRoles}
        currentRolesUser={currentUser?.roles}
        onClose={handleCloseModal}
        handleUpdateUserRole={handleUpdateUserRole}
      />
    </Box>
  )
}

const mapStateToProps = (state: AppState) => ({
  users: sGetUsers(state),
  userRoles: state.user.userRoles
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  pGetUsers: (params: IPaginationParams) => dispatch(getUsers(params)),
  getUserRoles: () => dispatch(getUserRoles()),
  updateUserRole: (user: IUpdateUserRole) => dispatch(updateUser(user)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromStore = ConnectedProps<typeof connector>

export default connector(UsersPage)

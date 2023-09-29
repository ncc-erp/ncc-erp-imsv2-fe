import { initCheckList, initUserTabList } from "@/api/__mocks__/data/users"
import {
  DataUserChecked,
  DataUserForm,
  DataUserTab,
  UserTabsEnum
} from "@/types"
import { yupResolver } from "@hookform/resolvers/yup"
import CloseIcon from "@mui/icons-material/Close"
import { TabContext, TabList, TabPanel } from "@mui/lab"
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tab,
  Typography
} from "@mui/material"
import { Dispatch, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { UserDetails } from "./UserDetails"
import { UserRoles } from "./UserRoles"

export interface IUsersFormProps {
  open: boolean
  setOpen: Dispatch<React.SetStateAction<boolean>>
  initValues: DataUserForm
  onSubmit: (values: DataUserForm) => Promise<void>
}

export function UsersForm({
  open,
  setOpen,
  initValues,
  onSubmit
}: IUsersFormProps): JSX.Element {
  const [value, setValue] = useState<string>(UserTabsEnum.USER_DETAILS)
  const [checkedList, setCheckedList] =
    useState<DataUserChecked[]>(initCheckList)
  const userTabList: DataUserTab[] = initUserTabList

  const schema = yup.object().shape({
    userName: yup.string().required("Please enter user name."),
    name: yup.string().required("Please enter name."),
    surname: yup.string().required("Please enter surname."),
    emailAddress: yup
      .string()
      .email("Email is not match.")
      .required("Please enter email."),
    isActive: yup.boolean(),
    password: yup.string().when([], () => {
      if (initValues.id) return yup.string()
      return yup
        .string()
        .required("Please enter password.")
        .min(6, "Please enter password at least six words.")
    }),
    confirmPassword: yup.string().when([], () => {
      if (initValues.id) return yup.string()
      return yup
        .string()
        .required("Please enter confirm password.")
        .oneOf([yup.ref("password")], "Confirm password is not match.")
    })
  })

  const form = useForm<DataUserForm>({
    defaultValues: initValues,
    resolver: yupResolver(schema)
  })

  const { isSubmitting } = form.formState

  useEffect(() => {
    form.reset(initValues)
  }, [])

  const handleClose = () => {
    form.reset()
    setOpen(false)
    setValue(UserTabsEnum.USER_DETAILS)
  }

  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const handleSubmit = async (values: DataUserForm) => {
    const newUser = {
      userName: values.userName,
      name: values.name,
      surname: values.surname,
      emailAddress: values.emailAddress,
      password: values.password,
      confirmPassword: values.confirmPassword,
      isActive: values.isActive,
      creationTime: new Date()
    }
    if (!initValues.id) {
      await onSubmit(newUser)
    } else {
      await onSubmit({ ...newUser, id: initValues.id })
    }

    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open}>
      <Box
        component="form"
        sx={{
          width: "520px"
        }}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          {initValues.id && (
            <Typography
              component="span"
              variant="h6"
              sx={{
                fontWeight: "bold"
              }}
            >
              Update User
            </Typography>
          )}
          {!initValues.id && (
            <Typography
              component="span"
              variant="h6"
              sx={{
                fontWeight: "bold"
              }}
            >
              Create User
            </Typography>
          )}
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          dividers
          sx={{
            p: "24px 24px 0"
          }}
        >
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChange}>
                  {userTabList.map((tab: DataUserTab) => (
                    <Tab key={tab.value} label={tab.name} value={tab.value} />
                  ))}
                </TabList>
              </Box>
              <TabPanel
                value={UserTabsEnum.USER_DETAILS}
                sx={{
                  p: "12px 0"
                }}
              >
                <UserDetails form={form} id={initValues.id} />
              </TabPanel>
              <TabPanel
                value={UserTabsEnum.USER_ROLES}
                sx={{
                  p: "12px 0"
                }}
              >
                <UserRoles
                  checkedList={checkedList}
                  setCheckedList={setCheckedList}
                />
              </TabPanel>
            </TabContext>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            p: "12px 24px"
          }}
        >
          <Button
            type="button"
            variant="contained"
            onClick={handleClose}
            color="error"
            sx={{
              mr: "4px"
            }}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            OK
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

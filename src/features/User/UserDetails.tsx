import { DataUserForm } from "@/types"
import { CheckBoxField, InputField, PasswordField } from "@components/Form"
import { Box } from "@mui/material"
import { UseFormReturn } from "react-hook-form"

export interface IUserDetailsProps {
  form: UseFormReturn<DataUserForm, any>
  id: number | undefined
}

export function UserDetails({ form, id }: IUserDetailsProps): JSX.Element {
  return (
    <Box>
      <InputField
        form={form}
        label="User Name"
        name="userName"
        disabled={form.formState.isSubmitting}
        placeholder="Enter user name"
      />
      <InputField
        form={form}
        label="Name"
        name="name"
        disabled={form.formState.isSubmitting}
        placeholder="Enter name"
      />
      <InputField
        form={form}
        label="Surname"
        name="surname"
        disabled={form.formState.isSubmitting}
        placeholder="Enter sur name"
      />
      <InputField
        form={form}
        label="Email Address"
        name="emailAddress"
        disabled={form.formState.isSubmitting}
        placeholder="Enter email address"
      />
      {!id && (
        <>
          <PasswordField
            form={form}
            label="Password"
            name="password"
            disabled={form.formState.isSubmitting}
          />
          <PasswordField
            form={form}
            label="Confirm Password"
            name="confirmPassword"
            disabled={form.formState.isSubmitting}
          />
        </>
      )}

      <CheckBoxField
        form={form}
        label="Active"
        name={"isActive"}
        disabled={form.formState.isSubmitting}
      />
    </Box>
  )
}

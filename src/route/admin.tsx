import {
  ManageNewsPage,
  UserRolePage,
  UsersPage,
  ConfigurationPage,
  ManageEntityTypesPage,
  ManageWidgetPage,
  ManageAlbumsPage,
  AuditLog
} from "@/pages"
import { USER_ROLES_NAME } from "@/types"
import { IRoute } from "@/types/route"

export const ADMIN_ROUTES: IRoute[] = [
  {
    label: "Manage News", path: "manage-news",
    element: <ManageNewsPage />, roles: [USER_ROLES_NAME.ADMIN, USER_ROLES_NAME.HR]
  },
  { label: "Manage Role", path: "manage-roles", element: <UserRolePage />, roles: [USER_ROLES_NAME.ADMIN] },
  { label: "Manage Users", path: "manage-users", element: <UsersPage />, roles: [USER_ROLES_NAME.ADMIN] },
  {
    label: "Manage Categories ",
    path: "manage-categories",
    element: <ManageEntityTypesPage />,
    roles: [USER_ROLES_NAME.ADMIN, USER_ROLES_NAME.HR]
  },
  {
    label: "Manage Widgets",
    path: "manage-widgets",
    element: <ManageWidgetPage />,
    roles: [USER_ROLES_NAME.ADMIN]
  },
  {
    label: "Manage Albums",
    path: "manage-albums",
    element: <ManageAlbumsPage />,
    roles: [USER_ROLES_NAME.ADMIN, USER_ROLES_NAME.HR]
  },
  {
    label: "Email Setting",
    path: "email-setting",
    element: <ConfigurationPage />,
    roles: [USER_ROLES_NAME.ADMIN]
  },
  {
    label: "Audit Log",
    path: "audit-log",
    element: <AuditLog />,
    roles: [USER_ROLES_NAME.ADMIN]
  }
]

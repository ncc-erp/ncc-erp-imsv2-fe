import { BackdropLoading } from "@/components/Loading"
import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"

const LoginPage = lazy(() => import("@/pages/Login"))
const DashboardPage = lazy(() => import("@/pages/Dashboard"))
const NewsPage = lazy(() => import("@/pages/News"))
const NewsDetailPage = lazy(() => import("@/pages/News/NewsDetail"))
const ViolationsPage = lazy(() => import("@/pages/Violations"))
const CreateNewsPage = lazy(() => import("@/features/News"))
const PreviewNewsPage = lazy(() => import("@/pages/Management/News/PreviewNews"))
const ManageNewsPage = lazy(() => import("@/pages/Management/News"))
const ManageEntityTypesPage = lazy(
  () => import("@/pages/Management/EntityTypes")
)
const ManageWidgetPage = lazy(() => import("@/pages/Management/Widget"))
const UserRolePage = lazy(() => import("@/pages/Management/User/UserRole"))
const UsersPage = lazy(() => import("@/pages/Management/User"))
const MainLayout = lazy(() => import("@/layouts/MainLayout"))
const AdminLayout = lazy(() => import("@/layouts/AdminLayout"))
const ManageWidget = lazy(() => import("@/pages/Management/Widget"))
const TimelineAlbumPage = lazy(() => import("@/pages/TimelineAlbum"))
const ManageAlbumsPage = lazy(() => import("@/pages/Management/Albums"))
const ConfigurationPage = lazy(() => import("@/pages/Configuration"))
const NotFoundPage = lazy(() => import("@/pages/NotFound"))
const ForbiddenPage = lazy(() => import("@/pages/Forbidden"))
const UnauthorizedLayout = lazy(() => import("@/layouts/UnauthorizedLayout"))
const FundAmountHistoriesPage = lazy(() => import("@/pages/FundAmountHistories"))
const AuditLog = lazy(() => import("@/pages/AuditLog"))

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<LoginPage />} />
      <Route
        element={
          <Suspense fallback={<BackdropLoading />}>
            <MainLayout />
          </Suspense>
        }
      >
        <Route path={"dashboard"} element={<DashboardPage />} />
        <Route path={"information/:category/:id"} element={<NewsDetailPage />} />
        <Route path={"information"} element={<NewsPage />}>
          <Route path={":category"} element={<NewsPage />} />
        </Route>
        <Route path={"violations"} element={<ViolationsPage />} />
        <Route path={"traditional-room"} element={<TimelineAlbumPage />} />
        <Route path={"admin"} element={<AdminLayout />}>
          <Route path={"email-setting"} element={<ConfigurationPage />} />
          <Route path={"manage-news"} >
            <Route index  element={<ManageNewsPage />} />
            <Route path={"create-news"} element={<CreateNewsPage />} />
            <Route path={"edit-news/:id"} element={<CreateNewsPage />} />
          </Route>
          <Route path={"manage-news"} element={<ManageNewsPage />} />
          <Route path={"manage-widget"} element={<ManageWidgetPage />} />
          <Route path={"manage-roles"} element={<UserRolePage />} />
          <Route path={"manage-users"} element={<UsersPage />} />
          <Route path={"manage-albums"} element={<ManageAlbumsPage />} />
          <Route
            path={"manage-categories"}
            element={<ManageEntityTypesPage />}
          />
          <Route path={"manage-widgets"} element={<ManageWidget />} />
          <Route path={"audit-log"} element={<AuditLog />} />
        </Route>
        <Route path={"admin"} element={<AdminLayout showSidebar={false}/>}>
          <Route path={"manage-news/:id/preview"} element={<PreviewNewsPage />} />
        </Route>
        <Route path={"fund-amount-histories"} element={<FundAmountHistoriesPage />} />
      </Route>
      <Route
        element={
          <Suspense fallback={<BackdropLoading />}>
            <UnauthorizedLayout />
          </Suspense>
        }
      >
        <Route path={"forbidden"} element={<ForbiddenPage />} />
        <Route path={"*"} element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App

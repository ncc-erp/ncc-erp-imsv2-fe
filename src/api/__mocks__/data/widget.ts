import { IWidgetRes } from "@/types"

export const widgetData: IWidgetRes[] = [
  {
    id: 1,
    title: "News",
    description:
      "Allows team members to quickly view and manage work assigned to them.",
    thumbnailImage:
      "https://ops.nccsoft.vn/_static/Widgets/CatalogIcons/assignedToMe1.png",
    code: 2,
    defaultHeight: 1,
    defaultWidth: 1
  },
  {
    id: 2,
    title: "Build History",
    description: "Shows the build history of a selected build pipeline.",
    thumbnailImage:
      "https://ops.nccsoft.vn/_static/Widgets/CatalogIcons/buildChart.png",
    defaultHeight: 1,
    defaultWidth: 1
  },
  {
    id: 3,
    title: "Burndown",
    description:
      "Displays burndown across multiple teams and multiple sprints. Create a release burndown or bug burndown.",
    thumbnailImage:
      "https://ops.nccsoft.vn/_static/Widgets/CatalogIcons/burndown.svg",
    defaultHeight: 1,
    defaultWidth: 1
  },
  {
    id: 4,
    title: "Burnup",
    description:
      "Displays burnup across multiple teams and multiple sprints. Create a release burnup or bug burnup.",
    thumbnailImage:
      "https://ops.nccsoft.vn/_static/Widgets/CatalogIcons/burnup.svg",
    defaultHeight: 1,
    defaultWidth: 1
  },
  {
    id: 5,
    title: "Chart for Test Plans",
    description:
      "Create charts for test case authoring and test case execution status for test plans and test suites",
    thumbnailImage:
      "https://ops.nccsoft.vn/_static/Widgets/CatalogIcons/tcmChart.png",
    defaultHeight: 1,
    defaultWidth: 1
  },
  {
    id: 6,
    code: 1,
    title: "Check In",
    description:
      "Visualize work items like bugs, user stories, and features using shared work item queries.",
    thumbnailImage:
      "https://ops.nccsoft.vn/_static/Widgets/CatalogIcons/witChart.png",
    defaultHeight: 1,
    defaultWidth: 1
  }
]

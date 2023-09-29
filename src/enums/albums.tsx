export const MANAGE_ALBUMS_TABLE_COLUMNS = [
  { title: "#", width: "50px" },
  { title: "Thumbnail", value: "thumbnailImage", width: "140px" },
  { title: "Title", value: "title", isSortAble: true },
  { title: "Category", value: "category", width: "200px" },
  { title: "Album time", value: "albumTime", width: "160px", isSortAble: true },
  { title: "Active", value: "isActive", width: "140px" },
  { title: "Actions", value: "actions", width: "140px" }
]

export const ALLOW_IMAGE_TYPE = ["image/png", "image/jpg", "image/jpeg"]

export const ALLOW_IMAGE_SIZE = 2 * 1024 * 1024

export enum ALBUM_STATUS {
  ALL = 'All',
  ACTIVE = 'Active',
  INACTIVE = 'Inactive'
}

export const ALBUM_STATUS_ARRAY = Object.values(ALBUM_STATUS);

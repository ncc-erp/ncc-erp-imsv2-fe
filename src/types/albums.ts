export interface IAlbumsSearch {
  categoryId?: number,
  year?: number,
  search?: string,
  page: number,
  size: number,
  order: string,
  orderBy: string,
  isActive?: boolean | undefined
}

export interface IAlbum {
  id: number,
  title: string,
  description: string,
  thumbnailImage: string,
  albumTime: Date,
  category: string,
  albumUrl: string,
  isActive: boolean
}

export interface IAlbumSave {
  title: string,
  description: string,
  thumbnailImageFile?: File,
  thumbnailImage?: string,
  albumTime: string | null,
  categoryId: number,
  albumUrl: string,
  isActive: boolean
}

export interface IAlbumTableColumn {
  title: string,
  value?: string,
  width?: string,
  isSortAble?: boolean
}

export interface ICategory {
  id: number,
  displayName: string
}

export interface IAlbumsRespone {
  data: IAlbum[],
  pageCount: number
}

export interface IAlbumsStore {
  data: IAlbumsRespone,
  filterSearch: {
    category: ICategory[] | null
  }
}

export interface IFilterSearch {
  category: ICategory[]
}
export enum ColumnId {
  ORIDINALNUM = "ordinalNum",
  MAINCATEGORIES = "entityName",
  SUBCATEGORIES = "displayName"
}

export enum ENTITY_TYPE_STATUS {
  ALL = 'All',
  ACTIVE = 'Active',
  INACTIVE = 'Inactive'
}

export const ENTITY_TYPE_STATUS_ARRAY = Object.values(ENTITY_TYPE_STATUS);
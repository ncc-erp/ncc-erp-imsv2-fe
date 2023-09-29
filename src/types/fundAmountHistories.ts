import { EComparisonOperator } from "@/enums/fundAmountHistories"

export type IComparisonOperator = EComparisonOperator | ""

export interface IAmountHistory {
  amount: number
  date: Date
  note: string
}

export interface IFundAmountHistoriesRequestParam {
  maxResultCount: number
  searchText?: string
  skipCount: number
  amount?: number
  comparisonOperator?: EComparisonOperator
}

export interface IFundAmountHistoriesFilterParams {
  note: string
  comparisonOperator: IComparisonOperator
  amount: string
}

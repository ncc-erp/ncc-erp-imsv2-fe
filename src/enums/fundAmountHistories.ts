import { IFundAmountHistoriesFilterParams } from "@/types"

interface IComparisonOperator {
  label: string
  value: string
}

export enum EComparisonOperator {
  LESS_THAN = "LessThan",
  EQUAL = "Equal",
  GREATER_THAN = "GreaterThan",
}

export const ComparisonOperators: IComparisonOperator[] = [
  { label: "<", value: EComparisonOperator.LESS_THAN },
  { label: "=", value: EComparisonOperator.EQUAL },
  { label: ">", value: EComparisonOperator.GREATER_THAN }
]

export const PenaltyFundColumns: string[] = ["#", "Amount", "Date", "Note"];

export const fundAmountHistoriesFilterParamsDefault: IFundAmountHistoriesFilterParams = {
  note: "",
  comparisonOperator: "",
  amount: ""
}

import { useEffect, useState, useMemo } from "react"
import { Box, styled } from "@mui/material"
import { intersection, isEqual } from "lodash"

import { FundAmountHistoriesFilters, TableFundAmountHistories } from "@/features/PenaltyFund"
import { IPaginationParams, PAGE_SIZE_LIST } from "@/types/pagination"
import useDebounce from "@/utils/useDebounce"
import toast from "@/utils/toast"
import { hrmApi } from "@/api"
import { IFundAmountHistoriesFilterParams, IFundAmountHistoriesRequestParam, IAmountHistory } from "@/types"
import { fundAmountHistoriesFilterParamsDefault } from "@/enums/fundAmountHistories"

interface IAmountHistories {
  items: IAmountHistory[]
  totalCount: number
}

const FundAmountHistoriesContainer = styled(Box)(({ theme }) => ({
  margin: '0 auto',
  padding: `${theme.spacing(2)} 0`,
  width: '70vw',
  maxWidth: '1000px'
}))

const DEBOUNCE_TIME = 400

const paginationParamsDefault = {
  page: 1,
  size: 10
}

const FundAmountHistories = (): JSX.Element => {
  const [filterParams, setFilterParams] = useState<IFundAmountHistoriesFilterParams>(fundAmountHistoriesFilterParamsDefault)
  const [amountHistories, setAmountHistories] = useState<IAmountHistories>({
    items: [],
    totalCount: 0
  })
  const [paginationQuery, setPaginationQuery] = useState<IPaginationParams>(paginationParamsDefault)

  const debounceFilter = useDebounce(filterParams, DEBOUNCE_TIME)

  const setPagination = async (payload: IPaginationParams) => {
    const isNotChange = isEqual(payload, paginationQuery)
    if (isNotChange) return
    setPaginationQuery((prev) => ({
      ...prev,
      ...payload
    }))
    const { page = 1, size = PAGE_SIZE_LIST[0] } = payload
    const { note, amount, comparisonOperator } = debounceFilter
    const params = {
      maxResultCount: size,
      searchText: note,
      skipCount: (page - 1) * size,
      amount: amount ? Number(amount) : undefined,
      comparisonOperator: comparisonOperator || undefined,
    }
    await getFundAmountHistories(params)
  }

  const handleChangeFilterParams = (payload: IFundAmountHistoriesFilterParams) => {
    setFilterParams(prev => ({
      ...prev,
      ...payload
    }))
  }

  const getFundAmountHistories = async (params: IFundAmountHistoriesRequestParam) => {
    try {
      const result = await hrmApi.getFundAmountHistories(params)
      setAmountHistories(result)
    } catch (error: any) {
      toast.error(error.detail.message)
    }
  }

  useEffect(() => {
    (async () => {
      const { size = PAGE_SIZE_LIST[0] } = paginationQuery
      let { amount, comparisonOperator } = debounceFilter
      if ((!!comparisonOperator && amount === "") || (amount !== "" && !comparisonOperator)) {
        amount = ""
        comparisonOperator = ""
      }
      const page = 1
      setPaginationQuery(prev => ({
        ...prev,
        page,
      }))
      const params: IFundAmountHistoriesRequestParam = {
        maxResultCount: size,
        searchText: debounceFilter.note,
        skipCount: (page - 1) * size,
        amount: amount ? Number(amount) : undefined,
        comparisonOperator: comparisonOperator || undefined,
      }
      await getFundAmountHistories(params)
    })()
  }, [debounceFilter])

  const pageCount = useMemo(() => {
    const { totalCount } = amountHistories
    const { size = PAGE_SIZE_LIST[0] } = paginationQuery
    return Math.ceil(totalCount / size)
  }, [paginationQuery, amountHistories.totalCount])

  return (
    <FundAmountHistoriesContainer>
      <FundAmountHistoriesFilters
        filterParams={filterParams}
        handleChangeParams={handleChangeFilterParams}
      />
      <TableFundAmountHistories
        note={filterParams.note}
        list={amountHistories.items}
        count={pageCount}
        pagination={paginationQuery}
        setPagination={setPagination}
      />
    </FundAmountHistoriesContainer>
  )
}

export default FundAmountHistories

import React, { useEffect, useState, useMemo } from "react"
import { connect, ConnectedProps } from "react-redux"
import { styled } from "@mui/material/styles"
import { makeStyles } from "@mui/styles"
import useDebounce from "@/utils/useDebounce"
import { sGetLog } from "@/store/log/selector"
import { Box, SelectChangeEvent, Button } from "@mui/material"
import Paper from "@mui/material/Paper"
import moment from "moment"
import { Search } from "@/components/Search/Search"
import { AuditLogTable } from "@/features/AuditLog/component/AuditLogTable"
import { getAllLog } from "@/store/log/thunkApi"
import IPagination from "@/components/Pagination/IPagination"
import { AppDispatch, AppState } from "@/store"
import { PAGE_SIZE_LIST } from "@/types/pagination"
import {
  SORT_ENUM,
  ILogSearch
} from "@/types"
import { Select } from "@/features/AuditLog/component/Select"
import { AUDIT_LOG_TABLE_COLUMNS, AUDIT_LOG_SEARCH_CATEGORY , FILTER_TYPE } from "@/enums/auditLog"
import { REQUEST_METHOD } from "@/enums/httpRequest"
import { AuditDateFiled } from "@/features/AuditLog/component/DateFiled"
import FilterAltIcon from "@mui/icons-material/FilterAlt"
import { TimeFormat } from "@/enums/times"
import MenuPopup from "@/components/MenuPopup/MenuPopup"
import FilterList, {
  IFilterListData
} from "@/features/News/components/FilterList"
import CloseIcon from "@mui/icons-material/Close"
import { NoItemFound } from "@/components"


const AuditLogWrapper = styled(Box)({
  "& >:not(:nth-of-type(1))": {
    marginTop: 20
  }
})

const AuditLogHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between"
})

const BoxWithGap = styled(Box)({
  display: "flex",
  gap: "10px"
})

const ClearButton = styled(Button)({
  padding: "0px",
  minWidth: "40px"
})

const useStyles = makeStyles({
  pagination: {
    justifyContent: "flex-end",
    gap: "20px"
  }
})

const AuditLogPage = React.memo(
  ({
    log,
    pGetAllLog
  }: PropsFromStore) => {
    const [firstLoading, setFirstLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(PAGE_SIZE_LIST[0])
    const [selectedMethod, setSelectedMethod] = useState<string>("ALL")
    const [searchText, setSearchText] = useState<string>("")
    const [order, setOrder] = useState<SORT_ENUM>(SORT_ENUM.DESC)
    const [orderBy, setOrderBy] = useState<string>("createdTime")
    const [fromTime, setFromTime] = useState<Date | null>(null)
    const [toTime, setToTime] = useState<Date | null>(null)
    const [searchCategory, setSearchCategory] = useState(AUDIT_LOG_SEARCH_CATEGORY.CREATEDBY as string)
    const debounceSearchText = useDebounce(searchText, 500)

    const getParamValue = (paramName: string) => ( 
      (searchCategory === paramName && debounceSearchText) ? debounceSearchText : undefined
    )
    
    const calculateDatePickerMessage = () => {
      const fromDate = moment(fromTime).format(TimeFormat.DDMMYYYY);
      const toDate = moment(toTime).format(TimeFormat.DDMMYYYY);

      if(fromTime || toTime) {
        return ( fromTime ? `From ${fromDate} to ` : `Before `) + (toTime ? toDate : `Now`);
      }
      return 'All times';
    } 

    const filterElData: IFilterListData[] = useMemo(() => {
      const REQUEST_OPTIONS: (REQUEST_METHOD | 'ALL')[] = Object.values(REQUEST_METHOD);
      REQUEST_OPTIONS.unshift('ALL');
      const rangePickerMessage = calculateDatePickerMessage()
      return [
        {
          title: "Method",
          childrenSelect: REQUEST_OPTIONS.map((method: REQUEST_METHOD | 'ALL') => ({
            title: method,
            isSelected: selectedMethod === method,
            setIsSelected: (index: number) => {
              setSelectedMethod(REQUEST_OPTIONS[index])
              // reset page to 1
              setPage(1)
            }
          })
          )
        },
        {
          title: "From - To",
          filterType: FILTER_TYPE.DATE_PICKER,
          childrenDatePicker: {
            value: rangePickerMessage,
            elements: [
              <BoxWithGap key="from">
                <AuditDateFiled
                  label="From"
                  value={fromTime}
                  setValue={setFromTime}
                  setPage={setPage}
                  disabled={false}
                  disableFuture
                  maxDate={toTime || undefined}
                />
                <ClearButton
                  variant="outlined"
                  color="error"
                  title="Cancel"
                  onClick={() => {
                    setFromTime(null)
                    setPage(1);
                  }}
                >
                  <CloseIcon />
                </ClearButton>
              </BoxWithGap>,
              <BoxWithGap key="to">
                <AuditDateFiled
                  label="To"
                  value={toTime}
                  setValue={setToTime}
                  setPage={setPage}
                  disabled={false}
                  disableFuture
                  minDate={fromTime || undefined}
                />
                <ClearButton
                  variant="outlined"
                  color="error"
                  title="Cancel"
                  onClick={() => {
                    setToTime(null)
                    setPage(1)
                  }}
                >
                  <CloseIcon />
                </ClearButton>
              </BoxWithGap>
            ],
          }
        }
      ]
    }, [
      selectedMethod,
      fromTime,
      toTime
    ])

    useEffect(() => {
      const getLogData = async (params: ILogSearch) => {
        await pGetAllLog(params)
        setFirstLoading(false)
      }
      getLogData({
        method: selectedMethod !== 'ALL' ? selectedMethod : undefined,
        page,
        size: rowsPerPage,
        order,
        orderBy,
        from: fromTime || undefined,
        to: toTime || undefined,
        createdBy: getParamValue(AUDIT_LOG_SEARCH_CATEGORY.CREATEDBY),
        endpoint: getParamValue(AUDIT_LOG_SEARCH_CATEGORY.ENDPOINT),
        exception: getParamValue(AUDIT_LOG_SEARCH_CATEGORY.EXCEPTION),
      })
    }, [
      selectedMethod,
      page,
      rowsPerPage,
      order,
      orderBy,
      toTime,
      fromTime,
      debounceSearchText
    ])

    const handleChangeRowsPerPage = (e: SelectChangeEvent) => {
      setRowsPerPage(parseInt(e.target.value))
      setPage(1)
    }

    const styles = useStyles()

    return (
      <AuditLogWrapper>
        <AuditLogHeader>
          <BoxWithGap>
            <Select
              title="Search Category"
              items={Object.values(AUDIT_LOG_SEARCH_CATEGORY)}
              showAllOption={false}
              selectedItem={searchCategory}
              setSelectedItem={setSearchCategory}
              setPage={setPage}
            />
            <Search setPage={setPage} setSearchText={setSearchText} />
          </BoxWithGap>
          <MenuPopup
            buttonProps={{
              variant: "contained",
              size: "small"
            }}
            buttonChildren={<FilterAltIcon />}
            MenuChildren={<FilterList width={250} filterEl={filterElData} />}
          />

        </AuditLogHeader>
        <Paper>
          <AuditLogTable
            items={log?.data}
            columns={AUDIT_LOG_TABLE_COLUMNS}
            firstLoading={firstLoading}
            order={order}
            setOrder={setOrder}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
          />
          {!log?.data.length && (
            <NoItemFound />
          )}
          <IPagination
            count={log?.pageCount}
            defaultPage={1}
            page={page}
            className={styles.pagination}
            showFirstButton
            showLastButton
            rowsPerPageOptions={PAGE_SIZE_LIST}
            rowsPerPage={rowsPerPage}
            onChange={(e, page) => setPage(page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </AuditLogWrapper>
    )
  }
)

const mapStateToProps = (state: AppState) => ({
  log: sGetLog(state)
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  pGetAllLog: (params: ILogSearch) => dispatch(getAllLog(params)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromStore = ConnectedProps<typeof connector>

export default connector(AuditLogPage)

AuditLogPage.displayName = "Audit Log Page"

import React, { useState } from "react"
import { styled } from "@mui/material/styles"
import { makeStyles } from "@mui/styles"
import { Box , SelectChangeEvent } from "@mui/material"
import { BasicTable } from "@/components/BasicTable/BasicTable"
import { DateNavigate } from "@/components/DateNavigate/DateNavigate"
import { Search } from "@/components/Search/Search"
import IPagination from "@/components/Pagination/IPagination"
import { PAGE_SIZE_LIST } from "@/types/pagination"
import { ToggleButton } from "@/components/ToggleButton/ToggleButton"
import { TimePickerType } from "@/enums/times"
import { SizeType } from "@/enums/size"

const ViolationsWrapper = styled(Box)(({ theme }) => ({
  margin: '0 auto',
  padding: `${theme.spacing(2)} 0`,
  width: '70vw',
  maxWidth: '1000px',
  "& > :not(:nth-child(1))": {
    marginTop: theme.spacing(2)
  }
}))

const ViolationsHeader = styled(Box)(({
  display: 'flex',
  justifyContent: 'space-between'
}))

const ViolationsLeftHeader = styled(Box)(({theme}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: theme.spacing(2)
}))

const useStyles = makeStyles({
  pagination: {
    justifyContent: "flex-end",
    gap: 20
  }
})

const fakeColumns = ["name", "daily", "komu", "tracker"]

const fakeViolations = {
  pageCount: 20,
  violations: [
  { id: 1, name: "Trần Mạnh An", daily: 20, komu: 20, tracker: null },
  { id: 2, name: "Tran Văn Mạnh An", daily: 20, komu: 20, tracker: 20 },
  { id: 3, name: "Trần An Mạnh", daily: 20, komu: 20, tracker: 20 },
  { id: 4, name: "Trà Thảo My", daily: 20, komu: null, tracker: 20 },
  { id: 5, name: "Trà My Thảo", daily: 20, komu: 20, tracker: 20 },
  { id: 6, name: "Trà Thảo My", daily: 20, komu: 20, tracker: 20 },
  { id: 7, name: "Trà Thảo My", daily: 20, komu: 20, tracker: 20 },
  { id: 8, name: "Trà Thảo My", daily: 20, komu: 20, tracker: 20 },
  { id: 9, name: "Trà Thảo My", daily: 20, komu: 20, tracker: 20 },
  { id: 10, name: "Trà Thảo My", daily: 20, komu: 20, tracker: 20 },
  { id: 11, name: "Trà Thảo My", daily: 20, komu: null, tracker: 20 },
  { id: 12, name: "Trà Thảo My", daily: 20, komu: 20, tracker: 20 },
  { id: 13, name: "Trà Thảo Muội", daily: 20, komu: 20, tracker: 20 },
  { id: 14, name: "Trà Thảo Muội", daily: 20, komu: null, tracker: 20 },
  { id: 15, name: "Trà Thảo Muội", daily: 20, komu: 20, tracker: 20 },
  { id: 16, name: "Trà Thảo Muội", daily: 20, komu: 20, tracker: 20 },
  { id: 17, name: "Trà Thảo Muội", daily: null, komu: 20, tracker: 20 },
  { id: 18, name: "Trà Thảo Muội", daily: 20, komu: 20, tracker: 20 },
  { id: 19, name: "Trà Thảo Muội", daily: 20, komu: 20, tracker: 20 },
  { id: 20, name: "Trà Thảo Muội", daily: 20, komu: 20, tracker: 20 }
  ]
}

const Violations = () => {
  const [date, setDate] = useState(new Date())
  const [searchText, setSearchText] = useState('')
  const [dateType, setDateType] = useState<string>(TimePickerType.DAY)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [currentPage, setCurrentPage] = useState(1)
  const styles = useStyles();

  const handleChangePage = (e: unknown, page: number) => {
    setCurrentPage(page);
  }
  const handleChangeRowsPerPage = (e: SelectChangeEvent) => {
    setRowsPerPage(parseInt(e.target.value))
  }
  const toggleItems = [{title: 'Day', value: TimePickerType.DAY}, {title: 'Month', value: TimePickerType.MONTH}]
  
  return (
    <ViolationsWrapper>
      <ViolationsHeader>
        <ViolationsLeftHeader>
          <DateNavigate date={date} setDate={setDate} pickerType={dateType} />
          <ToggleButton items={toggleItems} selectedValue={dateType} setSelectedValue={setDateType} />
        </ViolationsLeftHeader>
        <Search setSearchText={setSearchText} />
      </ViolationsHeader>
      <BasicTable
        size={SizeType.SMALL}
        columns={fakeColumns}
        items={fakeViolations.violations}
      />
      <IPagination
        count={fakeViolations.pageCount}
        defaultPage={1}
        page={currentPage}
        className={styles.pagination}
        showFirstButton
        showLastButton
        rowsPerPageOptions={PAGE_SIZE_LIST}
        rowsPerPage={rowsPerPage}
        onChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </ViolationsWrapper>
  )
}

export default Violations

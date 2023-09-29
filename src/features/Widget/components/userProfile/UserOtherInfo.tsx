import {
  Box,
  Stack,
  styled,
  Tooltip,
  Zoom,
  Typography
} from "@mui/material"

import {
  BankIcon,
  InsuranceIcon,
  BankAccountIcon,
  TaxCodeIcon,
  IdCardIcon,
  PlaceOfResidentIcon,
  PlaceOfOriginIcon,
  OfficeIcon,
  CalendarIcon
} from "@/assets"
import IMSImage from "@/components/Image/IMSImage"
import { getDateByFormat } from "@/utils/time"
import { TimeFormat } from "@/enums/times"
import { IUserInfo } from "@/types"

interface UserBasicInfoProps {
  userInfo: IUserInfo
}

const CustomBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: 6,
  "& img": {
    width: 18,
  },
  "& > div": {
    display: "flex",
    gap: theme.spacing(1),
    flex: 5,
    cursor: "default",
    "& span": {
      fontSize: 13,
      color: theme.palette.grey[500]
    }
  },
  "& p": {
    textAlign: "right",
    flex: 7
  }
}))

const OtherInfoContainer = styled(Stack)(({ theme }) => ({
  flex: 1,
  marginTop: theme.spacing(1),
  paddingRight: theme.spacing(1),
  overflowY: "auto",
  gap: 12
}))

const UserOtherInfo = ({ userInfo }: UserBasicInfoProps) => {
  const {
    bank,
    bankAccountNumber,
    taxCode,
    insuranceStatusName,
    placeOfPermanent,
    address,
    idCard,
    issuedOn,
    issuedBy
  } = userInfo;

  return (
    <OtherInfoContainer>
      <CustomBox>
        <Tooltip title="Ngân hàng" placement="bottom" TransitionComponent={Zoom}>
          <div>
            <IMSImage src={BankIcon} />
            <span>Bank: </span>
          </div>
        </Tooltip>
        <Typography>{bank}</Typography>
      </CustomBox>
      <CustomBox>
        <Tooltip title="Số tài khoản ngân hàng" placement="bottom" TransitionComponent={Zoom}>
          <div>
            <IMSImage src={BankAccountIcon} />
            <span>Bank account: </span>
          </div>
        </Tooltip>
        <Typography>{bankAccountNumber}</Typography>
      </CustomBox>
      <CustomBox>
        <Tooltip title="Mã số thuế" placement="bottom" TransitionComponent={Zoom}>
          <div>
            <IMSImage src={TaxCodeIcon} />
            <span>Tax code: </span>
          </div>
        </Tooltip>
        <Typography>{taxCode}</Typography>
      </CustomBox>
      <CustomBox>
        <Tooltip title="Bảo hiểm" placement="bottom" TransitionComponent={Zoom}>
          <div>
            <IMSImage src={InsuranceIcon} />
            <span>Insurance status: </span>
          </div>
        </Tooltip>
        <Typography>{insuranceStatusName}</Typography>
      </CustomBox>
      <CustomBox>
        <Tooltip title="Quê quán" placement="bottom" TransitionComponent={Zoom}>
          <div>
            <IMSImage src={PlaceOfOriginIcon} />
            <span>Place of origin: </span>
          </div>
        </Tooltip>
        <Typography>{placeOfPermanent}</Typography>
      </CustomBox>
      <CustomBox>
        <Tooltip title="Nơi thường trú" placement="bottom" TransitionComponent={Zoom}>
          <div>
            <IMSImage src={PlaceOfResidentIcon} />
            <span>Place of residence: </span>
          </div>
        </Tooltip>
        <Typography>{address}</Typography>
      </CustomBox>
      <CustomBox>
        <Tooltip title="Số CCCD/CMT" placement="bottom" TransitionComponent={Zoom}>
          <div>
            <IMSImage src={IdCardIcon} />
            <span>Identity: </span>
          </div>
        </Tooltip>
        <Typography>{idCard}</Typography>
      </CustomBox>
      <CustomBox>
        <Tooltip title="Ngày cấp" placement="bottom" TransitionComponent={Zoom}>
          <div>
            <IMSImage src={CalendarIcon} />
            <span>Date of issue:</span>
          </div>
        </Tooltip>
        <Typography>
          {issuedOn ? getDateByFormat(issuedOn, TimeFormat.DDMMYYYY) : ""}
        </Typography>
      </CustomBox>
      <CustomBox>
        <Tooltip title="Cấp bởi" placement="bottom" TransitionComponent={Zoom}>
          <div>
            <IMSImage src={OfficeIcon} />
            <span>Issued by: </span>
          </div>
        </Tooltip>
        <Typography>{issuedBy}</Typography>
      </CustomBox>
    </OtherInfoContainer>
  )
}

export default UserOtherInfo

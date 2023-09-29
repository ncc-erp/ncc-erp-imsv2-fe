import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"
import PlaceIcon from "@mui/icons-material/Place"

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    margin: "0 30px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    "& p": {
      display: "flex",
      animation: "marquee 50s linear infinite",
      color: theme.palette.text.primary
    },
    "& strong,& svg": {
      color: theme.palette.error.main
    }
  }
}))

const CompanyLocation = () => {
  const styles = useStyles()
  return (
    <div className={styles.root}>
      <p>
        <PlaceIcon fontSize="small" />
        <strong>HA NOI 1</strong>
        : 6th Floor, CT1 C14 Bac Ha, To Huu, Nam Tu Liem, Ha Noi.
        <PlaceIcon fontSize="small" />
        <strong>HA NOI 2</strong>
        : 7th Floor, Vinfast My Dinh Building, 8 Pham Hung, Cau Giay, Ha Noi.
        <PlaceIcon fontSize="small" />
        <strong>HA NOI 3</strong>
        : 5th Floor, Hong Ha Tower, 89 Thinh Liet, Hoang Mai, Ha Noi.
        <PlaceIcon fontSize="small" /> <strong>VINH</strong>
        : 4th Floor, 138 Ha Huy Tap, Vinh, Nghe An.
        <PlaceIcon fontSize="small" />
        <strong>DA NANG</strong>
        : 3rd Floor, TP Building, 268 30/4 Street, Hoa Cuong Bac, Hai Chau, Da
        Nang.
        <PlaceIcon fontSize="small" />
        <strong>QUY NHON</strong>
        : 3rd Floor, Hibecco Building, 307 Nguyen Thi Minh Khai, Quy Nhon, Binh
        Dinh.
        <PlaceIcon fontSize="small" />
        <strong>SAI GON 1</strong>
        : 4th Floor, 120 Kha Van Can, Hiep Binh Chanh, Thu Duc, Ho Chi Minh.
        <PlaceIcon fontSize="small" /> <strong>SAI GON 2</strong>: 1st Floor,
        Phong Phu Tower, 93/10 Quang Trung, Kp1, Hiep Phu, Thu Duc, HCM.
      </p>
    </div>
  )
}
export default CompanyLocation

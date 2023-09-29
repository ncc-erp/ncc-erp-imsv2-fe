import { createGlobalStyle } from "styled-components"

const arrJustifyContent = [
  {
    className: "justify-content-between",
    property: "justify-content",
    value: "space-between",
  },
  {
    className: "justify-content-end",
    property: "justify-content",
    value: "flex-end",
  },
  {
    className: "justify-content-start",
    property: "justify-content",
    value: "flex-start",
  },
]
const arrAlignItems = [
  {
    className: "align-items-center",
    property: "align-items",
    value: "center",
  },
  {
    className: "align-items-baseline",
    property: "align-items",
    value: "baseline",
  },
  {
    className: "align-items-start",
    property: "align-items",
    value: "flex-start",
  },
  {
    className: "align-items-end",
    property: "align-items",
    value: "flex-end",
  },
]
const arrTextColor = [
  {
    className: "text-white",
    property: "color",
    value: "#fff",
  },
  {
    className: "text-danger",
    property: "color",
    value: "#dc3545",
  },
  {
    className: "text-primary",
    property: "color",
    value: "#2d8cf0",
  },
]
const arrDisplay = [
  {
    className: "d-flex",
    property: "display",
    value: "flex",
  },
  {
    className: "d-block",
    property: "display",
    value: "block",
  },
]
const arrTextAlign = [
  {
    className: "text-center",
    property: "text-align",
    value: "center",
  },
]

//  Margin && Padding
const spaces = [0, 0.25, 0.5, 1, 1.5, 2]
const sides = ["top", "bottom", "left", "right", ""]
let marginPaddingStyles = ""

for (const space in spaces) {
  for (const side of sides) {
    marginPaddingStyles += `
      .m${side.slice(0, 1)}-${space} { 
        margin${side ? "-" + side : ""}: ${spaces[space]}rem !important
      }
    `
    marginPaddingStyles += `
      .p${side.slice(0, 1)}-${space} { 
        padding${side ? "-" + side : ""}: ${spaces[space]}rem !important
      }
    `
  }
}

const styles = () => {
  let styles = ""
  styles += styleLoop(arrJustifyContent)
  styles += styleLoop(arrAlignItems)
  styles += styleLoop(arrTextColor)
  styles += styleLoop(arrDisplay)
  styles += styleLoop(arrTextAlign)
  styles += marginPaddingStyles
  return styles
}

interface arrType {
  className: string
  property: string
  value: string
}

const styleLoop = (arr: arrType[]) => {
  let result = ""
  for (let i = 0, length = arr.length; i < length; i++) {
    result += `
        .${arr[i].className} {
          ${arr[i].property}: ${arr[i].value} !important;
        }
      `
  }
  return result
}

const StyleGlobal = createGlobalStyle`  
  .form-control {
    .form-label {

    }
    .form-input {
      position: relative;
      margin-bottom: 10px;
      .text-error{
        text-transform: capitalize;
        color: #dc3545;
        position: absolute;
        bottom: -20px;
        font-size: 12px;
      }
    }
  }
  .input-error {
    border: 1px solid #dc3545 !important;
    box-shadow: 0 0 0 2px rgb(220 53 69 / 20%) !important;
    &:hover, &.Mui-focused {
      box-shadow: 0 0 0 2px rgb(220 53 69 / 20%) !important;
    }
  }
  ${styles()};
`

export default StyleGlobal

import * as yup from "yup"
import { ALLOW_IMAGE_TYPE, ALLOW_IMAGE_SIZE } from "@/enums/albums"
import { VALID_URL, SPECIAL_CHARACTERS } from "@/enums/regex"

const albumSchema = yup.object().shape({
  title: yup.string().required("Please enter album name.").trim()
  .test('length', 'Maximum 50 characters', val => val.length <= 50)
  .test('special characters', "Can't include special characters", val => !(new RegExp(SPECIAL_CHARACTERS)).test(val)),
  categoryId: yup.number().required("Please chose a category"),
  isActive: yup.boolean().required("Please select active status"),
  description: yup.string().trim().test('length', 'Maximum 50 characters', val => !val || val?.length <= 200)
  .test('special characters', "Can't have special characters", val => !val || !(SPECIAL_CHARACTERS).test(val)),
  thumbnailImage: yup.string(),
  albumTime: yup
    .date()
    .label("Album time")
    .required("Please select album time")
    .typeError("Please input a valid date")
    .max(new Date(), "Album time field can't greater than today")
    .min("01/01/1900", "Album time field must start from 01/01/1900"),
  albumUrl: yup
    .string()
    .required("Please enter album url")
    .matches(VALID_URL, "Please enter correct url!")
})

export const createNewAlbumSchema = albumSchema.shape({
  thumbnailImageFile: yup
    .mixed<File>()
    .required("Thumbnail is required")
    .test(
      "check-type-thumbnail",
      "Type of thumbnail image is invalid.",
      (file) => {
        if (!file) return true
        return ALLOW_IMAGE_TYPE.includes(file.type)
      }
    )
    .test("check-size-thumbnail", "Maximum 2MB.", (value) => {
      if (!value) return true
      return value.size <= ALLOW_IMAGE_SIZE
    })
})

export const editAlbumSchema = albumSchema.shape({
  thumbnailImageFile: yup
    .mixed<File>()
    .when("thumbnailImage", {
      is: "" || undefined,
      then: (schema) =>
        schema
          .required("Thumbnail is required")
          .test(
            "check-type-thumbnail",
            "Type of thumbnail image is invalid.",
            (file) => {
              if (!file) return true
              return ALLOW_IMAGE_TYPE.includes(file.type)
            }
          )
          .test("check-size-thumbnail", "Maximum 2MB.", (value) => {
            if (!value) return true
            return value.size <= ALLOW_IMAGE_SIZE
          }),
      otherwise: (schema) => schema
    })
})

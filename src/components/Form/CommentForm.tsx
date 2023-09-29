import { AppState } from "@/store"
import { Box, Button, styled, Popover } from "@mui/material"
import { FormEvent, useEffect, useRef, useState } from "react"
import { ConnectedProps, connect } from "react-redux"
import { IMSAvatar } from "@/components"
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';

export interface ICommentFormProps extends PropsFromStore {
  initValue?: string
  isShowAvatar?: boolean
  onSubmit: (values: string) => void
}

const CommentFormContainer = styled("form")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  columnGap: theme.spacing(1.9),
  padding: "15px 0",
  margin: theme.spacing(1.25, 0),
  "& img": {
    width: 40,
    height: 40,
    borderRadius: "50%",
    objectFit: "cover"
  }
}))

const CommentFormInput = styled(Box)(({ theme }) => ({
  position: "relative",
  flex: "1 1 0",
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1.5, 2, 7.5),
  height: "auto",
  "& > textarea": {
    width: "100%",
    background: "transparent",
    border: "none",
    outline: "none",
    color: theme.palette.grey[800],
    resize: "none",
    font: "inherit",
    fontSize: theme.typography.h5.fontSize,
    overflow: "hidden"
  }
}))

const CommentFormAction = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  position: "absolute",
  right: 0,
  bottom: theme.spacing(1.25),
  padding: theme.spacing(1.25, 1.25, 0)
}))

const CommentFormButtonSubmit = styled(Button)(({ theme }) => ({
  fontWeight: 600,
  fontSize: theme.typography.h6.fontSize,
  backgroundColor: theme.palette.primary.dark,
  padding: theme.spacing(0.6, 2.5)
}))

const CommentForm = ({
  initValue = "",
  onSubmit,
  isShowAvatar = true,
  userProfile
}: ICommentFormProps) => {
  const [value, setValue] = useState<string>(initValue)
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus()
    }
  }, [])

  const handleHeightChange = (e: FormEvent<HTMLTextAreaElement>) => {
    const textAreaElement = e.currentTarget
    if (!textAreaElement) return

    if (textAreaElement.scrollHeight >= 60) {
      textAreaElement.style.height = "auto"
      textAreaElement.style.height = `${textAreaElement.scrollHeight}px`
    }

    setValue(textAreaElement.value)
  }

  const handleCommentSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(value)

    setValue("")
  }

  const addEmoji = (e: any) => {
    const emoji = e.native;
    setValue((value: string) => (value + emoji));
  };
  

  return (
    <CommentFormContainer onSubmit={handleCommentSubmit}>
      {isShowAvatar && (
        <IMSAvatar
          src={userProfile.avatar}
          alt={userProfile.name}
        />
      )}
      <CommentFormInput>
        <textarea
          ref={textAreaRef}
          value={value}
          onInput={handleHeightChange}
          placeholder="Write comment..."
        ></textarea>
        <span>
          <Box sx={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}>
            <AddReactionOutlinedIcon onClick={(e) => setAnchorEl(e.currentTarget as any)} />
          </Box>
          <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          transform: "translateY(10px)"
        }}
      >
        <Picker data={data} onEmojiSelect={addEmoji} previewEmoji="speech_balloon" />
      </Popover>
      </span>
        <CommentFormAction>
          <CommentFormButtonSubmit
            type="submit"
            variant="contained"
            size="small"
            disabled={!value.trim().length}
          >
            Comment
          </CommentFormButtonSubmit>
        </CommentFormAction>
      </CommentFormInput>
    </CommentFormContainer>
  )
}

const mapStateToProps = (state: AppState) => ({
  userProfile: state.user.userProfile
})

const connector = connect(mapStateToProps)

type PropsFromStore = ConnectedProps<typeof connector>

export default connector(CommentForm)

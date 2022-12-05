import { Box, Popover } from "@mantine/core"
import { Message } from "@twilio/conversations"
import { MouseEventHandler, TouchEventHandler, useState } from "react"
import { deleteMessage } from "../../services/conversation/message.twilio.service"
import { useBreakpoint } from "../../utils/breakpoint.hook"
import { MainMessageBox } from "./MainMessageBox"
import { MessageBox } from "./MessageBox"
import { TooltipMessageActions } from "./TooltipMessageActions"

interface RowMessageProps {
  message: Message
  index: number
  selected: boolean
  onSelect: (message: Message) => void
  handlers: {
    onClick: MouseEventHandler
    onTouchStart: TouchEventHandler
    onTouchEnd: TouchEventHandler
    onMouseDown: MouseEventHandler
    onMouseUp: MouseEventHandler
  }
  onDelete: (message: Message) => void
}
export const RowMessage = ({ message, index, selected, onSelect, handlers, onDelete }: RowMessageProps) => {
  const [opened, setOpened] = useState(false)
  const [activeHover, setActiveHover] = useState(false)
  const breakpoint = useBreakpoint()
  const matchXS = breakpoint >= 576

  const mainTarget = <MainMessageBox
    onMouseEnter={() => setOpened(true)}
    onMouseLeave={() => setOpened(false)}
    message={message}
  />
  const target = <MessageBox
    onMouseEnter={() => setOpened(true)}
    onMouseLeave={() => setOpened(false)}
    message={message}
  />

  const choose = index > 0 && matchXS ? target : mainTarget

  const handleEditMessage = () => {
    console.log('edit message')
  }
  const handleShowMoreOptions = () => {
    console.log('show more options')
  }


  return (
    <Popover
      opened={opened}
      position='top'
      placement='end'
      trapFocus={false}
      styles={{
        inner: {
          padding: '0'
        },
        popover: {
          position: 'relative',
          top: index === 0 ? '40px' : '25px',
          right: '20px'
        }
      }}
      sx={(theme) => ({
        position: 'relative',
        backgroundColor: activeHover && selected === false ? theme.colors.gray[9] : selected ? theme.colors.dark[8] : 'transparent',
        transition: 'background-color 0.1s ease-in-out',
      })}
      onMouseOver={() => {
        setActiveHover(true)
        setOpened(true)
      }}
      onMouseLeave={() => {
        setActiveHover(false)
        setOpened(false)
      }}

      target={
        <Box
          onMouseDownCapture={() => onSelect(message)}
          onTouchStartCapture={() => onSelect(message)}
          {...handlers}
        >
          {choose}
        </Box>
      }
    >
      <TooltipMessageActions
        onClickEdit={handleEditMessage}
        onClickDelete={() => onDelete(message)}
        onClickMore={handleShowMoreOptions}
      />
    </Popover>
  )
}

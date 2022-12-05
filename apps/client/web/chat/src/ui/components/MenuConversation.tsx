import { Box, Button, Menu, Text } from "@mantine/core"
import { Conversation } from "@twilio/conversations"
import { ForwardedRef, forwardRef } from "react"
import { ChevronDown, DoorEnter as DoorExit, Trash, UserPlus } from "tabler-icons-react"

interface MenuConversationProps {
  conversation: Conversation
  onAddUser: () => void
  onLeaveRoom: () => void
  onDeleteRoom: () => void
}
export const MenuConversationButton = forwardRef(({ conversation, onAddUser, onLeaveRoom, onDeleteRoom }: MenuConversationProps, ref: ForwardedRef<HTMLDivElement>) => {

  return (
    <Menu
      ref={ref}
      sx={{ width: '100%' }}
      size='sm'
      position="bottom"
      placement='end'
      styles={{
        body: {
          position: 'relative',
          left: '25px'
        }
      }}
      control={
        <Button fullWidth variant='subtle' p={0} m={0}>
          <Text>
            {conversation?.friendlyName ?? conversation?.uniqueName}
          </Text>
          <ChevronDown />
        </Button>
      }
    >
      <Menu.Item onClick={onAddUser} icon={<UserPlus color='skyblue' size={14} />}>Add Participant</Menu.Item>
      <Menu.Item onClick={onLeaveRoom} icon={<DoorExit color='tomato' size={14} />}>Leave Room</Menu.Item>
      <Menu.Item onClick={onDeleteRoom} icon={<Trash color='tomato' size={14} />}>Delete Room</Menu.Item>
    </Menu>
  )
})

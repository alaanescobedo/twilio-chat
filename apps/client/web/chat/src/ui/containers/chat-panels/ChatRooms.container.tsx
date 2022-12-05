import { Button, Modal, Stack } from "@mantine/core"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import conversationService from "../../../services/conversation/conversation.twilio.service"
import participantTwilioService from "../../../services/conversation/participant.twilio.service"
import { useUsersConversation } from "../../../services/conversation/user.twilio.hook"
import { useConversation } from "../../../store/conversation/conversation.twilio.context"
import { useUser } from "../../../store/user/user.context"
import { MenuConversationButton } from "../../components/MenuConversation"
import { RenderIf } from "../../components/RenderIf"
import { ChatRoomsListDisplay } from "../display/ChatRoomsList.display"
import { AddUserToConversationForm } from "../forms/AddUserToConversation.form"
import { CreateConversationForm } from "../forms/CreateConversation.form"
import { useHotkeys } from '@mantine/hooks';
import { useRef } from "react"
import { useEventsParticipant } from "../../../services/conversation/event-participant.twilio.hook"
import { useEventsConversation } from "../../../services/conversation/events-conversation.twilio.hook"
import { useEventsMessage } from "../../../services/conversation/events-message.twilio.hook"

export const ChatRoomsContainer = () => {

  const { client, conversations, activeConversation, setActiveConversation, listenedRooms, setListenedRooms } = useConversation()
  const [modal, setModal] = useState({
    isOpen: false,
    resource: ''
  })
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [usersIdentities, setUserIdentities] = useState<string[]>([])
  const navigate = useNavigate()

  const { getAllUsers } = useUsersConversation()
  const { user } = useUser()

  const menuRef = useRef<HTMLDivElement>(null)

  const { onListenMessages } = useEventsMessage()
  const { onListenParticipants } = useEventsParticipant()

  useEffect(() => {
    if (activeConversation === null) return
    if (listenedRooms.includes(activeConversation.sid)) return
    setListenedRooms((prev) => [...prev, activeConversation?.sid!])

    onListenMessages()
    onListenParticipants()
  }, [activeConversation])


  // TODO: Cool hook, read how works
  useHotkeys([
    ['ctrl+.', () => {
      if (modal.isOpen === true) return setModal({ isOpen: false, resource: '' })
      setModal({ isOpen: true, resource: 'createConversation' })
    }],
    ['ctrl+B', () => {
      if (menuRef.current === null) return
      menuRef.current.click()
      setIsMenuOpen(true)
    }],
    ['A', () => {
      if (!isMenuOpen || menuRef.current === null) return
      handleOnAddUser()
      menuRef.current.click()
    }],
    ['L', () => {
      if (!isMenuOpen || menuRef.current === null) return
      handleOnLeaveRoom()
      menuRef.current.click()
    }],
    ['D', () => {
      if (!isMenuOpen || menuRef.current === null) return
      handleOnDeleteRoom()
      menuRef.current.click()
    }]
  ]);


  const handleInviteParticipant = ({ identity }: { identity: string }) => {
    participantTwilioService.invite({
      identity,
      conversation: activeConversation
    })
    setModal({ isOpen: false, resource: '' })
  }

  const handleOnAddUser = async () => {
    setModal({
      isOpen: true,
      resource: 'addUser'
    })
    const allUsers = await getAllUsers()
    const identities = allUsers.map(user => user.identity)
    const identitiesWithoutMe = identities.filter(identity => identity !== user?.identity)

    setUserIdentities(identitiesWithoutMe)
  }

  const handleOnLeaveRoom = () => {
    if (!activeConversation) return
    activeConversation?.leave()
    navigate('/conversations/me')
  }

  const handleCreateConversation = async ({ friendlyName }: { friendlyName: string }) => {
    const conversation = await conversationService.conversationFactory({ client, room: friendlyName, method: 'create' })
    conversation.join()
    setModal({ isOpen: false, resource: '' })
  }
  const handleOnDeleteRoom = async () => {
    if (!activeConversation) return
    await activeConversation.delete()
    setActiveConversation(null)
    setModal({ isOpen: false, resource: '' })
    navigate('/conversations/me', { replace: true })
  }

  return (
    <Stack p='sm' sx={(theme) => ({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[0],
      flex: '1'
    })}>
      <Modal
        opened={modal.isOpen}
        centered={true}
        onClose={() => setModal({ isOpen: false, resource: '' })}
        withCloseButton={false}
        overlayBlur={0.5}
      >
        <RenderIf condition={modal.resource === 'addUser'}>
          <AddUserToConversationForm
            onSubmit={handleInviteParticipant}
            usersIdentities={usersIdentities}
          />
        </RenderIf>
        <RenderIf condition={modal.resource === 'createConversation'}>
          <CreateConversationForm onSubmit={handleCreateConversation} />
        </RenderIf>

      </Modal>
      <RenderIf condition={activeConversation !== null}>
        <MenuConversationButton
          ref={menuRef}
          onAddUser={handleOnAddUser}
          onLeaveRoom={handleOnLeaveRoom}
          onDeleteRoom={handleOnDeleteRoom}
          conversation={activeConversation!}
        />
      </RenderIf>
      <ChatRoomsListDisplay conversations={conversations} />
      <Button accessKey="ctrl+k" onClick={() => setModal({ isOpen: true, resource: 'createConversation' })} color='cyan'>
        Create Conversation
      </Button>
    </Stack>
  )
}


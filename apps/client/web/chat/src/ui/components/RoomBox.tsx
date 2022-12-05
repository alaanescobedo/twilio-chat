import { createStyles, Group, Text, UnstyledButton } from "@mantine/core"
import { Conversation } from "@twilio/conversations";
import { Link } from "react-router-dom";
import { ConversationAttributes } from "../../store/conversation/conversation.twilio.context";
import PrefixIcon from "./PrefixIcon";

const useStyles = createStyles((theme) => ({
  room: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: theme.spacing.xs,
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
    '&:focus': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[0],
    }
  },
}));

interface RoomBoxProps {
  room: Conversation
  attributes: ConversationAttributes
}
export const RoomBox = ({ room, attributes }: RoomBoxProps) => {
  const { classes } = useStyles();

  return (
    <UnstyledButton component={Link} to={`/conversations/${room.sid}`} className={classes.room} >
      <Group spacing={4}>
        <PrefixIcon icon={attributes.prefix} />
        <Text size="sm">{room.friendlyName ?? room.uniqueName}</Text>
      </Group>
    </UnstyledButton>
  )
}

import { ActionIcon, Group } from "@mantine/core"
import { Dots, Eraser, Pencil } from "tabler-icons-react"


interface TooltipMessageActionsProps {
  onClickEdit: () => void
  onClickMore: () => void
  onClickDelete: () => void
}
export const TooltipMessageActions = ({ onClickEdit, onClickMore, onClickDelete }: TooltipMessageActionsProps) => {
  return (
    <Group spacing={0} >
      <ActionIcon size='md' onClick={onClickEdit}>
        <Pencil />
      </ActionIcon>
      <ActionIcon size='md' onClick={onClickDelete}>
        <Eraser />
      </ActionIcon>
      <ActionIcon size='md' onClick={onClickMore}>
        <Dots />
      </ActionIcon>
    </Group>
  )
}
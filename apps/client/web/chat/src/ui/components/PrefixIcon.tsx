import {
  Hash,
  Speakerphone,
  Lock,
  Notebook,
  Broadcast
} from 'tabler-icons-react'
import { RenderIf } from './RenderIf'

const validIcons = {
  hash: Hash,
  speakerphone: Speakerphone,
  lock: Lock,
  notebook: Notebook,
  broadcast: Broadcast
}
interface PrefixIconProps {
  icon?: keyof typeof validIcons
}
const PrefixIcon = ({ icon = 'hash' }: PrefixIconProps) => {
  const Icon = validIcons[icon]

  return (
    <RenderIf condition={Icon !== undefined}>
      <Icon size={25} />
    </RenderIf>
  )
}

export default PrefixIcon
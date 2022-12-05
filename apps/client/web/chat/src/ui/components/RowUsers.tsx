import { Popover } from '@mantine/core';
import { Participant } from '@twilio/conversations';
import { useState } from 'react';
import { ParticipantBox } from './ParticipantBox';
import { ParticipantDescriptionBox } from './ParticipantDescriptionBox';

interface RowUserProps {
  participant: Participant
}
export const  RowParticipant = ({ participant }: RowUserProps) => {
  const [opened, setOpened] = useState(false);

  const target = <ParticipantBox participant={participant} />

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      onClick={() => setOpened(true)}
      target={target}
      width={300}
      trapFocus={false}
      position='left'
      placement='end'
      sx={{ width: '100%' }}
      styles={{
        inner: {
          padding: '8px'
        }
      }}
    >
      <ParticipantDescriptionBox participant={participant} />
    </Popover>

  )
}

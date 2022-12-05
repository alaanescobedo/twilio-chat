import { Autocomplete, Button, SegmentedControl, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useState } from "react"


interface AddUserToConversationFormProps {
  usersIdentities: string[]
  onSubmit: (values: { identity: string }) => void
}
export const AddUserToConversationForm = ({ usersIdentities, onSubmit }: AddUserToConversationFormProps) => {

  const form = useForm({
    initialValues: {
      identity: ''
    }
  })

  const [choose, setChoose] = useState('friends')

  const handleSubmit = (values: typeof form.values) => {
    onSubmit(values)
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <SegmentedControl data={[
        { label: 'Friends', value: 'friends' },
        { label: 'I dont have friends :c', value: 'friewhat?' }
      ]}
        value={choose}
        onChange={(value) => setChoose(value)}
      />
      <Text mb='sm' size='sm' weight='lighter' >
        In the full proyect you only will be able to add users from your friends list... so make sure you have some friends
      </Text>
      <Autocomplete
        mb='sm'
        initiallyOpened={false}
        data={choose === 'friends' ? [] : usersIdentities}
        placeholder='Identity of user...'
        nothingFound='No users found'
        limit={5}
        {...form.getInputProps('identity')}
      />
      <Button type="submit" variant='light' color='blue'>
        Add User
      </Button>
    </form>
  )
}

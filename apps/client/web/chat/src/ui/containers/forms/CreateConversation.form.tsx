import {  Button, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"


interface CreateConversationFormProps {
  onSubmit: (values: { friendlyName: string }) => void
}
export const CreateConversationForm = ({ onSubmit }: CreateConversationFormProps) => {

  const form = useForm({
    initialValues: {
      friendlyName: ''
    }
  })

  const handleSubmit = (values: typeof form.values) => {
    onSubmit(values)
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Text mb='sm' color='blue' weight='bold'>Conversation Name</Text>
      <TextInput
        mb='sm'
        {...form.getInputProps('friendlyName')}
      />
      <Button variant='light' color='blue'>
        Create
      </Button>
    </form>
  )
}

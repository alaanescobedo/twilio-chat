import { Button, Container, Paper, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useNavigate } from "react-router-dom"
import { BrandGithub } from "tabler-icons-react"
import { useConversation } from "../../../store/conversation/conversation.twilio.context"

export const LoginForm = () => {

  const form = useForm({
    initialValues: {
      username: '',
    }
  })
  const navigate = useNavigate()

  const { setIdentity } = useConversation()

  const handleSubmit = async (values: { username: string }) => {
    const id = Math.ceil(Math.random()*100000)
    const uniqueIdentity = `${values.username}_${id}`
    setIdentity(uniqueIdentity)
    navigate('/conversations/me', { replace: true })
  }

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        mb='xs'
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Welcome back!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={0} radius="md">
        <Button
          onClick={() => { }}
          leftIcon={<BrandGithub />}
          color='dark'
          sx={(theme) => ({
            display: 'block',
            margin: '0 auto',
            border: `1px solid ${theme.colors.gray[6]}`,
            '&:hover': {
              border: `1px solid ${theme.colors.gray[8]}`,
            }
          })}
        >
          Login with Github
        </Button>
        <form onSubmit={form.onSubmit(values => handleSubmit(values))} style={{ position: 'relative' }} >
          <TextInput
            label="Username"
            placeholder="Enter your username"
            value={form.values.username}
            error={form.errors.username}
            onChange={(e) => form.setFieldValue('username', e.target.value)}
            required
          />
          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container >
  )
}
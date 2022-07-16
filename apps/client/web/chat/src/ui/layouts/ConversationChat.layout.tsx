import { Container, Grid, Skeleton, Stack } from "@mantine/core"
import { useMediaQuery } from '@mantine/hooks';
import { RenderIf } from "../components/RenderIf"
import { useStyles } from "./ConversationChat.config.layout";

interface ConversationChatLayoutProps {
  panelLeft: JSX.Element
  panelTop: JSX.Element
  mainPanel: JSX.Element
  panelRight: JSX.Element
}

export const ConversationChatLayout = ({ panelLeft, panelTop, mainPanel, panelRight }: ConversationChatLayoutProps) => {

  const matchXS = useMediaQuery('(min-width:576px')
  const matchMD = useMediaQuery('(min-width:992px')

  const { classes } = useStyles()

  return (
    <Container fluid sx={{
      paddingTop: '5px',
      paddingBottom: '5px'
    }}>
      <Grid className={classes.gridBase} >

        {/* Left panel */}
        <RenderIf condition={matchXS}>
          <Grid.Col className={classes.colBaseLeft}>
            <Stack sx={{ height: '100%' }} >

              <RenderIf condition={panelLeft !== undefined} fallback={<PanelLeftDefault />}>
                {panelLeft}
              </RenderIf>

            </Stack>
          </Grid.Col>
        </RenderIf>


        <Grid.Col className={classes.colBaseRight} >
          <Stack sx={{ height: '100%' }}>

            {/* Top panel */}
            <RenderIf condition={panelTop !== undefined} fallback={<PanelTopDefault />}>
              {panelTop}
            </RenderIf>

            <Grid className={classes.gridMain}>

              {/* Main panel */}
              <Grid.Col className={classes.colMainLeft}>
                <Stack sx={{ height: '100%', flex: '1' }} >

                  <RenderIf condition={mainPanel !== undefined} fallback={<MainPanelDefault />}>
                    {mainPanel}
                  </RenderIf>

                </Stack>
              </Grid.Col>


              {/* Right panel */}
              <RenderIf condition={matchMD}>
                <Grid.Col className={classes.colMainRight} py={0} pr={0} sx={{ height: '100%', flex: '1' }} >

                  <RenderIf condition={panelRight !== undefined} fallback={<PanelRightDefault />}>
                    {panelRight}
                  </RenderIf>

                </Grid.Col>
              </RenderIf>
            </Grid>

          </Stack>
        </Grid.Col>

      </Grid>
    </Container >
  )
}

// ---------------SKELETON COMPONENTS-----------------
const PanelLeftDefault = () => {
  return (
    <>
      <Skeleton height='65px' radius="md" animate={true} />
      <Skeleton radius="md" height='100%' animate={true} sx={{ flex: '1' }} />
      <Skeleton height='65px' radius="md" animate={true} />
    </>
  )
}
const PanelTopDefault = () => {
  return (
    <Skeleton height='65px' radius="md" animate={true} />
  )
}
const MainPanelDefault = () => {
  return (
    <>
      <Skeleton height='100%' sx={{ height: '100% ', flex: '1' }} radius="md" animate={true} />
      <Skeleton height='65px' radius="md" animate={true} />
    </>
  )
}
const PanelRightDefault = () => {
  return (
    <Skeleton height='100%' radius="md" animate={true} />
  )
}
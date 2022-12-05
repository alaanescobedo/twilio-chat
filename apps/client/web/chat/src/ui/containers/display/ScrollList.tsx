import { Box, ScrollArea } from '@mantine/core'

interface ScrollListProps {
  children: JSX.Element | JSX.Element[]
}
const ScrollList = ({ children }: ScrollListProps) => {

  return (
    <Box sx={{ position: 'relative', height: '100%' }}>
      <ScrollArea
        type='scroll'
        style={{ position: 'absolute' }}
        styles={{
          root: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          },
        }}
      >
        {children}
      </ScrollArea>
    </Box>
  )
}

export default ScrollList
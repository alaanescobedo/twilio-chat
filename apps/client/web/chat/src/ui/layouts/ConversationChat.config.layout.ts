import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  gridBase: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    height: "100vh",
    maxHeight: "100vh",
    gap: theme.spacing.xs,

    [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
      gridTemplateColumns: 'repeat(24,1fr)',
    }
  },
  colBaseLeft: {
    padding: 0,
    height: '100%',

    [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
      gridColumn: '1/6',
    },
    [`@media (min-width: ${theme.breakpoints.lg}px)`]: {
      gridColumn: '1/4',
    },

  },
  colBaseRight: {
    gridColumn: '1/-1',
    padding: 0,
    flex: 1,
    [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
      gridColumn: '6/-1',
      paddingLeft: theme.spacing.xs,
    },
    [`@media (min-width: ${theme.breakpoints.lg}px)`]: {
      gridColumn: '4/-1',
      paddingLeft: theme.spacing.xs,
    },
  },
  gridMain: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    margin: 0,
    height: '100%',
    flex: 1,

    [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
      gridTemplateColumns: 'repeat(18,1fr)',
    },
    [`@media (min-width: ${theme.breakpoints.lg}px)`]: {
      gridTemplateColumns: 'repeat(20,1fr)',
    },

  },
  colMainLeft: {
    gridColumn: '1/-1',
    padding: 0,
    height: '100%',

    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      gridColumn: '1 / -1',
    },
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      gridColumn: '1 / 14',
      paddingRight: theme.spacing.xs
    },
    [`@media (min-width: ${theme.breakpoints.lg}px)`]: {
      gridColumn: '1 / 16',
      paddingRight: theme.spacing.xs
    }
  },
  colMainRight: {
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      gridColumn: '14/-1',
    },
    [`@media (min-width: ${theme.breakpoints.lg}px)`]: {
      gridColumn: '16/-1',
    }
  }
}))


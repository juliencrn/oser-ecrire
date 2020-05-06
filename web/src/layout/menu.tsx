import React, { FC } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Drawer from '@material-ui/core/Drawer'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'

import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'

import { routes } from '../config'

const useStyles = makeStyles((theme: Theme) => ({
  drawerHeader: {
    ...theme.mixins.toolbar,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
}))

export interface MenuItem {
  label: string
  to: string
}

export interface MenuProps {
  links: MenuItem[]
  isLarge: boolean
}

const links: MenuItem[] = [
  { label: "L'atelier d'écriture", to: routes.blog },
  { label: 'Rédaction SEO', to: routes.redac },
  { label: 'À propos', to: '/a-propos' },
  { label: 'Contact', to: '/contact' },
]

const MenuLinks: FC<MenuProps> = ({ links, isLarge }) => (
  <>
    {links.map(({ label, to }) => (
      <Button
        key={to}
        component={GatsbyLink}
        to={to}
        size={isLarge ? `medium` : `large`}
        color="inherit"
      >
        {label}
      </Button>
    ))}
  </>
)

const Menu: FC = () => {
  const theme = useTheme()
  const classes = useStyles()
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'))
  const [isOpen, setOpen] = React.useState(false)

  const handleOpenMenu = () => {
    setOpen(true)
  }

  const handleCloseMenu = () => {
    setOpen(false)
  }
  return (
    <>
      {isLarge ? (
        <MenuLinks links={links} isLarge={isLarge} />
      ) : (
        <>
          <IconButton onClick={handleOpenMenu}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="top" open={isOpen} onClose={handleCloseMenu}>
            <Container maxWidth="lg" className={classes.drawerHeader}>
              <IconButton onClick={handleCloseMenu}>
                <CloseIcon />
              </IconButton>
            </Container>
            <Box pb={1} px={2} display="flex" flexDirection="column">
              <MenuLinks links={links} isLarge={isLarge} />
            </Box>
          </Drawer>
        </>
      )}
    </>
  )
}

export default Menu

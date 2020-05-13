import React, { FC } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Link as GatsbyLink } from 'gatsby'

import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

import { MenuItem } from '../interfaces'
import { routes } from '../config'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  footer: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(4),
    },
  },
  copyright: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    justifyItems: 'center',
    ...theme.mixins.toolbar,
  },
}))

export interface FooterProps {
  siteName: string
}

export interface FooterCol {
  title: string
  links: MenuItem[]
}

const footers: FooterCol[] = [
  {
    title: `L'Écriture Créative`,
    links: [
      { label: 'categorie', to: `/` },
      { label: 'categorie', to: `/` },
      { label: 'categorie', to: `/` },
      { label: 'categorie', to: `/` },
    ],
  },
  {
    title: `L'Écriture web`,
    links: [
      { label: 'Mes Prestations', to: `${routes.redac}/#services` },
      { label: 'Mon Portfolio', to: `${routes.redac}/#services` },
      { label: 'Mes références', to: `${routes.redac}/#services` },
      { label: 'Me demander un devis', to: `/contact` },
    ],
  },

  {
    title: 'Informations',
    links: [
      { label: 'À propos', to: `/a-propos` },
      { label: 'Contact', to: `/contact` },
      { label: 'Mentions légales', to: `/` },
    ],
  },
]

const Footer: FC<FooterProps> = ({ siteName }) => {
  const classes = useStyles()
  return (
    <footer className={classes.root}>
      <Container maxWidth="lg" className={classes.footer}>
        <Grid container spacing={4} justify="space-between">
          {footers.map(footer => (
            <Grid item xs={12} sm={6} md={4} key={footer.title}>
              <Box pl={4}>
                <Typography variant="h6" color="textPrimary" gutterBottom>
                  {footer.title}
                </Typography>
                <ul>
                  {footer.links.map(({ label, to }, i) => (
                    <li key={i}>
                      <Link
                        to={to}
                        component={GatsbyLink}
                        variant="subtitle2"
                        color="textSecondary"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container maxWidth="md" className={classes.copyright}>
        <Typography variant="body1" color="textSecondary" align="center">
          © {new Date().getFullYear()} {siteName} - Site réalisé par
          {` `}
          <Link color="inherit" href="https://juliencaron.eu/" target="_blank">
            Julien CARON
          </Link>
        </Typography>
      </Container>
    </footer>
  )
}

export default Footer

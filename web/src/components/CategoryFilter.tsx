import React, { FC } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

import { NodeArrayOf, Category } from '../interfaces'
import { routes } from '../config'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
  },
  category: {
    padding: theme.spacing(0, 1.5),
    fontWeight: 600,
    color: theme.palette.common.black,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      marginBottom: 0,
    },
  },
}))

export interface CategoryFilterProps {
  categories: NodeArrayOf<Category>
  basePath: string
}

const CategoryFilter: FC<CategoryFilterProps> = ({ categories, basePath }) => {
  const classes = useStyles()
  const allCategory: Category = {
    title: 'Tous',
    slug: {
      current: '',
    },
  }

  return (
    <Typography variant="body2" className={classes.root}>
      {[{ node: allCategory }, ...categories].map(({ node }, i) => {
        const { title, slug } = node

        // Find active item
        const isMainPage = basePath === routes.blog
        const matchCategory =
          basePath.includes(slug.current) && slug.current !== ''
        const active =
          (i !== 0 && matchCategory) ||
          (i === 0 && !matchCategory && isMainPage)

        return (
          <Link
            key={i}
            className={classes.category}
            component={GatsbyLink}
            to={`${routes.blog}/${slug.current}`}
            style={{
              opacity: active ? 1 : 0.6,
            }}
          >
            {title}
          </Link>
        )
      })}
    </Typography>
  )
}

export default CategoryFilter

import React, { FC } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'

import InputBase, { InputBaseProps } from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    background: 'transparent',
    '&:hover': {
      background: theme.palette.common.white,
    },
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fill: theme.palette.text.secondary,
    zIndex: 'auto',
  },
  inputRoot: {
    color: 'inherit',
    background: 'transparent',
    zIndex: 0,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    maxWidth: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '18ch',
      '&:focus': {
        width: '25ch',
      },
    },
  },
}))

export interface InputProps extends InputBaseProps {
  refine?: (key: string) => void
}

const Input: FC<InputProps> = ({ refine, ...rest }) => {
  const classes = useStyles()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (refine) {
      refine(event.target.value)
    }
  }

  return (
    <form className={classes.form}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Chercher un article"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'rechercher' }}
        onChange={handleChange}
        {...rest}
      />
    </form>
  )
}

export default Input

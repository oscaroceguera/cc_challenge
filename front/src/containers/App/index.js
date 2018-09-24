import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { isEmail } from 'validator'
import { withStyles } from '@material-ui/core/styles'
import { TextField, Button, CircularProgress} from '@material-ui/core'

import styles from './styles.css'

const HOST = process.env.API_URL

const stylesTheme = theme => ({
  titleField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400
  },
  emailField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
})

class App extends React.Component {
  state = {
    title: '',
    email: '',
    loading: false,
    error: null,
    successData: ''
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  createIssue = async (e) => {
    this.setState({
      loading: true,
      error: null
    })

    const data = {
      username: this.state.email,
      title: this.state.title,
    }

    try {
      const successData = await axios.post(`${HOST}/api/issue`, data).then(res => res.data)
      this.setState({
        loading: false,
        successData
      })
    } catch (e) {
      this.setState({
        loading: false,
        error: e.message
      })
    }
  }

  render () {
    const { classes } = this.props
    const {email, title, loading, error, successData} = this.state
    const disabled = !!email && !!title && isEmail(email)

    if (loading) {
      return (
        <div className={styles.loading}>
          <CircularProgress/>
        </div>
      )
    }

    return (
      <div className={styles.root}>
        <h1 className={styles.title}>CC Challenge</h1>
        <div className={styles.container}>
          <div>
            <TextField
              name='title'
              placeholder='Title'
              className={classes.titleField}
              value={title}
              onChange={this.onChange}
              multiline
              margin='normal'
            />
            <TextField
              error={!isEmail(email)}
              name='email'
              placeholder='Email'
              className={classes.emailField}
              value={email}
              onChange={this.onChange}
              margin='normal'
            />
          </div>
          <div className={styles.btnContianer}>
            <Button
              disabled={!disabled}
              variant="contained"
              color="secondary"
              onClick={this.createIssue}
            >
              Crear issue
            </Button>
          </div>
        </div>
        {error && <div className={styles.error}>{error}</div>}
        {successData && (
          <div className={styles.successData}>
            <p className={styles.successMsg}>Issue was created successful</p>
            <h3 className={styles.succesTitle}>
              Issue:
              <span className={styles.succesTitleSpan}>
                {successData.title}
              </span>
            </h3>
            <h3 className={styles.succesTitle}>
              User:
              <span className={styles.succesTitleSpan}>
                {successData.user.login}
              </span>
            </h3>
            <div>
              <img src={successData.user.avatar_url} alt='avatar' />
            </div>
          </div>
        )}
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(stylesTheme)(App)



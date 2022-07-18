import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import { postEvent } from '../actions'

class EventsNew extends Component {
  // 本classに従属するメソッドにpropsを紐付ける
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  renderField(field) {
    const { input, label, type, meta: { touched, error } } = field

    return (
      <TextField
        hintText={label}
        floatingLabelText={label}
        type={type}
        errorText={touched && error}
        {...input}
        fullWidth={true}
      />
    )
  }

  async onSubmit(values) {
    await this.props.postEvent(values)
    this.props.history.push('/')
  }

  render() {
    /**
     * handleSubmit: submitをしたときにinputのvalueを引数で取得できるprops
     * pristine: フォームに入力されるとfalseを返す => 送信ボタンの活性/非活性を制御
     * submitting: Submitボタンを押下するとtrueを返す => 二重送信防止
     * invalid: バリデーションエラーがあるときはtrueになる
     */
    const { handleSubmit, pristine, submitting, invalid } = this.props
    const style = { margin: 12 }

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div><Field label="Title" name="title" type="text" component={this.renderField} /></div>
        <div><Field label="Body" name="body" type="text" component={this.renderField} /></div>

        <RaisedButton label="Submit" type="submit" style={style} disabled={pristine || submitting || invalid} />
        <RaisedButton label="Cancel" style={style} containerElement={<Link to="/" />}/>
      </form>
    )
  }
}

// バリデーション処理
const validate = values => {
  const errors = {}
  if (!values.title) errors.title = "タイトルを入力して下さい"

  if (!values.body) errors.body = "内容を入力して下さい"

  return errors
}

const mapDispatchToProps = { postEvent }

// コンポーネントをreduxFormでdecorateすることで、
// コンポーネントのpropsが拡張され、pristine、submitting、invalid等の属性が追加される
export default connect(null, mapDispatchToProps)(
  reduxForm({ validate, form: 'eventNewForm' })(EventsNew)
)
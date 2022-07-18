import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import _ from 'lodash';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { readEvents } from '../actions';

class EventsIndex extends Component {
  // renderメソッドが実行された後に呼ばれる
  componentDidMount() {
    this.props.readEvents();
  };

  renderEvents() {
    // collectionの全要素を1つずつ取り出し、テーブルの行を配列として取得します。
    // keyにはユニークな値を指定するためにeventのidを設定
    return _.map(this.props.events, event => (
      <TableRow key={event.id}>
        <TableRowColumn>{event.id}</TableRowColumn>
        <TableRowColumn>
          <Link to={`/events/${event.id}`}>
            {event.title}
          </Link>
        </TableRowColumn>
        <TableRowColumn>{event.body}</TableRowColumn>
      </TableRow>
    ))
  };

  render() {
    const style = {
      position: "fixed",
      right: 12,
      bottom: 12
    };

    return (
      <React.Fragment>
        <FloatingActionButton style={style} containerElement={<Link to="/events/new" />}>
          <ContentAdd />
        </FloatingActionButton>

        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>タイトル</TableHeaderColumn>
              <TableHeaderColumn>内容</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false}>
            {this.renderEvents()}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

// stateを取得する
const mapStateToProps = state => ({ events: state.events });

// stateを書き換える
const mapDispatchToProps = { readEvents };


export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex);
import * as React from 'react';
import { connect } from 'react-redux';
import { IRootState } from './store';

const mapStateToProps = ({ demo }: IRootState) => {
  const { list, loading } = demo;
  return { list, loading };
}

import { Dispatch } from 'redux';
import * as asyncactions from './store/demo/async-actions';
import { DemoActions } from './store/demo/types';

const mapDispatcherToProps = (dispatch: Dispatch<DemoActions>) => {
  return {
    addItem: (item: string) => asyncactions.addItemAsync(dispatch, item)
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>;

interface IState {
  inputText: string
}

class App extends React.Component<ReduxType, IState> {
  public state: IState = {
    inputText: ''
  }

  public onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({inputText: e.target.value});
  }

  public onAddClick = () => {
    this.props.addItem(this.state.inputText);
    this.setState({inputText: ''});
  }

  public render() {
    const { list, loading } = this.props;

    return (
      <div style={{margin: '20px'}}>
        <input value={this.state.inputText} onChange={this.onInputChange}/>
        <button onClick={this.onAddClick}>Add</button>
        {loading && <div>Loading...</div>}
        <ul>
          {list.map(l => <li key={l}>{l}</li>)}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatcherToProps)(App);

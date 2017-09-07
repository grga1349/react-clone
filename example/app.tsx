import * as ReactClone from '../src';

class App extends ReactClone.Component <void, void> {
  render() {
    return(
      <div>
        <h1>INCREMENT VALUE: </h1>
        <Module title='Title of block 1' text='Text of Block 1' />
        <Module title='Title of block 2' text='Text of Block 2' />
        <Module title='Title of block 3' text='Text of Block 2'/>
        <h1>ADD AND REMOVE NODES: </h1>
        <Nodes />
      </div>
    );
  }
}

interface Props {
  title: string;
  text: string;
}

interface State {
  number: number;
}

class Module extends ReactClone.Component <Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      number: 0
    };
    this.incrementNumber = this.incrementNumber.bind(this);
  }

  incrementNumber() {
    this.setState({number: this.state.number + 1});
  }

  render() {
    return(
      <div>
        <h3>{this.props.title}</h3>
        <p>{this.props.text}</p>
        <p>Number of clicks: {this.state.number}</p>
        <button onClick={this.incrementNumber}>INCREMENT</button>
      </div>
    );
  }
}

interface NodeProps {

}

interface NodeState {
  nodes: Array<any>;
}

function generateId() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

class Nodes extends ReactClone.Component <NodeProps, NodeState> {
  constructor(props: NodeProps) {
    super(props);
    this.state = {
      nodes: []
    };
    this.addNode = this.addNode.bind(this);
    this.removeNode = this.removeNode.bind(this);
  }

  addNode() {
    const newNode = {
      key: generateId()
    };
    const nodes = this.state.nodes;
    this.setState({nodes: [newNode, ...nodes]});
  }

  removeNode(key: string) {
    const newNodes = this.state.nodes.filter((node: any) => {
      return node.key !== key;
    });
    this.setState({nodes: newNodes});
    console.log('this.state: ', this.state);
  }

  renderNodes() {
    return this.state.nodes.map((node: any) => {
      return (
        <Node key={node.key} removeNode={this.removeNode}/>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>ADD NODE: </h3>
        <button onClick={this.addNode}>ADD</button>
        <h3>NODES: </h3>
        {this.renderNodes()}
      </div>
    );
  }
}

interface SNodeProps {
  key: string;
  removeNode: Function;
}

class Node extends ReactClone.Component <SNodeProps, void> {
  constructor(props: SNodeProps) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.removeNode(this.props.key);
  }

  render() {
    return (
      <div>
        <h3>THIS IS NODE</h3>
        <p>KEY: {this.props.key}</p>
        <button onClick={this.onClick} >REMOVE</button>
      </div>
    );
  }
}

ReactClone.render(<App />, document.getElementById('app'));
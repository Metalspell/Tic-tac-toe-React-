import React from 'react';
import Board from './board';
import calculateWinner from './helpers/calculateWinner';

export default class Game extends React.Component {

  constructor() {
    super();

    this.state = {
      xIsNext: true,
      stepNumber: 0,
      history: [{
        squares: Array(9).fill(null)
      }]
    };
  }

  handleClick(i) {
    const {xIsNext, history} = this.state;
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X':'0';
    this.setState({
      history: history.concat([{squares: squares}]),
      xIsNext: !xIsNext,
      stepNumber: ++this.state.stepNumber
    });
  }

  jumpTo(move) {
    this.setState({
      stepNumber: move,
      xIsNext: (move % 2) ? false : true
    });
  }

  renderMoves() {
    return this.state.history.map((step, move) => {
      const desc = move ? 'Move #' + move : 'Game start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });
  }

  render() {

    const {xIsNext, stepNumber, history} = this.state;
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    
    if (winner) {
      status = 'Winner is:'+ winner;
    } else {
      status='Next player is:' + (xIsNext ? 'X':'0');
    }
    
    
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={ (i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{this.renderMoves()}</ol>
        </div>
      </div>  
    );
  }
}
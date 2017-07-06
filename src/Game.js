import React from 'react';
import './Game.css';

const I = 4, J = 6;
const cardStored = Array(I * J).fill(null).map((e, i) => (i + 1) % (I * J));
/* ToDo: randomize (I * J / 2) pairs */

class Card extends React.Component {
    render() {
        let cname = "card";
        if (this.props.live) {
            cname += "Live"
        } else if (this.props.value) {
            cname += "Opened";
        }
        return (
            <button className={cname} onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}

/*
class Board extends React.Component {
  renderCard(i,j) {
    return (
      <Card
        value={this.props.cards[i][j]}
        onClick={() => this.props.onClick(i,j)}
      />
    );
  }

  render() {
    return (
      <div>
        {this.props.cards.map( (eI, idxI) => (
          <div className="board-row">
            { eI.map( (eIJ, idxJ) => (
              this.renderCard(idxI,idxJ)
            ) )}
          </div>
        ) )}
      </div>
    );
  }
}
*/
class Board extends React.Component {
    constructor() {
        super();
        this.state = {
            cards: Array(I*J).fill(null),
            nMatched: 0,
            nClicked: 0,
            preClicked: null,
            clicked: null,
        };
    }

    handleClick(i) {
        if (this.state.nMatched === I * J / 2 || this.state.cards[i]) return;
        this.setState((prevState) => {
            const upCards = prevState.cards.slice();
            upCards[i] = cardStored[i];
            return {
                cards: upCards,
                //nMatched: prevState.nMatched,
                nClicked: prevState.nClicked + 1,
                preClicked: prevState.clicked,
                clicked: i,
            };
        }, this.resetState);
        /* why not showing the 2nd clicked card value, too fast? */
        //setTimeout(this.resetState(), 3000) );
    }

    resetState() {
	const nClicked = this.state.nClicked;
        const isEven = ((nClicked - 1) % 2 > 0);
        if (!isEven || !nClicked) return;
        const preClicked = this.state.preClicked;
        const clicked = this.state.clicked;
        const matched = (cardStored[preClicked] === cardStored[clicked]);
        alert([preClicked, clicked, isEven, cardStored[preClicked], cardStored[clicked], matched]);
        if (matched) {
            this.setState((prevState) => {
                return {
                    // cards: prevState.cards,
                    // nMatched: prevState.nMatched,
                    // nClicked: prevState.nClicked,
                    preClicked: null,
                    clicked: null,
                };
            }, () => alert(JSON.stringify(this.state)));
        } else {
            /* why not showing the 2nd clicked card value, need force rendering? */
            // this.forceUpdate();
            this.setState((prevState) => {
                const upCards = prevState.cards.slice();
                upCards[preClicked] = null;
                upCards[clicked] = null;
                return {
                    cards: upCards,
                    nMatched: prevState.nMatched + 1,
                    // nClicked: prevState.nClicked,
                    preClicked: null,
                    clicked: null,
                };
            }, () => alert(JSON.stringify(this.state)));
        }
    }

    renderCard(i) {
        let live = 0;
        if (this.state.preClicked === i || this.state.clicked === i) live = 1;
        return (
            <Card key={i.toString()} value={this.state.cards[i]}
                live={live} onClick={() => this.handleClick(i)} />
        );
    }

    render() {
        let status = 'Cards: '+ I + ' x ' + J;
        status += ', # of clicked: ' + this.state.nClicked;
        if (this.state.nMatched === I * J / 2) status += ". Game over!";
        const cardArray = Array(I).fill(null).map(x => Array(J).fill(null));
        return (
            <div>
                <div className="status">{status}</div>
                { cardArray.map((element_i, index_i) => (
                    <div key={'row'+index_i.toString()} className="board-row">
                        { element_i.map((element_j, index_j) =>
                            this.renderCard(index_i*J+index_j)
                        )}
                    </div>
                ))}
            </div>
        );
    }
}
/*
class Game extends React.Component {
  constructor() {
    super();
    var cardArray = Array(I).forEach(function(e) { e = Array(J).fill(null)});
    this.state = {
      history: [{
        cards: cardArray,
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const cards = current.cards.slice();
//    if (calculateWinner(cards) || cards[i]) {
//      return;
//    }
    cards[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        cards: cards
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
//    const winner = calculateWinner(current.cards);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move :
        'Game start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    let status;
//    if (winner) {
//      status = 'Winner: ' + winner;
//    } else if (this.state.stepNumber === 9) {
//      status = 'Game ended: tie';
//    } else {
//      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
//    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
        cards={current.cards}
            onClick={(i,j) => this.handleClick(i,j)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
*/
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game;


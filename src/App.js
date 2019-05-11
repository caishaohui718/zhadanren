import React from 'react';
import './App.css';
// import className from 'classnames'
import _ from 'lodash'

const gameMap = [
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8,-1],
  [-1, 1,-1, 0,-1, 0,-1, 0,-1, 0,-1, 0,-1],
  [-1, 1, 0, 0, 0, 1, 0, 1, 0, 8, 0, 0,-1],
  [-1, 0,-1, 0,-1, 0,-1, 1,-1, 0,-1, 0,-1],
  [-1, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0,-1],
  [-1, 1,-1, 1,-1, 0,-1, 0,-1, 0,-1, 0,-1],
  [-1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0,-1],
  [-1, 0,-1, 1,-1, 0,-1, 0,-1, 1,-1, 0,-1],
  [-1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,-1],
  [-1, 0,-1, 1,-1, 0,-1, 0,-1, 0,-1, 0,-1],
  [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
]



class App extends React.PureComponent {

  constructor () {
    super()
    this.state = {
      play: [1, 1],
      gameMap: [...gameMap]
    }
  }

  render () {
    return (
      <div className="App">
        {
          gameMap.map((line, line_i) => {
            return <ul key={line_i}>
              {
                line.map((col, col_i) => {
                  return <li key={col_i}  >
                    {
                      col === -1 ?
                      <i className="iconfont" dangerouslySetInnerHTML={{__html: '&#xe6a9;'}}/> :
                      col === 1 ?
                      <i className="iconfont" dangerouslySetInnerHTML={{__html: '&#xe64a;'}}/> :
                      col === 8 ?
                      <span role="img">😡</span> :
                      col === 9 ? 
                      <i className="iconfont" dangerouslySetInnerHTML={{__html: '&#xe61b;'}}/> : ''
                    }
                  </li>
                })
              }
            </ul>
          })
        }
      </div>
    )
  }

  checkMove = (x, y) => {
    const position = gameMap[x][y]
    const {play} = this.state
    if ( position === -1 || position === 1) {
      return false
    }
    gameMap[play[0]][play[1]] = 0
    // const newLocal = [x, y]
    gameMap[x][y] = 9
    this.setState({
      play: [x, y],
      gameMap
    })
  }

  moveLeft = () => {
    console.log('moveLeft')
    const {play} = this.state
    const position = [play[0], play[1] - 1]
    if (!this.checkMove(position[0], position[1])) {
      console.log('位置不能移动')
    }
  }

  moveTop = () => {
    console.log('moveTop')
    const {play} = this.state
    // const position = [play[0] - 1, play[1]]
    if (!this.checkMove(play[0] - 1, play[1])) {
      console.log('位置不能移动')
    }
  }

  moveRight = () => {
    console.log('moveRight')
    const {play} = this.state
    const position = [play[0], play[1] + 1]
    if (!this.checkMove(position[0], position[1])) {
      console.log('位置不能移动')
    }
  }

  moveBottom = () => {
    console.log('moveBottom')
    const {play} = this.state
    // const position = [play[0] - 1, play[1]]
    if (!this.checkMove(play[0] + 1, play[1])) {
      console.log('位置不能移动')
    }
  }

  move = (e) => {
    const {keyCode} = e
    console.log(e)
    switch (keyCode) {
      case 37: // left
        this.moveLeft()
        break
      case 38: // top
        this.moveTop()
        break
      case 39: // right
        this.moveRight()
        break
      case 40: // bottom
        this.moveBottom()
        break
      case 32: // 空格
        this.moveLeft()
        break
      default: 
        console.log('无用键盘')
    }
  }

  componentWillMount () {
    const fn = _.throttle(this.move, 150)
    window.addEventListener('keydown', fn)
  }
}

export default App;

import React, {Component} from 'react';

//마지막으로 배울 기능은 컴포넌트의 업데이트 프로세스임
//어떻게하냐면 setting state null로 한다.
//예를 들면 set state을 하면 컴포넌트는 업데이트를 한다. 이걸 콘트롤할 수 있다고 생각하면
//언제 컴포넌트를 업데이트 할지, 안할지 결정할 수 있다면, set state null이 제공하는 기능이다.
//언제 컴포넌트를 업데이트할지 결정할 수 있게 해준다. 그것은 아주 좋은것이다.
//react development process에서 내가 컴포넌트를 사실 업데이트 하고 싶지 않을때가 있다.
//지금하는건 원하지 않으면 컴포넌트를 업데이트 하지 않아도 되는 예시이다.
//리액트 16은 리턴 null을 해서 set state 이건 state을 죽이지는 않는다.
//state을 교체하는 것이다. 그냥 업데이트를 안할뿐이고 이전에 리턴 null을 하면 state을 바ㅣ꿨다.
//이제는 콘트롤 할 수 있다. state을 업데이트 하지도 컴포넌트를 업데이트 하지도 않는다.
//set state function을 밖으로 보낼 수 있는데 이걸 실행하고 싶다면

const MAX_PIZZAS = 20;

const eatPizza = (state, props) => {
  const { pizzas } = state;
  if(pizzas < MAX_PIZZAS){
    return {
      pizzas: pizzas + 1
    };
  } else {
    return null;
  }
};

class Controlled extends Component {
  state = {
    pizzas: 0
  };
  render(){
    const { pizzas } = this.state;
    return (
     <button onClick={this._handleClick}>{`I have eaten ${pizzas} ${
       pizzas === 1 ? "pizza" : "pizzas"
     }`}</button>
   );
  }
  _handleClick = () => {
    this.setState(eatPizza);
  };
}

class App extends Component {
  render() {
    return <Controlled />;
  }
}

export default App;

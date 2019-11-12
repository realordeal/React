import React, {Component, Fragment} from 'react';
import { createPortal } from 'react-dom';

//react에선 array작업을 할때 항상 key값이 들어갔어야 했다.
//react16에선 fragment라는걸 활용할 수 있다.
//return fragment라는건 span처럼 생겼다.
//fragment는 <>로도 쓸 수 있다.
//하지만 지금은 create react app이 아직 fragment를 지원하지 않아서 오류가 난다.
//웹팩을 사용하면 잘 작동한다.
//Fragment가 좋은점은 <span>이나 array를 사용 안해도 된다.
//Fragment는 <span>과 비슷하지만 좀 더 명확하고 웹사이트에 등장하지 않는다.
//또한 return string이 가능하다.
//react 16의 두번째 기능은 portals라고 한다.
//portals는 react 루트 밖을 변경할 수 있다. html, css같은
//portal를 사용하려면 react-dom을 import시켜야한다.
//import {createPortal } from 'react-dom';
//그리고 index.html에서 html을 수정을하고 여기서 새로운 컴포넌트를 만들고
//render을 하고 return에서 react-dom을 설정했던 createPortal을 사용하여
//내가 불러올 메세지와 index.html에 span태그의 아이디를 불러오면 리액트에서 리액트 밖을 터치해서
//헤더 안에 있게 된다. 이게 portal이다.
//만약 내가 다른 페이지에서 로딩을 할 때 유용할것이다.
//iframe이거나 혹은 html을 변경하지 못할때 워드프레스 작업을 하거나
//리액트 플러그인을 만들거나 렌더를 해야한다면 플러그인 안에서 여러가지 활용할 수 있다.
//리액트 루트 밖에서 렌더를 할 때 사용할 수 있다. 그래서 portal이라고 불리는 것이다.
//리액트 16의 또 다른 기능은 error boundaries이다.
//error boundaries는 컴포넌트로 하여금 컴포넌트 칠드런의 에러를 관리할 수 있게 해준다.
//만약 포털이 에러를 만들면 앱으로 관리 할 수 있다.
//만약 return types가 에러를 만들면 동일하게 관리할 수 있다.
//중요한건 이게 정상 작동할때는 칠드런의 에러에만 한정이다.
//만약 포털이 에러를 만들면 관리 할 수 없다.
//캐치할 수 있는 컴포넌트는 앱이다.
//did mount로 오류를 작성하면 리액트 앱이 다 죽는다. 이것은 꽤 보편적인 컴포넌트 충돌 에러이다.
//오직 파더만이 에러를 잡을 수 있다. 파더에서 새로운 라이프싸이클 방법을 쓰면 된다.
//이름은 component did catch라고 한다.
//저걸 사용하면 어디서 에러가 났는지 콘솔창에서 알려준다.
//만약 컴포넌트가 에러가 있다면 아직 모르는걸 리턴할것이다 혹은 에러 메이커를 리턴한다.
//그리고 실행을하면 TypeError: Cannot read property 'map' of undefined라고 화면에 나오게 되는데
//이건 유저들은 못보고 개발단에서만 볼 수 있다.
//이전에는 앱이 죽었었는데 컴포넌트에서 메시지가 나온다 sorry something went wrong이라고
//저렇게 나오고 나머지 앱은 멀쩡하다. 이게 엄청 쿨한 부분이다.
//에러를 구분하고 에러에 대응을 할 수 있다.
//새로운 방법도 있는데 이름은 component did catch이다.
//이걸 사용하면 앱이 더 프로패셔널하게 보이는 효과가 있다.
//클라이언트 혹은 유저에게도 더 프로패셔널한 개발자로 보인다. 에러가 발생하면 이를 구분하고 관리할 수 있어서
//하지만 모든 컴포넌트에서 hasError true false를 사용하면 좋지 않기때문에 많이 사용하는것은 금하는걸 추천한다.
//그래서 higher-order component를 만들것이다.
//그걸 HOC으로 만드는 것인데 이를 통해서 내가 원하는 모든 컴포넌트를 보호할 수 있다.
//const BoundaryHOC = ProtectComponent => 이것은 함수가 될것이다.
//이 함수가 리턴할 것은 클래스이다.
//이것을 사용하여 portal보호하고 return types도 마찬가지
//return protected portals 그리고 protected error maker도 리턴
//다른 컴포넌트에 있는 컴포넌트를 리턴하는 것이다. 보다시피
//protected portals, and error maker이렇게 리턴하는 것이다.
//다른 컴포넌트에 안에 있는 컴포넌트를 랩핑하고 있다. 만약 application을 보호하고 싶다면
//동일한 작업을 해주면 된다.
//export default BoundaryHOC(App); 이렇게
//마지막으로 배울 기능은 컴포넌트의 업데이트 프로세스임
//어떻게하냐면 setting state null로 한다.
//

const BoundaryHOC = ProtectedComponent =>
  class BoundaryHOC extends Component {
  state = {
    hasError: false
  };
  componentDidCatch = () => {
    this.setState({
        hasError: true
    });
  };
  render() {
    const {hasError} = this.state;
    if(hasError){
      return <ErrorFallback />;
    } else {
      return <ProtectedComponent />;
    }
  }
};


class ErrorMaker extends Component {
  state = {
    friends: ["jisu", "flynn", "daal", "kneeprayer"]
  };
  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        friends: undefined
      })
    }, 2000);
  }
  render() {
    const {friends} = this.state;
    return friends.map(friend => ` ${friend} `);
  }
}

const PErrorMaker = BoundaryHOC(ErrorMaker)

class Portals extends Component {
  render(){
    return createPortal (
      <Message />,
      document.getElementById("touchme"));
  }
}

const PPortals = BoundaryHOC(Portals);

const Message = () => "Just touched it!";

class ReturnTypes extends Component {
  render() {
    return "Hello!";
  }
}

const ErrorFallback = () => " Sorry something went wrong";

class App extends Component {
  render() {
    return (
      <Fragment>
        <ReturnTypes />
        <PPortals />
        <PErrorMaker />
      </Fragment>
    );
  }
}

export default BoundaryHOC(App);

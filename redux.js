// 편의를 위하여 각 DOM 엘리먼트에 대한 레퍼런스를 만들어줍니다.
// const란 상수인 const로 지정을 하면 그 값을 절대로 바꿀 수 없다. 또한 변수와는 달리, 처음 상수를 정의할 때 값을 지정해 주어야한다.
// const(자료형)(상수 명) = (상수 값);
const elNumber = document.getElementById('number');
const btnIncrement = document.getElementById('increment');
const btnDecrement = document.getElementById('decrement');


// 액션 타입을 정의해줍니다.
const INCREMENT = 'INCREMENT';  //INCREMENT 증가
const DECREMENT = 'DECREMENT';  //DECREMENT 감소

// 액션 객체를 만들어주는 액션 생성 함수
// diff는 두 파일 사이의 내용을 비교하는 명령어이다. 실행결과 차이점이 없다면 0, 차이점이 있다면 1, 실행시 에러가 발생하면 2이상의 종료코드 값을 얻는다.
const increment = (diff) => ({ type: INCREMENT, diff: diff });
const decrement = () => ({ type: DECREMENT });

// 초기값을 설정합니다. 상태의 형태는 개발자 마음대로 입니다.
const initialState = {
  number: 0
};

/*
   이것은 리듀서 함수입니다.
   state 와 action 을 파라미터로 받아옵니다.
   그리고 그에 따라 다음 상태를 정의 한 다음에 반환해줍니다.
*/

// 여기에 state = initialState 는, 파라미터의 기본값을 지정해줍니다.
const counter = (state = initialState, action) => {
  console.log(action);
  switch(action.type) {
    case INCREMENT:
      return {
        number: state.number + action.diff
      };
    case DECREMENT:
      return {
        number: state.number - 1
      };
    default:
      return state;
  }
}

// 스토어를 만들 땐 createStore 에 리듀서 함수를 넣어서 호출합니다.
const { createStore } = Redux;
const store = createStore(counter);


// 상태가 변경 될 때 마다 호출시킬 listener 함수입니다
const render = () => {
  elNumber.innerText = store.getState().number;
  console.log('내가 실행됨');
}

// 스토어에 구독을하고, 뭔가 변화가 있다면, render 함수를 실행합니다.
store.subscribe(render);

// 초기렌더링을 위하여 직접 실행시켜줍니다.
render();


// 버튼에 이벤트를 달아줍니다.
// 스토어에 변화를 일으키라고 할 때에는 dispatch 함수에 액션 객체를 넣어서 호출합니다.

btnIncrement.addEventListener('click', () => {
  store.dispatch(increment(25));
})


btnDecrement.addEventListener('click', () => {
  store.dispatch(decrement());
})

//버튼들을 눌러보면 숫자가 변경 될 것이다. 이 작업들을 정리해보면
//1. 액션타입을 만들어주었다.
//2. 그리고 각 액션타입들을 위한 액션 생성 함수를 만들었다. 액션 함수를 만드는 이유는 그때 그때 액션을 만들 때마다
//  직접 {이러한 객체} 형식으로 객체를 일일히 생성하는 것이 번거롭기 때문에 이를 함수화 한 것이다. 나중에는 특히, 액션에 다양한 파라미터가 필요해 질 때 유용하다.
//3. 변화를 일으켜주는 함수, 리듀서를 정의했다. 이 함수에서는 각 액션타입마다 액션이 들어오면 어떠한 변화를 일으킬지 정의한다.
//  지금의 경우에는 상태 객체에 number라는 값이 들어져있다. 변화를 일으킬 때에는 불변성을 유지시켜 주어야한다.
//4. 스토어를 만들었다. 스토어를 만들 땐 createStore을 사용하며 만든다. createStore에는 리듀서가 들어간다.
//  (스토어의 초기상태, 그리고 미들웨어도 넣을 수 있다.)
//5. 스토어에 변화가 생길 때마다 실행시킬 리스너 함수 render를 만들어주고 store.subscribe를 통하여 등록해주었다.
//6. 각 버튼의 클릭 이벤트에 store.dispatch를 사용하여 액션을 넣어주었다.

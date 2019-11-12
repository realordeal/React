import React, {Component} from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {

  //Render: componentWillMount() -> render() -> componentDidMount()

  //Update ComponentWillReceivProps() -> shouldComponentUpdate() == true -> componentWillUpdate() -> render() -> component
  //렌더를 하거나 업데이트를 할때 항상 이와 같은 순서로 작동한다.

  // componentWillMount(){ //싸이클이 시작되었음을 알 수 있다.
  //   //console.log('will mount') //1
  // }
  //
  // componentDidMount() { //이제 성공적으로 리액트 세계에 컴포넌트가 자리잡았음을 알 수 있다.
  //   //console.log('did mount')  //3
  // }

  //컴포넌트가 mount되면 5초 기다리고 greeting을 업데이트 한다.
  //직접적으로 state를 변경하면 위의 render 설정들이 작동을 안한다.
  //state를 업데이트 하려면 this.setState를 사용해야 한다.
  //이 뜻은 컴포넌트가 mount할 때마다 greeting을 헬로 -> 헬로 어겐으로 변경한다는 뜻이다.
  //state은 컴포넌트를 로드하는 방법이고 디폴트 state와 함께 컴포넌트가 did mount를 한 후에는 5초 후에 헬로, 어겐으로 변경되게 한것
  //state를 바꿀 수 있고 자동으로 render이 작동된다.
  //thim out이 뭐냐면 00시간 후에 00작업을 수행한다는 것이다.
  //fn(function), 0000초라고 작성하면 0000초 후에 페이지가 로드하고 00작업이 시작한다.
  //시간을 작성할 때는 1000, 이런 식으로 mm초로 작성해야한다.(1000 => 1초)
  //function을 작성하는건 old JavaScript다 =>으로 해도 작동된다.
  //...this.state.movies,를 삭제해버리면 기존에 있던 전체 리스트를 삭제하고 새로 추가한 리스트가 나온다.
  //즉 새로운 리스트가 기존에 있던 전체 리스트를 대체해버리는거다.
  //...this.state.movies, 이렇게 하이라이트한 코드가 명령하는 것은 이전 영화 리스트를 그대로 두고 그리고 영화를 추가라는 뜻이다.
  //이와 같이 state를 활용하면 페이지 로딩할 때 스크롤을 아래로 내릴수록 더 많은 영화가 로딩되는 효과와 같은
  //indinte scroll이라고 하는데 동일한 효과를 볼 수 있다. 20개 영화가 더 추가 로딩되는
  //끝까지 스크롤하면 20개의 영화를 추가하면 되는것이다.
  //이와 같은 방식으로 페이스북이나 인스타그램도 동일하게 로딩된다.
  //...this.state.movies를 새로 추가할 리스트 위에 하면 맨 마지막에 새로 추가된 리스트가 나오고
  //새로 추가된 리스트 밑에다가 하면 새로 추가된 리스트가 맨 위에 나오게 된다.
  //loading state는 내가 찾고있는 데이터가 있는지 체크를 하고 자바스크립트에 물어봐서  this._renderMovies()가 참이면 영화 정보를 출력하고
  // 거짓이라면 로딩 중이라는 텍스트를 띄어준다.
  // componentDidMount() {
  //   setTimeout(() =>{
  //     this.setState({
  //       movies: [
  //       {
  //         title: "Matrix",
  //         poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPtlHEPadbyjkoaq8Cai1IIcRy3P4kYeITfEV_QZxoPMyIF7ig&s"
  //       },
  //       {
  //         title: "Full Matal Jacket",
  //         poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN1x2xghjWxix5kDRyK4DYSuH5uE_kTb5uXumAfBtD3QmavTcY&s"
  //       },
  //       {
  //         title: "Oldboy",
  //         poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3fj9NbK0coiCCRfEsMbrd8K6oDOtYxitlhFmRihJf0YfkcGvjkw&s"
  //       },
  //       {
  //         title: "Star Wars",
  //         poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoBq5af1KcwELZNebyBPZR0Vbywc71omi5oe7NqsoPv3J2cDFGAw&s"
  //       },
  //       {
  //         title: "Trainspotting",
  //         poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCwDbmC_cpHeSbofd4HCM9a49ivM0JZBMF1ptXGFVvlUE7UNMg&s"
  //       }
  //     ]
  //     })
  //   }, 3000)
  // }

  //AJAX + API를 간단하게 쓸 수 있다.
  //요소검사 -> 네트워크 탭으로 이동해서 보면 localhost불러오고 리액트를 불러오고(bundle.js) 그리고 데이터베이스를 불러왔다(API).
  //컴포넌트가 mount되면 url을 가서 fetch해온다.
  //원하는 어떠한 url도 가져올 수 있다.
  //최신 모던 자바스크립트라스 에이잭스가 쉬워졌다. 그냥 자바스크립트에서 불러오면 되기 때문이다.
  //이전에는 url로 가져왔어야 했는데 에이잭스는 url을 자바스크립트로 asynchronous(비동기화) 방법으로 불러온다.
  //XML이 바꿔어서 실은 AJAJSON, 마지막 제이슨으로 바뀌어야한다.
  //XML은 너무 오래되었기 때문이다.
  //사람들이 왜 AJAX를 쓰냐하면 뭔가를 불러올때마다 페이지 새로고침을 하고 싶지 않기때문이다.
  //예를 들면 로딩을 하면 API를 불러오고 동시에 평점을 가져오기도하기 때문이다.
  //그래서 에이잭스를 쓰면 좋다 자바스크립트와 같이 데이터를 다룰 수 있기 때문이다.
  //우리 프로젝트를 예로 들면 데이터를 가져오는 상황을 볼 수 없다. URL창에서도 말이다.
  //새로고침 없이 작업이 가능하고 리액트와 작업이 간편하기 때문에 AJAX를 추천한다.
  //영화API가 끝나야 애니메이션API가 불러와진다.
  //하지만 영화API서버가 느리다면 애니메이션API는 영화API가 실행이 되야 되므로 계속 기다려야한다.
  //이것은 자바스크립트+API할때 안좋은것이다.
  //이럴때 Promise를 사용한다.
  //Promise는 asynchronous이다.
  //이것은 첫번째 라인이 다 끝나든 말든 두번째 라인이 실행이 된다.
  //이것이 좋은 이유는 계속 다른 작업을 스케쥴해놓을 수 있기 때문이다.
  //그리고 모든 작업들은 다른 작업 수행이랑 관계없이 진행된다.
  //또 다른 기능은 시나리오를 잡는 방법을 만들어준다.
  //예를 들어 여친과 약속을 했다 토욜에 영화보기로 여친은 월요일에 영화보러가겠다고 기다리지 않는다.
  //그녀는 2가지 케이스가 가능하다는 것을 안다. 첫번째 내가 약속을 지켜서 영화보러가는 것
  //다른 케이스는 내가 돈이 없어서 그녀의 영화티켓을 사지 못해서 약속이 깨지는것
  //이게 Promise 원리와 비슷하다.
  //2가지 시나리오가 있고 이를 관리하는것이다.
  //fetch와 promise가 좋은 이유는 시나리오가 생기고 이를 관리 할 수 있기 때문이다.
  //component did mount, fetch 다음엔 then이라는 것을 하면 된다.
  //그다음엔 catch를 해서 위에 오류가 나면 catch로 넘어가 오류를 알려준다.
  //then 괄호 안에 작업을 적어주면 된다.
  //then function은 attribute만 준다. 그리고 그것은 Object이다.
  //fetch의 결과물을 response라고 하고 실행을 해서 요소 검사 -> 콘솔에 보면
  //ok : true, redirected: false, status: 200 좋다라는 뜻., text 없고 type: cors, url을 보여주고 다 좋다라는 뜻이다.
  //그리고 body를 보면 ReadableStream이라고 나오는데 이뜻은 바이트(0101010...)로 이루어졌다는 뜻이다. 이걸 제이슨으로 바꿔야한다.
  //response Object를 이걸 내가 확인할 수 있는 제이슨으로 바꿔야한다.
  //fetch, then, json을 하고 콘솔로그를 통해 확인을 해보면 된다.
  //promise는 내가 성공적으로 수행할 수 있고 그렇지 않을 경우 결과물을 catch,then으로 받아볼 수 있다.
  //그리고 then은 내가 원하는 만큼 바꿀 수 있다.
  //그리고 무한정으로 에러를 catch로 잡을 수 있다.
  //fetch가 좋은 점은 url을 에이잭스로 불러 올 수 있는 것이다 아주 쉽게
  //이전에는 xml http requesr라고 아주 못생기고 어려웠다.
  //Await,Async는 작성한 라인들을 좀 더 분명하게 작성해주는 도구이다.
  //영화들을 state에 올릴려면
    // .then(json => {
    //   this.setState({
    //     movies: json.data.movies
    //   })
    //   .then(() => .then())
    //
    // })
    //이렇게 세련되지 않는다. 그리고 애플리케이션이 크면 then안에 then으로 이어지면서
    //call back hell로 빠진다. 이것은 then,then,then,...많아져서 길을 잃어버리는 것이다.
    //그래서 sync, await이라는 것을 쓴다.
    //did mount에 왜 this._getMovies(); 이렇게 쓰냐 하면 일단 큰 component did mount를 갖고 싶지 않다.
    //왜냐하면 사이즈가 크면 좋은 코딩 방법이 아니다. 왜냐면 많은 function을 불러올건데
    //다 한군데에 몰아있는 것보다는 작은 function들이 각기 다른 장소에 있는것이 좋다.
    //async를 써주는 이유는 이전 라인의 작업이 끝날때까지 기다리는 것이 아닐때 asynchronous는 이전 작업이 끝나야
    //그 다음 작업이 시작하는 형태가 아니라서 순서와 상관없이 작업이 진행된다.
    //function getMocies는 asynchronous function이라고 할 수 있다.
    //

  //= () => 이건 최신 자바스크립트이다.
  //rendermovies라는 기능을 실핼할 때 위와 같은 variables들을 출력한다.
  //해당 variablesdpsms 맵핑을 통해서 제목이랑 포스터가 보이게끔 되어있다.
  // this.state.movies.map((movie, index) => {
  //  return <Movie title={movie.title} poster={movie.poster} key={index} /> 이 맵핑 기능은 영화 리스트를 가져와서 출력하는것이다.
  // const movies = [<Movie props />, <Movie props />]
  // movies를 출력할 때 정렬된 항목(array)를 보여준다.
  //리액트에서 loading state는 체크를 먼저하고 답에따라 출력이 된다. 참이냐 거짓에따라서
  //did mount하고 나면 get movies를 할것이다. 그리고 이건 asynchronous function인데 movies라는 variable을 갖고 있다.
  //그리고 이건 value를 갖고 있다. 무엇이냐면 call api라는 function await라는 모드에서
  //위의 하이라트한 부분이 call api에 해당한다.
  //await는
  // this.setState({
  //   movies
  // })
  //call api기능이 끝나는 기능을 기다리는 것이다 성공적으로 작업이 끝나느게 아니라 그냥 끝나기를 기다리는 것이 아니라
  //call api의 return calue 그것이 무없이든 그 value안에 movie를 집어 넣을 것이다.
  //call api의 return value를 movies에 set할 것이다.
  //그리고 component의 set state를 movies로 할 것이다. 그건 call api의 return value이다.
  //하이라이트한 set state은 call api 작업이 완료되기 전 까지는 실행되지 않을 것이다.
  //작업이 완료되기 전까지 성공적 수행이 아니라 성공적 혹은 실패로 끝날 수 있지만 작업이 완료되어야한다.
  //그리고 call api 작업 후에 코딩이 실행될 것이다.
  //이를 하는 방법은 fetch라는 이름의 promise를 return할 것이다.
  //json을 return하는 대신에 콘솔로그 하는 대신에 data.movies를 return할 것이다.
  //화살표 표시 => return을 작성할 필요가 없다 자동이라서
  //이걸 arrow function이라고 한다. 모던 자바스크립트임
  //이 화살표 기능 자체에 return이라는 뜻이 내제되어있다.
  //실행해보면 title은 나오는데 poster가 안나올 수 있다. 그건 우리가 이미지를 poster라고 했지만
  //api의 이미지는 large_cover_image로 되어있기 때문에 poster가 아닌 large_cover_image로 불러와야한다.
  //왜 key를 id로 쓰느냐면 component의 key는 index를 사용하는 것은 좋지 않다 느려서
  //async를 사용하지 않으면 await는 작동하지 않는다.
  //console.log(movie)를 통해 DB에 뭐가 필요한지 확인해보면
  //포스터 제목 장르 평점 설명 들이 있는것을 확인할 수 있다.
  //title, medium, genres, 평점은 못 쓸듯, description_full, summary, synopsis
  //이렇게 다 있는것을 확인 할 수 있다.
  //title : title-english, poster : medium-cover-image, key: movie id, genres: movie.genres
state = {}

componentDidMount() {
  this._getMovies();
}


  _renderMovies = () => {
    const movies = this.state.movies.map(movie => {
      return <Movie
      title={movie.title_english}
      poster={movie.medium_cover_image}
      key={movie.id}
      genres={movie.genres}
      synopsis={movie.synopsis}
      />
    })
    return movies
  }

  _getMovies = async () => {
    const movies = await this._callApi()
    this.setState({
      movies
    })
  }

  _callApi = () => {
   return fetch("https://yts.lt/api/v2/list_movies.json?sort_by=rating")
    .then(potato => potato.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }

  render() {  //컴포넌트가 리액트 세계에 존재하게 되었음을 알게된다.
    //console.log('did render') //2

    return (
      <div className="App">
        {this.state.movies ? this._renderMovies() : 'Loading'}
      </div>
    );
  }
}

export default App;

// import React, {Component} from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import './Movie.css';

// class Movie extends Component {
// //PropTypes.string.isRequired라고 작성을하면 movie컴포넌트는 title이라는 prop을 제공하는 것이 필수로 설정이 된다.
//   static propTypes = {
//     title: PropTypes.string.isRequired,
//     poster: PropTypes.string.isRequired
//   }
//
//   render(){
//     return(
//       <div>
//         <MoviePoster poster={this.props.poster}/>
//         <h1>{this.props.title}</h1>
//       </div>
//     )
//   }
// }

//stateless functional로 바꾼것
//functional 컴포넌트에서 this props를 삭제해줘야한다. 클래스가 아니라서
//클래스들은 그 안에 this라는 키워드가 있다.
//하지만 이건 functional컴포넌트라서 this가 필요없다 이미 props를 쓰므로
//dumb 컴포넌트를 쓰게 되면 state를 잃게되고 업데이트 하고 그런것들이 사라진다.

// class MoviePoster extends Component {
// //이미지를 꼭 보여줘야 하므로 포스터를 필수설정을 해준다.
//   static propTypes = {
//     poster: PropTypes.string.isRequired
//   }
//
//   render() {
//     return(
//       <img src={this.props.poster} alt="Movie Poster"/>
//     )
//   }
// }

//stateless functional로 바꾸는 방법
//위 하이라이트 컴포넌트랑 같은것이다.
//이 function 컴포넌트는 클래스가 아니기 때문에 props 지우고 poster만 남긴다.
//어떤 컴포넌트는 return을 하기위해 존재한다.
//이컴포넌틑는 component will mount, function, update state..필요없이
//그냥 한개의 props만 있으면 된다. poster와 같은 1개의 props만 있고 1개의 html태그만 필요한다.
//기억해야될 규칙은 이들은 state가 없고 function render 없고 라이프사이클도 없다.
//갖고있는건 return밖에 없다.


//class name은 정상적인 css에서 class를 뜻한다.
//JSX에서는 class name이라고 써야한다.
//하지만 만약 그냥 class라고 쓰면 리액트가 알려줄 것이다.
//요소검사에서 console에서 Did you mean className?이라고 알려준다.
//poster에 alt를 추가해줘서 마우스커서를 이미지에 대면 이미지의 title을 보여준다.
//그리고 MovieGere에 sapn을 그냥 쓸 수 있는데 function을 사용하여 만든 이유는 이게 더 세련된 코딩 방식이기 때문이다.
//모든걸 component로 쪼개고 작게 만드는 것이 더 세련된다.
//

function Movie({title, poster, genres, synopsis}) {
  return(
    <div className="Movie">
      <div className="Movie_Colums">
        <MoviePoster poster={poster} alt={title}/>
      </div>
      <div className="Movie_Colums">
        <h1>{title}</h1>
        <div className="Movie_Genres">
          {genres.map((genre, index) => <MovieGenre genre={genre} key={index} />)}
        </div>
        <p className="Movie_Synopsis">
          {synopsis}
        </p>
      </div>
    </div>
  )
}

function MoviePoster({poster, alt}){
  return (
    <img src={poster} alt={alt} title={alt} className="Movie_Poster"/>
  )
}

function MovieGenre({genre}){
  return (
    <span className="Movie_Genre">{genre} </span>
  )
}

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired,
  synopsis: PropTypes.string.isRequired
}

MoviePoster.propTypes = {
  poster: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
}

MovieGenre.propTypse = {
  genre: PropTypes.string.isRequired
}

export default Movie

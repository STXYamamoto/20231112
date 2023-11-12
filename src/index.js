import React from 'react';
import ReactDom from 'react-dom';
import App from "./App"

// ■JSX記法のルールを知る
const AppJsx = () => {
//  return <h1>こんにちは</h1>;
  //※複数のタグを返す場合は()で囲む
  //※エラーになるので<div></div>で囲む必要がある
  // return (
  //   <div>
  //      <h1>こんにちは</h1>
  //      <p>お元気ですか？</p>
  //   </div>
  //  );  

  //※<div></div>は無駄なタグになってしまうため<React.Fragment>で代用できる
  //★React.と入力してもh1やFragmentが候補に出てこない(動画は出ていた)
  // return (
  //   <React.Fragment>
  //      <h1>こんにちは</h1>
  //      <p>お元気ですか？</p>
  //   </React.Fragment>
  //  );   
    
  //※<React.Fragment></React.Fragment>も<></>で代用できる
  return (
    <>
      <h1>こんにちは</h1>
      <p>お元気ですか？</p>
    </>
  );
};

// ReactDom.render(<AppJsx />, document.getElementById("root"));
// 「App.jsx」のコンポーネント「App」を表示する
ReactDom.render(<App />, document.getElementById("root"));
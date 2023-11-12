/* eslint react-hooks/exhaustive-deps: off */
import React, {useState, useEffect} from 'react';
// import ColorfulMessage from './components/ColorfulMessage';
import {ColorfulMessage} from './components/ColorfulMessage';

// ■コンポーネントの使い方を知る
// 拡張子はリアクト専用の「.jsx」がある。（.jsでも可だがReactのコンポーネントだと分かりやすいので推奨）
// コンポーネント名の先頭は必ず大文字にする。
// [正しい例]
//  App
//  SomeComponent
// [エラーとなる例]
//  app
//  someComponent
// [エラーにはならないが推奨されない例]
//  Some_component
//  Some_Component
// 先頭が大文字で始まり、単語の区切りを大文字とする変数名の付け方を「パスカルケース」と呼びます。
// Reactのコンポーネントはこのパスカルケースで命名しましょう！

const AppStyle = () => {
  const onClickButton = () => alert(); 
  // JavaScriptのCSSは文字列なので'XXX'のように'で囲む。
  // フォントサイズはCSSでは「font-Size」だがReactではキャメルケースで「fontSize」とする必要あり
  const contentStyle = {
    color: 'blue',
    fontSize: '18px'
  };
  return (
    // イベントの割り当て方
    // 　ボタンなどにイベントを割り当てる場合はキャメルケースでonClickを記述し
    // 　={}の中にJavaScriptの関数(onClickButton)を記述する。
    // スタイルの割り当て方
    //  ①h1 style={}の中にオブジェクトを記述する。
    // 　　※外側の波括弧はJavaScriptを記述するため。内側はJavaScriptのオブジェクトを記述するため。
    //  ②p style={contentStyle}でcontentStyleを↑で定義することもできる。
    <>
      <h1 style={{ color: 'red'}}>こんにちは</h1>
      <p style={contentStyle}>お元気ですか？</p>
      <button onClick={onClickButton}>ボタン</button>
    </>
  );
}

// ■Propsを知る
//  ・コンポーネント：画面要素の１単位。大(１画面)から小(１つのテキストボックス)まで様々
//  ・Props：コンポーネントに渡される引数的なもの
const AppPrpps = () => {
  const onClickButton = () => alert(); 
  const contentStyle = {
    color: 'red',
    fontSize: '10px'
  };
  // styleをケースによって切り替える場合、増えると大変。⇒ ・Propsで名前と色を引き渡せるようにする。
  // conponentsディレクトリを作成
  const contentLadyStyle = {
    color: 'pink',
    fontSize: '18px'
  };
  return (
    <>
      <h1 style={{ color: 'red'}}>こんにちは</h1>
      <p style={contentStyle}>お元気ですか？</p>
      <p style={contentLadyStyle}>元気です！</p>
      <ColorfulMessage color="blue" message="お元気ですか？？" />
      <ColorfulMessage color="pink" message="元気です！!" />
      <ColorfulMessage color="blue">お元気ですか？？？</ColorfulMessage>
      <ColorfulMessage color="pink">元気です！!！</ColorfulMessage>
      <button onClick={onClickButton}>ボタン</button>
    </>
  );
}

// ■Stateを知る (import React, {useState} from 'react';の記述に変更する。)
//              ※↑reactからuseStateを分割代入している。
//  ・State：各コンポーネントが持つ状態。stateが変更されると再レンダリングされる。
const AppState = () => {
  const onClickCountUp = () => {
    setNum(num + 1);
  }; 
  //num:Stateとして使用する変数名 setNum:Stateを変更するための関数名、初期値０
  const [num, setNum] = useState(0);
  return (
    <>
      <h1 style={{ color: 'red'}}>こんにちは</h1>
      <ColorfulMessage color="blue">お元気ですか？？？</ColorfulMessage>
      <ColorfulMessage color="pink">元気です！!！</ColorfulMessage>
      <button onClick={onClickCountUp}>カウントアップ</button>
      <p>{num}</p>
    </>
  );
}

// ■再レンダリングと副作用を知る
// クリックで再読込が発生せず画面が変わる
//　⇒Stateが変わると再レンダリングされ、Appが上から読み込まれる。(”さいしょ”が毎回表示される)
//　再レンダリングする条件：state,propsが変わった場合。
//  親が再レンダリングされた場合は子も再レンダリングされる。(App⇒ColorfulMessageも)
const App = () => {
  console.log("さいしょ");
  const [num, setNum] = useState(0);
  //顔文字のStateを切り替えるのでbooleanで定義する  
  //上の方にまとめた方が見やすい  
  const [faceShowFlag, setFaceShowFlag] = useState(false);

  const onClickCountUp = () => {
    setNum(num + 1);
  }; 
  const onClickSwitchShowFlag = () => {
    setFaceShowFlag(!faceShowFlag);
  }; 

  //３の倍数の場合だけ顔文字を表示する。
  // ■副作用 ↓の場合にエラーが発生する。（再レンダリングが多く発生する）
  // Too many re-renders. React limits the number of renders to prevent an infinite loop.
  // 再レンダリングでStateが変わるのでまた再レンダリングが発生してしまう。
  // if (num % 3 === 0) {
  //   setFaceShowFlag(true);
  // } else{
  //   setFaceShowFlag(false);
  // }

  // faceShowFlagが変わる場合だけ切り替える必要がある。
  // if (num > 0) {
  //   if (num % 3 === 0) {
  //     faceShowFlag　|| setFaceShowFlag(true);
  //   } else{
  //     faceShowFlag　&& setFaceShowFlag(false);
  //   }
  // }
  
  // 副作用２：on/offボタンが効かなくなる。(切り替え後に３の倍数切り替えを通るため)
  // useEffectを利用しnumが変わった場合だけにする。
  // 第２引数に空の配列[]を設定すると最初の１回だけ通るようになる。
  // useEffect(() => {
  //   console.log("useEffect!!")
  // }, []);
  // 第２引数に配列[num]を設定するとnumが変化した場合だけ通るようになる。
  useEffect(() => {
    if (num > 0) {
      if (num % 3 === 0) {
        faceShowFlag　|| setFaceShowFlag(true);
      } else{
        faceShowFlag　&& setFaceShowFlag(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [num]);
  // ↑[num]だけだとエラーになる。(useEffectの中の変数faceShowFlagを引数にしていないため)
  // React Hook useEffect has a missing dependency: 'faceShowFlag'. Either include it or remove the dependency array. (react-hooks/exhaustive-deps)eslint
  // 一番上に/* eslint react-hooks/exhaustive-deps: off */を記述するとチェックしなくなる。
  // または一行上にeslint-disable-next-line react-hooks/exhaustive-depsを記述する。

  return (
    <>
      <h1 style={{ color: 'red'}}>こんにちは</h1>
      <ColorfulMessage color="blue">お元気ですか？？？</ColorfulMessage>
      <ColorfulMessage color="pink">元気です！!！</ColorfulMessage>
      <button onClick={onClickCountUp}>カウントアップ</button>
      <br />
      <button onClick={onClickSwitchShowFlag}>on/off</button>
      <p>{num}</p>
      {faceShowFlag && <p>(^^♪</p>}
    </>
  );
}
//&& は「演算子の本当の意味を知ろう」 参照（&&は左がTrueの場合は右を返す）

// ※Appはこのファイル内でしか使用できないので他のファイルからも使用できるようにする *//
export default App;
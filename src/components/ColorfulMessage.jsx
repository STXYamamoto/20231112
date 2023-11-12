import React from 'react';

export const ColorfulMessage = (props) => {
  console.log(props);
  console.log("からふる");
  // 分割代入でもスッキリ書ける。
  const {color, children} = props;
  const contentStyle = {
    // prppsのcolor
//    color: props.color,
    // 分割代入したcolor
    //color : color, 
    color,  //名前が同じ場合は省略できる。
    fontSize: '18px'
  };
  return (
    // JavaScriptなので{}で囲む
    // タグで囲った場合はchildrenという変数で表示もできる。
    <>
      <p style={contentStyle}>{props.message}</p>
      <p style={contentStyle}>{props.children}</p>
      <p style={contentStyle}>{children}</p>
    </>
  );
}

// export default ColorfulMessage;
// ↑でなく、定義でexport const ColorfulMessage = (props) => { でも可
// その場合、import も import {ColorfulMessage} from './components/ColorfulMessage';
// と分割代入の形にする必要がある。（どちらでもよい）
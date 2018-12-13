## 2-12:Handling Multiple Return Values

### 概要
#### 複数の返り値の処理

```
function multipleReturns() internal returns(uint a, uint b, uint c) {
  return (1, 2, 3);
}

function processMultipleReturns() external {
  uint a;
  uint b;
  uint c;
  // これが複数に割り当てる方法だ：
  (a, b, c) = multipleReturns();
}

// そのうちの一つの値だけ欲しければ、こうすれば良い：
function getLastReturnValue() external {
  uint c;
  // 他のフィールドは空欄でも構わないぞ：
  (,,c) = multipleReturns();
}
```


### コード
- 問題
1. feedOnKittyという名前の関数を作成せよ。そこに \_zombieId と_kittyIdというどちらも uintのパラメーターを設定せよ。また関数は publicを使用せよ。

2. その関数の中で、まず最初にkittyDnaというuint の関数を宣言せよ。

>注: KittyInterfaceとgenes は、uint256です。ただし、レッスン1で解説した通り uintはuint256のエイリアスのため、両者は同じことを意味しています。

3. 次に \_kittyIdで、kittyContract.getKitty関数を呼び出し、kittyDnaに genes を格納せよ。一つ注意点がある - getKittyを使うと、大量の変数が返ることになる(正確には10個だ — ここまで教えてやっているのだから、失敗するなよ)。欲しいのは最後のgenesだけだ。カンマの数に気をつけるのだぞ！

4. 最後に、feedAndMultiplyを呼び出し、\_zombieId と kittyDnaの両方を渡すのだ。


- 答え
```
function feedOnKitty(uint _zombieId, uint _kittyId) public {
  uint kittyDna;
  (,,,,,,,,,kittyDna) = kittyContract.getKitty(_kittyId);
  feedAndMultiply(_zombieId, kittyDna);
}
```

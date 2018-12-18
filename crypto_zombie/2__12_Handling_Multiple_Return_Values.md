## 2-12:Handling Multiple Return Values

### 概要
#### 複数の返り値の処理
- soldityでは複数の返り値を出すことが可能

```
function multipleReturns() internal returns(uint a, uint b, uint c) {
  return (1, 2, 3);
}ß

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
---

### コード
#### 問題

1. feedOnKittyという名前の関数を作成せよ。そこに \_zombieId と_kittyIdというどちらも uintのパラメーターを設定せよ。また関数は publicを使用せよ。

2. その関数の中で、まず最初にkittyDnaというuint の関数を宣言せよ。

>注: KittyInterfaceとgenes は、uint256です。ただし、レッスン1で解説した通り uintはuint256のエイリアスのため、両者は同じことを意味しています。

3. 次に \_kittyIdで、kittyContract.getKitty関数を呼び出し、kittyDnaに genes を格納せよ。一つ注意点がある - getKittyを使うと、大量の変数が返ることになる(正確には10個)
<details><summary>`kittyContract.getKitty`</summary><div><pre>
```
contract KittyInterface {
  function getKitty(uint256 _id) external view returns (
    bool isGestating,
    bool isReady,
    uint256 cooldownIndex,
    uint256 nextActionAt,
    uint256 siringWithId,
    uint256 birthTime,
    uint256 matronId,
    uint256 sireId,
    uint256 generation,
    uint256 genes
  );
}
```
</pre></div></details>

4. 最後に、feedAndMultiplyを呼び出し、\_zombieId と kittyDnaの両方を渡すのだ。

  ```
// ここに関数を定義せよ
```

- 答え
```
// ここに関数を定義せよ
function feedOnKitty(uint _zombieId, uint _kittyId) public {
  uint kittyDna;
  (,,,,,,,,,kittyDna) = kittyContract.getKitty(_kittyId);
  feedAndMultiply(_zombieId, kittyDna);
}
```

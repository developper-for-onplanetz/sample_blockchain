## 3-3:onlyOwner 関数の修飾子


### 概要
####  関数修飾子
- 関数のように直接呼び出すことはできず、代わりに関数定義の最後に修飾子の名前をつけることで、関数の動きを変更する
>```modifier onlyOwner() {
  require(msg.sender == owner);
  _;
}```

>```
contract MyContract is Ownable {
  event LaughManiacally(string laughter);
  //\`onlyOwner`の使い方を確認せよ：
  function likeABoss() external onlyOwner {
    LaughManiacally("Muahahahaha");
  }
}
```

- likeABossを呼び出すと onlyOwnerの中のコードが最初に実行されるのがわかるだろう。それからonlyOwnerの_;ステートメントにたどり着いた時に、likeABossに戻ってコードを実行する

- いちばん一般的なのは関数の実行前にrequireでサクッとチェックする使い方
- **DAppがイーサリアム上にあるというだけで、全てが分散型になっているというわけではない**


### コード

#### 問題
1. onlyOwner修飾子をsetKittyContractAddressへ追加せよ。

```
// 関数を編集せよ：
  function setKittyContractAddress(address _address) external {
    kittyContract = KittyInterface(_address);
  }
```

- 答え

```
// 関数を編集せよ：
  function setKittyContractAddress(address _address) external onlyOwner {
    kittyContract = KittyInterface(_address);
  }
```

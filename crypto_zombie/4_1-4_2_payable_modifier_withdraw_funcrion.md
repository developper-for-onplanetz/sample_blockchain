## 4_1-4_2:payable修飾詞、Withdraws関数

### 概要
#### 4-1
##### 関数修飾詞
-  **可視性修飾子**
  >いつどこで関数を呼び出すかコントロールする

  1. **private修飾子**  
      同じコントラクト内の別の関数からのみ呼び出し可能
  1. **internal修飾子**  
      private修飾子に似ているがそのコントラクトを継承したコントラクトからも呼び出し可能
  1. **external修飾子**  
      コントラクト外からのみ呼び出し可能
  1. **public修飾子**　　
      コントラクト内部・外部どちらからでも呼び出せる

- **状態修飾子**
    >関数がブロックチェーンとどのように作用し合うのか示してくれる

  1. **view修飾子**  
    読み込み専用でデータの保存、読み込みがない
  1. **pure修飾子**  
  データを保存しないだけでなく、データの読み込みも無い


- **modifier**  
  自分たちでカスタムして定義することができる

##### payable修飾子
  - payable修飾子がついている関数にのみEtherを送金することができる
  - 関数にpayable修飾詞がなく、Etherを送ろうとするとトランザクションは拒否を起こす

#### 4-2
#### withdraw関数
- payable修飾詞を使って送られたEtherはコントラクトのイーサリアム・アカウントに貯められるため、コントラクトからEtherを引き出す関数を追加しない限りそこに閉じ込められたままになってしまう

- Etherをコントラクトから引き出す関数
  ```
  contract GetPaid is Ownable {
  function withdraw() external onlyOwner {
    owner.transfer(this.balance);
    }
}
```
  >transfer関数を使用してEtherをあるアドレス(owner)に一定金額(this.balance)送金することができる。

### コード
### 4-1
#### 問題
例えばこのゲームで、ユーザーがETHを支払って自分のゾンビをレベルアップできる機能があるとする

1. levelUpFeeという名前のuintを定義し、それが0.001 etherと同様になるよう設定せよ。

1. levelUpという名前の関数を作成せよ。これに一つのパラメーター_zombieId（uint）を渡せ。またexternalかつpayableとせよ。

1. 最初にmsg.valueがlevelUpFeeと同等であることを、この関数が要求（require）するようにせよ。

1. そしたらゾンビのlevelを増やすのだ。

```
  // 1. ここにlevelUpFeeを定義するのだ

   // 2. levelUp関数をここに入力せよ
```
- 答え

```
// 1. ここにlevelUpFeeを定義するのだ
  uint levelUpFee = 0.001 ether;

 // 2. levelUp関数をここに入力せよ
  function levelUp(uint _zombieId) external payable {
    require(msg.value == levelUpFee);
    zombies[_zombieId].level++;
  }
```

### 4-2
#### 問題
```
  // 1. ここにwithdraw関数を作成するのだ

  // 2. ここにsetLevelUpFee関数を作成せよ
```
#### 解答
```
// 1. ここにwithdraw関数を作成するのだ
function withdraw() external onlyOwner {
    owner.transfer(this.balance);
  }
// 2. ここにsetLevelUpFee関数を作成せよ
  function setLevelUpFee(uint _fee) external onlyOwner {
    levelUpFee = _fee;
  }
```

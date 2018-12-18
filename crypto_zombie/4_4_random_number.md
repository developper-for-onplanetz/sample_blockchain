## 4-4:random number

### 概要
#### solidityでの乱数生成

- 完璧な乱数の生成は不可能
##### keccak256経由での乱数生成
    >Solidityにおけるベストなランダム性のソースはkeccak256ハッシュ関数

    ```
    // 1から100までの乱数を生成せよ:
uint randNonce = 0;
uint random = uint(keccak256(now, msg.sender, randNonce)) % 100;
randNonce++;
uint random2 = uint(keccak256(now, msg.sender, randNonce)) % 100;
```
  以上のコードはnowのタイムスタンプとmsg.sender、nonce値(増加するので同じ値が二度使われることはない)からなる  
  keaackでこれらの入力値をハッシュ値に変換、uint型に変換そして100で割ることで0から99の間のランダムな数値を生成できる


### コード

#### 問題
1. コントラクトに、randNonceというuintを与え、0に同等となるよう設定せよ。

1. randMod (random-modulus)という関数を作成せよ。これは_modulusという名のuintを受け取るinternal関数であり、uintを返す（returns）。

1. この関数はまずrandNonceを増やさなくてはならない。(randNonce++という構文を使うのだ)。

1. 最後に、now、msg.senderそしてrandNonceのkeccak256ハッシュ値の型変換をuintに計算し、その値を% _modulusしてreturnせよ。これはコード１行で行うこと。

```
contract ZombieBattle is ZombieHelper {
  // ここから始めるのだ
}
```

#### 答え

```
contract ZombieBattle is ZombieHelper {
  // ここから始めるのだ
  uint randNonce = 0;
  function randMod(uint _modulus) internal returns(uint) {
    randNonce++;
    return uint(keccak256(now, msg.sender, randNonce)) % _modulus;
  }
}
```

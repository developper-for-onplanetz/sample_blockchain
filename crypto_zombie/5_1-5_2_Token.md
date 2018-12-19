## 5_1-5_2: Tokenとトークンの継承

### 概要
#### 5-1:トークンとは
- - <details><summary>誰がトークンをどれくらい所有しているのかを記録するコントラクト</summary><div><pre>
```mapping(address => uint256) balances
```
</pre></div></details>
  - <details><summary>ユーザーが自分のトークンを他もアドレスに他のアドレスに送ることができる</summary><div><pre>
  ```transfer(address _to, uint256 _value)```
  </pre><pre>
  ```balanceOf(address _owner)
  ```
  </pre></div></details>

以上の機能のこと

- ERC20トークン  
  >全てのERC20トークンは同じ名前の同じ関数セットを共用している  
    →アプリが違っても、どちらもERC20トークンであればやりとり可能

- ERC721トークン(non fungible token)  
  >ERC20トークンは通貨の様な働きをする。従ってゾンビのように細かく分けられないものにはあっていない

  >ERC721トークンは一つの単位ごとの取引のみ可能で、それぞれが特有のIDを持っている     

#### 5-2:トークンコントラクトの実装
- トークンコントラクトの実装手順
  1. インターフェースをSolidityファイルにコピー/インポートする
  1. コントラクトに継承する
  >- 複数コントラクトの継承方法  
  ```
  contract SatoshiNakamoto is NickSzabo, HalFinney {
}
```

---

### コード
#### 5-1
#### 問題
1. pragmaのバージョンをファイルの冒頭で宣言せよ。
1. このファイルにzombieattack.solをimportすること。
1. ZombieOwnershipという新たなコントラクトを宣言し、ZombieAttackを継承させよ。まだコントラクトの中身は空のままでよい。


```
// ここから始めるのだ
```

#### 答え

```
// ここから始めるのだ
pragma solidity ^0.4.19;
import "./zombieattack.sol";
contract ZombieOwnership is ZombieAttack {
}
```

#### 5-2
#### 問題
1. erc721.sol を zombieownership.solにインポートせよ。

1. ZombieOwnershipがZombieAttackとERC721を継承することを宣言せよ。

```
// ここでファイルをインポートするのだ

// ここでERC721の継承を宣言するのだ
contract ZombieOwnership is ZombieAttack {

}
```

#### 答え
```
// ここでファイルをインポートするのだ
import "./erc721.sol";
// ここでERC721の継承を宣言するのだ
contract ZombieOwnership is ZombieAttack, ERC721 {

}
```

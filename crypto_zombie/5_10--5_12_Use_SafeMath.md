## 5_10-5_12: Hot use SafeMath

### 概要
#### 5-10: SafeMath libraryを使おう
><details><summary>`参考: SafeMath library`</summary><div><pre>
```
library SafeMath {
  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
    if (a == 0) {
      return 0;
    }
    uint256 c = a * b;
    assert(c / a == b);
    return c;
  }
  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    // assert(b > 0); // Solidity automatically throws when dividing by 0
    uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold
    return c;
  }
  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
    return a - b;
  }
  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }
}
```
</pre></div></details>


- mul、add関数は２つの引数を必要とするが、`using SafeMath for uint`を宣言する際、関数上で呼び出す`uint`は**自動的に１つ目の引数として渡される**　　

##### assertステートメントとは
- requireと似たようなもの  
  - [ ] **require** :関数呼び出しが失敗するとユーザーにガスの残りを**返却する**
  >**関数のはじめ** に記述し、外部からの入力および呼び出した外部コントラクトから返ってきた値の検証等で利用

  - [ ] **assert** :関数呼び出しが失敗してもガスの残りを**返却しない**
  >コントラクトの内部状態を検証するために**処理の後** に記述し、予期せぬ事態への対処を行う

#### 5-11
##### SafeMathのuint16,uint32への応用
- 前チャプターで定義したSafeMathはuint256が基準なためuint16,uint32で
作成した変数をそのまま代入してもオーバーフローは防げない
- 従って別にuint16,uint32用のSafeMathライブラリを作成しなければいけない
  >uint256の部分をuint16,uint32に置き換えれば良い

#### 5-12
- SafeMath使用方法の反復練習(新しいこと無し)
---
### コード
### 5-10
#### 問題
1. ++をSafeMathメソッドで置きかえよ。

1. --をSafeMathメソッドで置きかえよ。

```
// 1. SafeMathの`add`で置きかえるのだ
   ownerZombieCount[_to]++;
// 2. SafeMathの`sub`で置き換えるのだ
  ownerZombieCount[_from]--;
```

#### 解答
```
// 1. SafeMathの`add`で置きかえるのだ
  ownerZombieCount[_to] = ownerZombieCount[_to].add(1);
// 2. SafeMathの`sub`で置き換えるのだ
  ownerZombieCount[_from] = ownerZombieCount[_from].sub(1);
```

### 5-11
#### 問題
1. uint32にSafeMath32を使用することを宣言せよ。

1. uint16にSafeMath16を使用することを宣言せよ。

1. ZombieFactoryには、SafeMathメソッドを使うべき箇所がもう1行ある。更新せよ

```
using SafeMath for uint256;
  // 1. uint32にSafeMath32を使用することを宣言せよ
  // 2. uint16にSafeMath16を使用することを宣言せよ

,,(省略),,

  // 3. ここでSafeMathの`add`を使うのだ:
  ownerZombieCount[msg.sender]++;

,,(省略),,
```
#### 解答
```
  using SafeMath for uint256;
  // 1. uint32にSafeMath32を使用することを宣言せよ
  using SafeMath32 for uint32;
  // 2. uint16にSafeMath16を使用することを宣言せよ
  using SafeMath16 for uint16;

,,(省略),,

    // 3. ここでSafeMathの`add`を使うのだ:
    ownerZombieCount[msg.sender] = ownerZombieCount[msg.sender].add(1);

,,(省略),,
```

#### 5-12
##### 問題
1. ZombieAttack中の全加算++において、SafeMathメソッドを実装するのだ。見つけやすいように、コード中にコメントを残しておいたぞ。
>5-12と全く同じ(++,--をSafeMathに書き換え)なので書き込み省略

## 5-9: Preventing Overflows

### 概要
#### オーバーフロー、アンダーフローとは
- **オーバーフロー** :uintの格納上限を超えてしまうこと
  - 例:uint8で格納できる最大数値は
    - バイナリ(2進法)で11111111
    - デシマル(10進法)で2^8-1=255  

    である。この上限を超え流ということは
    ```
    uint8 number = 255;
    number++;
    ```
    のような式であり、この時numberは256ではなく0に戻ってしまう。
- **アンダーフロー** :uintの格納下限を下回ること
  - <details><summary>`例`</summary><div><pre>
  ```
  uint8 number = 0;
  number--;
  ```
  </pre>
  とするとuintは符号無し整数なのでマイナスは取れず、numberは255となる</div></details>  


### SafeMathの使用
- 上記の問題を回避するためにSafeMathというライブラリが存在する

#### libraryとは
- ネイティブデータ型への関数アタッチができる特別なタイプのコントラクト
- 他人がデプロイしたコードを再利用することができる
- 例)SafeMath  
    >SafeMathは、コントラクト内で四則演算するとき、値がオーバーフロー、アンダーフローすることに対応してくれる四則演算ライブラリ

    ><details><summary>`書き方`</summary><div><pre>```
    //宣言方法
    using SafeMath for uint256;
    uint256 a = 5;
    uint256 b = a.add(3); // 5 + 3 = 8
    uint256 c = a.mul(2); // 5 * 2 = 10
    ```
</pre></div></details>
---
### コード

#### 問題
1. safemath.solをzombiefactory.solへインポートせよ。

1. using SafeMath for uint256;という宣言を加えよ。

```
// 1. ここでインポートするのだ

contract ZombieFactory is Ownable {

  // 2. safemathの使用をここで宣言せよ

  ,,(省略),,
}
```

#### 解答

```
// 1. ここでインポートするのだ
import "./safemath.sol";
contract ZombieFactory is Ownable {

  // 2. safemathの使用をここで宣言せよ
  using safemath for uint256;

  ,,(省略),,
}
```

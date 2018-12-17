## 3_2-3_3: Ownable Contract, onlyOwner Function

### 概要
#### 3-2
#### Ownableコントラクトとは
- external関数は誰にでも呼び出すことができてしまうため、自身が作った関数を他人に編集されてしまう恐れがある  

- そこでOwnable(所有可能)とすることでコントラクトに特別な権限を持つオーナーがいることを示す

- Ownableコントラクト
  1. コントラクトが作られた時、コンストラクタがowner を msg.sender （実行した人物）に設定する。
  1. onlyOwner修飾子を追加して、ownerだけが特定の関数にアクセスできるように設定する。
  <details><summary>`onlyOwner修飾子`</summary><div>onlyOwnerはowner(オーナー）だけが関数を実行できるように、制限をアクセスできるもの</div></details>
  1. 新しいownerにコントラクトを譲渡することも可能

#### 3-3
####  関数修飾子
- 関数修飾子はfunctionの代わりにmodifierを用いる。そして関数定義の最後に修飾子の名前をつけることで、関数に修飾子の働きを追加する
<details><summary>`使い方`</summary><div><pre>
```modifier onlyOwner() {
  require(msg.sender == owner);
  _;
}```
</pre>という修飾子を関数likeABossで使用するには<pre>
```
  function likeABoss() external onlyOwner {
    LaughManiacally("Muahahahaha");
    }
```</pre>
と関数の最後に修飾子をつければ、onlyOwnerの中のコードがまず実行され、それからonlyOwnerの_;ステートメントにたどり着くと、likeABossのコードを実行する
</div></details>

>```
ZombieFeeding is ZombieFactory
ZombieFactory is Ownable```
と継承したのでZombieFeedingもOwnableのコントラクトから関数/イベント/修飾子にアクセスできる

---

### コード

#### 問題
##### 2-7
1. ownable.solをimportするように我々のコードを変更せよ。

1. ZombieFactoryコントラクトを編集してOwnableを継承させよ。

##### 2-8
1. onlyOwner修飾子をsetKittyContractAddressへ追加せよ。

``` :2-7
2-7
// 1. ここにインポートせよ

// 2. ここで継承せよ:
contract ZombieFactory{

}
```
``` :2-8
2-8
// 関数を編集せよ：
  function setKittyContractAddress(address _address) external {
    kittyContract = KittyInterface(_address);
  }
```

- 答え

```
2-7
import "./ownable.sol";
contract ZombieFactory is Ownable {

}
```
```
2-8
// 関数を編集せよ：
  function setKittyContractAddress(address _address) external onlyOwner {
    kittyContract = KittyInterface(_address);
  }
```

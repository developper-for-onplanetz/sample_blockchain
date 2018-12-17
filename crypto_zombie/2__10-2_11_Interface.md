## 2_10-2_11: Interface

## 概要
#### 2-10
##### Interfaceの定義方法
- Interfaceを使うことでブロックチェーン上の他人のコントラクトとやりとりできる
- やりとりしたい関数名だけを宣言し、{}は用いずに;で終了する →{}がないことでコンパイラはInterfaceだと認識する
<details><summary>参考</summary><div><pre>
```
contract LuckyNumber {
  mapping(address => uint) numbers;

  function setNum(uint _num) public {
    numbers[msg.sender] = _num;
  }

  function getNum(address _myAddress) public view returns (uint) {
    return numbers[_myAddress];
  }
}
//だれでも自分のラッキーナンバーを格納してそれをイーサリアムアドレスと関連づけることができる
//そのアドレスを使えば、だれでもその人間のラッキーナンバーを探し出すことが可能
```
</pre>から関数getNumを使用する方法<pre>```contract NumberInterface {
  function getNum(address _myAddress) public view returns (uint);
}```
</div></details>

#### 2-11
##### Interfaceの使用方法
  >定義したContract名    新しいコントラクト名 = 定義したコントラクト名(初期化の時に用いたい変数)

で使用することができる。但し使用元の関数がpublicやexternalに限る
<details><summary>参考</summary><div><pre>
```
contract NumberInterface {
  function getNum(address _myAddress) public view returns (uint);
}
```
</pre>で定義したNumberInterfaceをコントラクトで使うには<pre>```
contract MyContract {
  address NumberInterfaceAddress = 0xab38...;
  // ここは、イーサリアム上のFavoriteNumberコントラクトのアドレスが入る。
  NumberInterface numberContract = NumberInterface(NumberInterfaceAddress);
  // `numberContract`は他のコントラクトを指し示すものになっているぞ

  function someFunction() public {
    // コントラクトから`getNum`を呼び出せるぞ：
    uint num = numberContract.getNum(msg.sender);
    // ...よし、`num`を操作するぞ。
  }
}
```
</div></details>

---

### コード

#### 問題

##### 2-7
1.  KittyInterfaceというinterfaceを定義せよ  

1. interface内に、getKitty関数を定義せよ。（下記の関数をコピーペーストするものを作成せよ。ただし、括弧の中に書くのではなく、returns ステートメントの後にセミコロンをつけよ。）
      <details><summary>`function getKitty`</summary><div><pre>```
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
) {
    Kitty storage kit = kitties[_id];

    // if this variable is 0 then it's not gestating
    isGestating = (kit.siringWithId != 0);
    isReady = (kit.cooldownEndBlock <= block.number);
    cooldownIndex = uint256(kit.cooldownIndex);
    nextActionAt = uint256(kit.cooldownEndBlock);
    siringWithId = uint256(kit.siringWithId);
    birthTime = uint256(kit.birthTime);
    matronId = uint256(kit.matronId);
    sireId = uint256(kit.sireId);
    generation = uint256(kit.generation);
    genes = kit.genes;
}
```
</pre></div></details>

##### 2-8
1. 君のコード中にクリプトキティーズのコントラクトのアドレスを保存しておいた。ckAddressという名前の変数に格納されている。次の行では、 kittyContractという名前のKittyInterfaceを作成し、ckAddressを使用して初期化せよ。


```
//  KittyInterface をここに作成せよ

address ckAddress = 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d;
// `ckAddress`を使用してkittyContractをここで初期化せよ。
```

#### 答え

```
//  KittyInterface をここに作成せよ
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

address ckAddress = 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d;
// `ckAddress`を使用してkittyContractをここで初期化せよ。
 KittyInterface kittyContract = KittyInterface(ckAddress);
```

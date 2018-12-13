## 3_1

### 概要
#### Immutability of Contracts
- Solidityでは一度コントラクトにデプロイした最初のコードは永久にブロックチェーン上に残るため編集も更新もできない。
- なので代わりに他のコントラクトを呼び出すときに関数として設定しておけば良い



### コード

1. #### 問題
ハードコードしたckAddressの行を削除せよ

2. kittyContractを作成した行を、単なる変数の宣言に変更せよ(変数に何もセットしてはならない)

3. setKittyContractAddressという関数を作成せよ。引数を_address ( address)とすること。またexternal関数で設定せよ。

4. 関数の中に、kittyContractにKittyInterface(\_address)を設定する1行を追加せよ。

```
// 1. これは削除せよ：
  address ckAddress = 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d;
  // 2.これを単なる宣言に変更せよ：
  KittyInterface kittyContract = KittyInterface(ckAddress);

  // 3. setKittyContractAddress メソッドをここに追加せよ

```

- 答え

```
KittyInterface kittyContract;

 function setKittyContractAddress(address _address) external {
   kittyContract = KittyInterface(_address);
 }
```

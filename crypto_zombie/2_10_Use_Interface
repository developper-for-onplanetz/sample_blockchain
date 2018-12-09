## 2-10: Use Interface

### 概要
#### interfaceの使用方法

- Interfaceとは
>ブロックチェーン上の他人のコントラクトとやり取りする為に使用する

- publicやexternalである場合にのみ使用可能


### コード
- 問題
>君のコード中にクリプトキティーズのコントラクトのアドレスを保存しておいた。ckAddressという名前の変数に格納されている。次の行では、 kittyContractという名前のKittyInterfaceを作成し、ckAddressを使用して初期化せよ。
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

```
address ckAddress = 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d;
// `ckAddress`を使用してkittyContractをここで初期化せよ。
```
- 答え
```
address ckAddress = 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d;
 KittyInterface kittyContract = KittyInterface(ckAddress);
```

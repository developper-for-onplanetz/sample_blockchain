## 2-8: Interface

### 概要
#### interfaceの定義方法

- Interfaceとは
>ブロックチェーン上の他人のコントラクトとやり取りする為に使用する

- {}()ではなく;で関数宣言を終了する
  >```
  contract NumberInterface {
  function getNum(address _myAddress) public view returns (uint);
}```


### コード
#### 問題
1.  KittyInterfaceというinterfaceを定義せよ  

1. interface内に、getKitty関数を定義せよ。（下記の関数をコピーペーストするものを作成せよ。ただし)

```
//  KittyInterface をここに作成せよ
```


>>```
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

- 正解

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
```

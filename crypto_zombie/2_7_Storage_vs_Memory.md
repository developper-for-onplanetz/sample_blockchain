## 2-7: Storage vs Memory

### 概要
#### StorageとMemoryの使い分け

- **Storage**
>ブロックチェーン上に永久に格納される変数

- **Memory**
>一時的な変数

ほとんどの場合(状態変数→storage,関数内で呼び出された変数→memory)Solidityが判定して処理するため必要ない


### コード
- 問題
```
pragma solidity ^0.4.19;

import "./zombiefactory.sol";

contract ZombieFeeding is ZombieFactory {

  // ここから開始せよ

}

```

- 正解

```
pragma solidity ^0.4.19;
import "./zombiefactory.sol";
contract ZombieFeeding is ZombieFactory {

  function feedAndMultiply(uint _zombieId, uint _targetDna) public {
    require(msg.sender == zombieToOwner[_zombieId]);
    Zombie storage myZombie = zombies[_zombieId];
  }

}
```

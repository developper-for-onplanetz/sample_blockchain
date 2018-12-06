## 2-8: Zombie DNA

### 概要
#### 前チャプターのfeedAndMultiply関数の完成

- 捕食した人間のDNAと元のゾンビのDNAから新しいゾンビのDNAを計算する



### コード
- 問題
```
function feedAndMultiply(uint _zombieId, uint _targetDna) public {
    require(msg.sender == zombieToOwner[_zombieId]);
    Zombie storage myZombie = zombies[_zombieId];
    // ここから開始せよ
  }

```

- 正解

```
function feedAndMultiply(uint _zombieId, uint _targetDna) public {
   require(msg.sender == zombieToOwner[_zombieId]);
   Zombie storage myZombie = zombies[_zombieId];
   _targetDna = _targetDna % dnaModulus;
   uint newDna = (myZombie.dna + _targetDna) / 2;
   _createZombie("NoName", newDna);
 }
```

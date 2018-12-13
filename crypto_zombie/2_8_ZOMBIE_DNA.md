## 2-8: Zombie DNA

### 概要
#### 前チャプターのfeedAndMultiply関数の完成

- 捕食した人間のDNAと元のゾンビのDNAから新しいゾンビのDNAを計算する



### コード
#### 問題
1. まず、_targetDnaが16桁であることを確認せよ。_targetDnaを _targetDna % dnaModulusと同様にして最後の16桁だけ取り出せば良い。

2. 次にnewDnaという名前のuint関数を宣言し、myZombieのDNAと_targetDnaの平均値を設定せよ。

>注:myZombie.name と myZombie.dnaを使ってmyZombieプロパティにアクセスできます。

3. 新しいDNAを手に入れたら、_createZombieを呼び出すように。どのパラメータを呼び出せばいいかわからなくなったら、zombiefactory.sol を参照せよ。名前が必要になるから、とりあえず"NoName" と名付けておくように。

```
function feedAndMultiply(uint _zombieId, uint _targetDna) public {
    require(msg.sender == zombieToOwner[_zombieId]);
    Zombie storage myZombie = zombies[_zombieId];
    // ここから開始せよ
  }

```

#### 正解

```
function feedAndMultiply(uint _zombieId, uint _targetDna) public {
   require(msg.sender == zombieToOwner[_zombieId]);
   Zombie storage myZombie = zombies[_zombieId];
   _targetDna = _targetDna % dnaModulus;
   uint newDna = (myZombie.dna + _targetDna) / 2;
   _createZombie("NoName", newDna);
 }
```

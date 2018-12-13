# 2_7-2_9 Storage vs Memory and Internal, External

## 概要
#### 2-7
StorageとMemoryの使い分け
- **Storage**
>ブロックチェーン上に永久に格納される変数

- **Memory**
>一時的な変数

ほとんどの場合Solidityが判定(状態変数→storage,関数内で呼び出された変数→memory)して処理するため必要ない


#### 2-8
- 捕食した人間のDNAと元のゾンビのDNAからなる新しいゾンビのDNAを計算方法

### 問題
<h4 style="color:#FF758E">2-7</h4>
1. feedAndMultiplyという関数を作成せよ。そこに \_zombieId (uint)と \_targetDna (uint)の2つのパラメーターを設定せよ。この関数は publicで作成せよ。

1. requireステートメントを追加してmsg.senderがこのゾンビのオーナーであるかどうかを確認せよ。
```
mapping (uint => address) public zombieToOwner;
```


3. ゾンビのDNAを手に入れる必要がある。そこでmyZombieという名前のローカルZombie（storageポインタとする）を関数で宣言する必要がある。この変数をzombies配列内の_zombieIdインデックスと同じにせよ。

<h4 style="color:#00FF00">2-8</h4>
1. まず、\_targetDnaが16桁であることを確認せよ。\_targetDnaを \_targetDna % dnaModulusと同様にして最後の16桁だけ取り出せば良い。

2. 次にnewDnaという名前のuint関数を宣言し、myZombieのDNAと_targetDnaの平均値を設定せよ。

>注:myZombie.name と myZombie.dnaを使ってmyZombieプロパティにアクセスできます。

3. 新しいDNAを手に入れたら、\_createZombieを呼び出せ。とりあえず"NoName" と名付けておくように。

  <details><summary>`function _createZombie`</summary><div><pre>
```
function _createZombie(string _name, uint _dna) private {
      uint id = zombies.push(Zombie(_name, _dna)) - 1;
      zombieToOwner[id] = msg.sender;
      ownerZombieCount[msg.sender]++;
      NewZombie(id, _name, _dna);
  }
```
</pre></div></details>

### 答え

````diff
 function feedAndMultiply(uint _zombieId, uint _targetDna) public {
+  require(msg.sender == zombieToOwner[_zombieId]);
+   Zombie storage myZombie = zombies[_zombieId];
-   _targetDna = _targetDna % dnaModulus;
-   uint newDna = (myZombie.dna + _targetDna) / 2;
-   _createZombie("NoName", newDna);
 }
```

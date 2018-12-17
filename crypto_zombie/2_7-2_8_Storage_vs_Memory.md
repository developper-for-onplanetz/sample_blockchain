# 2_7-2_8 Storage vs Memory

## 概要
#### 2-7
##### StorageとMemoryの使い分け
- **Storage**
>ブロックチェーン上に永久に格納される変数

- **Memory**
>一時的な変数

ほとんどの場合Solidityが判定(状態変数→storage,関数内で呼び出された変数→memory)して処理するため必要ない


#### 2-8
- 捕食した人間のDNAと元のゾンビのDNAの平均値からなる新しいゾンビのDNAを計算方法
<details><summary>例)`function testDnaSplicing()`</summary><div><pre>```function testDnaSplicing() public {
  uint zombieDna = 2222222222222222;
  uint targetDna = 4444444444444444;
  uint newZombieDna = (zombieDna + targetDna) / 2;
  // この例だと 3333333333333333だ。
}```
</pre></div></details>

---

### 問題
#### 2-7
1. feedAndMultiplyという関数を作成せよ。そこに \_zombieId (uint)と \_targetDna (uint)の2つのパラメーターを設定せよ。この関数は publicで作成せよ。

1. requireステートメントを追加してmsg.senderがこのゾンビのオーナーであるかどうかを確認せよ。
```
mapping (uint => address) public zombieToOwner;
```


3. ゾンビのDNAを手に入れる必要がある。そこでmyZombieという名前のローカルZombie（storageポインタとする）を関数で宣言する必要がある。この変数をzombies配列内の_zombieIdインデックスと同じにせよ。

#### 2-8
1. まず、\_targetDnaが16桁であることを確認せよ。\_targetDnaを \_targetDna % dnaModulusと同様にして最後の16桁だけ取り出せば良い。
<details><summary>`dnaModulus`</summary><div><pre>
```
uint dnaDigits = 16;
uint dnaModulus = 10 ** dnaDigits;
```
</pre></div></details>

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

```
contract ZombieFeeding is ZombieFactory {

  // ここから開始せよ

}
```
### 答え

````
contract ZombieFeeding is ZombieFactory {
  // ここから開始せよ
  function feedAndMultiply(uint _zombieId, uint _targetDna) public {
    require(msg.sender == zombieToOwner[_zombieId]);
    Zombie storage myZombie = zombies[_zombieId];

    _targetDna = _targetDna % dnaModulus;
    uint newDna = (myZombie.dna + _targetDna) / 2;
    _createZombie("NoName", newDna);
  }

}

```

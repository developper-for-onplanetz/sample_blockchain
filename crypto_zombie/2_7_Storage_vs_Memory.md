## 2-7: Storage vs Memory

### 概要
#### StorageとMemoryの使い分け

- **Storage**
>ブロックチェーン上に永久に格納される変数

- **Memory**
>一時的な変数

ほとんどの場合Solidityが判定(状態変数→storage,関数内で呼び出された変数→memory)して処理するため必要ない


### コード
#### 問題
1. feedAndMultiplyという関数を作成せよ。そこに _zombieId (uint)と _targetDna (uint)の2つのパラメーターを設定せよ。この関数は publicで作成せよ。

1. requireステートメントを追加してmsg.senderがこのゾンビのオーナーであるかどうかを確認せよ（createRandomZombie関数を作成した時のやり方を参考にせよ）。
>```
mapping (uint => address) public zombieToOwner;
```
>> 注: 繰り返しで恐縮ですが、回答のチェッカーシステムがベーシックなもののため、msg.senderを最初に書かないとエラーになります。ここ以外でコードを書く場合には好きな順番で構いません。

3. ゾンビのDNAを手に入れる必要がある。そこでmyZombieという名前のローカルZombie（storageポインタとする）を関数で宣言する必要がある。この変数をzombies配列内の_zombieIdインデックスと同じにせよ。

```
contract ZombieFeeding is ZombieFactory {
  // ここから開始せよ
}

```

- 正解

```
contract ZombieFeeding is ZombieFactory {
  // ここから開始せよ
  function feedAndMultiply(uint _zombieId, uint _targetDna) public {
    require(msg.sender == zombieToOwner[_zombieId]);
    Zombie storage myZombie = zombies[_zombieId];
  }

}
```

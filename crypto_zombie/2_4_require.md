## 2-4 : Require

### 概要
#### Requireとは

- ある条件を満たさない場合はエラーを投げて実行を止めることができるもの


### コード
#### 問題

1. requireを使い、最初のゾンビを作るときだけこの関数が呼び出せるようにせよ。

1. createRandomZombieの最初にrequire ステートメントを記述せよ。この関数でownerZombieCount[msg.sender] が 0であるかを確認し、そうでなければエラーを投げるように設定せよ。
```
mapping (address => uint) ownerZombieCount;
```

```
function createRandomZombie(string _name) public {
       // ここから始めるのだ
       uint randDna = _generateRandomDna(_name);
       _createZombie(_name, randDna);
   }
```

#### 正解

```
function createRandomZombie(string _name) public {
       // ここから始めるのだ
       require(ownerZombieCount[msg.sender] == 0);
       uint randDna = _generateRandomDna(_name);
       _createZombie(_name, randDna);
   }
```

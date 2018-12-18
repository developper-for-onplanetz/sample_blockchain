## 3_8-3_9 関数修飾子

### 概要
#### 3-8
##### 引数を持つ修飾子
- 修飾子も引数を与えることができる
<details><summary>`例)`</summary><div><pre>
```
// ユーザーの年齢を格納するマッピングだ：
mapping (uint => uint) public age;
// ユーザーの年齢が一定の年齢より高いことを要件とする関数修飾子：
modifier olderThan(uint _age, uint _userId) {
  require (age[_userId] >= _age);
  _;
}
// 車の運転は１６歳以上だな（米国の場合だ。日本は１８歳だな）。
//  こういう場合に引数のある`olderThan`修飾子を使うのだ。こんな風に書けばいい：
function driveCar(uint _userId) public olderThan(16, _userId) {
  // 関数のロジックだ
}
```
</pre></div></details>

#### 3-9
- 前チャプターで作成したaboveLevel修飾子を活用し
>- ゾンビのレベルが 2以上なら、ユーザーは名前を変更できるようになる。  
>- ゾンビのレベルが　20以上なら、カスタムDNAを与えることができるようになる。

となるように実装する

### コード
#### 3-8
#### 問題
1. ZombieHelperで、 aboveLevelというmodifier を作成せよ。_level (uint) と _zombieId (uint) の2つの引数を取るようにせよ。

1. その中で、zombies[_zombieId].levelが_level以上であることを確認せよ。

1. 修飾子の 最後に_;をつけて残りの関数を呼び出すことを忘れるな。


```
contract ZombieHelper is ZombieFeeding {

  // ここから開始せよ

}
```

- 答え

```
contract ZombieHelper is ZombieFeeding {

  // ここから開始せよ
  modifier aboveLevel(uint _level, uint _zombieId) {
    require(zombies[_zombieId].level >= _level);
    _;
  }
```

#### 3-9
#### 問題
1. changeNameという関数を作成せよ。引数は_zombieId (uint)と、_newName (string)の2つとする。またexternalで宣言せよ。関数はaboveLevel修飾子を持ち、_levelパラメーターに2を渡すこと。（ _zombieIdも忘れずに）

1. この関数では、 msg.senderがzombieToOwner[_zombieId]と同じであるかどうかを確認せよ。requireステートメントを使用すること。

1. さらにzombies[_zombieId].nameが_newNameと同等になるよう設定せよ。

1. changeNameの下にchangeDnaという名前の別の関数を作成せよ。定義および内容はchangeNameとほとんど同じだが、2番目の引数を_newDna (uint) とし、aboveLevelの_levelパラメーターに20を渡すこと。もちろん、ゾンビの名前を設定する代わりに、ゾンビのdnaに_newDnaを設定すること

```
// ここから開始せよ
```

#### 解答
```
// ここから開始せよ
function changeName(uint _zombieId, string _newName) external aboveLevel(2, _zombieId) {
    require(msg.sender == zombieToOwner[_zombieId]);
    zombies[_zombieId].name = _newName;
  }

  function changeDna(uint _zombieId, uint _newDna) external aboveLevel(20, _zombieId) {
    require(msg.sender == zombieToOwner[_zombieId]);
    zombies[_zombieId].dna = _newDna;
  }
```

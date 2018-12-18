## 3_5--3_7: Time Units,Security

### 概要
#### 3-5
#### 時間の単位
###### Solidityには時間を扱うための固有の単位がいくつか用意されている
- now変数  
    >現在のunixタイムスタンプ（1970年1月1日から経過した秒数のことだ）を返す

- seconds、 minutes、 hours、 days、weeks 、years
    >それぞれuintの秒数に変換されて使用される。つまり、1 minutes は 60になり、1 hours は 3600 (60 秒 x 60 分)になり、1 days は86400 (24時間 x 60 分 x 60 秒)となる。

#### 3-6
- structを引数として渡す
  - structへのstorageポインタは、privateやinternal関数の引数として渡すことができる
  <details><summary>`例`</summary><div><pre>
  ```
  function _doStuff(Zombie storage _zombie) internal {
  //  _zombieを処理する
}
```
</pre>
zombieIDの代わりにZombieの参照そのものを渡している</div></details>

### 3-7
#### Public関数とSecurity
- onlyOwnerのような修飾子をつけない限り、誰でも関数を実行して好きなデータを渡すことができる→ユーザーが好き勝手な値を代入できたらゲームとして成り立たない
- internal, privateにして以上の事を防ぐ
---

### コード

#### 3-5
##### 問題
DAppにクールダウンタイマー機能を追加し、ゾンビが一度捕食したら、1 day待たなければならないようにしたい。

1. cooldownTimeというuintを宣言し、1 daysに設定せよ。(英語の文法的には"1 day"が正しいが、それではコンパイルされない)

1. 前のチャプターですでにZombie structにlevelと readyTimeを追加してある。そこで新しいZombie structを作る場合、正しい引数を使うために_createZombie()を更新する必要がある。

1. zombies.pushの行を変更し、1 (level用)と、uint32(now + cooldownTime)(readyTime用)の2つの引数を追加せよ。

>注：デフォルトでnow は uint256 を返すため、uint32(...)が必要になります。そこで明示的に uint32に変換します。

```
3-5
  // 1. `cooldownTime` をここに定義せよ。

function _createZombie(string _name, uint _dna) internal {
    // 2. 次の行を更新せよ：
    uint id = zombies.push(Zombie(_name, _dna)) - 1;
```
##### 解答
```
  // 1. `cooldownTime` をここに定義せよ。
 uint cooldownTime = 1 days;

function _createZombie(string _name, uint _dna) internal {
    // 2. 次の行を更新せよ：
       uint id = zombies.push(Zombie(_name, _dna, 1, uint32(now + cooldownTime))) - 1;
```


#### 3-6
##### 問題
1. _triggerCooldownの定義から始めよ。この関数は引数としてZombie storageポインタの_zombieを取る。この関数はinternalで宣言せよ。

1. 関数の本体では、_zombie.readyTimeにuint32(now + cooldownTime)を設定せよ。

1. 次に_isReadyという関数を作成せよ。この関数も_zombieという名前のZombie storage引数を取る。internal viewとして、boolを返すように設定せよ。

1. 関数本体は(_zombie.readyTime <= now)を返すように書け。これはtrueまたはfalseとして評価される。この関数はゾンビが最後に捕食してから十分な時間が経過したか否かを判定するものだ。

```
// 1. `_triggerCooldown`関数をここに定義せよ

// 2. `_isReady` 関数を定義せよ
```
##### 解答
```
  // 1. `_triggerCooldown`関数をここに定義せよ
function _triggerCooldown(Zombie storage _zombie) internal {
   _zombie.readyTime = uint32(now + cooldownTime);
 }

 // 2. `_isReady` 関数を定義せよ
 function _isReady(Zombie storage _zombie) internal view returns (bool) {
     return (_zombie.readyTime <= now);
 }
```

#### 3-7
##### 問題
1. feedAndMultiplyはpublic関数になっている。これをinternalに変更し、コントラクトを安全なものにせよ

1. feedAndMultiplyにcooldownTimeを実装する。まずmyZombieを参照したあと、myZombieを渡した_isReady()をチェックするrequireステートメントを書き加えよ。こうすれば、クールダウン時間が過ぎている場合のみ関数を呼び出すことができるようになる。

1. 関数の最後で _triggerCooldown(myZombie) を呼び出して、捕食がクールダウンタイマーのトリガーになるようにせよ。



```
3-7
// 1. この関数を internalにせよ
  function feedAndMultiply(uint _zombieId, uint _targetDna, string _species) public {
    require(msg.sender == zombieToOwner[_zombieId]);
    Zombie storage myZombie = zombies[_zombieId];
    // 2. `_isReady`をチェックを追加せよ
    _targetDna = _targetDna % dnaModulus;
    uint newDna = (myZombie.dna + _targetDna) / 2;
    if (keccak256(_species) == keccak256("kitty")) {
      newDna = newDna - newDna % 100 + 99;
    }
    _createZombie("NoName", newDna);
    // 3. `_triggerCooldown`を呼び出せ
  }
```

#### 答え

```
3-7
function feedAndMultiply(uint _zombieId, uint _targetDna, string _species) internal {
    require(msg.sender == zombieToOwner[_zombieId]);
    Zombie storage myZombie = zombies[_zombieId];
    require(_isReady(myZombie));
    _targetDna = _targetDna % dnaModulus;
    uint newDna = (myZombie.dna + _targetDna) / 2;
    if (keccak256(_species) == keccak256("kitty")) {
      newDna = newDna - newDna % 100 + 99;
    }
    _createZombie("NoName", newDna);
    _triggerCooldown(myZombie);
  }
  ```

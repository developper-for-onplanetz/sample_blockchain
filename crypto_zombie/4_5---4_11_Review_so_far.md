## 4_5---4_11: Review so far

### 概要
#### 4-5
- 関数宣言の復習

#### 4-6
- modifier,msg.senderの復習

#### 4-7
- Refactoring
>ownerOf修飾詞を他の関数にも使用

#### 4-8
- random numberの復習

#### 4-9
- Gasの節約の復習
#### 4-10,11
- ifと四則演算の復習

### コード

### 問題
#### 4-5
1. 我々のコントラクトにattackVictoryProbabilityというuintを与え、それが70と等しくなるようにせよ。

1. attackという関数を作成せよ。これは_zombieId (uint) と_targetId (uint）の２つのパラーメーターを受けとり、external関数であるとせよ。

```
 // ここにattackVictoryProbabilityを作成せよ

 // ここに新たな関数を作成せよ
```
#### 解答
```
// ここにattackVictoryProbabilityを作成せよ
uint attackVictoryProbability = 70;
// ここに新たな関数を作成せよ
function attack(uint _zombieId, uint _targetId) external {
  }
```


### 問題
#### 4-6
1. ownerOfというmodifierを作成せよ。これは１つの引数_zombieId（uint）を受け取る。

1. 本文では、msg.senderがzombieToOwner[_zombieId]と同等であるようにrequire（要求）し、そうであれば関数を続けるようにせよ。

1. feedAndMultiplyの関数定義を変更し、ownerOf修飾詞を使うようにせよ。

1. 今はmodifierを使っているので、以下の一行は削除するのだ。require(msg.sender == zombieToOwner[_zombieId]);
```
 // 1. modifierをここに作成するのだ

 // 2. 関数定義にmodifierを加えよ
  function feedAndMultiply(uint _zombieId, uint _targetDna, string _species) internal {
  // 3. この一行を削除するのだ
    require(msg.sender == zombieToOwner[_zombieId]);
    ,,(省略),,
    }
```
#### 解答
```
// 1. modifierをここに作成するのだ
modifier ownerOf(uint _zombieId) {
   require(msg.sender == zombieToOwner[_zombieId]);
   _;
 }
// 2. 関数定義にmodifierを加えよ
 function feedAndMultiply(uint _zombieId, uint _targetDna, string _species) internal ownerOf(_zombieId) {
   // 3. この一行を削除するのだ
  ,,(省略),,
    }
```


### 問題
#### 4-7
1. changeName()関数をアップデートし、ownerOfを使用せよ。

1. changeDna()関数をアップデートし、ownerOfを使用せよ。
```
// 1. この関数を`ownerOf`を使うように修正するのだ
  function changeName(uint _zombieId, string _newName) external aboveLevel(2, _zombieId) {
    require(msg.sender == zombieToOwner[_zombieId]);
    zombies[_zombieId].name = _newName;
  }

  // 2. この関数も同じようにせよ
  function changeDna(uint _zombieId, uint _newDna) external aboveLevel(20, _zombieId) {
    require(msg.sender == zombieToOwner[_zombieId]);
    zombies[_zombieId].dna = _newDna;
  }
```
#### 解答
```
// 1. この関数を`ownerOf`を使うように修正するのだ
 function changeName(uint _zombieId, string _newName) external aboveLevel(2, _zombieId) ownerOf(_zombieId) {
   zombies[_zombieId].name = _newName;
 }

 // 2. この関数も同じようにせよ
 function changeDna(uint _zombieId, uint _newDna) external aboveLevel(20, _zombieId) ownerOf(_zombieId) {
   zombies[_zombieId].dna = _newDna;
 }
```


### 問題
#### 4-8
1. ownerOf修飾詞をattack関数に加え、関数を呼び出した者が_zombieIdを所有しているか確認せよ。

1. まず最初に、我々の関数は両方のゾンビにstorageのポインタをゲットしなくてはならない。そうするとより簡単にそれらとやり取りできる。

  1. myZombieという名のZombie storageを宣言せよ。そしてそれがzombies[_zombieId]と等しくなるよう設定するのだ。

  1. enemyZombieという名のZombie storageを宣言し、そしてそれがzombies[_targetId]と等しくなるよう設定せよ。

1. バトルの結果を決めるために、0から99のランダムな数字を使っていく。そのためrandという名前のuintを宣言し、これが引数を100としたrandMod関数と同等であるよう設定せよ。
```
// 1. modifierをここに加えるのだ
  function attack(uint _zombieId, uint _targetId) external {
    // 2. 関数定義をここから始めよ
  }
```
#### 解答
```
// 1. modifierをここに加えるのだ
function attack(uint _zombieId, uint _targetId) external ownerOf(_zombieId) {
  // 2. 関数定義をここから始めよ
    Zombie storage myZombie = zombies[_zombieId];
    Zombie storage enemyZombie = zombies[_targetId];
    uint rand = randMod(100);
  }
```

### 問題
#### 4-9
1. Zombie構造体を修正し、さらに２つのプロパティを持つようにせよ。

  - a. uint16であるwinCount

  - b. 同じくuint16であるlossCount

1. Zombie構造体に新たなプロパティができたから、今度は_createZombie()の関数定義を変えることが必要だ。

1. ゾンビの作成定義を、新たなゾンビを0勝0敗で作成するように変更せよ。
```
struct Zombie {
      string name;
      uint dna;
      uint32 level;
      uint32 readyTime;
      // 1. 新たなプロパティをここに追加するのだ
    }
function _createZombie(string _name, uint _dna) internal {
            // 2. 新たなゾンビ生成をここで修正せよ
            uint id = zombies.push(Zombie(_name, _dna, 1, uint32(now + cooldownTime))) - 1;
            ,,(省略),,
}    
```
#### 解答
```
struct Zombie {
      string name;
      uint dna;
      uint32 level;
      uint32 readyTime;
      // 1. 新たなプロパティをここに追加するのだ
      uint16 winCount;
      uint16 lossCount;
    }

    function _createZombie(string _name, uint _dna) internal {
      // 2. 新たなゾンビ生成をここで修正せよ
        uint id = zombies.push(Zombie(_name, _dna, 1, uint32(now + cooldownTime), 0, 0)) - 1;
        ,,(省略),,
    }
```

### 問題
#### 4-10
1. ifステートメントを作成し、rand変数がattackVictoryProbability変数 より少ないか同等 であるかチェックするようにせよ。

1. もしこの条件が真であれば、我らがゾンビの勝利だ！従って、

  - a. myZombieのwinCountを増やせ。

  - b. myZombieのlevelを増やせ。

  - c. enemyZombieのlossCountを増やせ。

  - d. feedAndMultiply関数を動かすのだ。関数を呼び出す構文を見るには、zombiefeeding.solをチェックせよ。三番目の引数（_species）に、"zombie"の文字列を渡せ。
```
function attack(uint _zombieId, uint _targetId) external ownerOf(_zombieId) {
    ,,(省略),,
    // ここから始めるのだ
  }
```
#### 解答
```
function attack(uint _zombieId, uint _targetId) external ownerOf(_zombieId) {
    ,,(省略),,
    // ここから始めるのだ
    if (rand <= attackVictoryProbability) {
     myZombie.winCount++;
     myZombie.level++;
     enemyZombie.lossCount++;
     feedAndMultiply(_zombieId, enemyZombie.dna, "zombie");
  }
```

### 問題
#### 4-11
1. elseステートメントを追加せよ。もし我々のゾンビが負けたら、

  - a. myZombieのlossCountを増やせ。

  - b. enemyZombieのwinCountを増やせ。

1 このelseステートメント外で、myZombieにある_triggerCooldown関数を動かすのだ。こうするとゾンビは一日一回だけ攻撃できるようになる。
```
function attack(uint _zombieId, uint _targetId) external ownerOf(_zombieId) {
  ,,(省略),,
    if (rand <= attackVictoryProbability) {
      ,,(省略),,
    } // ここから始めよ
  }
```
#### 解答
```
function attack(uint _zombieId, uint _targetId) external ownerOf(_zombieId) {
  ,,(省略),,
    if (rand <= attackVictoryProbability) {
      ,,(省略),,
    } // ここから始めよ else {
      myZombie.lossCount++;
      enemyZombie.winCount++;
    }
    _triggerCooldown(myZombie);
  }
```

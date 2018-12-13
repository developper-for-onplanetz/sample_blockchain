## 2-9 More on Function Visibility

### 概要
#### InternalとExternal
##### Internal とは  
  - privateと同じだが、継承先のコントラクトでも使用可能(privateはコントラクト先では使用不可能)  

#### EXternalとは
  - publicと同じだがコントラクトの外からだけ呼び出せる

- 共に関数宣言はprivateやpublicと同じ

---

### コード
#### 問題
1. \_createZombie() をprivate から internalに変更して、他のコントラクトからアクセスできるようにせよ。

```
// 下の関数定義を編集せよ
    function _createZombie(string _name, uint _dna) private {
        uint id = zombies.push(Zombie(_name, _dna)) - 1;
        zombieToOwner[id] = msg.sender;
        ownerZombieCount[msg.sender]++;
        NewZombie(id, _name, _dna);
    }
```

- 正解

```
// 下の関数定義を編集せよ
    function _createZombie(string _name, uint _dna) Internal {
        uint id = zombies.push(Zombie(_name, _dna)) - 1;
        zombieToOwner[id] = msg.sender;
        ownerZombieCount[msg.sender]++;
        NewZombie(id, _name, _dna);
    }
```

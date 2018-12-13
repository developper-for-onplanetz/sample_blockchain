## 2-3: Msg.sender

### 概要
#### msg.sender

- **msg.sender** を使用することで、関数を呼びたしたユーザーのadressを参照することができる
- イーサリアムブロックチェーンにセキュリティをもたらしている


### コード
#### 問題  

1. _createZombieメソッドを更新して、ゾンビのオーナーシップを関数を呼び出した奴に割り当てるようにしたい。  

1. まず最初は、新しいゾンビのidを取得して、id下にmsg.senderを格納してzombieToOwnerマッピングを更新せよ。

1. 次に、このmsg.senderでownerZombieCountを増やせ。

```
mapping (uint => address) public zombieToOwner;
mapping (address => uint) ownerZombieCount;
```  

```
function _createZombie(string _name, uint _dna) private {
        uint id = zombies.push(Zombie(_name, _dna)) - 1;
        // ここから始めるのだ
        NewZombie(id, _name, _dna);
    }

```

#### 正解

```
function _createZombie(string _name, uint _dna) private {
       uint id = zombies.push(Zombie(_name, _dna)) - 1;
       zombieToOwner[id] = msg.sender;
       ownerZombieCount[msg.sender]++;
       NewZombie(id, _name, _dna);
   }
```

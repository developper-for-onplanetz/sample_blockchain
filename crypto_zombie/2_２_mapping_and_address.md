## 2-2: MappingとAddresses

### 概要
> Addresses(Ethereumアカウントの口座番号のようなもの)とは

- 銀行の口座番号のようなものであり、アカウントのためのユニークな識別番号である
- 0x0cE446255506E92DF41614C46F1d6df9Cc969183

> Mapping(データの保管と参照のためのキーバリューストア)について

-　データを格納するときにSolidityで使える方法



### コード
- 問題
```
Zombie[] public zombies;

// ここでマッピングを宣言するのだ

```

- 正解

```
Zombie[] public zombies;

// ここでマッピングを宣言するのだ
mapping (uint => address) public zombieToOwner;
mapping (address => uint) ownerZombieCount;
```

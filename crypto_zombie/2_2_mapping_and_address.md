## 2-2: MappingとAddresses

### 概要
>Adressとは

- 銀行の口座番号のようなものであり、アカウントのためのユニークな識別番号である
- 0x0cE446255506E92DF41614C46F1d6df9Cc969183

> Mapping(データの保管と参照のためのキーバリューストア)とは

-　データを格納するときにSolidityで使える方法



### コード
#### 問題

1. zombieToOwnerという名前のマッピングを作成せよ。キーは uintとし(idを基にゾンビを参照・保管するぞ）、バリューはaddressとする。マッピングはpublicで作成せよ。  

1. ownerZombieCountという名前のマッピングを作成し、キーはaddress、バリューはuintを設定せよ。

```
// ここでマッピングを宣言するのだ

```

#### 正解

```
// ここでマッピングを宣言するのだ
mapping (uint => address) public zombieToOwner;
mapping (address => uint) ownerZombieCount;
```

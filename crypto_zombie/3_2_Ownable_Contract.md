## 3-2: Ownable Contract

### 概要
#### Ownable コントラクト
- external関数は誰にでも呼び出すことができてしまうため、自身が作った関数を他人に編集されてしまう恐れがある  
- そこでOwnable(所有可能)とすることでコントラクトに特別な権限を持つオーナーがいることを示す

### コード

#### 問題

1. ownable.solをimportするように我々のコードを変更せよ。

1. ZombieFactoryコントラクトを編集してOwnableを継承させよ。

```
// 1. ここにインポートせよ

// 2. ここで継承せよ:
contract ZombieFactory{

}
```

- 答え

```
import "./ownable.sol";
contract ZombieFactory is Ownable {

}
```

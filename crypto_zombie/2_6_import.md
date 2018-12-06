## 2-6: Import

### 概要
>Importの方法

- コードが長くなりすぎないよういくつかのファイルを作った時に別のファイルからインポートする時に利用する


### コード
- 問題
```
pragma solidity ^0.4.19;

// import ステートメントをここに書け

contract ZombieFeeding is ZombieFactory {

}


```

- 正解

```
pragma solidity ^0.4.19;
import "./zombiefactory.sol";
contract ZombieFeeding is ZombieFactory {
}

```

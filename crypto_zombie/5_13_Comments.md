## 5-13: Comments
### 概要
#### コメントのシンタックス
- 1行コメント
  ##### `//`をコメントする箇所に加えるだけ

  - @title
    > タイトルを表す
  - @author
    > 編集者
  - @notice
    > ユーザー向けにコントラクトや関数の働きを説明する
  - @dev
    > 開発者向けの@noticeのさらなる詳細
  - @param, @return
    > 関数の各パラメーターが何であり、どんな値を返すのかを記述する
- 複数行コメント
  - `/*`で始め`*/`で終了する。<details><summary>`例`</summary><div><pre>```
  contract CryptoZombies {
  /* This is a multi-lined comment. I'd like to thank all of you
      who have taken your time to try this programming course.
     I know it's free to all of you, and it will stay free
     forever, but we still put our heart and soul into making
     this as good as it can be.
     Know that this is still the beginning of Blockchain development.
  */
  }```
</pre></div></details>

---

### コード

#### 問題


```
/// このコメントをnatspecタグでの説明に置きかえよ
contract ZombieOwnership is ZombieAttack, ERC721 {
  ,,(省略),,
}
```

#### 解答

```
/// @title A contract that manages transfering zombie ownership
/// @author HIDE
/// @dev Compliant with OpenZeppelin's implementation of the ERC721 spec draft
contract ZombieOwnership is ZombieAttack, ERC721 {
  ,,(省略),,
}
```

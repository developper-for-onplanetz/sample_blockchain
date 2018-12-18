## 3-4:Gas

### 概要
#### ガス - イーサリアムDAppの燃料
- Solidityでは、ユーザーが関数を使用するたびに、\_ガス_と呼ばれる通貨を支払うことになっている
- 関数を実行するために必要なガスの量は、関数のロジックの複雑さによる
- ユーザーは実際にお金を使って関数を動かすことになるから、**イーサリアムは他のプログラミング言語よりもずっとコードの最適化が重要になる**
- どのようにしてガスを節約するか  
  - structの中に複数の uintがある場合、できる限り小さい単位の uintを使うことで、Solidityが複数の変数をまとめて、ストレージを小さくすることが可能。
  <details><summary>`例)`</summary><div><pre>```
  struct MiniMe {  
  uint32 a;  
  uint32 b;  
  uint c;  
  }```
  </pre></div></details>

---

### コード

#### 問題

1. Zombie structに2つのプロパティを追加せよ。プロパティは level (uint32)と、readyTime (uint32)である。このデータ型をまとめることができるようにstructの最後に設定せよ。

```
struct Zombie {
       string name;
       uint dna;
       // ここに新しいデータを追加せよ
   }
```

- 答え

```
struct Zombie {
       string name;
       uint dna;
       // ここに新しいデータを追加せよ
       uint32 level;
       uint32 readyTime;
   }
```

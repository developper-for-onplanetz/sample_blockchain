## 3-12 :forループ

### 概要
#### Solidityのforループ
- SolidityのforループはJavaScriptと同じようなもの


### コード

#### 問題
1. getZombiesByOwnerを完成させよ。forループでDApp内の全てのゾンビをループさせ、オーナーが一致するかどうかを判定し、result 配列に格納して返却せよ。

1. counterというuintを宣言し、0に設定せよ。この変数はresult配列のインデックスとして使用する。

1. uint i = 0から始めて、i < zombies.lengthまでループするforループを宣言せよ。このループは配列内の全てのゾンビをイテレートする。

1. forループ内にifステートメントを作成し、zombieToOwner[i]が_ownerと一致するか判定せよ。２つのアドレスを比較することでチェックしている。

1. ifステートメント内部には以下を設定せよ：

  1. result配列内にゾンビのIDを追加せよ。result[counter]をiと同等になるよう設定するだけでよい。
  1.  counterを 1 増やせ。(forループの例を参考にするのだ）。


```
function getZombiesByOwner(address _owner) external view returns(uint[]) {
   uint[] memory result = new uint[](ownerZombieCount[_owner]);
   // ここから開始せよ
   return result;
 }
```

- 答え

```
function getZombiesByOwner(address _owner) external view returns(uint[]) {
  uint[] memory result = new uint[](ownerZombieCount[_owner]);
  // ここから開始せよ
  uint counter = 0;
  for (uint i = 0; i < zombies.length; i++) {
    if (zombieToOwner[i] == _owner) {
      result[counter] = i;
      counter++;
    }
  }
  return result;
}
```

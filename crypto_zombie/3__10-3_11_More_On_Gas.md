## 3_10-3_11: View関数でガスを節約、Storageは高コスト

### 概要
#### 3-10
#### View関数はコスト(Gas)を必要としない
- View関数を呼び出す場合、ただデータを参照するだけで、何も変更しないためGasを必要としない。
    >view関数はノードに問い合わせるだけでよく、トランザクションを生成する必要がないため

- 読み取り専用の`external view関数`がガス使用料を最適にする

>注:同じコントラクト内の他の関数で呼び出されるとその関数のトランザクション生成のために各ノードの検証が必要になるため、呼び出しにコストはかかる

#### 3-11
#### ストレージは高いコストがかかる
- ストレージへの操作(特に書き込み)は世界中の何千個というノードが全てそのデータを書き込む必要があるため高コストになる

- コストを抑えるために、絶対に必要な場合を除いてstorageにデータを書き込まないようにする方法もある
>例)配列に変数を保存するのではなく、関数をよびだすごとにmemory上の配列を再構築する

- memory内で配列を宣言する
  - 関数中でmemoryキーワード付きで配列を生成すればstorageに書き込むことなく(=低コストで)新しい配列を作成することができる
  <details><summary>memory内の配列の宣言方法</summary><div><pre>```
  function getArray() external pure returns(uint[]) {
  // 長さ3の新しい配列をメモリ内にインスタンス化する
  uint[] memory values = new uint[](3);
  // 値を追加しよう
  values.push(1);
  values.push(2);
  values.push(3);
  // 配列を返す
  return values;
}
```
</pre></div></details>

---
### コード
#### 3-10
#### 問題
1. getZombiesByOwnerという名前の関数を作成せよ。引数は_ownerという名前のaddress型とする。これをexternal view関数とし、ガスコストを使わずにweb3.js から呼び出せるようにするのだ。

1. 関数はuint[] (uintの配列)を返すように設定すること。

```
// ここに関数を作成せよ
```

#### 解答

```
// ここに関数を作成せよ
  function getZombiesByOwner(address _owner) external view returns(uint[]) {
  }
```

#### 3-11
#### 問題
getZombiesByOwner関数では、特定のユーザーが保有している全てのゾンビを、uint[]配列として返したい。

1. resultという名前の uint[] memory変数を宣言せよ

1. それを新しいuint配列と同等になるよう設定せよ。配列の長さは_ownerの所有するゾンビ数とする。ゾンビ数はmappingからこのようにして参照できる: ownerZombieCount[_owner]

1. 関数の最後で resultを返せ。

```
function getZombiesByOwner(address _owner) external view returns(uint[]) {
    // ここから開始せよ
  }
```
#### 解答
```
function getZombiesByOwner(address _owner) external view returns(uint[]) {
  // ここから開始せよ
    uint[] memory result = new uint[](ownerZombieCount[_owner]);

    return result;
  }
```

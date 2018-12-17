## 3-5: Time Units

### 概要
#### 時間の単位
##### Solidityには時間を扱うための固有の単位がいくつか用意されている
- now変数  
    >現在のunixタイムスタンプ（1970年1月1日から経過した秒数のことだ）を返す

- seconds、 minutes、 hours、 days、weeks 、years
    >それぞれuintの秒数に変換されて使用される。つまり、1 minutes は 60になり、1 hours は 3600 (60 秒 x 60 分)になり、1 days は86400 (24時間 x 60 分 x 60 秒)となる。

---

### コード

#### 問題
DAppにクールダウンタイマー機能を追加し、ゾンビが一度捕食したら、1 day待たなければならないようにしたい。

1. cooldownTimeというuintを宣言し、1 daysに設定せよ。(英語の文法的には"1 day"が正しいが、それではコンパイルされない)

1. 前のチャプターですでにZombie structにlevelと readyTimeを追加してある。そこで新しいZombie structを作る場合、正しい引数を使うために_createZombie()を更新する必要がある。

1. zombies.pushの行を変更し、1 (level用)と、uint32(now + cooldownTime)(readyTime用)の2つの引数を追加せよ。

>注：デフォルトでnow は uint256 を返すため、uint32(...)が必要になります。そこで明示的に uint32に変換します。


```
  // 1. `cooldownTime` をここに定義せよ。

function _createZombie(string _name, uint _dna) internal {
    // 2. 次の行を更新せよ：
    uint id = zombies.push(Zombie(_name, _dna)) - 1;
```

- 答え

```
  // 1. `cooldownTime` をここに定義せよ。
 uint cooldownTime = 1 days;
 
function _createZombie(string _name, uint _dna) internal {
    // 2. 次の行を更新せよ：
       uint id = zombies.push(Zombie(_name, _dna, 1, uint32(now + cooldownTime))) - 1;
```

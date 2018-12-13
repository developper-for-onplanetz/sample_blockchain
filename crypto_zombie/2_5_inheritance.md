## 2-5:継承

### 概要
#### Solidityでの継承

- 全てのメソッドを継承するためコードを整理する時に役立つ
- コードの重複を減らし、再利用性を高める


### コード
#### 問題  

1. ZombieFactory下にZombieFeedingという名前のコントラクトを作成せよ。このコントラクトはZombieFactoryコントラクトを継承するものでなければならない。

```
// ここから始めるのだ

```

#### 正解

```
contract ZombieFeeding is ZombieFactory {
}
```

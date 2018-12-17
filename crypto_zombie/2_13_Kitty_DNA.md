## 2-13: Kitty Genes

### 概要
#### ゾンビのDNAに特徴を追加する
- 現在作成しているZombieのDNA16桁のうち、余っているところに子猫のDNAという特別な特徴を追加する

---

### コード

#### 問題
1. まず、feedAndMultiplyの関数定義を変更して、 _speciesという名前のstringの引数を取得できるようにせよ

2. 次に、新しいゾンビのDNAを計算後に、ifステートメントを使用して、_speciesのkeccak256ハッシュと文字列の"kitty"を比較して同じかどうかを判定せよ。

3. ifステートメント内で最後の2桁を99に変更したい。一つの方法としてはこういうものがある： newDna = newDna - newDna % 100 + 99;

>解説: newDna を334455と仮定して考えて見ます。そうすると newDna % 100 は 55になり、newDna - newDna % 100 は334400です。最後に 99を追加して334499という値を取得します。

4. 最後に、feedOnKitty内の関数呼び出しを変更せよ。feedAndMultiplyを呼び出した際に、最後に"kitty"パラメーターを追加せよ。

```
// この関数の定義を編集せよ

 function feedAndMultiply(uint _zombieId, uint _targetDna) public {
   require(msg.sender == zombieToOwner[_zombieId]);
   Zombie storage myZombie = zombies[_zombieId];
   _targetDna = _targetDna % dnaModulus;
   uint newDna = (myZombie.dna + _targetDna) / 2;
   // ここにifステートメントを追加せよ
   _createZombie("NoName", newDna);
 }

 function feedOnKitty(uint _zombieId, uint _kittyId) public {
   uint kittyDna;
   (,,,,,,,,,kittyDna) = kittyContract.getKitty(_kittyId);
   // この関数呼び出しを編集せよ
   feedAndMultiply(_zombieId, kittyDna);
 }
```

- 答え

```
// この関数の定義を編集せよ
  function feedAndMultiply(uint _zombieId, uint _targetDna, string _species) public {
    require(msg.sender == zombieToOwner[_zombieId]);
    Zombie storage myZombie = zombies[_zombieId];
    _targetDna = _targetDna % dnaModulus;
    uint newDna = (myZombie.dna + _targetDna) / 2;
    // ここにifステートメントを追加せよ
    if (keccak256(_species) == keccak256("kitty")) {
      newDna = newDna - newDna % 100 + 99;
    }
    _createZombie("NoName", newDna);
  }

  function feedOnKitty(uint _zombieId, uint _kittyId) public {
    uint kittyDna;
    (,,,,,,,,,kittyDna) = kittyContract.getKitty(_kittyId);
    feedAndMultiply(_zombieId, kittyDna, "kitty");
  }

```

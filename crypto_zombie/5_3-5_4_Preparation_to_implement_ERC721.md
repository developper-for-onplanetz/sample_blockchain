## ERC721の実装の準備

### 概要
#### 5-3: 関数の実装の復習
>新しいことなし

#### 5-4: Refactoring  

- 関数名と修飾詞名が被った場合
  - ERC721トークン規格を使うということは**自分たちがERC721トークン規格に沿った関数名を使用していると他のコントラクトから予期される**ということ
  - なので無闇に関数名を変更してはいけない

  >優先順位: **関数名 > 修飾詞名**

  - この共通認識がERC721トークン同士のやりとりを簡単にしている

---

### コード

### 5-3
#### 問題
1. balanceOfを実装し、_ownerのゾンビ保有数を返すようにせよ。

1. ownerOfを実装し、_tokenIdをIDに持つゾンビを保有する者のアドレスを返せ。

```
function balanceOf(address _owner) public view returns (uint256 _balance) {
    // 1.ここで`_owner`がもつゾンビの数を返すのだ
}

function ownerOf(uint256 _tokenId) public view returns (address _owner) {
    // 2. `_tokenId`の所有者をここで返すのだ
  }
```
  <details><summary>`参考`</summary><div><pre>
```
    mapping (uint => address) public zombieToOwner;
```</pre>
    <pre>
```
    mapping (address => uint) ownerZombieCount;
```</pre>
    </div></details>


#### 解答
```
function balanceOf(address _owner) public view returns (uint256 _balance) {
    // 1.ここで`_owner`がもつゾンビの数を返すのだ
    return ownerZombieCount[_owner];
  }

  function ownerOf(uint256 _tokenId) public view returns (address _owner) {
    // 2. `_tokenId`の所有者をここで返すのだ
    return zombieToOwner[_tokenId];
  }
```


### 5-4
#### 問題

1. 修飾詞名の定義をonlyOwnerOfに変更せよ。

1. 下へスクロールしていき、この修飾詞を使っているfeedAndMultiply関数を見つけたら、ここでも同じように名前を変更せよ。

```
// 1. 修飾詞名を`onlyOwnerOf`に変更せよ
 modifier ownerOf(uint _zombieId) {
   require(msg.sender == zombieToOwner[_zombieId]);
   _;
 }

 ~~(省略)~~

 function feedAndMultiply(uint _zombieId, uint _targetDna, string _species) internal ownerOf(_zombieId) {
    ,,(省略),,
  }
```

#### 解答
```
// 1. 修飾詞名を`onlyOwnerOf`に変更せよ
  modifier onlyOwnerOf(uint _zombieId) {
    require(msg.sender == zombieToOwner[_zombieId]);
    _;
  }

    ~~(省略)~~

function feedAndMultiply(uint _zombieId, uint _targetDna, string _species) internal ownerOf(_zombieId) {
     ,,(省略),,
 }
```

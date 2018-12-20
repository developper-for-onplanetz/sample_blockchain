## ERC721の実装

### 概要
#### 5_5--5_8: Transferのロジック
- ERC721は二つの異なるトークン移転法を持つ
  1. ```
  function transfer(address _to, uint256 _tokenId) public;```
    >**トークン所有者** が送信先のaddress,送りたい_tokenIdを指定するもの
  2. ```
  function approve(address _to, uint256 _tokenId) public;
function takeOwnership(uint256 _tokenId) public;```
> 1. **トークン所有者** がapprove関数を新たな所有者(address)と送るトークン(_tokenId)を引数として呼び出す
  >1. トークンの受け取り許可を* mappping (uint256 => address)* にて記録
  >1. **新たな所有者** がtakeOwnership関数を_tokenIdで呼び出すと**承認済みの場合のみ** 移転される


- つまり結果は等しいが、送り手側と受け手側の順序が異なる。


---

### コード




### 5-5
#### 問題
_transferのロジックを定義しよう。

1. _transferという名前の関数を定義せよ。これはaddress _from、address _toそしてuint256 _tokenIdの３つの引数を受け取り、private関数とすること。

1. オーナーシップが変わるとき、２つのマッピングが更新される: ownerZombieCount (所有者のゾンビ保有数を記録する)と、zombieToOwner (誰がどのゾンビを所有しているか記録する)。

1. ますこの関数で行うべきは、ゾンビを 受け取る 者(address _to)のownerZombieCountを加算することだ。

1. 次にゾンビを 送る 者(address _from)のownerZombieCountを 減らす

1. zombieToOwnerマッピングを変更したい。この_tokenIdが今度は_toを指し示すようにせよ。

1. ERC721規格は、Transferイベントを含む。この関数の最終行で、適切な情報を渡してTransferイベントを起こさなくてはならない。erc721.solを見て、呼び出しに際してどんな引数を求められているのかをチェックして実装せよ。

```
 // _transfer()をここで定義するのだ
```

#### 解答

```
// _transfer()をここで定義するのだ

function _transfer(address _from, address _to, uint256 _tokenId) private {
 ownerZombieCount[_to]++;
 ownerZombieCount[_from]--;
 zombieToOwner[_tokenId] = _to;
 Transfer(_from, _to, _tokenId);
}
```


### 5-6
#### 問題
1. トークン/ゾンビの所有者だけがそれを移転できるよう確認したい。onlyOwnerOf修飾詞がそれを行う。この関数に追加しよう。

1. ただ_transferを呼び出すだけだ。address _fromの引数にmsg.senderが渡されているようにすること。

```
// 1. ここに修飾詞を加えるのだ
  function transfer(address _to, uint256 _tokenId) public {
    // 2. ここで関数を定義せよ
  }
```

#### 解答

```
// 1. ここに修飾詞を加えるのだ
  function transfer(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
    // 2. ここで関数を定義せよ
    _transfer(msg.sender, _to, _tokenId);
  }
```


### 5-7
#### 問題
1. まず初めに、zombieApprovalsというマッピングを定義せよ。uintからaddressを指し示すマップにすること。

こうすることで、誰かが_tokenIdでtakeOwnership関数を呼び出すときに、マッピングで誰がトークン受け取りを承認されているかをさっとチェック可能だ。

1. approve関数では、トークン所有者のみが、受け手にトークンを受け取る許可を与えられるようにしておきたい。 なので、approve関数にonlyOwnerOf修飾詞を加えよう。

1. 関数の中身に、_tokenIdがキーのzombieApprovalsが_toアドレスと同等となるよう設定せよ。

1. 最後に、ERC721規格にはApprovalイベントがあるから、関数の最後でこれを発生させ流ようにせよ。erc721.solをチェックして_ownerの引数にmsg.senderを使うよう確かめること。

```
 // 1. マッピングをここで定義せよ

 // 2. ここに関数修飾詞を追加すること
  function approve(address _to, uint256 _tokenId) public {
    // 3. ここに関数を定義すること
  }
```

#### 解答

```
// 1. マッピングをここで定義せよ
  mapping (uint => address) zombieApprovals;

// 2. ここに関数修飾詞を追加すること
    function approve(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
      // 3. ここに関数を定義すること
      zombieApprovals[_tokenId] = _to;
      Approval(msg.sender, _to, _tokenId);
    }
```

### 5-8
#### 問題
1. 初めに、requireステートメントを使って、zombieApprovalsでキーが_tokenIdの場合1にmsg.senderと同等となるようにせよ。  
こうしてもしmsg.senderがトークンを受け取ることが承認されていなかった場合、エラーが投げられる。

1. _transfer関数を呼び出すには、トークン所有者のアドレスを知る必要がある。(_fromの引数として必要だ)。このアドレスはownerOf関数で参照可能だ。  
ではownerというaddress変数を宣言し、それがownerOf(_tokenId)と同等となるようにせよ。

1. 最後に、_transfer関数を呼び出して、必要な情報全てを渡せ。(ここでは、_toの引数にmsg.senderを使う。なぜなら関数を呼び出しているのは、トークンが送られるべき者だからだ)。

```
function takeOwnership(uint256 _tokenId) public {
    // ここから始めるのだ
  }
```

#### 解答
```
function takeOwnership(uint256 _tokenId) public {
// ここから始めるのだ
    require(zombieApprovals[_tokenId] == msg.sender);
    address owner = ownerOf(_tokenId);
    _transfer(owner, msg.sender, _tokenId);
  }
```

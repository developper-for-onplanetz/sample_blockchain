const Web3 = require('web3');
const solc = require('solc');
const fs = require('fs');
const ethabi = require('ethereumjs-abi');
const commandLineArgs = require('command-line-args');
const HDWalletProvider = require('truffle-hdwallet-provider');
const async = require('async');

const SolidityFunction = require('web3/lib/web3/function.js');
const sha3 = require('web3/lib/utils/sha3.js');
const coder = require('web3/lib/solidity/coder.js');
const Tx = require('ethereumjs-tx');

const abijson = './etherdelta_abi.json';
const contractName = 'EtherDelta';

var accessToken = 'your infura access token';
//providerの設定
const provider = new Web3.providers.HttpProvider(
   "https://ropsten.infura.io/" + accessToken
	)
const web3 = new Web3(provider);

const contract_address = 'your etherdelta contract address'
const eth_address = "0x0000000000000000000000000000000000000000"

//トランザクションに関する基本関数--------------------------------------------------------------------------

//トランザクションの送金
function sendTransaction(rawTx, prirate_str){
   //送金前に署名する
   var signedTx = signTx(rawTx, prirate_str);
   console.log("exec send...")
   web3.eth.sendRawTransaction('0x' + signedTx.toString('hex'), function(err, hash) {
   if (!err)
      console.log(hash);
   else
      console.log(err);
  });
}

//コントラクトの関数コール
function callFunc(rawTx, prirate_str){
   //送金前に署名する
   var signedTx = signTx(rawTx, prirate_str);
   console.log("exec send...")
   web3.eth.sendRawTransaction('0x' + signedTx.toString('hex'), function(err, hash) {
   if (!err)
      console.log(hash);
   else
      console.log(err);
  });
}

function setTransaction(data, from_account, to_account, value){
  console.log("get send configuration...")
  var count = web3.eth.getTransactionCount(from_account);
  console.log(count)

  var gasPrice = 30000;
  var gasLimit = 5500000;

  // トランザクションのフォーマットに沿って、gasや宛先など、detaも当てはめ
  console.log("transaction configuration...")
  var rawTransaction = {
    "from": from_account,
    "nonce": web3.toHex(count),
    "gasPrice": web3.toHex(gasPrice),
    "gasLimit": web3.toHex(gasLimit),
    "to": to_account,
    "value": web3.toHex(value),
    "data": data,
    "chainId": 0x03
  };
  //return忘れないように（忘れるとerror transaction underpricedが発生）
  return rawTransaction
}

// トランザクションに秘密鍵で署名する
function signTx(rawTx, privStr){
  var privKey = new Buffer(privStr, 'hex');
  var tx = new Tx(rawTx);
  tx.sign(privKey);
  var serializedTx = tx.serialize();
  return serializedTx;
}

//---------------------------------------------------------------------------------------------

//etherdelta上の関数--------------------------------------------------------------------------

//Ethの預金
function execDepositEth(contract, from_account, to_account, value, privstr){
   //実行メソッドを指定するためのバイナリ(MethodIDと言われるもの)を作成
   var data = contract.deposit.getData();
   console.log(data)
   //"データ"をトランザクションに設定する
   var rawTx = setTransaction(data, from_account, to_account, value);
   console.log(rawTx)
   //トランザクションを送る
   sendTransaction(rawTx, privstr);
}

//ethereum以外のトークンの預金
function execDepositToken(contract, contractTokenAddr, from_account, to_account, value, privstr){
   //"データ"と言われる実行メソッドを指定するためのバイナリ(MethodIDと言われるもの)を作成
   var data = contract.depositToken.getData(contractTokenAddr, value, {from: from_account});
   console.log(data)
   //"データ"をトランザクションに設定する
   value = 0
   var rawTx = setTransaction(data, from_account, to_account, value);
   console.log(rawTx)
   //トランザクションを送る
   sendTransaction(rawTx, privstr);
}

//order関数
function execOrderToken(contract, tokenGet, amountget, tokenGive, amountGive, expires,
  orderNonce, from_account, to_account, privstr){
   //"データ"と言われる実行メソッドを指定するためのバイナリ(MethodIDと言われるもの)を作成
   var data = contract.order.getData(tokenGet, amountget, tokenGive, amountGive, expires, orderNonce);
   console.log(data)
   //"データ"をトランザクションに設定する
   value = 0
   var rawTx = setTransaction(data, from_account, to_account, value);
   console.log(rawTx)
   //トランザクションを送る
   sendTransaction(rawTx, privstr);
}

//trade関数
function execTradeToken(contract, tokenGet, amountget, tokenGive, amountGive,
  expires, orderNonce, order_account, trade_amount, from_account, to_account, privstr){
   //"データ"と言われる実行メソッドを指定するためのバイナリ(MethodIDと言われるもの)を作成
   var data = contract.trade.getData(tokenGet, amountget, tokenGive, amountGive,
     expires, orderNonce, order_account, 0, '0x0', '0x0', trade_amount, { gas: 1000000, value: 0 });
   console.log(data)
   //"データ"をトランザクションに設定する
   value = 0
   var rawTx = setTransaction(data, from_account, to_account, value);
   console.log(rawTx)
   //トランザクションを送る
   sendTransaction(rawTx, privstr);
}

//トークン上の関数----------------------------------------------------------------------------

//approve処理に必要な分の関数の定義
let minABI = [
{
    "constant": false,
    "inputs": [
        {
            "name": "_spender",
            "type": "address"
        },
        {
            "name": "_value",
            "type": "uint256"
        }
    ],
    "name": "approve",
    "outputs": [
        {
            "name": "",
            "type": "bool"
        }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}
]

//トークンの預金に必要なapprove処理の実行
function approveToken(token_contract, token_address, from_account, value, privstr){
   //"データ"と言われる実行メソッドを指定するためのバイナリ(MethodIDと言われるもの)を作成
   var data = token_contract.approve.getData(contract_address, value, {from: from_account});
   console.log(data)
   var to_account = token_address
   //"データ"をトランザクションに設定する
   var rawTx = setTransaction(data, from_account, to_account, value);
   console.log(rawTx)
   //トランザクションを送る
   sendTransaction(rawTx, privstr);
}

//---------------------------------------------------------------------------------------------


//solidity fileの読み込み
fs.readFile(abijson, (errRead, data) => {
  const abi = JSON.parse(data);

  const etherdelta_contract = web3.eth.contract(abi).at(contract_address);
  // console.log(etherdelta_contract)
  //トークンの送付量(ETH)
  var amount = 1e18
  //送付トークンのコントラクトアドレス
  var contractTokenAddr = 'token contract address'
  let token_contract = web3.eth.contract(minABI).at(contractTokenAddr);
  //送付トークンの所有者のアドレス
  var senderAddress_1 = "your address"

  var privStr_1 = 'your private key'

  //トークンのdeposit
  //ethのdeposit
  execDepositEth(etherdelta_contract, senderAddress_1, contract_address, amount, privStr_1)

  //eth以外のトークンをdepositするために、予めトークンを移動できるように承認することが必要
  var approve_value_1 = 1000e18
  approveToken(token_contract, contractTokenAddr, senderAddress_1, approve_value_1, privStr_1)
  execDepositToken(etherdelta_contract, contractTokenAddr, senderAddress_1, contract_address, approve_value_1, privStr_1)


  //orderの実行
  var tokenGet_1 = contractTokenAddr
  var amountGet_1= 900e18
  var tokenGive_1 = eth_address
  var amountGive_1 = 4e17
  var expires = 10000
  var orderNonce = 1

  execOrderToken(etherdelta_contract, tokenGet_1, amountGet_1, tokenGive_1, amountGive_1, expires, orderNonce, senderAddress_1, contract_address, privStr_1)

});

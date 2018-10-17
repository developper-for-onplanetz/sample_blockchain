# etherdelta_testcode

## environment
-  node v9.11.1
-  npm 5.6.0
-  metamask(ropsten network)
-  infura(ropsten network)
-  python2.7.X (required for node-gyp rebuild)

## documents
https://www.slideshare.net/takuyamatsumoto714/dexresearch?qid=fc4f2717-c9d0-4ba8-b483-2fe64b0a7f93&v=&b=&from_search=1

## set up

### clone this repository to local environment

```
git clone https://github.com/takmorefun/etherdelta_testcode.git
```
### install node module

```
cd /path/to/your/etherdelta/directory
npm install
```

### how to deploy
- change deploy.js file according to your metamask and infura environment
```
var mnemonic = 'your mnemonic';
  var accessToken = 'your infura access token';
  const provider = new HDWalletProvider(
      mnemonic,
      "https://ropsten.infura.io/" + accessToken
  );
  const web3 = new Web3(provider);
```
- exec deploy
```
node deploy.js --address="your address" --admin="your address" --feeAccount="your address" --accountLevelsAddr="your address"  --sendImmediately=True
```



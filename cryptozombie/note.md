### solidityのバージョンアップに伴う注意点

> string型、struct型、array型について
- memoryかstorageのどちらに要素を確保するかが重要
- 発生エラー（TypeError: Data location must be "storage" or "memory" for parameter in function, but none was given.）

>  Event invocations have to be prefixed by "emit".
- このエラー発生時は、event関数の呼び出しにあたり、emitをつける必要があるという内容なので、emit
を付与する
[参考](https://y-nakajo.hatenablog.com/entry/2018/07/12/140223)

>  TypeError: Invalid type for argument in function call. Invalid implicit conversion from string memory to bytes memory requested. This function requires a single bytes argument. Use abi.encodePacked(...) to obtain the pre-0.5.0 behaviour or abi.encode(...) to use ABI encoding.
- abi.encodePacked()を使用して、string memoryをbytes memoryに変換する

>  TypeError: Member "balance" not found or not visible after argument-dependent lookup in contract ZombieHelper. Use "address(this).balance" to access this address member.

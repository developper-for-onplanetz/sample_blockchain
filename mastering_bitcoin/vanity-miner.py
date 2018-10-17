#Vanity miner (searching for an address containing a certain string)
import bitcoin
import os
import codecs

search = '1kid'

while True:
	secret = os.urandom(32)
	address = bitcoin.privkey_to_address(secret)
	if search in address:
		break

print('Found vanity address! ', address)
print('Secret: ', codecs.encode(secret, 'hex').decode())
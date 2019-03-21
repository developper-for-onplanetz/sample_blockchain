from bs4 import BeautifulSoup
from urllib.request import urlopen
import csv
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

html = urlopen("https://www.data-artist.com/contents/ai-company-list.html")
data = html.read()
html = data.decode('utf-8')

soup = BeautifulSoup(html, 'html.parser')

#各カテゴリー名を取得
tag = soup.select("body > div.wrapper > div.scrolls2 > div.scrolls2-oveflow > div > div > div.contents > a")
ids = []
titles = []
for i in tag:
	id = i.attrs["href"]
	text = i.text
	ids.append(id)
	titles.append(text)

#各カテゴリーの持つ会社の数を差分で計算
category_nums = {}
total = 0
for i in range(len(ids)):
	if i == 0:
		pass
	else:
		a = ids[i - 1]
		b = ids[i]
		a_length = len(soup.select(f"{a} ~ .company"))
		b_length = len(soup.select(f"{b} ~ .company"))
		nums = a_length - b_length
		total = total + nums
		category_nums[f"{titles[i - 1]}"] = nums
		if i == len(ids) - 1:
			total = total + b_length
			category_nums[f"{titles[i]}"] = b_length

df = pd.DataFrame(columns=["category","name","link","explanation"])

#データフレームに追加
for i in range(len(ids)):
	onlyCategory = pd.Series([titles[i],f'{category_nums[f"{titles[i]}"]}社',"",""], index=df.columns)
	df = df.append(onlyCategory, ignore_index=True)
	
	links = soup.select(f"{ids[i]} ~ div > ul > li.text > div.name > a")
	ex = soup.select(f"{ids[i]} ~ div > div.detail")

	for i in range(category_nums[f"{titles[i]}"]):
		href = links[i].attrs['href']
		text = links[i].text
		explanation = ex[i].text.replace(" ","") 
		add = pd.Series(["",text, href,explanation], index=df.columns)
		df = df.append(add, ignore_index=True)

#円グラフ作成
x = np.array(list(category_nums.values())[0:-1])

'''
#matplotlibの日本語対応操作をしていない人はこのコメントアウトを取り消してください
label = []
for id in ids:
	name = id.replace("#","")
	label.append(name)
label.pop(-1)
'''

'''
"matplotlibの日本語対応操作をした人はこのコメントアウトを取り消してください
label = list(category_nums.keys())[0:-1]
'''

plt.pie(x, labels=label)
#その他を除く
plt.show()

df.to_excel('AI_research_scraping.xlsx', encoding='utf8')




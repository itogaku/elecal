#!/bin/sh
# src/app.html + src/script.js から 2つのファイルを作る
#  index.html        … ブラウザで直接開いて印刷できる版（印刷ボタンあり）
#  dist/preview.html … プレビュー公開用（印刷ボタンなし）
cd "$(dirname "$0")"
mkdir -p dist
python3 - << 'PY'
src=open('src/app.html',encoding='utf-8').read().replace('/*SCRIPT*/',open('src/script.js',encoding='utf-8').read().replace('/*GRADES*/',open('src/grades.js',encoding='utf-8').read()).replace('/*MORE*/',open('src/more.js',encoding='utf-8').read()+'\n'+open('src/more2.js',encoding='utf-8').read()+'\n'+open('src/more3.js',encoding='utf-8').read()+'\n'+open('src/more4.js',encoding='utf-8').read()+'\n'+open('src/more5.js',encoding='utf-8').read()+'\n'+open('src/more7.js',encoding='utf-8').read()+'\n'+open('src/more6.js',encoding='utf-8').read()))
import re
page='<!doctype html>\n<html lang="ja">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n</head>\n<body>\n'+src+'\n</body>\n</html>\n'
open('index.html','w',encoding='utf-8').write(page)
prev=re.sub(r'<!--PRINT-->.*?<!--/PRINT-->','',src,flags=re.S).replace('<!--PREVIEW_NOTE-->','<p class="note">この画面はプレビューです。印刷するときは index.html をブラウザで開き「印刷する」を押してください。</p>')
open('dist/preview.html','w',encoding='utf-8').write(prev)
PY
echo built

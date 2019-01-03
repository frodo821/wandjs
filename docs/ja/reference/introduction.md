---
title: wand.jsの始め方 wand.js日本語リファレンス
---

# wand.jsの始め方

## 導入しよう

```html
<!DOCTYPE html>
<html>
    <head>
        <script src="wand.js"></script>
    </head>
    <body>
        <main id="app">
            <!--あなたのページの内容-->
        </main>
        <script>setup('#app')</script>
    </body>
</html>
```
コアの導入は こ れ だ け で完了します！ 次に、ページのコンテンツを作りましょう。

リンクは自動的にSPAリンクに書き換えが行われます。

```html
<!DOCTYPE html>
<html>
    <head>
        <script src="wand.js"></script>
    </head>
    <body>
        <main id="app">
            <a href="/test.html">test (サイト内リンク)</a>
        </main>
        <script>setup('#app')</script>
    </body>
</html>
```
もし、書き換えをしたくないリンクの場合は`http://`または`https://`を含むフルパスにしましょう。ほかのやり方としては、`data-no-rewrite`属性をセットするというやり方もあります。

```html
<!DOCTYPE html>
<html>
    <head>
        <script src="wand.js"></script>
    </head>
    <body>
        <main id="app">
            <a href="/test.html">test (フレームワークが読み込むリンク)</a>
            <a href="http://yoursite.com/test.html">test (ブラウザが読み込むリンク)</a>
            <a href="/test.html" data-no-rewrite>test (これもブラウザが読み込むリンク)</a>
        </main>
        <script>setup('#app')</script>
    </body>
</html>
```

ページの読み込みに際して、フェードインやフェードアウトのアニメーションを設定することもできます。
自分でやる場合は、[`prepareload`](events.md#prepareload)や[`load`](events.md#load)イベントにリスナーをセットすればページのアンロード、ロード時に処理を入れることができます。

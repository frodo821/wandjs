---
title: ユーティリティ関数 wand.js日本語リファレンス
---

# ユーティリティ関数

## getSelector(elem: Element): string
指定した要素のみを指定するCSSセレクタを返します。
idが指定されている場合、`#id`を返します。

## waitForEvent(element: EventTarget, event: string): Promise<Event>
指定した`EventTarget`オブジェクトに指定したイベントが発生するまで待つ`Promise`を返します。

## sleep(msec: number): Promise<void>
指定した時間待つ`Promise`を返します。時間はミリ秒単位を整数で指定してください。

## waitForAnimationFrame(): Promise<number>
次のアニメーションフレームまで待つ`Promise`を返します。
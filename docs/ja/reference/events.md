# コアイベントの一覧

- [コアイベントの一覧](#コアイベントの一覧)
  - [destroy](#destroy)
  - [load](#load)
  - [loadfailed](#loadfailed)
  - [latetick](#latetick)
  - [prepareload](#prepareload)
  - [tick](#tick)
  - [wakeup](#wakeup)

![lifecycle](../../lifecycle.png)

## destroy
ページが破棄されるときに発生するイベント。

## load
ページのロードが完了したときに発生するイベント。[`wakeup`](#wakeup)イベントの直前に発生する。

## loadfailed
ページのロードに失敗したときに発生するイベント。`Event.detail`に[`PageLoadError`](errors.md#pageloaderror)のインスタンスがセットされる。

## latetick
毎フレーム、[`tick`](#tick)イベントの後に発生するイベント。

## prepareload
ページのロードを開始するときに発生するイベント。

## tick
毎フレーム発生するイベント。`requestAnimationFrame`のタイミングで発生する。

## wakeup
フレームワークが初期化されたときに発生するイベント。
ページ遷移後、[`load`](#load)イベントの後にも発生する。

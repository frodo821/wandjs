# コアイベントの一覧

- [コアイベントの一覧](#コアイベントの一覧)
  - [destroy](#destroy)
  - [load](#load)
  - [loadfailed](#loadfailed)
  - [wakeup](#wakeup)

![lifecycle](../../lifecycle.png)

## destroy
ページが破棄されるときに発生するイベント。

## load
ページのロードが完了したときに発生するイベント。[`wakeup`](#wakeup)イベントの直前に発生する。

## loadfailed
ページのロードに失敗したときに発生するイベント。`Event.detail`に[`PageLoadError`](errors.md#pageloaderror)のインスタンスがセットされる。

## wakeup
フレームワークが初期化されたときに発生するイベント。
ページ遷移後、[`load`](#load)イベントの後にも発生する。

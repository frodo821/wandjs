# コアエラーの一覧

- [コアエラーの一覧](#コアエラーの一覧)
  - [WandError](#wanderror)
  - [FrameworkUninitializedError](#frameworkuninitializederror)
  - [PageLoadError](#pageloaderror)

## WandError
すべてのフレームワークエラーの基底クラス。

## FrameworkUninitializedError
フレームワークが初期化されていない、または正常に初期化できていないにもかかわらず、フレームワークの機能を使おうとしたときに発生するエラー。

## PageLoadError
ページ遷移に失敗したときにスローされるエラー。
[`loadfailed`](events.md#loadfailed)の`detail`属性にも同じものがセットされる。
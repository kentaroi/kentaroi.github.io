---
title: DartとFlutterを学ぶための技術書について２
date: 2023-03-30T23:00:00+09:00
tags: ['blog', 'Dart', 'Flutter', '技術書', '開発日記']
---
１ヶ月ブログを休んでしまった。

何か意味のあることを書こうとした結果、書けなくなった。書いているうちに「これを書いて意味があるのか？」とか考え出すともうだめである。

だから、これからは意味のあることを書かないことにした。

前回、DartとFlutterの技術書を列挙したが、読んでみた結果、以下の３冊が良かった。

- [Jonathan Sande, *Dart Apprentice: Fundamentals*, (Kodeco Inc., 2022)](https://amzn.asia/d/g3r1gVp)
- [Jonathan Sande, *Dart Apprentice: Beyond the Basics*, (Kodeco Inc., 2022)](https://amzn.asia/d/h0XmfPW)
- [Michael Katz, Kevin David Moore & Vincent Ngo, *Flutter Apprentice* (Razeware LLC., 2022)](https://amzn.asia/d/dBNcqpW)

Flutter Apprenticeは、最後のプラットフォーム別の部分はまだ読んでいないが、だいたい良かった。

ただ、問題は、画面遷移には`go_router`、状態管理には`provider`、DBライブラリは`moor`を使っている点で、`go_router`はFlutterに取り込まれたパッケージなのでこれを使っているのは自然なのだが、単純な画面遷移は問題なくても、ネストした複雑なものを作ろうとするとまだ機能が足りていないというようなことをRedditで読んだので、実際の開発に使っていいものか迷っている。ノートアプリの開発には`Beamer`か`AutoRoute`を選ぶかもしれない。

`provider`は`Riverpod`という改善されたものが出ているので、そっちを使いたい。他にも多数状態管理のためのライブラリがあるらしく悩ましいが、とりあえず`Riverpod`を使ってみようと思う。

`moor`はAndroidアプリ開発に使う`Room`のFlutter版という位置付けらしく、`Room`を逆さにして`moor`らしい。あと、すでにパッケージ名が変わっていて、今は後継版の`drift`を使うことが推奨されている。

そういう訳で、アプリ開発で骨組みとなるようなところの解説が、微妙に古いライブラリや使わなさそうなライブラリをベースに行われていて、おまけにそれぞれの解説も非常に薄いというか、さらっと書かれてるので、この本をもってFlutterをマスターとは到底言えないというのが、読んでみての正直な感想である。ただまぁ、Flutterのようなまだまだ変更の多いフレームワークの解説書が存在するだけでありがたい訳だし、とりあえずお手本に従ってアプリを組んで感覚をつかむという点では非常に良い本だったと思う。

本を読んだ後何をしていたかということはまた別の記事で。

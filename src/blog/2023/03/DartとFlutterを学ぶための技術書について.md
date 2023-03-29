---
title: DartとFlutterを学ぶための技術書について
date: 2023-03-01T18:30:00+09:00
tags: ['blog', 'Dart', 'Flutter', '技術書', '開発日記']
redirect_from: /2023/03/books-to-learn-dart-and-flutter
---
[ノートアプリを開発することに決めた](/2023/02/new-project/)が、まだ開発を始めることができていない。

というのも、アプリを開発するのに使う予定のFlutterを勉強中だからで、これがiOSだけのアプリで良いのなら既にSwiftで書き始めているところだが、今回はそういう訳にはいかない。マルチプラットフォームでアプリを出すためには、そしてそれを個人で短期間でやるとなればFlutterをどうしても使いたいのだ。

ところで僕は、プログラミング関係であるか否かを問わず、何でも本で勉強するのが好きで、いつも（電子ブックではなく）紙の書籍を買ってマーカーを引きながら、たまにメモを書き込みながら読んで勉強している。今回もそのつもりでDartやFlutterの本を買い集めたのだが、正直あまりうまくいっていない。

というのも、FlutterもDartもまだ若く変化が激しいからで、まともに本が出版されていないし、されていてもほとんどの本が既に陳腐化してしまっており内容が現在のFlutterやDartに当てはまらなくなってしまっているのだ。

なので今日のブログは要は泣き言である。2回目にして泣き言とは情けない。

以下の内容は端的に言えば「つらい」ということで、読む価値はありません。ここまで読んでくださってありがとうございました。FlutterやDartの本を探している人は読むと少しは参考になることもあるかもしれません。

### さらに勉強を進めた結果、特にFlutterの本に関して下記の評価を改めなければならないと感じつつある。もう少しFlutterについて理解を深めた後に改めて記事を書き直したいが、基本的には*Flutter Apprentice*をおすすめしたい。(2023年3月4日）

購入した書籍[^1]：
1. [Jonathan Sande, *Dart Apprentice: Fundamentals*, (Kodeco Inc., 2022)](https://amzn.asia/d/g3r1gVp)
2. [Jonathan Sande, *Dart Apprentice: Beyond the Basics*, (Kodeco Inc., 2022)](https://amzn.asia/d/h0XmfPW)
3. [Chris Buckett, *Dart in Action* (Manning Publications Co., 2013)](https://amzn.asia/d/dEqa9SV)
4. [Michael Katz, Kevin David Moore & Vincent Ngo, *Flutter Apprentice* (Razeware LLC., 2022)](https://amzn.asia/d/dBNcqpW)
5. [Eric Windmill, *Flutter in Action* (Manning Publications Co., 2020)](https://amzn.asia/d/3yqsQE7)

1~3まではDartの本で、4と5はFlutterの本である。また、1,2,4は[Kodeco](https://www.kodeco.com/)（旧raywenderlich）という有料のチュートリアル記事をたくさん出しているサイトの本で、3と5は[Manning](https://www.manning.com/)というおそらく最も信頼のおける技術書の出版社のひとつによるものである。

既に1と2の本を読み終えたが、プログラミング初心者向けとしてなら、これらの本は悪くない。説明も適切であり、読んでいて僕が疑問に思ったことはたいていその後に説明があるなど、解説に気配りが感じられ好感が持てた。ただ、残念ながら、すでに他言語で経験のあるプログラマにとって説明は冗長であり、内容も深くない。中身が価格に見合っていない。ともあれ、最新のDartに追従した解説書は貴重であり、そういう意味ではこれぐらいしか選べる本がないとも言える。

3はManningの本だが、やはり古すぎた。買う意味はないと思う。

4は上に述べたようにKodecoのFlutter解説本で、チュートリアル形式で進むが、指示が多く解説は少ない。これは必ずしも悪い訳ではない。スマホアプリを開発したことのない人にとっては手を動かして感覚を掴むことこそが最も大事なことのひとつだからだ。ただ、僕は途中で我慢ができなくなり、読むのを止め、現在、5のFlutter in Action (Manning)を読み進めているところである。

5の本はさすがManningというべきか、解説は非常に良い。しかし、やはり古い。サンプルコードをGitHubのリポジトリから落としたが、Android StudioでGradleのSyncができずに詰まってしまい、詳しくない僕はSyncを諦め、別のディレクトリで`flutter create`してから、サンプルコードの`lib`ディレクトリと`assets`ディレクトリをコピーし、`pubspec.yaml`を修正することにした。これはうまくいったのだが、サンプルコードがDartにnull安全が入る以前のものであるため、全面的にコードを見直し、修正する必要があった。また`RaisedButton`を`ElevatedButton`に、`FlatButton`を`TextButton`に置き換えるなどの修正も必要だった。この修正の過程自体は勉強にもなって悪くない経験だったが、ここまでサンプルコードに修正が必要だと他人に薦めづらいと感じた。ただ、SwiftやKotlinなどのnull安全の概念が入った言語を使ったことがあるのなら、サンプルコードの修正はそれほど難しくないと思う。

まだFlutterの全体を把握しきれていない今の時点での感想だが、

Kodecoの本は３冊とも、プログラミング初心者を対象としているかのような丁寧さで、おそらくプログラムを一度も組んだことのない人がいっちょFlutterで一発当ててやるかと思った際には、一番フィットする本だと思う。

Kodecoの本の内容は大雑把に言えば、[Big Nerd RanchのiOSアプリやAndroidアプリ開発の本](https://bignerdranch.com/books/)に似ている。Big Nerd Ranchの本が好きなら、（価格は高く、クオリティもBNRの本に比べると見劣りしてしまう気がするが、）もしかすると気に入るかもしれない。

サンプルコードの修正の手間を分かった上でなら、5のFlutter in Action (Manning, 2020年1月出版)を買っても良いかもしれない。
だが、一般的には、FlutterやDartの本はnull安全が入った2020年夏以降のものを選ぶのが無難だと思う。

実は昨年末にO'Reillyから[Flutter & Dart Cookbook](https://amzn.asia/d/4k7CT7g)という本が出ている。Cookbookだからまぁいいかと買わなかったが、もしかするとこの本を買うのが正解だったのかもしれない……とちょっと後悔をしている。

ただ、もう本はいい。

数万円を溶かして得たやや心許ない知識を元に、その都度必要な知識を吸収しつつアプリ開発を進めていこうと思う。

[^1]: Amazonへのリンクにしたが、これは今のところAmazonにレビューが一番集まっていることが多いからで、洋書を買うのに必ずしもAmazonをおすすめしない。ただし、Kodecoの本に関してはAmazonによるオンデマンド印刷なので、Amazonで買うのが一番きれいに届くと思う。

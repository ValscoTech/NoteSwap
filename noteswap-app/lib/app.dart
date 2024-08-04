import 'package:flutter/material.dart';
import 'package:noteswap/routes.dart';

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    // TODO: change theme logic
    // TODO: auth root logic
    var brightness = MediaQuery.of(context).platformBrightness;
    return MaterialApp.router(
      debugShowCheckedModeBanner: false,
      title: "NoteSwap",
      theme: brightness == Brightness.dark ? ThemeData.dark() : ThemeData.light(),
      routerConfig: router,
    );
  }
}
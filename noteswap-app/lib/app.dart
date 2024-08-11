import 'package:flutter/material.dart';
import 'package:noteswap/routes.dart';
import 'package:noteswap/theme.dart';

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    var brightness = MediaQuery.of(context).platformBrightness;
    return MaterialApp.router(
      debugShowCheckedModeBanner: false,
      title: "NoteSwap",
      theme: brightness == Brightness.dark ? darkTheme : lightTheme,
      routerConfig: router,
    );
  }
}

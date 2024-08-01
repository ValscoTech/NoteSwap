import 'package:flutter/material.dart';
import 'package:noteswap/auth/views/auth_page.dart';

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    // TODO: change theme logic
    // TODO: auth root logic
    // TODO: Router setup
    var brightness = MediaQuery.of(context).platformBrightness;
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: "Book Keeper",
      theme: brightness == Brightness.dark ? ThemeData.dark() : ThemeData.light(),
      home:  const AuthPage(),
    );
  }
}
import 'package:flutter/material.dart';

final lightTheme = ThemeData(
  fontFamily: 'ClashDisplay',
  visualDensity: VisualDensity.adaptivePlatformDensity,
  useMaterial3: true,
  colorScheme: const ColorScheme(
    brightness: Brightness.light,
    primary: Color.fromRGBO(255, 255, 255, 1),
    onPrimary: Colors.white38,
    secondary: Color.fromRGBO(181, 148, 205, 1),
    onSecondary: Colors.black54,
    error: Colors.red,
    onError: Colors.redAccent,
    surface: Colors.black,
    onSurface: Colors.grey,
  ),
);

final darkTheme = ThemeData(
  fontFamily: 'ClashDisplay',
  visualDensity: VisualDensity.adaptivePlatformDensity,
  useMaterial3: true,
  colorScheme: const ColorScheme(
    brightness: Brightness.dark,
    primary: Color.fromRGBO(0, 0, 0, 1),
    onPrimary: Colors.black54,
    secondary: Color.fromRGBO(181, 148, 205, 1),
    onSecondary: Colors.white,
    error: Colors.red,
    onError: Colors.redAccent,
    surface: Colors.white,
    onSurface: Colors.grey,
  ),
);

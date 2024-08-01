import 'package:flutter/material.dart';

final lightTheme = ThemeData(
  fontFamily: 'ClashDisplay',
  textTheme: const TextTheme(
    headlineLarge: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
    headlineMedium: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
    headlineSmall: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
    titleLarge: TextStyle(fontSize: 22, fontWeight: FontWeight.w600),
    titleMedium: TextStyle(fontSize: 20, fontWeight: FontWeight.w600),
    titleSmall: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
    bodyLarge: TextStyle(fontSize: 16, fontWeight: FontWeight.normal),
    bodyMedium: TextStyle(fontSize: 14, fontWeight: FontWeight.normal),
    bodySmall: TextStyle(fontSize: 12, fontWeight: FontWeight.normal),
  ),
  visualDensity: VisualDensity.adaptivePlatformDensity,
  useMaterial3: true,
  colorScheme: const ColorScheme(
    brightness: Brightness.light,
    primary: Color.fromRGBO(255, 255, 255, 1),
    onPrimary: Colors.white38,
    secondary: Color.fromRGBO(181, 148, 205, 1),
    onSecondary: Colors.black,
    error: Colors.red,
    onError: Colors.redAccent,
    surface: Colors.black,
    onSurface: Colors.white70,
  ),
);

final darkTheme = ThemeData(
  fontFamily: 'ClashDisplay',
  textTheme: const TextTheme(
    headlineLarge: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
    headlineMedium: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
    headlineSmall: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
    titleLarge: TextStyle(fontSize: 22, fontWeight: FontWeight.w600),
    titleMedium: TextStyle(fontSize: 20, fontWeight: FontWeight.w600),
    titleSmall: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
    bodyLarge: TextStyle(fontSize: 16, fontWeight: FontWeight.normal),
    bodyMedium: TextStyle(fontSize: 14, fontWeight: FontWeight.normal),
    bodySmall: TextStyle(fontSize: 12, fontWeight: FontWeight.normal),
  ),
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
    onSurface: Colors.white70,
  ),
);


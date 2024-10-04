import 'dart:math';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'dart:async';
import 'package:go_router/go_router.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    _checkSession();
  }

  Future<void> _checkSession() async {
    final prefs = await SharedPreferences.getInstance();
    final accessToken = prefs.getString('access_token');
    final expiresAt = prefs.getInt('expires_at');
    if (kDebugMode) {
      print(accessToken);
      print(expiresAt);
    }

    if (accessToken == null || expiresAt == null) {
      Timer(const Duration(seconds: 3), () {
        if (mounted) {
          context.go('/board');
        }
      });
      return;
    }

    final currentTime = DateTime.now().millisecondsSinceEpoch ~/ 1000000;
    if (kDebugMode) {
      print(("currentTime $currentTime"));
    }
    if (currentTime < expiresAt) {
      Timer(const Duration(seconds: 3), () {
        if (mounted) {
          context.go('/settings');
        }
      });
    } else {
      Timer(const Duration(seconds: 3), () {
        if (mounted) {
          context.go('/board');
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final color = Theme.of(context).colorScheme;
    return Scaffold(
      backgroundColor: color.primary,
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Text(
                'Welcome to',
                style: TextStyle(
                  color: color.surface,
                  fontSize: 38,
                  fontWeight: FontWeight.w600,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 10),
              Text(
                'Noteswap',
                style: TextStyle(
                  color: color.surface,
                  fontSize: 38,
                  fontWeight: FontWeight.w600,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 50),
              Image.asset(
                'assets/onboard/onboard-main.png',
              ),
              const SizedBox(height: 80),
              Text(
                'Your Friend in Need',
                style: TextStyle(
                  color: color.surface,
                  fontSize: 32,
                  fontWeight: FontWeight.w500,
                ),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

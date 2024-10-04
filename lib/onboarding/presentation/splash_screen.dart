import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:noteswap/auth/repository/auth_repository.dart';

class SplashScreen extends ConsumerStatefulWidget {
  const SplashScreen({super.key});

  @override
  ConsumerState<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends ConsumerState<SplashScreen> {
  @override
  void initState() {
    super.initState();
    Future.delayed(Duration.zero, () {
      final user = ref.read(userStatusChangesProvider);
      user.when(
        data: (user) {
          if (mounted) {
            print(user);
            if (user == null) {
              Navigator.pushReplacementNamed(context, '/board');
            } else {
              Navigator.pushReplacementNamed(context, '/feed');
            }
          }
        },
        loading: () {},
        error: (err, stack) {},
      );
    });
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

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:noteswap/auth/repository/auth_repository.dart';
import 'package:noteswap/helper/initial_user_pfp.dart';

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
        data: (user) async {
          if (mounted) {
            if (user == null) {
              _navigateToBoard();
            } else {
              await checkUserProfileAndNavigate(context, user);
            }
          }
        },
        loading: () {},
        error: (err, stack) {},
      );
    });
  }

  void _navigateToBoard() {
    Navigator.pushReplacementNamed(context, '/board');
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

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:noteswap/auth/repository/auth_repository.dart';

class SettingsPage extends ConsumerWidget {
  const SettingsPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authRepository = ref.read(authImplRepositoryProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Settings'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () async {
            await authRepository.signOut();
            Navigator.pushReplacementNamed(context, '/board');
          },
          child: const Text('Sign Out'),
        ),
      ),
    );
  }
}

import 'package:flutter/material.dart';

class TopContainer extends StatelessWidget {
  final bool isSignUp;

  const TopContainer({super.key, required this.isSignUp});
  @override
  Widget build(BuildContext context) {
    final layout = MediaQuery.of(context).size;
    final color = Theme.of(context).colorScheme;
    return Container(
      alignment: Alignment.center,
      height: layout.height * 0.4,
      color: color.surface,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            isSignUp ? 'Sign Up' : 'Log In',
            style: TextStyle(
              fontSize: 32,
              fontFamily: 'ClashDisplay',
              fontWeight: FontWeight.bold,
              color: color.primary,
              height: MediaQuery.of(context).size.height * 0.25 * 0.01,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            'Are you ready to become a legal eagle?\nLogin to the app and spread your\nwings in the courtroom',
            textAlign: TextAlign.justify,
            style: TextStyle(
              fontSize: 18,
              fontFamily: 'ClashDisplay',
              fontWeight: FontWeight.w400,
              color: color.primary,
              letterSpacing: -0.9,
              height: 0,
            ),
          ),
        ],
      ),
    );
  }
}

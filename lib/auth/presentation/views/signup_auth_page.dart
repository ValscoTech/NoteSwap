import 'dart:io';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:noteswap/auth/controller/auth_controller.dart';
import 'package:noteswap/auth/presentation/widgets/custom_button.dart';
import 'package:noteswap/auth/presentation/widgets/top_container.dart';
import 'package:validators/validators.dart';

class SignUpAuthPage extends ConsumerStatefulWidget {
  const SignUpAuthPage({super.key});

  @override
  ConsumerState<SignUpAuthPage> createState() => _SignUpAuthPageState();
}

class _SignUpAuthPageState extends ConsumerState<SignUpAuthPage> {
  var isChecked = false;
  final TextEditingController nameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final formKey = GlobalKey<FormState>();
  @override
  void dispose() {
    nameController.dispose();
    emailController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  void isSignUpToggle() {
    setState(() {
      isChecked = false;
      formKey.currentState?.reset();
      FocusScope.of(context).unfocus();
    });
    Navigator.of(context).pushReplacementNamed('/login');
  }

  bool isPasswordVisible = false;
  void togglePasswordVisibility() {
    setState(() {
      isPasswordVisible = !isPasswordVisible;
    });
  }

  void handleSubmit() {
    if (!isChecked) {
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          title: const Text('Terms and Conditions'),
          content: const Text('You must agree to the terms and conditions.'),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('OK'),
            ),
          ],
        ),
      );
      return;
    }
    if (formKey.currentState!.validate()) {
      ref.read(authControllerProvider.notifier).signUpWithEmailAndPassword(
            nameController.text.trim(),
            emailController.text.trim(),
            passwordController.text.trim(),
          );
    }
  }

  @override
  Widget build(BuildContext context) {
    final layout = MediaQuery.of(context).size;
    final color = Theme.of(context).colorScheme;
    final platform = Platform.isIOS;
    final AsyncValue<void> state = ref.watch(authControllerProvider);
    ref.listen<AsyncValue>(
      authControllerProvider,
      (_, state) {
        if (!state.isLoading && state.hasError) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text(state.error.toString())),
          );
        } else if (!state.isLoading && state.hasValue) {
          setState(() {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Please Login to continue')),
            );
            isSignUpToggle();
          });
        }
      },
    );
    return Scaffold(
      body: Stack(
        children: [
          const TopContainer(
            isSignUp: true,
          ),
          SafeArea(
            child: Align(
              alignment: Alignment.bottomCenter,
              child: Container(
                height: layout.height * 0.68,
                decoration: BoxDecoration(
                  color: color.primary,
                  borderRadius: const BorderRadius.only(
                    topLeft: Radius.circular(32),
                    topRight: Radius.circular(32),
                  ),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Form(
                    autovalidateMode: AutovalidateMode.onUserInteraction,
                    key: formKey,
                    child: Column(
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            CustomButton(
                              path: 'assets/icons/google-icon.svg',
                              ltext: 'Google',
                              onPressed: () {
                                state.isLoading
                                    ? null
                                    : ref
                                        .read(authControllerProvider.notifier)
                                        .signInWithGoogle();
                              },
                            ),
                            CustomButton(
                              path: 'assets/icons/facebook-icon.svg',
                              ltext: 'Facebook',
                              onPressed: () {
                                // Handle Apple sign-in
                              },
                            ),
                          ],
                        ),
                        SizedBox(height: layout.height * 0.01),
                        Row(
                          children: [
                            Expanded(
                                child: Divider(
                              color: color.surface,
                            )),
                            Padding(
                              padding:
                                  const EdgeInsets.symmetric(horizontal: 8.0),
                              child: Text(
                                'Or',
                                style: TextStyle(
                                  fontSize: 14,
                                  fontWeight: FontWeight.w400,
                                  color: color.surface,
                                ),
                              ),
                            ),
                            Expanded(
                                child: Divider(
                              color: color.surface,
                            )),
                          ],
                        ),
                        SizedBox(height: layout.height * 0.01),
                        AuthFields(
                          nameController: nameController,
                          emailController: emailController,
                          passwordController: passwordController,
                          isPasswordVisible: isPasswordVisible,
                          togglePasswordVisibility: togglePasswordVisibility,
                        ),
                        SizedBox(height: layout.height * 0.01),
                        Row(
                          children: [
                            Checkbox(
                              focusColor: color.primary,
                              activeColor: color.surface,
                              checkColor: Colors.white,
                              side: BorderSide(
                                color: color.surface,
                                width: 2.0,
                              ),
                              value: isChecked,
                              onChanged: (bool? value) {
                                setState(() {
                                  isChecked = value!;
                                });
                              },
                            ),
                            Expanded(
                              child: Text(
                                'I agree to The Terms and Conditions and Privacy Policy.',
                                style: TextStyle(
                                    fontSize: 14,
                                    fontWeight: FontWeight.w400,
                                    color: color.surface),
                              ),
                            ),
                          ],
                        ),
                        ElevatedButton(
                          onPressed: handleSubmit,
                          style: ElevatedButton.styleFrom(
                            minimumSize: const Size(263, 60),
                            padding: const EdgeInsets.symmetric(
                                vertical: 18, horizontal: 24),
                            backgroundColor: color.secondary,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(15),
                            ),
                          ),
                          child: state.isLoading
                              ? (platform
                                  ? const CupertinoActivityIndicator()
                                  : CircularProgressIndicator(
                                      valueColor: AlwaysStoppedAnimation<Color>(
                                        color.surface,
                                      ),
                                    ))
                              : Text(
                                  'Create Account',
                                  style: TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.w500,
                                    color: color.surface,
                                  ),
                                ),
                        ),
                        SizedBox(height: layout.height * 0.01),
                        TextButton(
                          onPressed: () {
                            isSignUpToggle();
                          },
                          child: Text(
                            'Already have an Account? Login',
                            style: TextStyle(
                                color: color.surface,
                                fontFamily: 'ClashDisplay'),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class AuthFields extends StatelessWidget {
  final TextEditingController nameController;
  final TextEditingController emailController;
  final TextEditingController passwordController;
  final bool isPasswordVisible;
  final VoidCallback togglePasswordVisibility;

  const AuthFields({
    super.key,
    required this.nameController,
    required this.emailController,
    required this.passwordController,
    required this.isPasswordVisible,
    required this.togglePasswordVisibility,
  });

  InputDecoration _buildInputDecoration(String labelText, BuildContext context,
      {Widget? suffixIcon}) {
    final color = Theme.of(context).colorScheme;
    return InputDecoration(
      labelText: labelText,
      labelStyle: TextStyle(
        color: color.primary,
        fontSize: 16,
        fontWeight: FontWeight.w400,
      ),
      filled: true,
      fillColor: color.surface,
      contentPadding: const EdgeInsets.symmetric(vertical: 18, horizontal: 24),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: BorderSide.none,
      ),
      suffixIcon: suffixIcon,
    );
  }

  @override
  Widget build(BuildContext context) {
    final layout = MediaQuery.of(context).size;
    return Column(
      children: [
        TextFormField(
          controller: nameController,
          decoration: _buildInputDecoration('Name', context),
          validator: (value) {
            if (value == null || value.isEmpty) {
              return "Please enter your name";
            }
            return null;
          },
        ),
        SizedBox(height: layout.height * 0.01),
        TextFormField(
          controller: emailController,
          decoration: _buildInputDecoration('Email', context),
          validator: (value) {
            if (value == null || value.isEmpty) {
              return "Please enter your email";
            } else if (!isEmail(value)) {
              return "Please enter a valid email";
            }
            return null;
          },
        ),
        SizedBox(height: layout.height * 0.01),
        TextFormField(
          controller: passwordController,
          decoration: _buildInputDecoration(
            'Password',
            context,
            suffixIcon: IconButton(
              icon: Icon(
                isPasswordVisible ? Icons.visibility : Icons.visibility_off,
              ),
              onPressed: togglePasswordVisibility,
            ),
          ),
          validator: (value) {
            if (value == null || value.isEmpty) {
              return "Please enter your password";
            } else if (value.length <= 6) {
              return "Password must be at least 6 characters long";
            }
            return null;
          },
          obscureText: !isPasswordVisible,
        ),
      ],
    );
  }
}

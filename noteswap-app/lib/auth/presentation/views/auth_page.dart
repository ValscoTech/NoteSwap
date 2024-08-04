import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:noteswap/auth/controllers/auth_controller.dart';
import 'package:noteswap/auth/presentation/widgets/custom_button.dart';
import 'package:noteswap/auth/presentation/widgets/top_container.dart';
import 'package:validators/validators.dart';

class AuthPage extends ConsumerStatefulWidget {
  const AuthPage({super.key});

  @override
  ConsumerState<AuthPage> createState() => _AuthPageState();
}

class _AuthPageState extends ConsumerState<AuthPage> {
  var isChecked = false;
  final TextEditingController nameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final formKey = GlobalKey<FormState>();
  @override
  void dispose() {
    emailController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  bool isSignUp = false;
  void isSignUpToggle() {
    setState(() {
      // isSignUp = !isSignUp;
      isChecked = false;
      formKey.currentState?.reset();
      FocusScope.of(context).unfocus();
      isSignUp = !isSignUp;
    });
  }

  bool isPasswordVisible = false;
  void togglePasswordVisibility() {
    setState(() {
      isPasswordVisible = !isPasswordVisible;
    });
  }

  void handleSubmit() {
    if (isSignUp && !isChecked) {
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          title: const Text('Error'),
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
      if (isSignUp) {
        ref.read(authControllerProvider.notifier).signUpWithEmailAndPassword(
              nameController.text,
              emailController.text,
              passwordController.text,
            );
      } else {
        ref.read(authControllerProvider.notifier).signInWithEmailAndPassword(
              emailController.text,
              passwordController.text,
            );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final AsyncValue<void> authState = ref.watch(authControllerProvider);
    ref.listen<AsyncValue<void>>(authControllerProvider, (_, state) {
      if (!state.isLoading && state.error != null) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(state.error.toString()),
          ),
        );
      } // else if (!state.isLoading && state.hasValue) {
      //   //TODO: Logic yet to decide
      // }
    });

    return Scaffold(
      body: Stack(
        children: [
          TopContainer(
            isSignUp: isSignUp,
          ),
          SafeArea(
            child: Align(
              alignment: Alignment.bottomCenter,
              child: Container(
                height: MediaQuery.of(context).size.height * 0.68,
                decoration: const BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.only(
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
                              ltext: authState.isLoading
                                  ? const CupertinoActivityIndicator()
                                  : 'Google',
                              onPressed: () {
                                authState.isLoading
                                    ? null
                                    : ref
                                        .read(authControllerProvider.notifier)
                                        .signInWithGoogle();
                              },
                            ),
                            CustomButton(
                              path: 'assets/icons/google-icon.svg',
                              ltext: 'Facebook',
                              onPressed: () {
                                // Handle Apple sign-in
                              },
                            ),
                          ],
                        ),
                        SizedBox(
                            height: isSignUp
                                ? MediaQuery.of(context).size.height * 0.01
                                : MediaQuery.of(context).size.height * 0.025),
                        Row(
                          children: [
                            const Expanded(child: Divider()),
                            Padding(
                              padding:
                                  const EdgeInsets.symmetric(horizontal: 8.0),
                              child: Text(
                                'Or',
                                style: TextStyle(
                                  fontFamily: 'ClashDisplay',
                                  fontSize: 14,
                                  fontWeight: FontWeight.w400,
                                  color: Theme.of(context).colorScheme.surface,
                                ),
                              ),
                            ),
                            const Expanded(child: Divider()),
                          ],
                        ),
                        SizedBox(
                            height: isSignUp
                                ? MediaQuery.of(context).size.height * 0.01
                                : MediaQuery.of(context).size.height * 0.025),
                        AuthFields(
                          isSignUp: isSignUp,
                          nameController: nameController,
                          emailController: emailController,
                          passwordController: passwordController,
                          isPasswordVisible: isPasswordVisible,
                          togglePasswordVisibility: togglePasswordVisibility,
                        ),
                        SizedBox(
                            height: isSignUp
                                ? MediaQuery.of(context).size.height * 0.01
                                : MediaQuery.of(context).size.height * 0.04),
                        if (isSignUp)
                          Row(
                            children: [
                              Checkbox(
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
                                      fontFamily: 'ClashDisplay',
                                      fontSize: 14,
                                      fontWeight: FontWeight.w400,
                                      color: Theme.of(context)
                                          .colorScheme
                                          .onPrimary),
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
                            backgroundColor: const Color(0xFFB594CD),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(15),
                            ),
                          ),
                          child: Text(
                            isSignUp ? 'Create Account' : 'Login',
                            style: TextStyle(
                              fontSize: 16,
                              fontFamily: 'ClashDisplay',
                              fontWeight: FontWeight.w500,
                              color: Theme.of(context).colorScheme.onPrimary,
                            ),
                          ),
                        ),
                        SizedBox(
                            height: isSignUp
                                ? MediaQuery.of(context).size.height * 0.01
                                : MediaQuery.of(context).size.height * 0.025),
                        TextButton(
                          onPressed: () {
                            isSignUpToggle();
                          },
                          child: Text(
                            isSignUp
                                ? 'Already have an Account? Login'
                                : "Don't Have an account? SignUp",
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
  final bool isSignUp;
  final TextEditingController nameController;
  final TextEditingController emailController;
  final TextEditingController passwordController;
  final bool isPasswordVisible;
  final VoidCallback togglePasswordVisibility;

  const AuthFields({
    super.key,
    required this.isSignUp,
    required this.nameController,
    required this.emailController,
    required this.passwordController,
    required this.isPasswordVisible,
    required this.togglePasswordVisibility,
  });

  InputDecoration _buildInputDecoration(String labelText, BuildContext context,
      {Widget? suffixIcon}) {
    return InputDecoration(
      labelText: labelText,
      filled: true,
      fillColor: Theme.of(context).colorScheme.surface,
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
    return Column(
      children: [
        if (isSignUp)
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
        SizedBox(
            height: isSignUp
                ? MediaQuery.of(context).size.height * 0.01
                : MediaQuery.of(context).size.height * 0.02),
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
        SizedBox(
            height: isSignUp
                ? MediaQuery.of(context).size.height * 0.01
                : MediaQuery.of(context).size.height * 0.02),
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
            } else if (value.length < 8) {
              return "Password must be at least 8 characters long";
            }
            return null;
          },
          obscureText: !isPasswordVisible,
        ),
      ],
    );
  }
}

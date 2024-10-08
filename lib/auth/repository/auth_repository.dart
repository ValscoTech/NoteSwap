import 'dart:developer';

import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';
// import 'package:sign_in_with_apple/sign_in_with_apple.dart';

part 'auth_repository.g.dart';

@riverpod
Stream<User?> userStatusChanges(UserStatusChangesRef ref) {
  return FirebaseAuth.instance.authStateChanges();
}

abstract class AuthRepository {
  get currentUser => FirebaseAuth.instance.currentUser;
  Future<void> loginWithEmailAndPassword({
    required String email,
    required String password,
  });
  Future<void> signUpWithEmailAndPassword({
    required String name,
    required String email,
    required String password,
  });
  // Future<User> signInWithApple();
  Future<void> signInWithGoogle();
  Future<void> signOut();
}

class AuthImplRepository extends AuthRepository {
  @override
  Future<void> loginWithEmailAndPassword({
    required String email,
    required String password,
  }) async {
    try {
      await FirebaseAuth.instance.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
    } catch (e) {
      log(e.toString());
    }
  }

  @override
  Future<void> signUpWithEmailAndPassword({
    required String name,
    required String email,
    required String password,
  }) async {
    try {
      await FirebaseAuth.instance.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );
      await FirebaseAuth.instance.currentUser?.sendEmailVerification();
      await FirebaseAuth.instance.currentUser?.updateDisplayName(name);
    } catch (e) {
      log(e.toString());
    }
  }

  @override
  Future<void> signInWithGoogle() async {
    try {
      final googleSignIn = GoogleSignIn();
      final googleUser = await googleSignIn.signIn();
      if (googleUser == null) return;
      final googleAuth = await googleUser.authentication;
      final credential = GoogleAuthProvider.credential(
        accessToken: googleAuth.accessToken,
        idToken: googleAuth.idToken,
      );
      await FirebaseAuth.instance.signInWithCredential(credential);
    } catch (e) {
      log(e.toString());
    }
  }

  @override
  Future<void> signOut() async {
    await FirebaseAuth.instance.signOut();
    await GoogleSignIn().signOut();
  }

  // @override
  // Future<User> signInWithApple() async {
  //   final credential = await SignInWithApple.getAppleIDCredential(scopes: [
  //     AppleIDAuthorizationScopes.email,
  //     AppleIDAuthorizationScopes.fullName
  //   ]);
    
  // }
}

@riverpod
AuthRepository authImplRepository(AuthImplRepositoryRef ref) {
  return AuthImplRepository();
}

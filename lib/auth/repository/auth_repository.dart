import 'dart:developer';

import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';

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
    final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();
    final GoogleSignInAuthentication googleAuth =
        await googleUser!.authentication;
    final credential = GoogleAuthProvider.credential(
      accessToken: googleAuth.accessToken,
      idToken: googleAuth.idToken,
    );
    await FirebaseAuth.instance.signInWithCredential(credential);
  }

  @override
  Future<void> signOut() async {
    await FirebaseAuth.instance.signOut();
    await GoogleSignIn().signOut();
  }
}

@riverpod
AuthRepository authImplRepository(AuthImplRepositoryRef ref) {
  return AuthImplRepository();
}

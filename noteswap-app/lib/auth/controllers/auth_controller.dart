import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:noteswap/auth/repository/auth_repository.dart';

part 'auth_controller.g.dart';

@riverpod
class AuthController extends _$AuthController {

  @override
  Future<void> build() async {
    // no use
  }

  Future<void> signInWithPassword(String email, String password) async {
    final authRepository = ref.read(firebaseAuthRepositoryProvider);
    state = const AsyncLoading();
    state = await AsyncValue.guard(
      () => authRepository.signInWithEmailAndPassword(
        email: email,
        password: password,
      ),
    );
  }

   Future<void> signUpWithPassword(
      String name, String email, String password) async {
    final authRepository = ref.read(firebaseAuthRepositoryProvider);
    state = const AsyncLoading();
    state = await AsyncValue.guard(
      () => authRepository.signUpWithEmailAndPassword(
        email: email,
        password: password,
        name: name,
      ),
    );
  }

  Future<void> signInWithGoogle() async {
    final authRepository = ref.read(firebaseAuthRepositoryProvider);
    state = const AsyncLoading();
    state = await AsyncValue.guard(
      () => authRepository.signInWithGoogle(),
    );
  }
}

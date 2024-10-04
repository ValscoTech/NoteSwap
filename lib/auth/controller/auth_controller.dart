import 'package:noteswap/auth/repository/auth_repository.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'auth_controller.g.dart';

@riverpod
class AuthController extends _$AuthController {
  @override
  FutureOr<void> build() {
    // no-op
  }

  Future<void> loginWithEmailAndPassword(String email, String password) async {
    final authRepository = ref.read(authImplRepositoryProvider);
    state = const AsyncLoading();
    state = await AsyncValue.guard(
      () => authRepository.loginWithEmailAndPassword(
        email: email,
        password: password,
      ),
    );
  }

  Future<void> signUpWithEmailAndPassword(
      String name, String email, String password) async {
    final authRepository = ref.read(authImplRepositoryProvider);
    state = const AsyncLoading();
    state = await AsyncValue.guard(
      () => authRepository.signUpWithEmailAndPassword(
        name: name,
        email: email,
        password: password,
      ),
    );
  }

  Future<void> signInWithGoogle() async {
    final authRepository = ref.read(authImplRepositoryProvider);
    state = const AsyncLoading();
    state = await AsyncValue.guard(
      () => authRepository.signInWithGoogle(),
    );
  }

  Future<void> signOut() async {
    final authRepository = ref.read(authImplRepositoryProvider);
    state = const AsyncLoading();
    state = await AsyncValue.guard(
      () => authRepository.signOut(),
    );
  }
}

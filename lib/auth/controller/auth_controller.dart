import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:noteswap/auth/repository/auth_repository.dart';

part 'auth_controller.g.dart';

@riverpod
class AuthController extends _$AuthController {
  @override
  FutureOr<void> build() {
    // no-op
  }

  Future<void> signUpWithEmailAndPassword(
      String email, String password, String name) async {
    final authRepository = ref.read(authImplRepositoryProvider);
    state = const AsyncLoading();
    state = await AsyncValue.guard(
      () => authRepository.signInWithEmailAndPassword(
        email: email,
        password: password,
        username: name,
      ),
    );
  }

  Future<void> loginWithEmailAndPassword(
    String email,
    String password,
  ) async {
    final authRepository = ref.read(authImplRepositoryProvider);
    state = const AsyncLoading();
    state = await AsyncValue.guard(
      () => authRepository.loginWithEmailAndPassword(
        email: email,
        password: password,
      ),
    );
  }
}

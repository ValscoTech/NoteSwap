// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'auth_repository.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

String _$userAuthStatusHash() => r'69763025b252ca7f50c22ab39a54a58f3e7f402c';

/// See also [userAuthStatus].
@ProviderFor(userAuthStatus)
final userAuthStatusProvider = AutoDisposeStreamProvider<User?>.internal(
  userAuthStatus,
  name: r'userAuthStatusProvider',
  debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
      ? null
      : _$userAuthStatusHash,
  dependencies: null,
  allTransitiveDependencies: null,
);

typedef UserAuthStatusRef = AutoDisposeStreamProviderRef<User?>;
String _$firebaseAuthRepositoryHash() =>
    r'8cfdfe8d1ece49ca27ce318453ffcbdc17928bca';

/// See also [firebaseAuthRepository].
@ProviderFor(firebaseAuthRepository)
final firebaseAuthRepositoryProvider =
    AutoDisposeProvider<AuthRepository>.internal(
  firebaseAuthRepository,
  name: r'firebaseAuthRepositoryProvider',
  debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
      ? null
      : _$firebaseAuthRepositoryHash,
  dependencies: null,
  allTransitiveDependencies: null,
);

typedef FirebaseAuthRepositoryRef = AutoDisposeProviderRef<AuthRepository>;
// ignore_for_file: type=lint
// ignore_for_file: subtype_of_sealed_class, invalid_use_of_internal_member, invalid_use_of_visible_for_testing_member

import 'dart:io';

import 'package:noteswap/profile/domain/profile_model.dart';
import 'package:noteswap/profile/repository/profile_repository.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'profile_controller.g.dart';

@riverpod
class ProfileController extends _$ProfileController {
  @override
  FutureOr<void> build() {
    // no-op
  }

  Future<void> updateProfile({
    required String id,
    required String name,
    required String block,
    required String roomNumber,
    required String department,
    required String specialization,
    required String bio,
    required String phone,
    File? image,
  }) async {
    final profileRepository = ref.read(profileRepositoryImplProvider);
    state = const AsyncLoading();
    final profile = ProfileModel(
      id: id,
      name: name,
      block: block,
      roomNumber: roomNumber,
      department: department,
      specialization: specialization,
      bio: bio,
      phone: phone,
    );
    state = await AsyncValue.guard(
      () => profileRepository.updateProfile(profile, image: image),
    );
  }
}

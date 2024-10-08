import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:noteswap/profile/domain/profile_model.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'profile_repository.g.dart';

abstract class ProfileRepository {
  Future<ProfileModel> getProfile(String id);
  Future<void> updateProfile(ProfileModel profile);
  Future<void> createProfile(ProfileModel profile);
}

class ProfileRepositoryImpl implements ProfileRepository {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  @override
  Future<ProfileModel> getProfile(String id) async {
    DocumentSnapshot doc = await _firestore.collection('users').doc(id).get();
    if (doc.exists) {
      return ProfileModel.fromJson(doc.data() as Map<String, dynamic>);
    } else {
      throw Exception('Profile not found');
    }
  }

  @override
  Future<void> updateProfile(ProfileModel profile) async {
    await _firestore.collection('users').doc(profile.id).set(profile.toJson());
  }

  @override
  Future<void> createProfile(ProfileModel profile) async {
    await _firestore.collection('users').doc(profile.id).set(profile.toJson());
  }
}

@riverpod
ProfileRepository profileRepositoryImpl(ProfileRepositoryImplRef ref) {
  return ProfileRepositoryImpl();
}

import 'dart:io';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:noteswap/profile/domain/profile_model.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'profile_repository.g.dart';

abstract class ProfileRepository {
  Future<ProfileModel> getProfile(String id);
  Future<void> updateProfile(ProfileModel profile, {File? image});
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
  Future<void> updateProfile(ProfileModel profile, {File? image}) async {
    String? photoUrl;
    if (image != null) {
      photoUrl = await _uploadImageToStorage(image, profile.id);
      profile = profile.copyWith(photoUrl: photoUrl);
    }
    await _firestore.collection('users').doc(profile.id).set(profile.toJson());
  }

  Future<String> _uploadImageToStorage(File image, String userId) async {
    final storageRef = FirebaseStorage.instance.ref().child('user_profile_images/$userId');
    final uploadTask = storageRef.putFile(image);
    final snapshot = await uploadTask;
    return await snapshot.ref.getDownloadURL();
  }
}

@riverpod
ProfileRepository profileRepositoryImpl(ProfileRepositoryImplRef ref) {
  return ProfileRepositoryImpl();
}
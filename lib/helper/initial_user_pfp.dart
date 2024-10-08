import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:noteswap/profile/domain/profile_model.dart';
import 'package:noteswap/profile/presentation/profile_update_page.dart';
import 'package:noteswap/profile/repository/profile_repository.dart';

Future<void> checkUserProfileAndNavigate(
    BuildContext context, User user) async {
  try {
    ProfileModel profile = await ProfileRepositoryImpl().getProfile(user.uid);
    if (_isProfileComplete(profile)) {
      Navigator.pushReplacementNamed(context, '/feed');
    } else {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => const ProfileUpdatePage()),
      );
    }
  } catch (e) {
    log(e.toString());
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => const ProfileUpdatePage()),
    );
  }
}

bool _isProfileComplete(ProfileModel profile) {
  return profile.name.isNotEmpty &&
      profile.block.isNotEmpty &&
      profile.roomNumber.isNotEmpty &&
      profile.department.isNotEmpty &&
      profile.specialization.isNotEmpty &&
      profile.phone.isNotEmpty;
}

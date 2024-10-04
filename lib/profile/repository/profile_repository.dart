import 'dart:convert';
import 'dart:io';
import 'package:noteswap/profile/domain/profile_model.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:riverpod_annotation/riverpod_annotation.dart';

// part 'profile_repository.g.dart';

final platform = Platform.isAndroid ? 'ANDROID' : 'IOS';

abstract class ProfileRepository {
  Future<ProfileModel> getProfile(String id);
  Future<void> updateProfile(ProfileModel profile);
}

class ProfileRepositoryImpl implements ProfileRepository {
  var url = '${dotenv.env['${platform}_BASE_URL']}/profile/';

  @override
  Future<ProfileModel> getProfile(String id) async {
    final response = await http.get(
      Uri.parse('$url$id'),
    );
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return ProfileModel.fromJson(data);
    } else {
      throw Exception('Failed to load profile');
    }
  }

  @override
  Future<void> updateProfile(ProfileModel profile) async {
    final response = await http.put(
      Uri.parse(url),
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonEncode(profile.toJson()),
    );
    if (response.statusCode != 200) {
      throw Exception('Failed to update profile');
    }
  }
}
import 'dart:convert';
import 'package:noteswap/profile/domain/profile_model.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'profile_repository.g.dart';

abstract class ProfileRepository {
  Future<ProfileModel> getProfile(String id);
  Future<void> updateProfile(ProfileModel profile);
}

class ProfileRepositoryImpl implements ProfileRepository {
  final baseUrl = dotenv.env['BASE_URL'];

  @override
  Future<ProfileModel> getProfile(String id) async {
    final url = Uri.parse('$baseUrl/profile/$id');
    final response = await http.get(
      url,
    );
    if (response.statusCode == 200) {
      return ProfileModel.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to load profile');
    }
  }

  @override
  Future<void> updateProfile(ProfileModel profile) async {
    final url = Uri.parse('$baseUrl/profile/${profile.id}');
    final response = await http.put(
      url,
      body: jsonEncode(profile.toJson()),
    );
    if (response.statusCode != 200) {
      throw Exception('Failed to update profile');
    }
  }
}


@riverpod
Future<ProfileModel> getProfile(GetProfileRef ref, String id) async {
  return ProfileRepositoryImpl().getProfile(id);
}

@riverpod
Future<void> updateProfile(UpdateProfileRef ref, ProfileModel profile) async {
  return ProfileRepositoryImpl().updateProfile(profile);
}
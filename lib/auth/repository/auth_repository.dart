import 'dart:convert';
import 'dart:developer';
import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:noteswap/response_model.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

part 'auth_repository.g.dart';

final platform = Platform.isAndroid ? 'ANDROID' : 'IOS';

abstract class AuthRepository {
  Future<void> signInWithEmailAndPassword({
    required String username,
    required String email,
    required String password,
  });
  Future<void> loginWithEmailAndPassword({
    required String email,
    required String password,
  });
  // Future<ResponseModel> signOut();
  // Future<ResponseModel> refreshSession();
  // Future<ResponseModel> updatePassword(String newPassword);
  // Future<ResponseModel> resetPassword(String email);
  // Future<ResponseModel> deleteUser();
}

class AuthImplRepository extends AuthRepository {
  var url = '${dotenv.env['${platform}_BASE_URL']}/auth/';
  @override
  Future<void> signInWithEmailAndPassword({
    required String username,
    required String email,
    required String password,
  }) async {
    url = '${url}signup';
    if (kDebugMode) {
      print(url);
    }

    final response = await http.post(
      Uri.parse(url),
      body: {
        'email': email,
        'password': password,
        'username': username,
      },
    );
    if (kDebugMode) {
      log('Response status: ${response.statusCode}');
      log('Response body: ${response.body}');
    }

    if (response.statusCode == 200) {
      final Map<String, dynamic> body = jsonDecode(response.body);
      final responseModel = ResponseModel.fromJson(body);
      print(responseModel);
      return;
    }
    throw Exception('Failed to sign up: ${response.body}');
  }

  @override
  Future<void> loginWithEmailAndPassword({
    required String email,
    required String password,
  }) async {
    url = '${url}login';
    if (kDebugMode) {
      print(url);
    }

    final response = await http.post(
      Uri.parse(url),
      body: {
        'email': email,
        'password': password,
      },
    );
    // Log the response from the API
    if (kDebugMode) {
      log('Response status: ${response.statusCode}');
      log('Response body: ${response.body}');
    }
    if (response.statusCode == 200) {
      final Map<String, dynamic> body = jsonDecode(response.body);
      final responseModel = ResponseModel.fromJson(body);
      if (responseModel.session != null) {
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString(
            'access_token', responseModel.session!.accessToken);
        await prefs.setString(
            'refresh_token', responseModel.session!.refreshToken);
        await prefs.setInt('expires_at', responseModel.session!.expiresAt);

        if (kDebugMode) {
          log('Access Token: ${prefs.getString('access_token')}');
          log('Refresh Token: ${prefs.getString('refresh_token')}');
          log('Expires At: ${prefs.getInt('expires_at')}');
        }
      }
      if (kDebugMode) {
        log(body.toString());
      }
      return;
    }
    throw Exception('Failed to login: ${response.body}');
  }
}

@riverpod
AuthRepository authImplRepository(AuthImplRepositoryRef ref) {
  return AuthImplRepository();
}

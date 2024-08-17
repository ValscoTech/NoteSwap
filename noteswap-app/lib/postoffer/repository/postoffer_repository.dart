import 'dart:convert';

import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:noteswap/postoffer/domain/notes_model.dart';
import 'package:http/http.dart' as http;

part 'postoffer_repository.g.dart';

abstract class PostOfferRepository {
  Future<void> postOffer(NotesModel notesModel);
}

class PostOfferRepositoryImpl implements PostOfferRepository {
  @override
  Future<void> postOffer(NotesModel notesModel) async {
    final String baseUrl = dotenv.env['BASE_URL']!;
    final String url = '$baseUrl/notes'; //temp
    final response = await http.post(
      Uri.parse(url),
      body: jsonEncode(notesModel.toJson()),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ${dotenv.env['TOKEN']}',
      },
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to post offer');
    }
  }
}

@riverpod
Future<void> postOffer(PostOfferRef ref, NotesModel notesModel) async {
  return PostOfferRepositoryImpl().postOffer(notesModel);
}
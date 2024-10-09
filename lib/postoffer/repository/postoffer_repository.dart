import 'dart:io';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:uuid/uuid.dart';
import 'package:noteswap/postoffer/domain/notes_model.dart';

part 'postoffer_repository.g.dart';

abstract class PostOfferRepository {
  Future<void> postNotes(NotesModel notesModel, File notesPreview);
}

class PostOfferRepositoryImpl implements PostOfferRepository {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseStorage _storage = FirebaseStorage.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  @override
  Future<void> postNotes(NotesModel notesModel, File notesPreview) async {
    final user = _auth.currentUser;
    if (user == null) {
      throw Exception('User not logged in');
    }

    final ownerId = user.uid;
    final noteId = const Uuid().v4();

    final storageRef = _storage.ref().child('notes_previews/$noteId');
    final uploadTask = storageRef.putFile(notesPreview);
    final snapshot = await uploadTask.whenComplete(() => {});
    final previewUrl = await snapshot.ref.getDownloadURL();

    final updatedNotesModel = notesModel.copyWith(
      id: noteId,
      ownerId: ownerId,
      previewFile: previewUrl,
    );

    await _firestore
        .collection('postNotes')
        .doc(noteId)
        .set(updatedNotesModel.toJson());
  }
}

@riverpod
Future<void> postOffer(
    PostOfferRef ref, NotesModel notesModel, File notesPreview) async {
  return PostOfferRepositoryImpl().postNotes(notesModel, notesPreview);
}

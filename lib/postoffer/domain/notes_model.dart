import 'package:json_annotation/json_annotation.dart';
part 'notes_model.g.dart';

@JsonSerializable()
class NotesModel {
  final String id;
  final String title;
  final String courseCode;
  final String courseName;
  final List<int> modules;
  final String school;
  final String previewFile;
  final int price;
  final String ownerId;

  NotesModel({
    required this.id,
    required this.title,
    required this.courseCode,
    required this.courseName,
    required this.modules,
    required this.school,
    required this.previewFile,
    required this.price,
    required this.ownerId,
  });

  factory NotesModel.fromJson(Map<String, dynamic> json) =>
      _$NotesModelFromJson(json);

  Map<String, dynamic> toJson() => _$NotesModelToJson(this);

  NotesModel copyWith({
    String? id,
    String? title,
    String? courseCode,
    String? courseName,
    List<int>? modules,
    String? school,
    int? price,
    String? ownerId,
    String? previewFile,
  }) {
    return NotesModel(
      id: id ?? this.id,
      title: title ?? this.title,
      courseCode: courseCode ?? this.courseCode,
      courseName: courseName ?? this.courseName,
      modules: modules ?? this.modules,
      school: school ?? this.school,
      price: price ?? this.price,
      ownerId: ownerId ?? this.ownerId,
      previewFile: this.previewFile,
    );
  }
}

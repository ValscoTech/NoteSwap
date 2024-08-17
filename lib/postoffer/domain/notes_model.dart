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
  // final File file;
  final int price;

  NotesModel({
    required this.id,
    required this.title,
    required this.courseCode,
    required this.courseName,
    required this.modules,
    required this.school,
    // required this.file,
    required this.price,
  });

  factory NotesModel.fromJson(Map<String, dynamic> json) =>
      _$NotesModelFromJson(json);

  Map<String, dynamic> toJson() => _$NotesModelToJson(this);
}

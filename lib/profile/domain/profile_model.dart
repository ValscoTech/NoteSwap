import 'package:json_annotation/json_annotation.dart';

part 'profile_model.g.dart';

@JsonSerializable()
class ProfileModel {
  final String id;
  final String name;
  final String? photoUrl;
  final String? bio;
  final String block;
  final String roomNumber;
  final String department;
  final String specialization;
  final int? sold;
  final int? purchased;
  final String phone;
  final String? username;

  ProfileModel({
    required this.id,
    required this.name,
    this.photoUrl,
    this.bio,
    required this.block,
    required this.roomNumber,
    required this.department,
    required this.specialization,
    this.sold,
    this.purchased,
    required this.phone,
    this.username,
  });

  factory ProfileModel.fromJson(Map<String, dynamic> json) =>
      _$ProfileModelFromJson(json);
  Map<String, dynamic> toJson() => _$ProfileModelToJson(this);
}

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
  });

  factory ProfileModel.fromJson(Map<String, dynamic> json) =>
      _$ProfileModelFromJson(json);
  Map<String, dynamic> toJson() => _$ProfileModelToJson(this);
  ProfileModel copyWith({
    String? id,
    String? name,
    String? photoUrl,
    String? bio,
    String? block,
    String? roomNumber,
    String? department,
    String? specialization,
    int? sold,
    int? purchased,
    String? phone,
  }) {
    return ProfileModel(
      id: id ?? this.id,
      name: name ?? this.name,
      photoUrl: photoUrl ?? this.photoUrl,
      bio: bio ?? this.bio,
      block: block ?? this.block,
      roomNumber: roomNumber ?? this.roomNumber,
      department: department ?? this.department,
      specialization: specialization ?? this.specialization,
      sold: sold ?? this.sold,
      purchased: purchased ?? this.purchased,
      phone: phone ?? this.phone,
    );
  }
}

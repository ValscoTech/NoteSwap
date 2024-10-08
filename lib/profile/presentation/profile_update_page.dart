import 'dart:io';

import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';
import 'package:noteswap/profile/controller/profile_controller.dart';

class ProfileUpdatePage extends ConsumerStatefulWidget {
  const ProfileUpdatePage({super.key});

  @override
  ConsumerState<ProfileUpdatePage> createState() => _ProfileUpdatePageState();
}

class _ProfileUpdatePageState extends ConsumerState<ProfileUpdatePage> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _blockController = TextEditingController();
  final TextEditingController _roomNumberController = TextEditingController();
  final TextEditingController _departmentController = TextEditingController();
  final TextEditingController _specializationController =
      TextEditingController();
  final TextEditingController _bioController = TextEditingController();
  final TextEditingController _phoneController = TextEditingController();
  File? _image;

  Future<void> _pickImage() async {
    final pickedFile =
        await ImagePicker().pickImage(source: ImageSource.gallery);
    if (pickedFile != null) {
      setState(() {
        _image = File(pickedFile.path);
      });
    }
  }

  Future<void> _saveProfile() async {
    if (_formKey.currentState!.validate()) {
      final user = FirebaseAuth.instance.currentUser;
      if (user != null) {
        await ref.read(profileControllerProvider.notifier).updateProfile(
              id: user.uid,
              name: _nameController.text,
              block: _blockController.text,
              roomNumber: _roomNumberController.text,
              department: _departmentController.text,
              specialization: _specializationController.text,
              bio: _bioController.text,
              phone: _phoneController.text,
              image: _image,
            );

        final state = ref.read(profileControllerProvider);
        if (state.hasError) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Error saving profile: ${state.error}')),
          );
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Profile Saved')),
          );
          Navigator.of(context).pop();
        }
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final color = Theme.of(context).colorScheme;
    final isLoading = ref.watch(profileControllerProvider).isLoading;

    InputDecoration buildInputDecoration(
        String labelText, BuildContext context) {
      return InputDecoration(
        labelText: labelText,
        labelStyle: TextStyle(
          color: color.onSecondary,
          fontWeight: FontWeight.w400,
          fontSize: 20,
        ),
        contentPadding:
            const EdgeInsets.symmetric(vertical: 10, horizontal: 10),
      );
    }

    return Scaffold(
      backgroundColor: color.primary,
      appBar: AppBar(
        backgroundColor: color.primary,
        title: const Text(
          'Update Profile',
          style: TextStyle(
            fontWeight: FontWeight.w400,
            fontSize: 20,
          ),
        ),
        leading: IconButton(
          icon: Icon(
            Icons.arrow_back,
            color: color.onSecondary,
          ),
          onPressed: () {
            Navigator.of(context).pop();
          },
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: ListView(
            children: <Widget>[
              Center(
                child: GestureDetector(
                  onTap: _pickImage,
                  child: CircleAvatar(
                    radius: 50,
                    backgroundImage: _image != null
                        ? FileImage(_image!)
                        : const AssetImage('assets/icons/pfp.png'),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _nameController,
                decoration: buildInputDecoration('Name:', context),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your name';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _blockController,
                decoration: buildInputDecoration('Block:', context),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your block';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _roomNumberController,
                decoration: buildInputDecoration('Room:', context),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your room number';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _departmentController,
                decoration: buildInputDecoration('Department:', context),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your department';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _specializationController,
                decoration: buildInputDecoration('Specialization:', context),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your specialization';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _bioController,
                decoration: buildInputDecoration('Bio:', context),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your bio';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _phoneController,
                decoration: buildInputDecoration('Phone:', context),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your phone number';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: isLoading ? null : _saveProfile,
                style: ElevatedButton.styleFrom(
                  minimumSize: const Size(263, 60),
                  padding:
                      const EdgeInsets.symmetric(vertical: 18, horizontal: 24),
                  backgroundColor: color.secondary,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(15),
                  ),
                ),
                child: isLoading
                    ? const CupertinoActivityIndicator()
                    : Text(
                        'Save',
                        style: TextStyle(
                          color: color.surface,
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

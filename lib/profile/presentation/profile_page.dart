import 'dart:developer';

import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:noteswap/profile/domain/profile_model.dart';
import 'package:noteswap/profile/presentation/profile_update_page.dart';
import 'package:noteswap/profile/repository/profile_repository.dart';
import 'package:shimmer/shimmer.dart';

class ProfilePage extends ConsumerWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final userId = FirebaseAuth.instance.currentUser?.uid;
    final fontFamily = GoogleFonts.inter().fontFamily;
    final color = Theme.of(context).colorScheme;
    final layout = MediaQuery.of(context).size;
    final TextStyle commonTextStyle = TextStyle(
      fontFamily: 'ClashDisplay',
      color: color.primary,
      fontSize: 20,
      fontWeight: FontWeight.w400,
    );

    return ref.watch(getProfileProvider(userId!)).when(
          data: (profile) => _buildProfileContent(
            context,
            profile,
            layout,
            color,
            fontFamily!,
            commonTextStyle,
          ),
          loading: () => _buildShimmerEffect(layout, color),
          error: (error, stacktrace) {
            log(stacktrace.toString());
            return Center(child: Text('Error: $error'));
          },
        );
  }
}

Widget _buildShimmerEffect(Size layout, ColorScheme color) {
  return Shimmer.fromColors(
    baseColor: Colors.grey[400]!,
    highlightColor: Colors.grey[200]!,
    child: Column(
      children: [
        Container(
          width: layout.width,
          height: layout.height * 0.35,
          padding: const EdgeInsets.all(16.0),
          decoration: BoxDecoration(
            color: color.primary,
            borderRadius: const BorderRadius.only(
              bottomLeft: Radius.circular(32),
              bottomRight: Radius.circular(32),
            ),
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    width: 100,
                    height: 20,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  const Icon(Icons.settings, color: Colors.white),
                ],
              ),
              SizedBox(height: layout.height * 0.015),
              const CircleAvatar(
                radius: 50,
                backgroundColor: Colors.white,
                child: Icon(Icons.person, size: 50, color: Colors.grey),
              ),
              SizedBox(height: layout.height * 0.01),
              Container(
                width: 100,
                height: 20,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
              SizedBox(height: layout.height * 0.01),
              Container(
                width: 150,
                height: 20,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
            ],
          ),
        ),
        SizedBox(height: layout.height * 0.02),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: 200,
                height: 20,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
              SizedBox(height: layout.height * 0.01),
              Container(
                width: 200,
                height: 20,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
              SizedBox(height: layout.height * 0.01),
              Container(
                width: 200,
                height: 20,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
              SizedBox(height: layout.height * 0.01),
              Container(
                width: 200,
                height: 20,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
              SizedBox(height: layout.height * 0.04),
              Container(
                width: 100,
                height: 20,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
              SizedBox(height: layout.height * 0.01),
              Container(
                width: layout.width,
                height: 100,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
            ],
          ),
        ),
      ],
    ),
  );
}

Widget _buildProfileContent(
    BuildContext context,
    ProfileModel profile,
    Size layout,
    ColorScheme color,
    String fontFamily,
    TextStyle commonTextStyle) {
  return SingleChildScrollView(
    child: Column(
      children: [
        Container(
          width: layout.width,
          height: layout.height * 0.35,
          padding: const EdgeInsets.all(16.0),
          decoration: BoxDecoration(
            color: color.primary,
            borderRadius: const BorderRadius.only(
              bottomLeft: Radius.circular(32),
              bottomRight: Radius.circular(32),
            ),
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Welcome',
                    style: TextStyle(
                      color: color.surface,
                      fontFamily: 'ClashDisplay',
                      fontSize: 20,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                  IconButton(
                    icon: Icon(Icons.settings, color: color.surface),
                    onPressed: () {
                      Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: (context) => const ProfileUpdatePage(),
                        ),
                      );
                    },
                  ),
                ],
              ),
              SizedBox(height: layout.height * 0.015),
              profile.photoUrl == null
                  ? CircleAvatar(
                      radius: 50,
                      backgroundColor: color.surface,
                      child: Icon(
                        Icons.person,
                        size: 50,
                        color: color.onSurface,
                      ),
                    )
                  : CircleAvatar(
                      radius: 50,
                      backgroundImage: NetworkImage(
                        profile.photoUrl ?? '',
                      ),
                      onBackgroundImageError: (_, __) {
                        log('Error loading image');
                      },
                    ),
              SizedBox(height: layout.height * 0.01),
              Text(
                profile.name,
                style: TextStyle(
                  fontFamily: fontFamily,
                  color: color.surface,
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                profile.bio ?? '',
                style: TextStyle(
                  fontFamily: fontFamily,
                  color: color.onSurface,
                  fontSize: 12,
                ),
              ),
              SizedBox(height: layout.height * 0.01),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  RichText(
                    text: TextSpan(
                      children: [
                        TextSpan(
                          text: '${profile.purchased ?? 0} Notes ',
                          style: TextStyle(
                            fontFamily: fontFamily,
                            color: color.surface,
                            fontSize: 12,
                          ),
                        ),
                        TextSpan(
                          text: 'Purchased',
                          style: TextStyle(
                            fontFamily: fontFamily,
                            color: color.onSecondary,
                            fontSize: 12,
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(width: layout.width * 0.06),
                  RichText(
                    text: TextSpan(
                      children: [
                        TextSpan(
                          text: '${profile.sold ?? 0} Notes ',
                          style: TextStyle(
                            fontFamily: fontFamily,
                            color: color.surface,
                            fontSize: 12,
                          ),
                        ),
                        TextSpan(
                          text: 'Sold',
                          style: TextStyle(
                            fontFamily: fontFamily,
                            color: color.onSecondary,
                            fontSize: 12,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
        SizedBox(height: layout.height * 0.02),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Text(
                'Block: ${profile.block}',
                style: commonTextStyle,
              ),
              SizedBox(height: layout.height * 0.01),
              Text(
                'Room Number: ${profile.roomNumber}',
                style: commonTextStyle,
              ),
              SizedBox(height: layout.height * 0.01),
              Text(
                'Department: ${profile.department}',
                style: commonTextStyle,
              ),
              SizedBox(height: layout.height * 0.01),
              Text(
                'Specialization: ${profile.specialization}',
                style: commonTextStyle,
              ),
              SizedBox(height: layout.height * 0.04),
              Text('Offers Made', style: commonTextStyle),
              // Column(
              //   children: [
              //     ListView.builder(
              //       shrinkWrap: true,
              //       itemCount: profile.offersMade.length,
              //       itemBuilder: (context, index) {
              //         return ListTile(
              //           title: Text(
              //             profile.offersMade[index],
              //             style: commonTextStyle,
              //           ),
              //         );
              //       },
              //     ),
              //   ],
              // ),
            ],
          ),
        ),
      ],
    ),
  );
}

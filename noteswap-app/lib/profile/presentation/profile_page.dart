import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:noteswap/profile/presentation/profile_update_page.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  String profileImageUrl = 'https://example.com/profile.jpg';
  String name = 'John Doe';
  String bio = 'Software Engineer at XYZ';
  String block = 'A';
  String roomNumber = '101';
  String department = 'Computer Science';
  String specialization = 'Artificial Intelligence';
  List<String> offersMade = [
    'Offer 1',
    'Offer 2',
    'Offer 3',
    'Offer 4',
    'Offer 5'
  ];

  @override
  Widget build(BuildContext context) {
    final fontFamily = GoogleFonts.inter().fontFamily;
    final color = Theme.of(context).colorScheme;
    final layout = MediaQuery.of(context).size;
    final TextStyle commonTextStyle = TextStyle(
      fontFamily: 'ClashDisplay',
      color: color.primary,
      fontSize: 20,
      fontWeight: FontWeight.w400,
    );

    return Scaffold(
      backgroundColor: color.surface,
      body: SingleChildScrollView(
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
                  CircleAvatar(
                    radius: 50,
                    backgroundColor: color.surface,
                  ),
                  SizedBox(height: layout.height * 0.01),
                  Text(
                    name,
                    style: TextStyle(
                      fontFamily: fontFamily,
                      color: color.surface,
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Text(
                    bio,
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
                              text: '5 Notes ',
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
                              text: '3 Notes ',
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
            // display Block, Room Number, Department, and Specialization font family 'ClashDisplay' and font size 20 with w600 weight color primary in a col no rows left justify them add more soace in between them
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Block: $block',
                    style: commonTextStyle,
                  ),
                  SizedBox(height: layout.height * 0.01),
                  Text(
                    'Room Number: $roomNumber',
                    style: commonTextStyle,
                  ),
                  SizedBox(height: layout.height * 0.01),
                  Text(
                    'Department: $department',
                    style: commonTextStyle,
                  ),
                  SizedBox(height: layout.height * 0.01),
                  Text(
                    'Specialization: $specialization',
                    style: commonTextStyle,
                  ),
                  SizedBox(height: layout.height * 0.04),
                  Text('Offers Made', style: commonTextStyle),
                  // SingleChildScrollView(
                  Column(
                    children: [
                      ListView.builder(
                        shrinkWrap: true,
                        // physics: const NeverScrollableScrollPhysics(),
                        itemCount: offersMade.length,
                        itemBuilder: (context, index) {
                          return ListTile(
                            title: Text(
                              offersMade[index],
                              style: commonTextStyle,
                            ),
                          );
                        },
                      ),
                    ],
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

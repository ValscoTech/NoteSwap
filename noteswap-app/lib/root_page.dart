// ignore_for_file: deprecated_member_use

import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:go_router/go_router.dart';
import 'package:noteswap/profile/presentation/profile_update_page.dart';

class RootPage extends StatefulWidget {
  final Widget child;
  const RootPage({super.key, required this.child});

  @override
  State<RootPage> createState() => _RootPageState();
}

class _RootPageState extends State<RootPage> {
  int currentIndex = 0;
  @override
  Widget build(BuildContext context) {
    final color = Theme.of(context).colorScheme;
    return Scaffold(
      appBar: currentIndex == 4
          ? null
          : AppBar(
              leading: IconButton(
                icon: Icon(
                  Icons.arrow_back,
                  color: color.surface,
                ),
                onPressed: () {},
              ),
              title: Text(
                "NoteSwap",
                style: TextStyle(
                  color: color.surface,
                  fontSize: 20,
                  fontStyle: FontStyle.normal,
                  fontWeight: FontWeight.w400,
                ),
              ),
              shape: const RoundedRectangleBorder(
                borderRadius: BorderRadius.vertical(
                    top: Radius.circular(12), bottom: Radius.circular(32)),
              ),
              backgroundColor: color.primary,
              actions: [
                IconButton(
                  icon: Icon(
                    Icons.settings,
                    color: color.surface,
                  ),
                  onPressed: () {
                    Navigator.of(context).push(
                      MaterialPageRoute(
                          builder: (context) => const ProfileUpdatePage()),
                    );
                  },
                ),
              ],
            ),
      body: widget.child,
      bottomNavigationBar: ClipRRect(
        borderRadius: const BorderRadius.vertical(top: Radius.circular(15)),
        child: BottomNavigationBar(
          backgroundColor: color.primary,
          type: BottomNavigationBarType.fixed,
          currentIndex: currentIndex,
          onTap: (index) {
            setState(() {
              currentIndex = index;
            });
            switch (index) {
              case 0:
                context.go('/home');
                break;
              case 1:
                context.go('/search');
                break;
              case 2:
                context.go('/add');
                break;
              case 3:
                context.go('/notification');
                break;
              case 4:
                context.go('/profile');
                break;
            }
          },
          items: [
            BottomNavigationBarItem(
              icon: SvgPicture.asset(
                'assets/icons/home.svg',
                color: currentIndex == 0 ? color.secondary : color.onSurface,
              ),
              label: "",
            ),
            BottomNavigationBarItem(
              icon: SvgPicture.asset('assets/icons/search.svg',
                  color: currentIndex == 1 ? color.secondary : color.onSurface),
              label: "",
            ),
            BottomNavigationBarItem(
              icon: FloatingActionButton(
                backgroundColor: Theme.of(context).colorScheme.surface,
                elevation: 0,
                shape: const CircleBorder(
                  side: BorderSide(
                    width: 2,
                  ),
                ),
                onPressed: () {
                  context.go('/add');
                },
                child: const Icon(Icons.add),
              ),
              label: "",
            ),
            BottomNavigationBarItem(
              icon: SvgPicture.asset(
                'assets/icons/notification.svg',
                color: currentIndex == 3 ? color.secondary : color.onSurface,
              ),
              label: "",
            ),
            BottomNavigationBarItem(
              icon: SvgPicture.asset(
                'assets/icons/profile.svg',
                color: currentIndex == 4 ? color.secondary : color.onSurface,
              ),
              label: "",
            ),
          ],
        ),
      ),
    );
  }
}

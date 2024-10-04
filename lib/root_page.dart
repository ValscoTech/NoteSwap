import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:noteswap/settings/settings.dart';

class RootPage extends StatefulWidget {
  final Widget child;
  const RootPage({super.key, required this.child});

  @override
  State<RootPage> createState() => _RootPageState();
}

class _RootPageState extends State<RootPage> {
  int currentIndex = 0;

  void _onItemTapped(int index) {
    setState(() {
      currentIndex = index;
    });
    switch (index) {
      case 0:
        Navigator.pushReplacementNamed(context, '/feed');
        break;
      case 1:
        Navigator.pushReplacementNamed(context, '/search');
        break;
      case 2:
        Navigator.pushReplacementNamed(context, '/postoffer');
        break;
      case 3:
        Navigator.pushReplacementNamed(context, '/rentoffer');
        break;
      case 4:
        Navigator.pushReplacementNamed(context, '/profile');
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    final color = Theme.of(context).colorScheme;
    return Scaffold(
      appBar: currentIndex == 4
          ? null
          : AppBar(
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
                  top: Radius.circular(12),
                  bottom: Radius.circular(32),
                ),
              ),
              backgroundColor: color.primary,
              actions: [
                IconButton(
                  icon: Icon(
                    Icons.settings,
                    color: color.surface,
                  ),
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const SettingsPage()),
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
          onTap: _onItemTapped,
          items: [
            BottomNavigationBarItem(
              icon: SvgPicture.asset(
                'assets/icons/home.svg',
                color: currentIndex == 0 ? color.secondary : color.onSurface,
              ),
              label: "",
            ),
            BottomNavigationBarItem(
              icon: SvgPicture.asset(
                'assets/icons/search.svg',
                color: currentIndex == 1 ? color.secondary : color.onSurface,
              ),
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
                  Navigator.pushReplacementNamed(context, '/postoffer');
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

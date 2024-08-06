import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:go_router/go_router.dart';

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
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {},
        ),
        title: const Text(
          "NoteSwap",
          style: TextStyle(
            fontFamily: "ClashDisplay",
            fontSize: 20,
            fontStyle: FontStyle.normal,
            fontWeight: FontWeight.w400,
          ),
        ),
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.all(
            Radius.circular(32),
          ),
        ),
        backgroundColor: Theme.of(context).colorScheme.surface,
        actions: [
          IconButton(
            icon: const Icon(Icons.settings),
            onPressed: () {
              context.go('/auth');
            },
          ),
        ],
      ),
      body: Container(
        color: Theme.of(context).colorScheme.surface,
        child: widget.child,
      ),
      bottomNavigationBar: ClipRRect(
        borderRadius: const BorderRadius.vertical(top: Radius.circular(15)),
        child: BottomNavigationBar(
          backgroundColor: Theme.of(context).colorScheme.onSurface,
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
                color: currentIndex == 0
                    ? const Color.fromRGBO(180, 148, 205, 1)
                    : const Color.fromRGBO(166, 166, 166, 1),
              ),
              label: "",
            ),
            BottomNavigationBarItem(
              icon: SvgPicture.asset('assets/icons/search.svg',
                  color: currentIndex == 1
                      ? const Color.fromRGBO(180, 148, 205, 1)
                      : const Color.fromRGBO(166, 166, 166, 1)),
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
                onPressed: () {},
                child: const Icon(Icons.add),
              ),
              label: "",
            ),
            BottomNavigationBarItem(
              icon: SvgPicture.asset(
                'assets/icons/notification.svg',
                color: currentIndex == 3
                    ? const Color.fromRGBO(180, 148, 205, 1)
                    : const Color.fromRGBO(166, 166, 166, 1),
              ),
              label: "",
            ),
            BottomNavigationBarItem(
              icon: SvgPicture.asset(
                'assets/icons/profile.svg',
                color: currentIndex == 4
                    ? const Color.fromRGBO(180, 148, 205, 1)
                    : const Color.fromRGBO(166, 166, 166, 1),
              ),
              label: "",
            ),
          ],
        ),
      ),
    );
  }
}

import 'package:flutter/material.dart';
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
        title: const Text("NoteSwap"),
        actions: [
          IconButton(
            icon: const Icon(Icons.settings),
            onPressed: () {
              context.go('/auth');
            },
          ),
        ],
      ),
      body: widget.child,
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: currentIndex,
        onTap: (index) {
          switch (index) {
            case 0:
              setState(() {
                currentIndex = index;
              });
              context.go('/home');
              break;
            case 1:
              setState(() {
                currentIndex = index;
              });
              context.go('/search');
              break;
            case 2:
              setState(() {
                currentIndex = index;
              });
              context.go('/add');
              break;
            case 3:
              setState(() {
                currentIndex = index;
              });
              context.go('/notification');
              break;
            case 4:
              setState(() {
                currentIndex = index;
              });
              context.go('/profile');
              break;
          }
        },
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: "Home",
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.search),
            label: "Search",
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.add),
            label: "Add",
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.notifications),
            label: "Notifications",
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: "Profile",
          ),
        ],
      ),
    );
  }
}

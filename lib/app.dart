import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:noteswap/auth/presentation/views/login_auth_page.dart';
import 'package:noteswap/auth/presentation/views/signup_auth_page.dart';
import 'package:noteswap/auth/repository/auth_repository.dart';
import 'package:noteswap/onboarding/presentation/splash_screen.dart';
import 'package:noteswap/postoffer/presentation/views/pages/post_offer_page.dart';
import 'package:noteswap/rentoffer/presentation/pages/rent_offer_feed_page.dart';
import 'package:noteswap/root_page.dart';
import 'package:noteswap/theme.dart';
import 'package:noteswap/onboarding/presentation/onboarding_slides_screen.dart';
import 'package:noteswap/feed/presentation/feed_screen.dart';
import 'package:noteswap/search/presentation/search_notes_page.dart';
import 'package:noteswap/profile/presentation/profile_page.dart';

class App extends ConsumerStatefulWidget {
  const App({super.key});

  @override
  ConsumerState<App> createState() => _AppState();
}

class _AppState extends ConsumerState<App> {
  @override
  void initState() {
    super.initState();
    Future.delayed(Duration.zero, () {
      final user = ref.read(userStatusChangesProvider);
      user.when(
        data: (user) {
          if (user == null) {
            Navigator.pushReplacementNamed(context, '/board');
          } else {
            Navigator.pushReplacementNamed(context, '/feed');
          }
        },
        loading: () {},
        error: (error, stackTrace) {},
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    var brightness = MediaQuery.of(context).platformBrightness;

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: "NoteSwap",
      theme: brightness == Brightness.dark ? darkTheme : lightTheme,
      initialRoute: '/',
      routes: {
        '/': (context) => const SplashScreen(),
        '/rentoffer': (context) => const RootPage(child: RentOfferFeedPage()),
        '/board': (context) => const OnboardingSlidesScreen(),
        '/feed': (context) => const RootPage(child: FeedScreen()),
        // '/notification': (context) => const RootPage(child: NotificationPage()),
        '/search': (context) => const RootPage(child: SearchNotesPage()),
        '/profile': (context) => const RootPage(child: ProfilePage()),
        '/postoffer': (context) => const PostOfferPage(),
        '/settings': (context) => const ProfilePage(),
        '/signup': (context) => const SignUpAuthPage(),
        '/login': (context) => const LoginAuthPage(),
      },
    );
  }
}

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:noteswap/auth/presentation/views/login_auth_page.dart';
import 'package:noteswap/onboarding/presentation/onboarding_slides_screen.dart';
import 'package:noteswap/onboarding/presentation/splash_screen.dart';
import 'package:noteswap/payments/presentation/payment_screen.dart';
import 'package:noteswap/profile/presentation/profile_update_page.dart';
import 'package:noteswap/root_page.dart';
import 'package:noteswap/auth/presentation/views/signup_auth_page.dart';
import 'package:noteswap/feed/presentation/feed_screen.dart';
import 'package:noteswap/postoffer/presentation/views/pages/post_offer_page.dart';
import 'package:noteswap/profile/presentation/profile_page.dart';
import 'package:noteswap/rentoffer/presentation/pages/rent_offer_feed_page.dart';
import 'package:noteswap/search/presentation/search_notes_page.dart';

final GlobalKey<NavigatorState> rootKey = GlobalKey<NavigatorState>();
final router = GoRouter(
  navigatorKey: rootKey,
  debugLogDiagnostics: true,
  initialLocation: '/splash',
  routes: <RouteBase>[
    GoRoute(
      path: '/splash',
      builder: (context, state) => const SplashScreen(),
    ),
    GoRoute(
      path: '/board',
      builder: (context, state) => const OnboardingSlidesScreen(),
    ),
    ShellRoute(
      builder: (context, state, child) {
        return RootPage(child: child);
      },
      routes: [
        GoRoute(
          path: '/home',
          builder: (context, state) => const FeedScreen(),
        ),
        GoRoute(
          path: '/search',
          builder: (context, state) => const SearchNotesPage(),
        ),
        GoRoute(
          path: '/add',
          builder: (context, state) => const PostOfferPage(),
        ),
        GoRoute(
          path: '/notification',
          builder: (context, state) => const RentOfferFeedPage(),
        ),
        GoRoute(
          path: '/profile',
          builder: (context, state) => const ProfilePage(),
        ),
      ],
    ),
    GoRoute(
      path: '/signup',
      builder: (context, state) => const SignUpAuthPage(),
    ),
    GoRoute(
      path: '/login',
      builder: (context, state) => const LoginAuthPage(),
    ),
    GoRoute(
      path: '/payment',
      builder: (context, state) => const PaymentScreen(),
    ),
    GoRoute(
      path: '/settings',
      builder: (context, state) => const ProfileUpdatePage(),
    ),
  ],
);

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:noteswap/auth/presentation/views/auth_page.dart';
import 'package:noteswap/postoffer/presentation/views/pages/post_offer_page.dart';
import 'package:noteswap/profile/presentation/profile_page.dart';
import 'package:noteswap/rentoffer/presentation/pages/rent_offer_feed_page.dart';
import 'package:noteswap/root_page.dart';

final GlobalKey<NavigatorState> rootKey = GlobalKey<NavigatorState>();
final router = GoRouter(
  navigatorKey: rootKey,
  debugLogDiagnostics: true,
  initialLocation: '/home',
  routes: <RouteBase>[
    GoRoute(
      path: '/auth',
      builder: (context, state) => const AuthPage(),
    ),
    ShellRoute(
      builder: (context, state, child) {
        return RootPage(child: child);
      },
      routes: [
        GoRoute(
          path: '/home',
          builder: (context, state) => const Placeholder(),
        ),
        GoRoute(
          path: '/search',
          builder: (context, state) => const Placeholder(),
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
  ],
);

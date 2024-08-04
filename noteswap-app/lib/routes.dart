import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:noteswap/root_page.dart';

final GlobalKey<NavigatorState> rootKey = GlobalKey<NavigatorState>();
final router = GoRouter(
  navigatorKey: rootKey,
  debugLogDiagnostics: true,
  initialLocation: '/home',
  routes: <RouteBase>[
    ShellRoute(
        builder: (context, state, child) {
          return RootPage(child: child);
        },
        routes: [
          GoRoute(
            path: '/home',
            builder: (context, state) => Container(
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.surface,
              ),
              width: MediaQuery.of(context).size.width,
              height: MediaQuery.of(context).size.height,
              child: const Placeholder(),
            ),
          ),
          GoRoute(
            path: '/search',
            builder: (context, state) => Container(
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.surface,
              ),
              width: MediaQuery.of(context).size.width,
              height: MediaQuery.of(context).size.height,
              child: const Placeholder(),
            ),
          ),
          GoRoute(
            path: '/add',
            builder: (context, state) => Container(
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.surface,
              ),
              width: MediaQuery.of(context).size.width,
              height: MediaQuery.of(context).size.height,
              child: const Placeholder(),
            ),
          ),
          GoRoute(
            path: '/notification',
            builder: (context, state) => Container(
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.surface,
              ),
              width: MediaQuery.of(context).size.width,
              height: MediaQuery.of(context).size.height,
              child: const Placeholder(),
            ),
          ),
          GoRoute(
            path: '/profile',
            builder: (context, state) => Container(
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.surface,
              ),
              width: MediaQuery.of(context).size.width,
              height: MediaQuery.of(context).size.height,
              child: const Placeholder(),
            ),
          ),
        ]),
  ],
);

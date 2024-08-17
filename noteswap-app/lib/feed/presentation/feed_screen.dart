import 'package:flutter/material.dart';

class FeedScreen extends StatefulWidget {
  const FeedScreen({super.key});

  @override
  State<FeedScreen> createState() => _FeedScreenState();
}

class _FeedScreenState extends State<FeedScreen> {
  @override
  Widget build(BuildContext context) {
    final color = Theme.of(context).colorScheme;
    final layout = MediaQuery.of(context).size;
    return Scaffold(
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 32.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
                child: TextField(
                  decoration: InputDecoration(
                    hintText: 'Search',
                    hintStyle: TextStyle(color: color.onSurface),
                    prefixIcon: Icon(
                      Icons.search,
                      color: color.primary,
                    ),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(30),
                      borderSide: BorderSide.none,
                    ),
                    filled: true,
                    fillColor: color.onInverseSurface,
                  ),
                ),
              ),
            ),
            const SizedBox(
              height: 30,
            ),
            Text('Explore our Library',
                style: TextStyle(
                  fontSize: 20.0,
                  fontWeight: FontWeight.w700,
                  color: color.primary,
                )),
            const SizedBox(height: 10.0),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                _buildLibraryOption(Icons.library_books, 'Available Notes', () {
                  // Action for Available Notes
                }),
                _buildLibraryOption(Icons.av_timer, 'Newly added', () {
                  // Action for Newly added
                }),
                _buildLibraryOption(Icons.local_offer, 'Top selling', () {
                  // Action for Top selling
                }),
              ],
            ),
            const SizedBox(height: 40.0),
            Text('Explore the Departments',
                style: TextStyle(
                  fontSize: 20.0,
                  fontWeight: FontWeight.w700,
                  color: color.primary,
                )),
            const SizedBox(height: 10.0),
            SizedBox(
              height: layout.width / 3 * 1.2,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                itemCount: 10,
                itemBuilder: (context, index) {
                  return Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: GestureDetector(
                      onTap: () {
                        // Action for Department
                      },
                      child: _buildDepartmentCard(),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(
              height: 30,
            ),
            Text('Get handwritten Notes',
                style: TextStyle(
                  fontSize: 20.0,
                  fontWeight: FontWeight.w700,
                  color: color.primary,
                )),
            const SizedBox(height: 10.0),
            SizedBox(
              height: layout.width / 3 * 1.2,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                itemCount: 10,
                itemBuilder: (context, index) {
                  return Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: GestureDetector(
                      onTap: () {
                        // Action for Handwritten Notes
                      },
                      child: _buildDepartmentCard(),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 40.0),
            _buildRequestSection(context),
            const SizedBox(
              height: 30,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildLibraryOption(IconData icon, String title, VoidCallback onTap) {
    final color = Theme.of(context).colorScheme;
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 100.0,
        height: 80.0,
        decoration: BoxDecoration(
          color: color.surface,
          borderRadius: BorderRadius.circular(20.0),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 30.0, color: color.primary),
            const SizedBox(height: 5.0),
            Text(title, textAlign: TextAlign.center),
          ],
        ),
      ),
    );
  }

  Widget _buildDepartmentCard() {
    final color = Theme.of(context).colorScheme;
    final layout = MediaQuery.of(context).size;
    return Container(
      width: layout.width / 3 - 16,
      height: (layout.width / 3 - 16) * 1.5,
      decoration: BoxDecoration(
        color: color.onInverseSurface,
        borderRadius: BorderRadius.circular(12.0),
      ),
      child: Icon(
        Icons.image,
        size: 40.0,
        color: color.onInverseSurface,
      ),
    );
  }

  Widget _buildRequestSection(BuildContext context) {
    final color = Theme.of(context).colorScheme;

    return Center(
      child: Container(
        padding: const EdgeInsets.all(30.0),
        decoration: BoxDecoration(
          color: color.onInverseSurface,
          borderRadius: BorderRadius.circular(20.0),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              "Can't Find what you're Looking For?",
              style: TextStyle(
                fontSize: 14.0,
                fontWeight: FontWeight.bold,
                color: color.primary,
              ),
            ),
            const SizedBox(height: 30.0),
            ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(
                backgroundColor: color.secondary,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(15.0),
                ),
                padding: const EdgeInsets.symmetric(
                  horizontal: 40.0,
                  vertical: 20.0,
                ),
              ),
              child: Text(
                'Make a request !',
                style: TextStyle(
                  fontSize: 14.0,
                  fontWeight: FontWeight.w700,
                  color: color.surface,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

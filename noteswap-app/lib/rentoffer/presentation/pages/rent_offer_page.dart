import 'package:flutter/material.dart';
import 'package:noteswap/postoffer/domain/notes_model.dart';

class RentOfferPage extends StatelessWidget {
  final NotesModel notes;

  const RentOfferPage({super.key, required this.notes});

  @override
  Widget build(BuildContext context) {
    final color = Theme.of(context).colorScheme;
    final layout = MediaQuery.of(context).size;
    return Scaffold(
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              notes.courseName,
              style: TextStyle(
                color: color.primary,
                fontSize: 20,
                fontWeight: FontWeight.w400,
              ),
            ),
            SizedBox(height: layout.height * 0.015),
            Text(
              notes.courseCode,
              style: TextStyle(
                color: color.primary,
                fontSize: 20,
                fontWeight: FontWeight.w400,
              ),
            ),
            SizedBox(height: layout.height * 0.015),
            Text(
              'Price: ${notes.price} Rs',
              style: TextStyle(
                color: color.primary,
                fontSize: 20,
                fontWeight: FontWeight.w400,
              ),
            ),
            SizedBox(height: layout.height * 0.015),
            Text(
              'Preview:',
              style: TextStyle(
                color: color.primary,
                fontSize: 20,
                fontWeight: FontWeight.w400,
              ),
            ),
            SizedBox(height: layout.height * 0.02),
            Container(
              height: layout.height * 0.15,
              color: Colors.black,
            ),
            SizedBox(height: layout.height * 0.03),
            Text(
              'Select the Date of Exam and Slot:',
              style: TextStyle(
                color: color.primary,
                fontSize: 20,
                fontWeight: FontWeight.w400,
              ),
            ),
            SizedBox(height: layout.height * 0.015),
            Text(
              'Slot: 10:00 AM - 12:00 PM',
              style: TextStyle(
                color: color.primary,
                fontSize: 20,
                fontWeight: FontWeight.w400,
              ),
            ),
            SizedBox(height: layout.height * 0.03),
            Card(
              elevation: 4.0,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8.0),
              ),
              child: Theme(
                data: ThemeData(
                  colorScheme: ColorScheme.light(
                    primary: color.secondary,
                  ),
                  textButtonTheme: TextButtonThemeData(
                    style: TextButton.styleFrom(
                      iconColor: color.secondary,
                    ),
                  ),
                ),
                child: CalendarDatePicker(
                  initialDate: DateTime.now(),
                  firstDate: DateTime(2000),
                  lastDate: DateTime(2100),
                  onDateChanged: (date) {
                    // Handle date change
                  },
                ),
              ),
            ),
            SizedBox(height: layout.height * 0.03),
            Center(
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  minimumSize: const Size(263, 60),
                  padding:
                      const EdgeInsets.symmetric(vertical: 18, horizontal: 24),
                  backgroundColor: color.secondary,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(15),
                  ),
                ),
                onPressed: () {
                  // Handle button press
                },
                child: Text(
                  'Rent Notes',
                  style: TextStyle(
                    color: color.surface,
                    fontSize: 20,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

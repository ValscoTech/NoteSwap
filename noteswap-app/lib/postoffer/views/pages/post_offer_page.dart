import 'package:flutter/material.dart';
import 'package:noteswap/postoffer/domain/notes_model.dart';
import 'package:noteswap/postoffer/views/widgets/dropdown_card.dart';

class PostOfferPage extends StatefulWidget {
  const PostOfferPage({super.key});

  @override
  State<PostOfferPage> createState() => _PostOfferPageState();
}

class _PostOfferPageState extends State<PostOfferPage> {
  final formKey = GlobalKey<FormState>();
  final titleController = TextEditingController();
  final courseCodeController = TextEditingController();
  final courseNameController = TextEditingController();
  final priceController = TextEditingController();
  final List<String> schools = ['A', ' B', 'C'];
  final List<String> modules = ['Module 1', 'Module 2', 'Module 3'];
  String? selectedSchool;
  List<String> selectedModules = [];

  @override
  Widget build(BuildContext context) {
    final color = Theme.of(context).colorScheme;
    InputDecoration buildInputDecoration(
        String? labelText, BuildContext context) {
      return InputDecoration(
        labelText: labelText,
        labelStyle: TextStyle(
          decorationColor: color.primary,
          color: color.primary,
          fontWeight: FontWeight.w400,
          fontSize: 20,
        ),
        contentPadding:
            const EdgeInsets.symmetric(vertical: 10, horizontal: 10),
      );
    }

    return SingleChildScrollView(
      child: Container(
        padding: const EdgeInsets.all(18),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text(
              'Offer Your Notes',
              style: TextStyle(
                color: color.primary,
                fontSize: 20,
                fontWeight: FontWeight.w400,
              ),
            ),
            Form(
              key: formKey,
              child: Column(
                children: [
                  TextFormField(
                    controller: titleController,
                    decoration: buildInputDecoration('Title', context),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter a title';
                      }
                      return null;
                    },
                  ),
                  TextFormField(
                    controller: courseCodeController,
                    decoration: buildInputDecoration('Course Code', context),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter a course code';
                      }
                      return null;
                    },
                  ),
                  TextFormField(
                    controller: courseNameController,
                    decoration: buildInputDecoration('Course Name', context),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter a course name';
                      }
                      return null;
                    },
                  ),
                  SizedBox(height: MediaQuery.of(context).size.height * 0.05),
                  DropdownCard(
                    hintText: 'Select School',
                    selectedValue: selectedSchool,
                    items: schools,
                    onChanged: (newValue) {
                      setState(() {
                        selectedSchool = newValue;
                      });
                    },
                    validator: (value) {
                      if (value == null) {
                        return 'Please select a school';
                      }
                      return null;
                    },
                  ),
                  SizedBox(height: MediaQuery.of(context).size.height * 0.03),
                  DropdownCard(
                    hintText: 'Select Module',
                    selectedValue:
                        selectedModules.isNotEmpty ? selectedModules[0] : null,
                    items: modules,
                    onChanged: (newValue) {
                      setState(() {
                        selectedModules = [newValue!];
                      });
                    },
                    validator: (value) {
                      if (value == null) {
                        return 'Please select a module';
                      }
                      return null;
                    },
                  ),
                  TextFormField(
                    controller: priceController,
                    decoration: buildInputDecoration('Price', context),
                    keyboardType: TextInputType.number,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter a price';
                      }
                      return null;
                    },
                  ),
                  // SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: () {
                      if (formKey.currentState!.validate()) {
                        // Process data
                        final notes = NotesModel(
                          id: '1', // Generate or get the ID from somewhere
                          title: titleController.text,
                          courseCode: courseCodeController.text,
                          courseName: courseNameController.text,
                          modules:
                              selectedModules.map((e) => int.parse(e)).toList(),
                          school: selectedSchool!,
                          price: int.parse(priceController.text),
                        );
                        // Handle the notes object as needed
                      }
                    },
                    child: Text('Submit'),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

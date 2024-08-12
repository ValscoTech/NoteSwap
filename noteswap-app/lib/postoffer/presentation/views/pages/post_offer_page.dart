import 'package:flutter/material.dart';
import 'package:noteswap/postoffer/domain/notes_model.dart';
import 'package:noteswap/postoffer/presentation/views/widgets/dropdown_card.dart';
import 'package:noteswap/postoffer/presentation/views/widgets/upload_section.dart';

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
  double _sliderValue = 0.0;

  void onChanged(double value) {
    setState(() {
      priceController.text = value.toString();
    });
  }

  @override
  Widget build(BuildContext context) {
    final layout = MediaQuery.of(context).size;
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
                mainAxisAlignment: MainAxisAlignment.start,
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
                  SizedBox(height: layout.height * 0.05),
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
                  SizedBox(height: layout.height * 0.03),
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
                  SizedBox(height: layout.height * 0.03),
                  Text(
                    'Upload Preview of Notes',
                    style: TextStyle(
                      color: color.primary,
                      fontSize: 20,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                  SizedBox(height: layout.height * 0.02),
                  const UploadSection(),
                  SizedBox(height: layout.height * 0.02),
                  Text(
                    'Set Price',
                    style: TextStyle(
                      color: color.primary,
                      fontSize: 20,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                  SliderTheme(
                    data: SliderTheme.of(context).copyWith(
                      trackHeight: 2.0,
                      thumbShape:
                          const RoundSliderThumbShape(enabledThumbRadius: 8.0),
                      overlayShape:
                          const RoundSliderOverlayShape(overlayRadius: 16.0),
                      valueIndicatorTextStyle: TextStyle(
                        color: color.surface,
                      ),
                    ),
                    child: Column(
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text('0 Rs',
                                style: TextStyle(color: color.primary)),
                            Expanded(
                              child: Slider(
                                value: _sliderValue,
                                inactiveColor: color.primary,
                                min: 0.0,
                                max: 150.0,
                                divisions: 150,
                                label: _sliderValue.round().toString(),
                                onChanged: (double value) {
                                  setState(() {
                                    _sliderValue = value;
                                  });
                                },
                              ),
                            ),
                            Text('150 Rs',
                                style: TextStyle(color: color.primary)),
                          ],
                        ),
                        SizedBox(height: layout.height * 0.03),
                      ],
                    ),
                  ),
                  SizedBox(height: layout.height * 0.02),
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
                    style: ElevatedButton.styleFrom(
                      minimumSize: const Size(263, 60),
                      padding: const EdgeInsets.symmetric(
                          vertical: 18, horizontal: 24),
                      backgroundColor: color.secondary,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(15),
                      ),
                    ),
                    child: Text(
                      'Post Offer',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w500,
                        color: color.surface,
                      ),
                    ),
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

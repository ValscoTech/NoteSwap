import 'package:flutter/material.dart';

class DropdownCard extends StatelessWidget {
  final String hintText;
  final String? selectedValue;
  final List<String> items;
  final ValueChanged<String?> onChanged;
  final FormFieldValidator<String>? validator;

  const DropdownCard({
    super.key,
    required this.hintText,
    required this.selectedValue,
    required this.items,
    required this.onChanged,
    this.validator,
  });

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

    return Card(
      elevation: 4.0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12.0, vertical: 4.0),
        child: Row(
          children: [
            Expanded(
              child: DropdownButtonFormField<String>(
                decoration: buildInputDecoration(null, context).copyWith(
                  enabledBorder: OutlineInputBorder(
                    borderSide: BorderSide(
                      color: color.surface,
                      width: 2.0,
                    ),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderSide: BorderSide(
                      color: color.surface,
                      width: 2.0,
                    ),
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
                value: selectedValue,
                hint: Text(
                  hintText,
                  style: TextStyle(
                    color: color.primary,
                    fontWeight: FontWeight.w400,
                    fontSize: 20,
                  ),
                ),
                items: items.map((String item) {
                  return DropdownMenuItem<String>(
                    value: item,
                    child: Text(
                      item,
                      style: TextStyle(
                        color: color.primary,
                        fontWeight: FontWeight.w300,
                        fontSize: 16,
                      ),
                    ),
                  );
                }).toList(),
                onChanged: onChanged,
                validator: validator,
              ),
            ),
            Icon(
              Icons.keyboard_arrow_down_outlined,
              color: color.primary,
            ),
          ],
        ),
      ),
    );
  }
}

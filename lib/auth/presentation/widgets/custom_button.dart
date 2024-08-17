import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';

class CustomButton extends StatelessWidget {
  final String path;
  final Object ltext;
  final VoidCallback onPressed;

  const CustomButton({
    super.key,
    required this.path,
    required this.ltext,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    final color = Theme.of(context).colorScheme;
    return GestureDetector(
      onTap: onPressed,
      child: Container(
        width: MediaQuery.of(context).size.width * 0.4,
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: color.surface,
          borderRadius: BorderRadius.circular(14),
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            SvgPicture.asset(
              path,
              width: 24,
              height: 24,
            ),
            SizedBox(width: MediaQuery.of(context).size.width * 0.03),
            ltext is String
                ? Text(
                    ltext as String,
                    style: TextStyle(
                      fontSize: 16,
                      fontStyle: FontStyle.normal,
                      fontWeight: FontWeight.w500,
                      height: 1.5,
                      color: color.primary,
                    ),
                  )
                : ltext as Widget,
          ],
        ),
      ),
    );
  }
}
